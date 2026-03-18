const router = require("express").Router();
const controller = require("../controllers/chatController");
const auth = require("../middleware/authMiddleware");

router.get("/:userId", auth, controller.getChatHistory);
router.post("/send", auth, controller.sendMessage);

module.exports = router;
