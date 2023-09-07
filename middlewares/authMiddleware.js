// middlewares/authMiddleware.js
const jwt = require("jsonwebtoken");
const User = require("../models/User"); // Import model của người dùng
const dotenv = require("dotenv");

dotenv.config(); // Đọc biến môi trường từ tệp .env

exports.isAuthenticated = async (req, res, next) => {
  const token = req.header("Authorization");

  if (!token) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  try {
    const decoded = jwt.verify(
      token.replace("Bearer ", ""),
      process.env.SECRET_KEY
    );

    // Truy vấn cơ sở dữ liệu để lấy thông tin người dùng từ decoded.id
    const user = await User.findByPk(decoded.id);

    if (!user) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    req.user = user; // Lưu thông tin người dùng vào req.user
    next();
  } catch (error) {
    res.status(401).json({ error: "Unauthorized" });
  }
};

exports.isAdmin = (req, res, next) => {
  if (req.user && req.user.role === "admin") {
    next(); // Nếu người dùng có quyền admin, tiếp tục xử lý
  } else {
    res.status(403).json({ error: "Access denied" }); // Nếu không, trả về lỗi quyền truy cập
  }
};
