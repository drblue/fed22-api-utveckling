/**
 * Express Server
 */

// Require Express
const express = require('express')
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

// Start listening for incoming requests on port 3000
app.listen(PORT, () => {
	console.log(`🥳 Yay, server started on localhost:${PORT}`)
})
