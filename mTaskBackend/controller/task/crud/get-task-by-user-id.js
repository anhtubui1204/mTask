const itemModel = require('../../../model/item')
const mongoose = require('mongoose')

const getTaskByUserId = (req, res)=>{
    // fetch tasks by creatorId and accepted in tagged users in task.z
    const id = req.params.id
    var query = {$or: [{type: 'task', creatorId: id}, {taggedUsers: {$elemMatch:{_id: id, isAccepted: true}}}]}
    // var query = {creatorId: id}
    itemModel.find(query)
        .populate('creatorId', ['fName', 'lName', 'email'])
        .then(tasks => {
            res.json(tasks)
        })
        .catch(err=> res.status(500).json(err))
   
}

module.exports = getTaskByUserId