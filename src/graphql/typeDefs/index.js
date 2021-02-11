const comments = require('./comments')
const locations = require('./locations')
const locationsList = require('./LocationsList')
const post = require('./post')
const user = require('./user')
const baseDefs = require('./baseDefs')

module.exports = [
  comments,
  locations,
  locationsList,
  post,
  user,
  baseDefs
]