/**
 * Express Server
 */

// Require stuff
const express = require('express')
const _ = require('lodash')
const fs = require('fs/promises')
const morgan = require('morgan')
const oneliners = require('./data/oneliners.json')
const users = require('./data/users.json')
const PORT = 3000

// Create a new Express app
const app = express()

// Parse any incoming JSON
app.use(express.json())

// Log information about all incoming requests using morgan
app.use(morgan('dev'))

// GET /
app.get('/', (req, res) => {
	res.send({
		message: "Oh, hi there ☺️",
	})
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
