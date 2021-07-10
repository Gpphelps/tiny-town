const { Schema, model } = require('mongoose');
const bcrypt = require('bcrypt');

// const plotSchema = require('./Plot');

const placedSchema = require('./PlacedBuilding');

const userSchema = new Schema(
    {
        username: {
            type: String,
            required: true,
            unique: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
            match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'You must submit a valid email address'],
        },
        password: {
            type: String,
            trim: true,
            required: true,
        },
        plot: {
            plot_position_x: {
                type: Number,
            },
            plot_position_z: {
                type: Number,
            },
            buildings: [
                placedSchema,
            ]
        },
    },
    {
        toJSON: {
            virtuals: true,
        },
    }
);

// Hashes user password
userSchema.pre('save', async function (next) {
    if (this.isNew || this.isModified('password')) {
        const saltRounds = 10;
        this.password = await bcrypt.hash(this.password, saltRounds);
    }

    next();
});

// Method to compare and validate user's password for logging in
userSchema.methods.isCorrectPassword = async function (password) {
    return bcrypt.compare(password, this.password);
};

const User = model('User', userSchema);

module.exports = User;