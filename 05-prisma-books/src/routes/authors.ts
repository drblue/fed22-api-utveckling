/**
 * Handles all `/authors` routes
 */
import express from 'express'
import { index, store, addBook } from '../controllers/author_controller'
const router = express.Router()

/**
 * GET /authors
 */
router.get('/', index)

/**
 * POST /authors
 */
router.post('/', store)

/**
 * POST /authors/:authorId/books
 */
router.post('/:authorId/books', addBook)

export default router
