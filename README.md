<<<<<<< HEAD
# Solar API

## Project

Solar API is a NestJS backend foundation for a Bangladesh-based solar energy business platform. It includes PostgreSQL connectivity, Prisma schema, Docker-based local development, Swagger docs, and repeatable seed data for development.

## Stack

- NestJS
- TypeScript
- PostgreSQL
- Prisma ORM
- Docker
- Swagger/OpenAPI

## Installation

```bash
npm install
cp .env.example .env
```

## Environment

The application reads its configuration from a local `.env` file. Example values are provided in `.env.example`.

```bash
NODE_ENV=development
PORT=3000
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/solar_db?schema=public"
CORS_ORIGINS="http://localhost:3001,http://localhost:3002"
SWAGGER_ENABLED=true
```

## Database

```bash
npm run prisma:generate
npm run prisma:migrate
npm run prisma:seed
```

## Development

```bash
npm run start:dev
```

## Docker

```bash
docker compose up --build
```

This starts the PostgreSQL container and the NestJS backend together. Local database credentials are intentionally development-only and not production secrets.

## Health

```http
GET /api/v1/health
```

Response:

```json
{
  "success": true,
  "message": "Solar API is healthy",
  "data": {
    "status": "ok",
    "database": "connected"
  }
}
```

## Swagger

Open Swagger UI at:

```http
/api/docs
```

Swagger is enabled in development by default and can be turned off with `SWAGGER_ENABLED=false`.

## Seed Credentials

Development credentials are intentionally included in seed data for local testing only.

- Email: superadmin@solar.local
- Password: Password123!

> DEVELOPMENT ONLY: These credentials are not production credentials and must never be used in a live environment.
=======
# solar-be
solar panel selling app be
>>>>>>> 3aec28162b0d4cfa664349201bbfff362211fa60
