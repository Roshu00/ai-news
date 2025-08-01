import { getUserImages } from "@/actions/image.actions";
import { Card, CardContent } from "@/components/ui/card";
import { ImageIcon } from "lucide-react";
import Image from "next/image";
import { UploadImages } from "./upload-images";

const GalleryPage = async () => {
  const res = await getUserImages();

  if (!res.success) throw new Error(res.message);

  return (
    <div className="max-w-screen-xl mx-auto py-16 px-6 xl:px-0">
      <UploadImages />
      {res.data && res.data.length > 1 ? (
        <div className="grid grid-cols-3 mt-10 gap-4">
          {res.data.map((image) => (
            <div key={image.id} className="relative aspect-video">
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
      ) : (
        <Card className="max-w-md mx-auto mt-10 text-center">
          <CardContent className="flex flex-col items-center space-y-4 mt-4">
            <ImageIcon className="w-16 h-16 text-muted-foreground" />
            <h2 className="text-2xl font-semibold">Galerija je prazna</h2>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default GalleryPage;
