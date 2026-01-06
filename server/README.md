# Bus Tracking System - Backend Server

## 📋 Overview
Node.js/Express backend server with MongoDB for the Bus Tracking System. Handles authentication, user management, and real-time bus tracking data.

## 🗄️ Database Schema

### User Model
- **Fields:**
  - `username` (String, unique, required)
  - `password` (String, hashed, required)
  - `role` (enum: 'student', 'driver', 'admin')
  - `name` (String, required)
  - `email` (String)
  - `phone` (String)
  - `studentId` (String, for students)
  - `busId` (ObjectId, assigned bus for students)
  - `licenseNumber` (String, for drivers)
  - `assignedBusId` (ObjectId, for drivers)
  - `isActive` (Boolean)
  - `lastLogin` (Date)

### Bus Model
- **Fields:**
  - `busId` (String, unique)
  - `name` (String)
  - `routeName` (String)
  - `capacity` (Number)
  - `currentPassengers` (Number)
  - `driver` (ObjectId, ref: User)
  - `status` (enum: 'active', 'inactive', 'delayed', 'maintenance')
  - `currentLocation` (lat/lng)
  - `lastUpdated` (Date)

## 🚀 Setup Instructions

### 1. Install MongoDB
Download and install MongoDB Community Server from: https://www.mongodb.com/try/download/community

### 2. Install Dependencies
```bash
cd server
npm install
```

### 3. Configure Environment
The `.env` file is already created with default settings. You can modify it if needed:
- `MONGODB_URI`: MongoDB connection string
- `JWT_SECRET`: Secret key for JWT tokens
- `PORT`: Server port (default: 5000)

### 4. Seed Database
Populate the database with sample data:
```bash
npm run seed
```

### 5. Start Server
```bash
# Development mode with auto-reload
npm run dev

# Production mode
npm start
```

## 🔐 Sample Login Credentials

### Admin
- Username: `admin`
- Password: `admin123`

### Drivers
- Username: `driver1`, `driver2`, `driver3`
- Password: `driver123`

### Students
- Username: `student1`, `student2`, `student3`
- Password: `student123`

## 📡 API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `POST /api/auth/logout` - Logout user
- `GET /api/auth/profile` - Get user profile (protected)
- `GET /api/auth/verify` - Verify JWT token (protected)

### Health Check
- `GET /api/health` - Server health status

## 🔧 Technologies Used
- **Express.js** - Web framework
- **MongoDB** - Database
- **Mongoose** - ODM
- **JWT** - Authentication
- **bcryptjs** - Password hashing
- **CORS** - Cross-origin resource sharing
- **dotenv** - Environment variables

## 📝 Notes
- Passwords are automatically hashed before storing in database
- JWT tokens expire after 7 days
- All protected routes require Bearer token in Authorization header
- Role-based access control is implemented
