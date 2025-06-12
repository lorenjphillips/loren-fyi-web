import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";
import { ChevronRight, ExternalLink } from "lucide-react";
import PDFViewer from "./PDFViewer";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import YouTube from "react-youtube";

interface Image {
  src: string;
  alt: string;
  caption?: string;
}

interface DetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  description: string;
  tags?: string[];
  category?: string;
  date?: string;
  type: "project" | "research";
  images?: Image[];
  gallery?: string[];
  pdfs?: { url: string; title: string }[];
  videoUrl?: string;
  linkedinUrl?: string;
}

export default function DetailModal({ 
  isOpen, 
  onClose, 
  title, 
  description, 
  tags, 
  category, 
  date, 
  type,
  images = [],
  gallery = [],
  pdfs = [],
  videoUrl,
  linkedinUrl
}: DetailModalProps) {
  const [showScrollPrompt, setShowScrollPrompt] = useState(true);

  useEffect(() => {
    if (isOpen) {
      setShowScrollPrompt(true);
      const timer = setTimeout(() => {
        setShowScrollPrompt(false);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  // Extract YouTube video ID from URL
  const getYouTubeVideoId = (url: string) => {
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);
    return (match && match[2].length === 11) ? match[2] : null;
  };

  const youtubeVideoId = videoUrl ? getYouTubeVideoId(videoUrl) : null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl w-[95vw] sm:w-[90vw] md:w-[85vw] lg:w-[80vw] max-h-[90vh] overflow-y-auto overflow-x-hidden p-4 sm:p-6">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">{title}</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6 w-full">
          {/* YouTube Video */}
          {youtubeVideoId && (
            <Card className="w-full">
              <CardContent className="p-4">
                <h3 className="font-semibold mb-3">Demo Video</h3>
                <div className="relative w-full" style={{ paddingBottom: '56.25%' }}>
                  <YouTube
                    videoId={youtubeVideoId}
                    className="absolute top-0 left-0 w-full h-full"
                    iframeClassName="w-full h-full rounded-lg"
                    opts={{
                      width: '100%',
                      height: '100%',
                      playerVars: {
                        autoplay: 0,
                        modestbranding: 1,
                        rel: 0,
                      },
                    }}
                  />
                </div>
              </CardContent>
            </Card>
          )}

          {/* Photo Gallery */}
          {(gallery.length > 0 || images.length > 0) && (
            <div className="relative w-full">
              <div className="flex overflow-x-auto gap-4 pb-4 snap-x snap-mandatory scrollbar-hide">
                {gallery.map((img, index) => (
                  <div key={index} className="flex-none w-full h-64 rounded-lg overflow-hidden snap-center">
                    <img
                      src={img}
                      alt={`${title} - Image ${index + 1}`}
                      className="w-full h-full object-contain"
                    />
                  </div>
                ))}
                {images.map((img, index) => (
                  <div key={`img-${index}`} className="flex-none w-full h-64 rounded-lg overflow-hidden snap-center">
                    <img
                      src={img.src}
                      alt={img.alt}
                      className="w-full h-full object-contain"
                    />
                    {img.caption && (
                      <div className="text-sm text-muted-foreground mt-2 text-center">
                        {img.caption}
                      </div>
                    )}
                  </div>
                ))}
              </div>
              {/* Scroll Prompt - Only show if there are multiple images */}
              {showScrollPrompt && (gallery.length + images.length > 1) && (
                <div className="absolute right-4 top-1/2 -translate-y-1/2 bg-background/80 backdrop-blur-sm px-4 py-2 rounded-full shadow-lg flex items-center gap-2 animate-pulse">
                  <span className="text-sm font-medium">Scroll for more</span>
                  <ChevronRight className="h-4 w-4" />
                </div>
              )}
            </div>
          )}

          {/* Project Description */}
          <Card className="w-full">
            <CardContent className="p-4">
              <div className="prose prose-sm dark:prose-invert max-w-none">
                <ReactMarkdown remarkPlugins={[remarkGfm]}>
                  {description}
                </ReactMarkdown>
              </div>
              
              {/* Tags */}
              {tags && (
                <div className="flex flex-wrap gap-2 mt-3">
                  {tags.map((tag, index) => (
                    <span
                      key={index}
                      className="px-2 py-1 bg-accent text-accent-foreground text-xs rounded-md font-medium"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              )}
              
              {/* Category and date for research */}
              {(category || date) && (
                <div className="flex items-center gap-3 mt-3">
                  {category && (
                    <span className="px-2 py-1 bg-accent text-accent-foreground text-xs rounded-md font-medium">
                      {category}
                    </span>
                  )}
                  {date && (
                    <span className="text-sm text-muted-foreground">
                      {date}
                    </span>
                  )}
                </div>
              )}

              {/* LinkedIn Link Button */}
              {linkedinUrl && (
                <div className="mt-4">
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => window.open(linkedinUrl, '_blank')}
                    className="flex items-center gap-2"
                  >
                    LinkedIn Post
                    <ExternalLink className="h-4 w-4" />
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>

          {/* PDF Documents */}
          {pdfs.length > 0 && (
            <div className="space-y-6">
              {pdfs.map((pdf, index) => (
                <Card key={index}>
                  <CardContent className="p-4">
                    <PDFViewer pdfUrl={pdf.url} title={pdf.title} />
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
