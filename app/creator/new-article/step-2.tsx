"use client";
import { updateArticle } from "@/actions/article.actions";

import ArticleClient from "@/components/article-full-client";
import { FormMdInput } from "@/components/inputs/md-input";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { createArticleStepTwoSchema } from "@/lib/validation";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArticleCreationStep } from "@prisma/client";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import z from "zod";
import { useArticleContext } from "./article-context";

// This step is article content

export const StepTwo = () => {
  const { article, setArticle, setStep } = useArticleContext();
  const form = useForm<z.infer<typeof createArticleStepTwoSchema>>({
    resolver: zodResolver(createArticleStepTwoSchema),
    defaultValues: {
      content: article?.content || "",
    },
  });

  const submitForm = async (
    data: z.infer<typeof createArticleStepTwoSchema>
  ) => {
    const res = await updateArticle(
      article!.slug,
      data,
      ArticleCreationStep.SEO
    );
    if (res.success) {
      toast.success(res.message);
      setArticle(res.data!);
      setStep(res.data!.step);
    } else {
      toast.error(res.message);
    }
  };

  return (
    <>
      <Form {...form}>
        <form
          className="space-y-4 w-full"
          onSubmit={form.handleSubmit(submitForm)}
        >
          <FormMdInput control={form.control} name="content" />
          <Button>Sledeci korak</Button>
        </form>
      </Form>
      <ArticleClient
        article={{ ...article!, content: form.watch("content") }}
      />
    </>
  );
};
