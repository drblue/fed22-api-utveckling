/**
 * Register Controller
 */
import { Request, Response } from 'express'
import { matchedData, validationResult } from 'express-validator'
import prisma from '../prisma'

/**
 * Register a new user
 */
export const register = async (req: Request, res: Response) => {
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
	console.log("req.body:", req.body)
	console.log("validatedData:", validatedData)

	// Calculate a hash + salt for the password

	// Store the user in the database

	// Respond with 201 Created + status success
	res.status(201).send({ "status": "success", "data": req.body })
}
