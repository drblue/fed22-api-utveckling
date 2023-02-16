import express from 'express'
const router = express.Router()
import * as personController from './person.controller'

/**
 * GET /people
 */
router.get('/', personController.index)

/**
 * GET /people/:personId
 */
router.get('/:personId', personController.show)

/**
 * POST /people
 */
router.post('/', personController.store)

export default router
