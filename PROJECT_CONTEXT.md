# CampusFlow Project Context

## Project Name

CampusFlow — Smart Campus Operations Platform

## Project Purpose

CampusFlow is a long-term portfolio project designed to showcase full-stack software development, database design, API design, QA testing, automation workflow, dashboard reporting, security awareness, deployment documentation, and future AI integration.

This project should be developed gradually like a real software project. It should not be built all at once.

The goal is to create a large-scale but manageable system that can be shown in a GitHub portfolio and personal website.

## Main Concept

CampusFlow is a smart campus / organization operations platform.

It is designed for a university, organization, office, condo, or internal team that needs to manage daily operational work in one system.

The platform will include several modules:

1. User authentication and role-based access control
2. Repair ticket management
3. Asset management
4. Room and equipment booking
5. Inventory and spare parts management
6. Internal task management
7. Dashboard and reports
8. Notification automation with n8n
9. AI assistant and knowledge base
10. API documentation and QA testing
11. Docker and deployment documentation
12. Security notes and audit logs

## Target Users

The planned user roles are:

### General User

Can create repair requests, view own tickets, book rooms or equipment, and check request status.

### Technician

Can view assigned repair tickets, update ticket status, add work notes, and record used parts.

### Admin

Can manage users, tickets, assets, bookings, inventory, categories, assignments, and system settings.

### Manager

Can view dashboard, reports, ticket performance, asset history, and operational summaries.

## Main Modules

### 1. Authentication and Authorization

The system should support login, register, current user profile, JWT authentication, and role-based access control.

Future roles:

- USER
- TECHNICIAN
- ADMIN
- MANAGER

### 2. Repair Ticket Management

Users can report problems such as air conditioner issues, broken computers, electrical problems, internet issues, or damaged equipment.

Planned features:

- Create repair ticket
- View ticket list
- View ticket detail
- Assign technician
- Update ticket status
- Add comments
- Add status history
- Attach images in the future
- Filter by status, priority, category, and date

Planned ticket statuses:

- PENDING
- ASSIGNED
- IN_PROGRESS
- WAITING_PARTS
- COMPLETED
- CANCELLED

Planned ticket priorities:

- LOW
- MEDIUM
- HIGH
- CRITICAL

### 3. Asset Management

The system should manage organization assets such as computers, projectors, air conditioners, printers, routers, desks, chairs, and lab equipment.

Planned features:

- Add asset
- Edit asset
- View asset detail
- Track asset location
- Link asset to repair tickets
- View maintenance history
- Track warranty information

### 4. Booking System

The system should allow users to book rooms or equipment.

Planned features:

- Create booking request
- Check availability
- Prevent overlapping bookings
- Approve or reject booking
- View booking calendar or list

### 5. Inventory and Spare Parts

The system should manage spare parts and internal stock.

Planned features:

- Add inventory item
- Stock in
- Stock out
- Adjustment
- Low stock warning
- Link used parts to repair tickets

### 6. Dashboard and Reports

The system should provide summary data for Admin and Manager.

Planned dashboard data:

- Total tickets
- Open tickets
- Completed tickets
- Critical tickets
- Tickets by status
- Tickets by category
- Technician workload
- Low stock items
- Assets with most repairs
- Upcoming bookings

### 7. n8n Automation

The system should support webhook-based automation with n8n.

Example workflows:

- New ticket created → notify admin
- Ticket assigned → notify technician
- Critical ticket created → notify manager
- Low stock item detected → notify admin
- Booking approved → notify user

### 8. AI Assistant and Knowledge Base

This module should be added later, after the core system is stable.

Planned features:

- Knowledge base articles
- Search articles
- AI-ready assistant structure
- AI ticket summary
- AI category suggestion
- AI troubleshooting assistant

Do not implement paid AI API integration at the beginning.

## Recommended Tech Stack

### Frontend

- React
- TypeScript
- Vite
- React Router
- Axios
- CSS or Tailwind CSS
- Recharts for dashboard charts

### Backend

- Node.js
- Express
- TypeScript
- Prisma ORM
- PostgreSQL
- JWT authentication
- bcrypt for password hashing

### Database

- PostgreSQL

### Testing

- Manual test cases
- Postman collection
- API test documentation
- Future automated tests

### Automation

- n8n webhook integration

### Deployment

- Frontend: Vercel or Cloudflare Pages
- Backend: Render, Railway, or Fly.io
- Database: Neon, Supabase, or Railway PostgreSQL

### DevOps

- Docker Compose for local development in a later phase

## Development Strategy

This project must be developed in small phases.

Do not build all modules at once.

The recommended development order is:

1. Project documentation
2. Monorepo setup
3. Backend base setup
4. Database and Prisma setup
5. Authentication backend
6. Repair ticket backend
7. Postman and manual API testing for Auth and Ticket APIs
8. Frontend base setup
9. Frontend authentication
10. Repair ticket frontend
11. Basic dashboard overview
12. Asset management
13. Booking system
14. Inventory system
15. Dashboard and reports expansion
16. n8n automation
17. AI-ready knowledge base
18. Docker and deployment
19. QA documentation and portfolio showcase

Current completed production-like module:

- Repair ticket workflow, including backend API, Postman testing, manual API testing documentation, and frontend UI for ticket list, detail, creation, status update, assignment, comments, and dashboard overview.

## Important Rules

- Do not build the whole system in one task.
- Do not add unrelated features.
- Keep tasks small and reviewable.
- Update documentation when project behavior changes.
- Update CHANGELOG.md after each meaningful change.
- Do not commit real secrets.
- Use `.env.example` for environment variable documentation.
- Keep the project suitable for portfolio showcase.
- Prefer maintainable code over fast messy code.
- Security and role permissions are important.
- Manual test steps should be documented for important features.

## Portfolio Goal

This project should show the following skills:

- Full-stack development
- Frontend development
- Backend API development
- Database design
- Authentication and authorization
- Role-based access control
- API documentation
- QA and test case writing
- Postman testing
- Docker and deployment documentation
- n8n automation workflow
- Dashboard and data visualization
- Security awareness
- GitHub workflow
- Long-term project planning
