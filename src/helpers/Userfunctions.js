const { pick } = require('lodash')
const { sign } = require('jsonwebtoken')
const { JWT_SECRET, JWT_MAX_AGE } = require('../config')

const issueAuthToken = async (jwtPayload) => {
  return await sign(
    jwtPayload,
    JWT_SECRET,
    { expiresIn: JWT_MAX_AGE * 24 }
  )
}

const serializeUser = user => pick(user, [
  '_id',
  'email',
  'name',
  'avatar',
  'rating'
])

module.exports = {
  issueAuthToken,
  serializeUser
}