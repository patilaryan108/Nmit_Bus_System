import { useState, useEffect, useCallback } from 'react';
import { busAPI } from '../services/api';

/**
 * Custom hook for real-time bus tracking
 * @param {string} busId - Bus ID to track
 * @param {number} interval - Update interval in milliseconds
 * @returns {Object} {location, loading, error, refresh}
 */
export const useRealTimeTracking = (busId, interval = 5000) => {
    const [location, setLocation] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchLocation = useCallback(async () => {
        if (!busId) return;

        try {
            const data = await busAPI.getLocation(busId);
            setLocation(data);
            setError(null);
            setLoading(false);
        } catch (err) {
            setError(err.message);
            setLoading(false);
        }
    }, [busId]);

    useEffect(() => {
        fetchLocation();

        const intervalId = setInterval(fetchLocation, interval);

        return () => {
            clearInterval(intervalId);
        };
    }, [fetchLocation, interval]);

    return {
        location,
        loading,
        error,
        refresh: fetchLocation
    };
};
