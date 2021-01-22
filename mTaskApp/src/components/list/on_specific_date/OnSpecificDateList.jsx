/**
 * This example demonstrates how simply could be composed List Item
 * with classic layouts like icon at the left, forward button at the right, etc.
 *
 * IMPORTANT: To use Icon component make sure to follow this guide:
 * https://akveo.github.io/react-native-ui-kitten/docs/guides/icon-packages
 */

import React, { useState, useCallback } from 'react';
import {
  Button,
  Icon,
  List,
  ListItem,
  Layout
} from '@ui-kitten/components';
import {useSelector, useDispatch} from 'react-redux'
import {View, StyleSheet, AsyncStorage, Image, Dimensions} from 'react-native'
import {editTaskAction, getMyTasksAction} from '../../../actions/TaskAction'

import { Ionicons } from '@expo/vector-icons'; 

const win = Dimensions.get('window');

const completedIcon = (style) => (

      <Ionicons name="ios-checkmark" size={24} color="black" />

);

const multiUserIcon = (style) => (
  <Icon {...style} name='people-outline'/>
);

const singleUserIcon = (style) => (
  <Icon {...style} name='award-outline'/>
);
export default function ListCompositeItemShowcase (){

  const tasksOSPD = useSelector(state=> state.calendarOverViewReducer.tasksOnSpecificDate, [])
  const state = useSelector(state=> state, [])
  // console.log('redux state  use selector: ', state)
  //calendarOverViewReducer, tasksOnSpecificDate
  const data = tasksOSPD
  const dispatch = useDispatch()

  const [refreshing, setRefreshing] = useState(false)
  
  const getMyTasks = async () => {
    let id = await AsyncStorage.getItem('userId')
    // console.log(id)
    dispatch(getMyTasksAction(id))
}
  const onRefresh = useCallback(async () => {
      setRefreshing(true);
      await getMyTasks()
      setRefreshing(false)

  }, [refreshing]);

  const onLayout = (e) => {
    const width = e.nativeEvent.layout.width
    const height = e.nativeEvent.layout.height
    console.log(height)
}


  const completeAction = async (item)=>{
    let taskId = item._id
    item.completed = true
    let userId = await AsyncStorage.getItem('userId')
    

    await dispatch(editTaskAction(taskId, {completed: true}))
    //  onRefresh()
    dispatch(getMyTasksAction(userId))
  }

  const renderItem = ({ item, index }) => {
    const completeButton = (style) => (
      <Button style={style} onPress={()=>{completeAction(item)}}>COMPLETE</Button>
    );
    
    var convertedDateTime = new Date(item.dateTime)
    var hr = convertedDateTime.getHours()
    var min = convertedDateTime.getMinutes()

    var ampm ='am'
    if(convertedDateTime.getHours()> 12){
      ampm ='pm'
    }
    return (
      <ListItem
        title={`${item.name}`}
        description={`${item.description ? item.description : ``} ${item.description ? `\n${hr}.${min} ${ampm}` : `${hr}.${min} ${ampm}`} `}
        icon={item.taggedUsers.length > 0 ? multiUserIcon: singleUserIcon}
        accessory={item.completed ? completedIcon: completeButton}
      />
    );
  }


    if(data && data.length >0){
      return (
        <List
          data={data}
          renderItem={renderItem}
        />
        );
    }
    
    
    else{
      return(

        <React.Fragment>
          <View onLayout={onLayout} style={style.container}>
          {/* <Text>Nothing to show</Text> */}
          <Image
            resizeMethod='resize'
            // resizeMode='cover'
            style={style.image}
            source={{
              uri: 'https://img.freepik.com/free-vector/womens-freelance-girl-with-laptop-lies-hammock-palm-trees-with-cocktail-concept-illustration-working-outdoors-studying-communication-healthy-lifestyle-flat-style_189033-12.jpg?size=626&ext=jpg',
            }}
          />
          </View>
         
        </React.Fragment>
        
      )
    }
  
  
};

const style = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
    // paddingBottom: 10
  },
  image:{
    height: '100%',
    width: 0.8*win.width,
    borderRadius: 20,
    // overflow: 'visible'
  }
})