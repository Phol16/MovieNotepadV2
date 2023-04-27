import crypto from 'crypto';
import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';

dotenv.config();

const SECRET = process.env.SECRET;
const JWTSECRET = process.env.JWTSECRET;

export const random = () => crypto.randomBytes(128).toString('base64');
export const authentication = (salt: string, password: string) => {
  return crypto.createHmac('sha256', [salt, password].join('/')).update(SECRET).digest('hex');
};

export const jwtSign = (payload:Record<string, any>)=>{
  return  jwt.sign(payload.toJSON(), JWTSECRET, {expiresIn: '10h'})
}
export const jwtVerify = (token:string)=>{
  return jwt.verify(token, JWTSECRET)
}
