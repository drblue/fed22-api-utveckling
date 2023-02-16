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

/**
 * PATCH /movies/:movieId
 */
router.patch('/:movieId', movieController.update)

export default router
