import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
  function middleware(req) {
    const token = req.nextauth.token;
    const path = req.nextUrl.pathname;

    // Check if user is accessing admin routes
    if (path.startsWith("/admin")) {
      // Must be an admin
      if (!token || !token.roles || !(token.roles as string[]).includes("admin")) {
        return NextResponse.redirect(new URL("/dashboard", req.url));
      }
    }

    // Calon Mahasiswa trying to access /dashboard
    if (path.startsWith("/dashboard")) {
        if (!token || !token.roles || !(token.roles as string[]).includes("user")) {
            // Also allow admin to see regular dashboard for testing if needed
            if (token && token.roles && !(token.roles as string[]).includes("admin")) {
                return NextResponse.redirect(new URL("/login", req.url));
            } else if (!token || !token.roles) {
                return NextResponse.redirect(new URL("/login", req.url));
            }
        }
    }

    return NextResponse.next();
  },
  {
    callbacks: {
      authorized: ({ token }) => !!token,
    },
    pages: {
        signIn: '/login',
    }
  }
);

export const config = {
  matcher: ["/dashboard/:path*", "/admin/:path*"],
};
