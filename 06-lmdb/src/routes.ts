import express from "express"
import personRouter from './resources/person/person.router'
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
 * /people
 */
router.use('/people', personRouter)

/**
 * /movies
 */
router.use('/movies', movieRouter)

export default router
