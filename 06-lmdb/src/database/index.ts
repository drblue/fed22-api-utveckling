import * as mongoose from 'mongoose'
import Debug from 'debug'

const debug = Debug('lmdb:database')

/**
 * Current MongoDB connection
 */
export let db: mongoose.Mongoose

/**
 * Connect to MongoDB
 */
export const connect = async () => {
	if (db) {
		debug("🏎️ We're already connected, you want MOAR connection?!")
		return
	}

	// if no database is configured, throw a tantrum
	if (!process.env.DATABASE_URL) {
		throw Error("No DATABASE_URL set in environment")
	}

	// prepare for Mongoose 7
	mongoose.set('strictQuery', false)

	// connect to the database
	const connection = await mongoose.connect(process.env.DATABASE_URL, {
		useNewUrlParser: true,
		useUnifiedTopology: true,
	} as mongoose.ConnectOptions)

	// Set global connection instance
	db = connection

	console.log("🥳 We're connected to MongoDB Atlas!")
}
