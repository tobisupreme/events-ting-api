# Ticket Management System

## Overview
A ticket management system for events with status tracking and validation.

## Features
- Ticket lifecycle management (Pending → Confirmed → Used/Cancelled)
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

## Installation
```
# Clone repository
git clone <repo-url>

# Install dependencies
npm install

# Setup environment
cp .env.example .env

# Start PostgreSQL using Docker (Optional)
docker compose up -d --build

# Prepare the database
npm run migration:apply
```

## Development
```
# Generate Prisma client
npx prisma generate

# Start development server
npm run dev
```

## API Documentation
Swagger documentation available at `/api-docs`
