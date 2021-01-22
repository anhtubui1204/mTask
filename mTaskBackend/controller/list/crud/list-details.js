const listModel = require('../../../model/list')

const listDetails = (req, res)=>{
    listModel.findOne({_id: req.params.id})
    .populate('creatorId',['email', 'fName', 'lName'])
    .populate('items')
    .exec((err, doc)=>{
        if(err)console.log(err)
        else res.json(doc)
    })
}

module.exports = listDetails