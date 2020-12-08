import { ApolloServer, gql } from 'apollo-server-express';
import express from 'express';
import { getArticles } from './articles';

const typeDefs = gql`
    type Article {
        author: String
        title: String
        body: String
        date: Int
    }
    type Query {
        articles: [Article]
    }
`;

const resolvers = {
    Query: {
        articles: getArticles,
    },
}

export const app = express();

const server = new ApolloServer({ typeDefs, resolvers, introspection: true, playground: true });
server.applyMiddleware({ app, path: '/', cors: true });

