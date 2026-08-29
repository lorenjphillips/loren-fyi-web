import Layout from "@/components/Layout";
import { Link } from "react-router-dom";
import { techPosts } from "@/lib/tech";

export default function Tech() {
  return (
    <Layout>
      <div>
        <div className="max-w-3xl mx-auto">
          <p className="text-muted-foreground mb-10">
            tooling, infrastructure, and workflows.
          </p>
          <ul className="space-y-4">
            {techPosts.map((post) => (
              <li key={post.slug}>
                <Link
                  to={`/tech/${post.slug}`}
                  className="group block rounded-lg border border-border/50 bg-card/50 p-5 transition-colors hover:border-border hover:bg-accent/30"
                >
                  <h2 className="text-lg font-medium text-foreground">
                    {post.title}
                  </h2>
                  <p className="text-sm text-muted-foreground mt-1">
                    {post.description}
                  </p>
                  {post.date && (
                    <p className="text-xs text-muted-foreground/70 mt-1">
                      {post.date}
                    </p>
                  )}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </Layout>
  );
}
