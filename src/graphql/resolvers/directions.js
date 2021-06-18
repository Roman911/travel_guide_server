const { verify } = require('jsonwebtoken')
const { Directions } = require('../../models')
const { JWT_SECRET } = require('../../config')

module.exports = {
  Query: {
    allDirections: async (_, {}) => {
      try {
        return await Directions.find().populate('author').sort({ createdAt: -1} )
      } catch (err) {
        throw err
      }
    },
    direction: async (_, { _id }) => {
      try {
        let direction = await Directions.findById(_id).populate('author')

        let { views } = await direction
        views++

        await Directions.findByIdAndUpdate(_id, { views }, { new: true })

        return await direction
      } catch (err) {
        throw err
      }
    },
    popularsDirections: async (_, {}) => {
      try {
        return await Directions.find().sort({ views: -1} ).limit(5)
      } catch (err) {
        throw err
      }
    }
  },
  Mutation: {
    likeDirection: async (_, { id, userId }) => {
      try {
        const direction = await Directions.findById(id)
        const { likes } = await direction

        let update = { $push: { likes: userId } }

        if (likes.length !== 0) {
          if (likes.indexOf(userId) !== -1) {
            update = { $pull: { likes: userId } }
          }
        }

        return  await Directions.findByIdAndUpdate(id, update, { new: true })
      } catch (err) {
        throw err
      }
    },
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