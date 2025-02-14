import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// Routes that require authentication
export const config = {
  matcher: 
    "/App/:path*",
  
};

// Middleware function
export default async function middleware(request: NextRequest) {
  const token = request.cookies.get("sessionID")?.value;


  if (!token || token === null || token === "null") {
    const loginUrl = new URL("/login", request.url);
    return NextResponse.redirect(loginUrl);
  }


}
