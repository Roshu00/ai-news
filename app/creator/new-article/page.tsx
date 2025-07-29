import React from "react";
import { NewArticleForm } from "./new-article-form";

const CreateArticlePage = () => {
  return (
    <div className="max-w-screen-xl mx-auto py-16 px-6 xl:px-0">
      <h1 className="text-2xl font-bold">Napravi Članak</h1>
      <NewArticleForm />
    </div>
  );
};

export default CreateArticlePage;
