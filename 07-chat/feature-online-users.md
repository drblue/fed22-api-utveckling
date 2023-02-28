# Online users

## Save user 🛟

When a user joins a room, save them to the database under the room.

## Retrieve users 🏊🏻

Retrieve a list of online users for the room and send the list to
the user that joins the room (so they know who's online).

## Broadcast new list 📢

Emit a `usersOnline`-event to everyone else in the room, so they see
the newly joined user too.

## Remove user when disconnects/leaves 💀

When a user rage-quits, remove them from the room in the database
and emit a new user list to everyone still in the room.
