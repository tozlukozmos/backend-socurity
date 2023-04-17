const router = require("express").Router();
const validate = require("../middlewares/validate");
const authenticate = require("../middlewares/authenticate");
const data = require("../validations/Post");
const {create, deletePost, findPosts, findPopularPosts, findLibraryPagePosts, findCategoryPagePosts, searchQuery, createComment, deleteComment, addLibrary, removeLibrary} = require("../controllers/Post");

router.post("/", authenticate, validate(data.createValidation), create);
router.delete("/:id", authenticate, deletePost);
router.get("/", authenticate, findPosts);
router.get("/explore-page", authenticate, findPopularPosts);
router.get("/library-page", authenticate, findLibraryPagePosts);
router.post("/category-page", authenticate, findCategoryPagePosts);
router.post("/search", authenticate, searchQuery);
router.post("/:id/create-comment", authenticate, validate(data.commentValidation), createComment);
router.delete("/:id/:commentId", authenticate, deleteComment);
router.post("/:id/add-to-library", authenticate, addLibrary);
router.delete("/:id/:libraryId/remove-from-library", authenticate, removeLibrary);

module.exports = router;