/**
 * Profile Controller
 */
import { Request, Response } from 'express'
import prisma from '../prisma'

/**
 * Get the authenticated user's profile
 */
export const getProfile = async (req: Request, res: Response) => {
	res.send({
		status: "success",
		data: null,
	})
}

/**
 * Update the authenticated user's profile
 */
export const updateProfile = async (req: Request, res: Response) => {
}
