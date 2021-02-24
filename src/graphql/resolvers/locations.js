const { Locations } = require('../../models')
const { JWT_SECRET } = require('../../config')

module.exports = {
  Query: {
    allLocations: async () => {
      try {
        return await Locations.find()
      } catch (err) {
        throw err
      }
    },
    location: async (_, { _id }) => {
      try {
        return await Locations.findById(_id)
      } catch (err) {
        throw err
      }
    },
    locationsSortByType: async (_, { type }) => {
      try {
        return await Locations.find({ isType: type })
      } catch (err) {
        throw err
      }
    }
  },
  Mutation: {
    createLocations: async (_, { locationsInput }) => {
      const { token, linkToPost, cover, title, tags, small_text, coordinates, isType, address } = locationsInput

      const decodedToken = await verify(token, JWT_SECRET)

      const { _id } = decodedToken

      const locations = new Locations({
        author: _id,
        linkToPost,
        cover,
        title,
        tags,
        small_text,
        coordinates,
        isType,
        address
      })
      return await locations.save()
    }
  }
}