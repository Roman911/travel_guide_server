const { verify } = require('jsonwebtoken')
const { Directions } = require('../../models')
const { JWT_SECRET } = require('../../config')

module.exports = {
  Mutation: {
    createDirection: async (_, { directionInput }) => {
      const { token, title, type_rout, small_text, travelMode, waypoints, endStart, editor } = directionInput
      const decodedToken = await verify(token, JWT_SECRET)
      const { _id } = decodedToken

      const direction = new Directions({
        author: _id,
        title,
        type_rout,
        small_text,
        travelMode,
        waypoints,
        endStart,
        editor,
        comments: 0,
        views: 0
      })

      return await direction.save()
    }
  }
}