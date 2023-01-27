/**
 * Author Template
 */
import Debug from 'debug'
import { Request, Response } from 'express'
import prisma from '../prisma'

// Create a new debug instance
const debug = Debug('prisma-books:author_controller')

/**
 * Get all authors
 */
export const index = async (req: Request, res: Response) => {
	try {
		const authors = await prisma.author.findMany({
			include: {
				books: true,
			}
		})
		res.send(authors)
	} catch (err) {
		res.status(500).send({ message: "Something went wrong" })
	}
}

/**
 * Get a single author
 */
export const show = async (req: Request, res: Response) => {
}

/**
 * Create a author
 */
export const store = async (req: Request, res: Response) => {
	const birthdate = (new Date(req.body.birthdate)).toISOString()

	try {
		const author = await prisma.author.create({
			data: {
				name: req.body.name,
				birthdate: birthdate,
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
