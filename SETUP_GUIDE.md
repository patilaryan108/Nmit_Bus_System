# Bus Tracking System - Complete Setup Guide

## ✅ Setup Complete!

Your bus tracking system now has a complete database integration with authentication.

## 🗂️ Project Structure

```
bus-tracking/
├── server/                    # Backend Server
│   ├── config/
│   │   └── database.js       # MongoDB connection
│   ├── controllers/
│   │   └── authController.js # Auth logic
│   ├── middleware/
│   │   └── auth.js           # JWT authentication
│   ├── models/
│   │   ├── User.js           # User schema
│   │   └── Bus.js            # Bus schema
│   ├── routes/
│   │   └── authRoutes.js     # Auth routes
│   ├── seeders/
│   │   └── seed.js           # Sample data
│   ├── .env                   # Environment config
│   ├── server.js             # Main server file
│   └── package.json
│
└── src/                      # Frontend (React + Vite)
    ├── components/
    ├── context/
    ├── services/
    │   └── api.js            # Updated with real API calls
    └── ...

```

## 🚀 How to Run

### Step 1: Install MongoDB
1. Download MongoDB Community Server: https://www.mongodb.com/try/download/community
2. Install and start MongoDB service
3. MongoDB should run on `mongodb://localhost:27017`

### Step 2: Start Backend Server
```bash
# Open Terminal 1
cd server
npm run seed          # Seed database with sample data
npm run dev           # Start backend server on port 5000
```

### Step 3: Start Frontend
```bash
# Open Terminal 2
cd ..
npm run dev           # Start React app on port 5173
```

### Step 4: Access Application
- Frontend: http://localhost:5173
- Backend API: http://localhost:5000
- API Health: http://localhost:5000/api/health

## 🔐 Login Credentials

### 👨‍💼 Admin
- **Username:** `admin`
- **Password:** `admin123`
- **Access:** Full system monitoring and management

### 🚗 Drivers (3 users)
- **Username:** `driver1`, `driver2`, `driver3`
- **Password:** `driver123`
- **Access:** Trip management, location tracking

### 🎓 Students (3 users)
- **Username:** `student1`, `student2`, `student3`
- **Password:** `student123`
- **Access:** Track assigned bus, view ETA

## 🗄️ Database Details

### Collections:
1. **users** - Stores all user accounts (students, drivers, admins)
2. **buses** - Stores bus information and status

### User Schema Features:
- ✅ Password hashing with bcrypt
- ✅ Role-based authentication (student/driver/admin)
- ✅ JWT token generation
- ✅ Last login tracking
- ✅ Active/inactive status

### Bus Schema Features:
- ✅ Real-time location tracking
- ✅ Driver assignment
- ✅ Status management (active/inactive/delayed/maintenance)
- ✅ Passenger capacity tracking

## 📡 API Endpoints

### Authentication
```
POST   /api/auth/register    - Register new user
POST   /api/auth/login       - Login and get JWT token
POST   /api/auth/logout      - Logout user
GET    /api/auth/profile     - Get user profile (requires auth)
GET    /api/auth/verify      - Verify JWT token
```

### Request/Response Examples

#### Login Request
```json
{
  "username": "student1",
  "password": "student123",
  "role": "student"
}
```

#### Login Response
```json
{
  "success": true,
  "message": "Login successful",
  "data": {
    "user": {
      "_id": "...",
      "username": "student1",
      "role": "student",
      "name": "John Doe",
      "busId": "..."
    },
    "token": "eyJhbGc..."
  }
}
```

## 🔧 Configuration

### Backend (.env)
```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/bus_tracking
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production-12345
CLIENT_URL=http://localhost:5173
```

### Frontend (api.js)
- Base URL: `http://localhost:5000`
- Auto JWT token handling
- Auto redirect on 401 (unauthorized)

## 🛠️ Technologies Used

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **MongoDB** - NoSQL database
- **Mongoose** - MongoDB ODM
- **JWT** - Authentication tokens
- **bcryptjs** - Password hashing
- **CORS** - Cross-origin requests
- **dotenv** - Environment variables

### Frontend
- **React 18** - UI framework
- **Vite** - Build tool
- **React Router** - Navigation
- **Axios** - HTTP client
- **Google Maps API** - Mapping

## 📝 How Authentication Works

1. **User Login:**
   - User enters credentials (username, password, role)
   - Backend verifies credentials from database
   - If valid, generates JWT token
   - Token stored in localStorage
   - User redirected to dashboard

2. **Protected Routes:**
   - Token sent in Authorization header
   - Backend verifies token on each request
   - If invalid/expired, user logged out

3. **Password Security:**
   - Passwords hashed with bcrypt (10 rounds)
   - Never stored as plain text
   - Compared using bcrypt.compare()

## 🎯 Next Steps

Your system is now ready! You can:
1. ✅ Login with any of the sample accounts
2. ✅ Data persists in MongoDB database
3. ✅ Add new users via registration
4. ✅ Users are authenticated against stored passwords
5. ✅ Continue building additional features

## 🔍 Troubleshooting

### MongoDB Connection Error
```bash
# Check if MongoDB is running
mongosh
# or
mongo
```

### Port Already in Use
```bash
# Change PORT in server/.env file
PORT=5001
```

### Frontend Can't Connect to Backend
- Verify backend is running on port 5000
- Check CORS configuration in server.js
- Check baseURL in src/services/api.js

## 📞 Need Help?
- Check MongoDB connection: `mongosh`
- Check backend health: http://localhost:5000/api/health
- View server logs in terminal
- Check browser console for frontend errors
