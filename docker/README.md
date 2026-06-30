# CampusFlow Docker

This folder contains Docker-related documentation for CampusFlow.

## Current Docker Setup

The project currently uses Docker Compose to run a local PostgreSQL database for development.

The main Docker Compose file is located at the project root:

```txt
docker-compose.yml
```

## Local PostgreSQL Service

Service name:

```txt
postgres
```

Container name:

```txt
campusflow-postgres
```

Local database configuration:

```txt
Host: localhost
Port: 5432
Database: campusflow
User: postgres
Password: postgres
```

Local development connection string:

```txt
postgresql://postgres:postgres@localhost:5432/campusflow?schema=public
```

## Start PostgreSQL

From the project root:

```bash
docker compose up -d
```

## Check Running Containers

```bash
docker ps
```

## View PostgreSQL Logs

```bash
docker logs campusflow-postgres
```

## Stop PostgreSQL

```bash
docker compose down
```

## Stop PostgreSQL and Remove Local Data

Use this only when you want to reset the local database completely:

```bash
docker compose down -v
```

## Important Notes

This Docker setup is for local development only.

Do not use the local development password in production.

Real production database credentials must be stored in environment variables and must never be committed to Git.
