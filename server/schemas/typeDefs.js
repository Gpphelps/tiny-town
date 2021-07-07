const { gql } = require('apollo-server-express');

const typeDefs = gql`
    type User {
        _id: ID
        username: String
        email: String
    }

    type Auth {
        token: ID!
        user: User
    }

    type Query {
        users: [User]
        user(_id: String, username: String): User
        me: User
    }

    type Mutation {
        addUser(username: String!, email: String!, password: String!): Auth
        login(email: String!, password: String!): Auth
        saveBuildings(buildingName: String!, building_position_x: Int!, building_position_y: Int!, building_position_z: Int!): User
    }
`;

module.exports = typeDefs;