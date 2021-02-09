const { Post } = require('../../models')

module.exports = {
  Query: {
    allPosts: async () => {
      try {
        return await Post.find().populate('author')
      } catch (err) {
        throw err
      }
    },
    post: async (_, { _id }) => {
      try {
        return await Post.findById(_id).populate('author').populate('location')
      } catch (err) {
        throw err
      }
    }
  }
}