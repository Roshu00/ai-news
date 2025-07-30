"use client";
import { updateArticle } from "@/actions/article.actions";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { createArticleStepThreeSchema } from "@/lib/validation";
import { zodResolver } from "@hookform/resolvers/zod";
import MDEditor from "@uiw/react-md-editor";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import z from "zod";
import { useArticleContext } from "./article-context";

// This step is article content

export const StepThree = () => {
  const { article, setArticle, nextStep } = useArticleContext();
  const form = useForm<z.infer<typeof createArticleStepThreeSchema>>({
    resolver: zodResolver(createArticleStepThreeSchema),
    defaultValues: {
      content: article?.content || "",
    },
  });

  const submitForm = async (
    data: z.infer<typeof createArticleStepThreeSchema>
  ) => {
    const res = await updateArticle(article!.slug, data);
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
        <FormField
          control={form.control}
          name="content"
          render={({ field }) => (
            <FormItem className="col-span-2">
              <FormLabel>Sadržaj</FormLabel>
              <FormControl>
                <MDEditor className="w-full" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button>Sledeci korak</Button>
      </form>
    </Form>
  );
};
