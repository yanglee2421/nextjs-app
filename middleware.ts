import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

let i = false;
// This function can be marked `async` if using `await` inside
export default function middleware(request: NextRequest) {
  console.log(request);
  if (!i) {
    i = true;
    return NextResponse.redirect(new URL('/demo/xxx', request.url));
  }
  return;
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};
