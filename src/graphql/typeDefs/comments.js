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
    idAuthor: ID!
    text: String!
    comments: [Comment]
    createdAt: String
    author: User
  }

  type Comment {
    author: User
    content: String
    createdAt: String
  }
  
  input CommentInput {
    postId: ID!
    author: ID!
    content: String!
  }
  
  input AnswerInput {
    _id: ID!
    author: ID!
    content: String!
  }
`