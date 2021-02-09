const yup = require('yup')

const name = yup
  .string()
  .required('Username is required.')
  .min(5, 'Username should have atleast 5 characters.')
  .max(20, 'Username should have atmost 10 characters.')
  .matches(/^\w+$/, 'Should be alphanumeric.')

const email = yup
  .string()
  .required('Email is required.')
  .email('This is invalid email.')

const password = yup
  .string()
  .required("Password is required.")
  .min(5, 'Password should have atleast 5 characters.')
  .max(10, 'Password should have atmost 10 characters.')

// User Registeration Validation Schema
const UserRegisterationRules = yup.object().shape({
  name,
  password,
  email
})

// User Authentication Validation Schema
const UserAuthenticationRules = yup.object().shape({
  email,
  password
})

module.exports = {
  UserRegisterationRules,
  UserAuthenticationRules
}