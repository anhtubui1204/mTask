const listModel = require('../../../model/list')
const itemModel = require('../../../model/item')

const deleteListItem = (req,res) => {
    const id = req.params.id
    itemModel.findById(id, (err,task)=>{
        if (err) console.log(err)
        else {
            task.listId.pull({_id: req.body.listId})
            task.save()
            res.json(task)

            listModel.findById(req.body.listId, (err,list)=>{
                list.items.pull({_id: req.params.id})
                list.save()
            })
        }
        
    })
}

module.exports = deleteListItem