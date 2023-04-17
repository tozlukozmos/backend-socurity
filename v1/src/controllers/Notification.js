const notificationService = require("../services/Notification");
const NotificationService = new notificationService();

const create = (req, res) => {
    const notification = {
        ...req.body,
        sender: req.user._id,
        receiver: req.params.receiverId
    };
    NotificationService.create(notification)
    .then(notification => {res.status(200).json(notification);})
    .catch(err => {res.status(500).json(err);})
}
const read = (req, res) => {
    NotificationService.read({receiver: req.user?._id})
    .then(notifications => {res.status(200).json(notifications);})
    .catch(err => {res.status(500).json(err);})
}
const update = (req, res) => {
    const notificationIds = [];
    req.body.notifications.forEach(notification => {
        notificationIds.push(notification._id);
    });
    NotificationService.update({_id: {$in: notificationIds}}, {isRead: true})
    .then(notification => {res.status(200).json(notification);})
    .catch(err => {res.status(500).json(err);})
}

module.exports = {
    create, 
    read,
    update,
};