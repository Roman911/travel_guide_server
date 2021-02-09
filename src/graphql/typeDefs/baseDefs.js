const { gql } = require('apollo-server')

module.exports = gql`
  type Query {
    _:String
  }
  type Mutation{
    _:String
  }
`