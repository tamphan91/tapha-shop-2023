import { User } from '@prisma/client';
import bcrypt from "bcryptjs";
import { prisma } from './prisma';

type SignUp = {
  email: string;
  firstName: string;
  lastName: string;
  password: string;
};

export async function signup(data: SignUp): Promise<User> {
  const hash = await bcrypt.hash(data.password, 10);
  data.password = hash;
  return prisma.user.create({ data });
}

export function getUsers(): Promise<User[]> {
  return prisma.user.findMany();
}