import React from "react";
import MDEditor from "@uiw/react-md-editor";
import { FormControl, FormField, FormItem, FormMessage } from "../ui/form";
import { FieldValues, Path, UseFormReturn } from "react-hook-form";
import rehypeSanitize from "rehype-sanitize";
import Article from "../article-full";

type FormInputProps<T extends FieldValues> = {
  control: UseFormReturn<T>["control"];
  name: Path<T>;
  label?: string;
} & React.InputHTMLAttributes<HTMLInputElement>;

export const FormMdInput = <T extends FieldValues>({
  control,
  name,
  label,
  ...rest
}: FormInputProps<T>) => {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className="w-full" data-color-mode="light">
          <FormControl>
            <div>
              <MDEditor
                {...field}
                textareaProps={{
                  placeholder: "Please enter Markdown text",
                }}
                previewOptions={{
                  rehypePlugins: [[rehypeSanitize]],
                }}
              />
            </div>
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};
