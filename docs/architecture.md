# QuickNotes Architecture Design

## Requirements

QuickNotes is moving from a browser-only application to a real online service.

The system should support:

- 1 million registered users
- Fast note loading
- Reliable note storage
- Multiple users accessing the system at the same time
- Secure API communication
- Ability to scale as users increase


# Assumptions and Estimates

Assumptions:

- 1,000,000 registered users
- 10% daily active users
- 100,000 daily active users
- Each active user views notes many times per day
- Users create and edit notes regularly


The system is expected to be **read-heavy**.

Users will frequently open the app and load their notes, meaning reading data happens more often than writing new notes.

The design should therefore optimise for fast reads using caching and database replicas.


# Architecture Diagram

```
                    Users
                      |
                      |
                     CDN
                      |
                      |
              Load Balancer
                      |
        --------------------------------
        |              |               |
    API Server     API Server     API Server
        |
        |
      Cache
        |
        |
   Main Database -------- Read Replica
        |
        |
      Queue
        |
        |
     Workers
```


# Components

## CDN

The CDN stores static files and frequently accessed content closer to users, reducing loading times.

## Load Balancer

The load balancer distributes incoming requests between multiple API servers.

## API Servers

API servers handle authentication, validation and requests from the frontend application.

## Cache

The cache stores frequently accessed notes to reduce database load and improve response speed.

## Main Database

The database stores permanent application data including users and notes.

## Read Replica

The read replica handles additional read requests without putting extra pressure on the main database.

## Queue

The queue handles background tasks that do not need to happen immediately.

## Workers

Workers process background jobs such as notifications, exports or cleanup tasks.


# Request Flow

## Loading Notes

1. User opens QuickNotes.
2. The request reaches the load balancer.
3. The API server checks authentication.
4. The server checks the cache.
5. If data exists in cache, it returns immediately.
6. Otherwise, the API server retrieves notes from the database.
7. The response is returned to the user.
8. Frequently requested data can be stored in cache.


## Creating a Note

1. User submits a new note.
2. Request reaches the API server.
3. Server validates the note.
4. The note is saved in the database.
5. Cache is updated if necessary.
6. A success response is returned.


# Trade-offs

## Caching vs Data Freshness

Caching improves performance and reduces database load, but cached information may become temporarily outdated.


## More Servers vs Cost

Adding more API servers improves reliability and handles more users, but increases infrastructure costs.


## Database Replicas vs Complexity

Read replicas improve performance for large numbers of users, but require extra management and synchronisation.


# Single Point of Failure Discussion

A single database server would become a major failure point because all application data depends on it.

To reduce this risk, the system should use database replication, regular backups and monitoring.

The load balancer and API servers should also run in multiple instances so that one server failure does not stop the entire application.