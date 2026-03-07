const express = require("express");
const router = express.Router();
const c = require("../controllers/answerController");
const auth = require("../middleware/authMiddleware");
const role = require("../middleware/roleMiddleware");
const Answer = require("../models/Answer");


router.post("/submit", auth, role(["student"]), c.submitAnswer);


router.get("/my-results", auth, async (req, res) => {
  try {
    const answers = await Answer.find({
      studentId: req.user._id,
    }).populate("examId", "title");

    res.json(answers);
  } catch (err) {
    console.error("Error fetching my-results:", err);
    res.status(500).json({ message: err.message });
  }
});

router.get("/:examId", auth, role(["student"]), c.getMyAnswers);

module.exports = router;
