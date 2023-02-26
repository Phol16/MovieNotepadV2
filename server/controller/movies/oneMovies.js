import Movie from '../../models/MovieModel.js';

const oneMovie = async(req, res) => {
  const { id } = req.query;

  const movieFound = await Movie.findOne({_id: id})

  if(!movieFound){
    return res.status(404).json({
      status:'failed',
      message:'Movie not found'
    })
  }

  res.status(200).json({
    status:'success',
    data: movieFound
  })
};
export default oneMovie
