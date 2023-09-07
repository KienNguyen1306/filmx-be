// routes/authRoutes.js
const express = require("express");
const AuthController = require("../controllers/UserController");
const { isAuthenticated, isAdmin } = require("../middlewares/authMiddleware");

const router = express.Router();

router.get("/profile", isAuthenticated, AuthController.getUserProfile);
router.post("/create", isAuthenticated, isAdmin, AuthController.createUser); // Chỉ admin mới có quyền tạo phim
router.post("/", AuthController.login); // Đăng nhập và tạo token

module.exports = router;
