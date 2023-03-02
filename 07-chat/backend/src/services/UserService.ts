/**
 * User Service
 */
import prisma from '../prisma'

export const getUsersInRoom = (roomId: string) => {
	return prisma.user.findMany({
		where: {
			roomId: roomId,
		}
	})
}

export const deleteAllUsers = () => {
	return prisma.user.deleteMany()
}
