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
- Docker and deployment documentation
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

## Planned User Roles

| Role       | Description                                                               |
| ---------- | ------------------------------------------------------------------------- |
| User       | Can create repair requests, view own tickets, and create booking requests |
| Technician | Can view assigned repair tickets and update repair progress               |
| Admin      | Can manage users, tickets, assets, bookings, inventory, and system data   |
| Manager    | Can view dashboards, reports, and operational summaries                   |

## Planned Tech Stack

### Frontend

- React
- TypeScript
- Vite
- React Router
- Axios
- CSS or Tailwind CSS
- Recharts

### Backend

- Node.js
- Express
- TypeScript
- Prisma ORM
- PostgreSQL
- JWT authentication
- bcrypt

### Testing

- Manual test cases
- Postman collection
- API testing documentation
- Future automated tests

### Automation

- n8n webhook integration

### Deployment

- Frontend: Vercel or Cloudflare Pages
- Backend: Render, Railway, or Fly.io
- Database: Neon, Supabase, or Railway PostgreSQL

### DevOps

- Docker Compose in a later phase

## Development Strategy

This project will be developed in small phases.

The development order is:

1. Project context and documentation
2. Project planning documents
3. Monorepo structure
4. Backend base setup
5. Database and Prisma setup
6. Authentication backend
7. Frontend base setup
8. Frontend authentication
9. Repair ticket backend
10. Repair ticket frontend
11. Asset management
12. Booking system
13. Inventory system
14. Dashboard and reports
15. n8n automation
16. AI-ready knowledge base
17. Docker and deployment
18. QA documentation and portfolio showcase

## Current Status

Project status: Planning phase

Completed:

- Repository initialized
- Project context documented
- Codex agent guidelines added
- Initial README created
- Initial changelog created
- Project plan added
- Roadmap added
- System overview documentation added
- Module documentation added
- Database design documentation added
- API design documentation added
- Security notes documentation added
- Testing plan documentation added
- Initial monorepo folder structure added
- Prisma setup added
- Initial PostgreSQL schema added

Next planned work:

- Add project planning documents
- Add roadmap documentation
- Add system overview documentation
- Add initial folder structure

## Repository Structure

Current structure:

```txt
campusflow-platform/
├── apps/
│   ├── web/
│   │   └── README.md
│   └── api/
│       ├── prisma/
│       │   └── schema.prisma
│       ├── src/
│       │   ├── config/
│       │   ├── controllers/
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
│   └── testing-plan.md
├── postman/
│   └── README.md
├── docker/
│   └── README.md
├── AGENTS.md
├── PROJECT_CONTEXT.md
├── PROJECT_PLAN.md
├── ROADMAP.md
├── README.md
├── CHANGELOG.md
├── .gitignore
└── .gitkeep
```

The structure will expand later as the project grows.

## Important Notes

This project is for portfolio and learning purposes.

No real production secrets, API keys, passwords, database URLs, or private credentials should be committed to this repository.

Environment variables should be documented using `.env.example` files in later phases.

## Portfolio Goal

CampusFlow should show that the developer can plan, build, document, test, and deploy a realistic full-stack system step by step.

The final project should be suitable for:

- GitHub portfolio
- Personal website showcase
- Job application discussion
- Software Developer portfolio
- QA / Software Tester portfolio
- Full-stack project demonstration
