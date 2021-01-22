const rsvpModel = require('../../../../model/rsvp')

const updateRSVP = (req, update)=>{
    const {rsvpId} = req.body
    rsvpModel.findByIdAndUpdate({ _id: rsvpId }, update,  (err, doc)=>{
        if (err) {
            console.log('updateRSVP fail', err)
        } else {
            console.log('updateRSVP success')
        }
    })
}

module.exports = updateRSVP


















//    req.body.rsvpId = '5ea96991d844c944b8f2fece'