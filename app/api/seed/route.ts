import { prisma } from "@/lib/prisma";
import { signup } from "@/lib/prisma/user";
import { NextResponse } from "next/server";

export async function GET() {
  await prisma.user.deleteMany();
  await signup({
    firstName: "Tam",
    lastName: "Phan",
    password: "123456",
    email: "admin@com",
  });

  await prisma.category.deleteMany({ where: { children: { none: {} } } });
  await prisma.category.deleteMany({ where: { children: { none: {} } } });
  await prisma.category.deleteMany({ where: { children: { none: {} } } });
  await prisma.category.create({
    data: {
      name: "Men",
      slug: "men",
      children: {
        create: [
          {
            name: "Clothing",
            slug: "men-clothing",
            children: {
              create: [
                {
                  name: "Shirts",
                  slug: "men-clothing-shirts",
                },
              ],
            },
          },
          {
            name: "Underwear",
            slug: "men-clothing-underwear",
          },
        ],
      },
    },
  });
  return NextResponse.json({ message: "Seed API!" });
}
