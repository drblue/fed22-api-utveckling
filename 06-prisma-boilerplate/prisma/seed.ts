/**
 * Example Seeder
 */
import prisma from '../src/prisma'

async function main() {
	/**
	 * Publishers
	 */
	// const hutchinson = await prisma.publisher.upsert({
	// 	where: { id: 1 },
	// 	update: {},
	// 	create: { id: 1, name: "Hutchinson" }
	// })

	/**
	 * Authors
	 */
	// const clarke = await prisma.author.upsert({
	// 	where: { id: 1 },
	// 	update: {},
	// 	create: { name: "Sir Arthur C. Clarke" }
	// })

	/**
	 * Books
	 */
	// const odessey = await prisma.book.upsert({
	// 	where: { id: 1 },
	// 	update: {},
	// 	create: {
	// 		title: "2001: A Space Odessey",
	// 		pages: 224,
	// 		publisherId: hutchinson.id,
	// 		authors: {
	// 			connect: [
	// 				{ id: clarke.id },
	// 			],
	// 		}
	// 	}
	// })
}

main()
	.then(async () => {
		await prisma.$disconnect()
	})
	.catch(async (e) => {
		console.error(e)
		await prisma.$disconnect()
		process.exit(1)
	})
