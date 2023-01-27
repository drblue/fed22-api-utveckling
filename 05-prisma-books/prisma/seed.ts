import prisma from '../src/prisma'

async function main() {
	/**
	 * Publishers
	 */
	const hutchinson = await prisma.publisher.upsert({
		where: { id: 1 },
		update: {},
		create: { id: 1, name: "Hutchinson" }
	})

	const gnome = await prisma.publisher.upsert({
		where: { id: 2 },
		update: {},
		create: { name: "Gnome Press" }
	})

	const podium = await prisma.publisher.upsert({
		where: { id: 3 },
		update: {},
		create: { name: "Podium Audio" }
	})

	/**
	 * Authors
	 */
	const clarke = await prisma.author.upsert({
		where: { id: 1 },
		update: {},
		create: { name: "Sir Arthur C. Clarke" }
	})

	const asimow = await prisma.author.upsert({
		where: { id: 2 },
		update: {},
		create: { name: "Isaac Asimov" }
	})

	const anspach = await prisma.author.upsert({
		where: { id: 3 },
		update: {},
		create: { name: "Jason Anspach" }
	})

	const cole = await prisma.author.upsert({
		where: { id: 4 },
		update: {},
		create: { name: "Nick Cole" }
	})

	/**
	 * Books
	 */
	const odessey = await prisma.book.upsert({
		where: { id: 1 },
		update: {},
		create: {
			title: "2001: A Space Odessey",
			pages: 224,
			publisherId: hutchinson.id,
			authors: {
				connect: [
					{ id: clarke.id },
				],
			}
		}
	})

	const odessey_two = await prisma.book.upsert({
		where: { id: 2 },
		update: {},
		create: {
			title: "2010: Odessey Two",
			pages: 291,
			publisherId: hutchinson.id,
			authors: {
				connect: [
					{ id: clarke.id },
				],
			}
		}
	})

	const foundation = await prisma.book.upsert({
		where: { id: 3 },
		update: {},
		create: {
			title: "Foundation",
			pages: 542,
			publisherId: gnome.id,
			authors: {
				connect: [
					{ id: asimow.id },
				],
			}
		}
	})

	const galaxys_edge = await prisma.book.upsert({
		where: { id: 4 },
		update: {},
		create: {
			title: "Galaxy's Edge: Book 1-2",
			pages: 0,
			publisherId: podium.id,
			authors: {
				connect: [
					{ id: anspach.id },
					{ id: cole.id },
				],
			}
		}
	})
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
