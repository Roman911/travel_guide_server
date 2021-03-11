const { verify } = require('jsonwebtoken')
const { compare, hash } = require('bcryptjs')
const { User } = require('../../models')
const { UserAuthenticationRules, UserRegisterationRules } = require('../../validations')
const { serializeUser, issueAuthToken } = require('../../helpers')
const { JWT_SECRET } = require('../../config')

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
    },
    user: async (_, { _id }) => {
      try {
        return await User.findById(_id)
      } catch (err) {
        throw err
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
          rating: 1,
          aboutMy: ''
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
    },
    addAvatar: async (_, { _id, avatar }) => {
      try {
        return await User.findByIdAndUpdate(_id, { avatar })
      } catch (err) {
        throw err
      }
    },
    updateUser: async (_, { updateUser }) => {
      try {
        const { token, name, aboutMy, socials } = await updateUser
        const decodedToken = await verify(token, JWT_SECRET)
        const { _id } = decodedToken

        const update = {
          name,
          aboutMy,
          socials
        }

        return await User.findByIdAndUpdate(_id, update )
      } catch (err) {
        throw err
      }
    }
  }
}