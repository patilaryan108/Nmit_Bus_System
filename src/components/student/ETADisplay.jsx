import React, { useState, useEffect } from 'react';
import { calculateETA } from '../../services/googleMaps';
import { formatTime, formatDistance } from '../../utils/helpers';
import './ETADisplay.css';

const ETADisplay = ({ busLocation, studentLocation }) => {
    const [eta, setEta] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchETA = async () => {
            if (!busLocation || !studentLocation) return;

            try {
                const result = await calculateETA(busLocation, studentLocation);
                setEta(result);
            } catch (error) {
                console.error('Error calculating ETA:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchETA();
        const interval = setInterval(fetchETA, 10000); // Update every 10 seconds

        return () => clearInterval(interval);
    }, [busLocation, studentLocation]);

    const getStatusInfo = () => {
        if (!eta) return { text: 'Calculating...', color: 'info', icon: '⏱️' };

        if (eta.duration < 5) {
            return { text: 'Arriving Soon', color: 'success', icon: '🚌' };
        } else if (eta.duration < 15) {
            return { text: 'On Time', color: 'success', icon: '✅' };
        } else if (eta.duration < 30) {
            return { text: 'En Route', color: 'warning', icon: '🚦' };
        } else {
            return { text: 'Delayed', color: 'danger', icon: '⚠️' };
        }
    };

    const status = getStatusInfo();

    return (
        <div className="eta-card glass-card">
            <div className="eta-header">
                <h3>Estimated Arrival</h3>
                <span className={`badge badge-${status.color}`}>
                    {status.icon} {status.text}
                </span>
            </div>

            {loading ? (
                <div className="eta-loading">
                    <div className="spinner"></div>
                    <p className="text-muted">Calculating ETA...</p>
                </div>
            ) : eta ? (
                <div className="eta-content">
                    <div className="eta-main">
                        <div className="eta-time">
                            <span className="eta-value">{Math.round(eta.duration)}</span>
                            <span className="eta-unit">min</span>
                        </div>
                        <p className="text-muted">Estimated time to your stop</p>
                    </div>

                    <div className="eta-details">
                        <div className="eta-detail-item">
                            <span className="detail-icon">📍</span>
                            <div>
                                <p className="detail-label">Distance</p>
                                <p className="detail-value">{formatDistance(eta.distance)}</p>
                            </div>
                        </div>
                        <div className="eta-detail-item">
                            <span className="detail-icon">🕐</span>
                            <div>
                                <p className="detail-label">Arrival Time</p>
                                <p className="detail-value">
                                    {new Date(Date.now() + eta.duration * 60000).toLocaleTimeString('en-US', {
                                        hour: '2-digit',
                                        minute: '2-digit'
                                    })}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            ) : (
                <div className="eta-error">
                    <p className="text-muted">Unable to calculate ETA</p>
                </div>
            )}
        </div>
    );
};

export default ETADisplay;
