# Ticket Management System

## Overview
A ticket management system for events with status tracking and validation.

## Features
- Ticket lifecycle management (Pending → Confirmed/Cancelled)
- Status transition validation
- Barcode generation
- Audit logging
- OpenAPI/Swagger documentation

## Tech Stack
- Node.js/TypeScript
- Prisma ORM
- PostgreSQL
- Zod for validation
- Express.js

## Getting Started

### Prerequisites
```bash
node >= 18
postgresql >= 14
```

## Development
```
# Clone repository
git clone <repo-url>

# Install dependencies
npm install

# Setup environment
cp .env.example .env

# Start PostgreSQL using Docker (Optional)
docker compose up -d --build

# Generate Prisma client
npm run schema.generate

# Prepare the database
npm run migration:apply
npx prisma db seed

# Start development server
npm run start:dev
```

## API Documentation
Swagger documentation available at `/api-docs`
