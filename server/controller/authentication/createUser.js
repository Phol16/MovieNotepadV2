import User from '../../models/UserModel.js'
import bcrypt from 'bcrypt'

const createUser = async(req, res)=>{
  const {firstName, lastName, username, password, role} = req.body

  try{
    const salt = await bcrypt.genSalt();
    const passwordHash = await bcrypt.hash(password, salt);

    const newUser = new User({
      firstName,
      lastName,
      username,
      password: passwordHash,
      role,
    })

    const savedUser = await newUser.save();

    res.status(201).json({
      status:'success',
      data: savedUser
    })
  }catch(err){
    console.error(err);
    res.status(500).json({
      status:'failed',
      message: err.message
    })
  }
}

export default createUser