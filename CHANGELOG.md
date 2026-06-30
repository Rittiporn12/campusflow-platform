# Changelog

All notable changes to this project will be documented in this file.

This project follows a simple changelog format to make the development history clear and easy to review.

## [Unreleased]

### Added

- Added initial project repository.
- Added `PROJECT_CONTEXT.md` to document the CampusFlow concept, planned modules, users, tech stack, and development strategy.
- Added `AGENTS.md` to guide future Codex usage and project development rules.
- Added `README.md` with project overview, purpose, modules, tech stack, development strategy, and current status.
- Added Postman local environment setup for CampusFlow API testing.
- Added Postman collection coverage for the Auth API and Ticket API.
- Added manual API testing documentation for the Auth API and Ticket API.
- Covered authentication flow, ticket creation, ticket list and detail, status update, assignment, and comments in API testing documentation.
- Added Vite, React, and TypeScript frontend skeleton inside `apps/web`.
- Added basic frontend project structure.
- Added placeholder routes for Login, Dashboard, Tickets, and Ticket Detail.
- Added basic layout shell.
- Added API base URL environment example.
- Added frontend README setup instructions.
- Updated root `README.md` to reflect the current project status.
- Added Login page UI.
- Connected Login page to the Auth API.
- Stored JWT token after successful login.
- Added frontend auth route protection.
- Protected dashboard and ticket routes.
- Added logout behavior.
- Added current authenticated user integration using `GET /api/auth/me`.
- Displayed basic current user information in the app layout.
- Added ticket list API integration using `GET /api/tickets`.
- Added frontend ticket API helper.
- Displayed real tickets from the backend.
- Added loading, error, and empty states for the ticket list page.
- Displayed basic ticket fields such as title, status, priority, location, and created date when available.
- Kept create ticket, ticket detail, status update, assignment, and comments UI for later milestones.
- Added ticket detail API integration using `GET /api/tickets/:id`.
- Added ticket detail page connected to the backend.
- Displayed real ticket detail data from the backend.
- Added loading, error, and unavailable or not found states for the ticket detail page.
- Displayed basic ticket fields such as title, description, status, priority, location, category, requester, assigned technician, created date, and updated date when available.
- Displayed comments and status logs as read-only when included in the API response.
- Added navigation back to the ticket list.
- Kept create ticket, status update, assignment, and comments form UI for later milestones.
- Added Create Ticket UI on the frontend.
- Integrated ticket category loading using `GET /api/ticket-categories`.
- Integrated ticket creation using `POST /api/tickets`.
- Added form fields for title, description, category, priority, and location when supported by the backend.
- Added frontend validation for required fields.
- Added loading, success, and error states for ticket creation.
- Refreshed the ticket list after successful ticket creation.
- Kept status update, assignment, and comments UI for later milestones.
- Added ticket status update API integration using `PATCH /api/tickets/:id/status`.
- Added a status update section on the ticket detail page.
- Displayed the current ticket status.
- Added status select input and update status button.
- Added loading, success, and error states for status updates.
- Refreshed ticket detail data after successful status update.
- Displayed a clear permission error message when the backend returns `403 Forbidden`.
- Kept assignment UI and comments form UI for later milestones.
- Added ticket assignment API integration using `PATCH /api/tickets/:id/assign`.
- Added an assignment section on the ticket detail page.
- Displayed the current assigned technician.
- Added technicianId input and assign ticket button.
- Added helper text explaining that technicianId can be taken from seed data, database records, or the Postman environment.
- Added loading, success, and error states for assignment.
- Refreshed ticket detail data after successful assignment.
- Displayed a clear permission error message when the backend returns `403 Forbidden`.
- Kept comments form UI for a later milestone.
- Added ticket comments API integration using `POST /api/tickets/:id/comments`.
- Added a comments section on the ticket detail page.
- Displayed existing ticket comments as read-only.
- Added comment textarea and add comment button.
- Added frontend validation for empty comments.
- Added loading, success, and error states for adding comments.
- Refreshed ticket detail data after successful comment creation.
- Cleared the comment textarea after successful submission.
- Displayed a clear permission error message when the backend returns `403 Forbidden`.
- Kept edit comment and delete comment UI for later milestones.

### Changed

- No changes yet.

### Fixed

- No fixes yet.

## [0.0.1] - Initial Planning

### Added

- Initialized the CampusFlow repository.
- Added early project context and documentation foundation.
- Added `PROJECT_PLAN.md` with project goals, target users, modules, development strategy, MVP scope, and portfolio plan.
- Added `ROADMAP.md` with planned development milestones from documentation to deployment and QA showcase.
- Added `docs/system-overview.md` to describe system purpose, workflows, roles, architecture direction, and security direction.
- Added `docs/modules.md` to describe planned modules, responsibilities, priorities, and future expansion ideas.
- Added `docs/database-design.md` to describe planned entities, relationships, MVP schema scope, and future Prisma implementation notes.
- Added `docs/api-design.md` to describe planned API groups, route conventions, authentication strategy, authorization rules, and MVP API scope.
- Added `docs/security-notes.md` to document authentication, authorization, environment variable, file upload, webhook, and API security direction.
- Added `docs/testing-plan.md` to document manual testing, Postman testing, role permission testing, smoke testing, regression testing, and future automated testing.
- Added initial monorepo folder structure with `apps/web`, `apps/api`, `packages/shared`, `postman`, and `docker` placeholders.
- Added root `.gitignore` for dependencies, environment variables, build outputs, logs, OS files, IDE files, temporary files, and uploads.
- Added backend base setup in `apps/api` using Node.js, Express, and TypeScript.
- Added backend health check route at `GET /health`.
- Added backend environment variable example file.
- Added backend 404 and error handling middleware.
- Added Prisma ORM setup in `apps/api`.
- Added PostgreSQL datasource configuration.
- Added initial Prisma schema with `Organization`, `Department`, `Location`, and `User` models.
- Added `UserRole` and `UserStatus` enums.
- Added Prisma Client instance in `apps/api/src/lib/prisma.ts`.
- Added `docker-compose.yml` for local PostgreSQL development.
- Added local PostgreSQL Docker documentation in `docker/README.md`.
- Added initial Prisma migration for the core schema.
- Documented local database setup in `apps/api/README.md`.
- Added seed script for local demo data.
- Added demo organization, departments, locations, and user accounts for Admin, Technician, User, and Manager roles.
- Added `db:seed` script in the API package.
- Added backend authentication module with register, login, and current user routes.
- Added JWT access token support.
- Added bcrypt password hashing.
- Added authentication middleware and basic role middleware.
- Added Zod validation for authentication inputs.
- Added repair ticket database schema with `TicketCategory`, `Ticket`, `TicketComment`, and `TicketStatusLog` models.
- Added `TicketStatus` and `TicketPriority` enums.
- Added demo ticket categories to the seed script.
- Added repair ticket backend API routes.
- Added ticket category list endpoint.
- Added ticket creation endpoint.
- Added ticket list and ticket detail endpoints.
- Added ticket assignment endpoint for admins.
- Added ticket status update endpoint for admins and assigned technicians.
- Added ticket comment endpoint.
- Added role-based ticket access rules.
