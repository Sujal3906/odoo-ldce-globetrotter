# API documentation

All protected endpoints expect `Authorization: Bearer <token>`.

| Method | Endpoint | Purpose |
| --- | --- | --- |
| POST | `/api/auth/signup` | Create an account and return a JWT |
| POST | `/api/auth/login` | Sign in and return a JWT |
| GET/PATCH | `/api/auth/me` | Read or update the current profile |
| GET/POST | `/api/trips` | List or create trips |
| GET/PATCH/DELETE | `/api/trips/:tripId` | Read, update, or delete one trip |
| POST | `/api/trips/:tripId/expenses` | Add a trip expense |
| GET | `/api/discover/destinations?q=lisbon` | Search shared destinations |

### Create a trip

```json
{
  "name": "Sunlit Iberian Escape",
  "startDate": "2026-09-14",
  "endDate": "2026-09-23",
  "budget": 4200,
  "visibility": "Friends"
}
```

