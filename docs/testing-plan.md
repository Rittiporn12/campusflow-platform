# CampusFlow Testing Plan

This document describes the planned testing strategy for CampusFlow.

CampusFlow should demonstrate both software development and software testing skills. Testing documentation is part of the portfolio value of this project.

## Testing Goals

The testing plan should help verify:

- Authentication works correctly.
- Role-based access control works correctly.
- Users cannot access data they do not own.
- Repair ticket workflow works correctly.
- Admin can assign technicians.
- Technicians can update assigned tickets.
- Validation errors are handled properly.
- API responses are consistent.
- Dashboard data is accurate.
- Future modules are tested before release.

## Testing Types

CampusFlow will use several levels of testing.

Planned testing types:

1. Manual testing
2. API testing with Postman
3. Regression testing
4. Smoke testing
5. Role permission testing
6. Future automated testing

## Manual Testing Strategy

Manual testing will be used throughout development.

Each important feature should include manual test steps.

Manual test cases should cover:

- Test case ID
- Feature name
- Test scenario
- Preconditions
- Test steps
- Test data
- Expected result
- Actual result
- Status
- Notes

Example status values:

- Passed
- Failed
- Blocked
- Not Run

## Manual Test Case Format

Recommended format:

Test Case ID: TC-AUTH-001

Feature: Authentication

Scenario: User can log in with valid email and password.

Preconditions:

- User account already exists.
- Backend server is running.
- Frontend app is running.

Test Steps:

1. Open login page.
2. Enter valid email.
3. Enter valid password.
4. Click login button.

Expected Result:

- User logs in successfully.
- Access token is saved.
- User is redirected to dashboard.

Actual Result:

- To be filled during testing.

Status:

- Not Run

## API Testing Strategy

API testing will be done with Postman.

Postman collection should be added in a later phase.

API testing should cover:

- Auth API
- User API
- Ticket API
- Asset API
- Booking API
- Inventory API
- Dashboard API
- Notification API in a later phase
- Knowledge Base API in a later phase

## Postman Collection Plan

Planned folder structure in Postman:

- Health Check
- Auth
- Users
- Tickets
- Assets
- Bookings
- Inventory
- Dashboard
- Notifications
- Knowledge Base
- Negative Tests
- Role Permission Tests

## Postman Environment Variables

Planned Postman variables:

- baseUrl
- accessToken
- adminToken
- technicianToken
- userToken
- ticketId
- assetId
- bookingId
- inventoryItemId

Example baseUrl values:

- Local backend URL
- Deployed backend URL in a later phase

## Authentication Test Areas

Authentication tests should cover:

### Register

Positive cases:

- Register with valid name, email, and password.

Negative cases:

- Missing name
- Missing email
- Invalid email format
- Missing password
- Password too short
- Duplicate email

### Login

Positive cases:

- Login with valid email and password.

Negative cases:

- Missing email
- Missing password
- Invalid email format
- Wrong password
- Non-existing email

### Current User

Positive cases:

- Authenticated user can get own profile.

Negative cases:

- Missing token
- Invalid token
- Expired token in a later phase

## Role Permission Testing

Role permission testing is very important.

### User Role Tests

A user should be able to:

- Create ticket
- View own tickets
- View own ticket detail
- Comment on own ticket

A user should not be able to:

- View all tickets
- View another user's ticket
- Assign technician
- Update ticket as admin
- Access admin dashboard
- Manage users
- Manage inventory

### Technician Role Tests

A technician should be able to:

- View assigned tickets
- Update assigned ticket status
- Add work notes

A technician should not be able to:

- Assign tickets to themselves unless allowed
- View unassigned private tickets unless allowed
- Manage users
- Access admin-only settings

### Admin Role Tests

An admin should be able to:

- View all tickets
- Assign technician
- Update ticket status
- Manage ticket categories
- Manage assets
- Manage bookings
- Manage inventory
- Access dashboard

### Manager Role Tests

A manager should be able to:

- View dashboard
- View reports
- View summary data

A manager should not always be able to:

- Edit tickets
- Manage users
- Change inventory
- Approve actions unless explicitly allowed

## Repair Ticket Test Areas

Ticket tests should cover:

### Create Ticket

Positive cases:

- User creates ticket with valid data.
- Admin creates ticket with valid data.

Negative cases:

- Missing title
- Missing description
- Invalid priority
- Invalid categoryId
- Invalid locationId
- Unauthorized request

### View Tickets

Positive cases:

- User sees own tickets.
- Technician sees assigned tickets.
- Admin sees all tickets.

Negative cases:

- User tries to view another user's ticket.
- Unauthenticated user tries to view tickets.

### Assign Ticket

Positive cases:

- Admin assigns ticket to technician.

Negative cases:

- User tries to assign ticket.
- Technician tries to assign ticket without permission.
- Admin assigns ticket to non-technician user.
- Ticket does not exist.

### Update Ticket Status

Positive cases:

