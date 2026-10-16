# 🚀 BlueCollar Deployment Guide (Neon + Render + Vercel)

This guide walks you through deploying BlueCollar for **100% Free** permanent hosting with a live demo link for your resume and portfolio.

---

## 🏗️ Architecture Overview

| Component | Platform | Plan | Purpose |
| :--- | :--- | :--- | :--- |
| **Database** | [Neon](https://neon.tech) | Free Forever | Cloud Serverless PostgreSQL |
| **Backend** | [Render](https://render.com) | Free Web Service | Node.js + Express + Socket.io |
| **Frontend** | [Vercel](https://vercel.com) | Free Hobby | React + Vite Single Page App |

---

## Step 1: Database (Neon PostgreSQL) ✅ ALREADY CREATED

You already created your database on Neon!

Your connection string is:
```text
postgresql://neondb_owner:npg_Y3FKcEvi2psy@ep-broad-resonance-a0ozhz29.c-2.ap-southeast-1.aws.neon.tech/neondb?sslmode=require
```

*(Keep this ready — you will paste it into Render in Step 3).*

---

## Step 2: Push Latest Code to GitHub

Before deploying to Render and Vercel, push all production optimizations:

```bash
git add .
git commit -m "chore: optimize for Neon, Render and Vercel deployment"
git push origin main
```

---

## Step 3: Deploy Backend on Render

1. Go to **[dashboard.render.com](https://dashboard.render.com)** and sign in with GitHub.
2. Click **"New +"** (top right) → Select **"Web Service"**.
3. Choose **"Build and deploy from a Git repository"** and select `ayushh1711/Blue-Collar`.
4. Configure the settings:
   - **Name**: `bluecollar-backend` (or any name you like)
   - **Region**: `Singapore (Southeast Asia)` *(recommended: matches your Neon DB region for ultra-fast latency)*
   - **Branch**: `main`
   - **Root Directory**: `server`
   - **Runtime**: `Node`
   - **Build Command**: `npm install && npx prisma generate`
   - **Start Command**: `npx prisma migrate deploy && npm run seed && node src/server.js`
   - **Instance Type**: `Free`
5. Scroll down to **"Environment Variables"** and add:

   | Key | Value |
   | :--- | :--- |
   | `DATABASE_URL` | `postgresql://neondb_owner:npg_Y3FKcEvi2psy@ep-broad-resonance-a0ozhz29.c-2.ap-southeast-1.aws.neon.tech/neondb?sslmode=require` |
   | `NODE_ENV` | `production` |
   | `JWT_SECRET` | `bluecollar_super_secret_jwt_key_2026_xyz` *(or any long random string)* |
   | `JWT_EXPIRE` | `7d` |
   | `CLIENT_URL` | `*` |

6. Click **"Create Web Service"**.
7. Render will build the server, run the database migrations on Neon, seed the demo accounts and services, and start the app.
8. Once the deploy completes and logs say `Server running on port 10000`, copy your Render backend URL:
   `https://bluecollar-backend.onrender.com`

---

## Step 4: Deploy Frontend on Vercel

1. Go to **[vercel.com](https://vercel.com)** and sign in with GitHub.
2. Click **"Add New..."** → **"Project"**.
3. Select `Blue-Collar` repository.
4. In the project setup screen:
   - **Framework Preset**: `Vite` (automatically detected)
   - **Root Directory**: Click *Edit* and select `client`
5. Expand **"Environment Variables"** and add:

   | Key | Value |
   | :--- | :--- |
   | `VITE_API_URL` | `https://your-backend-name.onrender.com` *(paste your Render backend URL from Step 3 without a trailing slash)* |

6. Click **"Deploy"**.
7. In ~30 seconds, Vercel gives you your live link:
   `https://blue-collar-yourname.vercel.app`

---

## 🎯 Live Demo Credentials for Resume & Portfolio

Your database is automatically seeded with demo accounts:

| Role | Email | Password | Features to Showcase |
| :--- | :--- | :--- | :--- |
| **Customer** | `customer@test.com` | `password123` | Browse 6 services, real-time map provider selection, book jobs, review system |
| **Provider** | `provider@test.com` | `password123` | Toggle availability status, accept/reject bookings, manage live job states (On Way, In Progress, Complete) |
| **Admin** | `admin@test.com` | `password123` | Platform-wide analytics, manage registered providers, verify documents, view revenue |

---

## 💡 Portfolio / Resume Showcase Tips

When adding this project to your resume or portfolio:

- **Live Demo Link**: `https://your-frontend.vercel.app`
- **GitHub Link**: `https://github.com/ayushh1711/Blue-Collar`
- **Tech Stack Bullet**: React, Vite, Tailwind CSS, Leaflet Maps, Node.js, Express, Socket.io, Prisma ORM, Neon PostgreSQL, Vercel, Render.
- **Key Highlights**:
  - Full-stack on-demand home service marketplace with real-time Socket.io state synchronization.
  - Interactive Leaflet map integration for live provider geocoding and location tracking.
  - Multi-role RBAC authentication (Customer, Verified Service Provider, Platform Administrator).
  - Production-ready cloud infrastructure using serverless Neon PostgreSQL, auto-scaling frontend on Vercel, and containerized backend on Render.
