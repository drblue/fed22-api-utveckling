import express from "express"
import directorRouter from './resources/director/director.router'
import movieRouter from './resources/movie/movie.router'

// instantiate a new router
const router = express.Router()

/**
 * GET /
 */
router.get('/', async (req, res) => {
	res.send({
		message: "I AM MOVIE-DB-API, GIVES POPCORN",
	})
})

/**
 * /directors
 */
router.use('/directors', directorRouter)

/**
 * /movies
 */
router.use('/movies', movieRouter)

export default router
