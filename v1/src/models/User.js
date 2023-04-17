const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    username: { 
        type: String,
        lowercase: true,
        trim: true,
        required: true,
        unique: true
    },
    email: {
        type: String,
        trim: true,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
    },
    place: {
        type: String,
        trim: true,
        default: ""
    },
    department: {
        type: String,
        trim: true,
        default: ""
    },
    profession: {
        type: String,
        trim: true,
        default: ""
    },
    following: [{
        userId: {
            type: mongoose.Types.ObjectId,
            ref: "User"
        },
        created_at: Date
    }],
    followers: [{
        userId: {
            type: mongoose.Types.ObjectId,
            ref: "User"
        },
        created_at: Date
    }],
    isVerified: {
        type: Boolean,
        default: false,
        required: true,
    },
    isAdmin: {
        type: Boolean,
        default: false,
        required: true,
    }
}, {timestamps: true});

module.exports = mongoose.model('User', UserSchema);

