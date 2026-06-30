# CampusFlow Web App

This folder contains the frontend application for CampusFlow.

## Current Stack

- React
- TypeScript
- Vite
- React Router
- Axios

## Current Status

Status: Frontend base initialized

The current frontend is a minimal foundation only. It includes a basic Vite setup, routing, layout structure, placeholder pages, and API base URL configuration.

Real authentication, protected routes, dashboard features, and ticket management UI will be added in later milestones.

## Local Development

Install dependencies:

```bash
npm install
```

Run development server:

```bash
npm run dev
```

Build project:

```bash
npm run build
```

Type check:

```bash
npm run check
```

## Environment Variables

Create `.env` from `.env.example` when needed.

Required variables:

```txt
VITE_API_BASE_URL
```

Example local value:

```env
VITE_API_BASE_URL=http://localhost:4000
```

## Placeholder Routes

- `/login`
- `/dashboard`
- `/tickets`
- `/tickets/:id`
