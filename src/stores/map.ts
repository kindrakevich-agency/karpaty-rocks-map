import { Map, Marker, Polyline } from 'leaflet';
import { create } from 'zustand';
import { mapTiles } from '@/components/Map/constants';
import { MapTile } from '@/api/data';
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
  tile: MapTile | null;
  setTile: (tile: MapTile) => void;
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
  setTile: (tile) => set({ tile: tile })
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
