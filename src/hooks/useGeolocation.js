import { useState, useEffect } from 'react';
import { getCurrentPosition, watchPosition, clearWatch } from '../services/locationService';

/**
 * Custom hook for geolocation
 * @param {boolean} watch - Whether to continuously watch position
 * @returns {Object} {location, error, loading}
 */
export const useGeolocation = (watch = false) => {
    const [location, setLocation] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        let watchId = null;

        const handleSuccess = (position) => {
            setLocation(position);
            setError(null);
            setLoading(false);
        };

        const handleError = (err) => {
            setError(err.message);
            setLoading(false);
        };

        if (watch) {
            // Continuously watch position
            watchId = watchPosition(handleSuccess, handleError);
        } else {
            // Get position once
            getCurrentPosition()
                .then(handleSuccess)
                .catch(handleError);
        }

        return () => {
            if (watchId) {
                clearWatch(watchId);
            }
        };
    }, [watch]);

    return { location, error, loading };
};
