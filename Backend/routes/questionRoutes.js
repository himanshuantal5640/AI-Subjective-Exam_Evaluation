const express = require("express");
const router = express.Router();
const c = require("../controllers/questionController");
const auth = require("../middleware/authMiddleware");
const role = require("../middleware/roleMiddleware");

router.post("/add", auth, role(["teacher"]), c.addQuestion);
router.get("/:examId", auth, c.getQuestions);

module.exports = router;
