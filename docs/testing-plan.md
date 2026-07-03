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

The current Postman collection covers the Auth API, Ticket API, and implemented Asset API endpoints. Future modules should extend the collection as they are implemented.

API testing should cover:

- Auth API
- Ticket API
- User API in a later phase
- Asset API
- Booking API
- Inventory API
- Dashboard API
- Notification API in a later phase
- Knowledge Base API in a later phase

## Postman Collection Plan

Current and planned folder structure in Postman:

- Health Check
- Auth
- Tickets
- Users
- Assets
- Bookings
- Inventory
- Dashboard
- Notifications
- Knowledge Base
- Negative Tests
- Role Permission Tests

## Postman Environment Variables

Current and planned Postman variables:

- baseUrl
- authToken
- ticketId
- categoryId
- technicianId
- adminEmail
- technicianEmail
- userEmail
- managerEmail
- defaultPassword
- assetId
- bookingId in a later phase
- inventoryItemId in a later phase

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

Status: Ready for manual API testing.

Current implemented ticket test areas:

- Get ticket categories
- Create ticket
- List tickets by role
- View ticket detail by permission
- Assign ticket to technician
- Update ticket status
- Add ticket comment
- Check ticket status log
- Check forbidden access for unrelated users

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

Status: Ready for manual API and frontend testing for the implemented asset workflow.

Current implemented asset test areas:

- View asset categories.
- Admin creates asset.
- Admin edits asset.
- Admin views asset detail.
- Admin updates asset status.
- Admin verifies asset status history.
- Admin archives or retires asset safely.
- User cannot manage asset.
- Invalid asset category returns validation error.

Remaining later-phase asset tests:

- Advanced asset filtering and search.
- Asset dashboard metrics and analytics.
- Asset can link to ticket.
- Manager views asset maintenance history.
- Hard delete is intentionally not part of the current asset workflow.

### Asset Frontend Manual Checklist

Preconditions:

- Backend API is running.
- Frontend app is running.
- Database has been migrated and seeded.
- Admin account is available.

Checklist:

1. Login as admin.
2. Navigate to `/assets`.
3. Verify the asset list loads.
4. Create a new asset with asset code, name, and category.
5. Open the created asset detail page.
6. Update asset information.
7. Update asset status.
8. Archive or retire the asset from the asset detail page.
9. Confirm the archive action.
10. Verify the asset status changes to `RETIRED`.
11. Verify the archive button is disabled or hidden after retirement.
12. Refresh the asset detail page and verify the latest data still appears.
13. Run `npm run build` in `apps/web`.

Common issues:

- `401 Unauthorized` can happen when the auth token is missing or expired.
- The category select can be empty if seed data has not been run.
- `404 Not Found` can happen when `assetId` does not exist.
- Validation errors can happen when required fields are missing.

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

The current frontend dashboard uses existing ticket and asset APIs. A dedicated dashboard API can be added later if reporting becomes more complex.

Current dashboard tests:

- Authenticated user can view dashboard.
- Ticket summary cards load from existing ticket data.
- Asset summary cards load from existing asset data.
- Recent tickets link to ticket detail pages.
- Recent assets link to asset detail pages.

Later dashboard tests:

- Manager-specific reports.
- Ticket count matches database data from a dedicated reporting API.
- Asset and inventory report counts match database data.
- Low stock count matches inventory data.
- Critical ticket count matches ticket data.

## Final Manual Testing Checklist

Use this checklist before recording portfolio screenshots or tagging a stable demo milestone.

Preconditions:

- Local PostgreSQL is running.
- Backend dependencies are installed.
- Frontend dependencies are installed.
- Prisma migrations and seed data have been applied.
- Backend API is running.
- Frontend app is running.

Checklist:

1. Auth flow: log in with the admin demo account.
2. Auth flow: confirm the app redirects to the dashboard and shows the current user profile.
3. Dashboard: confirm ticket and asset summary cards load.
4. Dashboard: confirm recent ticket and asset links open detail pages.
5. Ticket workflow: open the ticket list.
6. Ticket workflow: create a ticket with valid title, description, category, and priority.
7. Ticket workflow: open ticket detail.
8. Ticket workflow: update ticket status.
9. Ticket workflow: assign a technician by technician ID.
10. Ticket workflow: add a ticket comment.
11. Ticket workflow: return to the ticket list and confirm the ticket is still visible.
12. Asset workflow: open the asset list.
13. Asset workflow: create an asset with asset code, name, and category.
14. Asset workflow: open asset detail.
15. Asset workflow: update asset information.
16. Asset workflow: update asset status.
17. Asset workflow: archive or retire the asset.
18. Asset workflow: confirm the asset status changes to `RETIRED`.
19. Asset workflow: confirm the archive action is disabled or hidden after retirement.
20. Responsive check: review dashboard, tickets, ticket detail, assets, asset detail, modals, and pagination at desktop, tablet, and mobile widths.
21. Responsive check: confirm mobile navigation uses the compact top bar and drawer instead of the desktop sidebar.
22. Responsive check: confirm there is no horizontal scrolling on narrow mobile widths around 390px and 375px.
23. Backend check: run `npm run check` in `apps/api`.
24. Frontend build: run `npm run build` in `apps/web`.

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
