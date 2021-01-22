const mongoose = require('mongoose')

const Schema = mongoose.Schema;
const rsvpSchema = new Schema({
  senderId: {type: String},
  receiverId: {type: String},
  text: {type: String},
  rsvpType: {type: String},
  
  isAccepted: {type: Boolean, default: false},
  isDeclined: {type: Boolean, default: false},
  isOpened: {type: Boolean, default: false},

  //ref
  taskId: {type: String},
  listId: {type: String},

  dateCreated: { type: Date, default: Date.now },

})

const userModel = mongoose.model('rsvp', rsvpSchema)


module.exports = userModel