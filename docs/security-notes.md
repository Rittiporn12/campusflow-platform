# CampusFlow Security Notes

This document describes the planned security direction for CampusFlow.

CampusFlow is a portfolio project, but it should still follow realistic security practices. Security should be considered from the beginning, especially for authentication, authorization, user input, environment variables, file uploads, and API access control.

## Security Goals

The system should protect:

- User accounts
- Passwords
- Authentication tokens
- Private user data
- Ticket data
- Admin-only actions
- Technician assignments
- Asset and inventory data
- Environment variables
- API routes
- Future file uploads
- Future webhook integrations

## Security Principles

CampusFlow should follow these principles:

- Never store passwords as plain text.
- Never commit real secrets.
- Enforce authorization on the backend.
- Do not rely only on frontend permission checks.
- Validate all user input.
- Return safe error messages.
- Avoid logging sensitive data.
- Keep environment variables outside Git.
- Use role-based access control.
- Keep security behavior documented.

## Authentication Security

The planned authentication system will use:

- Email and password login
- Password hashing with bcrypt
- JWT access token
- Refresh token in a later phase

Important rules:

- Passwords must be hashed before saving to the database.
- Password hashes must never be returned in API responses.
- Login errors should not reveal too much information.
- JWT secret must be stored in environment variables.
- JWT secret must never be committed to Git.
- Expired or invalid tokens should return 401 Unauthorized.

## Password Rules

Planned password rules:

- Password is required.
- Minimum length should be at least 8 characters.
- Password should be hashed with bcrypt.
- Plain text passwords must never be logged.
- Plain text passwords must never be stored.

Future improvements:

- Strong password validation
- Password reset flow
- Email verification
- Account lockout after repeated failed login attempts

## JWT Rules

Planned JWT behavior:

- Access token is created after login.
- Access token is sent from frontend in Authorization header.
- Backend verifies token before protected routes.
- Backend loads current user from token payload.
- Backend checks user role before protected actions.

Authorization header format:

Authorization: Bearer ACCESS_TOKEN

Important rules:

- Do not store JWT secret in source code.
- Do not expose token in logs.
- Use short-lived access tokens in a later phase.
- Use refresh tokens in a later phase.
- Invalidate refresh tokens on logout in a later phase.

## Authorization and RBAC

RBAC means Role-Based Access Control.

Planned roles:

- USER
- TECHNICIAN
- ADMIN
- MANAGER

Backend authorization is required.

Frontend role checks are useful for hiding UI buttons, but they are not security.

## Role Rules

### User

A general user can:

- Create repair tickets
- View own tickets
- Comment on own tickets
- Create booking requests
- View own booking requests

A general user must not:

- View other users' tickets
- Assign technicians
- Manage assets
- Manage inventory
- Access admin dashboard
- Approve bookings

### Technician

A technician can:

- View assigned repair tickets
- Update assigned ticket status
- Add work notes
- Record used parts in a later phase

A technician must not:

- View unrelated private tickets
- Manage all users
- Change admin settings
- Approve bookings unless allowed later

### Admin

An admin can:

- Manage users
- View and manage all tickets
- Assign technicians
- Manage assets
- Manage bookings
- Manage inventory
- Manage categories
- View admin dashboard

### Manager

A manager can:

- View dashboards
- View reports
- View operational summaries

A manager should not always have edit permissions unless explicitly designed.

## Object-Level Authorization

Object-level authorization is very important.

Examples:

- A user can only view tickets they created.
- A technician can only view tickets assigned to them.
- An admin can view all tickets.
- A booking owner can view their own booking.
- A notification owner can view their own notification.

The backend must check ownership and role before returning data.

Example risk:

If User A can access `/api/tickets/123` and ticket 123 belongs to User B, that is a security issue.

## Input Validation

All API input should be validated.

Validation should cover:

- Required fields
- Email format
- Password length
- Enum values
- Number values
- Date values
- Text length
- Pagination values
- File upload type in a later phase

Examples:

