const listModel = require('../../../model/list')
const itemModel = require('../../../model/item')

const editList = (req, res)=>{
    listModel.findById(req.params.id, (err, doc)=>{
        if(err)console.log(err)
        else {
            if(req.body.items){
                const taskList = doc.items
                var added = taskList.addToSet(req.body.items)
                req.body.items = taskList

                var i = 0
                while (added[i]){
                    itemModel.findById(added[i], (err,task)=>{
                        task.listId.push({_id: req.params.id})
                        task.save()
                    })
                    i++
                }
            }
            
            listModel.updateOne({_id: req.params.id}, req.body,(err,doc)=>{
                if(err) console.log(err)
                else res.json(doc)
            })
        }
    })
}

module.exports = editList