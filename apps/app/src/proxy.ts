import { auth } from "./auth";
import { NextResponse } from "next/server";

type MiddlewareFn = (req: Request) => Response | NextResponse | void;

export const proxy = auth((req) => {
  const isLoggedIn = !!req.auth;
  const isOnDashboard = req.nextUrl.pathname.startsWith("/dashboard");
  const isOnProfile = req.nextUrl.pathname.startsWith("/profile");

  if ((isOnDashboard || isOnProfile) && !isLoggedIn) {
    return Response.redirect(new URL("/sign-in", req.nextUrl));
  }

  return NextResponse.next();
}) as unknown as MiddlewareFn;

export const config = {
  matcher: ["/dashboard/:path*", "/profile/:path*", "/profile"],
};
