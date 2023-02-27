import Movie from "../../models/MovieModel.js"
const deleteMovie=async(req,res)=>{
const {id} = req.query

const findMovie = await Movie.findOne({_id: id})

if(!findMovie){
  return res.status(404).json({
    status:'success',
    message:'Movie not found'
  })
}

await Movie.findByIdAndUpdate(id, {deletedAt:Date.now()})

res.status(200,).json({
  status:'success',
  message:`${findMovie.title} has been deleted`
})
}
export default deleteMovie