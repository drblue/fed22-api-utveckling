import express from 'express'
import { index, show, store } from '../controllers/publisher_controller'
const router = express.Router()

/**
 * GET /publishers
 */
router.get('/', index)

/**
 * GET /publishers/:publisherId
 */
router.get('/:publisherId', show)

/**
 * POST /publishers
 */
router.post('/', store)

export default router
