const { ApolloServer } = require('apollo-server')
const mongoose = require('mongoose')
const dotenv = require('dotenv')

const typeDefs = require('./src/graphql/typeDefs')
const resolvers = require('./src/graphql/resolvers')

dotenv.config()

const server = new ApolloServer({
  typeDefs,
  resolvers
})

async function star() {
  try {
    await mongoose.connect(`mongodb+srv://Roman:${process.env.MONGO_DB_KEY}@cluster0-vogsm.mongodb.net/travel?retryWrites=true&w=majority`, {
      useNewUrlParser: true,
      useFindAndModify: false,
      useUnifiedTopology: true,
      useCreateIndex: true
    })

    server.listen().then(({ url }) => {
      console.log(`🚀 Server ready at ${url}`);
    });
  } catch (e) {
    console.log('Server error', e.message)
    process.exit(1)
  }
}

star().then(r => console.log(r))