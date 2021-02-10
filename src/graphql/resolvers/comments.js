const { Comments } = require('../../models')
const  { NewCommentRules } = require('../../validations')

module.exports = {
  Query: {
    comments: async (_, { postId }) => {
      try {
        return  await Comments.find({ postId } ).populate('author').populate('comments.author')
      } catch (err) {
        throw err
      }
    }
  },
  Mutation: {
    createComment: async (_, { newComment }) => {
      try {
        const { content } = await newComment
        await NewCommentRules.validate({ content }, { abortEarly: false })

        const comment = new Comments({ ...newComment, comments: [] })

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