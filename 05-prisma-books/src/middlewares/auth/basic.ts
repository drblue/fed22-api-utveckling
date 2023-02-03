/**
 * HTTP Basic Authentication Middleware
 */
import bcrypt from 'bcrypt'
import Debug from 'debug'
import { Request, Response, NextFunction } from 'express'
import { getUserByEmail } from '../../services/user_service'

const debug = Debug('prisma-books:basic')

export const basic = async (req: Request, res: Response, next: NextFunction) => {
	debug("Hello from auth/basic!")

	// Make sure Authorization header exists, otherwise bail 🛑
	if (!req.headers.authorization) {
		debug("Authorization header missing")

		return res.status(401).send({
			status: "fail",
			data: "Authorization required",
		})
	}

	// Split Authorization header on ` `
	// "Basic am5AdGhlaGl2ZXJlc2lzdGFuY2UuY29tOmFiYzEyMw=="
	// =>
	// [0] => "Basic"
	// [1] => "am5AdGhlaGl2ZXJlc2lzdGFuY2UuY29tOmFiYzEyMw=="
	debug("Authorization header: %o", req.headers.authorization)
	const [authSchema, base64Payload] = req.headers.authorization.split(" ")

	// Check that Authorization scheme is "Basic", otherwise bail 🛑
	if (authSchema.toLowerCase() !== "basic") {
		debug("Authorization schema isn't Basic")

		return res.status(401).send({
			status: "fail",
			data: "Authorization required",
		})
	}

	// Decode credentials from base64 => ascii
	const decodedPayload = Buffer.from(base64Payload, "base64").toString("ascii")
	// decodedPayload = "jn@thehiveresistance.com:abc123"

	// Split decodedPayload on `:`
	const [email, password] = decodedPayload.split(":")

	// Get user from database, otherwise bail 🛑
	const user = await getUserByEmail(email)
	if (!user) {
		debug("User %s does not exist", email)

		return res.status(401).send({
			status: "fail",
			data: "Authorization required",
		})
	}

	// Verify hash against credentials, otherwise bail 🛑
	const result = await bcrypt.compare(password, user.password)
	if (!result) {
		debug("Password for user %s didn't match", email)

		return res.status(401).send({
			status: "fail",
			data: "Authorization required",
		})
	}
	debug("Password for user %s was correct 🥳", email)

	// Attach User to Request 🤩
	req.user = user

	// Nothing to see here, move along... ✅
	next()
}
