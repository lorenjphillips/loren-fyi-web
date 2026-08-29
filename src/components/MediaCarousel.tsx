import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
} from "@/components/ui/carousel";

export interface MediaImage {
  src: string;
  alt?: string;
}

interface MediaCarouselProps {
  images: MediaImage[];
  title: string;
  className?: string;
}

/**
 * Fixed-height media strip. One image renders on its own; several render in a
 * carousel so a long gallery cannot push the article off the page.
 */
export default function MediaCarousel({
  images,
  title,
  className = "",
}: MediaCarouselProps) {
  if (!images?.length) return null;

  const frame =
    "flex h-[22rem] items-center justify-center overflow-hidden rounded-lg border border-border/50 bg-muted/20";

  if (images.length === 1) {
    return (
      <div className={`${frame} ${className}`}>
        <img
          src={images[0].src}
          alt={images[0].alt ?? title}
          className="max-h-full max-w-full object-contain"
        />
      </div>
    );
  }

  return (
    <div className={`relative ${className}`}>
      <Carousel opts={{ align: "start", loop: true }}>
        <CarouselContent>
          {images.map((img, i) => (
            <CarouselItem key={i}>
              <div className={frame}>
                <img
                  src={img.src}
                  alt={img.alt ?? `${title}, image ${i + 1}`}
                  className="max-h-full max-w-full object-contain"
                />
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="left-3" />
        <CarouselNext className="right-3" />
      </Carousel>
      <p className="mt-2 text-center text-xs text-muted-foreground">
        {images.length} images
      </p>
    </div>
  );
}
