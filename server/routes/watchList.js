import { Router } from 'express';
import allWatchList from '../controller/watchList/allWatchList.js';
import createWatchList from '../controller/watchList/createWatchList.js';
import verifyToken from '../middleware/verfyToken.js';

const router = Router();

  router.route('/')
  .get(verifyToken, allWatchList)
  .post(verifyToken, createWatchList)

export default router;
