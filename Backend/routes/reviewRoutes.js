const router = require("express").Router();
const reviewController = require("../controllers/reviewController");
const auth = require("../middleware/authMiddleware");
const role = require("../middleware/roleMiddleware");


router.get("/exam/:examId", auth, role(["teacher"]), reviewController.getAnswersForReview);


router.put("/override/:answerId", auth, role(["teacher"]), reviewController.overrideAnswerScore);
router.post("/evaluate-ai/:answerId", auth, role(["teacher"]), reviewController.evaluateAnswerWithAI);
router.get("/audit/:answerId", auth, role(["teacher", "admin"]), reviewController.getAuditLogs);

module.exports = router;
