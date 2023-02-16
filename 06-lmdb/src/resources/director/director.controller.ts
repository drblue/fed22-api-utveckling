import { Request, Response } from 'express'
import Debug from 'debug'
import { Director } from './director.model'
import mongoose from 'mongoose'

const debug = Debug('lmdb:director.controller')

/**
 * Get all directors
 */
export const index = async (req: Request, res: Response) => {
	try {
		// Find all directors
		const directors = await Director.find()

		res.send({
			status: "success",
			data: directors,
		})

	} catch (err) {
		debug("Error thrown when finding directors", err)
		res.status(500).send({ status: "error", message: "Error thrown when finding directors" })
	}
}

/**
 * Get a director
 *
 * GET /directors/:directorId
 */
export const show = async (req: Request, res: Response) => {
	const directorId = req.params.directorId

	try {
		// Find a single director
		const director = await Director.findById(directorId)

		// If no director was found, report 404
		if (!director) {
			return res.sendStatus(404)
		}

		// Respond with director
		res.send({
			status: "success",
			data: director,
		})

	} catch (err) {
		debug("Error thrown when finding director '%s': %o", directorId, err)
		res.status(500).send({ status: "error", message: "Error thrown when finding director" })
	}
}

/**
 * Create a director
 *
 * POST /directors
 */
export const store = async (req: Request, res: Response) => {
	try {
		// Create and save a new Director
		const director = await new Director(req.body).save()

		// Respond with the newly created Director
		res.status(201).send({
			status: "success",
			data: director,
		})

		const err = new Error()

	} catch (err) {
		debug("Error thrown when creating director", err)

		if (err instanceof mongoose.Error.ValidationError) {
			return res.status(400).send({ status: "error", message: err.message })
		}

		res.status(500).send({ status: "error", message: "Error thrown when creating a new director" })
	}
}
