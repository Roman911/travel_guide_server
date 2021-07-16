const mongoose = require('mongoose')
const mongoosePaginate = require('mongoose-paginate-v2')

const PostSchema = new mongoose.Schema({
  editor: String,
  type_material: String,
  cover: String,
  title: String,
  tickets: Array,
  link: String,
  tags: Array,
  work_time: String,
  isType: String,
  how_to_get_there: String,
  views: Number,
  likes: Array,
  isPrice: Boolean,
  confirmed: Boolean,
  confirm_hash: String,
  comments: Number,
  small_text: String,
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

PostSchema.plugin(mongoosePaginate)

module.exports = mongoose.model('Post', PostSchema)