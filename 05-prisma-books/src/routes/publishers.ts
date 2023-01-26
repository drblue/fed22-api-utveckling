import express from 'express'
import { index, show, store, update, destroy } from '../controllers/publisher_controller'
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

/**
 * PATCH /publishers/:publisherId
 */
router.patch('/:publisherId', update)

/**
 * DELETE /publishers/:publisherId
 */
router.delete('/:publisherId', destroy)

export default router
