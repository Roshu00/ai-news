import { createImage } from "./image.actions";

export const handleUpload = async (file: File) => {
  if (!file) return;

  const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", "article-title");
  const res = await fetch(
    "https://api.cloudinary.com/v1_1/oglasi/image/upload",
    {
      method: "POST",
      body: formData,
    }
  );

  const data = await res.json();
  const actionRes = await createImage(data.secure_url);

  return actionRes;
};
