import { prisma } from "@/db/prisma";
import { auth } from "@/lib/auth";

export const requireUser = async () => {
  const session = await auth();
  if (!session || !session.user) throw Error("Nema registrovanog korisnika!");

  const user = await prisma.user.findFirst({
    where: {
      id: session.user.id,
    },
  });

  if (!user) throw Error("Registrovani korisnik ne postoji u bazi!");

  return user;
};
