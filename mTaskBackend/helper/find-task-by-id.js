const itemModel = require('../model/item')

const findTaskById = async (_id)=>{
    var task = await itemModel.findOne({_id},  (err, doc)=>{
        if(err)console.log(err)
        // else console.log(task)
    })

    console.log('findTaskById: ', task)
    return task
}

module.exports = findTaskById