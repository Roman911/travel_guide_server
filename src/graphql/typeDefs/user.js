const { gql } = require('apollo-server-express')

module.exports = gql`
  extend type Query {
    authUser: User!
    author(_id: ID!): User
    loginUser(email: String!, password: String!): User!
    user(_id: ID!): User
  }

  extend type Mutation {
    registerUser(newUser: UserInput!): User!
  }

  type User {
    _id: ID!
    avatar: String
    name: String
    email: String
    rating: Int
    token: String
  }

  input UserInput {
    name: String!
    email: String!
    password: String!
  }
`