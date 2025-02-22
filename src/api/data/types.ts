import { LatLng, LatLngBoundsLiteral } from 'leaflet';

export type RouteStart = LatLng | null;
export type RouteEnd = LatLng | null;
export type Route = [number, number][];

export type Filter = {
  filter: string;
};

export interface Pin {
  id: number;
  name: string;
  body: string;
  category: string;
  subcategory: string;
  image: string;
  url: string;
  location: {
    latitude: string;
    street: string;
    longitude: string;
  };
  price: string;
  pricetext: string;
  height: number | null;
}

export interface Trail {
  id: number;
  name: string;
  category: string;
  subcategory: string;
  image: string;
  url: string;
  location: LatLngBoundsLiteral;
  trail_color: string | null;
  trail_ascent: number;
  trail_descent: number;
  trail_length: number;
  trail_max_elevation: number;
  trail_min_elevation: number;
  height: number | null;
  elevation_svg: string | null;
}

export type Place = {
  id: number;
  name: string;
  category: string;
  location: {
    latitude: string;
    longitude: string;
  };
};

export type Search = {
  places: Place[] | null;
  trails: Trail[] | null;
  hotels: Pin[] | null;
  culture: Pin[] | null;
  rocks: Pin[] | null;
};

export type Location = {
  title: string | null;
  subtitle: string | null;
};

export type MapTile = {
  name: string;
  title: string;
  url: string;
  attribution: string;
};

export type MapTiles = MapTile[];
