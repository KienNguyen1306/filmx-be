// models/Movie.js
const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");
const Genre = require("./Genre");
const Country = require("./Country");
const Actor = require("./Actor");

const Movie = sequelize.define("Movie", {
  name: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  view: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 0,
  },
  imageUrl: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  videoUrl: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
});

Movie.belongsTo(Genre);
Movie.belongsTo(Country);
Movie.belongsTo(Actor);


module.exports = Movie;
