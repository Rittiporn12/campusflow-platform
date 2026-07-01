# CampusFlow Modules

This document explains the planned modules for CampusFlow.

CampusFlow will be developed gradually. Not every module should be implemented at the beginning. The first working version should focus on authentication and repair ticket management before expanding to larger modules.

## Module 1: Authentication and Authorization

### Purpose

This module controls user identity and system access.

### Planned Features

- User registration
- User login
- Logout
- Current user profile
- Password hashing
- JWT access token
- Refresh token in a later phase
- Protected routes
- Role-based access control

### Planned Roles

- USER
- TECHNICIAN
- ADMIN
- MANAGER

### Important Rules

- Passwords must never be stored as plain text.
- Backend must enforce authorization.
- Frontend permission checks are only for UI control, not real security.
- Users should not access data that does not belong to them.

## Module 2: Repair Ticket Management

### Purpose

This is the core module of the system.

Users can report problems, admins can assign technicians, and technicians can update repair progress.

### Planned Features

- Create repair ticket
- View ticket list
- View ticket detail
- Assign technician
- Update ticket status
- Add ticket comments
- Add status history
- Filter tickets
- Search tickets
- Future image attachments

### Planned Ticket Statuses

- PENDING
- ASSIGNED
- IN_PROGRESS
- WAITING_PARTS
- COMPLETED
- CANCELLED

### Planned Ticket Priorities

- LOW
- MEDIUM
- HIGH
- CRITICAL

### Example Ticket Categories

- IT
- Electrical
- Air Conditioner
- Plumbing
- Internet
- Furniture
- Other

### Role Rules

#### User

- Can create tickets
- Can view own tickets
- Can comment on own tickets

#### Technician

- Can view assigned tickets
- Can update assigned ticket status
- Can add work notes

#### Admin

- Can view all tickets
- Can assign technicians
- Can update ticket status
- Can manage ticket categories

#### Manager

- Can view ticket summaries and reports

## Module 3: Asset Management

### Purpose

This module manages campus and organization assets such as computers, projectors, air conditioners, network devices, classroom equipment, office devices, and other shared resources.

The first backend phase should focus on basic asset tracking. More advanced maintenance history, QR code scanning, and image uploads can be added after the core asset records are stable.

### Planned Entities

- AssetCategory
- Asset
- AssetStatusLog in a later phase for status history and audit-style tracking

### Planned Features

- View asset categories
- Add asset
- Edit asset basic information
- View asset detail
- Assign asset to location
- Categorize asset
- Update asset status
- Link asset to repair ticket in a later phase
- View asset maintenance history in a later phase
- Track warranty information

### Example Assets

- Computer
- Projector
- Air conditioner
- Printer
- Router
- Lab equipment
- Desk
- Chair

### Example Asset Fields

- Asset name
- Asset code
- Serial number
- Category
- Location
- Status
- Purchase date
- Warranty end date
- Notes

### Planned Asset Statuses

- AVAILABLE
- IN_USE
- UNDER_MAINTENANCE
- RETIRED
- LOST

### Role Rules

#### User

- Should not manage assets in the first asset backend phase
- May view limited asset information later if needed for ticket creation

#### Technician

- Can view asset list and asset detail for maintenance context
- May update maintenance notes or status in a later phase if allowed

#### Admin

- Can create, view, update, and change status for assets
- Can manage asset categories
- Can assign assets to locations

#### Manager

- Can view asset list, asset detail, and asset summaries
- Should not edit assets unless explicitly allowed later

### Future Ideas

- QR code for asset scan
- Asset image upload
- Maintenance history and status timeline
- Asset assignment history
- Inventory and spare parts relationship for maintenance work
- Asset repair cost summary
- Asset lifetime report
- Warranty expiration notification

## Module 4: Booking System

### Purpose

This module manages room and equipment booking.

### Planned Features

- Create booking request
- View booking list
- View booking detail
- Check availability
- Prevent overlapping bookings
- Approve booking
- Reject booking
- Cancel booking

