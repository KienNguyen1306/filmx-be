const { Sequelize } = require("sequelize");

const sequelize = new Sequelize({
  dialect: "mysql",
  username: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASS,
  database: process.env.DATABASE_NAME,
  // host: 'localhost'
});

module.exports = sequelize;
