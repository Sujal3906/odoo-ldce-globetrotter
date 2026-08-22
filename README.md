# GlobeTrotter

## Odoo x LDCE Hackathon 2026

GlobeTrotter is a personalized travel planning application that helps
users create, organize, visualize, budget, and share multi-city trips.

## Team

- Team Leader: Sujal Jethava
- Team Members: Dweej Bhatt,Sharvil Bhatt

## Problem Statement

Build a personalized travel planning application that allows users to:

- Create multi-city itineraries
- Manage travel dates and activities
- Search cities and activities
- Calculate trip budgets
- Visualize itineraries
- Share travel plans

## Technology

- Odoo
- Python
- SQL
- HTML / CSS / JavaScript

# GlobeTrotter

GlobeTrotter is a full-stack travel-planning application for creating multi-city trips, arranging day-by-day itineraries, tracking budgets, and discovering travel inspiration.

## Contents

- [Features](#features)
- [Technology](#technology)
- [Project status](#project-status)
- [Requirements](#requirements)
- [Run locally](#run-locally)
- [Environment variables](#environment-variables)
- [Application areas](#application-areas)
- [API](#api)
- [Database](#database)
- [Testing](#testing)
- [Project structure](#project-structure)
- [Useful commands](#useful-commands)

## Features

- Sign in and create an account in the client demo flow
- Dashboard with upcoming and previous trips
- Create, edit, and delete multi-city trips
- Build a day-by-day itinerary with stops and activities
- Discover destinations, stays, and experiences
- Track trip expenses by category against a budget
- View trip dates and activities in a calendar timeline
- Share and copy community itinerary ideas
- Manage profile details and preferences
- Log out from the application shell

## Technology

| Layer | Technology |
| --- | --- |
| Frontend | React 18, React Router, Vite, Lucide React |
| Backend | Node.js, Express 4, Nodemon |
| Authentication | JWT and bcryptjs in the API |
| Database | MongoDB with Mongoose |
| Testing | Node.js built-in test runner |
| Package management | npm workspaces or pnpm |

## Project status

The frontend is currently demo-first. It loads curated sample content from `frontend/src/data.js` and stores edited trips, the profile, and the demo session in browser `localStorage`. It does not yet make requests to the Express API.

The backend is available as a separate REST API with MongoDB persistence, JWT authentication, trip management, expense creation, and destination search. The API can be run and tested independently while frontend-to-API integration is added later.

## Requirements

- Node.js 20 or newer
- MongoDB 7 or newer for API features, either locally or through MongoDB Atlas
- npm 10+ or pnpm

## Run locally

### Windows PowerShell

From the repository root:

```powershell
npm.cmd install
Copy-Item backend\.env.example backend\.env
npm.cmd run dev
```

Open the frontend at [http://localhost:5173](http://localhost:5173). The API runs at [http://localhost:5000](http://localhost:5000).

If dependencies are already installed, run only:

```powershell
npm.cmd run dev
```

### macOS or Linux

```bash
npm install
cp backend/.env.example backend/.env
npm run dev
```

The root `dev` script starts the frontend and backend together. MongoDB must be running and the backend environment file must contain a valid connection string for API data routes.

### Run one service

```bash
# Frontend only
npm run client

# Backend only
npm run server
```

The frontend uses Vite on port `5173`; the backend uses port `5000` by default.

## Environment variables

Create `backend/.env` from [`backend/.env.example`](backend/.env.example):

```env
PORT=5000
MONGODB_URI=mongodb://127.0.0.1:27017/globetrotter
JWT_SECRET=replace-this-with-a-long-random-secret
CLIENT_ORIGIN=http://localhost:5173
```

| Variable | Purpose | Default |
| --- | --- | --- |
| `PORT` | Express API port | `5000` |
| `MONGODB_URI` | MongoDB connection string | None; data routes require it |
| `JWT_SECRET` | Secret used to sign API tokens | None; required for auth routes |
| `CLIENT_ORIGIN` | Allowed frontend origin for CORS | `http://localhost:5173` |

Do not commit `backend/.env` or real secrets.

## Application areas

The frontend routes are:

| Route | Screen |
| --- | --- |
| `/login` | Sign in |
| `/signup` | Create account |
| `/` | Dashboard |
| `/trips` | All trips |
| `/trips/new` | New trip editor |
| `/trip/:id` | Trip details |
| `/itinerary/:id` | Itinerary builder |
| `/discover` | Destination discovery |
| `/budget` | Budget and expenses |
| `/calendar` | Calendar timeline |
| `/community` | Community itineraries |
| `/settings` | Profile and preferences |

## API

The API base URL is `http://localhost:5000`. Protected routes expect:

```http
Authorization: Bearer <token>
```

### Health

```http
GET /api/health
```

### Authentication

| Method | Endpoint | Purpose | Auth |
| --- | --- | --- | --- |
| `POST` | `/api/auth/signup` | Create a user and return a JWT | No |
| `POST` | `/api/auth/login` | Sign in and return a JWT | No |
| `GET` | `/api/auth/me` | Read the current profile | Yes |
| `PATCH` | `/api/auth/me` | Update allowed profile fields | Yes |

Signup expects `name`, `email`, and a password of at least eight characters. Login expects `email` and `password`.

### Trips

| Method | Endpoint | Purpose | Auth |
| --- | --- | --- | --- |
| `GET` | `/api/trips` | List the current user's trips | Yes |
| `POST` | `/api/trips` | Create a trip | Yes |
| `GET` | `/api/trips/:tripId` | Read one trip | Yes |
| `PATCH` | `/api/trips/:tripId` | Update one trip | Yes |
| `DELETE` | `/api/trips/:tripId` | Delete one trip | Yes |
| `POST` | `/api/trips/:tripId/expenses` | Add an expense | Yes |

Example trip payload:

```json
{
	"name": "Sunlit Iberian Escape",
	"startDate": "2026-09-14",
	"endDate": "2026-09-23",
	"budget": 4200,
	"visibility": "Friends"
}
```

### Discovery

```http
GET /api/discover/destinations?q=lisbon&country=Portugal&limit=20
```

Destination search is public. `q` searches the city, country, and tags text index; `country` filters by country; `limit` is capped at 50.

## Database

MongoDB stores three main collections:

- `users`: account details, password hashes, home base, and preferences
- `trips`: user-owned trip details with embedded stops, activities, and expenses
- `destinations`: shared searchable destination records

Important indexes include the unique user email index, the trip user/date index, and the destination text index. See [`database/schema.md`](database/schema.md) for the design summary and the Mongoose schemas in [`backend/models`](backend/models) for the executable definitions.

### Seed destinations

Import [`database/seed-destinations.json`](database/seed-destinations.json) into the `globetrotter.destinations` collection with MongoDB Compass or:

```bash
mongoimport --uri "mongodb://127.0.0.1:27017/globetrotter" \
	--collection destinations \
	--file database/seed-destinations.json \
	--jsonArray
```

Seeding is optional for reviewing the frontend because it contains local demo data.

## Testing

Run the current automated tests from the repository root:

```bash
npm test
```

This runs the Node.js test files in `tests/`. The tests currently cover trip date ordering and budget total calculations.

Build the frontend for production:

```bash
npm run build --prefix frontend
```

Preview the production build:

```bash
npm run preview --prefix frontend
```

## Project structure

```text
.
├── backend/
│   ├── app.js                 Express server and middleware
│   ├── middleware/auth.js     JWT protection
│   ├── models/                Mongoose schemas
│   └── routes/                Auth, trip, and discovery routes
├── database/
│   ├── schema.md              MongoDB design notes
│   └── seed-destinations.json Sample destination records
├── docs/                      Setup, architecture, and API notes
├── frontend/
│   ├── src/App.jsx            Routing and client state
│   ├── src/components/        Shared application shell and UI
│   ├── src/pages/             Dashboard, trips, planner, budget, and calendar
│   └── src/styles/            Global and responsive styles
├── screenshots/               Product screenshots
└── tests/                     Node.js test files
```

## Useful commands

| Command | Description |
| --- | --- |
| `npm install` | Install root workspace dependencies |
| `npm run dev` | Start frontend and backend together |
| `npm run client` | Start the frontend only |
| `npm run server` | Start the backend only |
| `npm test` | Run backend-related tests from `tests/` |
| `npm run build --prefix frontend` | Create a production frontend build |
| `npm run preview --prefix frontend` | Serve the production frontend build |

More focused documentation is available in [`docs/setup-guide.md`](docs/setup-guide.md), [`docs/architecture.md`](docs/architecture.md), and [`docs/api-documentation.md`](docs/api-documentation.md).
