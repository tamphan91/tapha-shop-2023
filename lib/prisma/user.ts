import { User } from "@prisma/client";
import bcrypt from "bcryptjs";
import { prisma } from ".";
import { generatePassword } from '@/lib/auth';

type SignUp = {
  email: string;
  firstName: string;
  lastName: string;
  password: string;
};

export async function signup(data: SignUp): Promise<User> {
  const hash = generatePassword(data.password);
  data.password = hash;
  return prisma.user.create({ data });
}

export function getUsers(): Promise<User[]> {
  return prisma.user.findMany();
}

export function getUserByEmailOrPhoneNumber(
  emailOrPhoneNumber: string
): Promise<User | null> {
  return prisma.user.findFirst({
    where: {
      OR: [{ email: emailOrPhoneNumber }, { phoneNumber: emailOrPhoneNumber }],
    },
  });
}
