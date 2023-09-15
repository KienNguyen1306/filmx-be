// routes/movieRoutes.js
const express = require("express");
const MovieController = require("../controllers/MovieController");
const { isAuthenticated, isAdmin } = require("../middlewares/authMiddleware");
const multer = require("multer");
const upload = multer({ dest: "uploads/" });

const router = express.Router();
router.get("/search", MovieController.getMoviesByName); // GET movies by search query with pagination

router.get("/:id", MovieController.getMovieById); // GET movie by ID
router.get("/", MovieController.getMovies); // GET all movies with pagination

router.get("/:id/related", MovieController.getRelatedMovies); // GET related movies for a specific movie

// Implement other routes here (getMoviesByGenre, getMoviesByCountry, createMovie, updateMovie, deleteMovie)
router.get("/genre/:genreId", MovieController.getMoviesByGenre); // GET movies by genre with pagination
router.get("/country/:countryId", MovieController.getMoviesByCountry); // GET movies by country with pagination
router.get("/actor/:actorId", MovieController.getMoviesByActor); // GET movies by actor with pagination

router.post(
  "/",
  isAuthenticated,
  isAdmin,
  upload.fields([
    { name: "imageUrl", maxCount: 1 },
    { name: "videoUrl", maxCount: 1 },
  ]),
  MovieController.createMovie
); // CREATE a movie
router.put(
  "/:id",
  isAuthenticated,
  isAdmin,
  upload.fields([
    { name: "imageUrl", maxCount: 1 },
    { name: "videoUrl", maxCount: 1 },
  ]),
  MovieController.updateMovie
); // UPDATE a movie
router.delete("/:id", isAuthenticated, isAdmin, MovieController.deleteMovie); // DELETE a movie
router.post("/increase-view/:movieId", MovieController.increaseView); // API để tăng số lượt xem

module.exports = router;
