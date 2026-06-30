# CampusFlow Project Plan

## Project Name

CampusFlow — Smart Campus Operations Platform

## Project Overview

CampusFlow is a long-term full-stack portfolio project designed to simulate a smart campus or organization operations platform.

The system will help users, technicians, admins, and managers handle daily operational work such as repair requests, asset management, room and equipment bookings, inventory tracking, internal tasks, notifications, dashboards, reports, and future AI-assisted support.

This project will be built gradually in small phases to demonstrate realistic software development workflow, documentation, testing, security awareness, and maintainable system design.

## Project Goals

The main goals of this project are:

1. Build a realistic full-stack system for portfolio showcase.
2. Practice frontend, backend, database, API, testing, automation, and deployment.
3. Design a system with multiple connected modules.
4. Show understanding of authentication and role-based authorization.
5. Document the project like a real software project.
6. Create a project that can be presented on GitHub and a personal portfolio website.
7. Build gradually through small commits and clear milestones.

## Problem Statement

Organizations such as universities, offices, condos, and internal teams often need to manage many operational tasks manually.

Common problems include:

- Repair requests are reported through chat or paper forms.
- Technicians do not have a clear assigned task list.
- Admins cannot easily track ticket status.
- Assets do not have maintenance history.
- Room and equipment bookings may overlap.
- Inventory and spare parts are hard to track.
- Managers do not have dashboards or reports.
- Notifications are manual and inconsistent.
- Documentation and support knowledge are scattered.

CampusFlow is designed to solve these problems by combining multiple operational modules into one centralized platform.

## Target Users

### General User

General users can create repair requests, view their own tickets, create booking requests, and check request status.

Example users:

- Students
- Employees
- Residents
- Staff members

### Technician

Technicians can view assigned repair tickets, update repair progress, add comments, and record used spare parts.

Example users:

- IT support
- Maintenance staff
- Electricians
- Air conditioner technicians

### Admin

Admins can manage users, tickets, assets, bookings, inventory, categories, assignments, and system settings.

Example users:

- Office admin
- Campus staff
- Operations team

### Manager

Managers can view dashboards, reports, workload summaries, ticket performance, and asset maintenance trends.

Example users:

- Department manager
- Operations manager
- Facility manager

## Main System Modules

### 1. Authentication and Role-Based Access Control

This module controls user login, registration, current user profile, and permission checks.

Planned features:

- Register
- Login
- Logout
- Current user profile
- JWT authentication
- Password hashing
- Role-based access control
- Protected API routes

Planned roles:

- USER
- TECHNICIAN
- ADMIN
- MANAGER

### 2. Repair Ticket Management

This is the core module of the system.

Users can report problems and track repair progress.

Planned features:

- Create repair ticket
- View own tickets
- View all tickets for admin
- View assigned tickets for technician
- Assign technician
- Update ticket status
- Add ticket comments
- Track status history
- Filter and search tickets
- Future image attachments

Ticket statuses:

- PENDING
- ASSIGNED
- IN_PROGRESS
- WAITING_PARTS
- COMPLETED
- CANCELLED

Ticket priorities:

- LOW
- MEDIUM
- HIGH
- CRITICAL

### 3. Asset Management

This module manages organization equipment and asset history.

Planned features:

- Add asset
- Edit asset
- View asset detail
- Categorize assets
- Track asset location
- Link assets to repair tickets
- View maintenance history
- Track warranty date

Example assets:

- Computer
- Projector
- Air conditioner
- Printer
- Router
- Lab equipment
- Desk
- Chair

### 4. Booking System

This module manages room and equipment booking.

Planned features:

- Create booking request
- View booking list
- Check availability
- Prevent overlapping bookings
- Approve booking
- Reject booking
- Cancel booking
- View booking status

Example resources:

- Meeting room
- Computer lab
- Projector
- Camera
- Notebook

### 5. Inventory and Spare Parts

This module manages internal stock and spare parts.

Planned features:

- Add inventory item
- Stock in
- Stock out
- Stock adjustment
- Low stock warning
- Link used parts to repair tickets
- Inventory transaction history

Example items:

- LAN cable
- Mouse
- Keyboard
- Light bulb
- Printer ink
- Air conditioner part

### 6. Internal Task Management

This module can be added after the core system is stable.

Planned features:

- Create internal task
- Assign task
- Set deadline
- Set priority
- Add comments
- Track task status

### 7. Dashboard and Reports

This module provides visual summaries for admins and managers.

Planned data:

- Total tickets
- Open tickets
- Completed tickets
- Critical tickets
- Tickets by status
- Tickets by category
- Technician workload
- Assets with most repairs
- Low stock items
- Upcoming bookings

### 8. n8n Automation

This module connects the system with n8n using webhook automation.

Planned automation examples:

- New ticket created → notify admin
- Ticket assigned → notify technician
- Critical ticket created → notify manager
- Low stock detected → notify admin
- Booking approved → notify user

### 9. AI Assistant and Knowledge Base

This module will be added later after the core system is stable.

Planned features:

- Knowledge base articles
- Article search
- AI-ready assistant structure
- AI ticket summary
- AI category suggestion
- AI troubleshooting support

Paid AI API integration should not be implemented at the beginning.

## Recommended Tech Stack

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
- JWT
- bcrypt

### Database

- PostgreSQL

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

CampusFlow will be built in small milestones.

Each milestone should have:

- Clear scope
- Small file changes
- Documentation update
- Changelog update
- Commit message
- Manual test steps when relevant

The project should not be built all at once.

## Out of Scope for Early Phase

The following features should not be implemented at the beginning:

- Payment system
- Real production user data
- Real AI paid API integration
- Complex microservices
- Kubernetes
- Advanced analytics
- Mobile application
- Multi-tenant production architecture
- Real organization deployment

These may be considered later after the MVP is stable.

## MVP Scope

The first MVP should focus on:

1. Authentication
2. Role-based access
3. Repair ticket backend
4. Repair ticket frontend
5. Basic dashboard
6. Basic documentation
7. Postman testing

## Success Criteria

The project is considered successful when:

- Users can register and log in.
- Users can create repair tickets.
- Admin can view and manage tickets.
- Admin can assign tickets to technicians.
- Technicians can update assigned tickets.
- Role permissions are enforced on the backend.
- Dashboard shows useful summaries.
- API documentation exists.
- Manual test cases exist.
- Project can be shown clearly on GitHub and portfolio website.

## Portfolio Presentation Plan

The final GitHub README should include:

- Project overview
- Live demo
- Demo accounts
- Main features
- User roles
- Screenshots
- Tech stack
- Architecture overview
- Database design
- API documentation
- Postman collection
- Manual test cases
- Security notes
- n8n automation
- Deployment guide
- Roadmap
