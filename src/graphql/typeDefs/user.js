const { gql } = require('apollo-server')

module.exports = gql`
  extend type Query {
    authUser: User! @isAuth
    author(_id: ID!): User
    loginUser(email: String!, password: String!): AuthUser!
  }

  extend type Mutation {
    registerUser(newUser: UserInput!): AuthUser!
  }

  type User {
    _id: ID!
    avatar: String
    name: String
    email: String
    token: String
  }

  input UserInput {
    name: String!
    email: String!
    password: String!
  }

  type AuthUser {
    user: User!
    token: String!
  }
`