# Manual API Testing

This document describes manual API testing for the CampusFlow backend API.

## Testing Scope

The current testing scope covers:

1. Authentication API
2. Ticket API

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

## Test Case Format

Each test case should include:

| Field           | Description                   |
| --------------- | ----------------------------- |
| Test Case ID    | Unique test case ID           |
| API             | API endpoint being tested     |
| Method          | HTTP method                   |
| Preconditions   | Required state before testing |
| Request Body    | Input data                    |
| Expected Result | Expected API response         |
| Actual Result   | Actual API response           |
| Status          | Pass or Fail                  |
| Notes           | Additional notes              |

## Test Cases

Test cases will be added step by step.
