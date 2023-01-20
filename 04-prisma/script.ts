import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

const main = async () => {
	// Write Prisma Client queries here
	console.log("It works?")

	// Get all users and console.log them
	const users = await prisma.users.findMany()
	console.log(users)
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
