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
		res.send(publisher)
	} catch (err) {
		res.status(404).send({ message: "Not found" })
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
		res.send(publisher)
	} catch (err) {
		res.status(500).send({ message: "Something went wrong" })
	}
}

