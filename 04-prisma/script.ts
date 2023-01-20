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
	// Get all users who's name starts with "Th" and console.log them
	const users = await prisma.users.findMany({
		where: {
			name: {
				// startsWith: "Th",
				// endsWith: "an",
				// contains: "an",
			},
		},
		orderBy: [
			{
				name: 'asc',
			},
			{
				id: 'desc',
			},
		],
		take: 2,
		skip: 1,
	})
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

	/*
	// Get a specific user
	const user = await prisma.users.findUnique({
		where: {
			id: 4,
		}
	})
	console.log("User:", user)
	*/

	/*
	// Get a specific user and their phone
	const user = await prisma.users.findUnique({
		where: {
			id: 2,
		},
		include: {
			phones: true,
		}
	})
	console.log("User:", user)
	*/

	/*
	// Get all users and their phone(s)
	const users = await prisma.users.findMany({
		include: {
			phones: true,
		}
	})
	console.dir(users, { depth: null })
	*/

	// Get all phones and their user (if they have one)
	const phones = await prisma.phones.findMany({
		include: {
			users: true,
		}
	})
	console.log(phones)
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
