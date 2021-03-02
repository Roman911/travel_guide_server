const { verify } = require('jsonwebtoken')
const { Post, Locations } = require('../../models')
const { JWT_SECRET } = require('../../config')

module.exports = {
  Query: {
    allPosts: async (_, {}) => {
      try {
        return await Post.find().populate('author').populate('cover').sort({ createdAt: -1} )
      } catch (err) {
        throw err
      }
    },
    post: async (_, { _id }) => {
      try {
        let post = await Post.findById(_id).populate('author').populate('location').populate('cover')

        let { views } = await post
        views++

        await Post.findByIdAndUpdate(_id, { views }, { new: true })

        return await post
      } catch (err) {
        throw err
      }
    },
    popularsPosts: async (_, {}) => {
      try {
        return await Post.find().populate('cover').sort({ views: -1} ).limit(5)
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
    },
    createPost: async (_, { postInput }) => {
      const { token, type_material, location, tags, editor, tickets, link, work_time, isPrice, how_to_get_there } = postInput
      const decodedToken = await verify(token, JWT_SECRET)
      const { _id } = decodedToken

      const post = new Post({
        author: _id,
        type_material,
        location,
        tags,
        editor,
        tickets,
        link,
        work_time,
        isPrice,
        how_to_get_there,
        comments: 0
      })

      const { _id: postId } = await post

      await Locations.findByIdAndUpdate(location, { post: postId } )

      return await post.save()
    },
    // updatePost: () => {
    //
    // },
    // deletePost: () => {
    //
    // }
  }
}