import express, { Router } from 'express';

import { deleteAMovie, fetchAllMovies, getAllMovies, getFeaturedMovie, getMovieWithTitle, getOneMovie, registerMovie, updateAMovie } from '../controllers/movies/movies';
import { cookieValidation } from '../middleware/cookieValidation';
import { currentUser } from '../middleware/currentUser';
import { decodeJWT } from '../middleware/decodeJWT';

export default (router: Router) => {
  router.get('/movie', getAllMovies);
  router.get('/movie/movies', fetchAllMovies);
  router.get('/movie/featured', getFeaturedMovie);
  router.get('/movie/title', getMovieWithTitle);
  router.get('/movie/:id', getOneMovie);
  router.post('/movie/registerMovie', cookieValidation, registerMovie);
  router.patch('/movie/:id', decodeJWT, cookieValidation, currentUser, updateAMovie);
  router.delete('/movie/:id', decodeJWT, cookieValidation, currentUser, deleteAMovie);
};
