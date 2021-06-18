const { gql } = require('apollo-server-express')

module.exports = gql`
  extend type Query {
    allPosts: [Post!]!
    post(_id: ID!): Post!
    popularsPosts: [Post!]!
  }
  
  extend type Mutation {
    likePost(id: ID!, userId: ID!): Post!
    createPost(postInput: PostInput): Post!
  }
  
  type Post {
    _id: ID!
    type_material: String
    title: String
    link: String
    tags: [String]
    tickets: [String]
    work_time: String
    isType: String
    editor: String
    views: Int
    likes: [String]
    createdAt: String
    isPrice: Boolean
    how_to_get_there: String
    comments: Int
    author: User
    location: Locations
    cover: String
    small_text: String
  }
  
  input PostInput {
    token: String
    cover: String
    type_material: String
    title: String
    location: String
    tags: [String]
    editor: String
    tickets: [String]
    link: String
    work_time: String
    isPrice: Boolean
    how_to_get_there: String
    small_text: String
  }
`