const router = require("express").Router();
const validate = require("../middlewares/validate");
const authenticate = require("../middlewares/authenticate");
const data = require("../validations/Notification");
const {create, read, update} = require("../controllers/Notification");

router.post("/:receiverId", authenticate, validate(data.createValidation), create);
router.get("/", authenticate, read);
router.patch("/", authenticate, update);

module.exports = router;