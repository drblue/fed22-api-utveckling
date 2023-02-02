/**
 * Author Template
 */
import Debug from 'debug'
import { Request, Response } from 'express'
import { validationResult } from 'express-validator'
import { getAuthors } from '../services/author_service'
import prisma from '../prisma'

// Create a new debug instance
const debug = Debug('prisma-books:author_controller')

/**
 * Get all authors
 */
export const index = async (req: Request, res: Response) => {
	try {
		const authors = await getAuthors()
		res.send(authors)
	} catch (err) {
		res.status(500).send({ message: "Something went wrong" })
	}
}

/**
 * Get a single author
 */
export const show = async (req: Request, res: Response) => {
	const authorId = Number(req.params.authorId)

	try {
		const author = await prisma.author.findUniqueOrThrow({
			where: {
				id: authorId,
			},
			include: {
				books: true,
			}
		})

		res.send({
			status: "success",
			data: author,
		})

	} catch (err) {
		debug("Error thrown when finding author with id %o: %o", req.params.authorId, err)
		return res.status(404).send({ status: "error", message: "Not found" })
	}
}

/**
 * Create a author
 */
export const store = async (req: Request, res: Response) => {
	// Check for any validation errors
	const validationErrors = validationResult(req)
	if (!validationErrors.isEmpty()) {
		return res.status(400).send({
			status: "fail",
			data: validationErrors.array(),
		})
	}

	try {
		const author = await prisma.author.create({
			data: {
				name: req.body.name,
			}
		})
		res.send(author)
	} catch (err) {
		res.status(500).send({ message: "Something went wrong" })
	}
}

/**
 * Update a author
 */
export const update = async (req: Request, res: Response) => {
}

/**
 * Delete a author
 */
export const destroy = async (req: Request, res: Response) => {
}

/**
 * Link a book to a author
 */
export const addBook = async (req: Request, res: Response) => {
	try {
		const result = await prisma.author.update({
			where: {
				id: Number(req.params.authorId),
			},
			data: {
				books: {
					connect: {
						id: req.body.bookId,
					}
				}
			},
			include: {
				books: true,
			}
		})
		res.status(201).send(result)
	} catch (err) {
		debug("Error thrown when adding book %o to a author %o: %o", req.body.bookId, req.params.authorId, err)
		res.status(500).send({ message: "Something went wrong" })
	}
}
