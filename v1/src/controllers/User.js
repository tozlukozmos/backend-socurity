const userService = require("../services/User");
const UserService = new userService();
const postService = require("../services/Post");
const PostService = new postService();
const {hashPass, generateAccessToken, generateRefreshToken} = require("../scripts/helper");

const signup = (req, res) => {
    req.body.password = hashPass(req.body.password);
    UserService.create(req.body)
    .then(user => {res.status(200).json(user);})
    .catch(err => {res.status(500).json(err);})
}

const login = (req, res) => {
    req.body.password = hashPass(req.body.password);
    UserService.login(req.body)
    .then(user => {
        if(user){
            user = {
                ...user.toObject(),
                tokens: {
                    access_token: generateAccessToken(user),
                    refresh_token: generateRefreshToken(user)
                }
            };
            delete user.password;
            res.status(200).json(user)
        } else {
            res.status(404).json({message: "we cannot found anyone."})
        }
    })
    .catch(err => {res.status(500).json(err);})
}

const update = (req, res) => {
    UserService.update(req.user?._id, req.body)
    .then(user => {res.status(200).json(user);})
    .catch(err => {res.status(500).json(err);})
}

const changePassword = (req, res) => {
    req.body.password = hashPass(req.body.password);
    UserService.update(req.user?._id, req.body)
    .then(user => {res.status(200).json(user);})
    .catch(err => {res.status(500).json(err);})
}

const deleteUser = (req, res) => {
    if(!req.params?.id){
        return res.status(400).send({message: "id must be."})
    }
    UserService.delete(req.params?.id)
    .then(user => {
        if(!user) return req.status(404).send({message: "not found."})
        res.status(200).json(user);
    })
    .catch(err => {res.status(500).json(err);})
}

const findUsers = (req, res) => {
    UserService.read(null, true)
    .then(users => {res.status(200).json(users);})
    .catch(err => {res.status(500).json(err);})
}

const findPopularUsers = (req, res) => {
    UserService.readPopular()
    .then(users => {res.status(200).json(users);})
    .catch(err => {res.status(500).json(err);})
}

const searchQuery = (req, res) => {
    UserService.read({
        $or: [
            {username: {$in: new RegExp(req.body.word, 'i')}},
            {place: {$in: new RegExp(req.body.word, 'i')}},
            {department: {$in: new RegExp(req.body.word, 'i')}},
            {profession: {$in: new RegExp(req.body.word, 'i')}}
        ]
    })
    .then(users => {
        res.status(200).json(users);
    })
    .catch(err => {res.status(500).json(err);})
}

const findPosts = (req, res) => {
    PostService.read({userId: req.user?._id}, true).then(posts => {
        res.status(200).send(posts)
    }).catch(() => {
        res.status(500).send({error: "There is a problem during getting user related posts."})
    })
}

const findFeedPagePosts = (req, res) => {
    const userIds = [req.user?._id];
    req.body.following.forEach(user => {
        userIds.push(user.userId._id);
    });
    PostService.read({userId: {$in: userIds}}, true).then(posts => {
        res.status(200).send(posts)
    }).catch(() => {
        res.status(500).send({error: "There is a problem during getting feed page posts."})
    })
}

const follow = (req, res) => {
    UserService.read({_id: req.params.id}, true).then(users => {
        if(!users) res.status(404).send({message: "There is no such a user."})
        const follow = {
            created_at: new Date(),
            userId: req.user
        };
        for(let i = 0; i < users[0].followers.length; i++){
            if(users[0].followers[i].userId._id.toString() == req.user._id) {
                return res.status(400).send({message: "You already follow the user."})
            }
        }
        users[0].followers.push(follow);
        users[0].save().then(() => {
            UserService.read({_id: req.user._id}, true).then(response => {
                if(!response) res.status(404).send({message: "There is no such a user."})
                const following = {
                    created_at: new Date(),
                    userId: users[0]
                };
                for(let i = 0; i < response[0].following.length; i++){
                    if(response[0].following[i].userId._id.toString() == req.params.id) {
                        return res.status(400).send({message: "You already follow the user."})
                    }
                }
                response[0].following.push(following);
                response[0].save().then(responseUser => {res.status(200).send(responseUser)});
            }).catch(() => console.error)
        })
    }).catch(() => console.error)
}

const unfollow = (req, res) => {
    UserService.read({_id: req.params.id}, true).then(users => {
        if(!users) res.status(404).send({message: "There is no such a user."})
        users[0].followers = users[0].followers.filter(u => u.userId?._id.toString() !== req.user._id);
        users[0].save().then(() => {
            UserService.read({_id: req.user._id}, true).then(response => {
                if(!response) res.status(404).send({message: "There is no such a user."})
                response[0].following = response[0].following.filter(u => u.userId?._id.toString() !== req.params.id);
                response[0].save().then(responseUser => {res.status(200).send(responseUser)});
            }).catch(() => console.error)
        })
    }).catch(() => console.error)
}

module.exports = {
    signup, 
    login, 
    update,
    changePassword,
    deleteUser,
    findUsers, 
    findPopularUsers,
    searchQuery,
    findPosts,
    findFeedPagePosts,
    follow,
    unfollow
};