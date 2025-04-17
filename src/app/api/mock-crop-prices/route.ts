"use server";

import {NextResponse} from 'next/server';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const crop = searchParams.get('crop') || 'wheat';

  const mockData = [
    {
      crop: crop,
      market: "Mumbai",
      price: "$250/ton",
      date: "2024-08-01"
    },
    {
      crop: crop,
      market: "Delhi",
      price: "$240/ton",
      date: "2024-08-01"
    },
    {
      crop: crop,
      market: "Chennai",
      price: "$260/ton",
      date: "2024-08-01"
    },
    {
      crop: crop,
      market: "Bangalore",
      price: "$270/ton",
      date: "2024-08-01"
    }
  ];

  return NextResponse.json(mockData);
}

