const comments = require('./comments')
const directions = require('./directions')
const locations = require('./locations')
const locationsList = require('./LocationsList')
const post = require('./post')
const user = require('./user')
const uploadFiles = require('./uploadFiles')
const baseDefs = require('./baseDefs')

module.exports = [
  comments,
  directions,
  locations,
  locationsList,
  post,
  user,
  uploadFiles,
  baseDefs
]