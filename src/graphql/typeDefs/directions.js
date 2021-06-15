const { gql } = require('apollo-server-express')

module.exports = gql`
  
  extend type Mutation {
    createDirection(directionInput: DirectionInput): Direction!
  }
  
  type Waypoints {
    infoLocation: Boolean
    location: Locations
    address: String
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
  
  input WaypointsInput {
    infoLocation: Boolean
    location: String
    address: String
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