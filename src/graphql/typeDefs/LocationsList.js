const { gql } = require('apollo-server-express')

module.exports = gql`
  extend type Query {
    locationsUserList(userId: ID!, action: String!): [LocationsUserList]
    locationsUser(userId: ID!, locationId: ID!): LocationsUserList
  }
  
  extend type Mutation {
    addLocationsUserList(addLocation: addLocationInput): LocationsUserList
    removeLocationWithUserList(_id: ID!): LocationsUserList
  }

  type LocationsUserList {
    _id: ID
    userId: String
    locationId: String
    action: String
    createdAt: String
  }
  
  input addLocationInput {
    _id: ID
    userId: ID!
    locationId: ID!
    action: String
  }
`