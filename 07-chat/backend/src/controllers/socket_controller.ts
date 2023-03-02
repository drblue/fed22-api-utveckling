/**
 * Socket Controller
 */
import Debug from 'debug'
import { Socket, Server } from 'socket.io'
import { ClientToServerEvents, NoticeData, ServerToClientEvents, UserJoinResult } from '../types/shared/SocketTypes'
import prisma from '../prisma'
import { createMessage } from '../services/MessageService'
import { getRooms, getRoom } from './../services/RoomService'
import { getUsersInRoom } from '../services/UserService'

// Create a new debug instance
const debug = Debug('chat:socket_controller')

// Handle the user connecting
export const handleConnection = (socket: Socket<ClientToServerEvents, ServerToClientEvents>, io: Server<ClientToServerEvents, ServerToClientEvents>) => {
	debug('🙋🏼 A user connected', socket.id)

	// Say hello to the user
	debug('👋🏻 Said hello to the user')
	socket.emit('hello')

	// Listen for room list request
	socket.on('getRoomList', async (callback) => {
		// Query database for list of rooms `getRooms()`
		const rooms = await getRooms()

		debug('🏨 Got request for rooms, sending room list %o', rooms)

		// Send room list
		setTimeout(() => {
			callback(rooms)
		}, 1500)
	})

	// Listen for incoming chat messages
	socket.on('sendChatMessage', async (message) => {
		debug('📨 New chat message', socket.id, message)

		// Broadcast message to everyone else in the room
		socket.broadcast.to(message.roomId).emit('chatMessage', message)

		// Save message to db `createMessage(message)`
		await createMessage(message)
	})

	// Listen for a user join request
	socket.on('userJoin', async (username, roomId, callback) => {
		debug('👶🏽 User %s wants to join the room %s', username, roomId)

		// Get room from database `getRoom(roomId)`
		const room = await getRoom(roomId)

		if (!room) {
			return callback({
				success: false,
				data: null,
			})
		}

		const notice: NoticeData = {
			timestamp: Date.now(),
			username,
		}

		// Add user to room `roomId
		socket.join(roomId)

		// Create a User in the database if they do not already exist
		// otherwise update the User with the roomId
		// upsert = update or insert
		const user = await prisma.user.upsert({
			where: {
				id: socket.id,
			},
			create: {
				id: socket.id,
				name: username,
				roomId: roomId,
			},
			update: {
				name: username,
				roomId: roomId,
			},
		})

		// Retrieve a list of Users for the room
		const usersInRoom = await getUsersInRoom(roomId)

		// Let everyone know a new user has joined
		socket.broadcast.to(roomId).emit('userJoined', notice)

		// Let user know they're welcome
		callback({
			success: true,
			data: {
				id: room.id,
				name: room.name,
				messages: room.messages,
			},
		})

		// Broadcast a userlist to everyone (including the user joining) in the room
		io.to(roomId).emit('onlineUsers', usersInRoom)
	})

	// Handle user disconnecting
	socket.on('disconnect', async () => {
		debug('✌🏻 A user disconnected', socket.id)

		// Find room user was in (if any)
		const user = await prisma.user.findUnique({
			where: {
				id: socket.id,
			}
		})

		// If user wasn't in a room, just do nothin'
		if (!user) {
			return
		}

		// Remove user from room (if they were in a room)
		await prisma.user.delete({
			where: {
				id: socket.id,
			}
		})

		/**
		 * @todo Broadcast a new list
		 */
		// Broadcast new list (without us) of online users to the room
		const users = await getUsersInRoom(user.roomId)
		socket.broadcast.emit('onlineUsers', users)
	})
}
