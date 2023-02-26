import Jwt from 'jsonwebtoken'

const verifyToken = async(req, res, next)=>{
  const accessToken = req.headers.authorization;

try {
    if(accessToken){
      const token = accessToken.split(' ')[1];



      Jwt.verify(token, process.env.JWT_SECRET, (err, valid)=>{
        if(err){
          res.status(403).json({
            status:'failed',
            message: 'Token is not valid'
          })
        }else{
          req.user = valid;
          next()
        }
      })
    }else{
      throw new Error('You are not Authenticated')
    }
} catch (error) {
  res.status(500).json({
    status:'failed',
    message: error.message
  })
}
}

export default verifyToken