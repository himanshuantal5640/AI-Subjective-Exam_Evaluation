const router = require("express").Router();
const controller = require("../controllers/authController");

router.post("/register", controller.register);
router.post("/verify-otp", controller.verifyOTP);
router.post("/login", controller.login);
router.post("/forgot-password", controller.forgotPassword);
router.post("/reset-password", controller.resetPassword);
router.post("/resend-otp", controller.resendOTP);
router.post("/logout", controller.logout);

module.exports = router;
