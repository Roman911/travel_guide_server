const mongoose = require('mongoose')

const LocationsListSchema = new mongoose.Schema({
  userId: String,
  locationId: String,
  action: String,
}, {
  timestamps: true
})

module.exports = mongoose.model('LocationsList', LocationsListSchema)