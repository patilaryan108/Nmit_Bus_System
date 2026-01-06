import React from 'react';
import { useAuth } from '../../context/AuthContext';
import './StudentDashboard.css';

const StudentDashboard = () => {
    const { user } = useAuth();

    return (
        <div className="dashboard-container">
            <div className="dashboard-header">
                <h2>Welcome, {user?.name}!</h2>
                <p className="text-muted">Student Dashboard - Track your bus in real-time</p>
            </div>

            <div className="dashboard-grid">
                <div className="bus-info-card glass-card">
                    <div className="card-header">
                        <h3>Your Information</h3>
                        <span className="badge badge-success">ACTIVE</span>
                    </div>

                    <div className="bus-details">
                        <div className="detail-item">
                            <span className="detail-label">Name</span>
                            <span className="detail-value">{user?.name}</span>
                        </div>
                        <div className="detail-item">
                            <span className="detail-label">Username</span>
                            <span className="detail-value">{user?.username}</span>
                        </div>
                        <div className="detail-item">
                            <span className="detail-label">Student ID</span>
                            <span className="detail-value">{user?.studentId || 'N/A'}</span>
                        </div>
                        <div className="detail-item">
                            <span className="detail-label">Email</span>
                            <span className="detail-value">{user?.email || 'N/A'}</span>
                        </div>
                        <div className="detail-item">
                            <span className="detail-label">Role</span>
                            <span className="detail-value">{user?.role?.toUpperCase()}</span>
                        </div>
                    </div>
                </div>

                <div className="bus-info-card glass-card">
                    <div className="card-header">
                        <h3>Bus Status</h3>
                        <span className="badge badge-warning">COMING SOON</span>
                    </div>

                    <div className="bus-details">
                        <div className="feature-placeholder">
                            <div className="placeholder-icon">🚌</div>
                            <h4>Real-time Bus Tracking</h4>
                            <p>Live GPS tracking with Google Maps integration coming soon!</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default StudentDashboard;
