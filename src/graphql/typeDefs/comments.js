const { gql } = require('apollo-server-express')

module.exports = gql`
  extend type Query {
    comments(postId: ID!): [Comments]
  }
  
  extend type Mutation {
    createComment(newComment: CommentInput!): Comments @isAuth
    addedAnswer(newAnswer: AnswerInput!): Comments
  }
  
  type Comments {
    _id: ID!
    postId: ID!
    content: String!
    answers: [Answer]
    createdAt: String
    author: User
  }

  type Answer {
    author: User
    content: String
    createdAt: String
  }
  
  input CommentInput {
    postId: ID!
    token: String!
    content: String!
  }
  
  input AnswerInput {
    _id: ID!
    token: String!
    content: String!
  }
`