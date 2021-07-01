const { Schema, model } = require('mongoose');
// Importing the buildingSchema from Building.js
const buildingSchema = require('./Building');

const placedSchema = new Schema(
    {
        name: {buildingSchema},
        building_position_x: {
            type: Array,
            required: true,
        },
        building_position_y: {
            type: Array,
            required: true,
        },
        building_position_z: {
            type: Array,
            required: true,
        }

    }
);

const PlacedBuilding = model('PlacedBuilding', placedSchema);

module.exports = PlacedBuilding;