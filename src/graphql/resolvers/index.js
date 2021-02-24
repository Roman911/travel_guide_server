const comments = require('./comments')
const locations = require('./locations')
const locationsList = require('./locationsList')
const post = require('./post')
const user = require('./user')
const uploadFiles = require('./uploadFiles')

module.exports = [
  comments,
  locations,
  locationsList,
  post,
  user,
  uploadFiles
]