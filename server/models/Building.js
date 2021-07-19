const { Schema } = require('mongoose');

const buildingSchema = new Schema(
    {
        type: {
            type: String,
            required: true,
        },
    }
);


module.exports = buildingSchema;