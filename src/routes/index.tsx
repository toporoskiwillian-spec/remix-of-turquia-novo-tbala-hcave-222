import { createFileRoute } from "@tanstack/react-router";
import { motion, useScroll, useTransform } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import {
  Menu,
  Plane,
  Hotel,
  UtensilsCrossed,
  Map,
  Car,
  Train,
  Star,
  MessageCircle,
  ChevronRight,
  BookOpen,
  MapPin,
  Mail,
  Instagram,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger, SheetTitle, SheetHeader } from "@/components/ui/sheet";
import { Dialog, DialogContent, DialogTrigger, DialogTitle, DialogHeader } from "@/components/ui/dialog";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Hotels } from "@/components/Hotels";
import { roteiroCompleto } from "@/lib/roteiro-completo";
import aviaoImg from "@/assets/proposta/aviao.jpg";
import premiumBanner from "@/assets/cvc-premium-banner.png.asset.json";
import curadoriaAsset from "@/assets/proposta/curadoria.jpeg.asset.json";
import customerImg from "@/assets/proposta/customer-experience.jpg";
import transferAsset from "@/assets/proposta/transfer.webp.asset.json";
import willAsset from "@/assets/equipe/Socio_Diretor_Will_Toporoski_v2.jpeg.asset.json";
import brunaAsset from "@/assets/equipe/Socia_diretora_Bruna_Toporoski.jpeg.asset.json";
import otavioAsset from "@/assets/equipe/Customer_Experiences_Otavio.jpeg.asset.json";
import luizAsset from "@/assets/equipe/Consultor_de_Experiencias_Luiz.jpeg.asset.json";

import heroImg from "@/assets/turquia/hero-turquia.jpg";
import istambulImg from "@/assets/turquia/istambul.jpg";
import baloaoImg from "@/assets/turquia/balao.jpg";
import yhtImg from "@/assets/turquia/trem-yht.jpg";
import pamukkaleImg from "@/assets/turquia/pamukkale.jpg";
import efesoImg from "@/assets/turquia/efeso.jpg";

import heroVideoAsset from "@/assets/turquia/hero-turquia.mp4.asset.json";
import featureVideoAsset from "@/assets/turquia/istambul-bosforo-cinema.mp4.asset.json";
import { ofertaTurquia, formatBRL } from "@/lib/oferta-turquia";
import day1Video from "@/assets/turquia/day-1-istambul.mp4.asset.json";
import day2Video from "@/assets/turquia/day-2-hagia.mp4.asset.json";
import day3Video from "@/assets/turquia/day-3-yht.mp4.asset.json";
import day4Video from "@/assets/turquia/day-4-ancara.mp4.asset.json";
import day5Video from "@/assets/turquia/day-5-balao.mp4.asset.json";
import day6Video from "@/assets/turquia/day-6-caverna.mp4.asset.json";
import day7Video from "@/assets/turquia/day-7-pamukkale.mp4.asset.json";
import day8Video from "@/assets/turquia/day-8-efeso.mp4.asset.json";
import day9Video from "@/assets/turquia/day-9-kusadasi.mp4.asset.json";
import day10Video from "@/assets/turquia/day-10-retorno.mp4.asset.json";

const NOME_DO_ROTEIRO = "Super Turquia com trem-bala";
const DATA_INICIO = "02/04/2027";
const WA_MSG = encodeURIComponent(
  `Olá! Gostaria de saber mais sobre a viagem Super Turquia com trem-bala.`,
);

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Super Turquia com trem-bala | CVC Curitiba" },
      {
        name: "description",
        content:
          "Super Turquia de 2 a 10 de abril de 2027: Istambul, Ancara, Capadócia, Pamukkale e Éfeso com trem-bala e guia em português. R$ 29.000 para duas pessoas.",
      },
      { property: "og:title", content: "Super Turquia com trem-bala | CVC Curitiba" },
      {
        property: "og:description",
        content: "Descubra Istambul, a Capadócia e o trem-bala com a CVC Itupava e Park Shopping Boulevard.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "TravelAgency",
          name: "CVC Itupava & Shopping Boulevard",
          telephone: ["+554188140633", "+554192844123"],
        }),
      },
    ],
  }),
  component: TurquiaLanding,
});

const fadeUp = {
  initial: { opacity: 0, y: 28 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-80px" },
  transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] as const },
};

const dayMedia = [
  { img: istambulImg, video: day1Video.url },
  { img: istambulImg, video: day2Video.url },
  { img: istambulImg, video: day1Video.url },
  { img: yhtImg, video: day3Video.url },
  { img: baloaoImg, video: day4Video.url },
  { img: baloaoImg, video: day5Video.url },
  { img: pamukkaleImg, video: day7Video.url },
  { img: efesoImg, video: day8Video.url },
  { img: istambulImg, video: day10Video.url },
];
const itinerario = roteiroCompleto.map((day, index) => ({
  dia: index + 1, data: `${String(index + 2).padStart(2, "0")}/abr`,
  cidade: day.cidade, uf: "Super Turquia · Guia em português",
  horario: index === 0 ? "Chegada" : index === 8 ? "Traslado de saída" : "Conforme programação",
  refeicao: day.refeicao,
  resumo: day.resumo, detalhes: day.texto.split("\n\n"),
  ...dayMedia[index],
}));

