"use client";
import { updateArticle } from "@/actions/article.actions";

import { FormMdInput } from "@/components/inputs/md-input";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { createArticleStepThreeSchema } from "@/lib/validation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import z from "zod";
import { useArticleContext } from "./article-context";
import { ArticleCreationStep } from "@prisma/client";

// This step is article content

export const StepThree = () => {
  const { article, setArticle, setStep } = useArticleContext();
  const form = useForm<z.infer<typeof createArticleStepThreeSchema>>({
    resolver: zodResolver(createArticleStepThreeSchema),
    defaultValues: {
      content: article?.content || "",
    },
  });

  const submitForm = async (
    data: z.infer<typeof createArticleStepThreeSchema>
  ) => {
    const res = await updateArticle(
      article!.slug,
      data,
      ArticleCreationStep.FINISHED
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
    <Form {...form}>
      <form className="space-y-4" onSubmit={form.handleSubmit(submitForm)}>
        <FormMdInput control={form.control} name="content" />
        <Button>Sledeci korak</Button>
      </form>
    </Form>
  );
};
