const { Post } = require('../../models')

module.exports = {
  Query: {
    allPosts: async () => {
      try {
        return await Post.find().populate('author')
      } catch (err) {
        throw err
      }
    }
  }
}