const router = require("express").Router();
const validate = require("../middlewares/validate");
const data = require("../validations/User");
const authenticate = require("../middlewares/authenticate");
const {signup, login, update, changePassword, deleteUser, findUsers, findPopularUsers, searchQuery, findPosts, findFeedPagePosts, follow, unfollow} = require("../controllers/User");

router.post("/", validate(data.registerValidation), signup);
router.post("/login", validate(data.loginValidation), login);
router.patch("/", authenticate, validate(data.updateValidation), update);
router.post("/change-password", authenticate, validate(data.passwordValidation), changePassword);
router.delete("/:id", authenticate, deleteUser);
router.get("/", authenticate, findUsers);
router.post("/explore-page", authenticate, findPopularUsers);
router.post("/search", authenticate, searchQuery);
router.get("/posts", authenticate, findPosts);
router.post("/posts/feed-page", authenticate, findFeedPagePosts);
router.post("/:id/follow", authenticate, follow);
router.delete("/:id/unfollow", authenticate, unfollow);

module.exports = router;