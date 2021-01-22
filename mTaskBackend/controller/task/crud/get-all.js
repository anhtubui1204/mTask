const mongoose = require('mongoose');
const itemModel = require('../../../model/item')
const getAll = (req, res)=>{
    itemModel.find({type: 'task'})
        .populate('creatorId', ['fName', 'lName', 'email'])
        .then(tasks => res.json(tasks))
        .catch(err=> res.status(500).json(err))
}

module.exports = getAll