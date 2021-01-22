const sendNotification = require('./send_notification')

const notifyNotification = (req)=>{
    const {taggedUsers, creatorId, taskId} = req.body
    var useridArr = taggedUsers.map(unit =>{
        return unit._id
    })
    console.log('notifyNotification: ', useridArr, taggedUsers, creatorId, taskId)
    for(let i =0; i < useridArr.length; i++){
        var userId = useridArr[i]
        sendNotification(userId, creatorId, taskId)
    }


}

module.exports = notifyNotification