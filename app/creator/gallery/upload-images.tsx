"use client";
import { createImage } from "@/actions/image.actions";
import {
  Dropzone,
  DropzoneContent,
  DropzoneEmptyState,
} from "@/components/ui/shadcn-io/dropzone";
import { formatErrors } from "@/lib/utils";
import { useState } from "react";
import { toast } from "sonner";

export const UploadImages = () => {
  const [files, setFiles] = useState<File[] | undefined>();
  const [uploading, setUploading] = useState(false);

  const handleUpload = async (file: File) => {
    console.log(file);

    if (!file) return;
    setUploading(true);

    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "article-title");
    try {
      const res = await fetch(
        "https://api.cloudinary.com/v1_1/oglasi/image/upload",
        {
          method: "POST",
          body: formData,
        }
      );

      const data = await res.json();
      const actionRes = await createImage(data.secure_url);
      if (!actionRes.success) {
        toast.error(actionRes.message);
      } else {
        toast.success(actionRes.message);
      }
    } catch (err) {
      toast.error(formatErrors(err));
    } finally {
      setUploading(false);
    }
  };

  const handleDrop = (files: File[]) => {
    files.map(async (file) => {
      handleUpload(file);
    });
  };
  return (
    <Dropzone
      accept={{ "image/*": [] }}
      maxFiles={10}
      maxSize={1024 * 1024 * 10}
      minSize={1024}
      onDrop={handleDrop}
      onError={console.error}
      src={files}
    >
      <DropzoneEmptyState />
      <DropzoneContent />
    </Dropzone>
  );
};
