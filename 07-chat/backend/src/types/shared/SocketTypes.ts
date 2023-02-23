export {}

// Events emitted by the server to the client
export interface ServerToClientEvents {
	hello: () => void
	chatMessage: (message: ChatMessageData) => void
	userJoined: (notice: NoticeData) => void
}

// Events emitted by the client to the server
export interface ClientToServerEvents {
	sendChatMessage: (message: ChatMessageData) => void
	userJoin: (username: string, callback: (success: boolean) => void) => void
}

// Events between servers
export interface InterServerEvents {
}

// Message payload
export interface ChatMessageData {
	content: string
	timestamp: number
	username: string
}

// Notice payload
export interface NoticeData {
	timestamp: number
	username: string
}
