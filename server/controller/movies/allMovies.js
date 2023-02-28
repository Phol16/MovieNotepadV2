import Movie from '../../models/MovieModel.js';

const allMovies = async (req, res) => {
  const movieList = await Movie.find({deletedAt: null}).sort({createdAt: -1});
  console.log(movieList.length);

  if (!movieList.length) {
    return res.status(404).json({
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