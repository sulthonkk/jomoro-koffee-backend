# Jomoro Koffee - Backend

Backend system for Jomoro Koffee built with NestJS microservice architecture.

## Tech Stack
- NestJS
- TypeScript
- Prisma ORM v5
- MySQL
- JWT Authentication
- Swagger API Documentation

## Services

| Service | Port | Description |
|---------|------|-------------|
| Auth Service | 3001 | User registration, login, JWT |
| Product Service | 3002 | Products and categories |
| Transaction Service | 3003 | Cart and orders |

## Prerequisites
- Node.js v22.x
- MySQL (XAMPP recommended)
- npm

## Database Setup
Create these databases in MySQL:

jomoro_auth
jomoro_product
jomoro_transaction

Insert admin user manually:
```sql
INSERT INTO user (first_name, last_name, email, password, role)
VALUES ('Admin', 'Jomoro', 'admin@jomoro.com', 'admin1234', 'ADMIN');
```

## Running the Services
Open three separate terminals:

```bash
# Terminal 1 - Auth Service
cd auth-service
npm install
npx prisma db push
npm run start:dev

# Terminal 2 - Product Service
cd product-service
npm install
npx prisma db push
npm run start:dev

# Terminal 3 - Transaction Service
cd transaction-service
npm install
npx prisma db push
npm run start:dev
```

## Swagger API Docs
- Auth: http://localhost:3001/api
- Product: http://localhost:3002/api
- Transaction: http://localhost:3003/api

## Repository
https://github.com/sulthonkk/jomoro-koffee-backend