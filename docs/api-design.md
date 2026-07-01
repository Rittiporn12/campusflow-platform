# CampusFlow API Design

This document describes the API design for CampusFlow.

The current backend API is implemented using Node.js, Express, TypeScript, Prisma, and PostgreSQL.

This document includes implemented Auth and Ticket API behavior plus planned API groups for later modules.

## API Goals

The API should support:

- Authentication
- Role-based access control
- Repair ticket workflow
- Asset management
- Booking system
- Inventory management
- Dashboard summaries
- n8n webhook integration
- Future AI-ready knowledge base
- API testing with Postman
- Future Swagger / OpenAPI documentation

## Base API Convention

Planned base path:

- `/api`

Example:

- `/api/auth/login`
- `/api/tickets`
- `/api/assets`

## Response Format

The API should use a consistent response format.

Successful response example:

- success: true
- message: readable success message
- data: response data

Error response example:

- success: false
- message: readable error message
- errors: validation errors when available

## HTTP Status Code Guidelines

Planned status codes:

- 200 OK: Request successful
- 201 Created: New resource created
- 400 Bad Request: Invalid input
- 401 Unauthorized: Missing or invalid authentication
- 403 Forbidden: User does not have permission
- 404 Not Found: Resource not found
- 409 Conflict: Duplicate or conflicting data
- 500 Internal Server Error: Unexpected server error

## Authentication Strategy

The API will use JWT authentication.

Planned approach:

- User logs in with email and password.
- Backend validates credentials.
- Backend returns access token.
- Frontend sends token in Authorization header.
- Protected routes verify token.
- Backend loads current user from token.
- Backend enforces role-based authorization.

Authorization header format:

- `Authorization: Bearer ACCESS_TOKEN`

## Role-Based Access Control

Planned roles:

- USER
- TECHNICIAN
- ADMIN
- MANAGER

Important rules:

- Backend must enforce authorization.
- Frontend permission checks are not enough.
- Users can only access their own data.
- Technicians can access assigned work.
- Admins can manage system data.
- Managers can view reports and summaries.

## API Groups

The planned API groups are:

1. Auth API
2. User API
3. Ticket API
4. Asset API
5. Booking API
6. Inventory API
7. Dashboard API
8. Notification API
9. Knowledge Base API
10. AI Assistant API

## Auth API

Status: Implemented basic version

Implemented routes:

- `POST /api/auth/register`
- `POST /api/auth/login`
- `GET /api/auth/me`

### POST /api/auth/register

Purpose:

- Register a new user account.

Access:

- Public

Request body:

- name
- email
- password

Expected behavior:

- Validate input.
- Check duplicate email.
- Hash password.
- Create user.
- Return created user without passwordHash.

Possible responses:

- 201 Created
- 400 Bad Request
- 409 Conflict
- 500 Internal Server Error

### POST /api/auth/login

Purpose:

- Log in a user.

Access:

- Public

Request body:

- email
- password

Expected behavior:

- Validate input.
- Check user by email.
- Compare password with password hash.
- Return access token and user data.

Possible responses:

- 200 OK
- 400 Bad Request
- 401 Unauthorized
- 500 Internal Server Error

### GET /api/auth/me

Purpose:

- Get current authenticated user.

Access:

- Authenticated users

Expected behavior:

- Verify access token.
- Return current user profile.

Possible responses:

- 200 OK
- 401 Unauthorized
- 404 Not Found

### POST /api/auth/logout

Purpose:

- Log out current user.

Access:

- Authenticated users

Notes:

- In the early phase, logout may be handled on the frontend by removing token.
- Backend logout can be added later when refresh token storage exists.

## User API

### GET /api/users

Purpose:

- Get user list.

Access:

- Admin only

Planned query parameters:

- page
- limit
- role
- search

### GET /api/users/:id

Purpose:

- Get user detail.

Access:

- Admin only
- Current user can view own profile in a later phase

### PATCH /api/users/:id

Purpose:

- Update user information.

Access:

- Admin only
- Current user can update own profile in a later phase

### PATCH /api/users/:id/status

Purpose:

- Activate or deactivate user.

Access:

- Admin only

## Ticket API

Status: Basic ticket API implemented.

Implemented routes:

- `GET /api/ticket-categories`
- `POST /api/tickets`
- `GET /api/tickets`
- `GET /api/tickets/:id`
- `PATCH /api/tickets/:id/status`
- `PATCH /api/tickets/:id/assign`
- `POST /api/tickets/:id/comments`

### POST /api/tickets

Purpose:

