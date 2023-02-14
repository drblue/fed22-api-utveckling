import * as Mongoose from 'mongoose'
import Debug from 'debug'

const debug = Debug("lmdb:database")
let database: Mongoose.Connection

export const connect = async () => {
	// if we're already connected, do nothing
	if (database) {
		return
	}

	// if no database is configured, throw a tantrum
	if (!process.env.DATABASE_URL) {
		throw Error("No DATABASE_URL set in environment")
	}

	// connect to the database
	const mongoose = await Mongoose.connect(process.env.DATABASE_URL, {
		useNewUrlParser: true,
		useUnifiedTopology: true,
	} as Mongoose.ConnectOptions)

	// set global connection instance
	database = mongoose.connection

	// prepare for Mongoose 7
	database.set('strictQuery', false)

	debug("We're connected to MongoDB Atlas! 🥳")
}
