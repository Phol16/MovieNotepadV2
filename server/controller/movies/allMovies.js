import Movie from '../../models/MovieModel.js';

const allMovies = async (req, res) => {
  const movieList = await Movie.find().sort({createdAt: -1});

  if (!movieList) {
    res.status(404).json({
      status: 'failed',
      message: ' No movie data found',
    });
  }

  const currentDate = Date.now()

  res.status(200).json({
    status: 'success',
    dateFetched: new Date(currentDate).toLocaleString(),
    data: movieList,
  });
};

export default allMovies