const lojas = [
  { nome: "CVC Itupava Shopping Mall", bairro: "Curitiba/PR", endereco: "Itupava Shopping Mall", wa: "554188140633", waDisplay: "+55 41 8814-0633", email: "loja.9387@cvc.com.br", insta: "@cvc.pr.itupavashoppingmall" },
  { nome: "CVC Shopping Boulevard", bairro: "Xaxim · Curitiba/PR", endereco: "Linha Verde, 16303 — Xaxim", wa: "554192844123", waDisplay: "+55 41 9284-4123", email: "loja.9386@cvc.com.br", insta: "@cvc.pr.shoppingblvdcuritiba" },
];

const reviews = [
  { autor: "Marina S.", trecho: "Viagem dos sonhos do começo ao fim. A Bruna cuidou de cada detalhe.", quando: "há 2 semanas" },
  { autor: "Rafael & Camila", trecho: "Curadoria de outro nível. Voltamos sem ter precisado pensar em nada.", quando: "há 1 mês" },
  { autor: "Família Almeida", trecho: "Roteiro impecável. O suporte 24h fez toda a diferença.", quando: "há 3 meses" },
];

function TurquiaLanding() {
  return (
    <main className="bg-background text-foreground overflow-hidden">
      <Header />
      <Hero />
      <Itinerary />
      <Hotels />
      <Voos />
      <VideoFeature />
      <Bento />
      <CvcDifferentials />
      <Reviews />
      <Budget />
      <Equipe />
      <FinaleReveal />
      <Footer />
      <FloatingWa />
    </main>
  );
}

/* 01 — HEADER */
function Header() {
  const [solid, setSolid] = useState(false);
  useEffect(() => {
    const onScroll = () => setSolid(window.scrollY > 80);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  const nav = [
    ["Roteiro", "#roteiro"],
    ["Experiências", "#bordo"],
    ["Diferenciais", "#diferenciais"],
    ["Orçamento", "#orcamento"],
  ];

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
        solid ? "bg-[color:var(--cvc-ink)]/95 backdrop-blur border-b border-border" : "bg-transparent"
      }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-6 py-4 md:px-12">
        <a href="#top" className="shrink-0">
          <img src={premiumBanner.url} alt="CVC Premium · Itupava Shopping Mall e Park Shopping Boulevard" className="h-11 w-auto rounded-md md:h-[3.6rem]" />
        </a>
        <nav className="hidden items-center gap-8 lg:flex">
          {nav.map(([l, h]) => (
            <a key={h} href={h} className="text-xs font-bold uppercase tracking-[0.25em] text-gold-gradient bg-clip-text transition hover:drop-shadow-[0_0_10px_rgba(245,205,85,0.9)]">
              {l}
            </a>
          ))}
        </nav>
        <div className="flex items-center gap-2">
        <WaChooser label="WhatsApp" className="px-4 py-2.5" />
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon" aria-label="Abrir menu" className="text-off-white lg:hidden hover:bg-off-white/10">
              <Menu className="h-5 w-5" />
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="bg-[color:var(--cvc-ink)] text-off-white border-border">
            <SheetHeader>
              <SheetTitle className="font-display text-2xl text-off-white">CVC · Itupava & Boulevard</SheetTitle>
            </SheetHeader>
            <nav className="mt-8 flex flex-col gap-5">
              {nav.map(([l, h]) => (
                <a key={h} href={h} className="font-display text-2xl text-off-white/90 hover:text-gold-soft">
                  {l}
                </a>
              ))}
            </nav>
          </SheetContent>
        </Sheet>
        </div>
      </div>
    </header>
  );
}

function WaChooser({ label, className = "" }: { label: string; className?: string }) {
  const msg = encodeURIComponent("Olá! Gostaria de saber mais sobre a viagem Super Turquia com trem-bala.");
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button className={`hotel-details-button h-auto rounded-full text-sm font-medium transition-all duration-300 hover:-translate-y-0.5 ${className}`}>
          <MessageCircle className="h-4 w-4" /> {label}
        </Button>
      </PopoverTrigger>
      <PopoverContent align="end" className="w-72 bg-[color:var(--cvc-ink)] text-off-white border-border">
        <div className="text-[0.6rem] uppercase tracking-[0.35em] text-gold-soft">Escolha a loja</div>
        <div className="mt-3 flex flex-col gap-2">
          {lojas.map((l) => (
            <a key={l.wa} href={`https://wa.me/${l.wa}?text=${msg}`} target="_blank" rel="noreferrer" className="border border-border p-3 text-sm transition hover:border-gold-soft">
              <div className="font-display text-base text-off-white">{l.nome}</div>
              <div className="text-xs text-off-white/60">{l.waDisplay}</div>
            </a>
          ))}
        </div>
      </PopoverContent>
    </Popover>
  );
}

