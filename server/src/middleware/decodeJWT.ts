import {Request, Response, NextFunction } from 'express'
import { merge } from 'lodash';
import { jwtVerify } from '../utils';

interface JwtPayload {
  _id:string,
}

export const decodeJWT = (req:Request,res:Response, next:NextFunction)=>{
try {
  const  user  = req.headers.authorization;
  const userInfo = user.split(' ')[1]

  const newUser = jwtVerify(userInfo) as JwtPayload

  merge(req, {userId: newUser._id})
  next()
} catch (error) {
  console.log(error)
  res.status(500).json({error:error.message})
}
}