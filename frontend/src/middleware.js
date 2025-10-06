import { NextResponse } from 'next/server';
import cookie from 'cookie';

export function middleware(request) {
  const rawCookie = request.headers.get('cookie') || '';
  const cookies = cookie.parse(rawCookie);
  const token = cookies.auth;

  const { pathname } = request.nextUrl;
  const isAuthenticated = Boolean(token);

  const isLoginRoute = pathname === '/login' || pathname === '/';
  const isProtectedRoute = pathname.startsWith('/dashboard');

  // Redirect unauthenticated users from protected routes
  if (!isAuthenticated && isProtectedRoute) {
    return NextResponse.redirect(new URL('/', request.url));
  }

  // Redirect authenticated users away from the login page
  if (isAuthenticated && isLoginRoute) {
    return NextResponse.redirect(new URL('/dashboard', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/', '/login', '/dashboard/:path*'],
};
