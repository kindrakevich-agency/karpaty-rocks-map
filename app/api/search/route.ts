import { NextResponse } from 'next/server';

export const GET = async (request: Request) => {
  const { searchParams } = new URL(request.url);
  const value = searchParams.get('value');
  const API_URL = 'https://api.karpaty.rocks';
  const url = `${API_URL}/map/search?value=${value}&key=${process.env.KARPATY_ACCESS_TOKEN}`;
  const res = await fetch(url);
  const response = new NextResponse(res.body);
  return response;
};

export const runtime = 'edge';
