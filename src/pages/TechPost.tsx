import Layout from "@/components/Layout";
import { Link, useParams } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { ArrowLeft, Check, Copy } from "lucide-react";
import { useState } from "react";
import { getTechPost } from "@/lib/tech";
import NotFound from "./NotFound";
import { useEscapeBack } from "@/hooks/useEscapeBack";

export default function TechPost() {
  const { slug } = useParams<{ slug: string }>();
  useEscapeBack("/tech");
  const post = slug ? getTechPost(slug) : undefined;
  const [copied, setCopied] = useState(false);

  if (!post) return <NotFound />;

  const copyMarkdown = async () => {
    await navigator.clipboard.writeText(post.body);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <Layout>
      <div>
        <div className="max-w-3xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <Link
              to="/tech"
              className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              <ArrowLeft className="h-4 w-4" /> Tech
            </Link>
            <button
              onClick={copyMarkdown}
              className="inline-flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground transition-colors rounded-md border border-border/50 hover:border-border px-2.5 py-1.5"
            >
              {copied ? (
                <>
                  <Check className="h-3.5 w-3.5" /> Copied
                </>
              ) : (
                <>
                  <Copy className="h-3.5 w-3.5" /> Copy as Markdown
                </>
              )}
            </button>
          </div>
          <h1 className="text-3xl font-semibold text-foreground mb-2">
            {post.title}
          </h1>
          {post.date && (
            <p className="text-sm text-muted-foreground mb-8">{post.date}</p>
          )}
          <article className="prose prose-neutral dark:prose-invert max-w-none">
            <ReactMarkdown remarkPlugins={[remarkGfm]}>
              {post.body}
            </ReactMarkdown>
          </article>
        </div>
      </div>
    </Layout>
  );
}
