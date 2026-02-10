const express = require("express");
const examController = require("../controllers/examController");
const auth = require("../middleware/authMiddleware");
const role = require("../middleware/roleMiddleware");

const router = express.Router();

// Teacher creates exam
router.post(
  "/create",
  auth,
  role(["teacher"]),
  examController.createExam
);

// Teacher views own exams
router.get(
  "/my-exams",
  auth,
  role(["teacher"]),
  examController.getMyExams
);

module.exports = router;
