const listModel = require('../../../model/list')
const itemModel = require('../../../model/item')

const deleteTaskItem = (req,res) => {
    const id = req.params.id
    listModel.findById(id, (err,list)=>{
        if (err) console.log(err)
        else {
            list.items.pull({_id: req.body.taskId})
            list.save()
            res.json(list)

            itemModel.findById(req.body.taskId, (err,task)=>{
                task.listId.pull({_id: req.params.id})
                task.save()
            })
        }
        
    })
}

module.exports = deleteTaskItem