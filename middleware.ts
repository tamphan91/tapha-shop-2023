import { NextRequest, NextResponse } from "next/server";
import { verifyToken } from "./lib/auth";

// Limit the middleware to paths starting with `/api/`
export const config = {
  matcher: "/api/dashboard/:function*",
};

export function middleware(request: NextRequest) {
  const requestHeaders = new Headers(request.headers);
  const authorization = requestHeaders.get("authorization");
  if (authorization) {
    const token = authorization.slice(7, authorization.length);
    // Call our authentication function to check the request
    const decoded = verifyToken(token);
    console.log("decoded", decoded);
    if (decoded) {
      // do something with the decoded token
      return NextResponse.next();
    }
  }

  // Respond with JSON indicating an error message
  return new NextResponse(
    JSON.stringify({ success: false, message: "authentication failed" }),
    { status: 401, headers: { "content-type": "application/json" } }
  );
}
