const itemModel = require('../../../model/item')

const getTaskById = (req, res)=>{
    itemModel.findOne({type: 'task', _id: req.params.id})
        .populate('creatorId', ['fName', 'lName', 'email', 'expoPushToken'])
        .populate('listId',['name'])
        .exec((err,doc)=>{
            if(!err){
                res.json(doc)
            }else{
                console.log(err)
            }
        })
        
}

module.exports = getTaskById