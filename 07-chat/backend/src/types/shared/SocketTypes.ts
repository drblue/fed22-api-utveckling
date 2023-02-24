import { Room, User } from '@prisma/client'
export {}

// Events emitted by the server to the client
export interface ServerToClientEvents {
	hello: () => void
	chatMessage: (message: ChatMessageData) => void
	userJoined: (notice: NoticeData) => void
}

// Events emitted by the client to the server
export interface ClientToServerEvents {
	getRoomList: (callback: (rooms: Room[]) => void) => void
	sendChatMessage: (message: ChatMessageData) => void
	userJoin: (username: string, roomId: string, callback: (result: UserJoinResult) => void) => void
}

// Events between servers
export interface InterServerEvents {
}

// Message payload
export interface ChatMessageData {
	content: string
	roomId: string
	timestamp: number
	username: string
}

// Notice payload
export interface NoticeData {
	timestamp: number
	username: string
}

// Room info payload
export interface RoomInfoData extends Room {
	users: User[]
}

// User Join result
export interface UserJoinResult {
	success: boolean
	data: RoomInfoData | null
}
