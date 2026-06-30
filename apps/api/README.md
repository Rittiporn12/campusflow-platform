# CampusFlow API

This folder contains the backend API for CampusFlow.

## Current Stack

- Node.js
- Express
- TypeScript
- dotenv
- cors
- Prisma ORM
- PostgreSQL datasource

## Planned Stack

- JWT authentication
- bcrypt
- Zod or another validation library
- Swagger / OpenAPI in a later phase

## Current Features

- Express server setup
- TypeScript configuration
- Environment variable loading
- CORS configuration
- JSON request body support
- Health check route
- 404 middleware
- Error handler middleware
- Prisma setup
- PostgreSQL datasource configuration
- Initial database schema
- Prisma Client instance
- Local PostgreSQL development setup with Docker Compose

## Current Route

```txt
GET /health
```

Expected response:

```txt
success: true
message: CampusFlow API is healthy.
data.status: ok
```

## Current Prisma Models

- Organization
- Department
- Location
- User

## Current Prisma Enums

- UserRole
- UserStatus

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

Start production build:

```bash
npm start
```

Type check:

```bash
npm run check
```

## Prisma Commands

Format Prisma schema:

```bash
npm run prisma:format
```

Generate Prisma Client:

```bash
npm run prisma:generate
```

Run Prisma migration:

```bash
npm run prisma:migrate
```

Open Prisma Studio:

```bash
npm run prisma:studio
```

## Environment Variables

Create `.env` from `.env.example` when needed.

Required variables:

```txt
PORT
NODE_ENV
CORS_ORIGIN
DATABASE_URL
```

Example local `.env`:

```env
PORT=4000
NODE_ENV=development
CORS_ORIGIN=http://localhost:5173

DATABASE_URL="postgresql://postgres:postgres@localhost:5432/campusflow?schema=public"
```

Important:

- Do not commit `.env`.
- Use `.env.example` to document required variables.
- Use local Docker database only for development.

## Local Database Setup

CampusFlow uses PostgreSQL for local development.

Start PostgreSQL from the project root:

```bash
docker compose up -d
```

Check running containers:

```bash
docker ps
```

Then go to the API folder:

```bash
cd apps/api
```

Run Prisma migration:

```bash
npm run prisma:migrate
```

Open Prisma Studio:

```bash
npm run prisma:studio
```

## Health Check

After starting the API server:

```bash
npm run dev
```

Open:

```txt
http://localhost:4000/health
```

Expected result:

```txt
CampusFlow API is healthy.
```

## Current Status

Status: Prisma, PostgreSQL, and local Docker database setup completed.

Authentication and business modules have not been added yet.

## Demo Seed Data

The API includes a seed script for local demo data.

Run seed command:

npm run db:seed

Demo accounts:

| Role       | Email                     | Password     |
| ---------- | ------------------------- | ------------ |
| Admin      | admin@campusflow.dev      | Password123! |
| Technician | technician@campusflow.dev | Password123! |
| User       | user@campusflow.dev       | Password123! |
| Manager    | manager@campusflow.dev    | Password123! |

The seed script also creates:

- Demo organization
- Demo departments
- Demo locations

Important:

- These accounts are for local development and portfolio demo only.
- Do not use these passwords in production.
- Do not commit real production passwords or secrets.
