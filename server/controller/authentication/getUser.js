import User from "../../models/UserModel.js"

const getUser = async(req, res)=>{

  try {
    const userInfo = await User.findOne({_id: req.user.id})

    if(!userInfo){
      res.status(404).json({
        status:'failed',
        message: 'User not found!'
      })
    }

    res.status(200).json({
      status:'success',
      data: userInfo
    })

  } catch (error) {
    res.status(500).json({
      status:'failed',
      message: error.message
    })
  }
}

export default getUser