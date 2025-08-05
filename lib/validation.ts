import z from "zod";

export const signUpFormSchema = z
  .object({
    email: z.email(),
    name: z.string().min(3, "Ime mora da sadrzi bar 3 karaktera."),
    password: z.string().min(6, "Lozinka mora da sadrzi bar 6 karaktera."),
    confirmPassword: z
      .string()
      .min(6, "Lozinka mora da sadrzi bar 6 karaktera."),
  })
  .refine(
    (data) => {
      return data.confirmPassword === data.password;
    },
    {
      message: "Lozinke se ne poklapaju.",
      path: ["confirmPassword"],
    }
  );

export const createArticleSchema = z.object({
  title: z.string().min(3, "Naslov mora imati najmanje 3 karaktera."),
  description: z.string("Opis je obavezan."),
  content: z.string("Sadržaj je obavezan."),
  author: z.string("Autor je obavezan."),
  source: z.string("Izvor je obavezan."),
  language: z.string().default("sr"),
  seoTitle: z.string("SEO naslov je obavezan."),
  seoDescription: z.string("SEO opis je obavezan."),
  keywords: z.array(z.string(), "Morate uneti makar jednu ključnu reč"),
  categoryId: z.uuid({ message: "ID kategorije mora biti validan UUID." }),
});

export const createArticleStepOneUISchema = z.object({
  image: z
    .object({
      id: z.string(),
      url: z.string(),
    })
    .nullable()
    .optional(),
  title: z.string().min(1, "Naslov je obavezno polje."),
  description: z.string().min(1, "Opis je obavezno polje."),
  category: z.object({
    id: z.string().min(1, "Kategorija je obavezno polje."),
    name: z.string().min(1, "Kategorija je obavezno polje."),
  }),
});

export const createArticleStepOneSchema = z.object({
  imageId: z.string().nullable().optional(),
  title: z.string().min(1, "Naslov je obavezno polje."),
  description: z.string().min(1, "Opis je obavezno polje."),
  categoryId: z.string().min(1, "Kategorija je obavezno polje."),
});

export const createArticleStepFourthSchema = z.object({
  description: z.string().min(1, "Opis je obavezno polje."),
  categoryId: z.string().min(1, "Kategorija je obavezno polje."),
});

export const createArticleStepTwoSchema = z.object({
  content: z.string().min(1, "Sadrzaj je obavezno polje."),
});

export const createArticleStepThreeSchema = z.object({
  seoTitle: z.string().min(1, "Sadrzaj je obavezno polje."),
  seoDescription: z.string().min(1, "Sadrzaj je obavezno polje."),
  keywords: z.array(z.string()).min(1),
});
