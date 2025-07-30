"use client";

import { Check, ChevronsUpDown, Plus } from "lucide-react";
import * as React from "react";

import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { Control, UseFormSetValue } from "react-hook-form";
import { FormField, FormItem, FormLabel } from "../ui/form";

export function FormComboboxSelect({
  asyncGetData,
  createNewOption,
  name,
  control,
  setFormValue,
  label,
}: {
  asyncGetData: () => Promise<
    {
      name: string;
      id: string;
    }[]
  >;
  createNewOption?: (name: string) => Promise<{
    name: string;
    id: string;
  }>;
  name: string;
  label?: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  control: Control<any>;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  setFormValue: UseFormSetValue<any>;
}) {
  const [inputValue, setInputValue] = React.useState("");
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState("");
  const [isCreating, startCreating] = React.useTransition();
  const [options, setOptions] = React.useState<
    {
      name: string;
      id: string;
    }[]
  >([]);
  const fetch = React.useCallback(async () => {
    const res = await asyncGetData();
    setOptions(res);
  }, [asyncGetData, setOptions]);

  React.useEffect(() => {
    fetch();
  }, [fetch]);

  const createNewAndSelect = (name: string) => {
    if (!createNewOption) return;
    startCreating(async () => {
      const option = await createNewOption(name);
      await fetch();
      setInputValue("");
      setValue(option.name);
      setOpen(false);
    });
  };

  return (
    <FormField
      name={name}
      control={control}
      render={({ field }) => (
        <FormItem>
          {label && <FormLabel>{label}</FormLabel>}

          <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
              <div className="flex flex-col gap-2">
                <Button
                  variant="outline"
                  role="combobox"
                  aria-expanded={open}
                  className="w-full justify-between"
                  type="button"
                >
                  {field.value
                    ? options.find((option) => option.id === field.value)?.name
                    : "Select category..."}
                  <ChevronsUpDown className="opacity-50" />
                </Button>
              </div>
            </PopoverTrigger>
            <PopoverContent className="w-full p-0">
              <Command
                filter={(value, search) => {
                  if (value === "create") return 1;
                  if (value.includes(search)) return 1;
                  return 0;
                }}
              >
                <CommandInput
                  placeholder="Search framework..."
                  className="h-9"
                  onValueChange={setInputValue}
                />
                <CommandList>
                  <CommandEmpty></CommandEmpty>
                  <CommandGroup>
                    {options.map((option) => (
                      <CommandItem
                        disabled={isCreating}
                        key={option.id}
                        value={option.name}
                        onSelect={(currentValue) => {
                          setValue(currentValue === value ? "" : currentValue);
                          setInputValue("");
                          setOpen(false);
                          setFormValue(name, option.id);
                        }}
                      >
                        {option.name}
                        <Check
                          className={cn(
                            "ml-auto",
                            value === option.name ? "opacity-100" : "opacity-0"
                          )}
                        />
                      </CommandItem>
                    ))}
                    {inputValue && (
                      <CommandItem
                        value="create"
                        disabled={isCreating}
                        onSelect={() => {
                          createNewAndSelect(inputValue);
                        }}
                      >
                        <Plus className="h-4 w-4" />
                        Create “{inputValue}”
                      </CommandItem>
                    )}
                  </CommandGroup>
                </CommandList>
              </Command>
            </PopoverContent>
          </Popover>
        </FormItem>
      )}
    />
  );
}
