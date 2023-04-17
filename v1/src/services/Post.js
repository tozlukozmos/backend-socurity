const Post = require("../models/Post");
const Service = require("./Service");

class PostService extends Service {
    constructor(){
        super(Post)
    }
    read(where, expand){
        if(expand){
            return Post.find(where || {}).populate({
                path: "userId",
                select: "_id username isVerified"
            }).populate({
                path: "comments.userId",
                select: "username"
            }).sort({createdAt: -1});
        }
        return Post.find(where || {})
        .populate({
            path: "comments.userId",
            select: "username"
        }).sort({createdAt: -1});
    }
    async readPopular(){
        const posts = await Post.aggregate([
            {
                $set: {
                    totalComments: {$size: ["$comments"]},
                    totalLibraries: {$size: ["$libraries"]}
                }
            },
            {
                $set: {popularity: {$add: ["$totalComments", "$totalLibraries"]}}
            }
        ]).sort({popularity: -1}).limit(50);
        const popularPosts = await Post.populate(posts, {
            path: "userId comments.userId",
            select: "_id username isVerified"
        });
        return popularPosts;
    }
}

module.exports = PostService;