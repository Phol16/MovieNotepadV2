import WatchList from '../../models/WatchListModel.js';
const removeWLMovie = async (req, res) => {
  const { id } = req.params;
  console.log(id);

  try {
    const found = await WatchList.findOne({ _id: id, deletedAt: null, userId: req.user.id });

    if (!found) {
      return res.status(404).json({
        status: 'success',
        message: 'Movie not found',
      });
    }

    await WatchList.findByIdAndUpdate(id, { deletedAt: Date.now() });
    res.status(200).json({
      status: 'success',
      message: 'has been deleted',
    });
  } catch (error) {
    res.status(500).json({
      status: 'failed',
      mesasge: error.message,
    });
  }
};
export default removeWLMovie;
