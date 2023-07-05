import { NextRequest, NextResponse } from "next/server";
import { verifyAuth } from "./lib/auth";
import { jsonResponse } from "./lib/auth/utils";

// Limit the middleware to paths starting with `/api/`
export const config = {
  matcher: "/api/dashboard/:function*",
};

export async function middleware(req: NextRequest) {
  // validate the user is authenticated
  const verifiedToken = await verifyAuth(req).catch((err) => {
    console.error(err.message)
  })
  console.log('verifiedToken', verifiedToken);
  console.log('req.url', req.url);
  if (!verifiedToken) {
    // if this an API request, respond with JSON
    if (req.nextUrl.pathname.startsWith('/api/')) {
      return jsonResponse(401, { error: { message: 'authentication required' } })
    }
    // otherwise, redirect to the set token page
    else {
      return NextResponse.redirect(new URL('/', req.url))
    }
  }
}
