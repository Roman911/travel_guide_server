const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
  email: String,
  avatar: String,
  name: String,
  password: String,
  confirmed: Boolean,
  confirm_hash: String,
  rating: Number,
  aboutMy: String,
  selectedLocations: Array,
  socials: {
    facebook: String,
    instagram: String,
    twitter: String,
    youtube: String
  },
  last_seen: {
    type: Date,
    default: new Date
  }
}, {
  timestamps: true
})

module.exports = mongoose.model('User', UserSchema)