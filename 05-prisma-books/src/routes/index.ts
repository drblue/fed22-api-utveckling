import express from "express"
import authors from './authors'
import books from './books'
import profile from './profile'
import publishers from './publishers'
import { register } from '../controllers/register_controller'
import { basic } from "../middlewares/auth/basic"
import { createUserRules } from '../validations/user_rules'

// instantiate a new router
const router = express.Router()

/**
 * GET /
 */
router.get('/', (req, res) => {
	res.send({
		message: "I AM API, BEEP BOOP",
	})
})

/**
 * /authors
 */
router.use('/authors', authors)

/**
 * /books
 */
router.use('/books', books)

/**
 * /profile
 */
router.use('/profile', basic, profile)

/**
 * /publishers
 */
router.use('/publishers', publishers)

/**
 * /register
 */
router.post('/register', createUserRules, register)

export default router
