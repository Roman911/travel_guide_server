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
  last_seen: String
`

const Value = `
  text: String
  value: Int
`

module.exports = gql`
  extend type Query {
    allDirections(page: Int, limit: Int): [Direction!]!
    direction(_id: ID!): Direction!
    popularsDirections: [Direction!]!
    directionsSortByTag(tag: String!): [Direction!]!
    lengthDirections: Int!
    searchDirections(value: String!): [Direction!]!
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
  
  type Value {
    ${Value}
  }
  
  type Legs {
    distance: Value
    duration: Value
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
    cover: String
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
  
  input ValueInput {
    ${Value}
  }
  
  input LegsInput {
    distance: ValueInput
    duration: ValueInput
  }
  
  input DirectionInput {
    token: String
    waypoints: [WaypointsInput]
    legs: [LegsInput]
    cover: String
    ${Direction}
  }
`