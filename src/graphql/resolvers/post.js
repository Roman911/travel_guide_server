const { verify } = require('jsonwebtoken')
const { Post, Locations } = require('../../models')
const { JWT_SECRET } = require('../../config')

module.exports = {
  Query: {
    allPosts: async (_, { page, limit }) => {
      try {
        const skip = await page === 1 ? 0 : page * limit
        return await Post.find().sort({ createdAt: -1} ).skip(skip).limit(limit).populate('author')
      } catch (err) {
        throw err
      }
    },
    post: async (_, { _id }) => {
      try {
        let post = await Post.findById(_id).populate('author').populate('location')

        let { views } = await post
        views++

        await Post.findByIdAndUpdate(_id, { views }, { new: true })

        return await post
      } catch (err) {
        throw err
      }
    },
    popularsPosts: async () => {
      try {
        return await Post.find().sort({ views: -1} ).limit(5)
      } catch (err) {
        throw err
      }
    },
    postsSortByTag: async (_, { tag }) => {
      try {
        return await Post.find({ tags: tag }).populate('author')
      } catch (err) {
        throw err
      }
    },
    lengthPosts: async () => {
      try {
        const posts = await Post.find()
        return await posts.length
      } catch (err) {
        throw err
      }
    },
    searchPosts: async (_, { value }) => {
      try {
        return await Post.find({ title: { $regex: value, $options: "i" } })
      } catch (err) {
        throw err
      }
    }
  },
  Mutation: {
    likePost: async (_, { id, userId }) => {
      try {
        const post = await Post.findById(id)
        const { likes } = await post

        let update = { $push: { likes: userId } }

        if (likes.length !== 0) {
          if (likes.indexOf(userId) !== -1) {
            update = { $pull: { likes: userId } }
          }
        }

        return  await Post.findByIdAndUpdate(id, update, { new: true })
      } catch (err) {
        throw err
      }
    },
    createPost: async (_, { postInput }) => {
      const { token, cover, type_material, title, location, tags, editor, tickets, link, work_time, isPrice, how_to_get_there, small_text } = postInput
      const decodedToken = await verify(token, JWT_SECRET)
      const { _id } = decodedToken

      const post = new Post({
        author: _id,
        cover,
        type_material,
        title,
        location,
        tags,
        editor,
        tickets,
        link,
        work_time,
        isPrice,
        how_to_get_there,
        small_text,
        comments: 0,
        views: 0
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