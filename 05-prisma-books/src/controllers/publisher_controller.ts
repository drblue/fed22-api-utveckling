/**
 * Publisher Controller
 */
import { Request, Response } from 'express'
import prisma from '../prisma'

/**
 * Get all publishers
 */
export const index = async (req: Request, res: Response) => {
	try {
		const publishers = await prisma.publisher.findMany()
		res.send(publishers)
	} catch (err) {
		res.status(500).send({ message: "Something went wrong" })
	}
}

/**
 * Get a single publisher
 */
export const show = async (req: Request, res: Response) => {
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

		return res.send(publisher)

	} catch (err) {
		return res.status(404).send({ message: "Not found" })
	}
}

/**
 * Create a publisher
 */
export const store = async (req: Request, res: Response) => {
	try {
		const publisher = await prisma.publisher.create({
			data: {
				name: req.body.name,
			}
		})

		return res.send(publisher)

	} catch (err) {
		return res.status(500).send({ message: "Something went wrong" })
	}
}

/**
 * Update a publisher
 */
export const update = async (req: Request, res: Response) => {
	const publisherId = Number(req.params.publisherId)

	try {
		const publisher = await prisma.publisher.update({
			where: {
				id: publisherId,
			},
			data: req.body,
		})

		return res.send(publisher)

	} catch (err) {
		return res.status(500).send({ message: "Something went wrong" })
	}
}

/**
 * Delete a publisher
 */
export const destroy = async (req: Request, res: Response) => {
	const publisherId = Number(req.params.publisherId)

	// verify that the publisher doesn't have any associated books
	try {
		const publisher = await prisma.publisher.findUniqueOrThrow({
			where: {
				id: publisherId,
			},
			include: {
				_count: {
					select: {
						books: true,
					},
				},
			},
		})

		if (publisher._count.books) {
			return res.status(400).send({ message: "Publisher has linked books"})
		}

	} catch (err) {
		return res.status(404).send({ message: "Not found" })
	}

	// delete the publisher
	try {
		const publisher = await prisma.publisher.delete({
			where: {
				id: publisherId,
			},
		})

		return res.send(publisher)

	} catch (err) {
		return res.status(500).send({ message: "Something went wrong when deleting the resource" })
	}
}

