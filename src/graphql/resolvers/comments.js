const { verify } = require('jsonwebtoken')
const { Comments, Post } = require('../../models')
const  { NewCommentRules } = require('../../validations')
const { JWT_SECRET } = require('../../config')

module.exports = {
  Query: {
    comments: async (_, { postId }) => {
      try {
        return await Comments.find({ postId } ).populate('author').populate('answers.author').sort({ createdAt: -1} ).exec()
      } catch (err) {
        throw err
      }
    }
  },
  Mutation: {
    createComment: async (_, { newComment }) => {
      try {
        const { content, token, postId } = await newComment
        const decodedToken = await verify(token, JWT_SECRET)
        const { _id } = decodedToken

        await NewCommentRules.validate({ content }, { abortEarly: false })

        const comment = new Comments({ content, postId, author: _id, comments: [] })
        const post = await Post.findById( postId )

        let { comments } = await post
        comments++

        await Post.findByIdAndUpdate(postId, { comments }, { new: true })

        return comment.save()
      } catch (err) {
        throw err
      }
    },
    addedAnswer: async (_, { newAnswer }) => {
      try {
        const { _id, token, content } = await newAnswer

        const decodedToken = await verify(token, JWT_SECRET)

        const { _id: author } = decodedToken

        await NewCommentRules.validate({ content }, { abortEarly: false })

        const update = {
          answers: {
            author,
            content
          }
        }

        return await Comments.findByIdAndUpdate(_id, { $push: update }, { new: true })
      } catch (err) {
        throw err
      }
    }
  }
}