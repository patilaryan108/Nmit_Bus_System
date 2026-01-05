import { GOOGLE_MAPS_API_KEY } from '../utils/constants';

/**
 * Load Google Maps Script
 * @returns {Promise}
 */
export const loadGoogleMapsScript = () => {
    return new Promise((resolve, reject) => {
        if (window.google && window.google.maps) {
            resolve(window.google.maps);
            return;
        }

        const script = document.createElement('script');
        script.src = `https://maps.googleapis.com/maps/api/js?key=${GOOGLE_MAPS_API_KEY}&libraries=places,geometry`;
        script.async = true;
        script.defer = true;
        script.onload = () => resolve(window.google.maps);
        script.onerror = () => reject(new Error('Failed to load Google Maps'));
        document.head.appendChild(script);
    });
};

/**
 * Calculate route using Google Directions API
 * @param {Object} origin - {lat, lng}
 * @param {Object} destination - {lat, lng}
 * @param {Array} waypoints - [{lat, lng}]
 * @returns {Promise}
 */
export const calculateRoute = async (origin, destination, waypoints = []) => {
    try {
        const google = await loadGoogleMapsScript();
        const directionsService = new google.maps.DirectionsService();

        const waypointsFormatted = waypoints.map(point => ({
            location: new google.maps.LatLng(point.lat, point.lng),
            stopover: true
        }));

        return new Promise((resolve, reject) => {
            directionsService.route(
                {
                    origin: new google.maps.LatLng(origin.lat, origin.lng),
                    destination: new google.maps.LatLng(destination.lat, destination.lng),
                    waypoints: waypointsFormatted,
                    travelMode: google.maps.TravelMode.DRIVING
                },
                (result, status) => {
                    if (status === google.maps.DirectionsStatus.OK) {
                        resolve(result);
                    } else {
                        reject(new Error(`Directions request failed: ${status}`));
                    }
                }
            );
        });
    } catch (error) {
        console.error('Error calculating route:', error);
        throw error;
    }
};

/**
 * Calculate ETA using Google Distance Matrix API
 * @param {Object} origin - {lat, lng}
 * @param {Object} destination - {lat, lng}
 * @returns {Promise<{distance: number, duration: number}>}
 */
export const calculateETA = async (origin, destination) => {
    try {
        const google = await loadGoogleMapsScript();
        const service = new google.maps.DistanceMatrixService();

        return new Promise((resolve, reject) => {
            service.getDistanceMatrix(
                {
                    origins: [new google.maps.LatLng(origin.lat, origin.lng)],
                    destinations: [new google.maps.LatLng(destination.lat, destination.lng)],
                    travelMode: google.maps.TravelMode.DRIVING,
                    unitSystem: google.maps.UnitSystem.METRIC
                },
                (response, status) => {
                    if (status === google.maps.DistanceMatrixStatus.OK) {
                        const result = response.rows[0].elements[0];
                        if (result.status === 'OK') {
                            resolve({
                                distance: result.distance.value, // in meters
                                duration: result.duration.value / 60 // in minutes
                            });
                        } else {
                            reject(new Error('No route found'));
                        }
                    } else {
                        reject(new Error(`Distance Matrix request failed: ${status}`));
                    }
                }
            );
        });
    } catch (error) {
        console.error('Error calculating ETA:', error);
        // Return mock data if API fails
        return {
            distance: 5000,
            duration: 15
        };
    }
};

/**
 * Create a custom marker
 * @param {Object} map - Google Maps instance
 * @param {Object} position - {lat, lng}
 * @param {string} icon - Icon URL or type
 * @param {string} title - Marker title
 * @returns {Object} Marker instance
 */
export const createMarker = (map, position, icon, title) => {
    const google = window.google;

    const markerIcons = {
        bus: {
            path: google.maps.SymbolPath.CIRCLE,
            scale: 10,
            fillColor: '#4F46E5',
            fillOpacity: 1,
            strokeColor: '#FFFFFF',
            strokeWeight: 3
        },
        stop: {
            path: google.maps.SymbolPath.CIRCLE,
            scale: 8,
            fillColor: '#10B981',
            fillOpacity: 1,
            strokeColor: '#FFFFFF',
            strokeWeight: 2
        },
        student: {
            path: google.maps.SymbolPath.CIRCLE,
            scale: 8,
            fillColor: '#F59E0B',
            fillOpacity: 1,
            strokeColor: '#FFFFFF',
            strokeWeight: 2
        }
    };

    return new google.maps.Marker({
        position: new google.maps.LatLng(position.lat, position.lng),
        map: map,
        icon: markerIcons[icon] || markerIcons.bus,
        title: title,
        animation: google.maps.Animation.DROP
    });
};

/**
 * Draw route polyline on map
 * @param {Object} map - Google Maps instance
 * @param {Array} path - Array of {lat, lng}
 * @param {string} color - Polyline color
 * @returns {Object} Polyline instance
 */
export const drawPolyline = (map, path, color = '#4F46E5') => {
    const google = window.google;

    const polylinePath = path.map(point =>
        new google.maps.LatLng(point.lat, point.lng)
    );

    return new google.maps.Polyline({
        path: polylinePath,
        geodesic: true,
        strokeColor: color,
        strokeOpacity: 0.8,
        strokeWeight: 4,
        map: map
    });
};

/**
 * Fit map bounds to show all markers
 * @param {Object} map - Google Maps instance
 * @param {Array} positions - Array of {lat, lng}
 */
export const fitBounds = (map, positions) => {
    const google = window.google;
    const bounds = new google.maps.LatLngBounds();

    positions.forEach(pos => {
        bounds.extend(new google.maps.LatLng(pos.lat, pos.lng));
    });

    map.fitBounds(bounds);
};

/**
 * Geocode address to coordinates
 * @param {string} address
 * @returns {Promise<{lat, lng}>}
 */
export const geocodeAddress = async (address) => {
    try {
        const google = await loadGoogleMapsScript();
        const geocoder = new google.maps.Geocoder();

        return new Promise((resolve, reject) => {
            geocoder.geocode({ address }, (results, status) => {
                if (status === google.maps.GeocoderStatus.OK) {
                    const location = results[0].geometry.location;
                    resolve({
                        lat: location.lat(),
                        lng: location.lng()
                    });
                } else {
                    reject(new Error(`Geocoding failed: ${status}`));
                }
            });
        });
    } catch (error) {
        console.error('Error geocoding address:', error);
        throw error;
    }
};
