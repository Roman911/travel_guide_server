const { gql } = require('apollo-server-express')

const Waypoints = `
  infoLocation: Boolean
  address: String
  locationId: String
  cover: String
`

const Direction = `
  title: String
  type_rout: String
  small_text: String
  travelMode: [String]
  tags: [String]
  endStart: Boolean
  editor: String
`

const Legs = `
  distance: String
  duration: String
`

module.exports = gql`
  extend type Query {
    allDirections: [Direction!]!
    direction(_id: ID!): Direction!
    popularsDirections: [Direction!]!
    directionsSortByTag(tag: String!): [Direction!]!
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
    location: Location
    ${Waypoints}
  }
  
  type Legs {
    ${Legs}
  }
  
  type Direction {
    _id: ID!
    waypoints: [Waypoints]
    views: Int
    likes: [String]
    createdAt: String
    comments: Int
    author: User
    legs: [Legs]
    ${Direction}
  }
  
  input LocationInput {
    lat: Float
    lng: Float
  }
  
  input WaypointsInput {
    location: LocationInput
    typeMarker: String
    ${Waypoints}
  }
  
  input LegsInput {
    ${Legs}
  }
  
  input DirectionInput {
    token: String
    waypoints: [WaypointsInput]
    legs: [LegsInput]
    ${Direction}
  }
`