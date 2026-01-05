import React, { useState } from 'react';
import { useGeolocation } from '../../hooks/useGeolocation';
import { driverAPI, busAPI } from '../../services/api';
import TripControls from './TripControls';
import LoadingSpinner from '../common/LoadingSpinner';
import './DriverDashboard.css';

const DriverDashboard = () => {
    const { location, error: locationError } = useGeolocation(false);
    const [tripActive, setTripActive] = useState(false);
    const [tripId, setTripId] = useState(null);
    const [busId] = useState('BUS001'); // Mock - would come from user data

    const handleStartTrip = async () => {
        try {
            const result = await driverAPI.startTrip(busId);
            setTripId(result.tripId);
            setTripActive(true);
        } catch (error) {
            console.error('Error starting trip:', error);
        }
    };

    const handleEndTrip = async () => {
        try {
            await driverAPI.endTrip(tripId);
            setTripActive(false);
            setTripId(null);
        } catch (error) {
            console.error('Error ending trip:', error);
        }
    };

    const handleReportDelay = async (reason) => {
        try {
            await driverAPI.reportDelay(busId, reason);
            alert('Delay reported successfully');
        } catch (error) {
            console.error('Error reporting delay:', error);
        }
    };

    return (
        <div className="dashboard-container">
            <div className="dashboard-header">
                <h2>Driver Dashboard</h2>
                <p className="text-muted">Manage your trip and share location</p>
            </div>

            <div className="driver-grid">
                {/* Trip Status Card */}
                <div className="trip-status-card glass-card">
                    <h3 className="card-title">Trip Status</h3>
                    <div className="status-indicator">
                        <div className={`status-dot ${tripActive ? 'active' : 'inactive'}`}></div>
                        <span className="status-text">
                            {tripActive ? 'Trip in Progress' : 'No Active Trip'}
                        </span>
                    </div>
                    {tripId && (
                        <p className="text-sm text-muted mt-md">Trip ID: {tripId}</p>
                    )}
                </div>

                {/* Location Status Card */}
                <div className="location-status-card glass-card">
                    <h3 className="card-title">GPS Status</h3>
                    {locationError ? (
                        <div className="error-message">
                            <span className="detail-icon">⚠️</span>
                            <p>{locationError}</p>
                        </div>
                    ) : location ? (
                        <div className="location-info">
                            <div className="location-item">
                                <span className="detail-icon">📍</span>
                                <div>
                                    <p className="detail-label">Latitude</p>
                                    <p className="detail-value">{location.lat.toFixed(6)}</p>
                                </div>
                            </div>
                            <div className="location-item">
                                <span className="detail-icon">📍</span>
                                <div>
                                    <p className="detail-label">Longitude</p>
                                    <p className="detail-value">{location.lng.toFixed(6)}</p>
                                </div>
                            </div>
                            <div className="location-item">
                                <span className="detail-icon">🎯</span>
                                <div>
                                    <p className="detail-label">Accuracy</p>
                                    <p className="detail-value">{Math.round(location.accuracy)}m</p>
                                </div>
                            </div>
                        </div>
                    ) : (
                        <LoadingSpinner size="sm" text="Getting location..." />
                    )}
                </div>

                {/* Trip Controls */}
                <TripControls
                    tripActive={tripActive}
                    onStartTrip={handleStartTrip}
                    onEndTrip={handleEndTrip}
                    onReportDelay={handleReportDelay}
                    location={location}
                    busId={busId}
                />

                {/* Bus Info Card */}
                <div className="bus-info-card glass-card">
                    <h3 className="card-title">Bus Information</h3>
                    <div className="bus-details">
                        <div className="detail-item">
                            <span className="detail-label">Bus Number</span>
                            <span className="detail-value">{busId}</span>
                        </div>
                        <div className="detail-item">
                            <span className="detail-label">Route</span>
                            <span className="detail-value">Route A - Main Campus</span>
                        </div>
                        <div className="detail-item">
                            <span className="detail-label">Capacity</span>
                            <span className="detail-value">40 passengers</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DriverDashboard;
