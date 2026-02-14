const router = require("express").Router();
const controller = require("../controllers/chatController");
const auth = require("../middleware/authMiddleware");

router.get("/:userId", auth, controller.getChatHistory);

module.exports = router;
