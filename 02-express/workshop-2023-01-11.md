# Workshop 2023-01-11

Skriv logiken för att läsa in filen `data/oneliners.json` (innehåller en JSON-array av strängar) och välj slumpmässigt ut ett skämt ifrån array:en som du skickar som svar på GET-requests till `/joke`.

Svaret ska vara ett objekt med attributet `joke` som ska innehålla skämtet.

## Exempel

### `GET /joke`

```json
{
  "joke": "Shhh, I'm Batman"
}
```
