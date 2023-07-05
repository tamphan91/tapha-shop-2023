import { verifyAuth } from "@/lib/auth";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const tokenPayload = await verifyAuth(req);
  console.log('tokenPayload', tokenPayload);
  return NextResponse.json({message: "Hello Dashboad API!"});
}
