import { NextResponse } from 'next/server';

export const GET = async (request: Request) => {
  const { searchParams } = new URL(request.url);
  const NorthEast_lat = searchParams.get('NorthEast_lat');
  const NorthEast_lon = searchParams.get('NorthEast_lon');
  const SouthWest_lat = searchParams.get('SouthWest_lat');
  const SouthWest_lon = searchParams.get('SouthWest_lon');
  const filter = searchParams.get('filter');
  const API_URL = 'https://api.karpaty.rocks';
  const url = `${API_URL}/map?NorthEast_lat=${NorthEast_lat}&NorthEast_lon=${NorthEast_lon}&SouthWest_lat=${SouthWest_lat}&SouthWest_lon=${SouthWest_lon}&filter=${filter}&key=${process.env.KARPATY_ACCESS_TOKEN}`;
  const res = await fetch(url);
  const response = new NextResponse(res.body);
  return response;
};

export const runtime = 'edge';
