# Airbnb clone — backend

Node/Express/MongoDB API for the [airbnb-clone](../airbnb-clone) frontend. This is
phase 2: listings (read) and bookings (create, with server-side pricing and
availability checks). Favorites and profile still live in Firestore for now —
see "What's next" below.

## Stack

- Express 4
- MongoDB + Mongoose
- Firebase Admin (verifies the ID token the frontend already gets from
  `firebase/auth`, so login doesn't have to move to the backend)
- zod for request validation

## 1. Install

```
npm install
```

## 2. Configure

```
cp .env.example .env
```

Then edit `.env`:

- **`MONGODB_URI`** — a MongoDB Atlas connection string. Free tier: create a
  cluster at [mongodb.com/cloud/atlas](https://www.mongodb.com/cloud/atlas),
  add a database user, allow your IP (or `0.0.0.0/0` for development), then
  **Connect → Drivers** and copy the `mongodb+srv://...` string.
- **`CORS_ORIGIN`** — comma-separated frontend origins allowed to call this
  API. Already includes `http://localhost:3000` and the deployed Vercel URL.
- **`FIREBASE_PROJECT_ID` / `FIREBASE_CLIENT_EMAIL` / `FIREBASE_PRIVATE_KEY`**
  — only needed for the booking endpoints (they require login). Firebase
  Console → Project settings → Service accounts → **Generate new private
  key**. That downloads a JSON file with these three fields — copy them into
  `.env`. Keep `\n` inside `FIREBASE_PRIVATE_KEY` escaped, on one line, in
  quotes, exactly as the JSON file has it.

`.env` is gitignored — never commit it.

## 3. Seed the database

Loads the 66 homes + 12 experiences + 12 services the frontend used to keep
in `src/data/*.js`, as MongoDB documents (safe to re-run — it upserts):

```
npm run seed
```

Real photos aren't available outside the frontend bundle (they're local
webpack imports), so seeded listings get placeholder images from
`picsum.photos`. Swap those for real hosted images (Cloudinary/S3) later.

## 4. Run

```
npm run dev     # nodemon, restarts on file changes
npm start       # plain node
```

Starts on `http://localhost:5000` (change with `PORT` in `.env`).

## API

| Method | Route                | Auth | Notes |
| ------ | --------------------- | ---- | ----- |
| GET    | `/api/health`          | no   | `{ ok: true }` |
| GET    | `/api/listings`        | no   | Query: `kind`, `city`, `category`, `search`, `minPrice`, `maxPrice`, `minRating`, `guestFavorite`, `page`, `limit` |
| GET    | `/api/listings/:id`    | no   | `:id` is a Mongo `_id`, or a legacy numeric id with `?kind=home\|experience\|service` |
| POST   | `/api/bookings`        | yes  | Body: `{ kind, listingId, checkIn?, checkOut?, date?, guests }`. Price and availability are computed server-side and never trust the client. |
| GET    | `/api/bookings/mine`   | yes  | This user's bookings, newest first |

Authenticated routes expect `Authorization: Bearer <Firebase ID token>`
(`await auth.currentUser.getIdToken()` on the frontend).

## Connect the frontend

In `airbnb-clone/.env.local` (gitignored, don't commit it):

```
REACT_APP_API_URL=http://localhost:5000/api
```

`src/services/bookings.js` already calls this URL when it's set, and falls
back to its old "not connected" message when it isn't — so leaving this unset
does not change the deployed site's behavior. On Vercel, set the same
variable (pointing at wherever this backend is deployed — Render, Railway,
etc.) under Project Settings → Environment Variables, then redeploy.

## What's next

- Point `src/services/listings.js` at `GET /api/listings` instead of
  Firestore, once this API is deployed and seeded for real.
- Move favorites and profile here too (`/api/favorites`, `/api/users/me`),
  retiring the matching Firestore reads in `src/services/favorites.js` and
  `src/services/profile.js`.
- Payments (Stripe), image upload, reviews, and a host dashboard.