/* 02 — HERO */
function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);
  return (
    <section id="top" ref={ref} className="relative min-h-[90svh] w-full overflow-hidden">
      <motion.div style={{ y }} className="absolute inset-0">
        <video
          src={heroVideoAsset.url}
          poster={heroImg}
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          className="h-full w-full object-cover"
        />
      </motion.div>
      <div className="absolute inset-0 bg-gradient-to-b from-[color:var(--cvc-ink)]/70 via-transparent to-[color:var(--cvc-ink)]" />
      <div className="relative z-10 mx-auto flex min-h-[90svh] max-w-7xl flex-col justify-end px-6 pb-24 pt-32 md:px-12 md:pb-28">
        <motion.div {...fadeUp} className="mb-5 flex">
          <span className="rounded-full border border-[#d9b43c] bg-[color:var(--cvc-ink)]/40 px-5 py-2 text-[10px] font-bold uppercase tracking-[0.3em] text-gold-soft backdrop-blur-sm md:text-xs">
            Maior franquia de viagens do Brasil - referência internacional
          </span>
        </motion.div>
        <motion.h1 {...fadeUp} className="max-w-5xl font-display text-6xl font-light leading-[1.2] md:text-8xl">
          Super <em className="text-gold-gradient animate-shimmer bg-clip-text">Turquia</em>
        </motion.h1>
        <motion.p {...fadeUp} className="mt-6 max-w-2xl font-display text-2xl font-light text-off-white md:text-4xl">
          Uma viagem extraordinária com trem-bala.
        </motion.p>
        <motion.p {...fadeUp} className="mt-5 text-sm text-gold-soft">
          2 a 10 de abril de 2027 · Istambul · Ancara · Capadócia · Pamukkale · Éfeso
        </motion.p>
      </div>
    </section>
  );
}

/* 03 — ITINERARY CAROUSEL */
function Itinerary() {
  const items = [...itinerario, ...itinerario];
  return (
    <section id="roteiro" className="bg-[color:var(--cvc-ink)] py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-6 md:px-12">
        <motion.div {...fadeUp} className="mb-16 flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
          <div className="max-w-2xl">
            <span className="text-[0.65rem] uppercase tracking-[0.45em] text-gold-soft">O Roteiro</span>
            <h2 className="mt-4 font-display text-4xl font-light text-off-white md:text-6xl">
              Nove dias,<br />
              <em className="text-gold-gradient bg-clip-text animate-shimmer">nove histórias.</em>
            </h2>
            <p className="mt-6 max-w-md text-sm font-light text-off-white/65">
              De 2 a 10 de abril de 2027, com guia em português.
            </p>
          </div>
          <Dialog>
            <DialogTrigger asChild>
              <button className="inline-flex items-center gap-2 self-start border border-gold-soft px-6 py-3 text-[0.65rem] uppercase tracking-[0.3em] text-gold-soft transition hover:bg-gold-soft hover:text-black md:self-end">
                <BookOpen className="h-4 w-4" /> Ver roteiro completo
              </button>
            </DialogTrigger>
            <DialogContent className="max-h-[90vh] max-w-3xl overflow-y-auto bg-[color:var(--cvc-ink)] text-off-white border-border">
              <DialogHeader>
                <span className="text-[0.6rem] uppercase tracking-[0.4em] text-gold-soft">Super Turquia · Special Tours</span>
                <DialogTitle className="font-display text-3xl text-off-white">Roteiro completo, dia a dia</DialogTitle>
              </DialogHeader>
              <div className="space-y-8">
                {roteiroCompleto.map((d) => (
                  <div key={d.dia} className="border-l border-gold-soft/50 pl-5">
                    <div className="text-[0.6rem] uppercase tracking-[0.4em] text-gold-soft">{d.dia}</div>
                    <h3 className="mt-1 font-display text-2xl text-off-white">{d.cidade}</h3>
                    <p className="mt-3 whitespace-pre-line text-sm font-light leading-relaxed text-off-white/80">{d.texto}</p>
                  </div>
                ))}
              </div>
            </DialogContent>
          </Dialog>
        </motion.div>
      </div>
      <div className="relative overflow-hidden">
        <div className="flex w-max gap-6 px-6 animate-marquee md:px-12">
          {items.map((d, i) => (
            <DayCard key={`${d.dia}-${i}`} d={d} />
          ))}
        </div>
      </div>
    </section>
  );
}

