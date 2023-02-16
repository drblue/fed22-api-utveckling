import express from 'express'
const router = express.Router()
import * as directorController from './director.controller'

/**
 * GET /directors
 */
router.get('/', directorController.index)

/**
 * GET /directors/:directorId
 */
router.get('/:directorId', directorController.show)

/**
 * POST /directors
 */
router.post('/', directorController.store)

export default router
