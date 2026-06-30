# CampusFlow Postman Collection

This folder contains Postman resources for testing the CampusFlow backend API.

## Contents

- `collections/` - Postman collection files
- `environments/` - Postman environment files

## API Coverage

Current API testing scope:

- Authentication API
  - Register
  - Login
  - Get current user

- Ticket API
  - Get ticket categories
  - Create ticket
  - Get ticket list
  - Get ticket detail
  - Update ticket status
  - Assign ticket
  - Add ticket comment

## Local API Base URL

```txt
http://localhost:4000
```

> If the backend runs on a different port, update the `baseUrl` value in the Postman environment file.

## Postman Environment

Use the local environment file:

```txt
postman/environments/CampusFlow Local.postman_environment.json
```

Environment variables:

| Variable          | Description                                                           |
| ----------------- | --------------------------------------------------------------------- |
| `baseUrl`         | Local backend API URL                                                 |
| `authToken`       | JWT token after login                                                 |
| `ticketId`        | Ticket ID used for ticket detail, status update, assign, and comments |
| `categoryId`      | Ticket category ID used when creating a ticket                        |
| `technicianId`    | Technician user ID used when assigning a ticket                       |
| `adminEmail`      | Seed admin account email                                              |
| `technicianEmail` | Seed technician account email                                         |
| `userEmail`       | Seed normal user account email                                        |
| `managerEmail`    | Seed manager account email                                            |
| `defaultPassword` | Default password for seed accounts                                    |

## How to Use

1. Start the local PostgreSQL database.
2. Start the backend API server.
3. Import the Postman environment file.
4. Select the `CampusFlow Local` environment in Postman.
5. Test the health check endpoint:

```txt
GET {{baseUrl}}/health
```

Expected result:

```json
{
  "status": "ok"
}
```

## Notes

The Postman collection is used for manual API testing and portfolio documentation.

The backend API must be running before sending requests from Postman. If the server is not running, Postman may show an error such as:

```txt
Error: connect ECONNREFUSED 127.0.0.1:4000
```
