const mongoose = require('mongoose')

const LocationsSchema = new mongoose.Schema({
  title: String,
  small_text: String,
  coordinates: Array,
  isType: String,
  address: Array,
  confirmed: Boolean,
  confirm_hash: String,
  postLink: String,
  author: {
    ref: 'User',
    type: mongoose.Schema.Types.ObjectId
  },
  cover: {
    ref: 'Upload',
    type: mongoose.Schema.Types.ObjectId
  },
  post: {
    ref: 'Post',
    type: mongoose.Schema.Types.ObjectId
  },
  last_seen: {
    type: Date,
    default: new Date
  },
}, {
  timestamps: true
})

module.exports = mongoose.model('Locations', LocationsSchema)