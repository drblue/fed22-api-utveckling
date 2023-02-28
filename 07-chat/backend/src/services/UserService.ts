/**
 * User Service
 */
import prisma from '../prisma'

export const getUsersInRoom = async (roomId: string) => {
	return await prisma.user.findMany({
		where: {
			roomId: roomId,
		}
	})
}

export const deleteAllUsers = async () => {
	return await prisma.user.deleteMany()
}
