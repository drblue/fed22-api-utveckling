/**
 * Router Template
 */
import express from 'express'
import { body } from 'express-validator'
import { index, show, store, update, destroy } from '../controllers/_controller'
const router = express.Router()

/**
 * GET /resource
 */
router.get('/', index)

/**
 * GET /resource/:resourceId
 */
router.get('/:resourceId', show)

/**
 * POST /resource
 */
router.post('/', [], store)

/**
 * PATCH /resource/:resourceId
 */
router.patch('/:resourceId', [], update)

/**
 * DELETE /resource/:resourceId
 */
router.delete('/:resourceId', destroy)

export default router
