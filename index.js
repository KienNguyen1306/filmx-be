// app.js
const express = require("express");
const bodyParser = require("body-parser");
const sequelize = require("./config/database");
const cors = require("cors");

// router
const userRoutes = require("./routes/userRoutes");
const genreRoutes = require("./routes/genreRoutes");
const countryRoutes = require("./routes/countryRoutes");
const movieRoutes = require("./routes/movieRoutes");
const actorRoutes = require("./routes/actorRoutes");

// model

const User = require("./models/User");
const Genre = require("./models/Genre");
const Country = require("./models/Country");
const Movie = require("./models/Movie");
const Actor = require("./models/Actor");

const database = require("./dataBase");

// cloudinary
const cloudinary = require("cloudinary").v2;
cloudinary.config({
  cloud_name: 'dhjk2mhjd',
  api_key: '579565358183334',
  api_secret: 'kQejXOyPp3xOuMqZoMVGxw7Lzs4'
});
// swagger
const setupSwagger = require("./swagger.js"); // Thay đổi đường dẫn tới tệp swagger của bạn

// app
const app = express();
// kết nối cort
app.use(cors());

var corsOptions = {
  origin: ['https://phim18hay.online','http://phim18cong.xyz.phim18hay.online'],
  optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
}

// bodyParser
app.use(bodyParser.json());

// URL
app.use("/users", cors(corsOptions), userRoutes);
app.use("/genres", cors(corsOptions), genreRoutes);
app.use("/countries", cors(corsOptions), countryRoutes);
app.use("/movies", cors(corsOptions), movieRoutes);
app.use("/actor", cors(corsOptions), actorRoutes);

setupSwagger(app); // Sử dụng setup Swagger
// Kết nối database
sequelize
  .sync()
  .then(async () => {
    // await User.bulkCreate(database.userData);
    // await Actor.bulkCreate(database.actorData);
    // await Genre.bulkCreate(database.genreData);
    // await Country.bulkCreate(database.contryData);
    // await Movie.bulkCreate(database.movieData);
    console.log("Database synced");
  })
  .catch((err) => {
    console.error("Error syncing database:", err);
  });

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
