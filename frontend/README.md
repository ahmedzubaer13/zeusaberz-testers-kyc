# ZeusaberZ Testers Frontend

A Vite + React frontend for the ZeusaberZ Testers platform.

## Stack
- React + Vite
- React Router
- Supabase Auth
- Cloudflare deployment
- Cloudflare Worker for KYC API
- Cloudflare R2 for private KYC documents

## Local setup

```bash
npm install
cp .env.example .env
npm run dev
```

Set:
- `VITE_SUPABASE_URL`
- `VITE_SUPABASE_PUBLISHABLE_KEY`
- `VITE_KYC_WORKER_URL`

## Current UI
- Landing page
- Signup / email confirmation
- Login
- Tester dashboard
- KYC upload wizard UI
- Responsive mobile layout
- Dark ZeusaberZ-style visual system with orange accent

## Important
The KYC upload UI is currently a frontend prototype. It does not yet upload documents to R2. The next implementation step is to connect it to the authenticated Cloudflare KYC Worker and enforce server-side authorization.
