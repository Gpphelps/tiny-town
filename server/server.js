const express = require('express');
const path = require('path');
const db = require('./config/connection');
// Brings in the ApolloServer for use through a hook
const { ApolloServer } = require('apollo-server-express');

// Brings is the resolvers and typeDefs for use by the ApolloServer and graphql
const { typeDefs, resolvers } = require('./schema')

// Brings in the use of the JWT middleware
const { authMiddleware } = require('./utils/auth');

const app = express();
const PORT = process.env.PORT || 3001;

// Creates the ApolloServer instance and imports the authMiddleware to use JWTs
const server = new ApolloServer({
  resolvers,
  typeDefs,
  context: authMiddleware
});

// Calls the server and applys the authMiddleware to the express application
server.applyMiddleware({ app });

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// if we're in production, serve client/build as static assets
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../client/build')));

  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../client/build/index.html'))
  });
}


db.once('open', () => {
  app.listen(PORT, () => console.log(`🌍 Now listening on localhost:${PORT}`));
  console.log(`Use GraphQL at http://localhost:${PORT}${server.graphqlPath}`);
});