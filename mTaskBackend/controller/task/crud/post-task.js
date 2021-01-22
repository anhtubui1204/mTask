const itemModel = require('../../../model/item')
const listModel = require('../../../model/list')
const mongoose = require('mongoose')

const notifyUsers = require('../../rsvp/notify/add_tasks')
const rsvp_API = require('../../rsvp')

const convertToObjectId = require('../../../helper/convert-to-objectid')

const postTask = (req, res) => {
    req.body.creatorId = convertToObjectId(req.body.creatorId)

    itemModel.create(req.body, (err, doc) => {
        if (!err) {
            if (req.body.taggedUsers) {
                console.log('taggging members...')
                var taskId = doc._id
                req.body.taskId = taskId
                rsvp_API.notify.addTask(req)
            }

            if (req.body.listId && req.body.listId.length !== 0) {
                listModel.findById(req.body.listId, (err, list) => {
                    if (!err) {
                        list.items.push({ _id: doc._id })
                        list.save()
                    } else console.log(err)
                })
            }

            res.json(doc)
        }

        else
            console.log(err)
    })


}

module.exports = postTask



















// req.body.name = 'testing tagging members'
// req.body.taggedUsers = [{_id: '5ea59f3ad636b2061cb01778', isAccepted: false, isConflict: false, isDeclined: false}] // shan
// req.body.creatorId = '5e81fbe288e3dc38b47f39f0' // justin

// const taskObj ={
//     name: 'testing a task',
//     description: 'test',
//     type: 'task',
//     priority: 'C',
//     color: 'green',
//     dateTime: new Date('2020-06-07')
// }