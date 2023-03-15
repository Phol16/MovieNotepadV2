import Movie from "../../models/MovieModel.js";

const featuredMovies = async(req, res)=>{
  const FeaturedList = await Movie.find({deletedAt:null}).sort({like: -1}).limit(3)

  if(!FeaturedList.length){
    return res.status(404).json({
      status:'failed',
      message:'Featured movie list not found'
    })
  }

  res.status(200).json({
    status:'success',
    featchedDate: new Date(Date.now()).toLocaleString(),
    data: FeaturedList
  })
}
export default featuredMovies