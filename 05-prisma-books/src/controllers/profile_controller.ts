/**
 * Profile Controller
 */
import bcrypt from 'bcrypt'
import Debug from 'debug'
import { Request, Response } from 'express'
import { matchedData, validationResult } from 'express-validator'
import prisma from '../prisma'
import { getUserByEmail, updateUser } from '../services/user_service'
const debug = Debug("prisma-books:profile_controller")

/**
 * Get the authenticated user's profile
 */
export const getProfile = async (req: Request, res: Response) => {
	// User has authenticated successfully
	const profile = await getUserByEmail(req.token!.email)

	res.send({
		status: "success",
		data: {
			id: profile?.id,
			name: profile?.name,
			email: profile?.email,
		},
	})
}

/**
 * Update the authenticated user's profile
 */
export const updateProfile = async (req: Request, res: Response) => {
	// Check for any validation errors
	const validationErrors = validationResult(req)
	if (!validationErrors.isEmpty()) {
		return res.status(400).send({
			status: "fail",
			data: validationErrors.array(),
		})
	}

	// Get only the validated data from the request
	const validatedData = matchedData(req)

	// If user wants to update password, hash and salt it
	if (validatedData.password) {
		// Calculate a hash + salt for the password
		const hashedPassword = await bcrypt.hash(validatedData.password, Number(process.env.SALT_ROUNDS) || 10)
		console.log("Hashed password:", hashedPassword)

		// Replace password with hashed password
		validatedData.password = hashedPassword
	}

	try {
		const userData = await updateUser(req.token!.sub, validatedData)

		res.send({ status: "success", data: userData })

	} catch {
		return res.status(500).send({ status: "error", message: "Could not update profile in database" })
	}

}
