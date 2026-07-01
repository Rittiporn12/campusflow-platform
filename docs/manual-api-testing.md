# Manual API Testing

This document describes manual API testing for the CampusFlow backend API.

## Testing Scope

The current testing scope covers:

1. Authentication API
2. Ticket API
3. Asset API

## Test Environment

| Item           | Value                 |
| -------------- | --------------------- |
| API Base URL   | http://localhost:4000 |
| Database       | PostgreSQL            |
| ORM            | Prisma                |
| Test Tool      | Postman               |
| Authentication | JWT Bearer Token      |

## Test Accounts

| Role       | Email                     | Password     |
| ---------- | ------------------------- | ------------ |
| Admin      | admin@campusflow.dev      | Password123! |
| Technician | technician@campusflow.dev | Password123! |
| User       | user@campusflow.dev       | Password123! |
| Manager    | manager@campusflow.dev    | Password123! |

## API Groups

### Authentication API

| Method | Endpoint           | Description                    |
| ------ | ------------------ | ------------------------------ |
| POST   | /api/auth/register | Register a new user            |
| POST   | /api/auth/login    | Login and receive JWT token    |
| GET    | /api/auth/me       | Get current authenticated user |

### Ticket API

| Method | Endpoint                  | Description                 |
| ------ | ------------------------- | --------------------------- |
| GET    | /api/ticket-categories    | Get ticket categories       |
| POST   | /api/tickets              | Create a new ticket         |
| GET    | /api/tickets              | Get ticket list             |
| GET    | /api/tickets/:id          | Get ticket detail           |
| PATCH  | /api/tickets/:id/status   | Update ticket status        |
| PATCH  | /api/tickets/:id/assign   | Assign ticket to technician |
| POST   | /api/tickets/:id/comments | Add ticket comment          |

### Asset API

| Method | Endpoint               | Description         |
| ------ | ---------------------- | ------------------- |
| GET    | /api/asset-categories  | Get asset categories |
| POST   | /api/assets            | Create a new asset  |
| GET    | /api/assets            | Get asset list      |
| GET    | /api/assets/:id        | Get asset detail    |
| PATCH  | /api/assets/:id        | Update asset        |
| PATCH  | /api/assets/:id/status | Update asset status |

## Test Case Format

Each test case should include:

| Field           | Description                   |
| --------------- | ----------------------------- |
| Test Case ID    | Unique test case ID           |
| API Group       | API area being tested         |
| Method          | HTTP method                   |
| Endpoint        | API endpoint being tested     |
| Preconditions   | Required state before testing |
| Request Body    | Input data                    |
| Expected Result | Expected API response         |
| Actual Result   | Actual API response           |
| Status          | Pass or Fail                  |
| Notes           | Additional notes              |

## Test Cases

### Authentication API Test Cases

#### TC-AUTH-001: Register New User

| Field           | Details                                                                                                 |
| --------------- | ------------------------------------------------------------------------------------------------------- |
| Test Case ID    | TC-AUTH-001                                                                                             |
| API Group       | Authentication API                                                                                      |
| Method          | POST                                                                                                    |
| Endpoint        | `/api/auth/register`                                                                                    |
| Preconditions   | Backend API is running. Database is connected. Email address is not already registered.                 |
| Request Body    | `{"name":"Postman Test User","email":"postman.user@example.com","password":"Password123!"}`             |
| Expected Result | API returns a successful response with the created user data. Response does not include `passwordHash`. |
| Actual Result   | To be tested                                                                                            |
| Status          | Not Run                                                                                                 |
| Notes           | Use a unique email address for each test run to avoid duplicate email conflicts.                        |

#### TC-AUTH-002: Login With Valid Credentials

| Field           | Details                                                                  |
| --------------- | ------------------------------------------------------------------------ |
| Test Case ID    | TC-AUTH-002                                                              |
| API Group       | Authentication API                                                       |
| Method          | POST                                                                     |
| Endpoint        | `/api/auth/login`                                                        |
| Preconditions   | Seed user exists in the database. Backend API is running.                |
| Request Body    | `{"email":"admin@campusflow.dev","password":"Password123!"}`             |
| Expected Result | API returns a successful response with user data and a JWT access token. |
| Actual Result   | To be tested                                                             |
| Status          | Not Run                                                                  |
| Notes           | Save the returned JWT token for authenticated requests.                  |

