import WatchList from "../../models/WatchListModel.js"

const allWatchList = async(req, res)=>{

  try {
    const findWL = await WatchList.find({deletedAt: null, userId: req.user})
    
    if(!findWL){
      return res.status(404).json({
        status:'failed',
        message:'No list of movie added to Watch List'
      })
    }

    res.status(200).json({
      status:'success',
      fetchDataAt: new Date(Date.now()).toLocaleString(),
      data:findWL
    })
  } catch (error) {
    
  }

}
export default allWatchList