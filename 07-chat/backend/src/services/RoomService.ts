/**
 * Room Service
 */
import prisma from '../prisma'

/**
 * Get list of all rooms.
 */
export const getRooms = () => {
	return prisma.room.findMany()
}

/**
 * Get a single room
 *
 * @param roomId ID of room to get
 */
export const getRoom = (roomId: string) => {
	return prisma.room.findUnique({
		where: {
			id: roomId,
		}
	})
}
