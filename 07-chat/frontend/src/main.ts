import './assets/scss/style.scss'
import { io, Socket } from 'socket.io-client'
import {
	ChatMessageData,
	ClientToServerEvents,
	ServerToClientEvents,
	User,
} from '@backend/types/shared/SocketTypes'

const SOCKET_HOST = import.meta.env.VITE_APP_SOCKET_HOST

// Forms
const messageEl = document.querySelector('#message') as HTMLInputElement
const messageFormEl = document.querySelector('#message-form') as HTMLFormElement
const usernameFormEl = document.querySelector('#username-form') as HTMLFormElement

// Lists
const messagesEl = document.querySelector('#messages') as HTMLUListElement

// Views
const chatWrapperEl = document.querySelector('#chat-wrapper') as HTMLDivElement
const startEl = document.querySelector('#start') as HTMLDivElement

// User Details
let roomId: string | null = null
let username: string | null = null

// Connect to Socket.IO server
const socket: Socket<ServerToClientEvents, ClientToServerEvents> = io(SOCKET_HOST)

// Add messages to the chat
const addMessagesToChat = (messages: ChatMessageData[]) => {
	// Clear any previous messages from the chat
	messagesEl.innerHTML = ''

	// Loop over messages and add them to the chat
	messages.forEach(message => {
		addMessageToChat(message)
	})
}

// Add a message to the chat
const addMessageToChat = (message: ChatMessageData, ownMessage = false) => {
	// Create a new LI element
	const messageEl = document.createElement('li')

	// Set class of LI to 'message'
	messageEl.classList.add('message')

	// If the message is from the user, add the class 'own-message'
	if (ownMessage) {
		messageEl.classList.add('own-message')
	}

	// Get human readable time
	const time = new Date(message.timestamp).toLocaleTimeString()  // "13:37:00"

	// Set the text content of the LI element to the message
	messageEl.innerHTML = ownMessage
		? `
			<span class="content">${message.content}</span>
			<span class="time">${time}</span>
		` : `
			<span class="user">${message.username}</span>
			<span class="content">${message.content}</span>
			<span class="time">${time}</span>
		`

	// Append the LI element to the messages element
	messagesEl.appendChild(messageEl)

	// Scroll to the bottom of the messages list
	messageEl.scrollIntoView({ behavior: 'smooth' })
}

// Add a notice to the chat
const addNoticeToChat = (content: string, timestamp: number) => {
	// Create a new LI-element
	const noticeEl = document.createElement('li')

	// Add `notice`-class
	noticeEl.classList.add('notice')

	// Get human readable time
	const time = new Date(timestamp).toLocaleTimeString()  // "13:37:00"

	// Set the content of the notice
	noticeEl.innerHTML = `
		<span class="content">${content}</span>
		<span class="time">${time}</span>
	`

	// Append the LI element to the messages element
	messagesEl.appendChild(noticeEl)

	// Scroll to the bottom of the messages list
	noticeEl.scrollIntoView({ behavior: 'smooth' })
}

// Show chat view
const showChatView = () => {
	startEl.classList.add('hide')
	chatWrapperEl.classList.remove('hide')
}

// Show welcome view
const showWelcomeView = () => {
	const connectBtnEl = document.querySelector('#connectBtn') as HTMLButtonElement
	const roomEl = document.querySelector('#room') as HTMLSelectElement

	// Clear room list and disable connect-button
	connectBtnEl.disabled = true
	roomEl.innerHTML = `<option selected>Loading...</option>`

	// Request a list of rooms from the server
	console.log("🏨 Requesting rooms")
	socket.emit('getRoomList', (rooms) => {
		// We gots lots of rooms
		console.log("YAY ROOMS!", rooms)

		// Update #room with options for each room
		roomEl.innerHTML = rooms
			.map(room => `<option value="${room.id}">${room.name}</option>`)
			.join('')

		// Enable "Connect"-button once we have a room list
		connectBtnEl.disabled = false
	})

	// Hide chat (if visible)
	chatWrapperEl.classList.add('hide')

	// Show welcome view
	startEl.classList.remove('hide')
}

