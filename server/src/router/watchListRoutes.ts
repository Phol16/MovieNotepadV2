import { Router } from 'express';
import { addMovieInWatchList, deleteWL, getAllWatchList, getUserWatchList, searchMovieInWatchList } from '../controllers/watchList/watchList';
import { cookieValidation } from '../middleware/cookieValidation';
import { currentUser } from '../middleware/currentUser';
import { decodeJWT } from '../middleware/decodeJWT';

export default (router: Router) => {
  router.get('/watchList', cookieValidation, getAllWatchList);
  router.get('/watchList/user', decodeJWT, cookieValidation, currentUser, getUserWatchList);
  router.get(`/watchList/movie/:search`, cookieValidation, searchMovieInWatchList);
  router.post(`/watchList/:id`, decodeJWT, cookieValidation, currentUser, addMovieInWatchList);
  router.delete(`/watchlist/movie/:id`, decodeJWT, cookieValidation, currentUser, deleteWL);
};
