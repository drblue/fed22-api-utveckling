# Request Call Hierarchy

## `GET /publishers/1`

```text
server.ts
>    app.ts
    >    routes/index.ts
            "/authors"      -> routes/authors.ts
            "/books"        -> routes/books.ts
        >   "/publishers"   -> routes/publishers.ts
                "GET /"                -> controllers/publisher_controller.ts@index
            >   "GET /:publisherId"    -> controllers/publisher_controller.ts@show
                "POST /"               -> controllers/publisher_controller.ts@store
```
