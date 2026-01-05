import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import { USER_ROLES } from './utils/constants';

// Components
import Navbar from './components/common/Navbar';
import LoginForm from './components/auth/LoginForm';
import StudentDashboard from './components/student/StudentDashboard';
import DriverDashboard from './components/driver/DriverDashboard';
import AdminDashboard from './components/admin/AdminDashboard';
import LoadingSpinner from './components/common/LoadingSpinner';

// Styles
import './styles/index.css';

// Protected Route Component
const ProtectedRoute = ({ children, allowedRoles }) => {
    const { user, loading } = useAuth();

    if (loading) {
        return <LoadingSpinner text="Loading..." />;
    }

    if (!user) {
        return <Navigate to="/" replace />;
    }

    if (allowedRoles && !allowedRoles.includes(user.role)) {
        return <Navigate to="/" replace />;
    }

    return children;
};

// Main App Content
const AppContent = () => {
    const { user, loading } = useAuth();

    if (loading) {
        return (
            <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <LoadingSpinner text="Initializing..." />
            </div>
        );
    }

    return (
        <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
            {user && <Navbar />}

            <main style={{ flex: 1 }}>
                <Routes>
                    {/* Public Route */}
                    <Route
                        path="/"
                        element={user ? <Navigate to={`/${user.role}`} replace /> : <LoginForm />}
                    />

                    {/* Student Routes */}
                    <Route
                        path="/student"
                        element={
                            <ProtectedRoute allowedRoles={[USER_ROLES.STUDENT]}>
                                <StudentDashboard />
                            </ProtectedRoute>
                        }
                    />

                    {/* Driver Routes */}
                    <Route
                        path="/driver"
                        element={
                            <ProtectedRoute allowedRoles={[USER_ROLES.DRIVER]}>
                                <DriverDashboard />
                            </ProtectedRoute>
                        }
                    />

                    {/* Admin Routes */}
                    <Route
                        path="/admin"
                        element={
                            <ProtectedRoute allowedRoles={[USER_ROLES.ADMIN]}>
                                <AdminDashboard />
                            </ProtectedRoute>
                        }
                    />

                    {/* Catch all */}
                    <Route path="*" element={<Navigate to="/" replace />} />
                </Routes>
            </main>
        </div>
    );
};

// Main App Component
function App() {
    return (
        <Router>
            <AuthProvider>
                <AppContent />
            </AuthProvider>
        </Router>
    );
}

export default App;
