const rsvpModel = require('../../../../../model/rsvp')
const findTaskById = require('../../../../../helper/find-task-by-id')
const findUserById = require('../../../../../helper/find-user-by-id')
const moment = require('moment')
const sendNotification = async (receiverId, senderId, taskId)=>{
    let task = await findTaskById(taskId)
    let sender = await findUserById(senderId)
    let taskName = task.name
    let taskTime = task.dateTime
    let timeDisplay = moment(taskTime).format('dddd Do MMMM YYYY, h:mm:ss a')
    let senderName = sender.fName + ' ' +  sender.lName
    let text = senderName + ' tag you in ' + taskName + '.'
    console.log('testing sendNotification: ')
    console.log(text)
    
    const rsvp  = {
        senderId,
        receiverId,
        text,
        rsvpType: 'rsvp',

        isDeclined: false,
        isAccepted: false,
        taskId
    }

    rsvpModel.create(rsvp, (err, doc)=>{
        if(err)console.log(err)
        else console.log(doc)
    })
}

module.exports = sendNotification