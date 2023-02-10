/**
 * User Service
 */
import prisma from '../prisma'
import { CreateUserData, UpdateUserData } from '../types'

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

/**
 * Create a user
 *
 * @param data User Details
 */
export const createUser = async (data: CreateUserData) => {
	return await prisma.user.create({
		data: data,
	})
}

/**
 * Update a user
 *
 * @param userId Id of user
 * @param userData Data to update user with
 */
export const updateUser = async (userId: number, userData: UpdateUserData) => {
	return await prisma.user.update({
		where: {
			id: userId,
		},
		data: userData,
	})
}
