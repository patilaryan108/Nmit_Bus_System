# Setup Instructions for Team Members

## 🚀 Quick Start (For Your Friends)

### 1. Clone the Repository
```bash
git clone <your-repo-url>
cd bus-tracking
```

### 2. Install Dependencies

**Frontend:**
```bash
npm install
```

**Backend:**
```bash
cd server
npm install
```

### 3. Configure Environment
Create `server/.env` file and ask the team lead for the MongoDB connection string:

```env
PORT=5000
NODE_ENV=development
MONGODB_URI=<ask-team-lead-for-this>
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production-12345
CLIENT_URL=http://localhost:5173
TOKEN_EXPIRY=7d
```

**⚠️ IMPORTANT:** Never commit the `.env` file to Git (it's already in `.gitignore`)

### 4. Start the Application

**Terminal 1 - Backend:**
```bash
cd server
npm run dev
```

**Terminal 2 - Frontend:**
```bash
npm run dev
```

### 5. Access the App
- Frontend: http://localhost:5173
- Backend: http://localhost:5000

## 🔐 Login Credentials

### Admin
- Username: `admin`
- Password: `admin123`

### Drivers
- Username: `driver1`, `driver2`, `driver3`
- Password: `driver123`

### Students
- Username: `student1`, `student2`, `student3`
- Password: `student123`

## 💾 Database

**Type:** MongoDB Atlas (Cloud)
- ✅ Everyone uses the **same database**
- ✅ Data is **shared** across all team members
- ✅ No need to install MongoDB locally
- ✅ Works from anywhere

## 📝 Important Notes

1. **DO NOT** commit `.env` file
2. Get MongoDB URI from team lead privately
3. All team members see the same data
4. Database is already seeded with test accounts
5. Any changes you make are visible to everyone

## 🆘 Troubleshooting

**Port already in use:**
- Change PORT in `server/.env`

**Cannot connect to database:**
- Check MongoDB URI in `.env`
- Ensure your IP is whitelisted in MongoDB Atlas

**Frontend can't connect to backend:**
- Make sure backend is running on port 5000
- Check CORS settings in `server/server.js`
