const rsvpModel = require('../../../../model/rsvp')
const findUserById = require('../../../../helper/find-user-by-id')

const sendNotification = async (req, type)=>{
    var {creatorId, userId, taskId} = req.body

    var user = await findUserById(req.body.userId)
    var userName = user.fName + ' ' + user.lName
    var str = 'declined' 
    if(type && type==='accept') str = 'accepted'
    var responseRSVP = {
        senderId: userId,
        receiverId: creatorId,
        text: userName + ' has just ' + str + ' your task tagging.',        // 2 ways, server fetch project name and link, or client fetch project name and link
        rsvpType: 'system-notification',
        taskId: taskId
    }

    rsvpModel.create(responseRSVP, function (err, doc) {
        if (err) {
            console.log('wrong rsvpId', err)
        }
        else {
            console.log('create success')
         
        }
    })

}

module.exports = sendNotification














    // req.body.creatorId ='5e81fbe288e3dc38b47f39f0'
    // req.body.userId = '5ea59f3ad636b2061cb01778'
    // req.body.taskId = '5e981688b3994e00070959a1'