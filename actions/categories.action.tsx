"use server";

import { prisma } from "@/db/prisma";
import { formatError, formatSuccess } from "@/lib/utils";

export const getCategories = async () => {
  try {
    const categories = await prisma.category.findMany({
      select: {
        id: true,
        name: true,
      },
    });
    return formatSuccess("Fetched success", categories);
  } catch (err) {
    return formatError(err, []);
  }
};
