const listModel = require('../../../model/list')
const getListsByUserId = (req, res)=>{
    listModel.find({creatorId: req.params.id})
    .populate('creatorId',['email', 'fName', 'lName'])
    .populate('items',['name','dateTime'])
    .exec((err, doc)=>{
        if(err)console.log(err)
        else res.json(doc)
    })
}

module.exports = getListsByUserId