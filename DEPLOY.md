# Deployment Guide

## Architecture
- **Backend + Database** → Railway
- **Frontend** → Vercel

---

## Step 1: Push to GitHub

Make sure your project is on GitHub. If not:

```bash
git init
git add .
git commit -m "initial commit"
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO.git
git push -u origin main
```

---

## Step 2: Deploy Backend on Railway

1. Go to [railway.app](https://railway.app) and sign in with GitHub
2. Click **"New Project"** → **"Deploy from GitHub repo"**
3. Select your repository
4. Railway will detect it's a Node.js app

### Set the root directory
In Railway project settings → **Root Directory** → set to `server`

### Add PostgreSQL database
1. In your Railway project, click **"New"** → **"Database"** → **"PostgreSQL"**
2. Railway automatically sets `DATABASE_URL` — no action needed

### Set environment variables
In Railway → your service → **Variables** tab, add:

```
NODE_ENV=production
JWT_SECRET=pick-any-long-random-string-here
JWT_EXPIRE=7d
CLIENT_URL=https://your-app.vercel.app
```
(Set CLIENT_URL after you deploy the frontend)

### Get your Railway backend URL
After deploy, Railway gives you a URL like:
`https://your-app-name.up.railway.app`

Save this — you need it for the frontend.

---

## Step 3: Deploy Frontend on Vercel

1. Go to [vercel.com](https://vercel.com) and sign in with GitHub
2. Click **"New Project"** → import your repository
3. Set **Root Directory** to `client`
4. Under **Environment Variables**, add:
   ```
   VITE_API_URL=https://your-app-name.up.railway.app
   ```
5. Click **Deploy**

---

## Step 4: Update CORS on Railway

Once you have your Vercel URL, go back to Railway → Variables and update:
```
CLIENT_URL=https://your-actual-vercel-url.vercel.app
```

Then redeploy the Railway service.

---

## Step 5: Seed the database (optional)

To add the default services (Plumbing, Electrical, etc.) to the live database:

In Railway → your service → **Shell** tab:
```bash
node prisma/seed.js
```

---

## Done!

- Frontend: `https://your-app.vercel.app`
- Backend: `https://your-app-name.up.railway.app`
- Both are live and connected

---

## Local development still works

Nothing changed for local dev. Just run:
```bash
# Terminal 1
cd server && npm run dev

# Terminal 2
cd client && npm run dev
```
