import { NextResponse } from 'next/server';
import { jwtVerify } from 'jose';

const secret = new TextEncoder().encode(process.env.JWT_SECRET || "rahasia_super_aman_123");

export async function middleware(request) {
  const token = request.cookies.get('session_token')?.value;
  const { pathname } = request.nextUrl;

  // 1. KECUALIKAN halaman login dari pengecekan token
  // Jika tidak, user yang belum login tidak akan pernah bisa buka halaman login
  if (pathname === '/admin/login') {
    // Jika user SUDAH login tapi malah buka halaman login, lempar ke dashboard
    if (token) {
      try {
        await jwtVerify(token, secret);
        return NextResponse.redirect(new URL('/admin', request.url));
      } catch (err) {
        // Token tidak valid, biarkan dia tetap di halaman login
        return NextResponse.next();
      }
    }
    return NextResponse.next();
  }

  // 2. PROTEKSI semua route yang dimulai dengan /admin
  if (pathname.startsWith('/admin')) {
    if (!token) {
      return NextResponse.redirect(new URL('/admin/login', request.url));
    }

    try {
      // Verifikasi token
      await jwtVerify(token, secret);
      return NextResponse.next();
    } catch (err) {
      // Jika token expired atau palsu, bersihkan cookie dan redirect
      const response = NextResponse.redirect(new URL('/admin/login', request.url));
      response.cookies.delete('session_token');
      return response;
    }
  }

  return NextResponse.next();
}

// Tetap jalankan middleware untuk folder admin
export const config = {
  matcher: '/admin/:path*',
};