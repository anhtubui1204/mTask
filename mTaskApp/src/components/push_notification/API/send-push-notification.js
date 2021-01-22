import { AsyncStorage } from "react-native";
const moment = require('moment')
  // Can use this function below, OR use Expo's Push Notification Tool-> https://expo.io/dashboard/notifications
  /**
   * userObj: tagged users
   * taskObj: task data creating.
   */
  sendPushNotification = async (expoPushToken, title, body) => {
  
    const message = {
      to: expoPushToken,
      sound: 'default',
      title,
      body,
      data: { data: 'goes here' },
      _displayInForeground: true,
    };
    const response = await fetch('https://exp.host/--/api/v2/push/send', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Accept-encoding': 'gzip, deflate',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(message),
    });
  };

export default sendPushNotification