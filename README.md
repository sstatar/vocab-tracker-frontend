# Vocab Tracker — Frontend

A vocabulary learning app for saving words, tracking progress, and practicing with flashcards. This frontend communicates with a separate Express API.

## Features

- Email/password registration and login with shared session state through React Context.
- Vocabulary library with search, status filters, and add/edit/delete actions.
- Flashcard practice with learning and review modes.
- Dashboard with vocabulary statistics, daily goals, streaks, and recent activity.
- Profile/account settings and light/dark themes.

## Stack

Next.js 16 App Router, React 19, TypeScript, Tailwind CSS 4, SWR, React Hook Form, and next-themes. The interface uses Inter through next/font.

## Local development

Use Node.js 24 LTS and npm. From this frontend repository:

```bash
npm ci
```

Create .env.local with:

```dotenv
NEXT_PUBLIC_API_URL=http://localhost:8000/api
```

Start the backend separately using its own setup instructions, then run:

```bash
npm run dev
```

Open the URL printed in the terminal, normally http://localhost:3000.

## Environment variables

| Variable | Purpose | Default |
| --- | --- | --- |
| NEXT_PUBLIC_API_URL | Backend API base URL, including /api | http://localhost:8000/api |

Use a plain URL without Markdown link syntax. NEXT_PUBLIC_* values are exposed to the browser: do not put secrets in them. Restart the dev server after changing environment files. In production, set the deployed backend URL before building; changing this value requires a new build.

Database credentials and JWT signing secrets belong to the backend. A local backend may still connect to a remote database depending on its configuration.

## Checks and production build

```bash
npx tsc --noEmit
npm run lint
npm run build
npm run start
```

The start command serves production output after a successful build. Building may need internet access to download Inter.

## Project structure

```text
app/                     Routes, root layout, and global styles
components/
  auth/                  Protected route UI
  navigation/            Navbar and user menu
  dashboard/             Progress and activity cards
  library/               Vocabulary cards, filters, and modals
  practice/              Flashcard session UI
  settings/              Profile, account, and theme settings
contexts/                Auth session and theme providers
hooks/                   Shared data hooks and feature/form logic
lib/                     Fetch services and shared response handling
types/                  Shared TypeScript models
```

## State and API responsibilities

- Auth Context shares session state and start/end-session actions. Token presence controls client UI; the backend validates tokens and enforces authorization.
- SWR manages API data and caching. Profile consumers use useProfile; vocabulary and statistics have their own data hooks.
- React Hook Form manages settings drafts. Background profile refreshes do not replace a dirty form.
- Services use Fetch. Shared protected-response handling emits a session-expired event on HTTP 401; AuthProvider clears the session and SWR data.

## Deployment

Deploy the frontend repository to Vercel and configure NEXT_PUBLIC_API_URL for the target environment. Check the deployment commit and build status when verifying a release. Redeploying an older deployment uses that deployment's source version.
