import { decodeJWT } from '../middleware/decodeJWT';
import { addNotes, deleteANote, fetchAllNotes, updateANote } from '../controllers/notes/notes';
import { cookieValidation } from '../middleware/cookieValidation';
import { currentUser } from '../middleware/currentUser';
import { Router } from 'express';

export default (router: Router) => {
  router.get('/notes', decodeJWT, cookieValidation, currentUser, fetchAllNotes);
  router.post('/notes', decodeJWT, cookieValidation, currentUser, addNotes);
  router.patch('/notes', decodeJWT, cookieValidation, currentUser, updateANote);
  router.delete('/notes', decodeJWT, cookieValidation, currentUser, deleteANote);
};
