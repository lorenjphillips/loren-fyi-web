import Layout from "@/components/Layout";
import { Card, CardContent } from "@/components/ui/card";
import Updates from "@/components/Updates";
import { updates } from "@/data/updates";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

export default function Home() {
  return (
    <Layout>
      <div className="container mx-auto px-6 py-12">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 tracking-tight leading-tight bg-gradient-to-r from-primary via-accent to-primary bg-[length:200%_100%] animate-[gradient_3s_ease-in-out_infinite] bg-clip-text text-transparent">
            Loren Phillips
          </h1>
          {/* <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Engineer, Researcher, Designer.
          </p> */}
        </div>

        {/* Featured Content Grid */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          <Link to="/projects" className="block">
            <motion.div
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 300, damping: 10 }}
            >
              <Card className="group hover:shadow-lg transition-all duration-300 border-border/50 h-full">
                <CardContent className="p-6">
                  <div className="relative w-full h-48 mb-4 rounded-lg overflow-hidden">
                    <img
                      src="/images/projects/zooxme.jpeg"
                      alt="Latest Projects"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <h3 className="text-lg font-semibold mb-3 text-center group-hover:text-accent-foreground transition-colors">
                    Latest Projects
                  </h3>
                  <p className="text-muted-foreground leading-relaxed text-center">
                    Recent work in Voice AI, Autonomous Vehicles, Creative Web Development, and more!
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          </Link>

          <Link to="/research" className="block">
            <motion.div
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 300, damping: 10 }}
            >
              <Card className="group hover:shadow-lg transition-all duration-300 border-border/50 h-full">
                <CardContent className="p-6">
                  <div className="relative w-full h-48 mb-4 rounded-lg overflow-hidden">
                    <img
                      src="/images/research/cell.jpeg"
                      alt="Research & Writing"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <h3 className="text-lg font-semibold mb-3 text-center group-hover:text-accent-foreground transition-colors">
                    Research & Writing
                  </h3>
                  <p className="text-muted-foreground leading-relaxed text-center">
                    A history of my research in nanophotonics, optics, and soft robotics.
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          </Link>

          <Link to="/blog" className="block">
            <motion.div
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 300, damping: 10 }}
            >
              <Card className="group hover:shadow-lg transition-all duration-300 border-border/50 h-full">
                <CardContent className="p-6">
                  <div className="relative w-full h-48 mb-4 rounded-lg overflow-hidden">
                    <img
                      src="/images/blog/bike.jpg"
                      alt="Blog Posts"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <h3 className="text-lg font-semibold mb-3 text-center group-hover:text-accent-foreground transition-colors">
                    Blog Posts
                  </h3>
                  <p className="text-muted-foreground leading-relaxed text-center">
                    Regular thoughts on my career, life, and the intersection of technology and creativity!
                  </p>
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
