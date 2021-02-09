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
        const locations = await Locations.find()
        return await locations.filter(location => {
            return location.isType === type
        })
      } catch (err) {
        throw err
      }
    }
  },
  Mutation: {
    createLocations: async (_, args) => {
      const { locationsInput } = args
      const locations = new Locations({
        idAuthor: locationsInput.idAuthor,
        linkToPost: locationsInput.linkToPost,
        cover: locationsInput.cover,
        title: locationsInput.title,
        tags: locationsInput.tags,
        small_text: locationsInput.small_text,
        coordinates: locationsInput.coordinates,
        isType: locationsInput.isType,
        location: locationsInput.location
      })
      return await locations.save()
    }
  }
}