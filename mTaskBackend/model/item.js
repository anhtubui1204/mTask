const mongoose = require('mongoose')

const Schema = mongoose.Schema;
const itemSchema = new Schema({
  creatorId: {type: Schema.Types.ObjectId, ref: 'user'},
  // creatorId: {type: String},
  type: {type: String, default: 'task'},
  name: {type: String},
  description: {type: String},
  dateTime: {type: Date},
  priority: {type: String},
  color: {type: String},
  reminderId : {type: String},

  completed: {type: Boolean, default: false},

  repeat: {type: Object},
  location: {type: String},
  
  listId: [{type: Schema.Types.ObjectId, ref: 'list'}],
  taggedUsers: {type: Array},
  dateCreated: { type: Date, default: Date.now },
})




module.exports = itemModel = mongoose.model('item', itemSchema)