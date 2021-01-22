const updateTask = require('./update-task')
const updateRSVP = require('./update-rsvp')
const notifyCreator = require('./notify-creator')
const decline = (req, res)=>{
    updateTask(req, 'decline')
    updateRSVP(req, {isDeclined: true})
    notifyCreator(req)
    res.json('done')
}
module.exports = decline