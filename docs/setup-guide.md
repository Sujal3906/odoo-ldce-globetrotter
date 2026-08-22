# Setup guide

## Prerequisites

- Node.js 20+
- MongoDB 7+ running locally, or a MongoDB Atlas connection string

## Install and run

```bash
npm install
copy backend\\.env.example backend\\.env
npm run dev
```

On macOS/Linux, use `cp backend/.env.example backend/.env` instead. Update `MONGODB_URI` and `JWT_SECRET` before using the API. The React app starts at `http://localhost:5173`; the Express API starts at `http://localhost:5000`.

## Seed discovery data

Import `database/seed-destinations.json` with MongoDB Compass or `mongoimport` into the `globetrotter.destinations` collection. The client has visual demo data built in, so this step is optional for first-run UI review.

