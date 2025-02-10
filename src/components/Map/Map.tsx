'use client';

import { useMobile } from '@/hooks/useMobile';
import { usePinStore } from '@/stores/pins';
import { useMapStore } from '@/stores/map';
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
import { useShallow } from 'zustand/react/shallow';
import { getTrailLength } from '@/utils/helpers';
import { useSearchParams } from 'next/navigation';

const startIcon = L.divIcon({
  className: '',
  html: `<div class="w-full h-full flex items-center justify-center flex-col"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="${RED}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-flag"><path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z"/><line x1="4" x2="4" y1="22" y2="15"/></svg>СТАРТ</div>`,
  iconSize: [42, 42]
});

const endIcon = L.divIcon({
  className: '',
  html: `<div class="w-full h-full flex items-center justify-center flex-col"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="${BLUE}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-flag"><path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z"/><line x1="4" x2="4" y1="22" y2="15"/></svg>ФІНІШ</div>`,
  iconSize: [42, 42]
});

const getItemIcon = (pin: Pin, active: boolean) => {
  let className = '';
  if (active) {
    className = 'active-marker';
  }
  switch (pin.subcategory) {
    case 'Вершини':
      return L.divIcon({
        className: className,
        html: `<div class="w-full h-full rounded-full text-white flex items-center justify-center" style="background-color: ${RED}; border: 1px solid #FFF;"><svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#FFFFFF" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-mountain"><path d="m8 3 4 8 5-5 5 15H2L8 3z"/></svg></div>`,
        iconSize: [22, 22]
      });
  }
  switch (pin.category) {
    case 'Проживання':
      return L.divIcon({
        className: className,
        html: `<div class="w-full h-full rounded-full text-white flex items-center justify-center" style="background-color: ${BLUE}; border: 1px solid #FFF;"><svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#FFFFFF" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-house"><path d="M15 21v-8a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v8"/><path d="M3 10a2 2 0 0 1 .709-1.528l7-5.999a2 2 0 0 1 2.582 0l7 5.999A2 2 0 0 1 21 10v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/></svg></div>`,
        iconSize: [22, 22]
      });
    default:
      return L.divIcon({
        className: className,
        html: `<div class="w-full h-full rounded-full text-white flex items-center justify-center" style="background-color: ${GREEN}; border: 1px solid #FFF;"><svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-landmark"><line x1="3" x2="21" y1="22" y2="22"/><line x1="6" x2="6" y1="18" y2="11"/><line x1="10" x2="10" y1="18" y2="11"/><line x1="14" x2="14" y1="18" y2="11"/><line x1="18" x2="18" y1="18" y2="11"/><polygon points="12 2 20 7 4 7"/></svg></div>`,
        iconSize: [22, 22]
      });
  }
};

const checkZoom = (zoom: number, index: number) => {
  if (zoom < 16 && index % 2) {
    return false;
  }
  if (zoom < 15 && index % 3) {
    return false;
  }
  if (zoom < 14 && index % 5) {
    return false;
  }
  return true;
};

