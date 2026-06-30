# CampusFlow System Overview

## Overview

CampusFlow is a smart campus and organization operations platform designed to manage daily internal workflows in one centralized system.

The platform is planned as a long-term full-stack portfolio project. It will start with the core system first, then gradually expand into connected modules such as repair tickets, asset management, booking, inventory, dashboard reporting, automation, and AI-ready knowledge base.

The project should be developed step by step with clear documentation, small commits, and realistic software development workflow.

## System Purpose

CampusFlow is designed to solve common operational problems in universities, offices, condos, and organizations.

Common problems include:

- Repair requests are reported through chat, paper, or informal messages.
- Admins cannot easily track repair status.
- Technicians do not have a clear assigned task list.
- Assets do not have repair history.
- Room and equipment bookings may overlap.
- Inventory and spare parts are difficult to track.
- Managers do not have clear dashboards or reports.
- Notifications are often manual.
- Support knowledge is scattered.

CampusFlow combines these workflows into one organized platform.

## High-Level Concept

The system will include these major areas:

1. User management
2. Authentication and role-based access control
3. Repair ticket workflow
4. Asset management
5. Booking management
6. Inventory and spare parts tracking
7. Dashboard and reports
8. n8n automation
9. AI-ready knowledge base
10. Testing and documentation
11. Security and audit logs
12. Deployment documentation

## Planned User Roles

### User

A general user can create repair tickets, check ticket status, create booking requests, and view their own activity.

Example users:

- Student
- Employee
- Resident
- Staff member

### Technician

A technician can view assigned repair tickets, update repair progress, add work notes, and record used parts.

Example technicians:

- IT support
- Maintenance staff
- Electrician
- Air conditioner technician

### Admin

An admin can manage system data, users, tickets, assignments, assets, bookings, inventory, and categories.

### Manager

A manager can view dashboards, reports, performance summaries, ticket trends, and operational data.

## Main Workflow: Repair Ticket

Example repair ticket workflow:

1. User creates repair ticket.
2. System saves ticket as PENDING.
3. Admin reviews ticket.
4. Admin assigns technician.
5. Ticket status changes to ASSIGNED.
6. Technician starts work.
7. Ticket status changes to IN_PROGRESS.
8. Technician adds comments or used parts.
9. Technician completes work.
10. Ticket status changes to COMPLETED.
11. User and admin can review ticket history.

## Main Workflow: Asset Maintenance

Example asset workflow:

1. Admin creates asset record.
2. Asset is assigned to a location.
3. User reports a problem related to the asset.
4. Ticket is linked to the asset.
5. Technician repairs the asset.
6. Repair history is saved.
7. Manager can view asset maintenance history.

## Main Workflow: Booking

Example booking workflow:

1. User selects a room or equipment.
2. User creates booking request.
3. System checks date and time availability.
4. Admin approves or rejects the request.
5. User sees booking status.

## Main Workflow: Inventory

Example inventory workflow:

1. Admin adds inventory item.
2. Stock quantity is recorded.
3. Technician uses spare part in repair ticket.
4. System creates stock out transaction.
5. Inventory quantity decreases.
6. Low stock warning appears when quantity is below threshold.

## Architecture Direction

CampusFlow will start as a modular monolith.

This means the project will use one frontend application, one backend API, and one database, but the code will be organized by modules.

Planned structure later:

- apps/web
- apps/api
- packages/shared
- docs
- postman
- docker

## Why Modular Monolith First

A modular monolith is suitable for this portfolio project because:

- It is easier to build and maintain at the beginning.
- It avoids unnecessary complexity.
- It still allows clean module separation.
- It can be explained clearly in a portfolio.
- It can be refactored into services later if needed.

Microservices, Kubernetes, and advanced distributed systems are out of scope for the early phase.

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

### Testing

- Manual test cases
- Postman collection
- Future automated testing

### Automation

- n8n webhook integration

### Deployment

- Frontend deployment
- Backend deployment
- Database deployment
- Environment variable documentation

## Security Direction

Security will be considered from the beginning.

Important security rules:

- Passwords must be hashed.
- JWT secrets must not be committed.
- Real `.env` files must not be committed.
- Backend routes must enforce authorization.
- Frontend checks are not enough for security.
- Users must not access data they do not own.
- Admin-only actions must be protected.
- Sensitive errors should not be exposed in production.

## Project Development Style

This project should be developed like a real software project.

Each milestone should include:

- Clear scope
- Small focused changes
- Documentation updates
- Changelog updates
- Meaningful commit message
- Manual test steps when relevant

The project should not be built all at once.
