import { prisma } from '@/lib/prisma';
import { exclude } from '@/lib/prisma/ultis';
import { NextResponse } from "next/server";

export async function GET() {
  const users = await prisma.user.findMany();
  users.map(user => exclude(user, ['password']));
  return NextResponse.json(users);
}
