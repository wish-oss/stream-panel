import { NextRequest, NextResponse } from 'next/server';

export async function POST(_req: NextRequest) {
  // const { content } = await req.json();

  return new NextResponse('Received', {
    status: 200,
  });
}
