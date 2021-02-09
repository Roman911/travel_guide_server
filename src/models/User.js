const mongoose = require('mongoose')
const { isEmail } = require('validator')

const UserSchema = new mongoose.Schema({
  idAuthor: String,
  email: {
    type: String,
    required: 'Email address is required',
    validate: [isEmail, "Invalid email"],
    unique: true
  },
  avatar: String,
  name: String,
  lastName: String,
  password: {
    type: String,
    required: 'Password is required'
  },
  confirmed: Boolean,
  confirm_hash: String,
  last_seen: {
    type: Date,
    default: new Date
  },
  createdEvents: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Event'
    }
  ]
}, {
  timestamps: true
});

module.exports = mongoose.model('User', UserSchema);