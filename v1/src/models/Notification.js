const mongoose = require('mongoose');

const NotificationSchema = new mongoose.Schema({
    actionType: { 
        type: Number,
        required: true,
    },
    sender: {
        type: mongoose.Types.ObjectId,
        ref: "User",
        required: true
    },
    receiver: {
        type: mongoose.Types.ObjectId,
        ref: "User",
        required: true
    },
    postId: {
        type: mongoose.Types.ObjectId,
        ref: "Post",
    },
    isRead: {
        type: Boolean,
        default: false,
        required: true,
    }
}, {timestamps: true})

module.exports = mongoose.model('Notification', NotificationSchema)