- Assigned technician updates ticket status.
- Admin updates ticket status.

Negative cases:

- User tries to update status.
- Technician updates unassigned ticket.
- Invalid status value.
- Ticket does not exist.

### Add Comment

Positive cases:

- Ticket owner adds comment.
- Assigned technician adds comment.
- Admin adds comment.

Negative cases:

- User comments on another user's ticket.
- Empty comment message.
- Ticket does not exist.

## Asset Test Areas

Asset tests should be added when the asset module is implemented.

Planned tests:

- Admin creates asset.
- Admin edits asset.
- Admin views asset detail.
- Asset can link to ticket.
- Manager views asset maintenance history.
- User cannot manage asset.
- Invalid asset category returns validation error.

## Booking Test Areas

Booking tests should be added when the booking module is implemented.

Planned tests:

- User creates booking request.
- Admin approves booking.
- Admin rejects booking.
- User cancels own booking.
- System prevents overlapping booking.
- User cannot cancel another user's booking.
- Invalid date range returns validation error.

Important booking logic:

- endTime must be after startTime.
- Approved bookings for the same resource must not overlap.

## Inventory Test Areas

Inventory tests should be added when the inventory module is implemented.

Planned tests:

- Admin creates inventory item.
- Admin records stock in.
- Technician records stock out for repair ticket.
- System reduces quantity after stock out.
- Low stock item appears in dashboard.
- Invalid quantity returns validation error.
- User cannot manage inventory.

## Dashboard Test Areas

Dashboard tests should be added when dashboard API is implemented.

Planned tests:

- Admin can view dashboard summary.
- Manager can view dashboard summary.
- User cannot access admin dashboard.
- Ticket count matches database data.
- Low stock count matches inventory data.
- Critical ticket count matches ticket data.

## n8n Automation Test Areas

n8n tests should be added when webhook integration is implemented.

Planned tests:

- New ticket triggers webhook.
- Assigned ticket triggers webhook.
- Critical ticket triggers webhook.
- Low stock triggers webhook.
- Webhook failure does not break main API.
- Webhook URL is read from environment variable.

## Knowledge Base Test Areas

Knowledge base tests should be added when the module is implemented.

Planned tests:

- Admin creates article.
- Admin edits article.
- Admin deletes article.
- User views published article.
- User searches article.
- Draft article is not visible to normal user.
- User cannot create article.

## Smoke Testing

Smoke testing checks whether the main system still works after changes.

MVP smoke test checklist:

1. Backend starts successfully.
2. Health check route works.
3. User can register.
4. User can login.
5. Authenticated user can get profile.
6. User can create ticket.
7. Admin can view tickets.
8. Admin can assign technician.
9. Technician can update status.
10. User cannot access admin-only route.

## Regression Testing

Regression testing checks whether old features still work after new changes.

Regression testing should be done after:

- Adding a new module
- Changing database schema
- Changing authentication
- Changing authorization
- Changing ticket workflow
- Changing API response format
- Refactoring shared code

Regression test areas:

- Login
- Register
- Current user
- Ticket creation
- Ticket list
- Ticket detail
- Ticket assignment
- Ticket status update
- Role permissions

## Bug Report Format

Bug reports should use a clear format.

Recommended format:

Bug ID: BUG-001

Title:

Short description of the bug.

Environment:

- Browser
- OS
- Frontend URL
- Backend URL
- Database environment

Preconditions:

- Required setup before reproducing the bug.

Steps to Reproduce:

1. Step one
2. Step two
3. Step three

Expected Result:

What should happen.

Actual Result:

What actually happened.

Severity:

- Low
- Medium
- High
- Critical

Priority:

- Low
- Medium
- High
- Urgent

Evidence:

- Screenshot
- API response
- Console error
- Network log

Status:

- Open
- In Progress
- Fixed
- Retest
- Closed

## Test Documentation Folder Plan

In a later phase, create folders:

- qa/
- qa/manual-test-cases/
- qa/bug-reports/
- qa/test-summary-reports/
- postman/

Possible files:

- qa/manual-test-cases/auth-test-cases.md
- qa/manual-test-cases/ticket-test-cases.md
- qa/bug-reports/sample-bug-report.md
- qa/test-summary-reports/mvp-test-summary.md
- postman/campusflow.postman_collection.json

## Future Automated Testing

Automated testing can be added after the MVP is stable.

Possible tools:

- Vitest for frontend unit tests
- React Testing Library for frontend component tests
- Jest or Vitest for backend unit tests
- Supertest for backend API tests
- Playwright for end-to-end tests

Do not add automated tests too early if the system structure is still changing.

## Testing Priority for MVP

The MVP testing priority should be:

1. Authentication tests
2. Role permission tests
3. Ticket creation tests
4. Ticket list and detail tests
5. Ticket assignment tests
6. Ticket status update tests
7. Negative API tests
8. Smoke test checklist
9. Postman collection
10. Test summary report
