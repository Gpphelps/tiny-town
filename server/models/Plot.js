const { Schema } = require('mongoose');

const placedSchema = require('./PlacedBuilding');

const plotSchema = new Schema(
    {
        plot_position_x: {
            type: Number,
            required: true,
        },
        plot_position_z: {
            type: Number,
            required: true,
        },
        buildings: [
            placedSchema,
        ]
    }
);


module.exports = plotSchema;


