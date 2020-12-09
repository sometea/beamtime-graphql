import { ApolloServer, gql } from 'apollo-server-express';
import express from 'express';

import { addArticle, deleteArticle, getArticles } from './articles';

const typeDefs = gql`
    type Article {
        author: String
        title: String
        body: String
        date: String
        id: ID
    }
    type Query {
        articles: [Article]
    }
    type Mutation {
        addArticle(article: ArticleInput): Article
        deleteArticle(id: ID): ID
    }
    input ArticleInput {
        author: String
        title: String
        body: String
    }
`;

const resolvers = {
    Query: {
        articles: getArticles,
    },
    Mutation: {
        addArticle,
        deleteArticle,
    }
}

export const app = express();

const server = new ApolloServer({ typeDefs, resolvers, introspection: true, playground: true });
server.applyMiddleware({ app, path: '/', cors: true });

