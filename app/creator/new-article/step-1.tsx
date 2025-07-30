"use client";
import { createArticleStepOne, updateArticle } from "@/actions/article.actions";
import { FormInput } from "@/components/inputs/classic-input";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { createArticleStepOneSchema } from "@/lib/validation";
import { zodResolver } from "@hookform/resolvers/zod";
import { redirect } from "next/dist/server/api-utils";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import z from "zod";
import { useArticleContext } from "./article-context";

// This step is initial article creation
// After this step is completed the article is created in DB as draft!

export const StepOne = () => {
  const { article, setArticle, nextStep } = useArticleContext();
  const form = useForm<z.infer<typeof createArticleStepOneSchema>>({
    resolver: zodResolver(createArticleStepOneSchema),
    defaultValues: {
      title: article?.title || "",
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
    <Form {...form}>
      <form className="space-y-4" onSubmit={form.handleSubmit(submitForm)}>
        <FormInput control={form.control} name="title" label="Naslov" />
        <Button>Sledeci korak</Button>
      </form>
    </Form>
  );
};
