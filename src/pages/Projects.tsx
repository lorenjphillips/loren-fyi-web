import Layout from "@/components/Layout";
import { Link, useSearchParams } from "react-router-dom";
import { ChevronRight } from "lucide-react";
import { projects, type Project } from "@/lib/projects";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const featured = projects
  .filter((p) => p.featured !== undefined)
  .sort((a, b) => a.featured! - b.featured!);
const rest = projects.filter((p) => p.featured === undefined);

const lists: { key: string; title: string; items: Project[] }[] = [
  { key: "hardware", title: "Hardware & Lab", items: rest.filter((p) => p.kind === "hardware") },
  { key: "software", title: "Software", items: rest.filter((p) => p.kind !== "hardware") },
];

function SectionHeading({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="text-xs font-medium uppercase tracking-widest text-muted-foreground mb-4">
      {children}
    </h2>
  );
}

function FeaturedCard({ project }: { project: Project }) {
  return (
    <Link to={`/projects/${project.slug}`} className="block">
      <Card className="group hover:shadow-lg transition-all duration-300 border-2 border-border/70 hover:border-border cursor-pointer hover:-translate-y-1 active:translate-y-0 hover:scale-[1.01] active:scale-[0.99] overflow-hidden h-full">
        <div className={`relative w-full h-48 overflow-hidden ${project.imageFit === "contain" ? "bg-white" : ""}`}>
          <img
            src={project.image}
            alt={project.title}
            className={`w-full h-full ${project.imageFit === "contain" ? "object-contain" : "object-cover"} group-hover:scale-105 transition-transform duration-300`}
          />
        </div>
        <CardHeader>
          <CardTitle className="group-hover:text-accent-foreground transition-colors">
            {project.title}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p
            className="text-sm text-muted-foreground leading-relaxed line-clamp-2"
            title={project.shortDescription}
          >
            {project.shortDescription}
          </p>
        </CardContent>
      </Card>
    </Link>
  );
}

function ProjectRow({ project }: { project: Project }) {
  return (
    <Link
      to={`/projects/${project.slug}`}
      className="group flex items-center gap-4 px-4 py-3 transition-colors hover:bg-muted/40"
    >
      <div className={`h-14 w-14 shrink-0 overflow-hidden rounded-md border border-border/50 ${project.imageFit === "contain" ? "bg-white" : "bg-muted/20"}`}>
        {project.image && (
          <img
            src={project.image}
            alt=""
            loading="lazy"
            className={`h-full w-full ${project.imageFit === "contain" ? "object-contain" : "object-cover"}`}
          />
        )}
      </div>
      <div className="min-w-0 flex-1">
        <p className="font-medium text-foreground truncate">{project.title}</p>
        <p className="text-sm text-muted-foreground line-clamp-1">
          {project.shortDescription}
        </p>
      </div>
      <ChevronRight className="h-4 w-4 shrink-0 text-muted-foreground transition-transform group-hover:translate-x-0.5" />
    </Link>
  );
}

export default function Projects() {
  // The selected list lives in the URL so Back from a project returns to it.
  const [params, setParams] = useSearchParams();
  const active = lists.some((l) => l.key === params.get("list"))
    ? params.get("list")!
    : lists[0].key;

  return (
    <Layout>
      <div className="space-y-14">
        {featured.length > 0 && (
          <section>
            <SectionHeading>Featured</SectionHeading>
            <div className="grid md:grid-cols-2 gap-6">
              {featured.map((project) => (
                <FeaturedCard key={project.slug} project={project} />
              ))}
            </div>
          </section>
        )}

        <Tabs
          value={active}
          onValueChange={(v) => setParams({ list: v }, { replace: true })}
        >
          <TabsList className="h-auto rounded-full p-1 mb-4">
            {lists.map((l) => (
              <TabsTrigger
                key={l.key}
                value={l.key}
                className="rounded-full px-4 py-1.5"
              >
                {l.title}
                <span className="ml-2 text-xs text-muted-foreground">
                  {l.items.length}
                </span>
              </TabsTrigger>
            ))}
          </TabsList>
          {lists.map((l) => (
            <TabsContent key={l.key} value={l.key} className="mt-0">
              <div className="divide-y divide-border/50 overflow-hidden rounded-lg border-2 border-border/70">
                {l.items.map((project) => (
                  <ProjectRow key={project.slug} project={project} />
                ))}
              </div>
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </Layout>
  );
}