const Map = () => {
  const { theme, setTheme } = useTheme();
  const searchParams = useSearchParams();
  const initialTheme = searchParams.get('theme');
  const initialLat = searchParams.get('lat');
  const initialLon = searchParams.get('lon');
  const initialId = searchParams.get('id');
  const setEmbed = useMapStore((state) => state.setEmbed);
  if (initialTheme == 'light') {
    setTheme('light');
    setEmbed(true);
  }

  const map = useMapStore((state) => state.map);
  const { drawerSnapPoint, setDrawerSnapPoint } = useMapStore(
    useShallow((state) => ({ drawerSnapPoint: state.drawerSnapPoint, setDrawerSnapPoint: state.setDrawerSnapPoint }))
  );
  const currentTile = useMapStore((state) => state.tile);
  const setMap = useMapStore((state) => state.setMap);
  const pins = usePinStore((state) => state.pins);
  const trails = usePinStore((state) => state.trails);
  const updatePins = usePinStore((state) => state.updatePins);
  const selectedFilter = usePinStore((state) => state.selectedFilter);

  const pointMarker = useMapStore((state) => state.pointMarker);
  const setPointMarker = useMapStore((state) => state.setPointMarker);
  const trailMarker = useMapStore((state) => state.trailMarker);
  const setTrailMarker = useMapStore((state) => state.setTrailMarker);
  const setDrawRoute = useMapStore((state) => state.setDrawRoute);
  const drawRoute = useMapStore((state) => state.drawRoute);
  const setRouteStart = useMapStore((state) => state.setRouteStart);
  const routeStart = useMapStore((state) => state.routeStart);
  const setRouteEnd = useMapStore((state) => state.setRouteEnd);
  const routeEnd = useMapStore((state) => state.routeEnd);

  const setRoute = useMapStore((state) => state.setRoute);
  const route = useMapStore((state) => state.route);

  let activePin = usePinStore((state) => state.activePin);
  const setActivePin = usePinStore((state) => state.setActivePin);
  const activeTrail = usePinStore((state) => state.activeTrail);
  const setActiveTrail = usePinStore((state) => state.setActiveTrail);
  const removeActivePin = usePinStore((state) => state.removeActivePin);
  const removeActiveTrail = usePinStore((state) => state.removeActiveTrail);

  const isMobile = useMobile();

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
    updatePins(map.getBounds(), selectedFilter);
  }, [map, updatePins, selectedFilter]);

  const Events = () => {
    const map = useMapEvents({
      click(e) {
        if (drawRoute) {
          if (!routeStart) {
            setRouteStart(e.latlng);
          } else if (!routeEnd) {
            setRouteEnd(e.latlng);
            setDrawRoute(false);
            setRoute(routeStart, e.latlng);
          }
        }
      },
      moveend() {
        updatePins(map.getBounds(), selectedFilter);
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
      popupclose(e) {},
      popupopen(e) {}
    });

    return null;
  };

  const pathOptions = {
    weight: 3,
    color: RED
  };

  const pathOptionsRoute = {
    weight: 7,
    color: RED
  };

  const pathOptionsHover = {
    weight: 3,
    color: '#FFFFFF'
  };

  const getPathOptions = (trail: Trail, active: boolean) => {
    let pathOptions = {
      weight: 3,
      color: RED
    };
    if (active) {
      pathOptions = {
        weight: 8,
        color: RED
      };
      return pathOptions;
    }
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

  let INITIAL_ZOOM = DEFAULT_ZOOM;
  let DEFAULT_MAP_CENTER: LatLngTuple = [48.2929828, 24.5635786];
  if (initialLat && initialLon) {
    DEFAULT_MAP_CENTER = [parseFloat(initialLat), parseFloat(initialLon)];
    INITIAL_ZOOM = MAX_ZOOM;
    if (initialId) {
      const initialPin = pins.filter((pin) => pin.id === parseInt(initialId));
      activePin = initialPin[0];
      //setActivePin(activePin);
    }
  }

  const canvasRenderer = L.canvas({
    tolerance: 5
  });

  return (
    <div className={`${drawRoute ? 'map-crosshair' : 'map-base'} h-full w-full relative`}>
      <MapContainer
        ref={(m) => setMap(m as LMap)}
        center={DEFAULT_MAP_CENTER}
        minZoom={MIN_PIN_ZOOM}
        zoom={INITIAL_ZOOM}
        className="h-full w-full !bg-background map-container"
        zoomControl={false}
        style={{ zIndex: 40 }}
        preferCanvas={true}
        renderer={canvasRenderer}
      >
        <TileLayer
          attribution={currentTile?.attribution}
          url={currentTile?.url || 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'}
        />

        {routeStart && <Marker position={routeStart} icon={startIcon} />}
        {routeEnd && <Marker position={routeEnd} icon={endIcon} />}
        {route && <Polyline pathOptions={pathOptionsRoute} positions={route} />}

        {activePin && (
          <Marker
            ref={(m) => setPointMarker(m as LMarker)}
            position={[Number(activePin.location.latitude), Number(activePin.location.longitude)]}
            icon={getItemIcon(activePin, true)}
          >
            {activePin.price && (
              <Tooltip offset={[0, -10]} direction={'top'} opacity={0.8} permanent={true}>
                {activePin.price}
              </Tooltip>
            )}
            {!isMobile && (
              <Popup className="flex text-center">
                <p className="absolute m-0 top-2 left-2 rounded-md bg-red-50 px-2 py-1 text-xs font-medium text-red-700 ring-1 ring-inset ring-red-600/10">
                  {activePin.category}
                </p>
                {activePin.image && (
                  <Image
                    src={activePin.image}
                    width={200}
                    height={200}
                    alt={activePin.name}
                    className="object-cover h-48 w-96"
                  />
                )}
                <div className="m-4">
                  <p className="text-base">{activePin.name}</p>
                  <p className="text-xs">{activePin.location.street}</p>
                  {initialId === null && (
                    <Button className="mt-2" size="sm" variant="secondary">
                      <a className="text-white" href={activePin.url} target="_blank" rel="noopener noreferrer">
                        Докладніше
                      </a>
                    </Button>
                  )}
                </div>
              </Popup>
            )}
          </Marker>
        )}

        {pins?.map((pin, index) => {
          if (activePin?.id !== pin.id && map) {
            const zoom = map.getZoom();
            return (
              <Marker
                key={pin.id}
                position={[Number(pin.location.latitude), Number(pin.location.longitude)]}
                icon={getItemIcon(pin, false)}
                eventHandlers={{
                  click: (e) => {
                    removeActiveTrail(null);
                    setActivePin(pin);
                    setDrawerSnapPoint('205px');
                  }
                }}
              >
                {pin.price && checkZoom(zoom, index) && (
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
            pathOptions={getPathOptions(activeTrail, true)}
            positions={activeTrail.location}
            eventHandlers={{
              mouseover: (e) => {
                var layer = e.target;
                layer.setStyle(pathOptionsHover);
              },
              mouseout: (e) => {
                var layer = e.target;
                const pathOptions = getPathOptions(activeTrail, true);
                layer.setStyle(pathOptions);
              }
            }}
          >
            <Tooltip sticky permanent={isMobile}>
              {activeTrail.name}
            </Tooltip>
            {!isMobile && (
              <Popup className="flex text-center">
                <p className="absolute m-0 top-2 left-2 rounded-md bg-red-50 px-2 py-1 text-xs font-medium text-red-700 ring-1 ring-inset ring-red-600/10">
                  {activeTrail.category}
                </p>
                <Image
                  src={activeTrail.image}
                  width={200}
                  height={200}
                  alt={activeTrail.name}
                  className="object-cover h-48 w-96"
                />
                <div className="m-4">
                  <p className="text-base leading-1 mb-2">{activeTrail.name}</p>
                  {activeTrail.trail_length && (
                    <p className="text-xs">Довжина: {getTrailLength(activeTrail.trail_length)}км</p>
                  )}
                  {activeTrail.trail_max_elevation && (
                    <p className="text-xs">Максимальна висота: {activeTrail.trail_max_elevation}м</p>
                  )}
                  <Button className="mt-2" size="sm" variant="secondary">
                    <a className="text-white" href={activeTrail.url} target="_blank" rel="noopener noreferrer">
                      Докладніше
                    </a>
                  </Button>
                </div>
              </Popup>
            )}
          </Polyline>
        )}

        {trails?.map((trail) => {
          if (activeTrail?.id !== trail.id) {
            return (
              <Polyline
                key={trail.id}
                pathOptions={getPathOptions(trail, false)}
                positions={trail.location}
                eventHandlers={{
                  mouseover: (e) => {
                    var layer = e.target;
                    layer.setStyle(pathOptionsHover);
                  },
                  mouseout: (e) => {
                    var layer = e.target;
                    const pathOptions = getPathOptions(trail, false);
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
