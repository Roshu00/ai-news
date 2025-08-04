"use client";
import { publishArticle, updateArticle } from "@/actions/article.actions";
import { FormInput } from "@/components/inputs/classic-input";
import { FormTextarea } from "@/components/inputs/classic-textarea";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { createArticleStepFourthSchema } from "@/lib/validation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import z from "zod";
import { useArticleContext } from "./article-context";
import { KeywordInput } from "./keyword-input";

// This step is initial article creation
// After this step is completed the article is created in DB as draft!

export const StepFour = () => {
  const router = useRouter();
  const { article, setArticle, setStep } = useArticleContext();
  const form = useForm<z.infer<typeof createArticleStepFourthSchema>>({
    resolver: zodResolver(createArticleStepFourthSchema),
    defaultValues: {
      seoTitle: article!.seoTitle || "",
      seoDescription: article!.seoDescription || "",
      keywords: article!.keywords || [],
    },
  });

  const submitForm = async (
    data: z.infer<typeof createArticleStepFourthSchema>
  ) => {
    const res = await updateArticle(article!.slug, data);
    if (res.success) {
      toast.success(res.message);
      setArticle(res.data!);
      setStep(res.data!.step);
      router.push(`/article/${res.data!.slug}`);
    } else {
      toast.error(res.message);
    }
  };

  return (
    <Form {...form}>
      <form className="space-y-4" onSubmit={form.handleSubmit(submitForm)}>
        <FormInput control={form.control} name="seoTitle" label="Naslov" />
        <FormTextarea
          control={form.control}
          name="seoDescription"
          label="Opis"
        />
        <KeywordInput
          control={form.control}
          values={form.getValues(`keywords`)}
        />

        <Button>Sledeci korak</Button>
      </form>
    </Form>
  );
};
