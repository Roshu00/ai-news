"use server";
import { prisma } from "@/db/prisma";
import { formatError, formatSuccess } from "@/lib/utils";
import { requireUser } from "./helpers.action";

export const createImage = async (url: string) => {
  try {
    const user = await requireUser();
    if (!url) throw new Error("URL slike je obavezan");

    const image = await prisma.image.create({
      data: {
        url,
        userId: user.id,
      },
    });

    return formatSuccess("Slika uspešno dodata", image);
  } catch (err) {
    return formatError(err);
  }
};

export const getUserImages = async () => {
  try {
    const user = await requireUser();

    const images = await prisma.image.findMany({
      where: { userId: user.id },
      orderBy: { createdAt: "desc" },
    });

    return formatSuccess("Slike uspešno učitane", images);
  } catch (err) {
    return formatError(err);
  }
};

export const deleteImage = async (imageId: string) => {
  try {
    const user = await requireUser();

    const image = await prisma.image.findUnique({
      where: { id: imageId },
    });

    if (!image) throw new Error("Slika ne postoji");
    if (image.userId !== user.id)
      throw new Error("Nemaš pravo da brišeš ovu sliku");

    const usage = await prisma.article.findFirst({
      where: {
        thumbnail: {
          is: {
            id: image.id,
          },
        },
      },
    });

    if (usage)
      throw new Error("Slika se koristi u članku i ne može biti obrisana");

    await prisma.image.delete({
      where: { id: imageId },
    });

    return formatSuccess("Slika uspešno obrisana");
  } catch (err) {
    return formatError(err);
  }
};