- Create a repair ticket.

Access:

- Authenticated users

Request body:

- title
- description
- categoryId
- priority
- locationId optional

Expected behavior:

- Validate input.
- Create ticket with PENDING status.
- Save createdById from current user.
- Trigger notification in a later phase.

Possible responses:

- 201 Created
- 400 Bad Request
- 401 Unauthorized

### GET /api/tickets

Purpose:

- Get ticket list.

Access:

- Authenticated users

Role behavior:

- USER sees own tickets.
- TECHNICIAN sees assigned tickets.
- ADMIN sees all tickets.
- MANAGER sees all tickets or report-level data.

Implemented query parameters:

- page
- limit
- status
- priority
- categoryId
- assignedToId
- search

Planned later query parameters:

- startDate
- endDate

Possible responses:

- 200 OK
- 401 Unauthorized

### GET /api/tickets/:id

Purpose:

- Get ticket detail.

Access:

- Authenticated users with permission to view the ticket.

Expected behavior:

- Return ticket detail with comments, status logs, category, location, asset, creator, and assigned technician.

Possible responses:

- 200 OK
- 401 Unauthorized
- 403 Forbidden
- 404 Not Found

### PATCH /api/tickets/:id/status

Purpose:

- Update ticket status.

Access:

- Admin
- Assigned technician

Request body:

- status
- note optional

Expected behavior:

- Validate status.
- Update ticket status.
- Create status log.
- Trigger notification in a later phase.

Possible responses:

- 200 OK
- 400 Bad Request
- 401 Unauthorized
- 403 Forbidden
- 404 Not Found

### PATCH /api/tickets/:id/assign

Purpose:

- Assign technician to ticket.

Access:

- Admin only

Request body:

- technicianId

Expected behavior:

- Validate technician user.
- Update assignedToId.
- Change status to ASSIGNED when appropriate.
- Create status log.
- Trigger notification in a later phase.

Possible responses:

- 200 OK
- 400 Bad Request
- 401 Unauthorized
- 403 Forbidden
- 404 Not Found

### POST /api/tickets/:id/comments

Purpose:

- Add comment to ticket.

Access:

- User who owns the ticket
- Assigned technician
- Admin
- Manager in a later phase

Request body:

- message
- isInternal optional

Expected behavior:

- Validate message.
- Check permission.
- Create comment.

Possible responses:

- 201 Created
- 400 Bad Request
- 401 Unauthorized
- 403 Forbidden
- 404 Not Found

## Asset API

Status: Planned.

The first Asset API phase should provide basic asset category lookup and asset record management. QR codes, image upload, detailed maintenance history, asset assignment, inventory or spare parts relationships, and ticket-to-asset repair history can be added in later phases.

### GET /api/asset-categories

Purpose:

- Get active asset categories.

Access:

- Admin
- Manager
- Technician

### POST /api/assets

Purpose:

- Create asset.

Access:

- Admin only

Request body:

- name
- assetCode
- serialNumber optional
- categoryId
- locationId optional
- status
- purchaseDate optional
- warrantyEndDate optional
- notes optional

### GET /api/assets

Purpose:

- Get asset list.

Access:

- Admin
- Manager
- Technician

Planned query parameters:

- page
- limit
- categoryId
- status
- locationId
- search

### GET /api/assets/:id

Purpose:

- Get asset detail.

Access:

- Admin
- Manager
- Technician

### PATCH /api/assets/:id

Purpose:

- Update asset.

Access:

- Admin only

### PATCH /api/assets/:id/status

Purpose:

- Update asset status.

Access:

- Admin only in the first phase

Request body:

- status
- note optional

Valid statuses:

- AVAILABLE
- IN_USE
- UNDER_MAINTENANCE
- RETIRED
- LOST

Notes:

- Asset repair history endpoints should be implemented after tickets can be linked to assets.
- Asset image upload, QR code generation, asset assignment history, inventory or spare parts relationships, and maintenance status history should be separate later-phase API work.

## Booking API

### POST /api/bookings

Purpose:

- Create booking request.

Access:

- Authenticated users

Request body:

- resourceId
- title
- purpose
- startTime
- endTime

Expected behavior:

- Validate date and time.
- Check overlapping approved bookings.
- Create booking with PENDING status.

### GET /api/bookings

Purpose:

- Get booking list.

Access:

- Authenticated users

Role behavior:

- USER sees own bookings.
- ADMIN sees all bookings.
- MANAGER sees all bookings.

### GET /api/bookings/:id

Purpose:

- Get booking detail.

Access:

