const express = require('express');
const { isAuthenticated, isAdmin } = require("../middlewares/authMiddleware");

const GenreController = require('../controllers/GenreController');

const router = express.Router();

router.get('/', GenreController.getGenres); // GET all genres
router.post('/', isAuthenticated, isAdmin, GenreController.createGenre); // CREATE a genre
router.put('/:id', isAuthenticated, isAdmin, GenreController.updateGenre); // UPDATE a genre
router.delete('/:id', isAuthenticated, isAdmin, GenreController.deleteGenre); // DELETE a genre

module.exports = router;