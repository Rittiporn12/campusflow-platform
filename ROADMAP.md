# CampusFlow Roadmap

This roadmap describes the planned development phases for CampusFlow.

CampusFlow should be developed gradually in small milestones. Each milestone should be completed, documented, committed, and pushed before moving to the next milestone.

## Milestone 0: Project Context and Agent Guidelines

Status: Completed

Goals:

- Initialize repository
- Add project context
- Add agent guidelines
- Add initial README
- Add changelog

Deliverables:

- `PROJECT_CONTEXT.md`
- `AGENTS.md`
- `README.md`
- `CHANGELOG.md`

Suggested commit messages:

- `chore: initialize repository`
- `docs: add project context and agent guidelines`
- `docs: add initial README and changelog`

---

## Milestone 1: Project Planning Documents

Status: In Progress

Goals:

- Add project plan
- Add roadmap
- Add system overview documentation
- Add module documentation
- Add database design notes
- Add API design notes
- Add security notes
- Add testing plan

Deliverables:

- `PROJECT_PLAN.md`
- `ROADMAP.md`
- `docs/system-overview.md`
- `docs/modules.md`
- `docs/database-design.md`
- `docs/api-design.md`
- `docs/security-notes.md`
- `docs/testing-plan.md`

Suggested commit message:

- `docs: add project plan and roadmap`

---

## Milestone 2: Initial Monorepo Structure

Status: Planned

Goals:

- Create frontend folder
- Create backend folder
- Create shared package folder
- Create docs, postman, and docker folders
- Add placeholder README files
- Add root `.gitignore`

Planned structure:

```txt
campusflow-platform/
├── apps/
│   ├── web/
│   └── api/
├── packages/
│   └── shared/
├── docs/
├── postman/
├── docker/
├── README.md
├── PROJECT_CONTEXT.md
├── PROJECT_PLAN.md
├── ROADMAP.md
├── CHANGELOG.md
├── AGENTS.md
└── .gitignore
```

Suggested commit message:

- `chore: initialize monorepo structure`

---

## Milestone 3: Backend Base Setup

Status: Planned

Goals:

- Set up Node.js backend
- Set up Express
- Set up TypeScript
- Add health check route
- Add basic error handler
- Add 404 handler
- Add environment variable support

Planned route:

```txt
GET /health
```

Suggested commit message:

- `chore: set up Express TypeScript API`

---

## Milestone 4: Database and Prisma Setup

Status: Planned

Goals:

- Install Prisma
- Configure PostgreSQL datasource
- Create initial database schema
- Add first Prisma models
- Add `.env.example`

Planned initial models:

- User
- Role
- Organization
- Department
- Location

Suggested commit message:

- `feat: add Prisma PostgreSQL base schema`

---

## Milestone 5: Authentication Backend

Status: Planned

Goals:

- Add register endpoint
- Add login endpoint
- Add current user endpoint
- Hash passwords with bcrypt
- Add JWT access token
- Add authentication middleware
- Add input validation
- Add safe error responses

Planned routes:

```txt
POST /api/auth/register
POST /api/auth/login
GET /api/auth/me
```

Suggested commit message:

- `feat: add backend authentication module`

---

## Milestone 6: Frontend Base Setup

Status: Planned

Goals:

- Set up React
- Set up TypeScript
- Set up Vite
- Set up React Router
- Add basic layout
- Add placeholder pages
- Add responsive styling

Planned pages:

- Login
- Register
- Dashboard
- Tickets
- Ticket Detail
- Assets
- Bookings
- Not Found

Suggested commit message:

- `chore: set up React TypeScript frontend`

---

## Milestone 7: Frontend Authentication

Status: Planned

Goals:

- Connect login form to backend
- Connect register form to backend
- Store access token
- Add protected routes
- Add logout
- Load current user
- Show loading and error states

Suggested commit message:

- `feat: connect frontend authentication flow`

---

## Milestone 8: Repair Ticket Backend

Status: Planned

Goals:

- Add ticket database models
- Add ticket API routes
- Protect ticket routes
- Add role-based access rules
- Add pagination
- Add filters
- Add comments
- Add status history

Planned routes:

```txt
POST /api/tickets
GET /api/tickets
GET /api/tickets/:id
PATCH /api/tickets/:id/status
PATCH /api/tickets/:id/assign
POST /api/tickets/:id/comments
```

Suggested commit message:

- `feat: add repair ticket backend module`

---

## Milestone 9: Repair Ticket Frontend

Status: Planned

Goals:

- Add ticket list page
- Add create ticket form
- Add ticket detail page
- Add status badges
- Add priority badges
- Add comments section
- Add admin assignment UI
- Add technician status update UI

Suggested commit message:

- `feat: add repair ticket frontend workflow`

---

## Milestone 10: Asset Management

Status: Planned

Goals:

- Add asset database models
- Add asset API routes
- Add asset list UI
- Add asset detail UI
- Link assets to repair tickets
- Show asset maintenance history

Suggested commit message:

- `feat: add asset management module`

---

## Milestone 11: Booking System

Status: Planned

Goals:

- Add booking resource model
- Add booking model
- Add booking approval flow
- Add date overlap validation
- Add booking request UI
- Add admin approval UI

Suggested commit message:

- `feat: add room and equipment booking system`

---

## Milestone 12: Inventory and Spare Parts

Status: Planned

Goals:

- Add inventory item model
- Add inventory transaction model
- Add stock in
- Add stock out
- Add low stock warning
- Link used parts to repair tickets

Suggested commit message:

- `feat: add inventory and spare parts tracking`

---

## Milestone 13: Dashboard and Reports

Status: Planned

Goals:

- Add dashboard summary API
- Add dashboard cards
- Add charts
- Add recent activity section
- Show ticket, asset, inventory, and booking summaries

Suggested commit message:

- `feat: add admin dashboard and reports`

---

## Milestone 14: n8n Automation Integration

Status: Planned

Goals:

- Add n8n webhook environment variable
- Add notification service
- Trigger webhook for important events
- Document n8n workflow
- Avoid blocking main API if webhook fails

Planned triggers:

- New ticket created
- Ticket assigned
- Critical ticket created
- Low stock detected
- Booking approved

Suggested commit message:

- `feat: add n8n notification webhook integration`

---

## Milestone 15: AI-Ready Knowledge Base

Status: Planned

Goals:

- Add knowledge base articles
- Add search feature
- Add admin article management
- Add AI-ready assistant structure
- Document future AI integration

Suggested commit message:

- `feat: add AI-ready knowledge base module`

---

## Milestone 16: Docker and Deployment Documentation

Status: Planned

Goals:

- Add Docker Compose for local development
- Add backend deployment guide
- Add frontend deployment guide
- Add database deployment guide
- Add environment variable documentation

Suggested commit message:

- `chore: add Docker Compose setup`

---

## Milestone 17: QA Documentation and Portfolio Showcase

Status: Planned

Goals:

- Add Postman collection
- Add manual test cases
- Add bug report examples
- Add screenshots
- Add demo accounts
- Polish README for portfolio showcase

Suggested commit message:

- `docs: add QA documentation and portfolio showcase`
