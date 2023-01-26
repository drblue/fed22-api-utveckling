/**
 * Handles all `/authors` routes
 */
import express from 'express'
import prisma from '../prisma'
const router = express.Router()

/**
 * GET /authors
 */
router.get('/', async (req, res) => {
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
})

/**
 * POST /authors
 */
router.post('/', async (req, res) => {
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
})

/**
 * POST /authors/:authorId/books
 */
router.post('/:authorId/books', async (req, res) => {
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
		res.status(500).send({ message: "Something went wrong" })
	}
})

export default router
