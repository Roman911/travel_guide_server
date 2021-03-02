const { gql } = require('apollo-server-express')

module.exports = gql`
  extend type Query {
    allPosts: [Post!]!
    post(_id: ID!): Post!
    popularsPosts: [Post!]!
  }
  
  extend type Mutation {
    changeLike(postId: ID!, userId: ID!): Post!
    createPost(postInput: PostInput): Post!
  }
  
  type Post {
    _id: ID!
    type_material: String
    link: String
    tags: [String]
    tickets: [String]
    work_time: String
    isType: String
    editor: String
    views: Int
    likes: [String]
    createdAt: String
    isPrice: String
    how_to_get_there: String
    comments: Int
    author: User
    location: Locations
    cover: File
  }
  
  input PostInput {
    token: String
    type_material: String
    location: String
    tags: [String]
    editor: String
    tickets: [String]
    link: String
    work_time: String
    isPrice: String
    how_to_get_there: String
  }
`