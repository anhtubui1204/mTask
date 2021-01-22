const mongoose = require('mongoose')

const Schema = mongoose.Schema;
const userSchema = new Schema({
  email: {type: String, unique: true},
  fName: {type: String},
  lName: {type: String},
  displayPhoto: {type: String},
  dateCreated: { type: Date, default: Date.now },

  expoPushToken: {type: String}

})

const userModel = mongoose.model('user', userSchema)


module.exports = userModel