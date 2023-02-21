import app from './src/app'
import http from 'http'
import * as dotenv from 'dotenv'
import { Server } from 'socket.io'
import { handleConnection } from './src/controllers/socket_controller'
import {
	ClientToServerEvents,
	InterServerEvents,
	ServerToClientEvents,
} from './src/types/shared/SocketTypes'

// Initialize dotenv so it reads our `.env`-file
dotenv.config()

// Read port to start server on from `.env`, otherwise default to port 3000
const PORT = process.env.PORT || 3000

/**
 * Create HTTP and Socket.IO server.
 */
const httpServer = http.createServer(app)
const io = new Server<ClientToServerEvents, ServerToClientEvents, InterServerEvents>(httpServer, {
	cors: {
		origin: '*',
		credentials: true,
	}
})

/**
 * Handle incoming Socket.IO connection
 */
io.on('connection', (socket) => {
	// Yay someone connected to me
	handleConnection(socket)
})

/**
 * Listen on provided port, on all network interfaces.
 */
httpServer.listen(PORT)

/**
 * Event listener for HTTP server "error" event.
 */
httpServer.on('error', (err: NodeJS.ErrnoException) => {
	if (err.syscall !== 'listen') {
		throw err;
	}

	switch (err.code) {
		case 'EACCES':
			console.error(`🦸🏻 Port ${PORT} requires elevated privileges`)
			process.exit(1)
			break
		case 'EADDRINUSE':
			console.error(`🛑 Port ${PORT} is already in use`)
			process.exit(1)
			break
		default:
			throw err
	}
})

/**
 * Event listener for HTTP server "listening" event.
 */
httpServer.on('listening', () => {
	console.log(`🧑🏻‍🍳 Yay, server started on http://localhost:${PORT}`)
})
