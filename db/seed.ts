import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  await prisma.category.createMany({
    data: [
      { name: "Politika", slug: "politika" },
      { name: "Sport", slug: "sport" },
      { name: "Tehnologija", slug: "tehnologija" },
    ],
    skipDuplicates: true,
  });

  const politika = await prisma.category.findUnique({
    where: { slug: "politika" },
  });
  const sport = await prisma.category.findUnique({ where: { slug: "sport" } });
  const tech = await prisma.category.findUnique({
    where: { slug: "tehnologija" },
  });

  await prisma.article.createMany({
    data: [
      {
        title: "Nova odluka Vlade Srbije",
        slug: "nova-odluka-vlade",
        description:
          "Vlada je donela novu odluku o finansiranju lokalnih samouprava.",
        author: "Tanjug",
        language: "sr",
        publishedAt: new Date(),
        categoryId: politika?.id,
        keywords: ["politika", "vlada", "srbija"],
        readingTime: 3,
        seoTitle: "Odluka Vlade Srbije - detalji",
        seoDescription:
          "Sve o novoj odluci koja će promeniti budžetsku politiku.",
        source: "N1 Info",
        sourceUrl: "https://n1info.rs/vesti/nova-odluka-vlade",
        imageUrl: "https://source.unsplash.com/800x400/?politics",
        content: `
Vlada Republike Srbije je donela **važnu odluku** o finansiranju lokalnih samouprava.

Ova odluka će omogućiti *značajna sredstva* za razvoj infrastrukture i podršku lokalnim projektima.

- Povećanje budžeta za obrazovanje
- Investicije u zdravstvo
- Podrška poljoprivredi

Za detalje posetite [N1 Info](https://n1info.rs/vesti/nova-odluka-vlade).
        `,
      },
      {
        title: "Pobeda Srbije nad Grčkom",
        slug: "srbija-pobedila-grcku",
        description: "Srbija je slavila rezultatom 3:1.",
        author: "Sport Klub",
        language: "sr",
        publishedAt: new Date(),
        categoryId: sport?.id,
        keywords: ["sport", "fudbal", "srbija"],
        readingTime: 2,
        seoTitle: "Srbija pobedila Grčku",
        seoDescription:
          "Reprezentacija Srbije nadigrala Grčku u prijateljskom meču.",
        source: "SportNet",
        sourceUrl: "https://sportnet.rs/srbija-grcka-3-1",
        imageUrl: "https://source.unsplash.com/800x400/?soccer",
        content: `
Srbija je ostvarila ubedljivu pobedu protiv Grčke rezultatom **3:1**.

Selektor je istakao važnost tima i odličnu taktiku koja je dovela do uspeha.

1. Prvi gol postigao je Marković u 15. minutu
2. Drugi gol bio je autogol protivnika
3. Treći gol je postigao Jović u poslednjim minutima

Više informacija na [SportNet](https://sportnet.rs/srbija-grcka-3-1).
        `,
      },
      {
        title: "Apple najavio novi iPhone",
        slug: "iphone-15-pro",
        description: "iPhone 15 Pro donosi niz inovacija.",
        author: "The Verge",
        language: "en",
        publishedAt: new Date(),
        categoryId: tech?.id,
        keywords: ["apple", "iphone", "tehnologija"],
        readingTime: 4,
        seoTitle: "iPhone 15 Pro najava",
        seoDescription: "Apple otkriva sve novine u iPhone 15 Pro modelu.",
        source: "Apple Newsroom",
        sourceUrl: "https://apple.com/news/iphone15pro",
        imageUrl: "https://source.unsplash.com/800x400/?iphone",
        content: `
Apple je predstavio novi **iPhone 15 Pro** sa brojnim unapređenjima.

Nova kamera, moćniji procesor i poboljšana baterija su glavne karakteristike.

> "Najbolji iPhone do sada," rekao je CEO Apple-a na predstavljanju.

Detalje možete pogledati na [zvaničnoj stranici](https://apple.com/news/iphone15pro).
        `,
      },
    ],
  });

  console.log("✅ Seed sa Markdown člancima uspešno dodat!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
