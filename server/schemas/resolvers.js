const { AuthenticationError } = require('apollo-server-express');
const { User } = require('../models');
const { findById } = require('../models/User');
const { signToken } = require('../utils/auth');


const resolvers = {
    Query: {
        users: async () => {
            return User.find({});
        },
        user: async (parent, args) => {
            return User.findOne({
                args
            });
        },
        me: async (parent, args, context) => {
            if (context.user) {
              return User.findOne({ _id: context.user._id })
            }
            throw new AuthenticationError('You need to be logged in!');
        },
        city: async () => {
            return User.find({}).populate('plot')
        },
            
    },

    Mutation: {
        addUser: async (parent, { username, email, password }) => {
            const user = await User.create({ username, email, password });
            const token = signToken(user);

            return { token, user };
        },
        login: async (parent, { email, password }) => {
            const user = await User.findOne({ email });
            if (!user) {
                throw new AuthenticationError('Incorrect credentials');
                
            }

            const correctPw = await user.isCorrectPassword(password);

            if (!correctPw) {
                throw new AuthenticationError('Incorrect credentials');
                
            }

            const token = signToken(user);
            return { token, user };
        }, 
        savePlot: async (parent, { plot_position_x, plot_position_z, buildings, plotName }, context) => {
            if (context.user) {
                const savedPlot = await User.findById(
                    context.user._id 
                );

                let parsed = JSON.parse(buildings)
                let buildingArray = []
                parsed.forEach(building => {
                    buildingArray.push(building)
                })

                let newPlot = {
                    plot_position_x: plot_position_x,
                    plot_position_z: plot_position_z,
                    buildings: buildingArray,
                    plotName: plotName
                }

                savedPlot.plot.push(newPlot)

                await savedPlot.save();

                return savedPlot;
            }

            throw new AuthenticationError('You need to be logged in to use this feature.');
        },
        removeBuilding: async (parent, { _id }, context ) => {
            if (context.user) {
                const updatedBuildings = await User.findById(
                    context.user._id 
                );

                updatedBuildings.plot.plotSchema.buildings.pull(_id);
                await updatedBuildings.save();

                return updatedBuildings;
            }
        }

    }
};

module.exports = resolvers;