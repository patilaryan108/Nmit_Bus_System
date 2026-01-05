import React, { useState, useEffect, useCallback } from 'react';
import { GoogleMap, Marker, Polyline } from '@react-google-maps/api';
import { useRealTimeTracking } from '../../hooks/useRealTimeTracking';
import { MAP_CONFIG } from '../../utils/constants';
import './BusTracker.css';

const mapContainerStyle = {
    width: '100%',
    height: '100%',
    borderRadius: 'var(--radius-md)'
};

const BusTracker = ({ busLocation, route, busId }) => {
    const [map, setMap] = useState(null);
    const { location: liveLocation } = useRealTimeTracking(busId, 5000);

    const currentBusLocation = liveLocation || busLocation;

    const onLoad = useCallback((map) => {
        setMap(map);
    }, []);

    useEffect(() => {
        if (map && currentBusLocation) {
            map.panTo(currentBusLocation);
        }
    }, [map, currentBusLocation]);

    // Create path from route stops
    const routePath = route?.stops?.map(stop => stop.location) || [];

    return (
        <div className="bus-tracker-container">
            <GoogleMap
                mapContainerStyle={mapContainerStyle}
                center={currentBusLocation || MAP_CONFIG.defaultCenter}
                zoom={MAP_CONFIG.defaultZoom}
                options={{
                    styles: MAP_CONFIG.styles,
                    disableDefaultUI: false,
                    zoomControl: true,
                    mapTypeControl: false,
                    streetViewControl: false,
                    fullscreenControl: true
                }}
                onLoad={onLoad}
            >
                {/* Bus Marker */}
                {currentBusLocation && (
                    <Marker
                        position={currentBusLocation}
                        icon={{
                            path: window.google.maps.SymbolPath.CIRCLE,
                            scale: 12,
                            fillColor: '#6366F1',
                            fillOpacity: 1,
                            strokeColor: '#FFFFFF',
                            strokeWeight: 3
                        }}
                        title="Bus Location"
                        animation={window.google.maps.Animation.BOUNCE}
                    />
                )}

                {/* Route Stops */}
                {route?.stops?.map((stop, index) => (
                    <Marker
                        key={stop.id}
                        position={stop.location}
                        icon={{
                            path: window.google.maps.SymbolPath.CIRCLE,
                            scale: 8,
                            fillColor: '#10B981',
                            fillOpacity: 1,
                            strokeColor: '#FFFFFF',
                            strokeWeight: 2
                        }}
                        label={{
                            text: `${index + 1}`,
                            color: '#FFFFFF',
                            fontSize: '12px',
                            fontWeight: 'bold'
                        }}
                        title={stop.name}
                    />
                ))}

                {/* Route Polyline */}
                {routePath.length > 0 && (
                    <Polyline
                        path={routePath}
                        options={{
                            strokeColor: '#6366F1',
                            strokeOpacity: 0.8,
                            strokeWeight: 4,
                            geodesic: true
                        }}
                    />
                )}
            </GoogleMap>

            <div className="map-legend">
                <div className="legend-item">
                    <div className="legend-icon" style={{ background: '#6366F1' }}></div>
                    <span>Bus Location</span>
                </div>
                <div className="legend-item">
                    <div className="legend-icon" style={{ background: '#10B981' }}></div>
                    <span>Bus Stops</span>
                </div>
            </div>
        </div>
    );
};

export default BusTracker;
