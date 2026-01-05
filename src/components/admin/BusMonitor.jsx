import React, { useEffect } from 'react';
import { GoogleMap, Marker } from '@react-google-maps/api';
import { MAP_CONFIG } from '../../utils/constants';
import { getStatusColor } from '../../utils/helpers';

const mapContainerStyle = {
    width: '100%',
    height: '100%',
    borderRadius: 'var(--radius-md)'
};

const BusMonitor = ({ buses, onBusSelect }) => {
    const [map, setMap] = React.useState(null);

    const onLoad = React.useCallback((map) => {
        setMap(map);
    }, []);

    useEffect(() => {
        if (map && buses.length > 0) {
            const bounds = new window.google.maps.LatLngBounds();
            buses.forEach(bus => {
                bounds.extend(bus.location);
            });
            map.fitBounds(bounds);
        }
    }, [map, buses]);

    return (
        <div style={{ width: '100%', height: '100%', minHeight: '500px', borderRadius: 'var(--radius-md)', overflow: 'hidden' }}>
            <GoogleMap
                mapContainerStyle={mapContainerStyle}
                center={buses[0]?.location || MAP_CONFIG.defaultCenter}
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
                {buses.map(bus => (
                    <Marker
                        key={bus.id}
                        position={bus.location}
                        icon={{
                            path: window.google.maps.SymbolPath.CIRCLE,
                            scale: 14,
                            fillColor: getStatusColor(bus.status),
                            fillOpacity: 1,
                            strokeColor: '#FFFFFF',
                            strokeWeight: 3
                        }}
                        title={`${bus.id} - ${bus.name}`}
                        onClick={() => onBusSelect(bus)}
                        animation={bus.status === 'active' ? window.google.maps.Animation.BOUNCE : null}
                    />
                ))}
            </GoogleMap>
        </div>
    );
};

export default BusMonitor;
