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
            console.log('[---USER CONTEXT---]')
            console.log(context.user)
            console.log(User.findOne({ _id: context.user._id }))
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
            console.log(username,email,password)
            const user = await User.create({ username, email, password });
            console.log(username,email,password)
            const token = signToken(user);

            return { token, user };
        },
        login: async (parent, { email, password }) => {
            console.log('------')
            console.log(email,password)
            const user = await User.findOne({ email });
            console.log('------')
            console.log(user)
            if (!user) {
                throw new AuthenticationError('Incorrect credentials');
            }

            const correctPw = await user.isCorrectPassword(password);

            if (!correctPw) {
                throw new AuthenticationError('Incorrect credentials');
            }

            const token = signToken(user);
            console.log(token)
            return { token, user };
        },
        savePlot: async (parent, { plot_position_x, plot_position_z, buildings, plotName }, context) => {
            console.log(buildings)
            if (context.user) {
                const savedPlot = await User.findById(
                    context.user._id 
                );

                console.log('-----SAVE PLOT------')
                // console.log(savedPlot)
                // console.log(savedPlot.plot)



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



                //custom property inserted so editor knows what plot it's working with
                // savedPlot.currentPlotID = savedPlot.plot[savedPlot.plot.length-1]._id

                // savedPlot.plot.plotSchema.plot_position_x.push(plot_position_x);
                // savedPlot.plot.plotSchema.plot_position_y.push(plot_position_z);
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