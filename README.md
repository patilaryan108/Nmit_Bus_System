# College Bus Tracking System

A comprehensive real-time bus tracking system built with React and Google Maps integration, featuring three user roles: Students, Drivers, and Admins.

![Bus Tracking System](https://img.shields.io/badge/React-18.2.0-blue) ![Google Maps](https://img.shields.io/badge/Google%20Maps-API-green) ![Vite](https://img.shields.io/badge/Vite-5.0-purple)

## 🚀 Features

### Student Dashboard
- **Real-time Bus Tracking**: View your assigned bus location on Google Maps
- **ETA Calculation**: Get accurate arrival time using Google Distance Matrix API
- **Route Visualization**: See the complete bus route with all stops
- **Live Updates**: Automatic location updates every 5 seconds
- **Status Notifications**: Get notified about delays and bus status changes

### Driver Dashboard
- **Trip Management**: Start and end trips with one click
- **GPS Tracking**: Automatic location broadcasting to students
- **Delay Reporting**: Report delays or breakdowns instantly
- **Location Sharing**: Real-time location updates every 5 seconds
- **Trip Status**: Monitor active trip status and location accuracy

### Admin Dashboard
- **Multi-Bus Monitoring**: Track all buses on a single map
- **System Statistics**: View active, delayed, and total buses
- **Bus Management**: Monitor driver assignments and passenger counts
- **Real-time Updates**: Automatic refresh every 10 seconds
- **Status Indicators**: Color-coded bus markers based on status

## 🛠️ Technology Stack

- **Frontend**: React 18 with Vite
- **Routing**: React Router v6
- **Maps**: Google Maps JavaScript API
- **APIs Used**:
  - Google Maps SDK
  - Google Directions API (Route plotting)
  - Google Distance Matrix API (ETA calculation)
  - Geolocation API (GPS tracking)
- **Styling**: Custom CSS with dark theme and glassmorphism
- **State Management**: React Context API

## 📋 Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- Google Maps API Key

## 🔧 Installation

1. **Clone the repository**
   ```bash
   cd BUS_SYSTEM
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure Google Maps API Key**
   
   Open `src/utils/constants.js` and replace the placeholder:
   ```javascript
   export const GOOGLE_MAPS_API_KEY = 'YOUR_ACTUAL_API_KEY_HERE';
   ```

   **Required APIs to enable in Google Cloud Console:**
   - Maps JavaScript API
   - Directions API
   - Distance Matrix API
   - Geolocation API (optional)

4. **Start development server**
   ```bash
   npm run dev
   ```

   The application will open at `http://localhost:3000`

## 🎯 Usage

### Demo Mode

The application includes mock data for testing. Simply:

1. Open the application
2. Select a role (Student/Driver/Admin)
3. Click "Sign In" (no credentials required in demo mode)

### User Roles

**Student**
- View assigned bus location
- See ETA to your stop
- Track bus route in real-time

**Driver**
- Start/end trips
- Share GPS location
- Report delays or issues

**Admin**
- Monitor all buses
- View system statistics
- Track driver assignments

## 📁 Project Structure

```
BUS_SYSTEM/
├── src/
│   ├── components/
│   │   ├── auth/           # Login components
│   │   ├── student/        # Student dashboard
│   │   ├── driver/         # Driver dashboard
│   │   ├── admin/          # Admin dashboard
│   │   └── common/         # Shared components
│   ├── context/            # React Context (Auth)
│   ├── hooks/              # Custom React hooks
│   ├── services/           # API and Google Maps services
│   ├── utils/              # Helper functions and constants
│   ├── styles/             # CSS files
│   ├── App.jsx             # Main app component
│   └── main.jsx            # Entry point
├── index.html
├── package.json
└── vite.config.js
```

## 🗺️ Google Services Integration

### 1. Google Maps SDK
- Displays interactive maps
- Shows bus and stop markers
- Provides map controls

### 2. Google Directions API
- Plots bus routes on the map
- Draws polylines between stops
- Calculates optimal paths

### 3. Google Distance Matrix API
- Calculates ETA to student stops
- Provides distance information
- Updates every 10 seconds

### 4. Geolocation API
- Tracks driver GPS location
- Enables real-time position updates
- Requires HTTPS in production

## 🎨 Design Features

- **Dark Theme**: Premium dark color scheme
- **Glassmorphism**: Modern frosted glass effects
- **Responsive Design**: Works on desktop, tablet, and mobile
- **Smooth Animations**: Fade-in, slide, and pulse effects
- **Custom Gradients**: Vibrant color gradients
- **Google Fonts**: Inter and Outfit fonts

## 🔒 Security Notes

- API keys should be restricted in Google Cloud Console
- Use environment variables for production
- Implement proper authentication in production
- Enable HTTPS for geolocation features

## 🚀 Building for Production

```bash
# Build the application
npm run build

# Preview production build
npm run preview
```

The build output will be in the `dist/` directory.

## 📱 Browser Support

- Chrome (recommended)
- Firefox
- Safari
- Edge

**Note**: Geolocation requires HTTPS except on localhost.

## 🐛 Troubleshooting

### Maps not loading
- Check your Google Maps API key
- Ensure required APIs are enabled in Google Cloud Console
- Check browser console for errors

### Location not working
- Grant location permissions in browser
- Ensure HTTPS (required for production)
- Check if geolocation is supported

### ETA not calculating
- Verify Distance Matrix API is enabled
- Check API key restrictions
- Ensure valid coordinates

## 📄 License

This project is for educational purposes.

## 👥 Support

For issues or questions, please check the documentation or create an issue in the repository.

---

**Built with ❤️ using React and Google Maps**
