import { buildSchema } from 'graphql';
import {
  addProducts,
  checkProductExists,
  getProducts,
} from '../controllers/productsGraphql';

// GraphQL schema
export const graphqlSchema = buildSchema(`
    type Query {
        getProducts: [Course],
        checkProductExists(id: String!):Course,
    },
    type Mutation {
        addProducts(producto: ItemBase!): Course
    },
    input ItemBase {
        _id: String!
        title: String!
        price: Int!
        thumbnail: String!
    }
    type Course {
        _id: String
        title: String
        price: Int
        thumbnail: String
    }    
`);

// Root resolver
export const graphqlRoot = {
  getProducts,
  addProducts,
  checkProductExists,
};
