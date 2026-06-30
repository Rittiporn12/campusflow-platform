# Changelog

All notable changes to this project will be documented in this file.

This project follows a simple changelog format to make the development history clear and easy to review.

## [Unreleased]

### Added

- Added initial project repository.
- Added `PROJECT_CONTEXT.md` to document the CampusFlow concept, planned modules, users, tech stack, and development strategy.
- Added `AGENTS.md` to guide future Codex usage and project development rules.
- Added `README.md` with project overview, purpose, modules, tech stack, development strategy, and current status.

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
