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
- TicketCategory
- Ticket
- TicketComment
- TicketStatusLog

## Current Prisma Enums

- UserRole
- UserStatus
- TicketStatus
- TicketPriority

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
- Demo ticket categories

Important:

- These accounts are for local development and portfolio demo only.
- Do not use these passwords in production.
- Do not commit real production passwords or secrets.

## Authentication API

Current authentication routes:

- `POST /api/auth/register`
- `POST /api/auth/login`
- `GET /api/auth/me`

### Register

Use this command to register a new demo user:

    curl -X POST http://localhost:4000/api/auth/register \
      -H "Content-Type: application/json" \
      -d '{"name":"New Demo User","email":"new-user@campusflow.dev","password":"Password123!"}'

Expected result:

- New user is created
- User role is `USER`
- Password is hashed before saving
- Response includes user data and access token

### Login

Use this command to login with a demo admin account:

    curl -X POST http://localhost:4000/api/auth/login \
      -H "Content-Type: application/json" \
      -d '{"email":"admin@campusflow.dev","password":"Password123!"}'

Expected result:

- User logs in successfully
- Response includes user data
- Response includes JWT access token

### Current User

Use this command to get the current authenticated user.

Replace `ACCESS_TOKEN` with the token from the login response.

    curl http://localhost:4000/api/auth/me \
      -H "Authorization: Bearer ACCESS_TOKEN"

Expected result:

- Current user profile is returned
- Organization, department, and location data may be included when available

### Implemented Authentication Features

Current implemented features:

- Register
- Login
- Current user profile
- Password hashing with bcrypt
- JWT access token
- Authentication middleware
- Basic role middleware
- Input validation with Zod
- Safe authentication error responses

### Manual Test Checklist

Use this checklist after changing authentication code:

- Health check route works
- User can register with valid data
- User cannot register with duplicate email
- User cannot register with invalid email
- User cannot register with short password
- User can login with valid email and password
- User cannot login with wrong password
- User cannot login with non-existing email
- Authenticated user can access `/api/auth/me`
- Unauthenticated user cannot access `/api/auth/me`
- Invalid token returns authentication error
