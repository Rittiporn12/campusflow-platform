# CampusFlow Web App

This folder contains the frontend application for CampusFlow.

## Current Stack

- React
- TypeScript
- Vite
- React Router
- Axios

## Current Status

Status: Frontend in active development

The frontend base is initialized and several core workflow screens are partially implemented. The app currently includes the Vite, React, and TypeScript setup, routing, layout structure, API base URL configuration, authentication UI, protected route handling, current user display, and early ticket workflow pages.

Implemented frontend work includes:

- Login page UI
- Login API integration
- JWT token storage for local development
- Protected dashboard and ticket routes
- Logout behavior
- Current authenticated user integration
- Ticket list UI
- Ticket detail UI
- Create ticket UI
- Ticket status update UI
- Ticket assignment UI

The frontend is not complete yet. Dashboard features, ticket comments UI, broader ticket workflow polish, role-based UI behavior, and future modules will be added in later milestones.

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

## Available Routes

- `/login`
- `/dashboard`
- `/tickets`
- `/tickets/:id`
