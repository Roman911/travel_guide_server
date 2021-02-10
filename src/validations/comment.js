const yup = require('yup')

const content = yup
  .string()
  .required('Content of the Blog is required.')
  .min(20, 'Content of the Blog should have atleast 5 characters.')
  .max(1000, 'Content of the Blog should have atmost 1000 characters.')

const NewCommentRules = yup
  .object()
  .shape({
    content
  })

module.exports = NewCommentRules