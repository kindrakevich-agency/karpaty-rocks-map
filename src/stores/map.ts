import { Map, Marker, Polyline } from 'leaflet';
import { create } from 'zustand';
import { mapTiles } from '@/components/Map/constants';
import { MapTile, Route, RouteStart, RouteEnd } from '@/api/data';

export type DrawerSnapPoint = '40px' | '105px' | '205px' | 1;

interface MapState {
  map: Map | null;
  setMap: (map: Map) => void;
  pointMarker: Marker | null;
  setPointMarker: (pointMarker: Marker) => void;
  trailMarker: Polyline | null;
  setTrailMarker: (trailMarker: Polyline) => void;
  drawerSnapPoint: DrawerSnapPoint;
  setDrawerSnapPoint: (point: DrawerSnapPoint) => void;
  tile: MapTile | null;
  setTile: (tile: MapTile) => void;
  drawRoute: boolean;
  setDrawRoute: (drawRoute: boolean) => void;
  routeStart: RouteStart;
  setRouteStart: (routeStart: RouteStart) => void;
  routeEnd: RouteEnd;
  setRouteEnd: (routeEnd: RouteEnd) => void;
  route: Route;
  setRoute: (routeStart: RouteStart, routeEnd: RouteEnd) => void;
  embed: boolean;
  setEmbed: (embed: boolean) => void;
}

export const useMapStore = create<MapState>((set) => ({
  map: null,
  setMap: (map) => set({ map }),
  pointMarker: null,
  setPointMarker: (pointMarker) => set({ pointMarker }),
  trailMarker: null,
  setTrailMarker: (trailMarker) => set({ trailMarker }),
  drawerSnapPoint: '105px',
  setDrawerSnapPoint: (point) => set({ drawerSnapPoint: point }),
  tile: null,
  setTile: (tile) => set({ tile: tile }),
  drawRoute: false,
  setDrawRoute: (drawRoute: boolean) => {
    set({ drawRoute: drawRoute });
  },
  routeStart: null,
  setRouteStart: (routeStart: RouteStart) => {
    set({ routeStart: routeStart });
  },
  routeEnd: null,
  setRouteEnd: (routeEnd: RouteEnd) => {
    set({ routeEnd: routeEnd });
  },
  route: [],
  setRoute: async (routeStart: RouteStart, routeEnd: RouteEnd) => {
    const result = await fetch(
      `${process.env.NEXT_PUBLIC_FOLDER}api/buildroute?startLng=${routeStart?.lng}&startLat=${routeStart?.lat}&endLng=${routeEnd?.lng}&endLat=${routeEnd?.lat}`
    );
    const routeResult = await result.json();
    const coordinates = routeResult?.routes[0].geometry.coordinates;
    if (typeof coordinates !== 'undefined') {
      const route = coordinates.map((c: any) => {
        return [c[1], c[0]];
      });
      set({ route });
    }
  },
  embed: false,
  setEmbed: (embed: boolean) => {
    set({ embed: embed });
  }
}));

const initMapStore = async () => {
  const tiles = mapTiles;
  return {
    tiles
  };
};

initMapStore()
  .then((values) => useMapStore.setState({ tile: values.tiles[0] }))
  .catch((err) => console.error(err));
