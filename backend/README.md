# Backend — Inngest setup

This file covers how to set up Inngest integration for the backend.

Purpose
- Use Inngest to process `ticket.created` events asynchronously (AI categorization, priority, moderator assignment, notifications).

Environment variables
- `INNGEST_API_KEY`: (required for sending events to Inngest)
- `INNGEST_REGION`: optional (e.g. `us`)
- `GEMINI_KEY`: Google Gemini API key used by AI handlers
- `JWT_SECRET`: JWT signing secret for auth

Files added
- `backend/inngest/client.js` : helper to send events from the server
- `backend/inngest/runner.js` : runner placeholder with guidance for registering handlers
- `backend/controllers/ticket.js` : ticket controller that emits `ticket.created` events

How it works (minimal)
1. When a ticket is created via `POST /api/tickets`, the server saves the ticket to MongoDB and calls `sendEvent('ticket.created', { ticket })`.
2. An Inngest function (cloud or local worker) subscribes to `ticket.created` and performs AI processing, assignments, and notifications.

Local dev steps
1. Set environment variables (PowerShell example):

```powershell
$env:INNGEST_API_KEY = "your_inngest_key"
$env:INNGEST_REGION = "us"
$env:GEMINI_KEY = "your_gemini_key"
$env:JWT_SECRET = "devsecret"
```

2. Install dependencies and run server (from `backend`):

```powershell
cd backend
npm install
npm run start
```

3. (Optional) Run the runner placeholder (prints guidance):

```powershell
npm run inngest:runner
```

Next steps to fully enable background processing
- Author and register Inngest functions in the Inngest dashboard that listen for `ticket.created` and call Google Gemini and other services.
- Or implement a local worker using the Inngest SDK (see `backend/inngest/runner.js` for example snippet).
- Add secrets (`GEMINI_KEY`, mail provider creds) to your environment or secret store.

If you want, I can scaffold the actual handler that calls Google Gemini and assigns moderators — tell me which flows (categorization, priority, assignment, email) you want implemented first.
