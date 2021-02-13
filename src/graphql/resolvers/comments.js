const { Comments, Post } = require('../../models')
const  { NewCommentRules } = require('../../validations')

module.exports = {
  Query: {
    comments: async (_, { postId }) => {
      try {
        return await Comments.find({ postId } ).populate('author').populate('comments.author').sort({ createdAt: -1} ).exec()
      } catch (err) {
        throw err
      }
    }
  },
  Mutation: {
    createComment: async (_, { newComment }) => {
      try {
        const { content, postId } = await newComment
        await NewCommentRules.validate({ content }, { abortEarly: false })

        const comment = new Comments({ ...newComment, comments: [] })
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
        const { _id, author, content } = await newAnswer
        await NewCommentRules.validate({ content }, { abortEarly: false })

        const update = {
          comments: {
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