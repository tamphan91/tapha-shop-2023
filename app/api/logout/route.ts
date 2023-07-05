import { expireUserCookie } from "@/lib/auth";
import { jsonResponse } from "@/lib/auth/utils";

export async function GET() {
  return expireUserCookie(jsonResponse(200, { success: true }));
}
