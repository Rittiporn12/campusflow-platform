# CampusFlow — Smart Campus Operations Platform

CampusFlow is a long-term full-stack portfolio project designed to simulate a smart campus or organization operations platform.

The system is planned to manage repair tickets, assets, room and equipment bookings, inventory, internal tasks, dashboards, automation workflows, API documentation, QA testing, deployment documentation, security notes, and future AI assistant integration.

This project is intentionally developed step by step like a real software project.  
The goal is not to finish everything in one day, but to build a clean, maintainable, and well-documented system over time.

## Project Purpose

CampusFlow is created as a portfolio showcase project to demonstrate practical software development skills across multiple areas:

- Full-stack web development
- Frontend development
- Backend API development
- Database design
- Authentication and authorization
- Role-based access control
- QA documentation
- Postman API testing
- Dashboard and reporting
- n8n automation workflow
- Security awareness
- Docker-based local development
- Deployment documentation
- Future AI assistant integration

## Main System Modules

The planned modules include:

1. Authentication and role-based access control
2. Repair ticket management
3. Asset management
4. Room and equipment booking
5. Inventory and spare parts management
6. Internal task management
7. Dashboard and reports
8. n8n notification automation
9. AI-ready knowledge base and assistant
10. API documentation
11. QA and testing documentation
12. Docker and deployment documentation
13. Security notes and audit logs

## User Roles

| Role       | Description                                                               |
| ---------- | ------------------------------------------------------------------------- |
| User       | Can create repair requests, view own tickets, and create booking requests |
| Technician | Can view assigned repair tickets and update repair progress               |
| Admin      | Can manage users, tickets, assets, bookings, inventory, and system data   |
| Manager    | Can view dashboards, reports, and operational summaries                   |

## Tech Stack

### Frontend

Planned frontend stack:

- React
- TypeScript
- Vite
- React Router
- Axios
- CSS or Tailwind CSS
- Recharts

### Backend

Current backend stack:

- Node.js
- Express
- TypeScript
- Prisma ORM
- PostgreSQL
- JWT authentication
- bcrypt
- Zod validation

### Database

- PostgreSQL
- Prisma ORM
- Prisma migrations
- Seed data for demo users and ticket categories

### Testing and Documentation

- Manual API test documentation
- Postman environment
- Postman collection
- API testing documentation
- Future automated tests

### Automation

Planned automation:

- n8n webhook integration
- Notification workflows

### Local Development

- Docker Compose for local PostgreSQL
- Environment variables documented with `.env.example`

### Deployment

Planned deployment options:

- Frontend: Vercel or Cloudflare Pages
- Backend: Render, Railway, or Fly.io
- Database: Neon, Supabase, or Railway PostgreSQL

## Development Strategy

This project is developed in small milestones.

Completed development order:

1. Project context and documentation
2. Project planning documents
3. Monorepo structure
4. Backend base setup
5. PostgreSQL and Prisma setup
6. Authentication backend
7. Repair ticket database schema
8. Repair ticket backend API
9. Postman environment setup
10. Postman collection for Auth API and Ticket API
11. Manual API testing documentation

Next planned milestones:

1. Frontend base setup
2. Frontend authentication UI
3. Frontend ticket pages
4. Asset management
5. Booking system
6. Inventory system
7. Dashboard and reports
8. n8n automation
9. AI-ready knowledge base
10. Docker and deployment documentation
11. QA documentation improvements
12. Portfolio showcase preparation

## Current Status

Project status: Active development

Completed:

- Repository initialized
- Project context documented
- Codex agent guidelines added
- README created
- Changelog created
- Project plan added
- Roadmap added
- System overview documentation added
- Module documentation added
- Database design documentation added
- API design documentation added
- Security notes documentation added
- Testing plan documentation added
- Manual API testing documentation added
- Initial monorepo folder structure added
- Backend base setup added
- Express and TypeScript API setup added
- Health check endpoint added
- Error handling middleware added
- Not found middleware added
- Prisma setup added
- Prisma v7 configuration added
- PostgreSQL schema added
- Local PostgreSQL Docker Compose setup added
- Prisma migration added
- Demo seed data script added
- Demo users, organization, departments, locations, and ticket categories added
- Authentication backend added
- Register, login, and current user API routes added
- JWT authentication added
- bcrypt password hashing added
- Zod request validation added
- Repair ticket database schema added
- Repair ticket backend API added
- Ticket category, creation, list, detail, assignment, status update, and comment routes added
- Postman local environment added
- Postman collection for Auth API and Ticket API added
- Manual API test cases for Auth API and Ticket API added

Current milestone:

- Frontend base setup

Next planned work:

