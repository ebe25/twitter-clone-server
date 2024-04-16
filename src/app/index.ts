import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';
import cors from 'cors';
import express, { query } from 'express';
import { prisma } from '@/config/dbConfig';
import gql from 'graphql-tag';
export async function initServer() {
    const app = express();

    const graphqlServer = new ApolloServer({
        typeDefs: gql`
        type User{
            email:String,
            firstName: String
        }
        type Query {
            getUsers: [User]
          }
        `,
        resolvers: {
            Query: {
                getUsers: async () => await prisma.user.findMany()
            }
        }
    });
    // Note you must call `start()` on the `ApolloServer`
    // instance before passing the instance to `expressMiddleware`
    await graphqlServer.start();

    // Specify the path where we'd like to mount our server
    app.use('/graphql', express.json(), expressMiddleware(graphqlServer));
    return app;
}