"use client";
import { updateArticle } from "@/actions/article.actions";
import ArticleClient from "@/components/article-full-client";
import { createArticleStepFourthSchema } from "@/lib/validation";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import z from "zod";
import { useArticleContext } from "./article-context";
import { Button } from "@/components/ui/button";
import { ArticleCreationStep } from "@prisma/client";
import { PreviewDropdown } from "./preview-dropdown";

// This step is initial article creation
// After this step is completed the article is created in DB as draft!

export const StepFour = () => {
  const router = useRouter();
  const { article, setArticle, setStep } = useArticleContext();

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
    <>
      <div className="sticky w-full top-0 z-10">
        <div className="w-full p-4 bg-green-50 border border-green-200 text-green-800">
          <div className="max-w-screen-xl mx-auto flex justify-between items-center">
            <div>
              <p className="font-medium text-green-800">
                Završili ste sve korake za kreiranje članka.
              </p>
              <p className="text-green-700">
                Sledeći korak je da pošaljete članak na monetizaciju.
              </p>
            </div>
            <div className="flex gap-2">
              <Button>Pošalji na monetizaciju</Button>
              <PreviewDropdown />
            </div>
          </div>
        </div>
      </div>

      <ArticleClient article={article} />
    </>
  );
};
