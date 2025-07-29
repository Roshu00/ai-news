"use client";
import { createArticle } from "@/actions/article.actions";
import UploadMedia from "@/components/media-upload";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { createArticleSchema } from "@/lib/validation";
import { zodResolver } from "@hookform/resolvers/zod";
import MDEditor from "@uiw/react-md-editor";
import { useForm } from "react-hook-form";
import z from "zod";
import { KeywordInput } from "./keyword-input";

export const NewArticleForm = () => {
  const form = useForm({
    resolver: zodResolver(createArticleSchema),
    defaultValues: {
      author: "Uros Ninkovic",
      categoryId: "06662814-6303-47d1-9332-b65d671436e2",
      content: "",
      description: "",
      keywords: [] as string[],
      language: "sr",
      seoDescription: "",
      seoTitle: "",
      title: "",
      source: "",
    },
  });

  const { control, handleSubmit } = form;

  const submit = async (data: z.infer<typeof createArticleSchema>) => {
    console.log(data);
    console.log("CREATE");
    await createArticle(data);
  };

  return (
    <Form {...form}>
      <form className="grid grid-cols-2 gap-4" onSubmit={handleSubmit(submit)}>
        <UploadMedia />
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem className="max-w-xl">
              <FormLabel>Naslov</FormLabel>
              <FormControl>
                <Input
                  placeholder="Naslov Ćlanka"
                  className="w-full"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="seoTitle"
          render={({ field }) => (
            <FormItem className="max-w-xl">
              <FormLabel>Seo Naslov</FormLabel>
              <FormControl>
                <Input placeholder="Seo title" className="w-full" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem className="max-w-xl">
              <FormLabel>Opis</FormLabel>
              <FormControl>
                <Textarea placeholder="Opis" className="w-full" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="seoDescription"
          render={({ field }) => (
            <FormItem className="max-w-xl">
              <FormLabel>Seo Opis</FormLabel>
              <FormControl>
                <Textarea placeholder="Opis" className="w-full" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

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
        <FormField
          control={form.control}
          name="author"
          render={({ field }) => (
            <FormItem className="max-w-xl">
              <FormLabel>Autor</FormLabel>
              <FormControl>
                <Input
                  placeholder="Autor Ćlanka"
                  className="w-full"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <KeywordInput control={control} values={form.getValues(`keywords`)} />
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
};
