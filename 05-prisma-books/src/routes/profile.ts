/**
 * Profile Router
 */
import express from 'express'
import { getProfile, updateProfile } from '../controllers/profile_controller'
import { updateUserRules } from '../validations/user_rules'
const router = express.Router()

/**
 * GET /profile
 */
router.get('/', getProfile)

/**
 * PATCH /profile
 */
router.patch('/', updateUserRules, updateProfile)

/**
 * GET /profile/books
 */

/**
 * POST /profile/books
 */

/**
 * DELETE /profile/books/:bookId
 */

export default router
