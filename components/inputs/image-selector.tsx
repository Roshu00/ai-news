"use client";
import { createImage, getUserImages } from "@/actions/image.actions";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { cn, formatErrors } from "@/lib/utils";
import { Image as ImageType } from "@prisma/client";
import Image from "next/image";
import { useEffect, useState } from "react";
import { Button } from "../ui/button";
import {
  Dropzone,
  DropzoneContent,
  DropzoneEmptyState,
} from "../ui/shadcn-io/dropzone";
import { toast } from "sonner";

export const ImageSelector = ({
  selectImage,
  value,
}: {
  selectImage: (image: { id: ImageType["id"]; url: ImageType["url"] }) => void;
  value?: ImageType | null;
}) => {
  const [files, setFiles] = useState<File[] | undefined>();
  const [images, setImages] = useState<ImageType[]>([]);
  const [selectedImage, setSelectedImage] = useState<ImageType | null>(
    value || null
  );

  const handleUpload = async (file: File) => {
    if (!file) return;

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
        setSelectedImage(actionRes.data!);
        selectImage({ id: actionRes.data!.id, url: actionRes.data!.url });
        toast.success(actionRes.message);
      }
    } catch (err) {
      toast.error(formatErrors(err));
    }
  };

  const getData = async () => {
    const res = await getUserImages();
    if (res.success) {
      setImages(res.data!);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  useEffect(() => {
    console.log(selectedImage);
  }, [selectedImage]);

  return (
    <>
      <Dropzone
        accept={{ "image/*": [] }}
        maxFiles={10}
        maxSize={1024 * 1024 * 10}
        minSize={1024}
        onDrop={(files) => {
          handleUpload(files[0]);
        }}
        onError={console.error}
        src={files}
      >
        <DropzoneEmptyState></DropzoneEmptyState>
        <DropzoneContent className="relative"></DropzoneContent>
      </Dropzone>
      <Dialog>
        <DialogTrigger asChild>
          <div className="space-y-4">
            <Button type="button">Izaberi iz galerije</Button>
          </div>
        </DialogTrigger>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Izaberite fotografiju iz galerije?</DialogTitle>
          </DialogHeader>
          <div className="grid grid-cols-3 mt-10 gap-4">
            {images.map((image) => (
              <div
                key={image.id}
                className={cn(
                  "relative aspect-video",
                  selectedImage?.id === image.id && "border-pink-500 border-2"
                )}
                onClick={() => {
                  if (selectedImage?.id === image.id) {
                    setSelectedImage(null);
                  } else {
                    setSelectedImage(image);
                  }
                }}
              >
                <Image
                  fill
                  alt="image"
                  src={image.url}
                  className="w-full"
                  objectFit="cover"
                />
              </div>
            ))}
          </div>
          {selectedImage && (
            <DialogFooter>
              <DialogClose asChild>
                <Button variant="secondary">Otkazi</Button>
              </DialogClose>
              <Button
                onClick={() => {
                  selectImage({ id: selectedImage.id, url: selectedImage.url });
                }}
              >
                Sacuvaj
              </Button>
            </DialogFooter>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
};
