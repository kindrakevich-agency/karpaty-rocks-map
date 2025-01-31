export const MIN_PIN_ZOOM = 10;
export const DEFAULT_ZOOM = 16;
export const MAX_ZOOM = 18;
export const MAX_CITY_ZOOM = 15;

import { MapTiles } from '@/api/data';

export const mapTiles: MapTiles = [
  {
    name: 'default',
    title: 'Open street map',
    url: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
    attribution: '© <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
  },
  {
    name: 'satellite',
    title: 'Satellite',
    url: 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}',
    attribution: '© <a href="https://www.arcgis.com">Powered by Esri</a>'
  }
];
