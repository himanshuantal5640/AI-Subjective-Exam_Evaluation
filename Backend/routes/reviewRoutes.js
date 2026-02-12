const router = require("express").Router();
const reviewController = require("../controllers/reviewController");
const auth = require("../middleware/authMiddleware");
const role = require("../middleware/roleMiddleware");

// View answers for exam (Teacher only)
router.get(
  "/exam/:examId",
  auth,
  role(["teacher"]),
  reviewController.getAnswersForReview
);

// Override answer score (Teacher only)
router.put(
  "/override/:answerId",
  auth,
  role(["teacher"]),
  reviewController.overrideAnswerScore
);

module.exports = router;
