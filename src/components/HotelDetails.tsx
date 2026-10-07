import { useState } from "react";
import { Check, Expand } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { HotelGallery, type HotelPhoto } from "@/components/HotelGallery";
import { cn } from "@/lib/utils";

export interface HotelDetailsProps {
  hotel: { nome: string; cidade: string; fotos: HotelPhoto[]; resumo: string; comodidades: string[] };
}

export function HotelDetails({ hotel }: HotelDetailsProps) {
  const [galleryIndex, setGalleryIndex] = useState<number | null>(null);
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="hotel-details-button mt-5 h-auto rounded-full px-7 py-3 text-[0.65rem] font-semibold uppercase tracking-[0.3em]">Detalhes</Button>
      </DialogTrigger>
      <DialogContent className="max-h-[90vh] max-w-3xl overflow-y-auto border-border bg-ink text-off-white" aria-describedby={undefined}>
        <DialogHeader>
          <span className="text-[0.6rem] uppercase tracking-[0.4em] text-gold-soft">{hotel.cidade} · Turquia</span>
          <DialogTitle className="font-display text-3xl text-off-white">{hotel.nome}</DialogTitle>
        </DialogHeader>
        <div className="grid gap-3 sm:grid-cols-2">
          {hotel.fotos.map((photo, index) => (
            <Button key={photo.src} variant="ghost" aria-label={`Abrir galeria: ${photo.caption}`} onClick={() => setGalleryIndex(index)}
              className={cn("group relative h-auto overflow-hidden rounded-sm p-0", index === 0 && "sm:col-span-2")}>
              <img src={photo.src} alt={photo.caption} loading="lazy" className={cn("w-full object-cover", index === 0 ? "h-64" : "h-44")} />
              <Expand className="absolute right-3 top-3 text-off-white drop-shadow" />
              <span className="absolute inset-x-0 bottom-0 whitespace-normal bg-ink/80 px-3 py-2 text-left text-xs text-off-white">{photo.caption}</span>
            </Button>
          ))}
        </div>
        <p className="text-sm font-light leading-relaxed text-off-white/80">{hotel.resumo}</p>
        {hotel.comodidades.length > 0 && <div>
          <div className="text-[0.6rem] uppercase tracking-[0.4em] text-gold-soft">O que o hotel oferece</div>
          <ul className="mt-3 grid gap-2 sm:grid-cols-2">
            {hotel.comodidades.map((item) => <li key={item} className="flex items-start gap-2 text-sm font-light text-off-white/85"><Check className="mt-0.5 h-4 w-4 shrink-0 text-gold-soft" />{item}</li>)}
          </ul>
        </div>}
        <p className="text-[0.65rem] text-off-white/40">Imagens ilustrativas · hotéis previstos ou similares, conforme operadora.</p>
        {galleryIndex !== null && <HotelGallery name={hotel.nome} photos={hotel.fotos} initialIndex={galleryIndex} open onOpenChange={(open) => { if (!open) setGalleryIndex(null); }} />}
      </DialogContent>
    </Dialog>
  );
}