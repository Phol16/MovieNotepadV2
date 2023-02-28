import WatchList from "../../models/WatchListModel.js"
const createWatchList = async(req, res)=>{
  const { movieId } = req.body

  try {
    const newWatchList = new WatchList({
      movieId,
      userId: req.user.id,
    })
    const response = await newWatchList.save()
  
    res.status(200).json({
      status:'success',
      message: response
    })
  } catch (error) {
    res.status(500).json({
      status:'failed',
      message: error.message
    })
  }
}
export default createWatchList