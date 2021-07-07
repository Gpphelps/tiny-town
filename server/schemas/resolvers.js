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
                const newBuilding = await User.findOneAndUpdate(
                    { _id: context.plot._id },
                    { $addToSet: { buildings: args } },
                    {
                        new: true,
                        runValidators: true,
                    }
                );
                    console.log(`newBuilding = ${JSON.stringify(newBuilding, undefined, 2)}`);
                return newBuilding;
            }

            throw new AuthenticationError('You need to be logged in to use this feature.');
        }
    }
};

module.exports = resolvers;