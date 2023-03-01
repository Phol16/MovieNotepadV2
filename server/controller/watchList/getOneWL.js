import WatchList from "../../models/WatchListModel.js"
const getOneWL = async(req, res)=>{
 const {id} = req.params

 try {
  const found = await WatchList.findOne({_id: id,deletedAt:null, authorId: req.user.id}).populate('movieId')

  if(!found){
    return res.status(404).json({
      status:'failed',
      message:'Watch List Movie Not Found'
    })
  }
  res.status(200).json({
    status:'success',
    fetchDataAt: Date.now(),
    data: found
  })
 } catch (error) {
  
 }
}
export default getOneWL