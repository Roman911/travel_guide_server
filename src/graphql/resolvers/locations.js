const { Locations } = require('../../models')

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
      const { idAuthor, linkToPost, cover, title, tags, small_text, coordinates, isType, address } = locationsInput
      const locations = new Locations({
        idAuthor,
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