const { LocationsList } = require('../../models')

module.exports = {
  Query: {
    locationsUserList: async (_, { userId, action }) => {
      try {
        return await LocationsList.find({ userId, action })
      } catch (err) {
        throw err
      }
    },
    locationsUser: async (_, { userId, locationId }) => {
      try {
        return await LocationsList.findOne({ userId, locationId })
      } catch (err) {
        throw err
      }
    }
  },
  Mutation: {
    addLocationsUserList: async (_, { addLocation }) => {
      try {
        const { _id, userId, locationId, action } = await addLocation
        const location = await LocationsList.findOne({ userId, locationId })

        if (location) {
          return await LocationsList.findOneAndUpdate({ userId, locationId }, { action })
        } else {
          const location = new LocationsList({
            userId,
            locationId,
            action
          })
          return await location.save()
        }
      } catch (err) {
        throw err
      }
    },
    removeLocationWithUserList: async (_, { _id }) => {
      try {
        return await LocationsList.findByIdAndRemove(_id)
      } catch (err) {
        throw err
      }
    }
  }
}