# QuickNotes API Design

## Endpoints

| Method | Path | Description |
|-|-|-|
| GET | /api/notes | Get all notes |
| GET | /api/notes/{id} | Get one note |
| POST | /api/notes | Create note |
| PUT | /api/notes/{id} | Update note |
| DELETE | /api/notes/{id} | Delete note |
| GET | /api/users/{id}/notes | Get notes by user |

## Create Note

POST /api/notes

Request:

```json
{
"title":"Shopping",
"body":"Buy milk"
}