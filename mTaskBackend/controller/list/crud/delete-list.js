const listModel = require('../../../model/list')
const itemModel = require('../../../model/item')

const deleteList = (req, res)=>{
    // listModel.deleteOne({_id: req.params.id}, (err, doc)=>{
    //     if(!err)
    //         res.json(doc)
    //     else
    //         console.log(err)
    // })
    listModel.findById(req.params.id, (err, doc)=>{
        if(err) console.log(err)
        else{
            const taskList = doc.items
            var i = 0
            while(taskList[i]){
                itemModel.findById(taskList[i], (err,task)=>{
                    task.listId.pull({_id: req.params.id})
                    task.save()
                })
                i++
            }
            listModel.deleteOne({_id: req.params.id}, (err, doc)=>{
                if(err) console.log(err)
                else res.json(doc)
            })
        }
    })
}

module.exports = deleteList