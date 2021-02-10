const comments = require('./comments')
const locations = require('./locations')
const post = require('./post')
const user = require('./user')
const baseDefs = require('./baseDefs')

module.exports = [
  comments,
  locations,
  post,
  user,
  baseDefs
]