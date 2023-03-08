import { Router } from 'express';
import allNotes from '../controller/notes/allNotes.js';
import createNotes from '../controller/notes/createNotes.js';
import removeNote from '../controller/notes/removeNote.js';
import verifyToken from '../middleware/verfyToken.js';

const router = Router();

router.route('/').post(verifyToken, createNotes).get(verifyToken, allNotes).delete(verifyToken, removeNote);

export default router;
