import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import getToken from './actions/AuthActions/getToken'

export function middleware(request: NextRequest) {
  const sessionID = getToken()
  if(!sessionID){
    console.log("No sessionID found in cookies")
  }

   

  const { pathname } = request.nextUrl

  // Protect /Application/* routes
  if (pathname.startsWith('/Application')) {
    if (!sessionID) {
      return NextResponse.redirect(new URL('/login', request.url))
    }

    // If path is exactly /Application, rewrite to /Application/chat
    if (pathname === '/Application') {
      return NextResponse.rewrite(new URL('/Application/chat', request.url))
    }
    if (pathname === '') {
      return NextResponse.rewrite(new URL('/Application/chat', request.url))
    }

    // Allow other /Application/* routes
    return NextResponse.next()
  }

  // Allow /login and /register routes
  return NextResponse.next()
}

export const config = {
  matcher: ['/Application/:path*', "/:path*"],
}
