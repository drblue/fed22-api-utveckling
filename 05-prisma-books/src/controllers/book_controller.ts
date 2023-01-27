/**
 * Book Controller
 */
import { Request, Response } from 'express'
import Debug from 'debug'
import prisma from '../prisma'

// Create a new debug instance
const debug = Debug('prisma-books:book_controller')

/**
 * Get all books
 */
export const index = async (req: Request, res: Response) => {
	try {
		const books = await prisma.book.findMany()

		res.send({
			status: "success",
			data: books,
		})

	} catch (err) {
		debug("Error thrown when finding books", err)
		res.status(500).send({ status: "error", message: "Something went wrong" })
	}
}

/**
 * Get a single book
 */
export const show = async (req: Request, res: Response) => {
	const bookId = Number(req.params.bookId)

	try {
		const book = await prisma.book.findUniqueOrThrow({
			where: {
				id: bookId,
			},
			include: {
				authors: true,
				publisher: true,
			}
		})

		res.send({
			status: "success",
			data: book,
		})

	} catch (err) {
		debug("Error thrown when finding book with id %o: %o", req.params.bookId, err)
		return res.status(404).send({ status: "error", message: "Not found" })
	}
}

/**
 * Create a book
 */
export const store = async (req: Request, res: Response) => {
	try {
		const book = await prisma.book.create({
			data: {
				title: req.body.title,
				pages: req.body.pages,
				isbn: req.body.isbn,
				publisherId: req.body.publisherId,
			}
		})

		res.send({
			status: "success",
			data: book,
		})

	} catch (err) {
		debug("Error thrown when creating a book %o: %o", req.body, err)
		res.status(500).send({ status: "error", message: "Something went wrong" })
	}
}

/**
 * Update a book
 */
export const update = async (req: Request, res: Response) => {
}

/**
 * Delete a book
 */
export const destroy = async (req: Request, res: Response) => {
}
