
const mongoose = require('mongoose');

const usersSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true,
            lowercase: true
        },
        email: {
            type: String,
            required: true,
            trim: true,
            lowercase: true
        },
        password: {
            type: String,
        },
        refreshToken :{
            type: String
        },
        accessToken :{
            type: String
        },
        role: {
            type: String,
            required: true
        },
        googleId: {
            type: String
        },
        isActive: {
            type: Boolean,
            default: true,
            required: true
        }
    },
    {
        timestamps: true,
        versionKey: false
    }
)
const Users = mongoose.model('Users', usersSchema);

module.exports = Users;