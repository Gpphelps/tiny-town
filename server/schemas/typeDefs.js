const { gql } = require('apollo-server-express');

const typeDefs = gql`
    type User {
        _id: ID
        username: String
        email: String
        plot: [Plot]
    }

    type Plot {
        _id: ID
        plot_position_x: Int
        plot_position_z: Int
        buildings: [Building]
    }

    type Building {
        _id: ID
        type: String
        building_position_x: Int
        building_position_y: Int
        building_position_z: Int
    }

    type Auth {
        token: ID!
        user: User
    }

    type Query {
        users: [User]
        user(_id: String, username: String): User
        me: User
        city: Plot
    }

    type Mutation {
        addUser(username: String!, email: String!, password: String!): Auth
        login(email: String!, password: String!): Auth
        saveBuildings(buildingType: String!, building_position_x: Int!, building_position_y: Int!, building_position_z: Int!): User
        savePlot(plot_position_x: Int, plot_position_z: Int): Plot
        removeBuilding(_id: ID): User
    }
`;

module.exports = typeDefs;