#### TC-AUTH-003: Get Current User With Valid JWT Token

| Field           | Details                                                                          |
| --------------- | -------------------------------------------------------------------------------- |
| Test Case ID    | TC-AUTH-003                                                                      |
| API Group       | Authentication API                                                               |
| Method          | GET                                                                              |
| Endpoint        | `/api/auth/me`                                                                   |
| Preconditions   | User is logged in and a valid JWT token is available.                            |
| Request Body    | None                                                                             |
| Expected Result | API returns a successful response with the current authenticated user's profile. |
| Actual Result   | To be tested                                                                     |
| Status          | Not Run                                                                          |
| Notes           | Send the token using `Authorization: Bearer <token>`.                            |

#### TC-AUTH-004: Login With Invalid Credentials

| Field           | Details                                                            |
| --------------- | ------------------------------------------------------------------ |
| Test Case ID    | TC-AUTH-004                                                        |
| API Group       | Authentication API                                                 |
| Method          | POST                                                               |
| Endpoint        | `/api/auth/login`                                                  |
| Preconditions   | Backend API is running.                                            |
| Request Body    | `{"email":"admin@campusflow.dev","password":"WrongPassword123!"}`  |
| Expected Result | API returns an unauthorized error and does not return a JWT token. |
| Actual Result   | To be tested                                                       |
| Status          | Not Run                                                            |
| Notes           | This verifies that invalid credentials are rejected safely.        |

#### TC-AUTH-005: Get Current User Without Token

| Field           | Details                                                             |
| --------------- | ------------------------------------------------------------------- |
| Test Case ID    | TC-AUTH-005                                                         |
| API Group       | Authentication API                                                  |
| Method          | GET                                                                 |
| Endpoint        | `/api/auth/me`                                                      |
| Preconditions   | Backend API is running. No Authorization header is sent.            |
| Request Body    | None                                                                |
| Expected Result | API returns an unauthorized error because the JWT token is missing. |
| Actual Result   | To be tested                                                        |
| Status          | Not Run                                                             |
| Notes           | This verifies that protected auth routes require authentication.    |

### Ticket API Test Cases

#### TC-TICKET-001: Get Ticket Categories

| Field           | Details                                                                                         |
| --------------- | ----------------------------------------------------------------------------------------------- |
| Test Case ID    | TC-TICKET-001                                                                                   |
| API Group       | Ticket API                                                                                      |
| Method          | GET                                                                                             |
| Endpoint        | `/api/ticket-categories`                                                                        |
| Preconditions   | Backend API is running. User is logged in with a valid JWT token. Seed ticket categories exist. |
| Request Body    | None                                                                                            |
| Expected Result | API returns a successful response with a list of ticket categories.                             |
| Actual Result   | To be tested                                                                                    |
| Status          | Not Run                                                                                         |
| Notes           | Save a valid category ID for ticket creation tests.                                             |

#### TC-TICKET-002: Create Ticket

| Field           | Details                                                                                                                                                                                                                  |
| --------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Test Case ID    | TC-TICKET-002                                                                                                                                                                                                            |
| API Group       | Ticket API                                                                                                                                                                                                               |
| Method          | POST                                                                                                                                                                                                                     |
| Endpoint        | `/api/tickets`                                                                                                                                                                                                           |
| Preconditions   | User is logged in with a valid JWT token. A valid ticket category is available.                                                                                                                                          |
| Request Body    | `{"title":"Air conditioner not working","description":"The air conditioner in the library study area is not working properly.","categoryId":"<categoryId>","priority":"MEDIUM"}` |
| Expected Result | API returns a successful response with the created ticket. Ticket status is set to `PENDING`.                                                                                                                            |
| Actual Result   | To be tested                                                                                                                                                                                                             |
| Status          | Not Run                                                                                                                                                                                                                  |
| Notes           | Save the returned ticket ID for detail, status, assignment, and comment tests.                                                                                                                                           |

#### TC-TICKET-003: Get Ticket List

