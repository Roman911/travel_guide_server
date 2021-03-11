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
    addAvatar(_id: ID!, avatar: String!): User!
    updateUser(updateUser: UpdateUserInput!): User!
  }

  type User {
    _id: ID!
    avatar: String
    name: String
    email: String
    rating: Int
    token: String
    aboutMy: String
    socials: Socials
  }

  input UpdateUserInput {
    name: String
    token: String
    aboutMy: String
    socials: SocialsInput
  }
  
  input SocialsInput {
    facebook: String
    instagram: String
    twitter: String
    youtube: String
  }
  
  type Socials {
    facebook: String
    instagram: String
    twitter: String
    youtube: String
  }

  input UserInput {
    name: String!
    email: String!
    password: String!
  }
`