'use client';

import { usePinStore } from '@/stores/pins';
import { useMapStore } from '@/stores/map';
import { getItemColor } from '@/utils/helpers';
import L from 'leaflet';
import { Map as LMap, Marker as LMarker, Polyline as LPolyline, LatLng, LatLngTuple, latLngBounds } from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';
import {
  Marker,
  CircleMarker,
  Polyline,
  Popup,
  Tooltip,
  FeatureGroup,
  MapContainer,
  TileLayer,
  useMapEvents
} from 'react-leaflet';
import { Controls } from './Controls';
import { DEFAULT_ZOOM, MIN_PIN_ZOOM } from './constants';
import { BLUE, RED, YELLOW, GREEN, BLACK } from '@/constants/colors';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { MAX_ZOOM } from './constants';
import { Pin, Trail } from '@/api/data';

const markerDivIcon = (color: string) =>
  L.divIcon({
    className: '',
    html: `<div class="w-full h-full rounded-full text-white flex items-center justify-center" style="background-color: ${color}; box-shadow: 0 0 8px 0 ${color};"></div>`,
    iconSize: [12, 12]
  });

const Map = () => {
  const { theme } = useTheme();
  const map = useMapStore((state) => state.map);
  const currentTile = useMapStore((state) => state.tile);
  const setMap = useMapStore((state) => state.setMap);
  const pins = usePinStore((state) => state.pins);
  const trails = usePinStore((state) => state.trails);
  const updatePins = usePinStore((state) => state.updatePins);

  const pointMarker = useMapStore((state) => state.pointMarker);
  const setPointMarker = useMapStore((state) => state.setPointMarker);
  const trailMarker = useMapStore((state) => state.trailMarker);
  const setTrailMarker = useMapStore((state) => state.setTrailMarker);

  const activePin = usePinStore((state) => state.activePin);
  const setActivePin = usePinStore((state) => state.setActivePin);
  const activeTrail = usePinStore((state) => state.activeTrail);
  const setActiveTrail = usePinStore((state) => state.setActiveTrail);
  const removeActivePin = usePinStore((state) => state.removeActivePin);
  const removeActiveTrail = usePinStore((state) => state.removeActiveTrail);

  useEffect(() => {
    if (map && pointMarker && activePin) {
      map.closePopup();
      map.flyTo([Number(activePin.location.latitude), Number(activePin.location.longitude)], MAX_ZOOM, {
        animate: true
      });
      setTimeout(() => {
        pointMarker.openPopup();
      }, 200);
    }
    if (map && trailMarker && activeTrail) {
      map?.closePopup();
      const bounds = latLngBounds(
        activeTrail.location.map((c) => {
          return [c[0], c[1]];
        })
      );
      map?.flyToBounds(bounds);
      setTimeout(() => {
        trailMarker.openPopup();
      }, 200);
    }
  }, [map, pointMarker, trailMarker, activePin, activeTrail]);

  const [userLocation, setUserLocation] = useState<{ latlng: LatLng; accuracy: number } | null>();

  useEffect(() => {
    if (!map) return;
    updatePins(map.getBounds());
  }, [map, updatePins]);

  const Events = () => {
    const map = useMapEvents({
      moveend() {
        updatePins(map.getBounds());
      },
      zoomend() {},
      zoomstart() {},
      locationfound(e) {
        setUserLocation({ latlng: e.latlng, accuracy: e.accuracy });
        map?.flyTo(e.latlng, DEFAULT_ZOOM, {
          animate: true
        });
      },
      locationerror(e) {
        alert(e.message);
      },
      popupclose(e) {
        //setActivePin(null);
      },
      popupopen(e) {}
    });

    return null;
  };

  const pathOptions = {
    weight: 3,
    color: RED
  };

  const pathOptionsHover = {
    weight: 3,
    color: '#FFFFFF'
  };

  const getPathOptions = (trail: Trail) => {
    let pathOptions = {
      weight: 3,
      color: RED
    };
    if (trail.trail_color == '#0000FF') {
      pathOptions.color = BLUE;
    }
    if (trail.trail_color == '#008000') {
      pathOptions.color = GREEN;
    }
    if (trail.trail_color == '#FF0000') {
      pathOptions.color = RED;
    }
    if (trail.trail_color == '#FFFF00') {
      pathOptions.color = YELLOW;
    }
    if (trail.trail_color == '#000000') {
      pathOptions.color = BLACK;
    }
    return pathOptions;
  };

  //const LATLNG = [48.470791, 24.579491]; // Yaremche
  const DEFAULT_MAP_CENTER: LatLngTuple = [48.2929828, 24.5635786];

  return (
    <div className="h-full w-full relative">
      <MapContainer
        ref={(m) => setMap(m as LMap)}
        center={DEFAULT_MAP_CENTER}
        minZoom={MIN_PIN_ZOOM}
        zoom={DEFAULT_ZOOM}
        className="h-full w-full !bg-background"
        zoomControl={false}
        style={{ zIndex: 40 }}
      >
        <TileLayer
          attribution={currentTile?.attribution}
          url={currentTile?.url || 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'}
        />

        {activePin && (
          <Marker
            ref={(m) => setPointMarker(m as LMarker)}
            position={[Number(activePin.location.latitude), Number(activePin.location.longitude)]}
            icon={markerDivIcon(getItemColor(activePin))}
          >
            {activePin.price && (
              <Tooltip offset={[0, -10]} direction={'top'} opacity={0.8} permanent={true}>
                {activePin.price}
              </Tooltip>
            )}
            <Popup className="flex text-center">
              <p className="absolute m-0 top-2 left-2 rounded-md bg-red-50 px-2 py-1 text-xs font-medium text-red-700 ring-1 ring-inset ring-red-600/10">
                {activePin.category}
              </p>
              {activePin.image && (
                <Image
                  src={activePin.image}
                  width={250}
                  height={250}
                  alt={activePin.name}
                  className="object-cover h-48 w-96"
                />
              )}
              <div className="m-4">
                <p className="text-base">{activePin.name}</p>
                <p className="text-xs">{activePin.location.street}</p>
                {activePin.pricetext && <p className="text-sm">{activePin.pricetext}</p>}
                <Button className="mt-2" size="sm" variant="secondary">
                  <a className="text-white" href={activePin.url} target="_blank" rel="noopener noreferrer">
                    Докладніше
                  </a>
                </Button>
              </div>
            </Popup>
          </Marker>
        )}

        {pins.map((pin) => {
          if (activePin?.id !== pin.id) {
            return (
              <Marker
                key={pin.id}
                position={[Number(pin.location.latitude), Number(pin.location.longitude)]}
                icon={markerDivIcon(getItemColor(pin))}
                eventHandlers={{
                  click: (e) => {
                    removeActiveTrail(null);
                    setActivePin(pin);
                  }
                }}
              >
                {pin.price && (
                  <Tooltip offset={[0, -10]} direction={'top'} opacity={0.8} permanent={true}>
                    {pin.price}
                  </Tooltip>
                )}
              </Marker>
            );
          }
        })}

        {activeTrail && (
          <Polyline
            ref={(p) => setTrailMarker(p as LPolyline)}
            key={activeTrail.id}
            pathOptions={getPathOptions(activeTrail)}
            positions={activeTrail.location}
            eventHandlers={{
              mouseover: (e) => {
                var layer = e.target;
                layer.setStyle(pathOptionsHover);
              },
              mouseout: (e) => {
                var layer = e.target;
                const pathOptions = getPathOptions(activeTrail);
                layer.setStyle(pathOptions);
              }
            }}
          >
            <Tooltip sticky>{activeTrail.name}</Tooltip>
            <Popup className="flex text-center">
              <p className="absolute m-0 top-2 left-2 rounded-md bg-red-50 px-2 py-1 text-xs font-medium text-red-700 ring-1 ring-inset ring-red-600/10">
                {activeTrail.category}
              </p>
              <Image
                src={activeTrail.image}
                width={250}
                height={250}
                alt={activeTrail.name}
                className="object-cover h-48 w-96"
              />
              <div className="m-4">
                <p className="text-base">{activeTrail.name}</p>
                {activeTrail.trail_max_elevation && (
                  <p className="text-xs">Максимальна висота: {activeTrail.trail_max_elevation}м</p>
                )}
                {activeTrail.trail_length && <p className="text-sm">Довжина: {activeTrail.trail_length}м</p>}
                <Button className="mt-2" size="sm" variant="secondary">
                  <a className="text-white" href={activeTrail.url} target="_blank" rel="noopener noreferrer">
                    Докладніше
                  </a>
                </Button>
              </div>
            </Popup>
          </Polyline>
        )}

        {trails.map((trail) => {
          if (activeTrail?.id !== trail.id) {
            return (
              <Polyline
                key={trail.id}
                pathOptions={getPathOptions(trail)}
                positions={trail.location}
                eventHandlers={{
                  mouseover: (e) => {
                    var layer = e.target;
                    layer.setStyle(pathOptionsHover);
                  },
                  mouseout: (e) => {
                    var layer = e.target;
                    const pathOptions = getPathOptions(trail);
                    layer.setStyle(pathOptions);
                  },
                  click: (e) => {
                    removeActivePin(null);
                    setActiveTrail(trail);
                  }
                }}
              >
                <Tooltip sticky>{trail.name}</Tooltip>
              </Polyline>
            );
          }
        })}

        {userLocation && <CircleMarker center={userLocation.latlng} radius={20} fillOpacity={0.6} />}

        <Events />
        <Controls />
      </MapContainer>
    </div>
  );
};

export default Map;
