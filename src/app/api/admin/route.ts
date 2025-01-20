
import { NextResponse } from 'next/server';

export async function GET() {
  console.log('>>> GET')
  return NextResponse.json({ ok: 'ok' }, { status: 200 });
}