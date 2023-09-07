const { Sequelize } = require('sequelize');

const sequelize = new Sequelize({
  dialect: 'mysql',
  username: 'root',
  password: '',
  database: 'filmx',
  host: 'localhost'
});

module.exports = sequelize;