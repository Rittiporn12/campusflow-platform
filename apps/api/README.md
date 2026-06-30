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

## Current Route

GET /health

Expected response:

- success: true
- message: CampusFlow API is healthy.
- data.status: ok

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

npm install

Run development server:

npm run dev

Build project:

npm run build

Start production build:

npm start

Type check:

npm run check

Format Prisma schema:

npm run prisma:format

Generate Prisma Client:

npm run prisma:generate

Run Prisma migration:

npm run prisma:migrate

Open Prisma Studio:

npm run prisma:studio

## Environment Variables

Create `.env` from `.env.example` when needed.

Required variables:

- PORT
- NODE_ENV
- CORS_ORIGIN
- DATABASE_URL

## Current Status

Status: Prisma and PostgreSQL base setup completed

Authentication and business modules have not been added yet.
