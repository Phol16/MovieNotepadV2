import { Router } from 'express';
import createUser from '../controller/authentication/createUser.js'
import logInUser from '../controller/authentication/logInUser.js'

const router = Router();

router.route('/signUp').post(createUser);
router.route('/login').post(logInUser);

export default router
