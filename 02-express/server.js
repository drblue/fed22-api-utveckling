/**
 * Express Server
 */

// Require Express
const express = require('express')
const _ = require('lodash')
const fs = require('fs/promises')
const oneliners = require('./data/oneliners.json')
const PORT = 3000

// Create a new Express app
const app = express()

// Log information about all incoming requests
app.use( (req, res, next) => {
	const now = new Date()
	console.log(`${now.toLocaleString()} ${req.method} ${req.path}`)

	// We're done, pass request along
	next()
} )

// GET /
app.get('/', (req, res) => {
	// res.send("Oh, hi there ☺️")
	res.send({
		message: "Oh, hi there ☺️",
		lolcats: "Are funny",
		reactions_on_isaks_memes: [
			"rotflol",
			"yolo"
		],
	})
})

// POST /
app.post('/', (req, res) => {
	res.send("I'm no mailbox 😡")
})

// GET /coffee
app.get('/coffee', (req, res) => {
	res.send("Is good for you!")
})

// GET /joke
app.get('/joke', (req, res) => {
	// Get a random item from the array `oneliners`
	const joke = _.sample(oneliners)

	// Respond with a object containing the oneliner in the `joke` attribute
	res.send({
		joke,	// joke: joke
	})
})

// GET /badjoke (using filesystem and a textfile)
app.get('/badjoke', async (req, res) => {
	try {
		const rawFile = await fs.readFile('./data/oneliners.txt', 'utf-8')
		const jokes = rawFile.split('\n')

		// Get a random item from the array `oneliners`
		const joke = _.sample(jokes)

		// Respond with a object containing the oneliner in the `joke` attribute
		res.send({
			joke,	// joke: joke
		})

	} catch (e) {
		console.log("ERROR! ERROR! DANGER WILL ROBINSON!")
	}
})

// Catch requests where a route does not exist
app.use((req, res) => {
	res.status(404).send({
		message: `Sorry, no route exists for ${req.method} ${req.path}`,
	})
})

// Start listening for incoming requests on port 3000
app.listen(PORT, () => {
	console.log(`🥳 Yay, server started on localhost:${PORT}`)
})
