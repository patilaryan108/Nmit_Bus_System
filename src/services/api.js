import axios from 'axios';
// Create axios instance
const api = axios.create({
    baseURL: 'http://localhost:5000', // Replace with your backend URL
    timeout: 10000,
    headers: {
        'Content-Type': 'application/json'
    }
});

// Request interceptor
api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Response interceptor
api.interceptors.response.use(
    (response) => response.data,
    (error) => {
        if (error.response?.status === 401) {
            localStorage.removeItem('token');
            localStorage.removeItem('user');
            window.location.href = '/';
        }
        return Promise.reject(error);
    }
);

// Mock data for development
const MOCK_DATA = {
    users: {
        student: { id: 1, role: 'student', name: 'Student User', busId: 'BUS001' },
        driver: { id: 2, role: 'driver', name: 'Mike Driver', busId: 'BUS001' },
        admin: { id: 3, role: 'admin', name: 'Admin User' }
    },
    buses: [
        {
            id: 'BUS001',
            name: 'Route A - Main Campus',
            status: 'active',
            location: { lat: 28.6139, lng: 77.2090 },
            driver: 'Mike Driver',
            capacity: 40,
            currentPassengers: 25
        },
        {
            id: 'BUS002',
            name: 'Route B - North Campus',
            status: 'active',
            location: { lat: 28.6889, lng: 77.2090 },
            driver: 'Sarah Johnson',
            capacity: 40,
            currentPassengers: 30
        },
        {
            id: 'BUS003',
            name: 'Route C - South Campus',
            status: 'delayed',
            location: { lat: 28.5389, lng: 77.2090 },
            driver: 'Tom Wilson',
            capacity: 35,
            currentPassengers: 20
        }
    ],
    routes: [
        {
            id: 'ROUTE001',
            name: 'Route A',
            busId: 'BUS001',
            stops: [
                { id: 'STOP001', name: 'Main Gate', location: { lat: 28.6139, lng: 77.2090 } },
                { id: 'STOP002', name: 'Library', location: { lat: 28.6189, lng: 77.2140 } },
                { id: 'STOP003', name: 'Hostel Block', location: { lat: 28.6239, lng: 77.2190 } }
            ]
        }
    ]
};

// API Methods
export const authAPI = {
    login: async (credentials) => {
        // Mock login - replace with actual API call
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                const userTemplate = MOCK_DATA.users[credentials.role];
                if (userTemplate) {
                    const user = { ...userTemplate };
                    // If a username is supplied in the login form, use it as the returned user's name
                    if (credentials.username) {
                        user.name = credentials.username;
                    }
                    const token = 'mock-jwt-token-' + Date.now();
                    resolve({ user, token });
                } else {
                    reject(new Error('Invalid credentials'));
                }
            }, 500);
        });
    },

    logout: async () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        return Promise.resolve();
    }
};

export const busAPI = {
    getLocation: async (busId) => {
        // Mock - replace with actual API call
        return new Promise((resolve) => {
            setTimeout(() => {
                const bus = MOCK_DATA.buses.find(b => b.id === busId);
                resolve(bus?.location || { lat: 28.6139, lng: 77.2090 });
            }, 300);
        });
    },

    updateLocation: async (busId, location) => {
        // Mock - replace with actual API call
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve({ success: true });
            }, 200);
        });
    },

    getAllBuses: async () => {
        // Mock - replace with actual API call
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve(MOCK_DATA.buses);
            }, 300);
        });
    }
};

export const studentAPI = {
    getAssignedBus: async () => {
        // Mock - replace with actual API call
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve(MOCK_DATA.buses[0]);
            }, 300);
        });
    },

    getRoute: async (busId) => {
        // Mock - replace with actual API call
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve(MOCK_DATA.routes[0]);
            }, 300);
        });
    }
};

export const driverAPI = {
    startTrip: async (busId) => {
        // Mock - replace with actual API call
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve({ success: true, tripId: 'TRIP' + Date.now() });
            }, 300);
        });
    },

    endTrip: async (tripId) => {
        // Mock - replace with actual API call
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve({ success: true });
            }, 300);
        });
    },

    reportDelay: async (busId, reason) => {
        // Mock - replace with actual API call
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve({ success: true });
            }, 300);
        });
    }
};

export default api;

// Enable demo mode for local development (simulated live updates)
export const DEMO_MODE = true;
