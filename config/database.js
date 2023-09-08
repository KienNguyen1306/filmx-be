const { Sequelize } = require("sequelize");
const dotenv = require("dotenv");
dotenv.config(); // Đọc biến môi trường từ tệp .env
const sequelize = new Sequelize({
  dialect: "mysql",
  username: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASS,
  database: process.env.DATABASE_NAME,
  host: process.env.DATABASE_HOST,
  port: process.env.DATABASE_PORT,
});
console.log("password", process.env.DATABASE_PASS);

module.exports = sequelize;
