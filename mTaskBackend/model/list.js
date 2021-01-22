const mongoose = require('mongoose')

const Schema = mongoose.Schema;
const listSchema = new Schema({
  name: {type: String},
  description: {type: String},
  items: [{type: Schema.Types.ObjectId, ref: 'item' }],
  creatorId: {type: Schema.Types.ObjectId, ref: 'user' },
  taggedUsers: {type: Array},
  dateCreated: { type: Date, default: Date.now },

})

const itemModel = mongoose.model('list', listSchema)


module.exports = itemModel