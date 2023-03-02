/**
 * Message Service
 */
import { ChatMessageData } from '../types/shared/SocketTypes'
import prisma from '../prisma'

/**
 * Save a message.
 *
 * @param message Message to save
 */
export const createMessage = (message: ChatMessageData) => {
	return prisma.message.create({
		data: message,
	})
}