| Field           | Details                                                                                                                 |
| --------------- | ----------------------------------------------------------------------------------------------------------------------- |
| Test Case ID    | TC-TICKET-003                                                                                                           |
| API Group       | Ticket API                                                                                                              |
| Method          | GET                                                                                                                     |
| Endpoint        | `/api/tickets`                                                                                                          |
| Preconditions   | User is logged in with a valid JWT token. At least one ticket exists.                                                   |
| Request Body    | None                                                                                                                    |
| Expected Result | API returns a successful response with tickets visible to the authenticated user's role.                                |
| Actual Result   | To be tested                                                                                                            |
| Status          | Not Run                                                                                                                 |
| Notes           | Admin should see all tickets. General users should only see their own tickets. Technicians should see assigned tickets. |

#### TC-TICKET-004: Get Ticket Detail

| Field           | Details                                                                                                                                                                   |
| --------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Test Case ID    | TC-TICKET-004                                                                                                                                                             |
| API Group       | Ticket API                                                                                                                                                                |
| Method          | GET                                                                                                                                                                       |
| Endpoint        | `/api/tickets/:id`                                                                                                                                                        |
| Preconditions   | User is logged in with a valid JWT token. A ticket exists and the user has permission to view it.                                                                         |
| Request Body    | None                                                                                                                                                                      |
| Expected Result | API returns a successful response with ticket details, including related category, creator, assigned technician when available, comments, and status logs when available. |
| Actual Result   | To be tested                                                                                                                                                              |
| Status          | Not Run                                                                                                                                                                   |
| Notes           | Replace `:id` with a real ticket ID from a create or list ticket response.                                                                                                |

#### TC-TICKET-005: Update Ticket Status

| Field           | Details                                                                                                                                          |
| --------------- | ------------------------------------------------------------------------------------------------------------------------------------------------ |
| Test Case ID    | TC-TICKET-005                                                                                                                                    |
| API Group       | Ticket API                                                                                                                                       |
| Method          | PATCH                                                                                                                                            |
| Endpoint        | `/api/tickets/:id/status`                                                                                                                        |
| Preconditions   | Admin is logged in, or assigned technician is logged in. A valid ticket exists.                                                                  |
| Request Body    | `{"status":"IN_PROGRESS"}`                                                                                                                       |
| Expected Result | API returns a successful response with the updated ticket status. A status log entry is created.                                                 |
| Actual Result   | To be tested                                                                                                                                     |
| Status          | Not Run                                                                                                                                          |
| Notes           | Replace `:id` with a real ticket ID. Valid statuses include `PENDING`, `ASSIGNED`, `IN_PROGRESS`, `WAITING_PARTS`, `COMPLETED`, and `CANCELLED`. |

#### TC-TICKET-006: Assign Ticket To Technician

| Field           | Details                                                                                                                        |
| --------------- | ------------------------------------------------------------------------------------------------------------------------------ |
| Test Case ID    | TC-TICKET-006                                                                                                                  |
| API Group       | Ticket API                                                                                                                     |
| Method          | PATCH                                                                                                                          |
| Endpoint        | `/api/tickets/:id/assign`                                                                                                      |
| Preconditions   | Admin is logged in with a valid JWT token. A valid ticket exists. A valid technician user ID is available.                     |
| Request Body    | `{"technicianId":"<technicianId>"}`                                                                                            |
| Expected Result | API returns a successful response with the ticket assigned to the technician. Ticket status is updated as expected by the API. |
| Actual Result   | To be tested                                                                                                                   |
| Status          | Not Run                                                                                                                        |
| Notes           | Replace `:id` with a real ticket ID and `<technicianId>` with a real technician user ID.                                       |

#### TC-TICKET-007: Add Ticket Comment

| Field           | Details                                                                                                 |
| --------------- | ------------------------------------------------------------------------------------------------------- |
| Test Case ID    | TC-TICKET-007                                                                                           |
| API Group       | Ticket API                                                                                              |
| Method          | POST                                                                                                    |
| Endpoint        | `/api/tickets/:id/comments`                                                                             |
| Preconditions   | User is logged in with a valid JWT token. A ticket exists and the user has permission to comment on it. |
| Request Body    | `{"message":"Technician has been notified and will inspect the issue."}`                                |
| Expected Result | API returns a successful response with the created ticket comment.                                      |
| Actual Result   | To be tested                                                                                            |
| Status          | Not Run                                                                                                 |
| Notes           | Replace `:id` with a real ticket ID.                                                                    |

