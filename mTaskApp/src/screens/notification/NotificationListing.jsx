import React, { useEffect, useState, useCallback } from 'react'
import { FlatList, StyleSheet, View, AsyncStorage, RefreshControl } from 'react-native';
import {
  Layout,
  Text,
} from '@ui-kitten/components';
import axios from 'axios'
import * as url from '../../constants/url/url'
import SingleNotification from './SingleNotification'

export default function NotificationListing(props) {
  const [notifications, setNotifications] = useState([])
  const [refreshing, setRefreshing] = useState(false)
  const onRefresh = useCallback(() => {
    setRefreshing(true);
    fetchNotificationByUserId()
  }, [refreshing]);

  const fetchNotificationByUserId = async () => {
    const userId = await AsyncStorage.getItem('userId')
    var resp = await axios.get(url.rsvp + '/' + userId)
    setNotifications(resp.data)
    setRefreshing(false)

  }

  useEffect(() => {
    const unsubscribe = props.navigation.addListener('focus', async () => {
      await fetchNotificationByUserId()
    })
    return unsubscribe
  }, [props.navigation])
  return (
    <Layout style={styles.container}>
      <Text category='h1' style={styles.title}>Notifications</Text>
      <FlatList
        refreshControl={
          <RefreshControl onRefresh={onRefresh} refreshing={refreshing} />
        }
        data={notifications}
        renderItem={({ item }) => <SingleNotification key={item._id} item={item} />}
      />
    </Layout>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 22
  },
  item: {
    padding: 10,
    fontSize: 18,
    height: 44,
  },
  title: {
    padding: 10
  }
})





  // useEffect(async ()=>{
  //   const unsubscribe = props.navigation.addListener('focus', ()=>{
  //     // fetchNotificationByUserId()
  //   })
  //   return unsubscribe
  // },[props.navigation])