- Booking owner
- Admin
- Manager

### PATCH /api/bookings/:id/approve

Purpose:

- Approve booking.

Access:

- Admin only

### PATCH /api/bookings/:id/reject

Purpose:

- Reject booking.

Access:

- Admin only

### PATCH /api/bookings/:id/cancel

Purpose:

- Cancel booking.

Access:

- Booking owner
- Admin

## Inventory API

### POST /api/inventory/items

Purpose:

- Create inventory item.

Access:

- Admin only

### GET /api/inventory/items

Purpose:

- Get inventory item list.

Access:

- Admin
- Manager
- Technician in a later phase

### GET /api/inventory/items/:id

Purpose:

- Get inventory item detail.

Access:

- Admin
- Manager
- Technician in a later phase

### POST /api/inventory/transactions

Purpose:

- Create inventory transaction.

Access:

- Admin
- Technician in a later phase

Request body:

- itemId
- type
- quantity
- ticketId optional
- note optional

Expected behavior:

- Validate transaction type.
- Validate quantity.
- Update item quantity.
- Create transaction history.

## Dashboard API

### GET /api/dashboard/summary

Purpose:

- Get dashboard summary cards.

Access:

- Admin
- Manager

Planned data:

- totalTickets
- openTickets
- completedTickets
- criticalTickets
- totalAssets
- lowStockItems
- upcomingBookings

### GET /api/dashboard/tickets-by-status

Purpose:

- Get ticket count grouped by status.

Access:

- Admin
- Manager

### GET /api/dashboard/tickets-by-category

Purpose:

- Get ticket count grouped by category.

Access:

- Admin
- Manager

### GET /api/dashboard/technician-workload

Purpose:

- Get assigned ticket count by technician.

Access:

- Admin
- Manager

## Notification API

### GET /api/notifications

Purpose:

- Get current user's notifications.

Access:

- Authenticated users

### PATCH /api/notifications/:id/read

Purpose:

- Mark notification as read.

Access:

- Notification owner

## n8n Webhook Integration

n8n integration will be implemented as backend service logic, not necessarily as public API endpoints.

Planned events:

- ticket.created
- ticket.assigned
- ticket.critical
- inventory.low_stock
- booking.approved

Important rules:

- Store webhook URL in environment variable.
- Do not commit real webhook URL.
- Webhook failure must not break the main API.
- Log webhook errors safely.

## Knowledge Base API

### POST /api/knowledge-base/articles

Purpose:

- Create knowledge base article.

Access:

- Admin only

### GET /api/knowledge-base/articles

Purpose:

- Get published articles.

Access:

- Authenticated users

### GET /api/knowledge-base/articles/:id

Purpose:

- Get article detail.

Access:

- Authenticated users

### PATCH /api/knowledge-base/articles/:id

Purpose:

- Update article.

Access:

- Admin only

### DELETE /api/knowledge-base/articles/:id

Purpose:

- Delete article.

Access:

- Admin only

## AI Assistant API

AI Assistant should be added later after the knowledge base module is stable.

### POST /api/ai/assistant

Purpose:

- Ask AI assistant a question.

Access:

- Authenticated users

Request body:

- question

Notes:

- Do not implement paid AI API in the early phase.
- Do not commit AI API keys.
- The knowledge base should work without AI first.

## Validation Rules

The API should validate:

- Required fields
- Email format
- Password length
- Status values
- Priority values
- Date and time values
- Numeric values
- Ownership and permissions
- Pagination parameters

## Pagination Convention

List endpoints should support:

- page
- limit

Example behavior:

- page default: 1
- limit default: 10
- max limit: 100

Response metadata should include:

- page
- limit
- total
- totalPages

## Error Handling Rules

The API should return safe error messages.

Important rules:

- Do not expose stack traces in production.
- Do not expose database connection details.
- Do not expose JWT secrets.
- Do not expose password hashes.
- Use 401 for unauthenticated requests.
- Use 403 for authenticated users without permission.
- Use 404 when the resource does not exist or should not be exposed.

## API Testing Plan

API testing will be documented using:

- Manual API test cases
- Postman collection
- Authentication flow tests
- Role permission tests
- Invalid input tests
- Regression tests

## Initial MVP API Scope

The first backend MVP should focus on:

1. Health check route
2. Auth API
3. User current profile
4. Ticket categories
5. Repair ticket CRUD
6. Ticket assignment
7. Ticket status update
8. Ticket comments
9. Basic dashboard summary

Asset, booking, inventory, notification, n8n, and AI APIs should be added later.
