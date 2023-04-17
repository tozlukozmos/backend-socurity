const User = require("../models/User");
const Service = require("./Service");

class UserService extends Service {
    constructor(){
        super(User)
    }
    login(data){
        return User.findOne(data).populate({
            path: "followers",
            populate: {
                path: "userId",
                select: "username following"
            }
        }).populate({
            path: "following",
            populate: {
                path: "userId",
                select: "username followers"
            }
        });;
    }
    read(where, expand){
        if(!expand) return User.find(where || {});
        return User.find(where || {}).populate({
            path: "followers",
            populate: {
                path: "userId",
                select: "username following"
            }
        }).populate({
            path: "following",
            populate: {
                path: "userId",
                select: "username followers"
            }
        });
    }
    async readPopular(){
        const users = await User.aggregate([
            {
                $set: {
                    totalFollowers: {$size: ["$followers"]},
                }
            },
        ]).sort({totalFollowers: -1}).limit(20);
        const popularUsers = await User.populate(users, {
            path: "following.userId followers.userId",
            select: "_id username following followers isVerified"
        });
        return popularUsers;
    }
}

module.exports = UserService;