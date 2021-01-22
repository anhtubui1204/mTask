const sendNotification = require('./send-notification')
const notifyCreator = (req, responseType)=>{
    sendNotification(req, responseType)
}

module.exports = notifyCreator