import {Notifications} from 'expo'
var moment = require('moment')
const setLocalNotification = async (title, body, time, repeat)=>{
    var anHour = 1000* 60 * 60
    var remindTime = time - anHour
    let displayTime = moment(time).format('H:mm a'); 
    var localNotification ={
            title: 'A reminder for your task: ' + title,
            body: 'At ' + displayTime +  '\nClick here to see more',
        }
        var schedulingOptions = {
            time: remindTime,
            // repeat,
        }
    var notificationId = await Notifications.scheduleLocalNotificationAsync(localNotification, schedulingOptions)
    return notificationId
}

export default setLocalNotification