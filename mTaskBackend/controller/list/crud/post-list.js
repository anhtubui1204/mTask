const listModel = require('../../../model/list')
const itemModel = require('../../../model/item')

const mongoose = require('mongoose')

const convertStringToObjId = require('../../../helper/convert-to-objectid')

const postList = (req, res) => {

    req.body.creatorId = convertStringToObjId(req.body.creatorId)

    listModel.create(req.body, (err, doc) => {
        if (err) console.log(err)
        else {
            if (req.body.items && req.body.items !== 0) {
                var added = req.body.items
                var i = 0
                while (added[i]) {
                    itemModel.findById(added[i], (err, task) => {
                        task.listId.addToSet({ _id: doc._id })
                        task.save()
                    })
                    i++
                }
            }
            res.json(doc)
        }
    })
}

module.exports = postList