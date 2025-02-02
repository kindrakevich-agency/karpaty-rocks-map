import { NextResponse } from 'next/server';

export const GET = async (request: Request) => {
  const { searchParams } = new URL(request.url);
  const startLng = searchParams.get('startLng');
  const startLat = searchParams.get('startLat');
  const endLng = searchParams.get('endLng');
  const endLat = searchParams.get('endLat');
  const url = `https://api.mapbox.com/directions/v5/mapbox/walking/${startLng}%2C${startLat}%3B${endLng}%2C${endLat}?alternatives=false&continue_straight=true&geometries=geojson&overview=simplified&steps=false&access_token=${process.env.MAPBOX_ACCESS_TOKEN}`;
  const res = await fetch(url);
  const response = new NextResponse(res.body);
  return response;
};

export const runtime = 'edge';
