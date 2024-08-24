import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';
import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer';
import express from 'express';
import http from 'http';
import cors from 'cors';
import bodyParser from 'body-parser';

import { Resolever } from './resolvers';
import { MergerDgQLShema } from './shema';
import { connectToDatabase } from './config/DBSequelize';


const startServer = async () => {
  const app = express();
  const httpServer = http.createServer(app);
  // Set up Apollo Server
  const server = new ApolloServer({
    typeDefs: MergerDgQLShema,
    resolvers:Resolever,
    plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
  });

  connectToDatabase();
  await server.start();
  app.use(
    cors(),
    bodyParser.json(),
    expressMiddleware(server),
  );

  await new Promise((resolve) => httpServer.listen({ port: 4000 },() => resolve));
  console.log(`🚀 Server ready at http://localhost:4000`);
};

startServer().then(() => {
  console.log('run server success!');
}).catch((error) => {
  console.error('Server failed to start', error);
});
