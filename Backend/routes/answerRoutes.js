const express = require('express');
const router = express.Router();
const c = require("../controllers/answerController");
const auth = require("../middleware/authMiddleware");
const role = require("../middleware/roleMiddleware");

// Student submits answer
router.post(
  "/submit",
  auth,
  role(["student"]),
  c.submitAnswer
);

// Student views own answers
router.get(
  "/:examId",
  auth,
  role(["student"]),
  c.getMyAnswers
);

module.exports = router;
