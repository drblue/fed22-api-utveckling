/**
 * Handles all `/authors` routes
 */
import express from 'express'
import { body } from 'express-validator'
import { index, store, addBook } from '../controllers/author_controller'
const router = express.Router()

/**
 * GET /authors
 */
router.get('/', index)

/**
 * POST /authors
 */
router.post('/', [
	body('name').optional().isString().withMessage('has to be a string').bail().isLength({ min: 3, max: 191 }).withMessage('has to be 3-191 chars long'),
], store)

/**
 * POST /authors/:authorId/books
 */
router.post('/:authorId/books', addBook)

export default router
