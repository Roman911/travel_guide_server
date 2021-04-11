const { gql } = require('apollo-server-express')

module.exports = gql`
  extend type Query {
    allLocations: [Locations]
    location(_id: ID!): Locations
    locationsSortByType(type: [String]): [Locations]
    locationsSortById(_id: [ID]): [Locations]
  }

  extend type Mutation {
    createLocations(locationsInput: LocationsInput): Locations
  }
  
  type Locations {
    _id: ID!
    author: User
    cover: File
    title: String
    small_text: String
    coordinates: [String]
    isType: String
    createdAt: String
    address: [String]
    post: Post
  }

  input LocationsInput {
    token: String
    cover: String
    title: String
    small_text: String
    coordinates: [String]
    isType: String
    address: [String]
  }
`