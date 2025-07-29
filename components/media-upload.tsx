"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { ImageIcon, Loader2 } from "lucide-react";

interface UploadMediaProps {
  onUploadComplete?: (url: string) => void;
}

export default function UploadMedia({ onUploadComplete }: UploadMediaProps) {
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selected = e.target.files?.[0] ?? null;
    setFile(selected);
  };

  const handleUpload = async () => {
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
      setPreviewUrl(data.secure_url);
      onUploadComplete?.(data.secure_url);
    } catch (err) {
      console.error("Upload error:", err);
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="flex flex-col gap-4 items-start">
      <Label htmlFor="file-upload" className="text-sm font-medium">
        Odaberi sliku
      </Label>

      <Input
        id="file-upload"
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        className="max-w-sm"
      />

      <Button onClick={handleUpload} disabled={!file || uploading}>
        {uploading ? (
          <>
            <Loader2 className="animate-spin mr-2 h-4 w-4" />
            Upload u toku...
          </>
        ) : (
          <>
            <ImageIcon className="mr-2 h-4 w-4" />
            Pošalji na Cloudinary
          </>
        )}
      </Button>

      {previewUrl && (
        <div className="mt-4">
          <p className="text-sm mb-2">Preview:</p>
          <img
            src={previewUrl}
            alt="Uploaded"
            className="rounded-md shadow max-w-xs border"
          />
        </div>
      )}
    </div>
  );
}
