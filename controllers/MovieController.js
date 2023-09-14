// controllers/MovieController.js
const Movie = require("../models/Movie");
const Genre = require("../models/Genre");
const Country = require("../models/Country");
const { Op } = require("sequelize");
const until = require("../until");

exports.getMoviesByName = async (req, res) => {
  try {
    const searchQuery = req.query.q;
    const page = req.query.page || 1;
    const limit = req.query.limit || 10;
    const offset = (page - 1) * limit;

    const { count, rows: movies } = await Movie.findAndCountAll({
      where: {
        [Op.or]: [
          { name: { [Op.like]: `%${searchQuery}%` } }, // Tìm kiếm theo tên phim
          { actors: { [Op.like]: `%${searchQuery}%` } }, // Tìm kiếm theo tên diễn viên
        ],
      },
      order: [["createdAt", "DESC"]],
      offset,
      limit,
      include: [{ model: Genre }, { model: Country }],
    });
    if (count === 0) {
      // Trả về một thông báo hoặc danh sách rỗng khi không có kết quả tìm kiếm
      return res.status(200).json({ movies: [], totalPages: 0 });
    }

    const totalPages = Math.ceil(count / limit);

    res.status(200).json({ movies, totalPages });
  } catch (error) {
    console.error("Error searching for movies:", error); // Gỡ rối: in lỗi chi tiết
    res.status(500).json({ error: "Error searching for movies" });
  }
};

exports.getMovieById = async (req, res) => {
  try {
    const movieId = req.params.id;
    const movie = await Movie.findByPk(movieId, {
      include: [{ model: Genre }, { model: Country }],
    });
    if (!movie) {
      return res.status(404).json({ error: "Movie not found" });
    }
    res.status(200).json(movie);
  } catch (error) {
    res.status(500).json({ error: "Error fetching movie" });
  }
};

exports.getMovies = async (req, res) => {
  try {
    const page = req.query.page || 1;
    const limit = req.query.limit || 10;
    const offset = (page - 1) * limit;

    const { count, rows: movies } = await Movie.findAndCountAll({
      order: [["createdAt", "DESC"]],
      offset,
      limit,
      include: [{ model: Genre }, { model: Country }],
    });
    if (count === 0) {
      // Trả về một thông báo hoặc danh sách rỗng khi không có kết quả tìm kiếm
      return res.status(200).json({ message: "No movies found" });
    }

    const totalPages = Math.ceil(count / limit);
    res.status(200).json({ movies, totalPages });
  } catch (error) {
    res.status(500).json({ error: error });
  }
};

// Implement other methods here (getMoviesByGenre, getMoviesByCountry, createMovie, updateMovie, deleteMovie)
exports.getMoviesByGenre = async (req, res) => {
  try {
    const genreId = req.params.genreId;
    const page = req.query.page || 1;
    const limit = req.query.limit || 10;
    const offset = (page - 1) * limit;

    const { count, rows: movies } = await Movie.findAndCountAll({
      where: { GenreId: genreId },
      order: [["createdAt", "DESC"]],
      offset,
      limit,
      include: [{ model: Genre }, { model: Country }],
    });
    const totalPages = Math.ceil(count / limit);
    res.status(200).json({ movies, totalPages });
  } catch (error) {
    res.status(500).json({ error: "Error fetching movies by genre" });
  }
};

exports.getMoviesByCountry = async (req, res) => {
  try {
    const countryId = req.params.countryId;
    const page = req.query.page || 1;
    const limit = req.query.limit || 10;
    const offset = (page - 1) * limit;

    const { count, rows: movies } = await Movie.findAndCountAll({
      where: { CountryId: countryId },
      order: [["createdAt", "DESC"]],
      offset,
      limit,
      include: [{ model: Genre }, { model: Country }],
    });
    const totalPages = Math.ceil(count / limit);
    res.status(200).json({ movies, totalPages });
  } catch (error) {
    res.status(500).json({ error: "Error fetching movies by country" });
  }
};

