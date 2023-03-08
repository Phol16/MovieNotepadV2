import Note from "../../models/NoteModel.js"
const allNotes = async(req, res)=>{
  const { id } = req.query
  try {
    const found = await Note.find({deletedAt:null, movieId: id, authorId: req.user.id, }).sort({createdAt:-1}).populate('movieId', 'authorId')

    if(!found.length){
      return res.status(404).json({
        status:'failed',
        message:'No notes yet..'
      })
    }

    res.status(200).json({
      status:'success',
      fetchDataAt:Date.now(),
      data:found
    })

  } catch (error) {
    res.status(500).json({
      status:'failed',
      message:error.message
    })
  }

}
export default allNotes