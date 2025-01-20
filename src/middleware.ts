import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
// import { auth } from "../auth.config";

export async function middleware(request: NextRequest) {
  // const session = await auth();
  // const session = await getServerSession();
  // console.log('\n\n>>> session', session);
  return NextResponse.next();
}
 
// See "Matching Paths" below to learn more
export const config = {
  matcher: '/api/admin',
}