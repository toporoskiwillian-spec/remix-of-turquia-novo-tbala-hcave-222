import { motion } from "framer-motion";
import { Check, MapPin } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";

import radissonMerterAsset from "@/assets/hotels/radisson-istanbul-merter.asset.json";
import capadociaImg from "@/assets/hotels/capadocia.jpg";
import pamukkaleImg from "@/assets/hotels/pamukkale.jpg";
import izmirImg from "@/assets/hotels/izmir.jpg";
import ankaraImg from "@/assets/hotels/ankara.jpg";
import canakkaleImg from "@/assets/hotels/canakkale.jpg";
import cavernaImg from "@/assets/turquia/hotel-caverna.jpg";
import balaoImg from "@/assets/turquia/balao.jpg";
import pamukkaleCity from "@/assets/turquia/pamukkale.jpg";
import efesoImg from "@/assets/turquia/efeso.jpg";
import yhtImg from "@/assets/turquia/trem-yht.jpg";

const hoteis = [
  {
    nome: "Radisson Hotel Istanbul Merter",
    cidade: "Istambul",
    img: radissonMerterAsset.url,
    fotos: [radissonMerterAsset.url],
    resumo: "Radisson Hotel Istanbul Merter, hospedagem prevista em Istambul para a viagem da família Singer Pereira.",
    comodidades: [],
  },
  {
    nome: "Ramada by Wyndham Capadócia",
    cidade: "Capadócia",
    img: capadociaImg,
    fotos: [capadociaImg, balaoImg, cavernaImg],
    resumo: "Base confortável entre as paisagens lunares da Capadócia, ideal para descansar depois dos vales, aldeias trogloditas e do amanhecer de balões.",
    comodidades: ["Piscinas interna e externa", "Spa com hamam e sauna", "Restaurante com cozinha turca e internacional", "Jantar incluso no circuito", "Academia", "Wi-Fi gratuito", "Estacionamento", "Vista para a região de Nevşehir"],
  },
  {
    nome: "Colossae Thermal",
    cidade: "Pamukkale",
    img: pamukkaleImg,
    fotos: [pamukkaleImg, pamukkaleCity],
    resumo: "Resort termal em Karahayıt, junto às águas minerais quentes de Pamukkale — uma pausa de bem-estar perto do Castelo de Algodão.",
    comodidades: ["Piscinas termais internas e externas", "Spa completo e banho turco", "Jardins amplos", "Restaurante buffet com jantar incluso", "Bares", "Wi-Fi", "Próximo a Hierápolis"],
  },
  {
    nome: "Radisson Izmir Aliağa",
    cidade: "Izmir",
    img: izmirImg,
    fotos: [izmirImg, efesoImg],
    resumo: "Padrão internacional Radisson na costa do Mar Egeu, ponto de partida para Éfeso e a Casa da Virgem Maria.",
    comodidades: ["Quartos amplos com vista", "Piscina", "Restaurante e lobby bar", "Academia", "Wi-Fi gratuito", "Room service", "Recepção 24h"],
  },
  {
    nome: "New Park Ankara",
    cidade: "Ankara",
    img: ankaraImg,
    fotos: [ankaraImg, yhtImg],
    resumo: "Hotel bem localizado na capital da Turquia, prático para a visita ao Mausoléu de Atatürk e ao Castelo de Ancara antes do trem de alta velocidade.",
    comodidades: ["Quartos climatizados", "Café da manhã e jantar inclusos", "Restaurante", "Wi-Fi gratuito", "Recepção 24h", "Localização central"],
  },
  {
    nome: "Oytun Park Hotel Çanakkale",
    cidade: "Çanakkale",
    img: canakkaleImg,
    fotos: [canakkaleImg],
    resumo: "Hospedagem acolhedora na região do Estreito de Dardanelos, próxima ao calçadão à beira-mar e aos sítios históricos de Troia e Galípoli.",
    comodidades: ["Quartos confortáveis", "Café da manhã", "Restaurante", "Wi-Fi gratuito", "Recepção 24h", "Perto do calçadão de Çanakkale"],
  },
];

