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
import { createArticleStepOneSchema } from "@/lib/validation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import z from "zod";
import { useArticleContext } from "./article-context";
import { ImageSelector } from "@/components/inputs/image-selector";

// This step is initial article creation
// After this step is completed the article is created in DB as draft!

export const StepOne = () => {
  const { article, setArticle, nextStep } = useArticleContext();
  const form = useForm<z.infer<typeof createArticleStepOneSchema>>({
    resolver: zodResolver(createArticleStepOneSchema),
    defaultValues: {
      title: article?.title || "",
      imageId: article?.imageId || undefined,
    },
  });

  const submitForm = async (
    data: z.infer<typeof createArticleStepOneSchema>
  ) => {
    const res = article
      ? await updateArticle(article.slug, data)
      : await createArticleStepOne(data);

    if (res.success) {
      toast.success(res.message);
      setArticle(res.data!);
      nextStep();
    } else {
      toast.error(res.message);
    }
  };

  return (
    <>
      <Form {...form}>
        <form
          className="space-y-4 max-w-2xl w-full"
          onSubmit={form.handleSubmit(submitForm)}
        >
          <FormField
            control={form.control}
            name="imageId"
            render={({ field }) => (
              <FormItem className="max-w-xl">
                <FormControl>
                  <ImageSelector
                    selectImage={(image) => {
                      form.setValue("imageId", image);
                    }}
                    value={article?.thumbnail}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormInput control={form.control} name="title" label="Naslov" />
          <Button>Sledeci korak</Button>
        </form>
      </Form>
    </>
  );
};
