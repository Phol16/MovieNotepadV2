import { Request, Response } from 'express';
import { createUser, getUserByEmail } from './userControllers';
import { authentication, jwtSign, random } from '../../utils/index';
import dotenv from 'dotenv'

dotenv.config()

const env = process.env.NODE_ENV;

interface details {
  username?: string;
  image?: string | undefined;
  password: string;
  email: string;
}

export const register = async (req: Request, res: Response) => {
  try {
    const { email, password, username, image }: details = req.body;

    //checks if email & password & username has values.
    if (!email || !password || !username) {
      return res.status(404).json({ message: 'Incomplete Data' });
    }

    //checks if inputted email already exist in db
    const existingUser = await getUserByEmail(email);
    if (existingUser) {
      return res.status(400).json({ message: 'Email already exist' });
    }

    //creates a random string using crypto randomBytes
    const salt = random();
    //saves user details in the database
    let user;
    if (image && image !== '') {
      user = await createUser({
        email,
        username,
        image,
        authentication: {
          salt,
          password: authentication(salt, password), //creates a hashed password using Hmac in crypto
        },
      });
    } else {
      user = await createUser({
        email,
        username,
        authentication: {
          salt,
          password: authentication(salt, password), //creates a hashed password using Hmac in crypto
        },
      });
    }

    return res.status(200).json({
      data: user,
      message: 'success',
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
};

export const logIn = async (req: Request, res: Response) => {
  try {
    const { email, password }: details = req.body;

    //checks if email and password has values.
    if (!email || !password) {
      return res.status(400).json({ message: 'Email or Password is missing' });
    }

    //checks if email exisit and fetches the salt & password because we set it to false in user schema
    const user = await getUserByEmail(email).select('_id authentication.salt authentication.password');
    if (!user) {
      return res.status(404).json({ message: `User dosen't exist` });
    }

    //checks if password matches
    const expectHash = authentication(user.authentication.salt, password);
    if (user.authentication.password !== expectHash) {
      return res.status(403).json({ message: 'Incorrect Password' });
    }

    //creates a session token
    const salt = random();
    user.authentication.sessionToken = authentication(salt, user._id.toString());
    await user.save();

    //store sessiontoken in the cookie with no expiry date becomes a session cookie
    res.cookie('MN_sessionToken', user.authentication.sessionToken,{httpOnly:env==='Development', secure:true, sameSite:'none'});
    const token = jwtSign(user)
    return res.status(200).json({
      data: token,
      message: 'success',
    });
  } catch (error) {
    console.log({ error: error });
    res.status(500).json({ error: error.message });
  }
};

export const logOut = async(req:Request, res:Response)=>{
  try {
    res.clearCookie('MN_sessionToken',{domain:'movienotepadserver-v3.vercel.app',path:'/' , httpOnly:env==='Development', secure:true, sameSite:'none'})
    res.status(200).json({message:'log out success'})
  } catch (error) {
    console.log(error)
    res.status(500).json({error:error.message})
  }
}
