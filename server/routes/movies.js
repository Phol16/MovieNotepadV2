import { Router } from "express";
import allMovies from "../controller/movies/allMovies.js";
import createMovie from "../controller/movies/createMovie.js";
import featuredMovies from "../controller/movies/featuredMovies.js";
import verifyToken from "../middleware/verfyToken.js";

const router = Router();

router.route('/')
.get(allMovies)
.post(verifyToken, createMovie)

router.route('/featured').get(featuredMovies)


export default router;