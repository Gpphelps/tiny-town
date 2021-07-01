const { Schema, model } = require('mongoose');

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
        buildings: {
            placedSchema,
        }
    }
);

const Plot = model('Plot', plotSchema);

module.exports = Plot;