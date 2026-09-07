# CSX4107 Authentication Assignment

Full-stack authentication using Next.js (backend) + React/Vite (frontend) with JWT cookie-based auth.

## How it works

- `POST /api/auth/login` — validates credentials, signs a JWT, sets it as an **HttpOnly cookie**
- `GET /api/auth/logout` — clears the cookie by setting `maxAge: 0`
- `GET /api/me` — reads the cookie, verifies the JWT, returns the user
- Frontend stores auth state in React Context (`UserContext`), auto-checks `/api/me` on load

## Tech Stack

| Part | Tech |
|---|---|
| Backend | Next.js route handlers, `jsonwebtoken`, `bcrypt`, MongoDB |
| Frontend | React + Vite, React Router, Material UI |
| Auth | JWT stored in HttpOnly cookie |

## Setup

### Backend (`my-next-backend-02/`)
```bash
cd my-next-backend-02
npm install
cp .env.example .env.local   # fill in your values
npm run dev                  # runs on :3000
```

`.env.local` needs:
```
MONGODB_URI=mongodb+srv://...
DB_NAME=csx4107_item_crud
JWT_SECRET=your_secret_key
ADMIN_USER=admin@test.com
ADMIN_PASS=admin123
```

### Frontend (`connect_CRUD/`)
```bash
cd connect_CRUD
npm install
npm run dev    # runs on :5173
```

## Authentication flow

1. User enters email + password on `/login`
2. Frontend calls `POST /api/auth/login` with `credentials: "include"`
3. Backend validates, issues JWT, sets `HttpOnly` cookie `token`
4. On every page load, frontend calls `GET /api/me` to restore session
5. Clicking Logout calls `GET /api/auth/logout` which clears the cookie

## Submission links

- Repository: `https://github.com/Geordie-oG/Authentication`
- Backend: `https://github.com/Geordie-oG/Authentication/tree/main/my-next-backend-02`
- Frontend: `https://github.com/Geordie-oG/Authentication/tree/main/connect_CRUD`
- Screenshots: `https://github.com/Geordie-oG/Authentication/tree/main/screenshots`
