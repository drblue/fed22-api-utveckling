import express from 'express'
const router = express.Router()
import * as movieController from './movie.controller'

/**
 * GET /movies
 */
router.get('/', movieController.index)

/**
 * GET /movies/:movieId
 */
router.get('/:movieId', movieController.show)

/**
 * POST /movies
 */
router.post('/', movieController.store)

export default router
