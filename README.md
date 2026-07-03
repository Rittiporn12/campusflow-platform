# CampusFlow — Smart Campus Operations Platform

CampusFlow is an active full-stack portfolio project that simulates a smart campus or internal operations platform.

It is built to demonstrate practical work across frontend development, backend API design, database modeling, authentication, role-based authorization, QA documentation, Postman testing, and portfolio-ready project documentation.

CampusFlow is intentionally developed in small milestones. It is not presented as a finished enterprise product; it is a growing showcase of clean, maintainable full-stack development.

## Current Project Status

Status: Active development

Current production-like completed areas:

- Authentication flow
- Repair ticket workflow
- Asset management workflow
- Dashboard overview using existing ticket and asset data
- Postman and manual API testing documentation for implemented APIs

Current frontend coverage:

- Login
- Authenticated layout
- Dashboard
- Tickets
- Ticket detail and workflow actions
- Assets
- Asset detail and workflow actions

Planned future work remains intentionally scoped, including booking, inventory, richer reports, automation, deployment documentation, and future AI-ready features.

## Completed Features

### Backend

- Node.js, Express, and TypeScript API
- PostgreSQL database with Prisma ORM
- Prisma migrations and seed data
- JWT authentication
- bcrypt password hashing
- Zod request validation
- Role-based authorization middleware
- Consistent API response and error handling patterns

### Authentication

- Register
- Login
- Current authenticated user
- Frontend token storage
- Protected frontend routes
- Logout behavior

### Ticket Management

- Ticket categories
- Create ticket
- Ticket list
- Ticket detail
- Update ticket status
- Assign technician
- Add ticket comments
- Ticket status history
- Frontend ticket list, detail, create, status, assignment, and comment UI

### Asset Management

- Asset categories
- Create asset
- Asset list
- Asset detail
- Update asset information
- Update asset status
- Archive or retire asset safely without hard delete
- Asset status history
- Frontend asset list, detail, create, update, status, archive, search/filter, and dashboard summary UI

### Dashboard

- Ticket summary cards
- Asset summary cards
- Recent tickets
- Recent assets
- Loading, empty, and error states
- Responsive frontend polish for the main pages

### Testing and Documentation

- Postman local environment
- Postman collection for Auth, Ticket, and Asset APIs
- Manual API testing documentation
- Testing plan with frontend and API checklist coverage
- Changelog and project planning documentation

## Tech Stack

### Frontend

- React
- TypeScript
- Vite
- React Router
- Axios
- CSS

### Backend

- Node.js
- Express
- TypeScript
- Prisma ORM
- PostgreSQL
- JWT
- bcrypt
- Zod

### Testing and Tooling

- Postman
- Manual API testing
- Manual frontend testing
- Docker Compose for local PostgreSQL

## API Features

### Auth API

| Method | Endpoint             | Description                        |
| ------ | -------------------- | ---------------------------------- |
| POST   | `/api/auth/register` | Register a new user                |
| POST   | `/api/auth/login`    | Login and receive JWT token        |
| GET    | `/api/auth/me`       | Get the current authenticated user |

### Ticket API

| Method | Endpoint                    | Description                 |
| ------ | --------------------------- | --------------------------- |
| GET    | `/api/ticket-categories`    | Get ticket categories       |
| POST   | `/api/tickets`              | Create ticket               |
| GET    | `/api/tickets`              | Get ticket list             |
| GET    | `/api/tickets/:id`          | Get ticket detail           |
| PATCH  | `/api/tickets/:id/status`   | Update ticket status        |
| PATCH  | `/api/tickets/:id/assign`   | Assign ticket to technician |
| POST   | `/api/tickets/:id/comments` | Add ticket comment          |

### Asset API

| Method | Endpoint                    | Description                   |
| ------ | --------------------------- | ----------------------------- |
| GET    | `/api/asset-categories`     | Get asset categories          |
| POST   | `/api/assets`               | Create asset                  |
| GET    | `/api/assets`               | Get asset list                |
| GET    | `/api/assets/:id`           | Get asset detail              |
| PATCH  | `/api/assets/:id`           | Update asset information      |
| PATCH  | `/api/assets/:id/status`    | Update asset status           |
| PATCH  | `/api/assets/:id/archive`   | Safely archive or retire asset |

## Demo Accounts

Seed data includes demo accounts for local development and testing.

| Role       | Email                       | Password       |
| ---------- | --------------------------- | -------------- |
| Admin      | `admin@campusflow.dev`      | `Password123!` |
| Technician | `technician@campusflow.dev` | `Password123!` |
| User       | `user@campusflow.dev`       | `Password123!` |
| Manager    | `manager@campusflow.dev`    | `Password123!` |

Do not use these credentials outside local development.

## Repository Structure

```txt
campusflow-platform/
├── apps/
│   ├── api/              # Express, TypeScript, Prisma backend
│   └── web/              # Vite, React, TypeScript frontend
├── docs/                 # Architecture, API, testing, and planning docs
├── postman/              # Postman collection and local environment
├── packages/shared/      # Placeholder for future shared code
├── docker/               # Local database documentation
├── docker-compose.yml    # Local PostgreSQL service
├── PROJECT_CONTEXT.md
├── PROJECT_PLAN.md
├── ROADMAP.md
├── CHANGELOG.md
└── README.md
```

## Local Development

### Backend API

From the backend app:

```bash
cd apps/api
npm install
```

Start PostgreSQL from the repository root:

```bash
docker compose up -d
```

Run Prisma migrations and seed data:

```bash
npx prisma migrate dev
npm run db:seed
```

Start the backend:

```bash
npm run dev
```

Backend URL:

```txt
http://localhost:4000
```

Health check:

```txt
GET http://localhost:4000/health
```

Backend type check:

```bash
npm run check
```

### Frontend Web App

From the frontend app:

```bash
cd apps/web
npm install
npm run dev
```

Frontend URL:

```txt
http://localhost:5173
```

Production build check:

```bash
npm run build
```

### Postman Testing

Postman files are stored in:

```txt
postman/collections/CampusFlow API.postman_collection.json
postman/environments/CampusFlow Local.postman_environment.json
```

The local environment includes variables for API base URL, demo login credentials, auth token, ticket IDs, technician ID, category IDs, and asset IDs.

## Future Work

Planned future milestones:

- Booking system
- Inventory and spare parts tracking
- More dashboard reporting
- Deployment documentation
- n8n notification workflows
- Automated tests
- AI-ready knowledge base and assistant structure

## Portfolio Goal

CampusFlow is designed to show the ability to plan, build, document, test, and iterate on a realistic full-stack application.

The project is suitable for GitHub portfolio review, personal website screenshots, and technical discussion in software developer or QA-focused interviews.
