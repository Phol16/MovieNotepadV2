import app from "../../app.js";
import Movie from "../../models/MovieModel.js"
import CloudinaryService from "../../utils/CloudinaryService.js";

const updateMovie = async(req, res)=>{
  const {title, year, image, genre, imdbId, description} = req.body
  const {id} = req.query


  try {
    const findMovie = await Movie.findOne({_id: id, deletedAt:null});
    const data = {title, year, image, genre, imdbId, description}
  
    if(!findMovie){
      return res.status(404).json({
        status:'failed',
        message:'Movie not found'
      })
    }

    if(image !== findMovie.image){
     const cloudinary = app.get(CloudinaryService.serviceName)

     const uploadedRes = await cloudinary.uploader.upload(image, {
      upload_preset: 'movieNotepad',
    })
    await Movie.findByIdAndUpdate(id, {title, year, image: uploadedRes.url, genre, imdbId, description})
    }else{
    await Movie.findByIdAndUpdate(id, data)
    }

    res.status(200).json({
      status:'success',
      message:`${title}: has been updated`
    })

  } catch (error) {
    res.status(500).json({
      status:'failed',
      message: error.message
    })
  }
  }


export default updateMovie