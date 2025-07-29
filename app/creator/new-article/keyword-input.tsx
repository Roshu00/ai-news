"use client";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  FormControl,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { Control, useFieldArray } from "react-hook-form";

export const KeywordInput = ({
  control,
  values,
}: {
  control: Control<any>;
  values: string[];
}) => {
  const [inputValue, setInputValue] = useState("");
  const { append, remove } = useFieldArray({
    control,
    name: "keywords" as never,
  });
  return (
    <div className="space-y-4 w-full">
      <h4 className="text-lg font-semibold">Ključne reči</h4>
      <div className="flex gap-2 flex-wrap">
        {values.map((value, index) => (
          <Badge key={index}>{value}</Badge>
        ))}
      </div>
      <div className="flex gap-2 w-full">
        <FormItem className="max-w-xl w-full">
          <FormControl>
            <Input
              placeholder="Ključna reč"
              className="w-full"
              value={inputValue}
              onChange={(e) => {
                setInputValue(e.target.value);
              }}
            />
          </FormControl>
          <FormMessage />
        </FormItem>
        <Button
          type="button"
          variant="outline"
          onClick={() => {
            append(inputValue);
            setInputValue("");
          }}
        >
          + Dodaj
        </Button>
      </div>
    </div>
  );
};
