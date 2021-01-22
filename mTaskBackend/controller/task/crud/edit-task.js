const itemModel = require('../../../model/item')
const listModel = require('../../../model/list')
const mongoose = require('mongoose')
const editTask = (req, res)=>{
    itemModel.findById(req.params.id, (err, task)=>{
        if (err) console.log(err)
        else{
            if(req.body.listId){
                const Lists = task.listId
                var added = Lists.addToSet(req.body.listId)
                req.body.listId = Lists

                var i = 0
                while (added[i]){
                    listModel.findById(added[i], (err, list)=>{
                        list.items.push({_id: req.params.id})
                        list.save()
                    })
                    i++
                }
            }

            itemModel.updateOne({_id: req.params.id}, req.body, (err,doc)=>{
                if(err) console.log(err)
                else res.json(doc)
            })
        }
    })
}

module.exports = editTask