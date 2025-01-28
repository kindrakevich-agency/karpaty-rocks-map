import { Map, Marker, Polyline } from 'leaflet';
import { create } from 'zustand';

export type DrawerSnapPoint = '40px' | '105px' | 1;

interface MapState {
  map: Map | null;
  setMap: (map: Map) => void;
  pointMarker: Marker | null;
  setPointMarker: (pointMarker: Marker) => void;
  trailMarker: Polyline | null;
  setTrailMarker: (trailMarker: Polyline) => void;
  drawerSnapPoint: DrawerSnapPoint;
  setDrawerSnapPoint: (point: DrawerSnapPoint) => void;
}

export const useMapStore = create<MapState>((set) => ({
  map: null,
  setMap: (map) => set({ map }),
  pointMarker: null,
  setPointMarker: (pointMarker) => set({ pointMarker }),
  trailMarker: null,
  setTrailMarker: (trailMarker) => set({ trailMarker }),
  drawerSnapPoint: '105px',
  setDrawerSnapPoint: (point) => set({ drawerSnapPoint: point })
}));
