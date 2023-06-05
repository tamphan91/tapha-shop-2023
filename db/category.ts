import { Category } from "@prisma/client";
import { prisma } from "./prisma";

export function getCategories(): Promise<Category[]> {
  return prisma.category.findMany({
    include: {
      children: true,
      parent: true,
    },
  });
}
