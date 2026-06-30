# CampusFlow API

This folder contains the backend API for CampusFlow.

## Current Stack

- Node.js
- Express
- TypeScript
- dotenv
- cors

## Planned Stack

- Prisma ORM
- PostgreSQL
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

## Current Route

GET /health

Expected response:

- success: true
- message: CampusFlow API is healthy.
- data.status: ok

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

## Environment Variables

Create `.env` from `.env.example` when needed.

Required variables:

- PORT
- NODE_ENV
- CORS_ORIGIN

## Current Status

Status: Backend base setup completed

Database, Prisma, authentication, and business modules have not been added yet.
