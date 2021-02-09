const { gql } = require('apollo-server')

module.exports = gql`
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
    location: String
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
    author: User
  }
  
  extend type Query {
    allPosts: [Post!]!
  }
`