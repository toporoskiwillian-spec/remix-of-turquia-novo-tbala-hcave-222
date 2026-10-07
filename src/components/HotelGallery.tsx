import { useCallback, useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { ChevronLeft, ChevronRight, ImageOff, LoaderCircle, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogClose, DialogDescription, DialogOverlay, DialogPortal, DialogTitle } from "@/components/ui/dialog";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import { cn } from "@/lib/utils";

export interface HotelPhoto { src: string; caption: string }
export interface HotelGalleryProps {
  name: string;
  photos: HotelPhoto[];
  initialIndex: number;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

function GalleryPhoto({ photo }: { photo: HotelPhoto }) {
  const [status, setStatus] = useState<"loading" | "ready" | "error">("loading");
  return (
    <div className="relative flex h-full w-full items-center justify-center">
      {status === "loading" && <LoaderCircle aria-label="Carregando foto" className="absolute h-7 w-7 animate-spin text-gold-soft" />}
      {status === "error" ? <div role="status" className="flex items-center gap-3 text-muted-foreground"><ImageOff />Foto indisponível</div> : (
        <img src={photo.src} alt={photo.caption} draggable={false} onLoad={() => setStatus("ready")} onError={() => setStatus("error")}
          className={cn("h-full w-full select-none object-contain", status === "loading" && "opacity-0")} />
      )}
    </div>
  );
}

export function HotelGallery({ name, photos, initialIndex, open, onOpenChange }: HotelGalleryProps) {
  const [viewportRef, api] = useEmblaCarousel({ loop: photos.length > 1, startIndex: initialIndex });
  const [selected, setSelected] = useState(initialIndex);
  const syncSelection = useCallback(() => { if (api) setSelected(api.selectedScrollSnap()); }, [api]);
  useEffect(() => {
    if (!api) return;
    syncSelection();
    api.on("select", syncSelection).on("reInit", syncSelection);
    return () => { api.off("select", syncSelection).off("reInit", syncSelection); };
  }, [api, syncSelection]);
  useEffect(() => { if (open) api?.scrollTo(initialIndex, true); }, [api, initialIndex, open]);
  if (photos.length === 0) return null;
  const photo = photos[selected] ?? photos[0];
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogPortal>
        <DialogOverlay className="z-[70] bg-ink" />
        <DialogPrimitive.Content aria-describedby="hotel-gallery-caption"
          onKeyDown={(event) => {
            if (event.key === "ArrowLeft") { event.preventDefault(); api?.scrollPrev(); }
            if (event.key === "ArrowRight") { event.preventDefault(); api?.scrollNext(); }
          }}
          className="fixed inset-0 z-[71] grid h-dvh w-full grid-rows-[auto_minmax(0,1fr)_auto] bg-ink text-off-white outline-none">
          <header className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-4 border-b border-border p-4 sm:px-8">
            <div className="min-w-0">
              <DialogTitle className="truncate font-display text-lg text-gold-soft sm:text-2xl">{name}</DialogTitle>
              <p className="mt-1 text-xs text-muted-foreground">Galeria de fotos</p>
            </div>
            <DialogClose asChild><Button variant="ghost" size="icon" aria-label="Fechar galeria" title="Fechar galeria" className="shrink-0"><X /></Button></DialogClose>
          </header>
          <div className="relative min-h-0 py-3 sm:px-16">
            <div ref={viewportRef} className="h-full overflow-hidden touch-pan-y pinch-zoom" aria-roledescription="carrossel" aria-label={`Fotos de ${name}`}>
              <div className="flex h-full">
                {photos.map((item, index) => (
                  <div key={item.src} role="group" aria-roledescription="slide" aria-label={`${index + 1} de ${photos.length}`} aria-hidden={index !== selected} className="h-full min-w-0 flex-[0_0_100%] px-2">
                    <GalleryPhoto photo={item} />
                  </div>
                ))}
              </div>
            </div>
            {photos.length > 1 && <>
              <Button variant="outline" size="icon" aria-label="Foto anterior" title="Foto anterior" onClick={() => api?.scrollPrev()} className="absolute left-3 top-1/2 -translate-y-1/2 border-gold-soft/50 bg-ink/80 text-gold-soft"><ChevronLeft /></Button>
              <Button variant="outline" size="icon" aria-label="Próxima foto" title="Próxima foto" onClick={() => api?.scrollNext()} className="absolute right-3 top-1/2 -translate-y-1/2 border-gold-soft/50 bg-ink/80 text-gold-soft"><ChevronRight /></Button>
            </>}
          </div>
          <footer className="border-t border-border px-4 pb-[max(1rem,env(safe-area-inset-bottom))] pt-3 sm:px-8">
            <div className="grid grid-cols-[minmax(0,1fr)_auto] items-start gap-4" aria-live="polite" aria-atomic="true">
              <DialogDescription id="hotel-gallery-caption" className="text-sm text-off-white">{photo?.caption}</DialogDescription>
              <span className="text-xs tabular-nums text-gold-soft">{selected + 1} / {photos.length}</span>
            </div>
            {photos.length > 1 && <div className="mt-3 flex gap-2 overflow-x-auto pb-1" aria-label="Selecionar foto">
              {photos.map((item, index) => <Button key={item.src} variant="ghost" onClick={() => api?.scrollTo(index)} aria-label={`Ver foto ${index + 1}: ${item.caption}`} aria-pressed={index === selected}
                className={cn("h-12 w-16 shrink-0 overflow-hidden rounded-sm border-2 p-0", index === selected ? "border-gold-soft" : "border-transparent opacity-60")}>
                <img src={item.src} alt="" loading="lazy" className="h-full w-full object-cover" />
              </Button>)}
            </div>}
          </footer>
        </DialogPrimitive.Content>
      </DialogPortal>
    </Dialog>
  );
}