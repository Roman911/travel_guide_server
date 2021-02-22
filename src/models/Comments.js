const mongoose = require('mongoose')

const CommentsSchema = new mongoose.Schema({
  postId: String,
  confirmed: Boolean,
  confirm_hash: String,
  content: String,
  author: {
    ref: 'User',
    type: mongoose.Schema.Types.ObjectId
  },
  answers: [{
    content: String,
    author: {
      ref: 'User',
      type: mongoose.Schema.Types.ObjectId
    },
    createdAt: {
      type: Date,
      default: new Date
    }
  }],
  last_seen: {
    type: Date,
    default: new Date
  },
}, {
  timestamps: true
})

module.exports = mongoose.model('Comments', CommentsSchema)