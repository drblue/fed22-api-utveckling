import express from "express"
import prisma from "./prisma" // importing the prisma instance we created
import morgan from "morgan"
import routes from './routes'

const app = express()
app.use(express.json())
app.use(morgan('dev'))

// Use routes
app.use(routes)

/**
 * GET /books
 */
app.get('/books', async (req, res) => {
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
app.post('/books', async (req, res) => {
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


/**
 * GET /publishers
 */
app.get('/publishers', async (req, res) => {
	try {
		const publishers = await prisma.publisher.findMany()
		res.send(publishers)
	} catch (err) {
		res.status(500).send({ message: "Something went wrong" })
	}
})

/**
 * GET /publishers/:publisherId
 */
app.get('/publishers/:publisherId', async (req, res) => {
	const publisherId = Number(req.params.publisherId)

	try {
		const publisher = await prisma.publisher.findUniqueOrThrow({
			where: {
				id: publisherId,
			},
			include: {
				books: true,
			}
		})
		res.send(publisher)
	} catch (err) {
		res.status(404).send({ message: "Not found" })
	}
})

/**
 * POST /publishers
 */
app.post('/publishers', async (req, res) => {
	try {
		const publisher = await prisma.publisher.create({
			data: {
				name: req.body.name,
			}
		})
		res.send(publisher)
	} catch (err) {
		res.status(500).send({ message: "Something went wrong" })
	}
})

export default app
