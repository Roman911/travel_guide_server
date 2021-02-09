const { compare, hash } = require('bcryptjs')
const { sign } = require('jsonwebtoken')
const { User } = require('../../models')

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
      const user = await User.findOne({ email: email })
      if (!user) {
        throw new Error('Неправильний логін або пароль!')
      }

      const isEqual = await compare(password, user.password)

      if (!isEqual) {
        throw new Error('Неправильний логін або пароль!')
      }

      const token = sign(
        { userId: user.id, email: user.email },
        'somesupersecretkey',
        { expiresIn: '1h' }
      )

      return {
        user,
        token
      }
    }
  },
  Mutation: {
    registerUser: async (_, { newUser }) => {
      try {
        const { name, email, password } = newUser

        const existingUser = await User.findOne({ email })
        if (existingUser) {
          return new Error('Даний емейл зайнятий');
        }

        const hashedPassword = await hash(password, 12)

        const user = new User({
          name,
          email,
          password: hashedPassword,
          avatar: 'undefined'
        })

        console.log(existingUser, hashedPassword)

      } catch (err) {
        throw err
      }
    }
  }
}