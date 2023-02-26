import Movie from "../../models/MovieModel.js"
const createMovie = async(req, res)=>{
  const {title, year, image, genre, imdbId, description} = req.body
  const authorId = req.user.id

  try {
    const newMovie = new Movie ({
      title,
      year,
      image,
      genre,
      authorId,
      imdbId,
      description
    })

    const saveMovie = await newMovie.save();

    res.status(200).json({
      status:'success',
      data: saveMovie,
    })
  } catch (error) {
    res.status(500).json({
      status:'failed',
      message:error.message
    })
  }

}

export default createMovie