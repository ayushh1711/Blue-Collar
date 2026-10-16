# Setup Guide

This guide walks you through setting up and running the **BlueCollar** On-Demand Home Services Platform locally.

## Prerequisites

- **Node.js**: v18.0.0 or higher
- **npm**: v9.0.0 or higher
- **PostgreSQL**: v14 or higher running locally (or hosted database such as Supabase/Railway)

---

## 1. Environment Configuration

### Backend (`server/.env`)

Ensure `server/.env` exists with the following configuration:

```env
DATABASE_URL="postgresql://username:password@localhost:5432/home_services_db?schema=public"
JWT_SECRET="your-super-secret-jwt-key"
JWT_EXPIRE="7d"
PORT=5000
NODE_ENV="development"
CLIENT_URL="http://localhost:5173"
```

---

## 2. Backend Setup

```bash
cd server
npm install
npm run prisma:generate
npm run prisma:migrate
node prisma/seed.js
```

Seeding creates test accounts for each role:
- **Customer**: `customer@test.com` / `password123`
- **Provider**: `provider@test.com` / `password123`
- **Admin**: `admin@test.com` / `password123`

---

## 3. Frontend Setup

```bash
cd ../client
npm install
```

---

## 4. Verification

Run the project verification script from the root workspace:

```bash
node verify-setup.js
```
