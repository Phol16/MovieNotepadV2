import Movie from '../../models/MovieModel.js';
import app from '../../app.js';
import CloudinaryService from '../../utils/CloudinaryService.js';

const createMovie = async (req, res) => {
  const { title, year, image, genre, imdbId, description } = req.body;
  const authorId = req.user.id;
  const cloudinary = app.get(CloudinaryService.serviceName)

  try {
    if (image) {
      const uploadedRes = await cloudinary.uploader.upload(image, {
        upload_preset: 'movieNotepad',
      });

      if (uploadedRes) {
        const newMovie = new Movie({
          title,
          year,
          image : uploadedRes.url,
          genre,
          authorId,
          imdbId,
          description,
        });

        const saveMovie = await newMovie.save();

        res.status(200).json({
          status: 'success',
          data: saveMovie,
        });
      }
    }else{
      throw new Error('image missing')
    }
  } catch (error) {
    console.log(error)
    res.status(500).json({
      status: 'failed',
      message: error.message,
    });
  }
};

export default createMovie;
