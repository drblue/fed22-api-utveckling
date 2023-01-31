# Endpoints

## Authors

### `GET /authors`

### _`GET /authors/:authorId`_

Get author details.

### `GET /authors/:authorId/books`

Get all books the author has written.

### `POST /authors/:authorId/books`

Add a book to a author.

```json
{
  "bookId": 2
}
```

### `POST /authors`

```json
{
  "name": "Sir Arthur C. Clarke"
}
```

## Books

### `GET /books`

### `POST /books`

```json
{
  "title": "2001: A Space Odessey",
  "pages": 224
}
```

## User

## `POST /register`

Register a new user.

```json
{
  "name": "Johan Nordström",
  "email": "jn@thehiveresistance.com",
  "password": "abc123"
}
```

### `GET /profile`

Get the authenticated user information.

```json
{
  "id": 1,
  "name": "Johan Nordström",
  "email": "jn@thehiveresistance.com"
}
```

```json
{
  "id": 2,
  "name": "Tuff-Tobbe",
  "email": "ts@thehiveresistance.com"
}
```

### `GET /profile/books`

Get the authenticated user's books.

```json
[
  {},
  {},
  {}
]
```
