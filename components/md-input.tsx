"use client";

import "@uiw/react-md-editor/markdown-editor.css";
import "@uiw/react-markdown-preview/markdown.css";
import dynamic from "next/dynamic";
import { useState } from "react";

const MDEditor = dynamic(() => import("@uiw/react-md-editor"), { ssr: false });

function MdInput() {
  const [value, setValue] = useState<string | undefined>(undefined);
  return <MDEditor value={value} onChange={setValue} />;
}

export default MdInput;
