# CYMAK Technologies — Website

Next.js (App Router, TypeScript, Turbopack) site with a custom-built backend:
PostgreSQL + Prisma, custom auth (bcryptjs + jose JWT sessions), image
uploads via sharp + Vercel Blob, and email notifications via Resend.

## What the backend adds

- **`/admin`** — a password-protected dashboard to manage blog posts, portfolio
  projects, and view contact-form leads, without touching code.
- **Blog** (`/blog`) — now reads from Postgres instead of static `.mdx` files.
- **Projects/portfolio** section — now reads from Postgres instead of a
  hardcoded array (falls back to the original static content automatically
  if the database is empty, so the site never looks broken).
- **Contact form** — now saves submissions to the database and emails you a
  notification (via Resend), instead of posting to a third-party service.

## 1. Prerequisites

- Node.js 18+ and npm
- A local PostgreSQL install (`psql` available on your PATH)
- A [Vercel](https://vercel.com) account (for Blob storage — free tier is fine)
- A [Resend](https://resend.com) account (for email — free tier is fine)

## 2. Install dependencies

```bash
npm install
```

`postinstall` automatically runs `prisma generate`. If it fails because of a
network/proxy issue, just run `npx prisma generate` manually afterward.

## 3. Set up your local database

```bash
# create a local database (adjust user/db name as you like)
createdb cymak_dev
```

Copy the env template and fill in your values:

```bash
cp .env.example .env
```

At minimum for local dev, set:

```
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/cymak_dev"
AUTH_SECRET="<run: openssl rand -base64 32>"
```

`BLOB_READ_WRITE_TOKEN` and `RESEND_API_KEY` can stay blank while developing —
image upload and email sending will just log a warning and skip instead of
crashing, but you'll want them before you plan to actually upload images or
receive contact-form emails.

## 4. Run migrations

```bash
npm run db:migrate
```

This creates the `admin_users`, `blog_posts`, `projects`, and
`contact_submissions` tables from `prisma/schema.prisma`.

## 5. Create your admin login

Set `ADMIN_EMAIL`, `ADMIN_PASSWORD`, and `ADMIN_NAME` in `.env`, then:

```bash
npm run db:seed
```

This creates (or updates) one admin user you can log in with at `/admin/login`.
You can remove those three env vars afterward — they're only read by the seed
script, not by the running app.

## 6. (Optional) Seed the original portfolio content

The Projects section falls back to its original hardcoded content
automatically if the database has no rows, so this step isn't required. If
you'd rather have that same content live in the database from the start (so
you can immediately edit/reorder it in `/admin/projects`), run:

```bash
npm run db:seed:projects
```

## 7. Run the dev server

```bash
npm run dev
```

- Public site: http://localhost:3000
- Admin dashboard: http://localhost:3000/admin/login

## Useful commands

| Command | What it does |
|---|---|
| `npm run dev` | Start the dev server (Turbopack) |
| `npm run build` | Production build |
| `npm run db:studio` | Opens Prisma Studio — a visual DB browser |
| `npm run db:migrate` | Create/apply a new migration in dev |
| `npm run db:deploy` | Apply existing migrations (use in production/CI) |
| `npm run db:seed` | Create/update the admin user from `.env` |
| `npm run db:seed:projects` | Seed original portfolio content into the DB |

## Deploying (Vercel)

1. Push this repo to GitHub and import it into Vercel.
2. In your Vercel project, go to **Storage → Create Database → Blob** and
   connect it — this sets `BLOB_READ_WRITE_TOKEN` automatically.
3. Add a Postgres database (Vercel Postgres, Neon, or Supabase all work) and
   set `DATABASE_URL` in your Vercel project's Environment Variables.
4. Add `AUTH_SECRET`, `RESEND_API_KEY`, `RESEND_FROM_EMAIL`, and
   `COMPANY_NOTIFY_EMAIL` as environment variables in Vercel.
5. Set the build command to run migrations before building, e.g. in
   `package.json`'s `build` script or a Vercel "Build Command" override:
   `prisma migrate deploy && next build`.
6. After the first deploy, run `npm run db:seed` once (locally, pointed at
   the production `DATABASE_URL`, or via `vercel env pull` + a one-off script)
   to create your admin login.

## Notes / things worth knowing

- **Tailwind wasn't actually wired up.** The repo had `tailwindcss` installed
  and a `tailwind.config.js`, but `app/globals.css` never included the
  `@tailwind` directives, and there were two conflicting PostCSS configs
  (one for Tailwind v3, one for v4). We removed the conflicting v4 config so
  the build doesn't break, but Tailwind utility classes still won't do
  anything until `@tailwind base; @tailwind components; @tailwind utilities;`
  is added to `globals.css`. The existing site design uses hand-written CSS
  in `<style>` blocks, not Tailwind classes, so nothing changed visually.
  The new `/admin` dashboard also avoids depending on Tailwind for the same
  reason — it uses `app/admin/admin.css`.
- **Auth** is fully custom: bcrypt-hashed passwords, JWT session tokens
  (`jose`) in an httpOnly cookie, checked by `middleware.ts` for every
  `/admin/*` page and `/api/admin/*` route.
- **`prisma.config.ts`** (project root) holds `DATABASE_URL` for the Prisma
  CLI (`migrate`, `studio`, etc.) — Prisma 7 moved this out of
  `schema.prisma`. The running app still connects via the `@prisma/adapter-pg`
  driver adapter in `lib/prisma.ts`; `prisma.config.ts` is only read by CLI
  commands, not by the app itself. Both read `DATABASE_URL` from `.env`, so
  you only ever set it in one place.
- **Images** uploaded through the admin panel are resized (max 1600px wide),
  converted to WebP, and stored in Vercel Blob — originals are never kept.
