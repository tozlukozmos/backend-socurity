const Notification = require("../models/Notification");
const Service = require("./Service");

class NotificationService extends Service {
    constructor(){
        super(Notification)
    }
    read(where){
        return Notification.find(where || {})
        .populate({
            path: "sender receiver",
            select: "username"
        }).sort({createdAt: -1});
    }
    update(id, data){
        return Notification.updateMany(id || {}, data)
        .populate({
            path: "sender receiver",
            select: "username"
        }).sort({createdAt: -1});
    }
}

module.exports = NotificationService;