import Note from "../../models/NoteModel"
const allNotes = async(req, res)=>{
  const { id } = req.params
  try {
    const found = await Note.find({movieId: id, authorId: req.user.id, deletedAt:null}).populate('movieId', 'authorId')

    if(!found){
      return res.status(404).json({
        status:'failed',
        message:'Not found'
      })
    }

    res.status(200).json({
      status:'success',
      fetchDataAt:Date.now(),
      data:found
    })

    res.status(200).json({
      status:'success',
      message:'note added'
    })

  } catch (error) {
    res.status(500).json({
      status:'failed',
      message:error.message
    })
  }

}
export default allNotes