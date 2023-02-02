/**
 * User Service
 */
import prisma from '../prisma'

/**
 * Get a user by email
 *
 * @param email The email of the user to get
 */
export const getUserByEmail = async (email: string) => {
	return await prisma.user.findUnique({
		where: {
			email: email,
		}
	})
}
