// controllers/GenreController.js
const Genre = require('../models/Genre');

exports.getGenres = async (req, res) => {
  try {
    const genres = await Genre.findAll();
    res.status(200).json(genres);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching genres' });
  }
};

exports.createGenre = async (req, res) => {
  try {
    const { name } = req.body;
    const genre = await Genre.create({ name });
    res.status(201).json(genre);
  } catch (error) {
    res.status(500).json({ error: 'Error creating genre' });
  }
};

exports.updateGenre = async (req, res) => {
  try {
    const genreId = req.params.id;
    const { name } = req.body;
    const [updatedRowsCount, updatedGenres] = await Genre.update(
      { name },
      { where: { id: genreId }, returning: true }
    );
    if (updatedRowsCount === 0) {
      return res.status(404).json({ error: 'Genre not found' });
    }
    res.status(200).json(updatedGenres[0]);
  } catch (error) {
    res.status(500).json({ error: 'Error updating genre' });
  }
};

exports.deleteGenre = async (req, res) => {
  try {
    const genreId = req.params.id;
    const deletedRowCount = await Genre.destroy({ where: { id: genreId } });
    if (deletedRowCount === 0) {
      return res.status(404).json({ error: 'Genre not found' });
    }
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: 'Error deleting genre' });
  }
};
