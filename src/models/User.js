const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
  idAuthor: String,
  email: String,
  avatar: String,
  name: String,
  lastName: String,
  password: String,
  confirmed: Boolean,
  confirm_hash: String,
  last_seen: {
    type: Date,
    default: new Date
  }
}, {
  timestamps: true
})

module.exports = mongoose.model('User', UserSchema)