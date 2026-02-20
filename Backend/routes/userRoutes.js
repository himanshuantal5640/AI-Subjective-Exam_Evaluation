const express = require("express");
const router = express.Router();
const {
  getProfile,
  updateProfile,
  uploadProfileImage,
} = require("../controllers/userController");

const auth = require("../middleware/authMiddleware");
const multer = require("multer");

const upload = multer({ dest: "uploads/" });

router.get("/me", auth, getProfile);

router.put("/update", auth, updateProfile);

router.post(
  "/upload-image",
  auth,
  upload.single("image"),
  uploadProfileImage
);

module.exports = router;