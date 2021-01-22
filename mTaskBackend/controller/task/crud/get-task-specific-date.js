const itemModel = require('../../../model/item')
const getTaskSpecificDate = (req, res) =>{
    const {dateTime} = req.body
    itemModel.find({type: 'task', dateTime: new Date(dateTime)}, (err, doc)=>{
        if(!err){
            res.json(doc)
        }else{
            console.log(err)
        }
    })
}

module.exports = getTaskSpecificDate