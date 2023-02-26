import { Router } from 'express';
import createUser from '../controller/authentication/createUser.js'
import getUser from '../controller/authentication/getUser.js';
import logInUser from '../controller/authentication/logInUser.js'
import verifyToken from '../middleware/verfyToken.js';

const router = Router();

router.route('/signUp').post(createUser);
router.route('/login').post(logInUser);

router.route('/userInfo').get(verifyToken, getUser)

export default router
