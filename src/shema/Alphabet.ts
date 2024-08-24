import { buildSchema } from 'graphql';
const typeDefs = buildSchema(`
    type Alphabets {
        id: ID!
        alphabet: String
        value: Int
        createdAt: String
        updatedAt: String
    }
    type usersInfoResponse {
        success: Boolean!
        total: Int!
        items: [Alphabets]
    }
    input AlphabetFilter {
        alphabet: String
        value: String
        createdAt: String
        updatedAt: String
        id: String
    }
    type Query {
        getAlphabets: usersInfoResponse
        getAlphabet(id: String!): Alphabets
        getAlphabetsByAlphabet(where: AlphabetFilter): usersInfoResponse
    }
    type Mutation {
        AddAlphabet(data: AlphabetInput!): getAlphabetsResponse
        UpdateAlphabet(data:AlphabetUpdateInput): updateAlphabetsResponse
        DeleteAlphabet(id: ID!): updateAlphabetsResponse
        
    }
    type getAlphabetsResponse {
        success: Boolean!
        message: String!
        id: Int
    }
    input AlphabetInput {
        alphabet: String!
        value: Int!
    }
    input AlphabetUpdateInput {
        id: ID!
        alphabet: String
        value: Int
    }
   type updateAlphabetsResponse {
       success: Boolean!
       message: String!
   }
`);

export default typeDefs;
