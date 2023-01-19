/**
 * Express Server
 */

// Require stuff
require('dotenv').config()
const express = require('express')
const _ = require('lodash')
const morgan = require('morgan')
const PORT = 3000

// Get the client
const mysql = require('mysql2/promise')

// Create the connection to the database
const connection = mysql.createConnection({
	host: process.env.DATABASE_HOST,
	port: process.env.DATABASE_PORT,
	user: process.env.DATABASE_USER,
	password: process.env.DATABASE_PASSWORD,
	database: process.env.DATABASE_NAME,
})

// Create a new Express app
const app = express()

// Parse any incoming JSON
app.use(express.json())

// Log information about all incoming requests using morgan
app.use(morgan('dev'))

/**
 * GET /
 */
app.get('/', (req, res) => {
	res.send({
		message: "Oh, hi there ☺️",
	})
})

/**
 * GET /directors
 *
 * Get all directors
 */
app.get('/directors', async (req, res) => {
	const db = await connection
	const [rows] = await db.query('SELECT * FROM directors')
	res.send(rows)
})

/**
 * GET /directors/:directorId
 *
 * Get a single director
 */
app.get('/directors/:directorId', async (req, res) => {
	const { directorId } = req.params

	const db = await connection
	const [rows] = await db.query('SELECT * FROM directors WHERE id = ?', [ directorId ])

	// guard clause
	if (!rows.length) {
		res.status(404).send({ message: 'No such record exists.' })
		return
	}

	res.send(rows[0])
})

/**
 * GET /movies
 *
 * Get all movies
 */
app.get('/movies', async (req, res) => {
	const db = await connection
	const [rows] = await db.query('SELECT * FROM movies')
	res.send(rows)
})

/**
 * GET /movies/:movieId
 *
 * Get a single movie
 *
 * @todo ✅ 1: Add route and logic for retrieving just one movie (ex: GET /movies/4)
 * @todo ✅ 2: Handle if no movie with the requested id exists
 */
app.get('/movies/:movieId', async (req, res) => {
	const { movieId } = req.params  // same as `const movieId = req.params.movieId`

	const db = await connection
	const [rows] = await db.query('SELECT * FROM movies WHERE id = ?', [ movieId ])

	// guard clause
	if (!rows.length) {
		res.status(404).send({ message: 'No such record exists.' })
		return
	}

	res.send(rows[0])
})

/**
 * POST /movies
 *
 * Create a movie
 */
app.post('/movies', async (req, res) => {
	console.log("Incoming!", req.body)
	// const { title, genre, runtime, release_date } = req.body

	const db = await connection
	const [result] = await db.query('INSERT INTO movies SET ?', {
		title: req.body.title,
		genre: req.body.genre,
		runtime: req.body.runtime,
		release_date: req.body.release_date,
	})

	// Send back the received data and append the id of the newly created record
	res.status(201).send({
		...req.body,
		id: result.insertId,
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
