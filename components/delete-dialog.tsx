"use client";
import { useState, useTransition } from "react";
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "./ui/alert-dialog";
import { Button } from "./ui/button";
import { toast } from "sonner";

export const DeleteDialog = ({
  id,
  action,
  children,
}: {
  id: string;
  action: (id: string) => Promise<{ success: boolean; message: string }>;
  children: React.ReactNode;
}) => {
  const [open, setOpen] = useState(false);
  const [isPending, startTransition] = useTransition();
  const handleDeleteClick = async () => {
    startTransition(async () => {
      const res = await action(id);

      if (!res.success) {
        toast.error(res.message);
      } else {
        setOpen(false);
        toast.success(res.message);
      }
    });
  };
  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogTrigger asChild>{children}</AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action can&apos;t be undone
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <Button
            variant="destructive"
            disabled={isPending}
            onClick={handleDeleteClick}
          >
            {isPending ? "Deleting..." : "Delete"}
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
