const { Schema, model } = require('mongoose');
// Importing the buildingSchema from Building.js
const buildingSchema = require('./Building');

const placedSchema = new Schema(
    {
        buildingName: [buildingSchema],
        building_position_x: {
            type: Number,
            required: true,
        },
        building_position_y: {
            type: Number,
            required: true,
        },
        building_position_z: {
            type: Number,
            required: true,
        }

    }
);

// const PlacedBuilding = model('PlacedBuilding', placedSchema);

module.exports = placedSchema;