function DayCard({ d }: { d: (typeof itinerario)[number] }) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <button className="group relative h-[26rem] w-[18rem] flex-shrink-0 overflow-hidden border border-border text-left transition hover:border-gold-soft">
          <video
            src={d.video}
            poster={d.img}
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
            className="absolute inset-0 h-full w-full object-cover transition-transform duration-1000 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[color:var(--cvc-ink)] via-[color:var(--cvc-ink)]/30 to-transparent" />
          <div className="absolute inset-x-0 bottom-0 p-6">
            <span className="text-[0.6rem] uppercase tracking-[0.35em] text-gold-soft">Dia {String(d.dia).padStart(2, "0")} · {d.data}</span>
            <h3 className="mt-2 font-display text-2xl text-off-white">{d.cidade}</h3>
            <div className="mt-1 text-[0.7rem] uppercase tracking-[0.25em] text-off-white/60">{d.uf}</div>
            <div className="mt-4 inline-flex items-center gap-1 text-[0.7rem] uppercase tracking-[0.3em] text-gold-soft">
              Detalhes <ChevronRight className="h-3 w-3" />
            </div>
          </div>
        </button>
      </DialogTrigger>
      <DialogContent className="max-w-2xl bg-[color:var(--cvc-ink)] border-border text-off-white">
        <DialogHeader>
          <span className="text-[0.65rem] uppercase tracking-[0.4em] text-gold-soft">Dia {String(d.dia).padStart(2, "0")} · {d.data}</span>
          <DialogTitle className="font-display text-3xl font-light text-off-white">{d.cidade} <span className="text-off-white/50 text-lg">· {d.uf}</span></DialogTitle>
        </DialogHeader>
        <div className="space-y-4 text-sm font-light text-off-white/85">
          <div className="relative aspect-video overflow-hidden border border-border">
            <video
              src={d.video}
              poster={d.img}
              autoPlay
              muted
              loop
              playsInline
              controls
              className="absolute inset-0 h-full w-full object-cover"
            />
          </div>
          <p className="italic font-display text-lg leading-relaxed text-off-white">"{d.resumo}"</p>
          <dl className="grid grid-cols-2 gap-3 border-y border-border py-4 text-xs">
            <div><dt className="text-gold-soft uppercase tracking-[0.25em]">Horário</dt><dd className="mt-1">{d.horario}</dd></div>
            <div><dt className="text-gold-soft uppercase tracking-[0.25em]">Refeições</dt><dd className="mt-1">{d.refeicao}</dd></div>
          </dl>
          <ul className="space-y-2">
            {d.detalhes.map((x) => (
              <li key={x} className="flex gap-3"><span className="mt-2 h-px w-4 flex-shrink-0 bg-gold-soft" />{x}</li>
            ))}
          </ul>
        </div>
      </DialogContent>
    </Dialog>
  );
}

/* 04 — VIDEO FEATURE */
function VideoFeature() {
  return (
    <section className="relative h-[60vh] overflow-hidden md:h-[80vh]">
      <video
        src={featureVideoAsset.url}
        poster={istambulImg}
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        className="absolute inset-0 h-full w-full object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-br from-[color:var(--cvc-ink)]/70 via-transparent to-[color:var(--cvc-ink)]/70" />
      <div className="relative z-10 mx-auto flex h-full max-w-5xl flex-col items-center justify-center px-6 text-center text-off-white">
        <Train className="h-12 w-12 text-gold-soft" />
        <motion.h2 {...fadeUp} className="mt-6 font-display text-3xl font-light italic md:text-6xl">
          <em className="text-gold-gradient bg-clip-text animate-shimmer">"Entre continentes</em>, o tempo desacelera."
        </motion.h2>
      </div>
    </section>
  );
}

