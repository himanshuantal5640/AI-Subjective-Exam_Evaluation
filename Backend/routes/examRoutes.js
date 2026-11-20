const express = require("express");
const examController = require("../controllers/examController");
const auth = require("../middleware/authMiddleware");
const role = require("../middleware/roleMiddleware");

const router = express.Router();

router.post("/create", auth, role(["teacher"]), examController.createExam);
router.get("/my-exams", auth, role(["teacher"]), examController.getMyExams);
router.put("/:id/toggle-status", auth, role(["teacher"]), examController.toggleExamStatus);

// Students can fetch available exams
router.get("/available", auth, role(["student"]), examController.getAvailableExams);

// Fetch a single exam by ID (for students taking the exam and teachers reviewing)
router.get("/:id", auth, examController.getExamById);

module.exports = router;
