import { ApolloServer, gql } from 'apollo-server-express';
import express from 'express';

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
        articles: () => {
            return [{ title: 'Article 1', body: 'body for article 1', author: 'test author', date: 0 }]
        }
    }
}

export const app = express();

const server = new ApolloServer({ typeDefs, resolvers, introspection: true, playground: true });
server.applyMiddleware({ app, path: '/', cors: true });

