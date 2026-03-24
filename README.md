# Home Services Platform

An on-demand home services marketplace connecting customers with service providers (Electricians, Plumbers, Cleaners, etc.).

## Tech Stack

### Frontend
- React.js with Vite
- Tailwind CSS
- Lucide React (icons)
- Zustand (state management)
- React Router DOM
- Leaflet.js (maps)

### Backend
- Node.js with Express.js
- PostgreSQL with Prisma ORM
- JWT Authentication (HttpOnly cookies)
- bcryptjs for password hashing

## Getting Started

### Prerequisites
- Node.js (v18 or higher)
- PostgreSQL database

### Installation

1. Clone the repository
2. Set up the backend:

```bash
cd server
npm install
```

3. Create `.env` file in server directory:

```env
DATABASE_URL="postgresql://username:password@localhost:5432/home_services_db"
JWT_SECRET="your-super-secret-jwt-key-change-this"
JWT_EXPIRE="7d"
PORT=5000
NODE_ENV="development"
CLIENT_URL="http://localhost:5173"
```

4. Run Prisma migrations:

```bash
npm run prisma:migrate
npm run prisma:generate
```

5. Set up the frontend:

```bash
cd ../client
npm install
```

### Running the Application

1. Start the backend server:

```bash
cd server
npm run dev
```

2. Start the frontend (in a new terminal):

```bash
cd client
npm run dev
```

The application will be available at:
- Frontend: http://localhost:5173
- Backend: http://localhost:5000

## Features

### Customer Features
- Browse service categories
- Book services with date/time selection
- Track booking status
- View booking history
- Rate and review providers

### Provider Features
- Toggle availability (Online/Offline)
- Receive job requests
- Accept/reject bookings
- Update job status (On Way → In Progress → Completed)
- View earnings and ratings

### Admin Features
- Manage users
- Verify provider documents
- View platform analytics

## Database Schema

- **Users**: Customer, Provider, and Admin accounts
- **ProviderProfile**: Provider-specific data (skills, rates, ratings)
- **Services**: Predefined service categories
- **Bookings**: Service requests with status tracking
- **Reviews**: Customer ratings and feedback

## API Endpoints

### Authentication
- POST `/api/auth/signup` - Register new user
- POST `/api/auth/login` - Login user
- POST `/api/auth/logout` - Logout user
- GET `/api/auth/me` - Get current user

### Services
- GET `/api/services` - Get all services
- GET `/api/services/:id` - Get service by ID
- POST `/api/services` - Create service (Admin only)

### Providers
- GET `/api/providers` - Get all providers
- GET `/api/providers/:id` - Get provider details
- PATCH `/api/providers/profile` - Update provider profile
- PATCH `/api/providers/availability` - Toggle availability
- PATCH `/api/providers/location` - Update location

### Bookings
- POST `/api/bookings` - Create booking
- GET `/api/bookings` - Get user bookings
- GET `/api/bookings/:id` - Get booking details
- PATCH `/api/bookings/:id/accept` - Accept booking
- PATCH `/api/bookings/:id/reject` - Reject booking
- PATCH `/api/bookings/:id/status` - Update status
- DELETE `/api/bookings/:id` - Cancel booking

### Reviews
- POST `/api/reviews` - Create review
- GET `/api/reviews/provider/:id` - Get provider reviews

## Verification

Run the setup verification script:
```bash
node verify-setup.js
```

This will check that all files are in place.

## Documentation

- **QUICK_START.md** - Get running in 5 minutes
- **SETUP.md** - Detailed setup instructions
- **FEATURES.md** - Complete feature list
- **BOOKING_SYSTEM.md** - Booking system documentation
- **ROLE_BASED_ACCESS.md** - Role-based access control guide

## Project Status

✅ **Fully Functional MVP**
- User authentication (Customer, Provider, Admin)
- Role-based access control (Providers cannot book services)
- Service browsing and booking (Customers only)
- Provider job management
- Real-time status updates
- Role-based dashboards
- Responsive design

## Tech Highlights

- **Type-safe database** with Prisma ORM
- **JWT authentication** with HttpOnly cookies
- **Role-based access control** on all routes
- **Optimistic UI updates** with Zustand
- **Mobile-first responsive** design
- **RESTful API** architecture

## Support

For issues or questions:
1. Check the documentation files
2. Review code comments
3. Check the troubleshooting section in SETUP.md

## License

MIT
