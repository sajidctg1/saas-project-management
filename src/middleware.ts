import { getSessionCookie } from "better-auth/cookies";
import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

import { AUTH_URI, DEFAULT_LOGIN_REDIRECT } from "./features/auth/constants";

const authRoutes: string[] = Object.values(AUTH_URI);
const publicRoutes = ["/"];

export async function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;
  const sessionCookie = getSessionCookie(request);
  // Add a new header x-current-path which passes the path to downstream components
  const headers = new Headers(request.headers);
  headers.set("x-current-path", path);

  if (publicRoutes.includes(path)) return NextResponse.next({ headers });

  if (authRoutes.includes(path) || path.startsWith(AUTH_URI.signIn)) {
    // if already login prevent access to auth page
    if (sessionCookie) {
      return NextResponse.redirect(
        new URL(DEFAULT_LOGIN_REDIRECT, request.nextUrl)
      );
    }
    return NextResponse.next({ headers });
  }

  let callbackUrl = path;
  if (request.nextUrl.search) callbackUrl += request.nextUrl.search;

  if (!sessionCookie) {
    return NextResponse.redirect(
      new URL(`${AUTH_URI.signIn}?callback-url=${callbackUrl}`, request.nextUrl)
    );
  }

  return NextResponse.next({ headers });
}

export const config = {
  matcher: [
    {
      // match all routes except static files and APIs
      source: "/((?!api|_next/static|_next/image|favicon.ico|assets).*)",
      missing: [
        { type: "header", key: "next-router-prefetch" },
        { type: "header", key: "next-action" },
        { type: "header", key: "purpose", value: "prefetch" },
      ],
    },
  ],
};
