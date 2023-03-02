# Chat 🧓🏻🧑🏻‍🏫

## ✅ Step 1

Create Prisma model for a `Message`.

## ✅ Step 1.5

Move all Prisma-logic for a `Room` to `RoomService`.

- `getRooms()`
- `getRoom(roomId)`

## ✅ Step 2

When the server receives a message, create a new `Message` instance
and save it to the database.

Create the service `MessageService` and the method `createMessage(message)`.

## ✅ Step 3

When a user joins a room, retrieve the latest messages sent to
the room (sent during the past 24 hours, max 100 messages).
