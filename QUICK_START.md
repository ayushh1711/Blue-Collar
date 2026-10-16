# Quick Start Guide

Get BlueCollar up and running in under 2 minutes.

## 1. Start Backend (Terminal 1)

```bash
cd server
npm run dev
```
Backend will start on `http://localhost:5000`.

---

## 2. Start Frontend (Terminal 2)

```bash
cd client
npm run dev
```
Frontend will be accessible at `http://localhost:5173`.

---

## 3. Demo Accounts

| Role | Email | Password | Dashboard URL |
| :--- | :--- | :--- | :--- |
| **Customer** | `customer@test.com` | `password123` | `http://localhost:5173/customer/dashboard` |
| **Provider** | `provider@test.com` | `password123` | `http://localhost:5173/provider/dashboard` |
| **Admin** | `admin@test.com` | `password123` | `http://localhost:5173/admin/dashboard` |

---

## 4. Testing End-to-End Workflow

1. Log in as **Customer** (`customer@test.com`), click "Book a service", select a category, pick a date/time, and submit.
2. In a separate tab/incognito window, log in as **Provider** (`provider@test.com`). Under "New Job Requests", see the real-time request and click **Accept**.
3. Advance the job status from **Accepted** → **On Way** → **In Progress** → **Completed**.
4. Switch back to Customer tab: see real-time updates and click **Write Review** to submit a star rating and feedback.
5. Log in as **Admin** (`admin@test.com`): monitor gross volume, active bookings, add new services, and view provider metrics.
