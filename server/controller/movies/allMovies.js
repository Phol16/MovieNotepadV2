import Movie from '../../models/MovieModel.js';

const allMovies = async (req, res) => {
  const { page, limit } = req.query

  let total = 0;
  const limitNumber =  limit || 6
  const skip = parseInt(page) === 1 ? 0 : (parseInt(page)*limitNumber)-limitNumber ;

  let movieList = await Movie.find({deletedAt: null}).sort({createdAt: -1})
  total = movieList.length/(limitNumber)

   movieList = movieList.slice(skip, skip ? skip+limitNumber : limitNumber )

  if (!movieList.length) {
    return res.status(404).json({
      status: 'failed',
      message: ' No movie data found',
    });
  }

  res.status(200).json({
    status: 'success',
    dateFetched: Date.now(),
    data: movieList,
    totalPage: Math.ceil(total),
  });
};

export default allMovies