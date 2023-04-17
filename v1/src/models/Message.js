const mongoose = require('mongoose');

const MessageSchema = new mongoose.Schema({
    message: { 
        type: String,
        trim: true,
        required: true,
    },
    sender: {
        type: mongoose.Types.ObjectId,
        required: true,
        unique: true
    },
    receiver: {
        type: mongoose.Types.ObjectId,
        required: true,
        unique: true
    }
}, {timestamps: true})

module.exports = mongoose.model('Message', MessageSchema)

