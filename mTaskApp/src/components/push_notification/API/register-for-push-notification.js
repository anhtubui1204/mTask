import savePushToken from './save-push-token-to-backend';
import { Notifications } from 'expo';
import Constants from 'expo-constants';
import {  View, Button, Vibration, Platform, SafeAreaView } from 'react-native';
import * as Permissions from 'expo-permissions';
const registerForPushNotificationsAsync = async (obj) => {
    // ask permission
    if (Constants.isDevice) {
      const { status: existingStatus } = await Permissions.getAsync(Permissions.NOTIFICATIONS);
      let finalStatus = existingStatus;
      if (existingStatus !== 'granted') {
        const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
        finalStatus = status;
      }
      if (finalStatus !== 'granted') {
        alert('Failed to get push token for push notification!');
        return;
      }
      // get token
      token = await Notifications.getExpoPushTokenAsync();
      console.log(token);
      obj.setState({ expoPushToken: token });
    // send push token to user backend
      savePushToken(token)
    } else {
      alert('Must use physical device for Push Notifications');
    }

    if (Platform.OS === 'android') {
      Notifications.createChannelAndroidAsync('default', {
        name: 'default',
        sound: true,
        priority: 'max',
        vibrate: [0, 250, 250, 250],
      });
    }
  };

  export default registerForPushNotificationsAsync