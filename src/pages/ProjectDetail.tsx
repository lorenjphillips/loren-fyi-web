import Layout from "@/components/Layout";
import { Link, useParams } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { ArrowLeft } from "lucide-react";
import { getProject } from "@/lib/projects";
import NotFound from "./NotFound";

export default function ProjectDetail() {
  const { slug } = useParams<{ slug: string }>();
  const item = slug ? getProject(slug) : undefined;

  if (!item) return <NotFound />;

  return (
    <Layout>
      <div className="max-w-3xl mx-auto">
        <Link
          to="/projects"
          className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground transition-colors mb-8"
        >
          <ArrowLeft className="h-4 w-4" /> Projects
        </Link>

        <h1 className="text-3xl font-semibold text-foreground mb-2">
          {item.title}
        </h1>
        {item.tags?.length ? (
          <p className="text-sm text-muted-foreground mb-8">
            {item.tags.join(" · ")}
          </p>
        ) : null}

        {item.image ? (
          <img
            src={item.image}
            alt={item.title}
            className={`w-full mb-10 rounded-lg border border-border/50 ${item.imageFit === "contain" ? "object-contain bg-white" : "object-cover"}`}
          />
        ) : null}

        {item.gallery?.length ? (
          <div className="space-y-6 mb-10">
            {item.gallery.map((img, i) => (
              <figure key={i}>
                <img
                  src={img.src}
                  alt={img.alt ?? item.title}
                  className="w-full rounded-lg border border-border/50"
                />
              </figure>
            ))}
          </div>
        ) : null}

        <article className="prose prose-neutral dark:prose-invert max-w-none">
          <ReactMarkdown remarkPlugins={[remarkGfm]}>
            {item.fullDescription}
          </ReactMarkdown>
        </article>

        {(item.githubUrl || item.websiteUrl || item.videoUrl || item.linkedinUrl) && (
          <div className="mt-12 border-t border-border/50 pt-6 flex flex-wrap gap-4">
            {item.githubUrl && (<a href={item.githubUrl} target="_blank" rel="noopener noreferrer" className="text-sm text-primary hover:underline">GitHub</a>)}
            {item.websiteUrl && (<a href={item.websiteUrl} target="_blank" rel="noopener noreferrer" className="text-sm text-primary hover:underline">Website</a>)}
            {item.videoUrl && (<a href={item.videoUrl} target="_blank" rel="noopener noreferrer" className="text-sm text-primary hover:underline">Video</a>)}
            {item.linkedinUrl && (<a href={item.linkedinUrl} target="_blank" rel="noopener noreferrer" className="text-sm text-primary hover:underline">LinkedIn</a>)}
          </div>
        )}

        {item.pdfs?.length ? (
          <div className="mt-12 border-t border-border/50 pt-6">
            <h2 className="text-lg font-medium mb-3">Documents</h2>
            <ul className="space-y-2">
              {item.pdfs.map((pdf, i) => (
                <li key={i}>
                  <a
                    href={pdf.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-primary hover:underline"
                  >
                    {pdf.title}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ) : null}
      </div>
    </Layout>
  );
}
