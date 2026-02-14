import NextAuth from "next-auth";
import authConfig from "@/auth.config";
import {
  DEFAULT_LOGIN_REDIRECT,
  apiAuthPrefix,
  authRoutes,
  publicRoutes,
  adminRoutes,
  pelaporRoutes,
} from "@/lib/routes"; 

const { auth } = NextAuth(authConfig);

export default auth((req) => {
  const { nextUrl } = req;
  const isLoggedIn = !!req.auth;
  // @ts-ignore
  const userRole = req.auth?.user?.role;

  const isApiAuthRoute = nextUrl.pathname.startsWith(apiAuthPrefix);
  const isPublicRoute = publicRoutes.includes(nextUrl.pathname);
  const isAuthRoute = authRoutes.includes(nextUrl.pathname);
  
  const isAdminRoute = nextUrl.pathname.startsWith("/admin");
  const isPelaporProtected = nextUrl.pathname.startsWith("/report");

  if (isApiAuthRoute) return;

  if (isAuthRoute) {
    if (isLoggedIn) {
      const target = userRole === "ADMIN" ? "/admin/dashboard" : "/";
      return Response.redirect(new URL(target, nextUrl));
    }
    return;
  }

  if (!isLoggedIn && !isPublicRoute) {
    let callbackUrl = nextUrl.pathname;
    if (nextUrl.search) callbackUrl += nextUrl.search;
    return Response.redirect(new URL(`/login?callbackUrl=${encodeURIComponent(callbackUrl)}`, nextUrl));
  }

  if (isAdminRoute && userRole !== "ADMIN") {
    return Response.redirect(new URL("/", nextUrl));
  }

  return;
});

export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};