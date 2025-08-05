"use client";
import { createArticleStepOne, updateArticle } from "@/actions/article.actions";
import { FormInput } from "@/components/inputs/classic-input";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  createArticleStepOneSchema,
  createArticleStepOneUISchema,
} from "@/lib/validation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import z from "zod";
import { useArticleContext } from "./article-context";
import { ImageSelector } from "@/components/inputs/image-selector";
import { ArticleCreationStep } from "@prisma/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArticleCard } from "@/components/article-card";
import { useSession } from "next-auth/react";
import { FormComboboxSelect } from "@/components/inputs/combobox-select";
import { getCategories } from "@/actions/categories.action";
import { FormTextarea } from "@/components/inputs/classic-textarea";
import { useRouter } from "next/navigation";

// This step is initial article creation
// After this step is completed the article is created in DB as draft!

export const StepOne = () => {
  const router = useRouter();
  const { data: session } = useSession();
  const { article, setArticle, setStep } = useArticleContext();
  const form = useForm<z.infer<typeof createArticleStepOneUISchema>>({
    resolver: zodResolver(createArticleStepOneUISchema),
    defaultValues: {
      title: article?.title || "",
      image: article?.thumbnail
        ? { id: article.thumbnail.id, url: article.thumbnail.url }
        : undefined,
      description: article?.description || "",
      category: article?.category
        ? {
            id: article.category.id,
            name: article.category.name,
          }
        : undefined,
    },
  });

  const getData = async () => {
    const cat = await getCategories();

    return cat.data!;
  };

  const submitForm = async (
    data: z.infer<typeof createArticleStepOneUISchema>
  ) => {
    const d: z.infer<typeof createArticleStepOneSchema> = {
      title: data.title,
      categoryId: data.category.id,
      imageId: data.image?.id,
      description: data.description,
    };

    const res = article
      ? await updateArticle(article.slug, d, ArticleCreationStep.CONTENT)
      : await createArticleStepOne(d);

    if (res.success) {
      if (article) {
        toast.success(res.message);
        setArticle(res.data!);
        setStep(res.data!.step);
      } else {
        router.replace(`/creator/article/${res.data!.slug}`);
      }
    } else {
      toast.error(res.message);
    }
  };

  return (
    <div className="w-full grid grid-cols-2 gap-4">
      <Card>
        <CardHeader>
          <CardTitle>Osnovne informacije</CardTitle>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form
              className="space-y-4 max-w-2xl w-full"
              onSubmit={form.handleSubmit(submitForm)}
            >
              <FormField
                control={form.control}
                name="image"
                render={({ field }) => (
                  <FormItem className="max-w-xl">
                    <FormLabel>Naslovna fotografija</FormLabel>
                    <FormControl>
                      <ImageSelector
                        selectImage={(image) => {
                          form.setValue("image", image);
                        }}
                        value={article?.thumbnail}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormInput control={form.control} name="title" label="Naslov" />
              <FormComboboxSelect
                control={form.control}
                name="category"
                label="Kategorija"
                asyncGetData={getData}
                setFormValue={form.setValue}
              />
              <FormTextarea
                control={form.control}
                name="description"
                label="Opis"
              />
              <Button>Sledeci korak</Button>
            </form>
          </Form>
        </CardContent>
      </Card>
      <div>
        <ArticleCard
          article={{
            title: form.watch("title"),
            imageUrl: form.watch("image")?.url,
            user: session!.user,
            category: form.watch("category")?.name,
            description: form.watch("description"),
          }}
        />
      </div>
    </div>
  );
};
