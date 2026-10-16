# Features Overview

BlueCollar is an on-demand home services marketplace designed for seamless interaction between Customers, Providers, and Administrators.

## Core Features

### 👤 Customer Features
- **Browse & Search Services**: Catalog of services with transparent upfront base pricing.
- **Instant Booking**: Date, time, and address selector with interactive modals.
- **Live Status Tracking**: Instant updates as provider status changes (`PENDING` → `ACCEPTED` → `ON_WAY` → `IN_PROGRESS` → `COMPLETED`).
- **Rating & Reviews**: 5-star interactive rating system with feedback comments for completed services.
- **Booking History**: Overview of past bookings, payments, and reviews.

### 🛠️ Provider Features
- **Availability Toggle**: Real-time Online/Offline switch to control job request notifications.
- **Job Requests & Dispatch**: Accept or reject incoming service requests in real-time.
- **Status Lifecycle Progression**: Update workflow stages:
  - *Accept Job*
  - *On the Way*
  - *In Progress*
  - *Completed*
- **Work History & Performance**: Track total completed jobs, customer ratings, and reviews.

### 🛡️ Administrator Features
- **Executive KPI Metrics**: Gross platform volume, active bookings count, registered provider counts, and available service categories.
- **Service Catalog Management**: Add new service categories with custom descriptions, base pricing, and icons.
- **Provider Registry**: Audit provider skills, rates, verification status, and ratings.
- **Bookings Oversight**: Filter and search all historical and active bookings across the entire platform.

### ⚡ Technical Capabilities
- **WebSockets (Socket.io)**: Decoupled real-time bidirectional communication between customers and providers.
- **Persistent Auth**: Automatic session restoration on reload using JWT in HttpOnly cookies.
- **Prisma ORM**: Relational modeling with PostgreSQL.
