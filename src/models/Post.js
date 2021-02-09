const mongoose = require('mongoose')
const Paginate = require('mongoose-paginate-v2')

const PostSchema = new mongoose.Schema({
  idAuthor: String,
  type_material: String,
  title: String,
  cover: String,
  link: String,
  tags: Array,
  tickets: Array,
  small_text: String,
  coordinates: Array,
  location: String,
  work_time: String,
  isType: String,
  photo: String,
  post: String,
  editor: String,
  views: Number,
  likes: Array,
  text: String,
  locationId: String,
  isPrice: String,
  how_to_get_there: String,
  confirmed: Boolean,
  confirm_hash: String,
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

PostSchema.plugin(Paginate)

module.exports = mongoose.model('Post', PostSchema)