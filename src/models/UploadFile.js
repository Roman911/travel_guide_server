const mongoose = require('mongoose')

const UploadFileSchema = new mongoose.Schema({
  name: String,
  url: String,
  author: {
    ref: 'User',
    type: mongoose.Schema.Types.ObjectId
  },
  last_seen: {
    type: Date,
    default: new Date
  },
}, {
  timestamps: true
})

module.exports = mongoose.model('Upload', UploadFileSchema)