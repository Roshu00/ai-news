import { unified } from "unified";
import remarkParse from "remark-parse";
import remarkGfm from "remark-gfm";
import remarkRehype from "remark-rehype";
import rehypeRaw from "rehype-raw";
import rehypeSanitize from "rehype-sanitize";
import rehypeStringify from "rehype-stringify";

export async function renderMarkdownToHtml(markdown: string): Promise<string> {
  const file = await unified()
    .use(remarkParse)
    .use(remarkGfm)
    .use(remarkRehype, { allowDangerousHtml: true }) // Omogućava HTML u markdownu
    .use(rehypeRaw) // Parsira HTML unutar markdowna
    .use(rehypeSanitize) // Sanitizuje HTML da ne bude XSS
    .use(rehypeStringify)
    .process(markdown);

  return String(file);
}
