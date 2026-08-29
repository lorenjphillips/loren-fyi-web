import Layout from "@/components/Layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function Blog() {
  const blogPosts = [
    {
      title: "on starting a company: why me? why now?",
      excerpt: "and why founding should also be in your future",
      date: "Jul 27, 2026",
      readTime: "13 min read",
      tags: ["Startup", "Founding", "Career", "Personal Growth"],
      link: "https://loforeal.substack.com/p/why-me-why-now"
    },
    {
      title: "OpenACI: A Proposed Contract for Agent-Native CLIs",
      excerpt: "Your CLI Has Two Audiences Now.",
      date: "May 20, 2026",
      readTime: "12 min read",
      tags: ["AI", "Agents", "Engineering", "Developer Tools"],
      link: "https://loforeal.substack.com/p/openaci"
    },
    {
      title: "Why Nobody is Hiring Junior Devs (And How to Get Hired Anyway)",
      excerpt: "The AI Drawbridge Is Up. Here's How to Get Across.",
      date: "May 04, 2026",
      readTime: "10 min read",
      tags: ["Career", "Engineering", "AI", "Job Search"],
      link: "https://loforeal.substack.com/p/why-nobody-is-hiring-junior-devs"
    },
    {
      title: "Hackathon Alchemy: Strategy for Winning Under Pressure",
      excerpt: "Why Judges Often Pick Taste Over Technical Brilliance Every Time",
      date: "Dec 21, 2025",
      readTime: "8 min read",
      tags: ["Hackathon", "Career", "Strategy"],
      link: "https://loforeal.substack.com/p/hackathon-alchemy-strategy-for-winning"
    },
    {
      title: "Signal in the Noise: A 6-Month Experiment in Finding the Right Startup",
      excerpt: "Why the most rigorous approach to my job search was learning when to abandon rigor",
      date: "Oct 06, 2025",
      readTime: "10 min read",
      tags: ["Career", "Startup", "Job Search"],
      link: "https://loforeal.substack.com/p/signal-in-the-noise-a-6-month-experiment"
    },
    {
      title: "The Calculated Risk: Join a Startup and Chase Risk Over Comfort",
      excerpt: "Why I Left Zoox for a Startup (And Why You Should Take the Leap Too)",
      date: "Jul 12, 2025",
      readTime: "12 min read",
      tags: ["Career", "Startup", "Risk-Taking"],
      link: "https://loforeal.substack.com/p/the-calculated-risk-join-a-startup"
    },
    {
      title: "Blueprint for Your First Engineering Resume",
      excerpt: "You Don't Need Experience, You Need a Strategy",
      date: "Jun 07, 2025",
      readTime: "12 min read",
      tags: ["Career", "Engineering", "Resume"],
      link: "https://loforeal.substack.com/p/blueprint-for-your-first-engineering"
    },
    {
      title: "The Narrow Lane: What Division I Athletics Cost Me (And What It Gave Me Back)",
      excerpt: "Why Elite College Athletics Might Hold You Back",
      date: "May 30, 2025",
      readTime: "10 min read",
      tags: ["Athletics", "Personal Growth", "College Experience"],
      link: "https://open.substack.com/pub/loforeal/p/the-narrow-lane-what-division-i-athletics?r=1rvblp&utm_campaign=post&utm_medium=web&showWelcomeOnShare=true"
    },
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
      <div>
        {/* Header */}
        <div className="text-center mb-12">
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
                    <CardTitle className="group-hover:text-accent-foreground transition-colors">
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
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {post.excerpt}
                  </p>
                </CardContent>
              </Card>
            </a>
          ))}
        </div>
      </div>
    </Layout>
  );
}
