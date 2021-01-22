const rsvpModel = require('../../../model/rsvp')

const getNotifByUserId = (req, res)=>{
    const receiverId = req.params.userId
    rsvpModel.find({receiverId}, (err, doc)=>{
        if(err)console.log(err)
        else res.json(doc)
    })
    // .populate('item', ['name'])
    .sort({ _id: -1 }).limit(10)
}

module.exports = getNotifByUserId