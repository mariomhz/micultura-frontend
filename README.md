# MiCultura Frontend

Next.js (App Router) SPA for **MiCultura**, a platform that lists cultural events across Tenerife. Consumes the [backend REST API](https://github.com/SomosDeWeb/pi-25-26-backend-opal).

---

## Tech stack

- **Next.js 16** (App Router, Turbopack) on **React 19**
- **TypeScript** strict mode
- **Tailwind CSS 4** + custom neo-brutalism design system
- **GSAP** for entrance/transition animations
- **React Leaflet** + **react-leaflet-cluster** for the events map
- **FullCalendar** for the calendar view
- **jose** for JWT verification in middleware (Edge runtime)
- **sonner** for toast notifications

---

## Prerequisites

- Node.js 20+
- npm
- Backend running at `http://localhost:8080` (or set `NEXT_PUBLIC_API_URL` to wherever yours lives)

---

## Local setup

```bash
npm install
cp .env.example .env.local
npm run dev
```

The dev server listens on `http://localhost:3000`.

### Environment variables

| Variable                  | Where it runs       | Notes |
|---------------------------|---------------------|-------|
| `NEXT_PUBLIC_API_URL`     | client + server     | Backend base URL. No trailing slash. |
| `NEXT_PUBLIC_USE_MOCKS`   | client              | `true` swaps the events/categories hooks to in-memory mocks (dev convenience). |
| `NEXT_PUBLIC_MAP_API_KEY` | client              | Reserved — Leaflet uses OpenStreetMap tiles by default and needs no key. |
| `JWT_SECRET`              | **server-only**     | Must equal the backend's `APP_JWT_SECRET` byte for byte. Middleware crashes at boot in production without it. |

`NEXT_PUBLIC_*` variables are inlined into the client bundle at build time; never put secrets behind that prefix.

---

## Scripts

```bash
npm run dev      # next dev (with Turbopack)
npm run build    # next build (production)
npm start        # serve the production build
npm run lint     # eslint
```

---

## Project layout

```
src/
├── app/             # App Router routes (events, login, profile, etc.)
├── components/      # Reusable UI (events, calendar, map, layout, auth)
├── context/         # React context providers (auth, etc.)
├── hooks/           # useEvents, useCategories, etc. — talk to the API or mocks
├── lib/             # apiFetch (with refresh-token rotation), accessToken helpers
├── middleware.ts    # Edge middleware: verifies JWT on /profile/** routes
├── mocks/           # Dev-only mock data (lazy-imported, excluded from prod)
├── services/        # auth.ts and other service-layer wrappers
└── types/           # Shared TypeScript types — matches backend DTOs
```

---

## Authentication flow

1. **Login** (`POST /api/auth/login`) — backend returns the access token in the body and sets `mc_refresh` as an HttpOnly cookie.
2. The auth context stores the access token in a non-HttpOnly cookie `mc_access` (so the Edge middleware can read it) plus in-memory.
3. **`apiFetch`** in `lib/api.ts` attaches `Authorization: Bearer <token>`. On a 401 it calls `/api/auth/refresh` (browser sends `mc_refresh` automatically), updates the access token, and retries the original request once. Concurrent 401s share a single refresh promise.
4. **Middleware** (`src/middleware.ts`) verifies the JWT signature with `jose` on every request matching `/profile/**`. Redirects to `/login` on missing/invalid token.

---

## Deploying to Vercel

1. Push to GitHub (already done — repo is `SomosDeWeb/pi-25-26-frontend-opal`).
2. On [vercel.com](https://vercel.com), import the repo as a new project. Vercel auto-detects Next.js — no build-command overrides needed.
3. In **Project Settings → Environment Variables**, add (for the *Production* environment):

   | Key                     | Value                                          |
   |-------------------------|------------------------------------------------|
   | `NEXT_PUBLIC_API_URL`   | `https://<your-render-service>.onrender.com`   |
   | `NEXT_PUBLIC_USE_MOCKS` | `false`                                        |
   | `JWT_SECRET`            | Same value as the backend's `APP_JWT_SECRET`   |

4. Deploy. The first deploy gives you a `https://<project>.vercel.app` URL.
5. Copy that URL back to the backend on Render and set it as `APP_CORS_ALLOWED_ORIGINS` (otherwise the browser will block every API call as CORS-denied).

### Custom domains

Add them in Vercel under **Project → Settings → Domains**. After provisioning, append the new domain to `APP_CORS_ALLOWED_ORIGINS` on Render (comma-separated).
