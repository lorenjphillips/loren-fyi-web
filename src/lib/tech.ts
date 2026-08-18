export interface TechPost {
  slug: string;
  title: string;
  description: string;
  date: string;
  body: string;
}

const files = import.meta.glob("../content/tech/*.md", {
  query: "?raw",
  import: "default",
  eager: true,
}) as Record<string, string>;

function parse(path: string, raw: string): TechPost {
  const slug = path.split("/").pop()!.replace(/\.md$/, "");
  const meta: Record<string, string> = {};
  let body = raw;
  const match = raw.match(/^---\n([\s\S]*?)\n---\n/);
  if (match) {
    body = raw.slice(match[0].length);
    for (const line of match[1].split("\n")) {
      const i = line.indexOf(":");
      if (i > 0) meta[line.slice(0, i).trim()] = line.slice(i + 1).trim();
    }
  }
  return {
    slug,
    title: meta.title ?? slug,
    description: meta.description ?? "",
    date: meta.date ?? "",
    body,
  };
}

export const techPosts: TechPost[] = Object.entries(files)
  .map(([path, raw]) => parse(path, raw))
  .sort((a, b) => b.date.localeCompare(a.date));

export function getTechPost(slug: string): TechPost | undefined {
  return techPosts.find((p) => p.slug === slug);
}
