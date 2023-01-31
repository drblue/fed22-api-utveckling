import express from "express"
import { body } from 'express-validator'
import authors from './authors'
import books from './books'
import publishers from './publishers'
import { register } from '../controllers/register_controller'

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
 * /publishers
 */
router.use('/publishers', publishers)

/**
 * /register
 *
 * @todo add validation rules for name, email and password
 */
router.post('/register', [
	// place validation rules here

	// name required + at least 3 chars
	// email required + valid email
	// password required + at least 6 chars
], register)

export default router
