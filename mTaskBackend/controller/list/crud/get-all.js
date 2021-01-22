const listModel = require('../../../model/list')
const getAll = (req, res)=>{
    listModel.find({})
    .populate('creatorId',['email', 'fName', 'lName'])
    .populate('items')
    .exec( (err, doc)=>{
        if(err)console.log(err)
        else res.json(doc)
    })
}

module.exports = getAll