exports.getMoviesByActor = async (req, res) => {
  try {
    const actorId = req.params.actorId;
    const page = req.query.page || 1;
    const limit = req.query.limit || 10;
    const offset = (page - 1) * limit;

    const { count, rows: movies } = await Movie.findAndCountAll({
      where: { ActorId: actorId },
      order: [["createdAt", "DESC"]],
      offset,
      limit,
      include: [{ model: Genre }, { model: Country }],
    });

    const totalPages = Math.ceil(count / limit);
    res.status(200).json({ movies, totalPages });
  } catch (error) {
    res.status(500).json({ error: "Error fetching movies by actor" });
  }
};

exports.createMovie = async (req, res) => {
  try {
    const { name, genreId, countryId } = req.body;
    const imageUrl = req.files["imageUrl"][0]; // Tệp ảnh đã tải lên
    const videoUrl = req.files["videoUrl"][0]; // Tệp video đã tải lên
    let imageLink = await until.uploadCloudinry(imageUrl);
    let videoLink = await until.uploadCloudinry(videoUrl);
    const movie = await Movie.create({
      name,
      imageUrl: imageLink,
      videoUrl: videoLink,
      GenreId: genreId,
      CountryId: countryId,
    });
    res.status(201).json(movie);
  } catch (error) {
    res.status(500).json({ error: "Error creating movie" });
  }
};

exports.updateMovie = async (req, res) => {
  try {
    const movieId = req.params.id;
    const { name, genreId, countryId } = req.body;
    const imageUrl = req.files["imageUrl"][0]; // Tệp ảnh đã tải lên
    const videoUrl = req.files["videoUrl"][0]; // Tệp video đã tải lên
    let imageLink = await until.uploadCloudinry(imageUrl);
    let videoLink = await until.uploadCloudinry(videoUrl);
    const [updatedRowsCount, updatedMovies] = await Movie.update(
      {
        name,
        imageUrl: imageLink,
        videoUrl: videoLink,
        GenreId: genreId,
        CountryId: countryId,
      },
      { where: { id: movieId }, returning: true }
    );
    if (updatedRowsCount === 0) {
      return res.status(404).json({ error: "Movie not found" });
    }
    res.status(200).json(updatedMovies[0]);
  } catch (error) {
    res.status(500).json({ error: "Error updating movie" });
  }
};

exports.deleteMovie = async (req, res) => {
  try {
    const movieId = req.params.id;
    const deletedRowCount = await Movie.destroy({ where: { id: movieId } });
    if (deletedRowCount === 0) {
      return res.status(404).json({ error: "Movie not found" });
    }
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: "Error deleting movie" });
  }
};

exports.getRelatedMovies = async (req, res) => {
  try {
    const movieId = req.params.id; // Lấy ID của phim được click

    // Lấy thông tin phim được click
    const clickedMovie = await Movie.findByPk(movieId, {
      include: [{ model: Genre }, { model: Country }],
    });

    if (!clickedMovie) {
      return res.status(404).json({ error: "Movie not found" });
    }

    // Lấy danh sách phim liên quan (ngoại trừ phim được click)
    const relatedMovies = await Movie.findAll({
      where: {
        id: { [Op.ne]: clickedMovie.id }, // Loại bỏ phim được click khỏi danh sách
        // Điều kiện tùy ý khác để xác định phim liên quan (ví dụ: cùng thể loại, cùng quốc gia)
      },
      limit: 10, // Giới hạn số lượng phim liên quan
      include: [{ model: Genre }, { model: Country }],
    });

    res.status(200).json({ clickedMovie, relatedMovies });
  } catch (error) {
    console.error("Error fetching related movies:", error);
    res.status(500).json({ error: "Error fetching related movies" });
  }
};

exports.increaseView = async (req, res) => {
  try {
    const videoId = req.params.id;

    // Tìm video theo ID
    const video = await db.Video.findByPk(videoId);
    if (!video) {
      return res.status(404).json({ error: "Video not found" });
    }

    // Tăng số lượt xem
    video.viewCount += 1;
    await video.save();

    res.json({ message: "View increased successfully" });
  } catch (error) {
    console.error("Error increasing view:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};
