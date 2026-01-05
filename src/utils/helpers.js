/**
 * Calculate distance between two coordinates using Haversine formula
 * @param {Object} coord1 - {lat, lng}
 * @param {Object} coord2 - {lat, lng}
 * @returns {number} Distance in meters
 */
export const calculateDistance = (coord1, coord2) => {
    const R = 6371e3; // Earth's radius in meters
    const φ1 = (coord1.lat * Math.PI) / 180;
    const φ2 = (coord2.lat * Math.PI) / 180;
    const Δφ = ((coord2.lat - coord1.lat) * Math.PI) / 180;
    const Δλ = ((coord2.lng - coord1.lng) * Math.PI) / 180;

    const a =
        Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
        Math.cos(φ1) * Math.cos(φ2) * Math.sin(Δλ / 2) * Math.sin(Δλ / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    return R * c;
};

/**
 * Format time in minutes to human-readable format
 * @param {number} minutes
 * @returns {string}
 */
export const formatTime = (minutes) => {
    if (minutes < 1) return 'Less than a minute';
    if (minutes < 60) return `${Math.round(minutes)} min`;

    const hours = Math.floor(minutes / 60);
    const mins = Math.round(minutes % 60);

    if (mins === 0) return `${hours} hr`;
    return `${hours} hr ${mins} min`;
};

/**
 * Format distance in meters to human-readable format
 * @param {number} meters
 * @returns {string}
 */
export const formatDistance = (meters) => {
    if (meters < 1000) return `${Math.round(meters)} m`;
    return `${(meters / 1000).toFixed(1)} km`;
};

/**
 * Validate coordinates
 * @param {number} lat
 * @param {number} lng
 * @returns {boolean}
 */
export const isValidCoordinate = (lat, lng) => {
    return (
        typeof lat === 'number' &&
        typeof lng === 'number' &&
        lat >= -90 &&
        lat <= 90 &&
        lng >= -180 &&
        lng <= 180
    );
};

/**
 * Check if a point is within a geofence
 * @param {Object} point - {lat, lng}
 * @param {Object} center - {lat, lng}
 * @param {number} radius - in meters
 * @returns {boolean}
 */
export const isWithinGeofence = (point, center, radius) => {
    const distance = calculateDistance(point, center);
    return distance <= radius;
};

/**
 * Generate a random color from predefined palette
 * @param {number} index
 * @returns {string}
 */
export const getRouteColor = (index) => {
    const colors = [
        '#FF6B6B', '#4ECDC4', '#45B7D1', '#FFA07A',
        '#98D8C8', '#F7DC6F', '#BB8FCE', '#85C1E2'
    ];
    return colors[index % colors.length];
};

/**
 * Debounce function
 * @param {Function} func
 * @param {number} wait
 * @returns {Function}
 */
export const debounce = (func, wait) => {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
};

/**
 * Get status color based on bus status
 * @param {string} status
 * @returns {string}
 */
export const getStatusColor = (status) => {
    const statusColors = {
        idle: '#6B7280',
        active: '#10B981',
        delayed: '#F59E0B',
        breakdown: '#EF4444'
    };
    return statusColors[status] || statusColors.idle;
};

/**
 * Format timestamp to readable time
 * @param {Date|string|number} timestamp
 * @returns {string}
 */
export const formatTimestamp = (timestamp) => {
    const date = new Date(timestamp);
    return date.toLocaleTimeString('en-US', {
        hour: '2-digit',
        minute: '2-digit'
    });
};
