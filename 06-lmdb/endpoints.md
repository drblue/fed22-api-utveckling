# Endpoints

## Actors

### `GET /actors`

Get all actors.

### `GET /actors/:actorId`

Get actor details.

### `POST /actors`

```json
{
  "name": "Robert Downey Jr"
}
```

## Movies

### `GET /movies`

Get all movies.

### `GET /movies/:movieId`

Get movie details, including actors.

### `POST /movies`

```json
{
  "title": "2001: A Space Odessey",
  "runtime": 185,
  "actors": []
}
```

## User

## `POST /register`

Register a new user.

```json
{
  "name": "Johan Nordström",
  "username": "dr_blue",
  "password": "abc123"
}
```

### `GET /profile`

Get the authenticated user information.

```json
{
  "id": 1,
  "name": "Johan Nordström",
  "username": "dr_blue"
}
```

```json
{
  "id": 2,
  "name": "Tobias Silfverberg",
  "username": "tufftobbe",
  "email": "ts@thehiveresistance.com"
}
```
