const { Schema, model } = require('mongoose');

const buildingSchema = new Schema(
    {
        name: {
            type: String,
            required: true,
        },
    }
);

const Building = model('Building', buildingSchema);

module.exports = Building;