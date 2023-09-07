// middlewares/authMiddleware.js
const jwt = require("jsonwebtoken");
const User = require("../models/User"); // Import model của người dùng

const dotenv = require("dotenv");

dotenv.config();

exports.login = async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await User.findOne({ where: { username } });

    if (!user || user.password !== password) {
      return res.status(401).json({ error: "Invalid credentials" });
    }
    const secretKey = process.env.SECRET_KEY;
    const token = jwt.sign(
      { id: user.id, username: user.username },
      secretKey,
      { expiresIn: "1h" }
    );
    res.json({ token });
  } catch (error) {
    console.error("Error during login:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

exports.getUserProfile = (req, res) => {
  const userProfile = {
    id: req.user.id,
    username: req.user.username,
    // Thêm các thông tin khác của người dùng tùy ý
  };
  res.json(userProfile);
};

exports.createUser = async (req, res) => {
  try {
    const { username, password, role } = req.body;

    // Kiểm tra xem người dùng đã tồn tại chưa
    const existingUser = await User.findOne({ where: { username } });
    if (existingUser) {
      return res.status(400).json({ error: "User already exists" });
    }

    // Tạo người dùng mới
    const newUser = await User.create({ username, password, role });

    res.json(newUser);
  } catch (error) {
    console.error("Error creating user:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};



exports.deleteUserById = async (req, res) => {
  try {
    const userId = req.params.id;
    const user = await User.findByPk(userId);
    if (user) {
      if (user.avatar) {
        // Delete avatar file if it exists
        fs.unlinkSync(user.avatar);
      }
      await user.destroy();
      res.status(204).send();
    } else {
      res.status(404).json({ error: 'User not found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Error deleting user' });
  }
};



