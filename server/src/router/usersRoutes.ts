import { Router } from 'express';

import { userValid, updateUser, getUserDetailsBySessionToken } from '../controllers/users/users';
import { cookieValidation } from '../middleware/cookieValidation';
import { currentUser } from '../middleware/currentUser';
import { decodeJWT } from '../middleware/decodeJWT';

export default (router: Router) => {
  router.get('/users', cookieValidation, userValid);
  router.get('/users/userDetail', cookieValidation, getUserDetailsBySessionToken);
  router.patch('/users/:id', decodeJWT, cookieValidation, currentUser, updateUser);
};
