import React, { useState, useEffect } from 'react';
import { useLoadScript } from '@react-google-maps/api';
import { studentAPI } from '../../services/api';
import { GOOGLE_MAPS_API_KEY } from '../../utils/constants';
import BusTracker from './BusTracker';
import ETADisplay from './ETADisplay';
import LoadingSpinner from '../common/LoadingSpinner';
import './StudentDashboard.css';

const libraries = ['places', 'geometry'];

const StudentDashboard = () => {
    const [busData, setBusData] = useState(null);
    const [route, setRoute] = useState(null);
    const [loading, setLoading] = useState(true);

    const { isLoaded, loadError } = useLoadScript({
        googleMapsApiKey: GOOGLE_MAPS_API_KEY,
        libraries
    });

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [bus, routeData] = await Promise.all([
                    studentAPI.getAssignedBus(),
                    studentAPI.getRoute('BUS001')
                ]);
                setBusData(bus);
                setRoute(routeData);
            } catch (error) {
                console.error('Error fetching data:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    if (loadError) {
        return (
            <div className="dashboard-container">
                <div className="error-card glass-card">
                    <h3>Error Loading Maps</h3>
                    <p>Failed to load Google Maps. Please check your API key.</p>
                </div>
            </div>
        );
    }

    if (!isLoaded || loading) {
        return (
            <div className="dashboard-container">
                <LoadingSpinner text="Loading dashboard..." />
            </div>
        );
    }

    return (
        <div className="dashboard-container">
            <div className="dashboard-header">
                <h2>Your Bus Tracker</h2>
                <p className="text-muted">Track your bus in real-time</p>
            </div>

            <div className="dashboard-grid">
                {/* Bus Info Card */}
                <div className="bus-info-card glass-card">
                    <div className="card-header">
                        <h3>Bus Information</h3>
                        <span className={`badge badge-${busData?.status === 'active' ? 'success' : 'warning'}`}>
                            {busData?.status?.toUpperCase()}
                        </span>
                    </div>

                    <div className="bus-details">
                        <div className="detail-item">
                            <span className="detail-label">Bus Number</span>
                            <span className="detail-value">{busData?.id}</span>
                        </div>
                        <div className="detail-item">
                            <span className="detail-label">Route</span>
                            <span className="detail-value">{busData?.name}</span>
                        </div>
                        <div className="detail-item">
                            <span className="detail-label">Driver</span>
                            <span className="detail-value">{busData?.driver}</span>
                        </div>
                        <div className="detail-item">
                            <span className="detail-label">Capacity</span>
                            <span className="detail-value">{busData?.currentPassengers}/{busData?.capacity}</span>
                        </div>
                    </div>
                </div>

                {/* ETA Card */}
                {busData && (
                    <ETADisplay
                        busLocation={busData.location}
                        studentLocation={route?.stops[0]?.location}
                    />
                )}

                {/* Map Card */}
                <div className="map-card glass-card">
                    <h3 className="card-title">Live Tracking</h3>
                    {busData && route && (
                        <BusTracker
                            busLocation={busData.location}
                            route={route}
                            busId={busData.id}
                        />
                    )}
                </div>

                {/* Stops Card */}
                <div className="stops-card glass-card">
                    <h3 className="card-title">Route Stops</h3>
                    <div className="stops-list">
                        {route?.stops.map((stop, index) => (
                            <div key={stop.id} className="stop-item">
                                <div className="stop-number">{index + 1}</div>
                                <div className="stop-info">
                                    <p className="stop-name">{stop.name}</p>
                                    <p className="text-sm text-muted">Stop ID: {stop.id}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default StudentDashboard;
