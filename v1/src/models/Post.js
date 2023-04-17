const mongoose = require('mongoose');

const PostSchema = new mongoose.Schema({
    text: { 
        type: String,
        trim: true,
        required: true
    },
    userId: {
        type: mongoose.Types.ObjectId,
        ref: "User",
        required: true,
        unique: true,
    },
    category: {
        type: String,
        lowercase: true,
        trim: true,
        required: true
    },
    comments: [{
        comment: String,
        created_at: Date,
        userId: {
            type: mongoose.Types.ObjectId,
            ref: "User"
        }
    }],
    libraries: [{
        userId: {
            type: mongoose.Types.ObjectId,
            ref: "User"
        },
        created_at: Date
    }]
}, {timestamps: true})

module.exports = mongoose.model('Post', PostSchema)

