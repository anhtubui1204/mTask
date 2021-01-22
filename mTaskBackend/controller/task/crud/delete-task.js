const listModel = require('../../../model/list')
const itemModel = require('../../../model/item')

const deleteTask = (req, res)=>{
    // itemModel.deleteOne({_id: req.params.id}, (err, doc)=>{
    //     if(!err)
    //         res.json(doc)
    //     else
    //         console.log(err)
    // })
    const id = req.params.id
    itemModel.findById(id, (err,task)=>{
        if (err) console.log(err)
        else{
            const Lists = task.listId
            var i = 0
            while(Lists[i]){
                listModel.findById(Lists[i], (err, list)=>{
                    list.items.pull({_id: req.params.id})
                    list.save()
                })
                i++
            }
            itemModel.deleteOne({_id: req.params.id}, (err, doc)=>{
                if(err) console.log(err)
                else res.json(doc)
            })
        }
    })
}

module.exports = deleteTask