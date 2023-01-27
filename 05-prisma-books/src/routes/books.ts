import express from 'express'
import prisma from '../prisma'
const router = express.Router()

/**
 * GET /books
 */
router.get('/', async (req, res) => {
	try {
		const books = await prisma.book.findMany()

		res.send(books)

	} catch (err) {
		console.error(err)
		res.status(500).send({ message: "Something went wrong" })
	}
})

/**
 * GET /books/:bookId
 */
router.get('/:bookId', async (req, res) => {
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

		res.send(book)

	} catch (err) {
		console.error(err)
		return res.status(404).send({ message: "Not found" })
	}
})

/**
 * POST /books
 */
router.post('/', async (req, res) => {
	try {
		const book = await prisma.book.create({
			data: {
				title: req.body.title,
				pages: req.body.pages,
				isbn: req.body.isbn,
				publisherId: req.body.publisherId,
			}
		})

		res.send(book)

	} catch (err) {
		console.error(err)
		res.status(500).send({ message: "Something went wrong" })
	}
})

export default router