#### TC-TICKET-008: Create Ticket Without Authentication

| Field           | Details                                                                                                                                                                                           |
| --------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Test Case ID    | TC-TICKET-008                                                                                                                                                                                     |
| API Group       | Ticket API                                                                                                                                                                                        |
| Method          | POST                                                                                                                                                                                              |
| Endpoint        | `/api/tickets`                                                                                                                                                                                    |
| Preconditions   | Backend API is running. No Authorization header is sent. A valid category ID is available.                                                                                                        |
| Request Body    | `{"title":"Unauthorized ticket","description":"This request should fail because no JWT token is provided.","categoryId":"<categoryId>","priority":"LOW"}` |
| Expected Result | API returns an unauthorized error and does not create a ticket.                                                                                                                                   |
| Actual Result   | To be tested                                                                                                                                                                                      |
| Status          | Not Run                                                                                                                                                                                           |
| Notes           | This verifies that ticket creation requires authentication.                                                                                                                                       |

#### TC-TICKET-009: Access Ticket Detail With Invalid Ticket ID

| Field           | Details                                                                                                                    |
| --------------- | -------------------------------------------------------------------------------------------------------------------------- |
| Test Case ID    | TC-TICKET-009                                                                                                              |
| API Group       | Ticket API                                                                                                                 |
| Method          | GET                                                                                                                        |
| Endpoint        | `/api/tickets/:id`                                                                                                         |
| Preconditions   | User is logged in with a valid JWT token.                                                                                  |
| Request Body    | None                                                                                                                       |
| Expected Result | API returns a not found or validation error response and does not return ticket data.                                      |
| Actual Result   | To be tested                                                                                                               |
| Status          | Not Run                                                                                                                    |
| Notes           | Use an invalid or non-existing ticket ID, such as `invalid-ticket-id` or a valid UUID that does not exist in the database. |

### Asset API Test Cases

#### TC-ASSET-001: Update Asset

| Field           | Details                                                                                                                                                                                                                                         |
| --------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Test Case ID    | TC-ASSET-001                                                                                                                                                                                                                                    |
| API Group       | Asset API                                                                                                                                                                                                                                       |
| Method          | PATCH                                                                                                                                                                                                                                           |
| Endpoint        | `/api/assets/:id`                                                                                                                                                                                                                               |
| Preconditions   | Backend API is running. Admin is logged in. `authToken` is available. `assetId` is available from asset creation, asset list, or the Postman environment.                                                                                        |
| Request Body    | `{"name":"Updated Classroom Projector","description":"Updated projector asset record.","categoryId":"<categoryId>","locationId":"<locationId>","departmentId":"<departmentId>","serialNumber":"SN-123456","brand":"Epson","model":"EB-X49"}` |
| Expected Result | API returns a successful response with the updated asset. The asset status is not changed by this endpoint.                                                                                                                                      |
| Actual Result   | To be tested                                                                                                                                                                                                                                    |
| Status          | Not Run                                                                                                                                                                                                                                         |
| Notes           | Replace `:id` with a real asset ID. Common errors: `401` when token is missing, `403` when role is not allowed, `404` when assetId does not exist, and `400` when the body is invalid or empty.                                                  |

#### TC-ASSET-002: Update Asset Status

| Field           | Details                                                                                                                                                             |
| --------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Test Case ID    | TC-ASSET-002                                                                                                                                                        |
| API Group       | Asset API                                                                                                                                                           |
| Method          | PATCH                                                                                                                                                               |
| Endpoint        | `/api/assets/:id/status`                                                                                                                                            |
| Preconditions   | Backend API is running. Admin is logged in. `authToken` is available. `assetId` is available from asset creation, asset list, or the Postman environment.                 |
| Request Body    | `{"status":"UNDER_MAINTENANCE","note":"Moved to maintenance after inspection."}`                                                                                     |
| Expected Result | API returns a successful response with the updated asset status. A status log is created when the status changes.                                                    |
| Actual Result   | To be tested                                                                                                                                                        |
| Status          | Not Run                                                                                                                                                             |
| Notes           | Replace `:id` with a real asset ID. Common errors: `401` when token is missing, `403` when role is not allowed, `404` when assetId does not exist, and `400` when the status/body is invalid. |
