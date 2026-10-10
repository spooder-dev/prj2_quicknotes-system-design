# QuickNotes API Design

## Overview

The QuickNotes API allows users to create, view, update and delete notes. The backend service stores user accounts, notes and note metadata.

---

# Endpoints

| Method | Path | Description | Success Code |
|---|---|---|---|
| GET | `/api/notes` | Returns all notes for the logged-in user | 200 OK |
| GET | `/api/notes/{id}` | Returns one note by ID | 200 OK |
| POST | `/api/notes` | Creates a new note | 201 Created |
| PUT | `/api/notes/{id}` | Updates an existing note | 200 OK |
| DELETE | `/api/notes/{id}` | Deletes a note | 204 No Content |
| GET | `/api/users/{id}/notes` | Returns all notes belonging to a user | 200 OK |

---

# GET All Notes

## Request

```
GET /api/notes
```

## Response

```json
[
  {
    "id": 1,
    "title": "Shopping list",
    "body": "Buy milk",
    "createdAt": "2026-10-11"
  }
]
```

Status:

```
200 OK
```

---

# GET One Note

## Request

```
GET /api/notes/1
```

Returns one note.

Status:

```
200 OK
```

---

# Create Note

## Request

```
POST /api/notes
```

Body:

```json
{
  "title": "Study",
  "body": "Revise JavaScript"
}
```

Response:

```json
{
  "id": 5,
  "title": "Study",
  "body": "Revise JavaScript"
}
```

Status:

```
201 Created
```

---

# Update Note

## Request

```
PUT /api/notes/5
```

Body:

```json
{
  "title": "Updated title",
  "body": "Updated content"
}
```

Status:

```
200 OK
```

---

# Delete Note

## Request

```
DELETE /api/notes/5
```

Status:

```
204 No Content
```

---

# Get Notes By User

## Request

```
GET /api/users/1/notes
```

Returns all notes created by a user.

Status:

```
200 OK
```

---

# Error Codes

## 400 Bad Request

Returned when the request contains invalid data.

Example:

- Missing note title
- Title longer than 100 characters

Example response:

```json
{
  "error": "Title is required"
}
```

---

## 404 Not Found

Returned when a requested resource does not exist.

Example:

Request:

```
GET /api/notes/999
```

when note 999 does not exist.

Example response:

```json
{
  "error": "Note not found"
}
```