/* 05 — BENTO */
function Bento() {
  const items = [
    { t: "Balões da Capadócia", d: "Amanhecer sobre as chaminés de fada — a imagem-símbolo da viagem.", img: baloaoImg, big: true },
    { t: "Paisagens da Capadócia", d: "Vales, formações vulcânicas e chaminés de fada", img: baloaoImg },
    { t: "Trem YHT", d: "Alta velocidade entre Istambul e Ancara", img: yhtImg },
    { t: "Pamukkale", d: "Castelo de algodão — piscinas naturais de travertino", img: pamukkaleImg },
    { t: "Éfeso", d: "A maior cidade romana do Mediterrâneo oriental", img: efesoImg },
    { t: "Istambul Bizantina", d: "Santa Sofia, Grande Bazar e Bósforo ao pôr do sol", img: istambulImg },
  ];
  return (
    <section id="bordo" className="bg-[color:var(--cvc-bg)] py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-6 md:px-12">
        <motion.div {...fadeUp} className="mb-16 max-w-2xl">
          <span className="text-[0.65rem] uppercase tracking-[0.45em] text-gold-soft">Experiências Assinatura</span>
          <h2 className="mt-4 font-display text-4xl font-light text-off-white md:text-6xl">
            Seis experiências,<br /><em className="text-gold-gradient bg-clip-text animate-shimmer">uma travessia só.</em>
          </h2>
        </motion.div>
        <div className="grid auto-rows-[16rem] gap-4 md:grid-cols-3 md:auto-rows-[18rem]">
          {items.map((it, i) => (
            <motion.div
              key={it.t}
              {...fadeUp}
              transition={{ ...fadeUp.transition, delay: i * 0.05 }}
              className={`group relative overflow-hidden border border-border ${it.big ? "md:col-span-2 md:row-span-2" : ""}`}
            >
              <img src={it.img} alt={it.t} loading="lazy" className="absolute inset-0 h-full w-full object-cover transition-transform duration-1000 group-hover:scale-110" />
              <div className="absolute inset-0 bg-gradient-to-t from-[color:var(--cvc-ink)] via-[color:var(--cvc-ink)]/20 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 p-6">
                <h3 className="font-display text-2xl text-off-white md:text-3xl">{it.t}</h3>
                <p className="mt-2 text-sm font-light text-off-white/80">{it.d}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* 07 — CVC DIFFERENTIALS */
function CvcDifferentials() {
  const items = [
    { n: "01", img: curadoriaAsset.url, t: "Curadoria Personalizada", d: "Pacotes desenhados no estilo do cliente, com seleção manual de hotéis, voos e experiências. Cada detalhe pensado para você." },
    { n: "02", img: customerImg, t: "Customer Experience", d: "Consultor dedicado após a compra: conferência de documentos, vacinas por país, check-in pela equipe, acompanhamento até o retorno." },
    { n: "03", img: transferAsset.url, t: "Transfer Executivo", d: "Casa ↔ aeroporto incluso em todos os roteiros internacionais. Conforto e pontualidade do primeiro ao último minuto." },
  ];
  return (
    <section id="diferenciais" className="relative bg-[color:var(--cvc-bg)] py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-6 md:px-12">
        <motion.div {...fadeUp} className="mb-16 max-w-3xl">
          <span className="text-[0.65rem] uppercase tracking-[0.45em] text-gold-soft">Por que CVC</span>
          <h2 className="mt-4 font-display text-4xl font-light text-off-white md:text-6xl">
            Três pilares.<br />
            <em className="text-gold-gradient bg-clip-text animate-shimmer">Um padrão único.</em>
          </h2>
        </motion.div>
        <div className="grid gap-8 md:grid-cols-3">
          {items.map((it, i) => (
            <motion.div
              key={it.n}
              {...fadeUp}
              transition={{ ...fadeUp.transition, delay: i * 0.1 }}
              className="overflow-hidden border border-border bg-card"
            >
              <div className="h-56 overflow-hidden">
                <img src={it.img} alt={it.t} loading="lazy" className="h-full w-full object-cover transition-transform duration-1000 hover:scale-110" />
              </div>
              <div className="p-8">
                <span className="font-display text-5xl text-gold-soft">{it.n}</span>
                <h3 className="mt-6 font-display text-2xl text-off-white">{it.t}</h3>
                <p className="mt-3 text-sm font-light leading-relaxed text-off-white/75">{it.d}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* 08 — REVIEWS */
function Reviews() {
  return (
    <section className="bg-[color:var(--cvc-ink)] py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-6 md:px-12">
        <motion.div {...fadeUp} className="mb-16 flex flex-col items-start gap-6 md:flex-row md:items-end md:justify-between">
          <div>
            <span className="text-[0.65rem] uppercase tracking-[0.45em] text-gold-soft">Quem viajou conta</span>
            <h2 className="mt-4 font-display text-4xl font-light text-off-white md:text-6xl">
              Avaliações <em className="text-gold-gradient bg-clip-text animate-shimmer">Google</em>
            </h2>
          </div>
          <a
            href="https://maps.app.goo.gl/jAP4CDfY8zoNf6M97"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 bg-[color:var(--cvc-silver)] px-6 py-3 text-[0.7rem] uppercase tracking-[0.3em] text-black hover:bg-off-white"
          >
            <Star className="h-4 w-4" /> Avaliar no Google
          </a>
        </motion.div>
        <div className="grid gap-6 md:grid-cols-3">
          {reviews.map((r, i) => (
            <motion.div key={r.autor} {...fadeUp} transition={{ ...fadeUp.transition, delay: i * 0.05 }} className="border border-border bg-card p-6">
              <div className="flex gap-1 text-gold-soft">
                {Array.from({ length: 5 }).map((_, j) => <Star key={j} className="h-4 w-4 fill-current" />)}
              </div>
              <p className="mt-4 font-display text-lg italic text-off-white/90">"{r.trecho}"</p>
              <div className="mt-6 flex items-center justify-between text-xs text-off-white/60">
                <span>{r.autor}</span>
                <span>{r.quando}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

const detalhesViagem: { t: string; icon: string; items: string[] }[] = [
  { t: "O que inclui", icon: "✓", items: [
    "Voo direto de Guarulhos (GRU) a Istambul (IST)",
    "8 noites de hospedagem nos hotéis previstos ou similares",
    "Café da manhã e refeições conforme o roteiro",
    "Trem de alta velocidade YHT Istambul → Ancara",
    "Voo doméstico Izmir → Istambul",
    "Traslados de chegada e saída e transporte durante o circuito",
    "Guia em português e visitas descritas como incluídas no roteiro",
  ]},
  { t: "Não inclui", icon: "✕", items: [
    "Bebidas e refeições não descritas no roteiro",
    "Despesas pessoais, compras e serviços extras dos hotéis",
    "Passeios opcionais, como balão e Noite Turca na Capadócia",
    "Serviços não mencionados como incluídos",
  ]},
  { t: "Seguro Viagem", icon: "🛡️", items: [
    "Consulte nossa equipe sobre o seguro adequado à sua viagem",
    "Coberturas, limites e período de vigência conforme a apólice contratada",
    "Tenha a apólice e os contatos de assistência disponíveis durante a viagem",
  ]},
  { t: "Documentação", icon: "📄", items: [
    "Passaporte brasileiro válido por no mínimo 6 meses após o retorno",
    "Brasileiros não precisam de visto para turismo de até 90 dias na Turquia",
    "Bilhetes e vouchers enviados pela equipe CVC antes do embarque",
    "Confirme as exigências de entrada com a equipe antes da viagem",
  ]},
  { t: "Dicas", icon: "💡", items: [
    "Moeda: Lira Turca (TRY)",
    "Abril: primavera, com noites frias na Capadócia e Ancara — leve roupas em camadas",
    "Fuso: GMT+3 (6h à frente de Curitiba)",
    "Tomadas padrão europeu tipo C/F, 220V",
    "Em mesquitas, cubra ombros e joelhos; mulheres levam um lenço para a cabeça",
  ]},
];

/* 09 — BUDGET */
function Budget() {
  return (
    <section id="orcamento" className="bg-[color:var(--cvc-bg)] py-24 md:py-32">
      <div className="mx-auto max-w-4xl px-6 text-center md:px-12">
        <motion.div {...fadeUp}>
          <span className="text-[0.65rem] uppercase tracking-[0.45em] text-gold-soft">Investimento</span>
          <h2 className="mt-4 font-display text-4xl font-light text-off-white md:text-6xl">
            Valor <em className="text-gold-gradient bg-clip-text animate-shimmer">total.</em>
          </h2>
          <p className="mx-auto mt-6 max-w-xl text-sm font-light text-off-white/65">
            Uma viagem para duas pessoas, com voo direto e a experiência do trem-bala na Turquia.
          </p>

          <div className="mt-12 border border-border bg-card/80 backdrop-blur p-5 sm:p-10">
            <div className="text-[0.6rem] uppercase tracking-[0.4em] text-off-white/50">Valor total · 2 pessoas</div>
            <div className="mt-4 font-display text-5xl font-light text-off-white md:text-7xl">
              <em className="not-italic text-gold-gradient bg-clip-text animate-shimmer">{formatBRL(ofertaTurquia.total)}</em>
            </div>
            <div className="mt-2 text-sm font-light text-off-white/70">{ofertaTurquia.parcelas}x de {formatBRL(ofertaTurquia.total / ofertaTurquia.parcelas)} no cartão sem juros</div>
            <div className="mt-8 border border-gold-soft/60 p-6">
              <div className="text-[0.6rem] uppercase tracking-[0.35em] text-gold-soft">À vista</div>
              <div className="mt-2 font-display text-4xl text-off-white md:text-5xl">{formatBRL(ofertaTurquia.aVista)}</div>
              <div className="mt-2 text-xs font-light text-off-white/70">Pagamento à vista</div>
            </div>
          </div>

          <p className="mt-5 text-sm font-semibold text-gold-soft">{ofertaTurquia.boleto}</p>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
            <WaChooser label="Reservar via WhatsApp" className="px-8 py-4" />
            {detalhesViagem.map((d) => (
              <Dialog key={d.t}>
                <DialogTrigger asChild>
                  <Button className="hotel-details-button h-auto rounded-full px-6 py-4 text-xs font-semibold uppercase tracking-[0.2em] transition">
                    {d.icon} {d.t}
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-h-[90vh] max-w-2xl overflow-y-auto border-border bg-[color:var(--cvc-ink)] text-off-white">
                  <DialogHeader>
                    <DialogTitle className="font-display text-3xl font-light text-off-white">
                      {d.icon} <span className="text-gold-soft">{d.t}</span>
                    </DialogTitle>
                  </DialogHeader>
                  <ul className="mt-4 space-y-4 text-left text-sm font-light text-off-white/85">
                    {d.items.map((x) => (
                      <li key={x} className="flex gap-3"><span className="mt-2 h-px w-4 flex-shrink-0 bg-gold-soft" />{x}</li>
                    ))}
                  </ul>
                </DialogContent>
              </Dialog>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

/* 09b — VOOS */
function Voos() {
  return (
    <section className="relative overflow-hidden py-24 md:py-32">
      <motion.img
        src={aviaoImg}
        alt=""
        aria-hidden
        loading="lazy"
        animate={{ scale: [1.05, 1.18, 1.05], x: ["0%", "-3%", "0%"] }}
        transition={{ duration: 30, repeat: Infinity, ease: "easeInOut" }}
        className="absolute inset-0 h-full w-full object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-[color:var(--cvc-bg)] via-[color:var(--cvc-ink)]/60 to-[color:var(--cvc-bg)]" />
      <div className="relative z-10 mx-auto max-w-6xl px-6 md:px-12">
        <motion.div {...fadeUp} className="mb-14 max-w-2xl">
          <span className="text-[0.65rem] uppercase tracking-[0.45em] text-gold-soft">Voo direto</span>
          <h2 className="mt-4 font-display text-4xl font-light text-off-white md:text-6xl">
            De Guarulhos a<br />
            <em className="text-gold-gradient bg-clip-text animate-shimmer">Istambul.</em>
          </h2>
        </motion.div>

        <motion.p {...fadeUp} className="flex items-center gap-4 border-t border-gold-soft/40 pt-8 text-lg text-off-white">
          <Plane className="h-6 w-6 shrink-0 text-gold-soft" />
          Voo direto de Guarulhos (GRU) a Istambul (IST)
        </motion.p>
      </div>
    </section>
  );
}

/* 11 — FINALE REVEAL */
function FinaleReveal() {
  const [revealed, setRevealed] = useState(false);
  return (
    <section className="relative bg-[color:var(--cvc-ink)] py-32 md:py-48">
      <div className="mx-auto max-w-4xl px-6 text-center md:px-12">
        {!revealed ? (
          <div className="flex flex-col items-center">
            <span className="mb-10 text-[0.65rem] uppercase tracking-[0.45em] text-gold-soft/80">Uma mensagem especial para vocês</span>
            <button
              onClick={() => setRevealed(true)}
              aria-label="Revelar mensagem final"
              className="group flex h-40 w-40 items-center justify-center rounded-full border border-[color:var(--gold-soft,#d4af37)] bg-[color:var(--cvc-ink)] shadow-[0_0_30px_-8px_rgba(212,175,55,0.45)] transition-all duration-500 hover:scale-105 hover:shadow-[0_0_70px_6px_rgba(240,200,80,0.75)] md:h-44 md:w-44"
              style={{ borderColor: "#c9a646" }}
            >
              <span className="font-display text-7xl leading-none text-gold-gradient bg-clip-text transition-all duration-500 group-hover:drop-shadow-[0_0_14px_rgba(255,215,100,0.95)] md:text-8xl">?</span>
            </button>
            <span className="mt-8 text-xs uppercase tracking-[0.4em] text-gold-soft">clique para ver</span>
          </div>
        ) : (
          <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1.2 }}>
            <p className="font-display text-3xl font-light leading-tight text-off-white md:text-5xl">
              Sua próxima grande história <em className="text-gold-gradient bg-clip-text animate-shimmer">começa na Turquia.</em>
            </p>
            <p className="mx-auto mt-6 max-w-xl text-base font-light leading-relaxed text-off-white/80">
              Descubra o encontro entre continentes, as paisagens da Capadócia e a experiência de viajar de trem-bala.
              Com a CVC Curitiba, transforme a vontade de conhecer o mundo em uma viagem inesquecível.
            </p>
            <p className="mt-8 font-display text-2xl text-gold-soft">Fale com nossa equipe e comece a planejar sua Super Turquia.</p>
            <div className="mt-8"><WaChooser label="Falar com um CVC" className="px-8 py-4" /></div>
          </motion.div>
        )}
      </div>
    </section>
  );
}

/* EQUIPE */
const equipe = {
  diretores: [
    { nome: "Will Toporoski", cargo: "Sócio Diretor", desc: "Desenha roteiros internacionais sob medida há anos.", img: willAsset.url },
    { nome: "Bruna Ynel", cargo: "Sócia Diretora", desc: "Curadoria de experiências e hotéis com olhar de detalhe.", img: brunaAsset.url },
  ],
  consultores: [
    { nome: "Otávio", cargo: "Consultor de Experiências", desc: "Acompanha cada viagem da reserva ao retorno.", img: otavioAsset.url },
    { nome: "Luiz", cargo: "Consultor de Experiências", desc: "Planejamento de circuitos e pacotes personalizados.", img: luizAsset.url },
  ],
};

function PessoaCard({ p }: { p: { nome: string; cargo: string; desc: string; img: string } }) {
  return (
    <div className="group overflow-hidden rounded-lg border border-border bg-[color:var(--cvc-bg)] transition hover:border-gold-soft">
      <div className="aspect-[4/5] overflow-hidden">
        <img src={p.img} alt={`${p.nome} — ${p.cargo}`} loading="lazy" className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" />
      </div>
      <div className="p-5">
        <h3 className="inline-block border-b border-[#d9b43c]/70 pb-1 font-display text-xl font-semibold text-gold-gradient bg-clip-text animate-shimmer drop-shadow-[0_0_8px_rgba(245,205,85,0.35)]">{p.nome}</h3>
        <div className="mt-1 text-[0.6rem] uppercase tracking-[0.3em] text-gold-soft">{p.cargo}</div>
        <p className="mt-3 text-sm font-light text-off-white/65">{p.desc}</p>
      </div>
    </div>
  );
}

function Equipe() {
  return (
    <section id="equipe" className="bg-[color:var(--cvc-ink)] py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-6 md:px-12">
        <motion.div {...fadeUp} className="max-w-3xl">
          <span className="text-[0.65rem] uppercase tracking-[0.45em] text-gold-soft">Quem cuida da sua viagem</span>
          <h2 className="mt-4 font-display text-4xl font-light text-off-white md:text-6xl">
            Equipe <em className="text-gold-gradient bg-clip-text animate-shimmer">CVC Curitiba</em>
          </h2>
          <p className="mt-6 font-display text-lg italic leading-relaxed text-off-white/80 md:text-xl">
            Estão à frente da empresa os diretores <span className="text-gold-soft">William</span> e <span className="text-gold-soft">Bruna</span>, e no comando operacional os consultores <span className="text-gold-soft">Otávio</span> e <span className="text-gold-soft">Luiz</span>, consultores de experiência da CVC Park Shopping Boulevard.
          </p>
        </motion.div>

        <div className="mt-14 grid gap-6 lg:grid-cols-[2fr_1fr_1fr]">
          <motion.div {...fadeUp} className="rounded-xl border border-gold-soft/50 p-5 shadow-[0_0_40px_-10px_rgba(212,175,55,0.35)]">
            <div className="mb-5 text-center text-[0.65rem] uppercase tracking-[0.45em] text-gold-soft">Quem está na frente de tudo</div>
            <div className="grid gap-5 sm:grid-cols-2">
              {equipe.diretores.map((p) => <PessoaCard key={p.nome} p={p} />)}
            </div>
          </motion.div>
          {equipe.consultores.map((p) => (
            <motion.div key={p.nome} {...fadeUp} className="lg:pt-[3.25rem]">
              <PessoaCard p={p} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* FOOTER */
const unidadesInfo = [
  { ...lojas[0], titulo: "CVC Itupava", destaque: "Shopping Mall", endereco: "Itupava Shopping Mall · Hugo Lange · Curitiba/PR", mapa: "Itupava Shopping Mall Curitiba" },
  { ...lojas[1], titulo: "CVC Park Shopping", destaque: "Boulevard", endereco: "Linha Verde, 16303, Loja 1004 · Xaxim · Curitiba/PR", mapa: "Shopping Boulevard Curitiba Linha Verde 16303" },
];

function Footer() {
  return (
    <footer className="bg-[color:var(--cvc-ink)] border-t border-border py-16 text-off-white/75">
      <div className="mx-auto max-w-7xl space-y-8 px-6 md:px-12">
        {unidadesInfo.map((l) => (
          <div key={l.wa} className="grid overflow-hidden rounded-xl border border-border bg-[color:var(--cvc-bg)] md:grid-cols-2">
            <div className="p-8 md:p-10">
              <div className="text-[0.65rem] uppercase tracking-[0.4em] text-gold-soft">Nossa loja</div>
              <h3 className="mt-3 font-display text-3xl text-off-white md:text-4xl">
                {l.titulo} <em className="text-gold-gradient bg-clip-text animate-shimmer">{l.destaque}</em>
              </h3>
              <ul className="mt-6 space-y-3 text-sm">
                <li className="flex items-center gap-3"><MapPin className="h-4 w-4 text-gold-soft" /> {l.endereco}</li>
                <li className="flex items-center gap-3"><MessageCircle className="h-4 w-4 text-gold-soft" /> {l.waDisplay}</li>
                <li className="flex items-center gap-3"><Mail className="h-4 w-4 text-gold-soft" /><a href={`mailto:${l.email}`} className="hover:text-gold-soft">{l.email}</a></li>
                <li className="flex items-center gap-3"><Instagram className="h-4 w-4 text-gold-soft" /><a href={`https://instagram.com/${l.insta.replace("@", "")}`} target="_blank" rel="noreferrer" className="hover:text-gold-soft">{l.insta}</a></li>
              </ul>
              <a
                href={`https://wa.me/${l.wa}?text=${WA_MSG}`}
                target="_blank"
                rel="noreferrer"
                className="mt-8 inline-flex items-center gap-2 rounded-full bg-[#d9b43c] px-7 py-3.5 text-sm font-medium text-black shadow-[0_6px_24px_-6px_rgba(217,180,60,0.55)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#f0cc55] hover:shadow-[0_0_40px_6px_rgba(245,205,85,0.75)]"
              >
                <MessageCircle className="h-4 w-4" /> Chamar no WhatsApp
              </a>
            </div>
            <iframe
              title={`Mapa ${l.titulo} ${l.destaque}`}
              src={`https://www.google.com/maps?q=${encodeURIComponent(l.mapa)}&output=embed`}
              loading="lazy"
              className="h-72 w-full border-0 md:h-full [filter:invert(90%)_hue-rotate(180deg)_grayscale(60%)]"
            />
          </div>
        ))}

        <div className="border-t border-border pt-6 text-[0.65rem] uppercase tracking-[0.3em] text-off-white/40">
          Preços e condições sujeitos à disponibilidade · Imagens meramente ilustrativas
        </div>
      </div>
    </footer>
  );
}

/* FLOATING WHATSAPP */
function FloatingWa() {
  return (
    <div className="fixed bottom-6 right-6 z-50">
      <WaChooser label="Falar com um CVC" className="px-6 py-3.5" />
    </div>
  );
}
