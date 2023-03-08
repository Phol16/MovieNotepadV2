import Note from "../../models/NoteModel.js"
const removeNote = async(req, res)=>{
  const { id } = req.query
  try {
    const found = await Note.findByIdAndUpdate(id,{deletedAt: Date.now()})

    if(!found){
      return res.status(404).json({
        status:'failed',
        message:'Not found'
      })
    }

    res.status(200).json({
      status:'success',
      deletedDataAt:Date.now(),
      data:found
    })

  } catch (error) {
    res.status(500).json({
      status:'failed',
      message:error.message
    })
  }

}
export default removeNote