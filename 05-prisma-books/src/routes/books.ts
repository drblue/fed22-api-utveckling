import express from 'express'
import { index, show, store } from '../controllers/book_controller'
const router = express.Router()

/**
 * GET /books
 */
router.get('/', index)

/**
 * GET /books/:bookId
 */
router.get('/:bookId', show)

/**
 * POST /books
 */
router.post('/', store)

export default router