### Example Booking Resources

- Meeting room
- Computer lab
- Projector
- Camera
- Notebook
- Event space

### Booking Statuses

- PENDING
- APPROVED
- REJECTED
- CANCELLED

### Important Logic

The system should prevent date and time overlap for the same resource.

Example:

Room A is already booked from 10:00 to 12:00.  
Another user should not be able to book Room A from 11:00 to 13:00.

## Module 5: Inventory and Spare Parts

### Purpose

This module manages internal stock, spare parts, and repair-related item usage.

### Planned Features

- Add inventory item
- Edit inventory item
- Stock in
- Stock out
- Stock adjustment
- Low stock warning
- Link used parts to repair tickets
- View transaction history

### Example Items

- LAN cable
- Mouse
- Keyboard
- Light bulb
- Printer ink
- Air conditioner part
- Screw set
- Power adapter

### Transaction Types

- STOCK_IN
- STOCK_OUT
- ADJUSTMENT

### Future Ideas

- Purchase request
- Supplier management
- Inventory cost summary
- Monthly stock report

## Module 6: Dashboard and Reports

### Purpose

This module provides useful summaries for admins and managers.

### Planned Dashboard Data

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

### Planned UI Components

- Summary cards
- Charts
- Recent activity table
- Status badges
- Filter controls

### Future Ideas

- Monthly report export
- CSV export
- PDF report
- Technician performance chart

## Module 7: n8n Automation

### Purpose

This module connects CampusFlow with n8n webhook automation.

### Planned Automation Triggers

- New ticket created
- Ticket assigned
- Critical ticket created
- Low stock item detected
- Booking approved

### Example Workflow

1. New repair ticket is created.
2. Backend sends webhook to n8n.
3. n8n sends message to Discord, LINE, or Email.

### Important Rules

- n8n webhook errors should not break the main API.
- Webhook URL must be stored in environment variables.
- Real webhook URLs must not be committed.

## Module 8: AI-Ready Knowledge Base

### Purpose

This module prepares the system for future AI assistant integration.

It should start as a normal knowledge base before connecting to any paid AI API.

### Planned Features

- Create knowledge base article
- Edit article
- Delete article
- Search article
- View article detail
- AI-ready assistant API structure

### Future AI Ideas

- AI ticket summary
- AI category suggestion
- AI troubleshooting assistant
- AI search from knowledge base
- AI response based on internal support articles

### Important Rules

- Do not connect paid AI API in the early phase.
- Do not commit API keys.
- Knowledge base should work without AI first.

## Module 9: API Documentation

### Purpose

This module documents backend API behavior.

### Planned Documentation

- Authentication API
- Ticket API
- Asset API
- Booking API
- Inventory API
- Dashboard API
- Notification API
- AI-ready API

### Future Tools

- Swagger / OpenAPI
- Postman collection

## Module 10: QA and Testing

### Purpose

This module demonstrates software testing and QA documentation skills.

### Planned Testing Work

- Manual test cases
- API test cases
- Postman collection
- Bug report examples
- Regression test checklist
- Smoke test checklist

### Example Test Areas

- Login
- Register
- Ticket creation
- Ticket assignment
- Ticket status update
- Role permission
- Invalid input
- Unauthorized access
- Forbidden access

## Module 11: Deployment and DevOps

### Purpose

This module documents how the project can run locally and deploy online.

### Planned Work

- Local setup guide
- Environment variable guide
- Docker Compose setup
- Frontend deployment guide
- Backend deployment guide
- Database deployment guide

### Planned Deployment Options

- Frontend: Vercel or Cloudflare Pages
- Backend: Render, Railway, or Fly.io
- Database: Neon, Supabase, or Railway PostgreSQL

## Module Priority

The recommended implementation order is:

1. Authentication and Authorization
2. Repair Ticket Management
3. Basic Dashboard
4. Asset Management
5. Booking System
6. Inventory and Spare Parts
7. n8n Automation
8. Knowledge Base
9. AI Assistant
10. Deployment and QA polish
