const { Schema } = require('mongoose');

const buildingSchema = new Schema(
    {
        buildingType: {
            type: String,
            required: true,
        },
    }
);


module.exports = buildingSchema;