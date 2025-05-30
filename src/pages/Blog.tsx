import Layout from "@/components/Layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function Blog() {
  const blogPosts = [
    {
      title: "Deciphering Interests: Use Flow & Go",
      excerpt: "When Everyone Else Seems to Have It Figured Out",
      date: "May 26, 2025",
      readTime: "8 min read",
      tags: ["Personal Growth", "Career"],
      link: "https://loforeal.substack.com/p/deciphering-interests-use-flow-and"
    },
    // {
    //   title: "Blog Post Title 2",
    //   excerpt: "Another blog post excerpt. You can discuss your thoughts, share tutorials, or explore topics you're passionate about.",
    //   date: "March 10, 2024", 
    //   readTime: "7 min read",
    //   tags: ["Development", "Insights"],
    //   link: "https://loforeal.substack.com/p/deciphering-interests-use-flow-and"
    // },
    // {
    //   title: "Blog Post Title 3",
    //   excerpt: "Add more blog posts as you write them. Each post can have its own unique perspective and focus area.",
    //   date: "March 5, 2024",
    //   readTime: "4 min read",
    //   tags: ["Writing", "Process"],
    //   link: "https://loforeal.substack.com/p/deciphering-interests-use-flow-and"
    // },
  ];

  return (
    <Layout>
      <div className="container mx-auto px-6 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4 tracking-tight">
            Blog
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
            I write about my journey in tech and life - subscribe to my substack!
          </p>
          {/* Substack Subscribe Button */}
          <Button
            onClick={() => window.open('https://loforeal.substack.com', '_blank')}
            className="bg-[#FF6719] hover:bg-[#FF6719]/90 text-white px-6 py-2 rounded-md font-medium transition-all duration-300 hover:scale-105"
          >
            Subscribe to my Substack
          </Button>
        </div>

        {/* Blog Posts */}
        <div className="space-y-6 max-w-4xl mx-auto">
          {blogPosts.map((post, index) => (
            <a 
              href={post.link}
              target="_blank"
              rel="noopener noreferrer"
              key={index}
              className="block"
            >
              <Card className="group hover:shadow-lg transition-all duration-300 border-border/50 hover:scale-[1.02] transform-gpu cursor-pointer">
                <CardHeader>
                  <div className="flex justify-between items-start mb-2">
                    <CardTitle className="group-hover:text-accent-foreground transition-colors text-xl">
                      {post.title}
                    </CardTitle>
                    <span className="text-sm text-muted-foreground">
                      {post.readTime}
                    </span>
                  </div>
                  <div className="text-sm text-muted-foreground mb-3">
                    {post.date}
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground leading-relaxed mb-4">
                    {post.excerpt}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {post.tags.map((tag, tagIndex) => (
                      <span
                        key={tagIndex}
                        className="px-2 py-1 bg-accent text-accent-foreground text-xs rounded-md font-medium"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </a>
          ))}
        </div>
      </div>
    </Layout>
  );
}
