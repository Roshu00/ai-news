"use client";
import { getUserImages } from "@/actions/image.actions";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { cn } from "@/lib/utils";
import { Image as ImageType } from "@prisma/client";
import Image from "next/image";
import { useEffect, useState } from "react";
import { Button } from "../ui/button";

export const ImageSelector = ({
  selectImage,
  value,
}: {
  selectImage: (image: ImageType["id"]) => void;
  value?: ImageType | null;
}) => {
  const [images, setImages] = useState<ImageType[]>([]);
  const [selectedImage, setSelectedImage] = useState<ImageType | null>(
    value || null
  );

  const getData = async () => {
    const res = await getUserImages();
    if (res.success) {
      setImages(res.data!);
    }
  };
  useEffect(() => {
    getData();
  }, []);
  return (
    <Dialog>
      <DialogTrigger asChild>
        <div>
          <div className="aspect-video bg-muted rounded-lg w-96 relative overflow-hidden">
            {selectedImage && (
              <Image
                src={selectedImage.url}
                alt={"article title"}
                fill
                className="object-cover"
              />
            )}
          </div>
          <Button type="button">
            {selectedImage?.id || "Izaberite fotografiju"}
          </Button>
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
                selectImage(selectedImage.id);
              }}
            >
              Sacuvaj
            </Button>
          </DialogFooter>
        )}
      </DialogContent>
    </Dialog>
  );
};
