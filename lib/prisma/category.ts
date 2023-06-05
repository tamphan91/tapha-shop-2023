import { Category } from "@prisma/client";
import { prisma } from ".";

export function getCategories(): Promise<Category[]> {
  return prisma.category.findMany({
    include: {
      children: true,
      parent: true,
    },
  });
}