- Ticket title is required.
- Ticket priority must be LOW, MEDIUM, HIGH, or CRITICAL.
- Booking endTime must be after startTime.
- Inventory quantity must be a positive number.
- Email must be valid format.

## Error Handling Security

API errors should be useful but safe.

Safe error example:

Invalid email or password.

Unsafe error example:

Password for this email is wrong.

Important rules:

- Do not expose stack traces in production.
- Do not expose database connection details.
- Do not expose JWT secret errors.
- Do not expose password hashes.
- Do not return internal server paths.
- Use generic messages for authentication failure.

## Environment Variables

Real environment variables must not be committed.

Use `.env.example` to document required variables.

Planned backend environment variables:

- DATABASE_URL
- JWT_SECRET
- JWT_EXPIRES_IN
- PORT
- CORS_ORIGIN
- N8N_WEBHOOK_URL in a later phase
- CLOUDINARY_CLOUD_NAME in a later phase
- CLOUDINARY_API_KEY in a later phase
- CLOUDINARY_API_SECRET in a later phase

Important rules:

- Commit `.env.example`.
- Do not commit `.env`.
- Add `.env` to `.gitignore`.
- Do not paste real secrets into README or docs.
- Do not expose secrets in screenshots.

## CORS Security

CORS should be configured to allow only trusted frontend origins.

During local development:

- Frontend may run on localhost.
- Backend may run on localhost.

In production:

- Only the deployed frontend URL should be allowed.

Important rules:

- Do not allow all origins in production.
- Do not expose credentials unless required.
- Document allowed origins in `.env.example`.

## File Upload Security

File upload will be added later.

Planned rules:

- Validate file type.
- Validate file size.
- Allow only safe image formats when uploading ticket images.
- Store files in Cloudinary or S3-compatible storage.
- Store only file metadata in the database.
- Do not allow executable files.
- Do not trust file names from users.
- Avoid exposing private file URLs if files should be protected.

Allowed file types in a later phase may include:

- jpg
- jpeg
- png
- webp
- pdf if needed

## Rate Limiting

Rate limiting should be added in a later phase.

Important routes to protect:

- Login
- Register
- Password reset in the future
- File upload
- Public API routes if any

Planned behavior:

- Limit repeated login attempts.
- Prevent spam ticket creation.
- Prevent API abuse.

## Audit Logs

Audit logs should be added after the MVP is stable.

Planned audit events:

- User login
- Ticket created
- Ticket assigned
- Ticket status changed
- Asset created
- Booking approved
- Inventory stock out
- Admin updated user status

Audit logs should store:

- User ID
- Action
- Entity type
- Entity ID
- Description
- Timestamp

Important rules:

- Do not store sensitive data in audit logs.
- Do not log passwords or tokens.

## Webhook Security

n8n webhook integration will be added later.

Important rules:

- Store webhook URL in environment variables.
- Do not commit real webhook URLs.
- Do not block the main API if webhook fails.
- Log webhook errors safely.
- Avoid sending sensitive data in webhook payloads.
- Consider webhook signing in a future phase.

## API Security Checklist

Before considering an API feature complete, check:

- Is the route protected if needed?
- Is the current user loaded from token?
- Is the user role checked?
- Is object ownership checked?
- Is input validated?
- Are errors safe?
- Are secrets excluded?
- Are password hashes hidden?
- Are docs updated?
- Are manual test cases added?

## Frontend Security Notes

Frontend should improve user experience, but backend must still protect data.

Frontend can:

- Hide admin-only buttons.
- Redirect unauthenticated users.
- Show different menus by role.
- Remove token on logout.

Frontend must not be trusted for:

- Real authorization
- Data ownership
- Admin permission enforcement

## Security Priority for MVP

The MVP should focus on:

1. Password hashing
2. JWT authentication
3. Protected backend routes
4. Role-based backend authorization
5. Object ownership checks
6. Safe error responses
7. Environment variable protection
8. Input validation

Advanced security such as rate limiting, audit logs, refresh token rotation, and webhook signing can be added later.
