import './assets/scss/style.scss'
import { io, Socket } from 'socket.io-client'
import {
	ChatMessageData,
	ClientToServerEvents,
	ServerToClientEvents,
} from '@backend/types/shared/SocketTypes'

const SOCKET_HOST = import.meta.env.VITE_APP_SOCKET_HOST

const messageEl = document.querySelector('#message') as HTMLInputElement
const messageFormEl = document.querySelector('#message-form') as HTMLFormElement
const messagesEl = document.querySelector('#messages') as HTMLDivElement

// Connect to Socket.IO server
const socket: Socket<ServerToClientEvents, ClientToServerEvents> = io(SOCKET_HOST)

// Listen for when connection is established
socket.on('connect', () => {
	console.log('💥 Connected to the server', socket.id)
})

// Listen for when the server got tired of us
socket.on('disconnect', () => {
	console.log('💀 Disconnected from the server')
})

// Listen for when the server says hello
socket.on('hello', () => {
	console.log('👋🏻 The nice server said Hello')
})

// Listen for new chat messages
socket.on('chatMessage', (message) => {
	console.log('📨 YAY SOMEONE WROTE SOMETHING!!!!!!!', message)

	// Create a function called `addMessageToChat` that takes the
	// `message` as a parameter and creates a new LI-element, sets
	// the content + styling and appends it to `messagesEl`
})

// Send a message to the server when form is submitted
messageFormEl.addEventListener('submit', e => {
	e.preventDefault()

	if (!messageEl.value.trim()) {
		return
	}

	// Construct message payload
	const message: ChatMessageData = {
		content: messageEl.value,
	}

	// Send (emit) the message to the server
	socket.emit('sendChatMessage', message)

	// Extend the `addMessageToChat` function to know if the message
	// was sent by us, and then add `.own-message` class to the
	// LI-element before appending it to `messagesEl`

	console.log("Emitted 'sendChatMessage' event to server", message)

	// Clear the input field and focus
	messageEl.value = ''
	messageEl.focus()
})
