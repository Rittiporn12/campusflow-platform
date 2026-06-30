# AGENTS.md

## Project Identity

This repository contains CampusFlow — Smart Campus Operations Platform.

CampusFlow is a long-term portfolio project for building a smart campus / organization operations system.

The project is designed to demonstrate:

- Full-stack development
- API design
- Database design
- Authentication and authorization
- Role-based access control
- QA testing
- Postman testing
- Dashboard reporting
- n8n automation
- Security awareness
- Deployment documentation
- Future AI assistant integration

## Main Project Context

Before making changes, read:

- PROJECT_CONTEXT.md
- README.md if it exists
- CHANGELOG.md if it exists
- Relevant files in the docs folder if they exist

The system should be built gradually in small phases.

Do not implement the whole platform at once.

## Development Rules

- Keep every change small and focused.
- Do not create unrelated features.
- Do not rewrite the entire project unless explicitly requested.
- Do not delete existing files unless there is a clear reason.
- Prefer simple, readable, maintainable code.
- Use TypeScript for frontend and backend.
- Keep frontend, backend, database, documentation, tests, and automation files organized.
- Update documentation when behavior or structure changes.
- Update CHANGELOG.md after meaningful changes.
- Stop after completing the requested task.
- Always summarize changed files and recommended next steps.

## Planned Tech Stack

### Frontend

- React
- TypeScript
- Vite
- React Router
- Axios

### Backend

- Node.js
- Express
- TypeScript
- Prisma ORM
- PostgreSQL

### Authentication

- JWT access token
- Refresh token in a later phase
- bcrypt for password hashing
- Role-based access control

### Testing

- Manual test cases
- Postman collection
- Future automated tests

### Automation

- n8n webhook integration in a later phase

### Deployment

- Frontend: Vercel or Cloudflare Pages
- Backend: Render, Railway, or Fly.io
- Database: Neon, Supabase, or Railway PostgreSQL

## Git Workflow Rules

Use small branches for each task.

Recommended branch names:

- docs/project-context
- docs/project-planning
- chore/init-monorepo
- chore/api-base-setup
- chore/web-base-setup
- feat/auth-backend
- feat/auth-frontend
- feat/ticket-backend
- feat/ticket-frontend
- feat/asset-management
- feat/booking-system
- feat/inventory-module
- feat/admin-dashboard
- feat/n8n-notifications
- feat/knowledge-base
- chore/docker-setup
- docs/deployment-guide
- test/postman-collection

## Commit Message Rules

Use clear commit messages.

Recommended format:

- docs: add project context
- docs: add initial project planning
- chore: initialize monorepo structure
- chore: set up Express TypeScript API
- chore: set up React TypeScript frontend
- feat: add authentication backend
- feat: add frontend authentication flow
- feat: add repair ticket API
- feat: add repair ticket UI
- feat: add asset management module
- feat: add booking system
- feat: add inventory tracking
- feat: add dashboard reports
- feat: add n8n webhook integration
- test: add Postman collection
- docs: update README showcase
- fix: handle invalid login credentials

## Security Rules

- Never commit real `.env` files.
- Never commit real passwords, API keys, tokens, database URLs, or secrets.
- Use `.env.example` to document environment variables.
- Hash passwords with bcrypt.
- Validate user input.
- Protect private routes.
- Enforce role-based access control on the backend.
- Do not rely only on frontend permission checks.
- Avoid exposing stack traces in production responses.
- Avoid logging sensitive data.
- Add rate limiting in a later phase.
- Add audit logs in a later phase.

## Authorization Rules

Backend authorization is required.

Expected behavior:

- General users can only view and manage their own tickets.
- Technicians can view assigned tickets.
- Admins can manage all tickets, users, assets, bookings, and inventory.
- Managers can view reports and dashboards.
- Users must not access data from other organizations if multi-tenant support is added later.

## Documentation Rules

Documentation is part of the project.

Update documentation when adding or changing:

- Features
- API routes
- Database models
- Environment variables
- Setup steps
- Testing steps
- Deployment steps
- Security behavior

Important documentation files:

- README.md
- PROJECT_CONTEXT.md
- PROJECT_PLAN.md
- ROADMAP.md
- CHANGELOG.md
- docs/system-overview.md
- docs/modules.md
- docs/database-design.md
- docs/api-design.md
- docs/security-notes.md
- docs/testing-plan.md

## Testing Rules

For important features, include manual test steps.

Testing should cover:

- Happy path
- Invalid input
- Unauthorized access
- Forbidden access
- Not found cases
- Role permission cases
- API response format
- Error handling

Postman collections should be added in a later phase.

Automated tests can be added after the MVP is stable.

## Review Checklist

Before considering a task complete, check:

- Does the change match the requested scope?
- Did it avoid unrelated features?
- Does the project still run?
- Are environment variables documented?
- Are secrets excluded?
- Are API routes protected correctly?
- Is backend authorization enforced?
- Are docs updated?
- Is CHANGELOG.md updated when needed?
- Are manual test steps included when relevant?
- Is the code readable and maintainable?

## Important Instruction for Codex

When working on this repository:

1. Read PROJECT_CONTEXT.md first.
2. Follow this AGENTS.md file.
3. Work only on the requested task.
4. Do not build future milestones early.
5. Do not make large unrelated changes.
6. Explain the plan before editing.
7. Summarize changed files after editing.
8. Suggest a commit message.
9. Stop after the requested task is complete.
