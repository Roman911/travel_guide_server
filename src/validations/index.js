const NewCommentRules = require('./comment')
const NewPostRules = require('./post')
const { UserAuthenticationRules, UserRegisterationRules } = require('./user')

module.exports = {
  NewCommentRules,
  NewPostRules,
  UserAuthenticationRules,
  UserRegisterationRules
}