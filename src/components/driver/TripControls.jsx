import React, { useState, useEffect } from 'react';
import { busAPI } from '../../services/api';
import './TripControls.css';

const TripControls = ({ tripActive, onStartTrip, onEndTrip, onReportDelay, location, busId }) => {
    const [isTracking, setIsTracking] = useState(false);
    const [delayReason, setDelayReason] = useState('');
    const [showDelayForm, setShowDelayForm] = useState(false);

    useEffect(() => {
        let interval;

        if (tripActive && isTracking && location) {
            // Send location updates every 5 seconds
            interval = setInterval(async () => {
                try {
                    await busAPI.updateLocation(busId, location);
                    console.log('Location updated:', location);
                } catch (error) {
                    console.error('Error updating location:', error);
                }
            }, 5000);
        }

        return () => {
            if (interval) clearInterval(interval);
        };
    }, [tripActive, isTracking, location, busId]);

    const handleStart = () => {
        onStartTrip();
        setIsTracking(true);
    };

    const handleEnd = () => {
        setIsTracking(false);
        onEndTrip();
    };

    const handleDelaySubmit = (e) => {
        e.preventDefault();
        if (delayReason.trim()) {
            onReportDelay(delayReason);
            setDelayReason('');
            setShowDelayForm(false);
        }
    };

    return (
        <div className="trip-controls-card glass-card">
            <h3 className="card-title">Trip Controls</h3>

            <div className="controls-grid">
                {!tripActive ? (
                    <button
                        onClick={handleStart}
                        className="btn btn-success btn-lg"
                        style={{ width: '100%' }}
                        disabled={!location}
                    >
                        🚀 Start Trip
                    </button>
                ) : (
                    <>
                        <button
                            onClick={handleEnd}
                            className="btn btn-danger btn-lg"
                            style={{ width: '100%' }}
                        >
                            🛑 End Trip
                        </button>

                        <div className="tracking-status">
                            <div className="flex items-center justify-between">
                                <span>Location Sharing</span>
                                <span className={`badge badge-${isTracking ? 'success' : 'warning'}`}>
                                    {isTracking ? 'Active' : 'Paused'}
                                </span>
                            </div>
                            <p className="text-sm text-muted mt-sm">
                                {isTracking ? 'Broadcasting location every 5 seconds' : 'Location sharing paused'}
                            </p>
                        </div>
                    </>
                )}

                {tripActive && (
                    <div className="delay-section">
                        {!showDelayForm ? (
                            <button
                                onClick={() => setShowDelayForm(true)}
                                className="btn btn-warning"
                                style={{ width: '100%' }}
                            >
                                ⚠️ Report Delay/Issue
                            </button>
                        ) : (
                            <form onSubmit={handleDelaySubmit} className="delay-form">
                                <textarea
                                    value={delayReason}
                                    onChange={(e) => setDelayReason(e.target.value)}
                                    className="input"
                                    placeholder="Describe the delay or issue..."
                                    rows="3"
                                    required
                                />
                                <div className="flex gap-sm">
                                    <button type="submit" className="btn btn-warning" style={{ flex: 1 }}>
                                        Submit
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => {
                                            setShowDelayForm(false);
                                            setDelayReason('');
                                        }}
                                        className="btn btn-secondary"
                                        style={{ flex: 1 }}
                                    >
                                        Cancel
                                    </button>
                                </div>
                            </form>
                        )}
                    </div>
                )}
            </div>

            {!location && (
                <div className="warning-message">
                    <span className="detail-icon">⚠️</span>
                    <p className="text-sm">Please enable location services to start trip</p>
                </div>
            )}
        </div>
    );
};

export default TripControls;
