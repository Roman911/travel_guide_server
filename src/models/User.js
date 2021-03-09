const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
  email: String,
  avatar: String,
  name: String,
  lastName: String,
  password: String,
  confirmed: Boolean,
  confirm_hash: String,
  rating: Number,
  socials: Array,
  last_seen: {
    type: Date,
    default: new Date
  }
}, {
  timestamps: true
})

module.exports = mongoose.model('User', UserSchema)