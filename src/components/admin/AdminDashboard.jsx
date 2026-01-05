import React, { useState, useEffect } from 'react';
import { useLoadScript } from '@react-google-maps/api';
import { busAPI } from '../../services/api';
import { GOOGLE_MAPS_API_KEY } from '../../utils/constants';
import BusMonitor from './BusMonitor';
import LoadingSpinner from '../common/LoadingSpinner';
import './AdminDashboard.css';

const libraries = ['places', 'geometry'];

const AdminDashboard = () => {
    const [buses, setBuses] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedBus, setSelectedBus] = useState(null);

    const { isLoaded, loadError } = useLoadScript({
        googleMapsApiKey: GOOGLE_MAPS_API_KEY,
        libraries
    });

    useEffect(() => {
        const fetchBuses = async () => {
            try {
                const data = await busAPI.getAllBuses();
                setBuses(data);
            } catch (error) {
                console.error('Error fetching buses:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchBuses();
        const interval = setInterval(fetchBuses, 10000); // Refresh every 10 seconds

        return () => clearInterval(interval);
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
                <LoadingSpinner text="Loading admin dashboard..." />
            </div>
        );
    }

    const activeBuses = buses.filter(b => b.status === 'active').length;
    const delayedBuses = buses.filter(b => b.status === 'delayed').length;

    return (
        <div className="dashboard-container">
            <div className="dashboard-header">
                <h2>Admin Dashboard</h2>
                <p className="text-muted">Monitor all buses in real-time</p>
            </div>

            {/* Stats Cards */}
            <div className="stats-grid">
                <div className="stat-card glass-card">
                    <div className="stat-icon" style={{ background: 'var(--gradient-primary)' }}>🚌</div>
                    <div className="stat-content">
                        <p className="stat-label">Total Buses</p>
                        <p className="stat-value">{buses.length}</p>
                    </div>
                </div>

                <div className="stat-card glass-card">
                    <div className="stat-icon" style={{ background: 'var(--gradient-success)' }}>✅</div>
                    <div className="stat-content">
                        <p className="stat-label">Active</p>
                        <p className="stat-value">{activeBuses}</p>
                    </div>
                </div>

                <div className="stat-card glass-card">
                    <div className="stat-icon" style={{ background: 'var(--gradient-secondary)' }}>⚠️</div>
                    <div className="stat-content">
                        <p className="stat-label">Delayed</p>
                        <p className="stat-value">{delayedBuses}</p>
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <div className="admin-grid">
                {/* Map */}
                <div className="map-card glass-card">
                    <h3 className="card-title">Live Bus Tracking</h3>
                    <BusMonitor buses={buses} onBusSelect={setSelectedBus} />
                </div>

                {/* Bus List */}
                <div className="bus-list-card glass-card">
                    <h3 className="card-title">All Buses</h3>
                    <div className="bus-list">
                        {buses.map(bus => (
                            <div
                                key={bus.id}
                                className={`bus-list-item ${selectedBus?.id === bus.id ? 'selected' : ''}`}
                                onClick={() => setSelectedBus(bus)}
                            >
                                <div className="bus-list-header">
                                    <span className="bus-id">{bus.id}</span>
                                    <span className={`badge badge-${bus.status === 'active' ? 'success' : bus.status === 'delayed' ? 'warning' : 'info'}`}>
                                        {bus.status}
                                    </span>
                                </div>
                                <p className="bus-name">{bus.name}</p>
                                <div className="bus-list-details">
                                    <span className="text-sm text-muted">Driver: {bus.driver}</span>
                                    <span className="text-sm text-muted">{bus.currentPassengers}/{bus.capacity}</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminDashboard;
