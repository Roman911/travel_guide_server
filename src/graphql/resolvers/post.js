const { Post } = require('../../models')

module.exports = {
  Query: {
    allPosts: async (_, {}) => {
      try {
        return await Post.find().populate('author').sort({ createdAt: -1} )
      } catch (err) {
        throw err
      }
    },
    post: async (_, { _id }) => {
      try {
        let post = await Post.findById(_id).populate('author').populate('location')

        let { views } = await post
        views++

        return await Post.findByIdAndUpdate(_id, { views }, { new: true })
      } catch (err) {
        throw err
      }
    }
  },
  Mutation: {
    changeLike: async (_, { postId, userId }) => {
      try {
        const post = await Post.findById(postId)
        const { likes } = await post

        let update = { $push: { likes: userId } }

        if (likes.length !== 0) {
          if (likes.indexOf(userId) !== -1) {
            update = { $pull: { likes: userId } }
          }
        }

        return  await Post.findByIdAndUpdate(postId, update, { new: true })
      } catch (err) {
        throw err
      }
    }

    // createPost: () => {
    //
    // },
    // updatePost: () => {
    //
    // },
    // deletePost: () => {
    //
    // }
  }
}