export function Hotels() {
  const items = [...hoteis, ...hoteis];
  return (
    <section id="hoteis" className="bg-[color:var(--cvc-bg)] py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-6 md:px-12">
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-16 max-w-2xl"
        >
          <span className="text-[0.65rem] uppercase tracking-[0.45em] text-gold-soft">Hospedagem</span>
          <h2 className="mt-4 font-display text-4xl font-light text-off-white md:text-6xl">
            Onde vocês<br />
            <em className="text-gold-gradient bg-clip-text animate-shimmer">vão descansar.</em>
          </h2>
          <p className="mt-6 max-w-md text-sm font-light text-off-white/65">
            Toque em "Detalhes" para conhecer fotos e tudo o que cada hotel oferece.
          </p>
        </motion.div>
      </div>
      <div className="relative overflow-hidden">
        <div className="flex w-max gap-6 px-6 animate-marquee hover:[animation-play-state:paused] md:px-12">
          {items.map((h, i) => (
            <HotelCard key={`${h.nome}-${i}`} h={h} />
          ))}
        </div>
      </div>
    </section>
  );
}

function HotelCard({ h }: { h: (typeof hoteis)[number] }) {
  return (
    <div className="group relative h-[28rem] w-[20rem] shrink-0 overflow-hidden border border-border md:w-[24rem]">
      <motion.img
        src={h.img}
        alt={h.nome}
        loading="lazy"
        width={1280}
        height={832}
        animate={{ scale: [1, 1.15, 1], x: ["0%", "-4%", "0%"] }}
        transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
        className="absolute inset-0 h-full w-full object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-[color:var(--cvc-ink)] via-[color:var(--cvc-ink)]/30 to-transparent" />
      <div className="absolute inset-x-0 bottom-0 p-6">
        <div className="flex items-center gap-2 text-[0.6rem] uppercase tracking-[0.35em] text-gold-soft">
          <MapPin className="h-3 w-3" /> {h.cidade} · Turquia
        </div>
        <h3 className="mt-2 font-display text-2xl text-off-white">{h.nome}</h3>
        <Dialog>
          <DialogTrigger asChild>
            <button className="mt-5 rounded-full bg-[#d9b43c] px-7 py-3 text-[0.65rem] font-semibold uppercase tracking-[0.3em] text-black transition hover:bg-[#f5cd55] hover:shadow-[0_0_40px_6px_rgba(245,205,85,0.75)]">
              Detalhes
            </button>
          </DialogTrigger>
          <DialogContent className="max-h-[90vh] max-w-3xl overflow-y-auto bg-[color:var(--cvc-ink)] text-off-white border-border">
            <DialogHeader>
              <span className="text-[0.6rem] uppercase tracking-[0.4em] text-gold-soft">{h.cidade} · Turquia</span>
              <DialogTitle className="font-display text-3xl text-off-white">{h.nome}</DialogTitle>
            </DialogHeader>
            <div className="grid gap-3 sm:grid-cols-2">
              {h.fotos.map((f, i) => (
                <img key={i} src={f} alt={`${h.nome} foto ${i + 1}`} loading="lazy" className={`w-full object-cover ${i === 0 ? "sm:col-span-2 h-64" : "h-44"}`} />
              ))}
            </div>
            <p className="text-sm font-light leading-relaxed text-off-white/80">{h.resumo}</p>
            {h.comodidades.length > 0 && <div>
              <div className="text-[0.6rem] uppercase tracking-[0.4em] text-gold-soft">O que o hotel oferece</div>
              <ul className="mt-3 grid gap-2 sm:grid-cols-2">
                {h.comodidades.map((c) => (
                  <li key={c} className="flex items-start gap-2 text-sm font-light text-off-white/85">
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-gold-soft" /> {c}
                  </li>
                ))}
              </ul>
            </div>}
            <p className="text-[0.65rem] text-off-white/40">Imagens ilustrativas · hotéis previstos ou similares, conforme operadora.</p>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}
