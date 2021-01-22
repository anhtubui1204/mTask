const itemModel = require('../../../../model/item')
const updateTask = (req, type)=>{
    const {taskId, userId} = req.body

    var str = 'taggedUsers.$.isDeclined'
    if(type ==='accept'){
        str='taggedUsers.$.isAccepted'
    }
    itemModel.updateOne({ _id: taskId, 'taggedUsers._id': userId }, { '$set': {  [str]: true } }
            ,  (err, doc)=> {
                if (err) {
                    console.log('wrong projectId',err)
                } else {

                }
            })
}

module.exports = updateTask


    // req.body.taskId = '5ea96bb938802413a83c6e11'
    // req.body.userId = '5ea59f3ad636b2061cb01778'