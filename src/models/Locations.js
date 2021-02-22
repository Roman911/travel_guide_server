const mongoose = require('mongoose')

const LocationsSchema = new mongoose.Schema({
  idAuthor: String,
  linkToPost: String,
  cover: String,
  title: String,
  tags: Array,
  small_text: String,
  coordinates: Array,
  isType: String,
  address: Array,
  confirmed: Boolean,
  confirm_hash: String,
  last_seen: {
    type: Date,
    default: new Date
  },
}, {
  timestamps: true
})

module.exports = mongoose.model('Locations', LocationsSchema)