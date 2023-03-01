import { Router } from 'express';
import allWatchList from '../controller/watchList/allWatchList.js';
import createWatchList from '../controller/watchList/createWatchList.js';
import getOneWL from '../controller/watchList/getOneWL.js';
import oneWatchList from '../controller/watchList/oneWatchList.js';
import verifyToken from '../middleware/verfyToken.js';

const router = Router();

router.route('/').get(verifyToken, allWatchList).post(verifyToken, createWatchList);

router.route('/movie').get(verifyToken, oneWatchList);

router.route('/movie/:id').get(verifyToken, getOneWL)
export default router;
