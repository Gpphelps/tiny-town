const { Schema } = require('mongoose');

const placedSchema = require('./PlacedBuilding');

const plotSchema = new Schema(
    {
        plot_position_x: {
            type: Number,
        },
        plot_position_z: {
            type: Number,
        },
        buildings: [
            placedSchema,
        ],
        plotName: {
            type: String
        },
    }
);


module.exports = plotSchema;


