const mongoose = require('mongoose')
const Paginate = require('mongoose-paginate-v2')

const DirectionsSchema = new mongoose.Schema({
  title: String,
  type_rout: String,
  small_text: String,
  travelMode: Array,
  waypoints: Array,
  endStart: Boolean,
  editor: String,
  views: Number,
  likes: Array,
  tags: Array,
  confirmed: Boolean,
  confirm_hash: String,
  comments: Number,
  legs: Array,
  author: {
    ref: 'User',
    type: mongoose.Schema.Types.ObjectId
  },
  location: {
    ref: 'Locations',
    type: mongoose.Schema.Types.ObjectId
  },
  last_seen: {
    type: Date,
    default: new Date
  },
}, {
  timestamps: true
})

DirectionsSchema.plugin(Paginate)

module.exports = mongoose.model('Directions', DirectionsSchema)