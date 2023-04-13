import express, { Router } from 'express';
import authentication from './authentication';
import usersRoutes from './usersRoutes';
import moviesRoutes from './moviesRoutes';

const router = Router();

export default (): Router => {
  authentication(router);
  usersRoutes(router)
  moviesRoutes(router)
  return router;
};
