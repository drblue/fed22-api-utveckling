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
		res.status(500).send({ message: "Something went wrong" })
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
		res.status(500).send({ message: "Something went wrong" })
	}
})

export default router
