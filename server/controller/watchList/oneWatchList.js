import WatchList from '../../models/WatchListModel.js';
const oneWatchList = async (req, res) => {
  const { id } = req.query;

  try {
    const findWL = await WatchList.findOne({ movieId: id, deletedAt: null, userId: req.user.id });

    if (!findWL) {
      return res.status(404).json({
        status: 'failed',
        message: 'Movie not in watchlist',
      });
    }

    res.status(200).json({
      status: 'success',
      fetchDataAt: new Date(Date.now()).toLocaleString(),
      data: findWL,
    });
  } catch (error) {
    res.status(500).json({
      status:'failed',
      message: error.message
    })
  }
};
export default oneWatchList;
