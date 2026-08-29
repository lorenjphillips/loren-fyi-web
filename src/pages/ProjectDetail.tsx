import Layout from "@/components/Layout";
import { Link, useParams } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { ArrowLeft, Github, Globe, Play, Linkedin } from "lucide-react";
import { Button } from "@/components/ui/button";
import MediaCarousel from "@/components/MediaCarousel";
import PDFViewer from "@/components/PDFViewer";
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

        <MediaCarousel
          images={[
            ...(item.image ? [{ src: item.image, alt: item.title }] : []),
            ...(item.gallery ?? []),
          ]}
          title={item.title}
          className="mb-10"
        />

        <article className="prose prose-neutral dark:prose-invert max-w-none">
          <ReactMarkdown remarkPlugins={[remarkGfm]}>
            {item.fullDescription}
          </ReactMarkdown>
        </article>

        {(item.githubUrl || item.websiteUrl || item.videoUrl || item.linkedinUrl) && (
          <div className="mt-12 border-t border-border/50 pt-6 flex flex-wrap gap-3">
            {item.githubUrl && (
              <Button asChild variant="outline" size="sm">
                <a href={item.githubUrl} target="_blank" rel="noopener noreferrer">
                  <Github className="h-4 w-4" /> GitHub
                </a>
              </Button>
            )}
            {item.websiteUrl && (
              <Button asChild size="sm">
                <a href={item.websiteUrl} target="_blank" rel="noopener noreferrer">
                  <Globe className="h-4 w-4" /> Visit site
                </a>
              </Button>
            )}
            {item.videoUrl && (
              <Button asChild variant="outline" size="sm">
                <a href={item.videoUrl} target="_blank" rel="noopener noreferrer">
                  <Play className="h-4 w-4" /> Watch demo
                </a>
              </Button>
            )}
            {item.linkedinUrl && (
              <Button asChild variant="outline" size="sm">
                <a href={item.linkedinUrl} target="_blank" rel="noopener noreferrer">
                  <Linkedin className="h-4 w-4" /> LinkedIn
                </a>
              </Button>
            )}
          </div>
        )}

        {item.pdfs?.length ? (
          <div className="mt-12 border-t border-border/50 pt-8 space-y-8">
            {item.pdfs.map((pdf, i) => (
              <PDFViewer key={i} pdfUrl={pdf.url} title={pdf.title} />
            ))}
          </div>
        ) : null}

      </div>
    </Layout>
  );
}
