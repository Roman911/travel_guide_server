const { compare, hash } = require('bcryptjs')
const { User } = require('../../models')
const { UserAuthenticationRules, UserRegisterationRules } = require('../../validations')
const { serializeUser, issueAuthToken } = require('../../helpers')

module.exports = {
  Query: {
    author: async (_, { _id }) => {
      try {
        return await User.findById(_id)
      } catch (err) {
        throw err
      }
    },
    loginUser: async (_, { email, password }) => {
      await UserAuthenticationRules.validate({ email, password }, { abortEarly: false })

      let user = await User.findOne({ email: email })
      if (!user) {
        throw new Error('Неправильний логін або пароль!')
      }

      const isEqual = await compare(password, user.password)

      if (!isEqual) {
        throw new Error('Неправильний логін або пароль!')
      }

      user = await serializeUser(user)
      let token = await issueAuthToken(user)

      return {
        ...user,
        token
      }
    }
  },
  Mutation: {
    registerUser: async (_, { newUser }) => {
      try {
        const { email } = newUser

        await UserRegisterationRules.validate(newUser, { abortEarly: false })

        let user = await User.findOne({ email })

        if (user) {
          return new Error('Даний емейл зайнятий')
        }

        user = new User({
          ...newUser,
          avatar: 'undefined',
          rating: 1
        })
        user.password = await hash(user.password, 10)

        let result = await user.save()
        result = await serializeUser(result)
        let token = await issueAuthToken(result)

        return {
          ...result,
          token
        }

      } catch (err) {
        throw err
      }
    }
  }
}