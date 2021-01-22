import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  View,
  AsyncStorage,
} from 'react-native';
import {
  Button,
  Card,
  CardHeader,
  Text,
  Layout,
  Icon
} from '@ui-kitten/components';
import axios from 'axios'
import * as url from '../../constants/url/url'
import NumberDetails from './NumberDetails'
import sendPushNotification from '../../components/push_notification/API/send-push-notification'
const moment = require('moment')
export default function CardWithHeaderAndFooterShowcase (props){
    const [user, setUser] = useState({fName: ''},[])
    const [task, setTask] = useState({taggedUsers: []}, [])
    const [numberOfAccept, setNumberOfAccept] = useState(0)
    const [numberOfDecline, setNumberOfDecline] = useState(0)
    const [isAccepted, setIsAccepted] =useState(props.item.isAccepted)
    const [isDeclined, setIsDeclined] = useState(props.item.isDeclined)

  const fetchData = async () => {
    const userId = props.item.senderId
    const taskId = props.item.taskId
    await fetchUser(userId)
    await fetchTask(taskId)


  }
  const fetchUser = async (id) => {
    user
    var resp = await axios.get(url.user + '/' + id)
    console.log('fetch user by  user id: ', resp.data)

    setUser(resp.data)
  }

  const fetchTask = async (id) => {
    var resp = await axios.get(url.tasks + '/' + id)
    setTask(resp.data)


  }
  useEffect(() => {
    fetchData()
    setIsAccepted(props.item.isAccepted)
    setIsDeclined(props.item.isDeclined)
  }, [props.item])

    const handlePushNoti = async (type)=>{
      console.log('handle push noti: ', task.creatorId)
      // setup
      // let creatorResp = await axios.get(url.user + '/'+ task.creatorId)
      // let creator = creatorResp.data
      let user = await AsyncStorage.getItem('user')
      user = JSON.parse(user)
      
      let expoPushToken = task.creatorId.expoPushToken
      let title = user.name + ' ' + type + ' in a task: ' + task.name
      let body = 'Click here to see more!'
      console.log('handle send push noti result: ', expoPushToken, title, body)
      sendPushNotification(expoPushToken, title, body)
    }

    const acceptDeclineTagging = async (url)=>{
        var taskId = task._id
        var userId = await AsyncStorage.getItem('userId')
        var creatorId = task.creatorId
        var rsvpId = props.item._id
        var resp = await axios.post(url, {taskId, userId, creatorId, rsvpId})
        fetchData()
        if(url.includes('accept')){
            console.log('increase number of accept')
            setNumberOfAccept(numberOfAccept + 1)
            setIsAccepted(true)
            handlePushNoti('accepted')
        } 
        else {
            setNumberOfDecline(numberOfDecline + 1)
            setIsDeclined(true)

            handlePushNoti('declined')
        }
    
  }

  const Footer = () => (
    
    <View style={styles.footerContainer}>
      <View>
      <Text>
        {moment(props.item.dateCreated).startOf('day').fromNow()}
      </Text>
      </View>
      <View style={{flexDirection:'row'}}>
      {isAccepted ? <Text>You have accepted.</Text> : null}
      {isDeclined ? <Text>You have declined.</Text> : null}

      {(isAccepted || isDeclined) || (
        props.item.rsvpType &&
        (props.item.rsvpType).includes('system-notification'))
        ? null :

        <React.Fragment>
          <Button
            onPress={() => {
              acceptDeclineTagging(url.declineTagging_AddTask)
            }}
            style={styles.footerControl}
            size='small'
            status='basic'>
            DECLINE
          </Button>
          <Button
            onPress={() => {
              acceptDeclineTagging(url.acceptTagging_AddTask)
            }}
            style={styles.footerControl}
            size='small'>
            ACCEPT
          </Button>
        </React.Fragment>
      }
      </View>
    </View>
  
  );

  const Header = () => (
    <CardHeader
      title={task !== null && task.name !== null ? task.name : null}
    // description='By Wikipedia'
    />
  );
  return (
    <Card style={styles.card} header={Header} footer={Footer}
      status={props.item.rsvpType.includes('system') && props.item.text.includes('success') ? 'success' : null}
    >
      
      <Text onPress={() => alert('pressed')}>
        {props.item.text}
      </Text>
      {task && task.taggedUsers &&
          task.taggedUsers.length >= 1 &&
          props.item.rsvpType &&
          props.item.rsvpType.includes('system') === false  ?
        <Text>at {moment(task.dateTime).format('h:mm a, dddd Do MMMM YYYY')}.</Text>
          : null}
      <View style={styles.extra}>
        {task && task.taggedUsers &&
          task.taggedUsers.length >= 1 &&
          props.item.rsvpType &&
          props.item.rsvpType.includes('system') === false  ?
          <NumberDetails task={task} numberOfAccept={numberOfAccept} numberOfDecline={numberOfDecline} setNumberOfAccept={setNumberOfAccept} setNumberOfDecline={setNumberOfDecline} />
          : null}
      </View>
      
    </Card>
  )

}


const styles = StyleSheet.create({
  footerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems:'center'
  },
  footerDateDisplay:{
    flexDirection: 'row',
    justifyContent: 'flex-start'
  },
  footerControl: {
    marginHorizontal: 4,
  },
  card: {
    marginVertical: 4,
  },
  extra: {
    marginTop: 15
  }
});