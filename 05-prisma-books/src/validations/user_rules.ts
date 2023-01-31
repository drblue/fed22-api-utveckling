/**
 * Validation Rules for User resource
 */
import { body } from 'express-validator'

export const createUserRules = [
	body('name').isString().bail().isLength({ min: 3 }),
	body('email').isEmail(),
	body('password').isString().bail().isLength({ min: 6 }),
]

export const updateUserRules = [
	body('name').optional().isString().bail().isLength({ min: 3 }),
	body('email').optional().isEmail(),
	body('password').optional().isString().bail().isLength({ min: 6 }),
]
