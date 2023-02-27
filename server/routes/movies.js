import { Router } from "express";
import allMovies from "../controller/movies/allMovies.js";
import createMovie from "../controller/movies/createMovie.js";
import deleteMovie from "../controller/movies/deleteMovie.js";
import featuredMovies from "../controller/movies/featuredMovies.js";
import oneMovie from "../controller/movies/oneMovies.js";
import updateMovie from "../controller/movies/updateMovie.js";
import verifyToken from "../middleware/verfyToken.js";

const router = Router();

router.route('/')
.get(allMovies)
.post(verifyToken, createMovie)
.patch(verifyToken, updateMovie)
.delete(verifyToken, deleteMovie)

router.route('/featured').get(featuredMovies)

router.route('/movie').get(oneMovie)



export default router;