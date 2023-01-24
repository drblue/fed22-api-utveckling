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
