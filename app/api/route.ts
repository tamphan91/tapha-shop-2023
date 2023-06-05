import { prisma } from '@/db/prisma';
import { exclude } from '@/db/utils';
import { NextResponse } from "next/server";

export async function GET() {
  const users = await prisma.user.findMany();
  users.map(user => exclude(user, ['password']));
  return NextResponse.json(users);
}
