import { LatLngBoundsLiteral } from 'leaflet';

export type Filter = {
  filter: string;
};

export interface Pin {
  id: number;
  name: string;
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
}

export type Place = {
  id: number;
  name: string;
  category: string;
  latitude: string;
  longitude: string;
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
