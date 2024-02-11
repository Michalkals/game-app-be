const mongoose = require('mongoose')
const { Schema } = mongoose

const userSchema = new Schema({
  nickname: { type: String, required: true },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  date: { type: Date, default: Date.now },
  isAdmin: {type: Boolean, default: false},
});


const User = mongoose.model('User', userSchema)

module.exports = User