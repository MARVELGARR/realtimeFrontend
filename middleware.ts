import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// Routes that require authentication
export const config = {
  matcher: 
    "/Ap/:path*"
  
};

// Middleware function
export default async function middleware(request: NextRequest) {
  const sessionData = request.cookies.get("sessionData")?.value;


  if (!sessionData || sessionData === null || sessionData === "null") {
    const loginUrl = new URL("/login", request.url);
    return NextResponse.redirect(loginUrl);
  }


}
