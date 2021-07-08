const { AuthenticationError } = require('apollo-server-express');
const { User } = require('../models');
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
        saveBuildings: async (parent, args, context) => {
            if (context.user) {
                const userBuildings = await User.findById(
                    context.user._id 
                );

                userBuildings.plot.buildings.push(args);
                await userBuildings.save();
                console.log(userBuildings);
                return userBuildings;
            }

            throw new AuthenticationError('You need to be logged in to use this feature.');
        },
        savePlot: async (parent, { plot_position_x, plot_position_z }, context) => {
            if (context.user) {
                const savedPlot = await User.findById(
                    context.user._id 
                );

                savedPlot.plot.plot_position_x.push(plot_position_x);
                savedPlot.plot.plot_position_y.push(plot_position_z);
                await savedPlot.save();

                return savedPlot;
                    
            }

            throw new AuthenticationError('You need to be logged in to use this feature.');
        },
    }
};

module.exports = resolvers;