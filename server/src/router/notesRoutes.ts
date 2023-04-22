import { addNotes, deleteANote, fetchAllNotes, updateANote } from '../controllers/notes/notes';
import { cookieValidation } from '../middleware/cookieValidation';
import { currentUser } from '../middleware/currentUser';
import { Router } from 'express';

export default (router: Router) => {
  router.get('/notes', cookieValidation, currentUser, fetchAllNotes);
  router.post('/notes', cookieValidation, currentUser, addNotes);
  router.patch('/notes', cookieValidation, currentUser, updateANote);
  router.delete('/notes', cookieValidation, currentUser, deleteANote);
};
