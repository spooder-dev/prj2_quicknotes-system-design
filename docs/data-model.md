# QuickNotes Data Model

## Entities

## Users

Stores information about people who use QuickNotes.

Fields:

- id
- name
- email
- password_hash
- created_at


## Notes

Stores the actual notes created by users.

Fields:

- id
- user_id
- title
- body
- category_id
- created_at
- updated_at


## Categories

Stores note categories such as Personal, Work and Study.

Fields:

- id
- name


## Tags

Stores labels that can be attached to notes.

Fields:

- id
- name


# Relationships

A user can create many notes.

This is a **one-to-many relationship** between Users and Notes.

A category can contain many notes.

This is a **one-to-many relationship** between Categories and Notes.

Notes and tags have a **many-to-many relationship** because one note can have many tags and one tag can belong to many notes.

A join table is required to connect notes and tags.


# Database Tables

```sql
CREATE TABLE users (
    id INTEGER PRIMARY KEY,
    name TEXT NOT NULL,
    email TEXT UNIQUE NOT NULL,
    password_hash TEXT NOT NULL,
    created_at DATETIME
);


CREATE TABLE categories (
    id INTEGER PRIMARY KEY,
    name TEXT NOT NULL
);


CREATE TABLE notes (
    id INTEGER PRIMARY KEY,
    user_id INTEGER NOT NULL,
    category_id INTEGER,
    title TEXT NOT NULL,
    body TEXT,
    created_at DATETIME,
    updated_at DATETIME,

    FOREIGN KEY(user_id)
    REFERENCES users(id),

    FOREIGN KEY(category_id)
    REFERENCES categories(id)
);


CREATE TABLE tags (
    id INTEGER PRIMARY KEY,
    name TEXT NOT NULL
);


CREATE TABLE note_tags (
    note_id INTEGER,
    tag_id INTEGER,

    PRIMARY KEY(note_id, tag_id),

    FOREIGN KEY(note_id)
    REFERENCES notes(id),

    FOREIGN KEY(tag_id)
    REFERENCES tags(id)
);
```

---

# Example Queries

## Get all notes belonging to a user

```sql
SELECT *
FROM notes
WHERE user_id = 1;
```


## Get notes with categories

```sql
SELECT 
notes.title,
categories.name
FROM notes
JOIN categories
ON notes.category_id = categories.id;
```


## Search notes

```sql
SELECT *
FROM notes
WHERE title LIKE '%javascript%';
```


# Indexes

I would add an index on `notes.user_id`.

This improves performance when loading all notes belonging to a specific user because this query will happen frequently.


I would also add an index on `notes.created_at` because feeds usually display recent notes first.


# SQL vs NoSQL Decision

I would choose SQL for QuickNotes because the system contains structured relationships between users, notes, categories and tags.

SQL databases provide strong consistency, foreign keys and reliable transactions. These features are useful because users must always own their correct notes and permissions must be accurate.

A NoSQL database could provide easier horizontal scaling, but the relational structure of this application makes SQL a better choice.