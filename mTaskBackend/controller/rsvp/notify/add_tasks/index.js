const notifyNotification = require('./notify-notification')
const notifyAddTasks = (req)=>{
    notifyNotification(req)
    // notifyPush()
    // notifyEmail()
}

module.exports = notifyAddTasks