import WatchList from "../../models/WatchListModel.js"
const removeWLMovie = async(req, res)=>{
 const { id } = req.params

 try {
  const found = await WatchList.findOne({_id: id, deletedAt:null,userId:req.userId.id})

  if(!found){
    return res.status(404).json({
      status:'success',
      message:'Movie not found'
    })
  }

  await WatchList.findByIdAndUpdate(id,{deletedAt:null})
  res.status(200).json({
    status:'success',
    message:'has been deleted'
  })
 } catch (error) {
  
 }
}
export default removeWLMovie