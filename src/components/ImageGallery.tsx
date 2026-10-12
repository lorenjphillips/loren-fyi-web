import { useCallback, useEffect, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";

export interface GalleryImage {
  src: string;
  alt?: string;
  caption?: string;
}

interface ImageGalleryProps {
  images: GalleryImage[];
  title?: string;
  className?: string;
}

/**
 * Thumbnail grid with a lightbox. Arrow keys step through the set while the
 * lightbox is open; Escape closes it before the page-level Escape handler.
 */
export default function ImageGallery({
  images,
  title,
  className = "",
}: ImageGalleryProps) {
  const [open, setOpen] = useState<number | null>(null);

  const step = useCallback(
    (delta: number) =>
      setOpen((i) =>
        i === null ? i : (i + delta + images.length) % images.length,
      ),
    [images.length],
  );

  useEffect(() => {
    if (open === null) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") step(1);
      if (e.key === "ArrowLeft") step(-1);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open, step]);

  if (!images?.length) return null;
  const current = open === null ? null : images[open];

  return (
    <section className={className}>
      {title && (
        <h2 className="text-xl font-semibold text-foreground mb-4">{title}</h2>
      )}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
        {images.map((img, i) => (
          <button
            key={img.src}
            type="button"
            onClick={() => setOpen(i)}
            className="group relative aspect-video overflow-hidden rounded-lg border border-border/50 bg-muted/20 focus:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          >
            <img
              src={img.src}
              alt={img.alt ?? img.caption ?? ""}
              loading="lazy"
              className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
            {img.caption && (
              <span className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 to-transparent px-3 pb-2 pt-6 text-left text-xs text-white opacity-0 transition-opacity group-hover:opacity-100 group-focus-visible:opacity-100">
                {img.caption}
              </span>
            )}
          </button>
        ))}
      </div>

      <Dialog open={open !== null} onOpenChange={(o) => !o && setOpen(null)}>
        <DialogContent className="max-w-6xl border-0 bg-black/95 p-3 sm:p-4 [&>button:last-child]:text-white">
          <DialogTitle className="sr-only">
            {current?.caption ?? current?.alt ?? "Image"}
          </DialogTitle>
          {current && (
            <figure className="relative">
              <img
                src={current.src}
                alt={current.alt ?? current.caption ?? ""}
                className="mx-auto max-h-[78vh] w-auto rounded"
              />
              <figcaption className="mt-3 flex items-center justify-between gap-4 text-sm text-neutral-300">
                <span>{current.caption}</span>
                <span className="shrink-0 text-xs text-neutral-500">
                  {open! + 1} / {images.length}
                </span>
              </figcaption>
              {images.length > 1 && (
                <>
                  <button
                    type="button"
                    aria-label="Previous image"
                    onClick={() => step(-1)}
                    className="absolute left-2 top-[40%] rounded-full bg-black/60 p-2 text-white hover:bg-black/80"
                  >
                    <ChevronLeft className="h-5 w-5" />
                  </button>
                  <button
                    type="button"
                    aria-label="Next image"
                    onClick={() => step(1)}
                    className="absolute right-2 top-[40%] rounded-full bg-black/60 p-2 text-white hover:bg-black/80"
                  >
                    <ChevronRight className="h-5 w-5" />
                  </button>
                </>
              )}
            </figure>
          )}
        </DialogContent>
      </Dialog>
    </section>
  );
}
