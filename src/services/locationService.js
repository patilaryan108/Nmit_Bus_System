import { isValidCoordinate } from '../utils/helpers';

/**
 * Get current position using Geolocation API
 * @returns {Promise<{lat, lng}>}
 */
export const getCurrentPosition = () => {
    return new Promise((resolve, reject) => {
        if (!navigator.geolocation) {
            reject(new Error('Geolocation is not supported by your browser'));
            return;
        }

        navigator.geolocation.getCurrentPosition(
            (position) => {
                resolve({
                    lat: position.coords.latitude,
                    lng: position.coords.longitude,
                    accuracy: position.coords.accuracy
                });
            },
            (error) => {
                let errorMessage = 'Unable to retrieve location';

                switch (error.code) {
                    case error.PERMISSION_DENIED:
                        errorMessage = 'Location permission denied';
                        break;
                    case error.POSITION_UNAVAILABLE:
                        errorMessage = 'Location information unavailable';
                        break;
                    case error.TIMEOUT:
                        errorMessage = 'Location request timed out';
                        break;
                }

                reject(new Error(errorMessage));
            },
            {
                enableHighAccuracy: true,
                timeout: 10000,
                maximumAge: 0
            }
        );
    });
};

/**
 * Watch position continuously
 * @param {Function} onSuccess - Callback for position updates
 * @param {Function} onError - Callback for errors
 * @returns {number} Watch ID
 */
export const watchPosition = (onSuccess, onError) => {
    if (!navigator.geolocation) {
        onError(new Error('Geolocation is not supported'));
        return null;
    }

    return navigator.geolocation.watchPosition(
        (position) => {
            const location = {
                lat: position.coords.latitude,
                lng: position.coords.longitude,
                accuracy: position.coords.accuracy,
                timestamp: position.timestamp
            };

            if (isValidCoordinate(location.lat, location.lng)) {
                onSuccess(location);
            }
        },
        (error) => {
            onError(error);
        },
        {
            enableHighAccuracy: true,
            timeout: 5000,
            maximumAge: 0
        }
    );
};

/**
 * Stop watching position
 * @param {number} watchId
 */
export const clearWatch = (watchId) => {
    if (watchId && navigator.geolocation) {
        navigator.geolocation.clearWatch(watchId);
    }
};

/**
 * Request location permission
 * @returns {Promise<string>} Permission state
 */
export const requestLocationPermission = async () => {
    if (!navigator.permissions) {
        return 'unavailable';
    }

    try {
        const result = await navigator.permissions.query({ name: 'geolocation' });
        return result.state; // 'granted', 'denied', or 'prompt'
    } catch (error) {
        console.error('Error checking location permission:', error);
        return 'unavailable';
    }
};

/**
 * Check if geolocation is available
 * @returns {boolean}
 */
export const isGeolocationAvailable = () => {
    return 'geolocation' in navigator;
};

/**
 * Create a geofence checker
 * @param {Object} center - {lat, lng}
 * @param {number} radius - in meters
 * @returns {Function} Check function
 */
export const createGeofence = (center, radius) => {
    return (position) => {
        const R = 6371e3; // Earth's radius in meters
        const φ1 = (center.lat * Math.PI) / 180;
        const φ2 = (position.lat * Math.PI) / 180;
        const Δφ = ((position.lat - center.lat) * Math.PI) / 180;
        const Δλ = ((position.lng - center.lng) * Math.PI) / 180;

        const a =
            Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
            Math.cos(φ1) * Math.cos(φ2) * Math.sin(Δλ / 2) * Math.sin(Δλ / 2);
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        const distance = R * c;

        return {
            isInside: distance <= radius,
            distance: distance
        };
    };
};
