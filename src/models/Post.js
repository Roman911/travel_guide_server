const mongoose = require('mongoose')
const Paginate = require('mongoose-paginate-v2')

const PostSchema = new mongoose.Schema({
  editor: String,
  type_material: String,
  tickets: Array,
  link: String,
  tags: Array,
  work_time: String,
  isType: String,
  how_to_get_there: String,
  views: Number,
  likes: Array,
  isPrice: String,
  confirmed: Boolean,
  confirm_hash: String,
  comments: Number,
  author: {
    ref: 'User',
    type: mongoose.Schema.Types.ObjectId
  },
  location: {
    ref: 'Locations',
    type: mongoose.Schema.Types.ObjectId
  },
  cover: {
    ref: 'Upload',
    type: mongoose.Schema.Types.ObjectId
  },
  last_seen: {
    type: Date,
    default: new Date
  },
}, {
  timestamps: true
})

PostSchema.plugin(Paginate)

module.exports = mongoose.model('Post', PostSchema)