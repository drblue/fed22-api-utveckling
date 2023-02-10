/**
 * Type Definitions
 */

export type CreateAuthorData = {
	name: string,
}

export type CreateUserData = {
	name: string,
	email: string,
	password: string,
}

export type UpdateUserData = {
	name?: string,
	email?: string,
	password?: string,
}

export type JwtPayload = {
	sub: number,
	name: string,
	email: string,
	iat?: number,
	exp?: number,
}
