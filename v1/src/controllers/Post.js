const postService = require("../services/Post");
const PostService = new postService();

const create = (req, res) => {
    req.body.userId = req.user;
    PostService.create(req.body)
    .then(post => {res.status(200).json(post);})
    .catch(err => {res.status(500).json(err);})
}

const deletePost = (req, res) => {
    if(!req.params?.id){
        return res.status(400).send({message: "id must be."})
    }
    PostService.delete(req.params?.id)
    .then(post => {
        if(!post) return req.status(404).send({message: "not found."})
        res.status(200).json(post);
    })
    .catch(err => {res.status(500).json(err);})
}

const findPosts = (req, res) => {
    PostService.read(null, true)
    .then(posts => {res.status(200).json(posts);})
    .catch(err => {res.status(500).json(err);})
}

const findPopularPosts = (req, res) => {
    PostService.readPopular()
    .then(posts => {res.status(200).json(posts);})
    .catch(err => {res.status(500).json(err);})
}

const findLibraryPagePosts = (req, res) => {
    PostService.read({libraries: {$elemMatch: {userId: req.user?._id}}}, true)
    .then(posts => {res.status(200).json(posts);})
    .catch(err => {res.status(500).json(err);})
}

const searchQuery = (req, res) => {
    PostService.read({
        $or: [
            {category: {$in: new RegExp(req.body.word, 'i')}},
            {text: {$in: new RegExp(req.body.word, 'i')}}
        ]
    }, true)
    .then(posts => {res.status(200).json(posts);})
    .catch(err => {res.status(500).json(err);})
}

const findCategoryPagePosts = (req, res) => {
    PostService.read({category: req.body?.category}, true)
    .then(posts => {res.status(200).json(posts);})
    .catch(err => {res.status(500).json(err);})
}

const createComment = (req, res) => {
    PostService.read({_id: req.params.id}, true).then(post => {
        if(!post) res.status(404).send({message: "There is no such a post."})
        const comment = {
            ...req.body,
            created_at: new Date(),
            userId: req.user
        };
        post[0].comments.push(comment);
        post[0].save().then(lastVersion => {res.status(200).send(lastVersion)})
    }).catch(() => console.error)
}

const deleteComment = (req, res) => {
    PostService.read({_id: req.params.id}).then(post => {
        if(!post) res.status(404).send({message: "There is no such a post."})
        post[0].comments = post[0].comments.filter(c => c._id?.toString() !== req.params.commentId)
        post[0].save().then(lastVersion => {res.status(200).send(lastVersion)})
    }).catch(() => console.error)
}

const addLibrary = (req, res) => {
    PostService.read({_id: req.params.id}, true).then(post => {
        if(!post) res.status(404).send({message: "There is no such a post."})
        const library = {
            created_at: new Date(),
            userId: req.user
        };
        post[0].libraries.push(library);
        post[0].save().then(lastVersion => {res.status(200).send(lastVersion)})
    }).catch(() => console.error)
}

const removeLibrary = (req, res) => {
    PostService.read({_id: req.params.id}).then(post => {
        if(!post) res.status(404).send({message: "There is no such a post."})
        post[0].libraries = post[0].libraries.filter(c => c._id?.toString() !== req.params.libraryId)
        post[0].save().then(lastVersion => {res.status(200).send(lastVersion)})
    }).catch(() => console.error)
}

module.exports = {
    create, 
    deletePost,
    findPosts,
    findPopularPosts, 
    findLibraryPagePosts,
    findCategoryPagePosts,
    searchQuery,
    createComment,
    deleteComment,
    addLibrary,
    removeLibrary
};