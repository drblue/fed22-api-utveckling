/**
 * Author Service
 */
import prisma from '../prisma'
import { CreateAuthorData } from "../types"

/**
 * Get all authors
 */
export const getAuthors = async () => {
	return await prisma.author.findMany()
}

/**
 * Get a single author
 *
 * @param authorId The id of the author to get
 */
export const getAuthor = async (authorId: number) => {
}

/**
 * Create a author
 *
 * @param data Author Details
 */
export const createAuthor = async (data: CreateAuthorData) => {
}
