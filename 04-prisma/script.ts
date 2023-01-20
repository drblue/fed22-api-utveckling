import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

const main = async () => {
	// Write Prisma Client queries here
	console.log("It works?")

	/*
	// Get all phones and console.log them
	const phones = await prisma.phones.findMany({    // SELECT manufacturer, model FROM phones
		// select: {
		// 	manufacturer: true,
		// 	model: true,
		// },
		where: {
			manufacturer: "Apple",
		},
	})
	console.log("Phones:", phones)
	*/

	/*
	// Get all users and console.log them
	const users = await prisma.users.findMany()
	console.log("Users:", users)
	*/

	/*
	// Get the _first_ user that matches our query
	const user = await prisma.users.findFirst({
		where: {
			// id: 2,
			name: "Korben Dallas",
		}
	})
	console.log("User:", user)
	*/

	// Get a specific user
	const user = await prisma.users.findUnique({
		where: {
			id: 4,
		}
	})
	console.log("User:", user)
}

main()
	.then(async () => {
		await prisma.$disconnect()
	})
	.catch(async e => {
		console.error(e)
		await prisma.$disconnect()
		process.exit(1)
	})
