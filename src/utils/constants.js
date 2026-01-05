// Google Maps API Configuration
export const GOOGLE_MAPS_API_KEY = 'YOUR_GOOGLE_MAPS_API_KEY_HERE';

// User Roles
export const USER_ROLES = {
    STUDENT: 'student',
    DRIVER: 'driver',
    ADMIN: 'admin'
};

// Bus Status
export const BUS_STATUS = {
    IDLE: 'idle',
    ACTIVE: 'active',
    DELAYED: 'delayed',
    BREAKDOWN: 'breakdown'
};

// Map Configuration
export const MAP_CONFIG = {
    defaultCenter: {
        lat: 28.6139, // Default: New Delhi
        lng: 77.2090
    },
    defaultZoom: 13,
    styles: [
        {
            featureType: 'all',
            elementType: 'geometry',
            stylers: [{ color: '#242f3e' }]
        },
        {
            featureType: 'all',
            elementType: 'labels.text.stroke',
            stylers: [{ color: '#242f3e' }]
        },
        {
            featureType: 'all',
            elementType: 'labels.text.fill',
            stylers: [{ color: '#746855' }]
        },
        {
            featureType: 'water',
            elementType: 'geometry',
            stylers: [{ color: '#17263c' }]
        },
        {
            featureType: 'road',
            elementType: 'geometry',
            stylers: [{ color: '#38414e' }]
        },
        {
            featureType: 'road',
            elementType: 'geometry.stroke',
            stylers: [{ color: '#212a37' }]
        }
    ]
};

// Geofence Configuration
export const GEOFENCE_RADIUS = 200; // meters

// Update Intervals
export const LOCATION_UPDATE_INTERVAL = 5000; // 5 seconds
export const ETA_UPDATE_INTERVAL = 10000; // 10 seconds

// API Endpoints (Mock - replace with your backend)
export const API_ENDPOINTS = {
    LOGIN: '/api/auth/login',
    LOGOUT: '/api/auth/logout',
    GET_BUS_LOCATION: '/api/bus/location',
    UPDATE_BUS_LOCATION: '/api/bus/update-location',
    GET_ROUTES: '/api/routes',
    GET_ASSIGNED_BUS: '/api/student/assigned-bus',
    START_TRIP: '/api/driver/start-trip',
    END_TRIP: '/api/driver/end-trip',
    REPORT_DELAY: '/api/driver/report-delay',
    GET_ALL_BUSES: '/api/admin/buses'
};

// Route Colors
export const ROUTE_COLORS = [
    '#FF6B6B',
    '#4ECDC4',
    '#45B7D1',
    '#FFA07A',
    '#98D8C8',
    '#F7DC6F',
    '#BB8FCE',
    '#85C1E2'
];
