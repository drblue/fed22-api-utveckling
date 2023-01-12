/**
 * Express Server
 */

// Require Express
const express = require('express')
const _ = require('lodash')
const oneliners = require('./data/oneliners.json')
const PORT = 3000

// Create a new Express app
const app = express()

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
	// const i = Math.floor(Math.random() * oneliners.length)
	const i = _.random(0, oneliners.length - 1)
	const joke = oneliners[i]

	// Respond with a object containing the oneliner in the `joke` attribute
	res.send({
		joke,	// joke: joke
	})
})

// Start listening for incoming requests on port 3000
app.listen(PORT, () => {
	console.log(`🥳 Yay, server started on localhost:${PORT}`)
})
