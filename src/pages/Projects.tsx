import Layout from "@/components/Layout";
import { Link } from "react-router-dom";
import { projects } from "@/lib/projects";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useState } from "react";

export default function Projects() {

  return (
    <Layout>
      <div>

        {/* Projects Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project) => (
            <Link key={project.slug} to={`/projects/${project.slug}`} className="block">
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
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {project.shortDescription}
                </p>
              </CardContent>
            </Card>
            </Link>
          ))}
        </div>

        {/* Template Card for New Projects
        <div className="mt-8">
          <Card className="border-dashed border-2 border-border/50">
            <CardContent className="p-8 text-center">
              <h3 className="text-lg font-semibold mb-2">Add Your Next Project</h3>
              <p className="text-muted-foreground">
                Copy the card structure above to add more projects to your portfolio.
              </p>
            </CardContent>
          </Card>
        </div> */}
      </div>
    </Layout>
  );
}