- Initialize the frontend application inside `apps/web`
- Add React + TypeScript + Vite frontend structure
- Add placeholder routes for Login, Dashboard, Tickets, and Ticket Detail
- Add frontend API base URL environment example
- Add basic frontend README instructions

## API Features Completed

### Authentication API

| Method | Endpoint             | Description                        |
| ------ | -------------------- | ---------------------------------- |
| POST   | `/api/auth/register` | Register a new user                |
| POST   | `/api/auth/login`    | Login and receive JWT token        |
| GET    | `/api/auth/me`       | Get the current authenticated user |

### Ticket API

| Method | Endpoint                    | Description                 |
| ------ | --------------------------- | --------------------------- |
| GET    | `/api/ticket-categories`    | Get ticket categories       |
| POST   | `/api/tickets`              | Create a new ticket         |
| GET    | `/api/tickets`              | Get ticket list             |
| GET    | `/api/tickets/:id`          | Get ticket detail           |
| PATCH  | `/api/tickets/:id/status`   | Update ticket status        |
| PATCH  | `/api/tickets/:id/assign`   | Assign ticket to technician |
| POST   | `/api/tickets/:id/comments` | Add ticket comment          |

## Demo Accounts

Seed data includes the following demo accounts:

| Role       | Email                       | Password       |
| ---------- | --------------------------- | -------------- |
| Admin      | `admin@campusflow.dev`      | `Password123!` |
| Technician | `technician@campusflow.dev` | `Password123!` |
| User       | `user@campusflow.dev`       | `Password123!` |
| Manager    | `manager@campusflow.dev`    | `Password123!` |

These accounts are for local development and testing only.

## Repository Structure

Current structure:

```txt
campusflow-platform/
├── apps/
│   ├── web/
│   │   └── README.md
│   └── api/
│       ├── prisma/
│       │   ├── migrations/
│       │   ├── schema.prisma
│       │   └── seed.ts
│       ├── src/
│       │   ├── config/
│       │   ├── lib/
│       │   │   └── prisma.ts
│       │   ├── middlewares/
│       │   ├── modules/
│       │   ├── routes/
│       │   ├── utils/
│       │   ├── app.ts
│       │   └── server.ts
│       ├── .env.example
│       ├── package.json
│       ├── package-lock.json
│       ├── prisma.config.ts
│       ├── tsconfig.json
│       └── README.md
├── packages/
│   └── shared/
│       └── README.md
├── docs/
│   ├── system-overview.md
│   ├── modules.md
│   ├── database-design.md
│   ├── api-design.md
│   ├── security-notes.md
│   ├── testing-plan.md
│   └── manual-api-testing.md
├── postman/
│   ├── collections/
│   │   └── CampusFlow API.postman_collection.json
│   ├── environments/
│   │   └── CampusFlow Local.postman_environment.json
│   └── README.md
├── docker/
│   └── README.md
├── docker-compose.yml
├── AGENTS.md
├── PROJECT_CONTEXT.md
├── PROJECT_PLAN.md
├── ROADMAP.md
├── README.md
├── CHANGELOG.md
├── .gitignore
└── .gitkeep
```

The structure will expand as the frontend, additional modules, automation, deployment, and testing assets are added.

## Local Development

### Backend API

Go to the backend app:

```bash
cd apps/api
```

Install dependencies:

```bash
npm install
```

Start local PostgreSQL from the repository root:

```bash
docker compose up -d
```

Run Prisma migration:

```bash
npx prisma migrate dev
```

Run seed data:

```bash
npm run seed
```

Start the backend development server:

```bash
npm run dev
```

Local backend API:

```txt
http://localhost:4000
```

Health check:

```txt
GET http://localhost:4000/health
```

### Postman Testing

Postman resources are stored in:

```txt
postman/
```

Included files:

```txt
postman/collections/CampusFlow API.postman_collection.json
postman/environments/CampusFlow Local.postman_environment.json
```

The Postman environment includes variables such as:

- `baseUrl`
- `authToken`
- `ticketId`
- `categoryId`
- `technicianId`
- `adminEmail`
- `technicianEmail`
- `userEmail`
- `managerEmail`
- `defaultPassword`

## Important Notes

This project is for portfolio and learning purposes.

No real production secrets, API keys, passwords, database URLs, or private credentials should be committed to this repository.

Environment variables should be documented using `.env.example` files.

Demo credentials are only for local development and testing.

## Portfolio Goal

CampusFlow should show that the developer can plan, build, document, test, and deploy a realistic full-stack system step by step.

The final project should be suitable for:

- GitHub portfolio
- Personal website showcase
- Job application discussion
- Software Developer portfolio
- QA / Software Tester portfolio
- Full-stack project demonstration
