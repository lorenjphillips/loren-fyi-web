import Layout from "@/components/Layout";
import { Card, CardContent } from "@/components/ui/card";
import Updates from "@/components/Updates";
import { updates } from "@/data/updates";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

// Near-critically damped so cards settle without bouncing on hover
const cardHover = { scale: 1.02 };
const cardHoverTransition = { type: "spring", stiffness: 260, damping: 30 } as const;

export default function Home() {
  return (
    <Layout>
      <div>
        {/* Featured Content Grid */}
        <div className="grid md:grid-cols-3 gap-6 mb-16">
          <Link to="/projects" className="block">
            <motion.div
              whileHover={cardHover}
              transition={cardHoverTransition}
            >
              <Card className="group hover:shadow-lg transition-all duration-300 border-border/50 h-full">
                <CardContent className="p-5">
                  <div className="relative w-full h-40 mb-4 rounded-lg overflow-hidden">
                    <img
                      src="/images/projects/zooxme.jpeg"
                      alt="Latest Projects"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <h3 className="text-lg font-semibold text-center group-hover:text-accent-foreground transition-colors">
                    Latest Projects
                  </h3>
                </CardContent>
              </Card>
            </motion.div>
          </Link>

          <Link to="/research" className="block">
            <motion.div
              whileHover={cardHover}
              transition={cardHoverTransition}
            >
              <Card className="group hover:shadow-lg transition-all duration-300 border-border/50 h-full">
                <CardContent className="p-5">
                  <div className="relative w-full h-40 mb-4 rounded-lg overflow-hidden">
                    <img
                      src="/images/research/cell.jpeg"
                      alt="Research & Writing"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <h3 className="text-lg font-semibold text-center group-hover:text-accent-foreground transition-colors">
                    Research & Writing
                  </h3>
                </CardContent>
              </Card>
            </motion.div>
          </Link>

          <Link to="/blog" className="block">
            <motion.div
              whileHover={cardHover}
              transition={cardHoverTransition}
            >
              <Card className="group hover:shadow-lg transition-all duration-300 border-border/50 h-full">
                <CardContent className="p-5">
                  <div className="relative w-full h-40 mb-4 rounded-lg overflow-hidden">
                    <img
                      src="/images/blog/bike.jpg"
                      alt="Blog Posts"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <h3 className="text-lg font-semibold text-center group-hover:text-accent-foreground transition-colors">
                    Blog Posts
                  </h3>
                </CardContent>
              </Card>
            </motion.div>
          </Link>
        </div>

        {/* Updates Section */}
        <Updates updates={updates} />
      </div>
    </Layout>
  );
}
