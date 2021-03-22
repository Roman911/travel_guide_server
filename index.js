const { ApolloServer } = require('apollo-server-express')
const express = require('express')
const compression = require('compression')
const mongoose = require('mongoose')
const cors = require('cors')
const bodyParser = require('body-parser')

const { MONGO_DB_KEY, PORT } = require('./src/config')
const typeDefs = require('./src/graphql/typeDefs')
const resolvers = require('./src/graphql/resolvers')

const AuthMiddleware = require('./src/middlewares/auth')

const server = new ApolloServer({
  typeDefs,
  resolvers
})

const app = express()
app.use('/graphql', bodyParser.json({ limit: '20mb' }))

server.applyMiddleware({ app }, AuthMiddleware)

app.use(cors())
app.use(express.static('public'))
app.use(express.static('uploads'))
app.use(compression())

async function star() {
  try {
    await mongoose.connect(`mongodb+srv://Roman:${MONGO_DB_KEY}@cluster0-vogsm.mongodb.net/travel?retryWrites=true&w=majority`, {
      useNewUrlParser: true,
      useFindAndModify: false,
      useUnifiedTopology: true,
      useCreateIndex: true
    })

    app.listen(PORT || 5000, () => {
      console.log(`Server: http://localhost:${PORT}`)
    })
  } catch (e) {
    console.log('Server error', e.message)
    process.exit(1)
  }
}

star().then(r => console.log(r))