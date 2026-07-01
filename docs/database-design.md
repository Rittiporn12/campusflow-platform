# CampusFlow Database Design

This document describes the planned database design for CampusFlow.

The database will be implemented later using PostgreSQL and Prisma ORM.  
This document is only a planning document for the early phase.

## Database Goals

The database should support:

- User authentication
- Role-based access control
- Repair ticket workflow
- Asset management
- Booking system
- Inventory and spare parts tracking
- Dashboard and reports
- Notification logs
- Audit logs
- Future AI-ready knowledge base

## Database Technology

Planned database:

- PostgreSQL

Planned ORM:

- Prisma ORM

## Design Principles

The database should follow these principles:

- Use clear table names.
- Use relationships instead of duplicated data.
- Store timestamps for important records.
- Support role-based permissions.
- Support future dashboard reporting.
- Avoid storing sensitive data in plain text.
- Keep early schema simple and expandable.

## Common Fields

Most tables should include:

- id
- createdAt
- updatedAt

Some important workflow tables may also include:

- createdById
- updatedById
- deletedAt in a later phase
- status
- notes

## Planned Entity Groups

The database will be grouped into these areas:

1. Core user and organization data
2. Repair ticket data
3. Asset data
4. Booking data
5. Inventory data
6. Dashboard and reporting data
7. Notification and audit data
8. Knowledge base data

## Core Tables

### users

Stores user accounts.

Planned fields:

- id
- name
- email
- passwordHash
- role
- departmentId
- organizationId
- isActive
- createdAt
- updatedAt

Notes:

- Passwords must be hashed.
- Email should be unique.
- Role should control access permissions.
- Real passwords must never be stored as plain text.

### organizations

Stores organization or campus information.

Planned fields:

- id
- name
- code
- description
- createdAt
- updatedAt

Notes:

- This table prepares the system for future multi-organization support.
- Multi-tenant production logic is not required in the early phase.

### departments

Stores departments inside an organization.

Planned fields:

- id
- organizationId
- name
- description
- createdAt
- updatedAt

Example departments:

- IT Department
- Facility Department
- Student Service
- Administration

### locations

Stores physical locations.

Planned fields:

- id
- organizationId
- name
- building
- floor
- room
- description
- createdAt
- updatedAt

Example locations:

- Building A Floor 3 Room 301
- Computer Lab 1
- Meeting Room 2
- Library

## Role Design

The early version can use a simple enum role on the users table.

Planned roles:

- USER
- TECHNICIAN
- ADMIN
- MANAGER

In a later phase, the system may be expanded into separate role and permission tables.

Future possible tables:

- roles
- permissions
- role_permissions

## Repair Ticket Tables

Status: Basic ticket database schema implemented.

### ticket_categories

Stores ticket categories.

Planned fields:

- id
- name
- description
- isActive
- createdAt
- updatedAt

Example categories:

- IT
- Electrical
- Air Conditioner
- Plumbing
- Internet
- Furniture
- Other

### tickets

Stores repair ticket records.

Planned fields:

- id
- title
- description
- status
- priority
- categoryId
- createdById
- assignedToId
- locationId
- assetId
- createdAt
- updatedAt

Planned statuses:

- PENDING
- ASSIGNED
- IN_PROGRESS
- WAITING_PARTS
- COMPLETED
- CANCELLED

Planned priorities:

- LOW
- MEDIUM
- HIGH
- CRITICAL

Notes:

- General users can create tickets.
- Users can only view their own tickets.
- Admins can view and manage all tickets.
- Technicians can view assigned tickets.

### ticket_comments

Stores comments or work notes inside a ticket.

Planned fields:

- id
- ticketId
- userId
- message
- isInternal
- createdAt
- updatedAt

Notes:

- Public comments can be visible to the ticket owner.
- Internal notes may be visible only to admin and technician in a later phase.

### ticket_status_logs

Stores ticket status history.

Planned fields:

- id
- ticketId
- oldStatus
- newStatus
- changedById
- note
- createdAt

Notes:

- This table helps track workflow history.
- It is useful for dashboard and audit purposes.

### ticket_attachments

Stores file or image attachment metadata.

Planned fields:

- id
- ticketId
- uploadedById
- fileName
- fileUrl
- fileType
- fileSize
- createdAt

Notes:

- File upload will be implemented in a later phase.
- Real files should be stored in Cloudinary or S3-compatible storage.
- Only file metadata should be stored in the database.

## Asset Tables

### asset_categories

Stores asset categories.

Planned fields:

- id
- name
- description
- isActive
- createdAt
- updatedAt

Example categories:

- Computer
- Projector
- Air Conditioner
- Printer
- Router
- Furniture
- Lab Equipment

### assets

Stores organization assets.

Planned fields:

- id
- name
- assetCode
- serialNumber
- categoryId
- organizationId
- locationId
- status
- purchaseDate
- warrantyEndDate
- notes
- createdAt
- updatedAt

Planned statuses:

- AVAILABLE
- IN_USE
- UNDER_MAINTENANCE
- RETIRED
- LOST

Notes:

- Asset code should be unique.
- Asset category should reference `asset_categories`.
- Asset location should reference `locations` when available.
- Assets can be linked to repair tickets in a later phase.
- Asset assignment history can be added in a later phase if assets need to be assigned to users, departments, or rooms over time.
- Inventory and spare parts can be related to assets later through maintenance records or repair tickets.
- Image uploads and QR codes should be added later after basic asset records are stable.

### asset_status_logs

Stores asset status changes in a later phase.

Planned fields:

