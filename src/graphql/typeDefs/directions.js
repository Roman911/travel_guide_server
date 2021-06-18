const { gql } = require('apollo-server-express')

module.exports = gql`
  extend type Query {
    allDirections: [Direction!]!
    direction(_id: ID!): Direction!
    popularsDirections: [Direction!]!
  }
  
  extend type Mutation {
    likeDirection(id: ID!, userId: ID!): Direction!
    createDirection(directionInput: DirectionInput): Direction!
  }
  
  type Location {
    lat: Float
    lng: Float
  }
  
  type Waypoints {
    infoLocation: Boolean
    location: Location
    address: String
    locationId: String
  }
  
  type Direction {
    _id: ID!
    title: String
    type_rout: String
    small_text: String
    travelMode: [String]
    waypoints: [Waypoints]
    endStart: Boolean
    editor: String
    views: Int
    likes: [String]
    createdAt: String
    comments: Int
    author: User
  }
  
  input LocationInput {
    lat: Float
    lng: Float
  }
  
  input WaypointsInput {
    infoLocation: Boolean
    location: LocationInput
    address: String
    typeMarker: String
    locationId: String
  }
  
  input DirectionInput {
    token: String
    title: String
    type_rout: String
    small_text: String
    travelMode: [String]
    waypoints: [WaypointsInput]
    endStart: Boolean
    editor: String
  }
`