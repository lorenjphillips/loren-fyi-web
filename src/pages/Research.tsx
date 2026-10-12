import Layout from "@/components/Layout";
import { Link } from "react-router-dom";
import { researchItems } from "@/lib/research";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";



export default function Research() {

  return (
    <Layout>
      <div>

        {/* Research Items */}
        <div className="space-y-6">
          {researchItems.map((item) => (
            <Link key={item.slug} to={`/research/${item.slug}`} className="block">
            <Card className="group hover:shadow-lg transition-all duration-300 border-2 border-border/70 hover:border-border cursor-pointer hover:-translate-y-1 active:translate-y-0 hover:scale-[1.01] active:scale-[0.99]">
              <CardHeader>
                <div className="flex justify-between items-start mb-2">
                  <CardTitle className="group-hover:text-accent-foreground transition-colors">
                    {item.title}
                  </CardTitle>
                  <div className="flex items-center gap-3 shrink-0">
                    <span className="text-xs text-muted-foreground">
                      {item.category}
                    </span>
                    <span className="text-xs text-muted-foreground">
                      {item.date}
                    </span>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex gap-6">
                  <p className="text-sm text-muted-foreground leading-relaxed flex-1">
                    {item.description}
                  </p>
                  {item.images && item.images.length > 0 && (
                    <div className="w-32 h-32 relative rounded-lg overflow-hidden flex-shrink-0">
                      <img
                        src={item.images[0].src}
                        alt={item.images[0].alt}
                        className="object-cover w-full h-full"
                      />
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
            </Link>
          ))}
        </div>
      </div>
    </Layout>
  );
}
