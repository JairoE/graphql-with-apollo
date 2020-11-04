import express from "express";
import { ApolloServer } from "apollo-server-express";
import { resolvers } from "./resolvers";

import { loadSchemaSync } from "@graphql-tools/load";
import { GraphQLFileLoader } from "@graphql-tools/graphql-file-loader";
import { addResolversToSchema } from "@graphql-tools/schema";

import { join } from "path";

const schema = loadSchemaSync(join(__dirname, "schema.graphql"), {
  loaders: [new GraphQLFileLoader()],
});

const schemaWithResolvers = addResolversToSchema({
  schema,
  resolvers,
});
const startServer = () => {
  const server = new ApolloServer({ schema: schemaWithResolvers });

  const app = express();

  server.applyMiddleware({ app, path: "/graphql" });

  app.listen({ port: 4000 }, () => {
    console.log(`🚀 Server ready at localhost:4000${server.graphqlPath}`);
  });
};

startServer();
