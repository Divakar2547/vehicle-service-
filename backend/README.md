# Vehicle Service Booking Backend API

A complete Node.js/Express backend for the Vehicle Service Booking application.

## Features

- **Authentication**: Login/Register endpoints
- **User Management**: CRUD operations for users
- **Vehicle Management**: Add/manage user vehicles
- **Service Packages**: Predefined service offerings
- **Booking System**: Create and manage service bookings
- **Payment Processing**: Handle payment records
- **Admin Logging**: Track admin activities
- **Dashboard Stats**: User-specific statistics

## Installation

```bash
cd backend
npm install
```

## Running the Server

```bash
# Development mode with auto-restart
npm run dev

# Production mode
npm start
```

Server runs on: `http://localhost:5000`

## API Endpoints

### Authentication
- `POST /api/auth/login` - User login
- `POST /api/auth/register` - User registration

### Users
- `GET /api/users` - Get all users
- `GET /api/users/:id` - Get user by ID

### Vehicles
- `GET /api/vehicles` - Get all vehicles
- `GET /api/vehicles/user/:userId` - Get user vehicles
- `POST /api/vehicles` - Add new vehicle

### Service Packages
- `GET /api/service-packages` - Get all packages
- `GET /api/service-packages/:id` - Get package by ID

### Bookings
- `GET /api/bookings` - Get all bookings
- `GET /api/bookings/user/:userId` - Get user bookings
- `POST /api/bookings` - Create new booking
- `PATCH /api/bookings/:id/status` - Update booking status

### Payments
- `GET /api/payments` - Get all payments
- `GET /api/payments/booking/:bookingId` - Get payment by booking
- `POST /api/payments` - Process payment

### Dashboard
- `GET /api/dashboard/stats/:userId` - Get user statistics

### Health Check
- `GET /api/health` - API health status

## Data Storage

Uses JSON file storage (`data/Vechile.json`) for simplicity. Data persists between server restarts.

## CORS

Enabled for all origins to support frontend development.