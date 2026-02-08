import { NextRequest, NextResponse } from 'next/server';

const PROTECTED = ['/courses'];
const PUBLIC_ONLY = ['/login', '/signup'];

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const token = request.cookies.get('token')?.value;

  if (PROTECTED.some((p) => pathname.startsWith(p))) {
    if (!token) {
      return NextResponse.redirect(new URL('/login?reason=unauthenticated', request.url));
    }
  }

  if (PUBLIC_ONLY.some((p) => pathname === p)) {
    if (token) {
      return NextResponse.redirect(new URL('/courses', request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/courses/:path*', '/login', '/signup'],
};
