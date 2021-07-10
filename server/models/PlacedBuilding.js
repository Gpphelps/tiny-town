const { Schema } = require('mongoose');

const placedSchema = new Schema(
    {
        type: {
            type: String,
        },
        building_position_x: {
            type: Number,
        },
        building_position_y: {
            type: Number,
        },
        building_position_z: {
            type: Number,
        },
        building_color_r: {
            type: Number,
        },
        building_color_g: {
            type: Number,
        },
        building_color_b: {
            type: Number,
        }

    }
);


module.exports = placedSchema;