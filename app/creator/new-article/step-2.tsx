"use client";
import { updateArticle } from "@/actions/article.actions";
import { getCategories } from "@/actions/categories.action";
import { FormTextarea } from "@/components/inputs/classic-textarea";
import { FormComboboxSelect } from "@/components/inputs/combobox-select";

import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { createArticleStepTwoSchema } from "@/lib/validation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import z from "zod";
import { useArticleContext } from "./article-context";

// This step is initial article basic information

export const StepTwo = () => {
  const { article, setArticle, nextStep } = useArticleContext();
  const form = useForm<z.infer<typeof createArticleStepTwoSchema>>({
    resolver: zodResolver(createArticleStepTwoSchema),
    defaultValues: {
      description: article?.description || "",
      categoryId: article?.categoryId || "",
    },
  });

  const submitForm = async (
    data: z.infer<typeof createArticleStepTwoSchema>
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

  const getData = async () => {
    const cat = await getCategories();

    return cat.data!;
  };

  return (
    <Form {...form}>
      <form className="space-y-4" onSubmit={form.handleSubmit(submitForm)}>
        <FormComboboxSelect
          control={form.control}
          name="categoryId"
          label="Kategorija"
          asyncGetData={getData}
          setFormValue={form.setValue}
        />
        <FormTextarea control={form.control} name="description" label="Opis" />
        <Button>Sledeci korak</Button>
      </form>
    </Form>
  );
};
