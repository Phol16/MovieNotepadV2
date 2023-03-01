import Note from "../../models/NoteModel"
const createNotes = async(req, res)=>{
 const { title, content, movieId } = req.body

  try {
    const newData = new Note({title, content, authorId: req.user.id, movieId})

    await newData.save()

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
export default createNotes