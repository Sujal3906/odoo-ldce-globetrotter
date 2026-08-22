# Architecture

The application is organized as a Vite React single-page interface and an Express REST API. React maintains fast local draft state for a friendly demo-first experience, while the API owns authenticated users, persistent trips, and discovery records when MongoDB is connected.

```text
React + Vite  ->  Express API  ->  MongoDB
     local drafts        JWT          users, trips, destinations
```

Trip stops, activities, and expenses are embedded within a trip document because they are normally read and edited with the trip itself.

