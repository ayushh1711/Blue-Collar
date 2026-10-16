# 🚀 BlueCollar Deployment Guide (Unified Render + Neon DB)

This setup runs your **entire platform (Frontend + Backend + WebSockets)** on **Render** connected to your **Neon PostgreSQL** database.

You get:
- **1 single live link** for your resume and portfolio (e.g. `https://bluecollar.onrender.com`).
- **100% Free permanent hosting** (no 30-day database expiry).
- **Zero CORS issues** because frontend and backend share the exact same domain.

---

## 🏗️ Architecture

| Component | Platform | Purpose |
| :--- | :--- | :--- |
| **Database** | [Neon](https://neon.tech) | Free Serverless Cloud PostgreSQL *(Already Created!)* |
| **Full-Stack App** | [Render](https://render.com) | Express + Socket.io serving React Vite SPA |

---

## Step 1: Deploy on Render

1. Go to **[dashboard.render.com](https://dashboard.render.com)** and sign in with GitHub.
2. Click **"New +"** (top right) → Choose **"Web Service"**.
3. Select **"Build and deploy from a Git repository"** → pick your `ayushh1711/Blue-Collar` repository.
4. Fill in the service details:
   - **Name**: `bluecollar` *(or any name you like; this becomes your URL)*
   - **Region**: `Singapore (Southeast Asia)` *(matches your Neon database region for fast speed)*
   - **Branch**: `main`
   - **Root Directory**: *(Leave blank)*
   - **Runtime**: `Node`
   - **Build Command**:
     ```bash
     cd client && npm install && npm run build && cd ../server && npm install && npx prisma generate
     ```
     *(or simply `npm run build`)*
   - **Start Command**:
     ```bash
     cd server && npx prisma migrate deploy && node prisma/seed.js && node src/server.js
     ```
     *(or simply `npm start`)*
   - **Instance Type**: `Free`

5. Scroll down to **"Environment Variables"** and add:

   | Key | Value |
   | :--- | :--- |
   | `DATABASE_URL` | `postgresql://neondb_owner:npg_Y3FKcEvi2psy@ep-broad-resonance-a0ozhz29.c-2.ap-southeast-1.aws.neon.tech/neondb?sslmode=require` |
   | `NODE_ENV` | `production` |
   | `JWT_SECRET` | `bluecollar_super_secret_jwt_key_2026_xyz` |
   | `JWT_EXPIRE` | `7d` |
   | `CLIENT_URL` | `*` |

6. Click **"Create Web Service"**.

---

## 🎯 Live Demo Credentials for Resume & Portfolio

Your database is automatically seeded with demo accounts:

| Role | Email | Password | Features to Showcase |
| :--- | :--- | :--- | :--- |
| **Customer** | `customer@test.com` | `password123` | Browse 6 services, view interactive provider map, book services, submit reviews |
| **Provider** | `provider@test.com` | `password123` | Toggle availability status, accept/reject booking requests, live status updates (On Way, In Progress, Completed) |
| **Admin** | `admin@test.com` | `password123` | Analytics dashboard, provider verification, revenue and booking management |

---

## 💡 Resume & Portfolio Bullet Points

- **Live Demo**: `https://<your-service-name>.onrender.com`
- **GitHub**: `https://github.com/ayushh1711/Blue-Collar`
- **Tech Stack**: React 18, Vite, Tailwind CSS, Leaflet, Node.js, Express, Socket.io, Prisma ORM, Neon PostgreSQL, Render.
- **Description**: Full-stack on-demand home services platform with real-time WebSocket state management, geolocation provider mapping, multi-role RBAC security, and automated cloud CI/CD.
