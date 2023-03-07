/**
 * Model Message
 *
 */
export type Message = {
  id: string
  content: string
  roomId: string
  timestamp: number
  username: string
}

/**
 * Model Room
 *
 */
export type Room = {
  id: string
  name: string
}

/**
 * Model User
 *
 */
export type User = {
  id: string
  name: string
  roomId: string
}
