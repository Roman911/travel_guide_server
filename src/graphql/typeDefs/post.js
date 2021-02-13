const { gql } = require('apollo-server-express')

module.exports = gql`
  extend type Query {
    allPosts: [Post!]!
    post(_id: ID!): Post!
  }
  
  extend type Mutation {
    changeLike(postId: ID!, userId: ID!): Post!
  }
  
  type Post {
    _id: ID!
    title: String
    type_material: String
    cover: String
    link: String
    tags: [String]
    tickets: [String]
    small_text: String
    coordinates: [String]
    work_time: String
    isType: String
    editor: String
    views: Int
    likes: [String]
    createdAt: String
    text: String
    locationId: String
    isPrice: String
    how_to_get_there: String
    comments: Int
    author: User
    location: Locations
  }
`