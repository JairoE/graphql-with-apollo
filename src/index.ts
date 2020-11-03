import express from "express";
import { ApolloServer, gql } from "apollo-server-express";

const startServer = () => {
  const server = new ApolloServer({});

  const app = express();

  server.applyMiddleware({ app, path: "/graphql" });

  app.listen({ port: 4000 }, () => {
    console.log(`🚀 Server ready at localhost:4000${server.graphqlPath}`);
  });
};

startServer();
