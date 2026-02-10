const express = require("express");
const controller = require("../controllers/authController");

const router = express.Router();

router.post("/register", controller.register);
router.post("/verify-otp", controller.verifyOTP);
router.post("/login", controller.login);
router.post("/forgot-password", controller.forgotPassword);
router.post("/reset-password", controller.resetPassword);

module.exports = router;
