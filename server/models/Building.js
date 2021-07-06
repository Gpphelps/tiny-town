const { Schema, model } = require('mongoose');

const buildingSchema = new Schema(
    {
        buildingName: {
            type: String,
            required: true,
        },
    }
);

// const Building = model('Building', buildingSchema);

module.exports = buildingSchema;