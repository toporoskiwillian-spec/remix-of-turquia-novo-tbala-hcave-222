import { motion } from "framer-motion";
import { MapPin } from "lucide-react";
import { HotelDetails } from "@/components/HotelDetails";

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
    fotos: [{ src: radissonMerterAsset.url, caption: "Radisson Hotel Istanbul Merter · fachada confirmada" }],
    resumo: "Radisson Hotel Istanbul Merter, hospedagem prevista em Istambul para a viagem da família Singer Pereira.",
    comodidades: [],
  },
  {
    nome: "Ramada by Wyndham Capadócia",
    cidade: "Capadócia",
    img: capadociaImg,
    fotos: [{ src: capadociaImg, caption: "Hospedagem na Capadócia · foto principal" }, { src: balaoImg, caption: "Capadócia · balões" }, { src: cavernaImg, caption: "Capadócia · hospedagem em caverna" }],
    resumo: "Base confortável entre as paisagens lunares da Capadócia, ideal para descansar depois dos vales, aldeias trogloditas e do amanhecer de balões.",
    comodidades: ["Piscinas interna e externa", "Spa com hamam e sauna", "Restaurante com cozinha turca e internacional", "Jantar incluso no circuito", "Academia", "Wi-Fi gratuito", "Estacionamento", "Vista para a região de Nevşehir"],
  },
  {
    nome: "Colossae Thermal",
    cidade: "Pamukkale",
    img: pamukkaleImg,
    fotos: [{ src: pamukkaleImg, caption: "Colossae Thermal · foto principal" }, { src: pamukkaleCity, caption: "Pamukkale · paisagem do destino" }],
    resumo: "Resort termal em Karahayıt, junto às águas minerais quentes de Pamukkale — uma pausa de bem-estar perto do Castelo de Algodão.",
    comodidades: ["Piscinas termais internas e externas", "Spa completo e banho turco", "Jardins amplos", "Restaurante buffet com jantar incluso", "Bares", "Wi-Fi", "Próximo a Hierápolis"],
  },
  {
    nome: "Radisson Izmir Aliağa",
    cidade: "Izmir",
    img: izmirImg,
    fotos: [{ src: izmirImg, caption: "Hospedagem em Izmir · foto principal" }, { src: efesoImg, caption: "Éfeso · sítio histórico" }],
    resumo: "Padrão internacional Radisson na costa do Mar Egeu, ponto de partida para Éfeso e a Casa da Virgem Maria.",
    comodidades: ["Quartos amplos com vista", "Piscina", "Restaurante e lobby bar", "Academia", "Wi-Fi gratuito", "Room service", "Recepção 24h"],
  },
  {
    nome: "New Park Ankara",
    cidade: "Ankara",
    img: ankaraImg,
    fotos: [{ src: ankaraImg, caption: "New Park Ankara · foto principal" }, { src: yhtImg, caption: "Turquia · trem de alta velocidade YHT" }],
    resumo: "Hotel bem localizado na capital da Turquia, prático para a visita ao Mausoléu de Atatürk e ao Castelo de Ancara antes do trem de alta velocidade.",
    comodidades: ["Quartos climatizados", "Café da manhã e jantar inclusos", "Restaurante", "Wi-Fi gratuito", "Recepção 24h", "Localização central"],
  },
  {
    nome: "Oytun Park Hotel Çanakkale",
    cidade: "Çanakkale",
    img: canakkaleImg,
    fotos: [{ src: canakkaleImg, caption: "Hospedagem em Çanakkale · foto principal" }],
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
        <HotelDetails hotel={h} />
      </div>
    </div>
  );
}