- id
- assetId
- oldStatus
- newStatus
- changedById
- note
- createdAt

Notes:

- This table is useful for maintenance history and audit-style tracking.
- It does not need to be part of the first asset backend implementation unless status history is required immediately.
- Asset maintenance history can be generated from related tickets.

### asset_maintenance_history

Stores asset maintenance history.

Planned fields:

- id
- assetId
- ticketId
- description
- maintenanceDate
- performedById
- createdAt

Notes:

- This table may be added after the ticket and asset modules are stable.
- Some maintenance history can also be derived from completed tickets.

## Booking Tables

### booking_resources

Stores rooms or equipment that can be booked.

Planned fields:

- id
- name
- type
- locationId
- capacity
- description
- isActive
- createdAt
- updatedAt

Planned resource types:

- ROOM
- EQUIPMENT

Examples:

- Meeting Room A
- Computer Lab 1
- Projector 01
- Camera Kit

### bookings

Stores booking requests.

Planned fields:

- id
- resourceId
- requestedById
- title
- purpose
- startTime
- endTime
- status
- approvedById
- approvedAt
- rejectedReason
- createdAt
- updatedAt

Planned statuses:

- PENDING
- APPROVED
- REJECTED
- CANCELLED

Important rule:

- The system must prevent overlapping approved bookings for the same resource.

## Inventory Tables

### inventory_items

Stores spare parts and internal stock items.

Planned fields:

- id
- name
- sku
- description
- quantity
- unit
- lowStockThreshold
- locationId
- createdAt
- updatedAt

Examples:

- LAN Cable
- Mouse
- Keyboard
- Light Bulb
- Printer Ink
- Air Conditioner Part

### inventory_transactions

Stores stock movement history.

Planned fields:

- id
- itemId
- type
- quantity
- ticketId
- createdById
- note
- createdAt

Planned transaction types:

- STOCK_IN
- STOCK_OUT
- ADJUSTMENT

Notes:

- Stock out can be linked to a repair ticket.
- Low stock warnings can be calculated from quantity and lowStockThreshold.

## Dashboard and Reporting Data

Dashboard data can be calculated from existing tables.

Examples:

- Total tickets from tickets table
- Open tickets from tickets table by status
- Critical tickets from tickets table by priority
- Tickets by category from ticket_categories and tickets
- Technician workload from assignedToId
- Low stock items from inventory_items
- Upcoming bookings from bookings
- Assets with most repairs from tickets and assets

No separate dashboard table is required in the early phase.

## Notification Tables

### notifications

Stores notification records.

Planned fields:

- id
- userId
- type
- title
- message
- isRead
- createdAt

Notes:

- This table may be added after the main workflow is stable.
- n8n automation may use webhook calls before internal notifications are implemented.

### webhook_logs

Stores webhook delivery logs.

Planned fields:

- id
- eventType
- payload
- status
- errorMessage
- createdAt

Notes:

- Webhook errors should not break the main API.
- Sensitive data should not be logged.

## Audit Log Tables

### audit_logs

Stores important system actions.

Planned fields:

- id
- userId
- action
- entityType
- entityId
- description
- createdAt

Example actions:

- USER_LOGIN
- TICKET_CREATED
- TICKET_ASSIGNED
- TICKET_STATUS_CHANGED
- ASSET_CREATED
- BOOKING_APPROVED
- INVENTORY_STOCK_OUT

Notes:

- Audit logs are useful for security and traceability.
- This can be added after the MVP is stable.

## Knowledge Base Tables

### knowledge_base_articles

Stores support articles.

Planned fields:

- id
- title
- content
- category
- createdById
- isPublished
- createdAt
- updatedAt

Notes:

- This should work without AI first.
- AI assistant integration can be added later.

### ai_chat_logs

Stores AI assistant interaction history in a later phase.

Planned fields:

- id
- userId
- question
- answer
- source
- createdAt

Notes:

- This should not be implemented in the early phase.
- Avoid storing sensitive user data in AI logs.

## Initial MVP Database Scope

Current implemented ticket schema includes:

- ticket_categories
- tickets
- ticket_comments
- ticket_status_logs

The first database implementation should focus only on:

- users
- organizations
- departments
- locations
- ticket_categories
- tickets
- ticket_comments
- ticket_status_logs

Assets, bookings, inventory, notifications, audit logs, and AI tables should be added later.

## Relationship Overview

Planned relationships:

- One organization has many departments.
- One organization has many locations.
- One department has many users.
- One user can create many tickets.
- One technician can be assigned many tickets.
- One ticket belongs to one category.
- One ticket can have many comments.
- One ticket can have many status logs.
- One asset can have many tickets.
- One booking resource can have many bookings.
- One inventory item can have many transactions.

## Future Prisma Notes

When Prisma is added later:

- Use enums for roles, ticket statuses, ticket priorities, booking statuses, and inventory transaction types.
- Use relations for user, ticket, asset, booking, and inventory models.
- Use migrations for schema changes.
- Keep seed data simple.
- Add demo users for portfolio testing.

## Demo Data Plan

Future demo data should include:

- One admin user
- One technician user
- One general user
- Several ticket categories
- Several locations
- Several sample repair tickets
- Several assets
- Several booking resources
- Several inventory items

Demo accounts should be documented later in the README only after authentication is implemented.

Current local seed data includes:

- CampusFlow Demo Organization
- IT Department
- Facility Department
- Main Office location
- Computer Lab location
- Admin demo account
- Technician demo account
- User demo account
- Manager demo account

Demo password for all accounts:

- Password123!

These accounts are for local development and portfolio demo only.
