const { gql } = require('apollo-server-express')

module.exports = gql`

  extend type Mutation {
    uploadFiles(file: Upload!): File!
  }
  
  type File {
    url: String!
  }
`