// Update online users list
const updateOnlineUsers = (users: User[]) => {
	const onlineUsersEl = document.querySelector('#online-users') as HTMLUListElement

	console.log("updateOnlineUsers:", users)

	onlineUsersEl.innerHTML = users
		.map(user =>
			user.id === socket.id
				? `<li class="me"><span class="fa-solid fa-user-astronaut"></span> ${user.name}</li>`
				: `<li><span class="fa-solid fa-user-astronaut"></span> ${user.name}</li>`
		)
		.join('')
}

// Listen for when connection is established
socket.on('connect', () => {
	console.log('💥 Connected to the server', socket.id)

	// Show welcome view
	showWelcomeView()
})

// Listen for when the server got tired of us
socket.on('disconnect', () => {
	console.log('💀 Disconnected from the server')
})

// Listen for when we're reconnected
socket.io.on('reconnect', () => {
	console.log('🍽️ Reconnected to the server')
	// Broadcast userJoin event, but only if we were in the chat previously
	if (username && roomId) {
		socket.emit('userJoin', username, roomId, () => {
			addNoticeToChat('You reconnected 🥳', Date.now())
		})
	}
})

// Listen for when the server says hello
socket.on('hello', () => {
	console.log('👋🏻 The nice server said Hello')
})

// Listen for new chat messages
socket.on('chatMessage', (message) => {
	console.log('📨 Someone wrote something', message)

	// Create a function called `addMessageToChat` that takes the
	// `message` as a parameter and creates a new LI-element, sets
	// the content + styling and appends it to `messagesEl`
	addMessageToChat(message)
})

// Listen for when a user joins the chat
socket.on('userJoined', (notice) => {
	console.log('👶🏽 A new user joined the chat', notice)

	addNoticeToChat(`${notice.username} has joined the chat`, notice.timestamp)
})

// Listen for an updated list of online users
socket.on('onlineUsers', (users) => {
	updateOnlineUsers(users)
})

// Send a message to the server when form is submitted
messageFormEl.addEventListener('submit', e => {
	e.preventDefault()

	if (!messageEl.value.trim() || !username || !roomId) {
		return
	}

	// Construct message payload
	const message: ChatMessageData = {
		content: messageEl.value,
		roomId,
		timestamp: Date.now(),
		username,  // username: username
	}

	// Send (emit) the message to the server
	socket.emit('sendChatMessage', message)

	// Extend the `addMessageToChat` function to know if the message
	// was sent by us, and then add `.own-message` class to the
	// LI-element before appending it to `messagesEl`
	addMessageToChat(message, true)

	console.log("Emitted 'sendChatMessage' event to server", message)

	// Clear the input field and focus
	messageEl.value = ''
	messageEl.focus()
})

// Get username from form and then show chat
usernameFormEl.addEventListener('submit', e => {
	e.preventDefault()

	// Get username
	roomId = (usernameFormEl.querySelector('#room') as HTMLSelectElement).value
	username = (usernameFormEl.querySelector('#username') as HTMLInputElement).value.trim()

	// If no username, NO CHAT FOR YOU
	if (!username || !roomId) {
		return
	}

	// Emit `userJoin`-event to the server and wait for acknowledgement
	// before showing the chat view
	socket.emit('userJoin', username, roomId, (result) => {
		console.log("Join was success?", result)

		if (!result.success || !result.data) {
			alert("NO ACCESS 4 US")
			return
		}

		const roomInfo = result.data

		// Update chat view title with room name
		const chatTitleEl = document.querySelector('#chat-title') as HTMLHeadingElement
		chatTitleEl.innerText = roomInfo.name

		// Add chat history to chat
		addMessagesToChat(roomInfo.messages)

		// Yay we're allowed to join
		console.log("Showing chat view")
		showChatView()
	})
	console.log("Emitted 'userJoin' event to server", username)
})
