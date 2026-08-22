# GlobeTrotter MongoDB design

`users` stores account and preference data. `trips` belongs to one user and embeds the ordered stops, their activities, and the trip's expenses. This keeps itinerary reads to a single document, which matches the way the interface displays a complete trip. `destinations` is a shared, searchable discovery collection.

Key indexes:

- `users.email` - unique account lookup
- `trips.user + trips.startDate` - a user's trip listing
- `destinations` text index on city, country, and tags - discovery search

The Mongoose schemas in `backend/models/` are the executable source of truth.

