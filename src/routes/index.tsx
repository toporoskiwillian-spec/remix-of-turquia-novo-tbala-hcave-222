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
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger, SheetTitle, SheetHeader } from "@/components/ui/sheet";
import { Dialog, DialogContent, DialogTrigger, DialogTitle, DialogHeader } from "@/components/ui/dialog";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Hotels } from "@/components/Hotels";
import { roteiroCompleto } from "@/lib/roteiro-completo";
import aviaoImg from "@/assets/proposta/aviao.jpg";
import logoAsset from "@/assets/proposta/logo-cvc.jpeg.asset.json";
import curadoriaAsset from "@/assets/proposta/curadoria.jpeg.asset.json";
import customerImg from "@/assets/proposta/customer-experience.jpg";
import transferAsset from "@/assets/proposta/transfer.webp.asset.json";

import heroImg from "@/assets/turquia/hero-turquia.jpg";
import istambulImg from "@/assets/turquia/istambul.jpg";
import baloaoImg from "@/assets/turquia/balao.jpg";
import cavernaImg from "@/assets/turquia/hotel-caverna.jpg";
import yhtImg from "@/assets/turquia/trem-yht.jpg";
import pamukkaleImg from "@/assets/turquia/pamukkale.jpg";
import efesoImg from "@/assets/turquia/efeso.jpg";

import heroVideoAsset from "@/assets/turquia/hero-turquia.mp4.asset.json";
import featureVideoAsset from "@/assets/turquia/feature-turquia.mp4.asset.json";
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

const NOME_DO_ROTEIRO = "Super Turquia · Trem de Alta Velocidade & Hotel Caverna";
const DATA_INICIO = "17/11/2026";
const WA_MSG = encodeURIComponent(
  `Olá! Sou da Família Singer Pereira e gostaria de falar sobre a nossa viagem para a Turquia.`,
);

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Família Singer Pereira · Istambul e Capadócia | CVC Park Shopping Boulevard" },
      {
        name: "description",
        content:
          "Proposta exclusiva para Dirlene e Família Singer Pereira: Turquia de 17 a 26/nov/2026 com voos diretos Turkish Airlines, Capadócia, Pamukkale, Éfeso e trem YHT.",
      },
      { property: "og:title", content: "Dirlene e Família Singer Pereira · Turquia" },
      {
        property: "og:description",
        content: "Cada detalhe pensado e curado só para vocês, pela CVC Park Shopping Boulevard.",
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

const itinerario = [
  { dia: 1, data: "17/nov", cidade: "Istambul", uf: "Chegada · Turquia", horario: "Chegada", refeicao: "Livre", resumo: "Chegada à cidade onde Oriente e Ocidente se encontram sobre o Bósforo.", detalhes: ["Recepção no Aeroporto Internacional de Istambul (IST) com assistência em espanhol", "Traslado privativo ao hotel 5★", "Restante do dia livre para caminhar por Bizâncio / Constantinopla — Patrimônio UNESCO desde 1985"], img: istambulImg, video: day1Video.url },
  { dia: 2, data: "18/nov", cidade: "Istambul Histórica", uf: "Santa Sofia · Topkapi · Mesquita Azul", horario: "Dia inteiro", refeicao: "Café · Almoço (opção SI)", resumo: "A pérola bizantina e o coração otomano em um único dia.", detalhes: ["Mesquita de Santa Sofia — auge da arte bizantina", "Palácio Topkapi e o harém dos sultões", "Mesquita Azul — 20.000 azulejos de Iznik e seus 6 minaretes", "Hipódromo Romano — Obelisco de Teodósio e Coluna Serpentina", "Grande Bazar — 4.000 lojas em labirinto coberto"], img: istambulImg, video: day2Video.url },
  { dia: 3, data: "19/nov", cidade: "Istambul · Bósforo & Balat", uf: "Bairro Judeu · Bazar de Especiarias", horario: "Manhã", refeicao: "Café", resumo: "O bairro mais antigo da cidade e o estreito que separa dois continentes.", detalhes: ["Bairro judeu de Balat — casas coloridas e igreja ortodoxa", "Passeio de barco pelo Bósforo entre palácios e yalis de madeira", "Bazar Egípcio (Bazar das Especiarias) — construído no séc. XVII", "Opção SI: Mesquita de Süleymaniye, Palácio Beylerbeyi e colina de Çamlıca"], img: istambulImg, video: day1Video.url },
  { dia: 4, data: "20/nov", cidade: "Izmir & Éfeso", uf: "Voo Istambul → Izmir · Costa Egeia", horario: "Dia inteiro", refeicao: "Café · Jantar", resumo: "A cidade greco-romana mais bem preservada da Ásia Menor.", detalhes: ["Traslado ao aeroporto e voo doméstico Istambul → Izmir", "Tour panorâmico por Izmir", "Éfeso — Teatro Romano, Biblioteca de Celso e Rua de Mármore (UNESCO, 2015)", "Casa da Virgem Maria — local de peregrinação", "Visita a atelier de couro do Egeu", "Jantar e hospedagem em Izmir/Kusadasi"], img: efesoImg, video: day8Video.url },
  { dia: 5, data: "21/nov", cidade: "Pamukkale", uf: "Castelo de Algodão · Hierápolis", horario: "Dia inteiro", refeicao: "Café · Jantar", resumo: "Cachoeiras brancas de travertino esculpidas em séculos de águas termais.", detalhes: ["Viagem pela província de Denizli", "Hierápolis — cidade helenística em ruínas (UNESCO)", "Travertinos de Pamukkale — piscinas naturais de calcário", "Jantar e hospedagem em Pamukkale"], img: pamukkaleImg, video: day7Video.url },
  { dia: 6, data: "22/nov", cidade: "Capadócia · Chegada", uf: "Rota da Seda · Paisagens Lunares", horario: "Dia inteiro", refeicao: "Café · Jantar", resumo: "As paisagens lunares esculpidas pela lava de dois vulcões.", detalhes: ["Parada no Kervansaray — maior estalagem da era seljúcida", "Antigo dormitório e estábulo dos mercadores da Rota da Seda", "Chegada às formações vulcânicas da Capadócia", "Check-in no Hotel Caverna", "Jantar e hospedagem"], img: cavernaImg, video: day6Video.url },
  { dia: 7, data: "23/nov", cidade: "Capadócia", uf: "Göreme · Uçhisar · Balão (opção SI)", horario: "Dia inteiro", refeicao: "Café · Jantar", resumo: "Amanhecer de balão sobre as chaminés de fada — opção SI.", detalhes: ["Opção SI: passeio de balão ao nascer do sol", "Vale de Göreme — complexo monástico bizantino em rocha", "Aldeias trogloditas de Uçhisar e fortaleza natural", "Chaminés de fada de Urgup e Vale de Güvercinlik", "Atelier de cerâmica e joias típicas", "Opção SI: show da Noite Turca"], img: baloaoImg, video: day5Video.url },
  { dia: 8, data: "24/nov", cidade: "Capadócia → Ancara", uf: "Lago Salgado · Castelo de Ancara", horario: "Dia inteiro", refeicao: "Café · Jantar", resumo: "Da paisagem lunar à capital moderna da Turquia.", detalhes: ["Viagem por estrada rumo a Ancara", "Parada no Lago Salgado (Tuz) — segundo maior da Turquia", "Castelo de Ancara (Ankara Kalesi) — fortificações dos séc. VII-IX", "Ruas otomanas com casas de vigas de madeira e vistas panorâmicas", "Traslado ao hotel, jantar e hospedagem"], img: yhtImg, video: day4Video.url },
  { dia: 9, data: "25/nov", cidade: "Ancara → Istambul", uf: "Trem de Alta Velocidade YHT", horario: "Dia inteiro", refeicao: "Café", resumo: "Mausoléu de Atatürk pela manhã, trem-bala à tarde.", detalhes: ["Mausoléu de Atatürk — fundador da República Turca", "Traslado à estação de trem de alta velocidade", "Ticket YHT em classe turística — Ancara → Istambul", "Paisagens do Lago Sapanca, Montanhas de Bolu e Eskişehir", "Chegada em Istambul e traslado ao hotel"], img: yhtImg, video: day3Video.url },
  { dia: 10, data: "26/nov", cidade: "Istambul · Retorno", uf: "Voo direto IST → Guarulhos", horario: "Voo internacional", refeicao: "Refeições a bordo", resumo: "Café da manhã, tempo livre e o voo de volta para casa.", detalhes: ["Café da manhã e tempo livre", "Traslado ao Aeroporto Internacional de Istambul (IST)", "Voo direto Turkish Airlines TK 215 IST → GRU (20:35, chegada 27/nov 04:20)", "Assistência 24h em português durante todo o retorno"], img: istambulImg, video: day10Video.url },
];

const voos = {
  ida: [
    { cia: "Turkish Airlines · TK 216 · Voo direto", data: "segunda-feira, 16/nov/2026", from: "GRU · Guarulhos, São Paulo", fromTime: "17:10", to: "IST · Istambul", toTime: "11:45 (+1)", dur: "Direto" },
  ],
  volta: [
    { cia: "Turkish Airlines · TK 215 · Voo direto", data: "quinta-feira, 26/nov/2026", from: "IST · Istambul", fromTime: "20:35", to: "GRU · Guarulhos, São Paulo", toTime: "04:20 (+1)", dur: "Direto" },
  ],
  bagagem: ["1 item pessoal pequeno (embaixo do assento)", "1 bagagem de mão de até 8 kg", "Bagagem despachada não inclusa"],
};

const seguroCoberturas = [
  "Assistência médica — por evento",
  "Sala VIP nos aeroportos GRU · BEL · REC · GIG · POA · FOR",
  "Cancelamento de viagem por múltiplos motivos",
  "Regresso de menores e maiores",
  "Traslado de um familiar",
  "Hospedagem de acompanhante",
  "Prorrogação de estadia",
  "Roubo, furto ou extravio de documentos",
  "Retorno antecipado por sinistro grave na residência",
  "Traslado de corpo",
  "Localização de bagagens",
  "Assistência legal por responsabilidade em acidente",
];

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
      <CategoryIcons />
      <CvcDifferentials />
      <Reviews />
      <Seguro />
      <Budget />
      <Includes />
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
          <img src={logoAsset.url} alt="CVC Itupava Shopping Mall e Park Shopping Boulevard" className="h-10 w-auto rounded-full md:h-12" />
        </a>
        <nav className="hidden items-center gap-8 lg:flex">
          {nav.map(([l, h]) => (
            <a key={h} href={h} className="text-xs uppercase tracking-[0.25em] text-off-white/80 transition hover:text-gold-soft">
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
  const msg = encodeURIComponent("Olá! Sou da Família Singer Pereira e gostaria de falar sobre a nossa viagem para a Turquia.");
  return (
    <Popover>
      <PopoverTrigger asChild>
        <button className={`inline-flex items-center justify-center gap-2 bg-[color:var(--cvc-silver)] text-[0.65rem] uppercase tracking-[0.3em] text-black transition hover:bg-off-white ${className}`}>
          <MessageCircle className="h-4 w-4" /> {label}
        </button>
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
    <section id="top" ref={ref} className="relative min-h-[100svh] w-full overflow-hidden">
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
      <div className="relative z-10 mx-auto flex min-h-[100svh] max-w-7xl flex-col justify-end px-6 pb-20 pt-32 md:px-12 md:pb-32">
        <motion.h1
          {...fadeUp}
          className="max-w-4xl font-display text-[2.5rem] font-light leading-[1.05] text-off-white md:text-[4.5rem]"
        >
          Dirlene e Família{" "}
          <em className="not-italic text-gold-gradient animate-shimmer bg-clip-text">Singer Pereira</em>
          <br />
          <span className="text-off-white/85 italic font-light">entre Istambul e a magia da Capadócia.</span>
        </motion.h1>
        <motion.p
          {...fadeUp}
          transition={{ ...fadeUp.transition, delay: 0.2 }}
          className="mt-8 max-w-xl text-base font-light leading-relaxed text-off-white/80 md:text-lg"
        >
          Cada detalhe pensado e curado só para vocês, pela CVC Park Shopping Boulevard.
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
              Dez dias,<br />
              <em className="text-gold-gradient bg-clip-text animate-shimmer">dez histórias.</em>
            </h2>
            <p className="mt-6 max-w-md text-sm font-light text-off-white/65">
              Cada dia, um capítulo. Toque um card para ver a programação completa.
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
    { t: "Hotel Caverna", d: "Suítes esculpidas na rocha em Uçhisar & Göreme", img: cavernaImg },
    { t: "Trem YHT", d: "Alta velocidade entre Istambul e Ancara em classe executiva", img: yhtImg },
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

/* 06 — CATEGORY ICONS */
function CategoryIcons() {
  const cats = [
    { i: Plane, t: "Voos", d: "Internacionais com conexões otimizadas" },
    { i: Hotel, t: "Hospedagem", d: "Hotéis 5★ + Hotel Caverna na Capadócia" },
    { i: Train, t: "Trem YHT", d: "Alta velocidade em classe executiva" },
    { i: UtensilsCrossed, t: "Refeições", d: "Café da manhã diário + jantares selecionados" },
    { i: Map, t: "Passeios", d: "Guia em português em todos os destinos" },
    { i: Car, t: "Transfer", d: "Transporte executivo casa ↔ aeroporto" },
  ];
  return (
    <section className="bg-[color:var(--cvc-ink)] py-20">
      <div className="mx-auto grid max-w-7xl grid-cols-2 gap-6 px-6 md:grid-cols-6 md:px-12">
        {cats.map((c, i) => (
          <motion.div
            key={c.t}
            {...fadeUp}
            transition={{ ...fadeUp.transition, delay: i * 0.05 }}
            className="flex flex-col items-center text-center"
          >
            <c.i className="h-8 w-8 text-gold-soft" />
            <h3 className="mt-3 font-display text-lg text-off-white">{c.t}</h3>
            <p className="mt-1 text-xs font-light text-off-white/60">{c.d}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

/* 07 — CVC DIFFERENTIALS */
function CvcDifferentials() {
  const items = [
    { n: "01", img: curadoriaAsset.url, t: "Curadoria Personalizada", d: "Pacotes desenhados no estilo do cliente, com seleção manual de hotéis, voos e experiências. Cada detalhe pensado para você." },
    { n: "02", img: customerAsset.url, t: "Customer Experience", d: "Consultor dedicado após a compra: conferência de documentos, vacinas por país, check-in pela equipe, acompanhamento até o retorno." },
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
            href="https://g.page/r/CVC-Curitiba/review"
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
            4 adultos · 2 quartos duplos categoria Premium — voos diretos, circuito Special Tours, trem YHT, refeições e seguro Assist Card.
          </p>

          <div className="mt-12 border border-border bg-card/80 backdrop-blur p-10">
            <div className="text-[0.6rem] uppercase tracking-[0.4em] text-off-white/50">Valor total · 4 adultos</div>
            <div className="mt-4 font-display text-5xl font-light text-off-white md:text-7xl">
              R$ <em className="not-italic text-gold-gradient bg-clip-text animate-shimmer">56.084,30</em>
            </div>
            <div className="mt-2 text-sm font-light text-off-white/70">ou 10x sem juros de R$ 5.608,43</div>
            <div className="mt-8 border border-gold-soft/60 p-6">
              <div className="text-[0.6rem] uppercase tracking-[0.35em] text-gold-soft">Valor promocional</div>
              <div className="mt-2 font-display text-4xl text-off-white md:text-5xl">R$ 53.000,00</div>
              <div className="mt-2 text-xs font-light text-off-white/70">desconto aplicado pela loja para pagamento à vista no Pix</div>
            </div>
          </div>

          <WaChooser label="Reservar via WhatsApp" className="mt-10 px-8 py-4" />
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
          <span className="text-[0.65rem] uppercase tracking-[0.45em] text-gold-soft">Voos diretos · Turkish Airlines</span>
          <h2 className="mt-4 font-display text-4xl font-light text-off-white md:text-6xl">
            De Guarulhos a<br />
            <em className="text-gold-gradient bg-clip-text animate-shimmer">Istambul.</em>
          </h2>
        </motion.div>

        <div className="grid gap-10 lg:grid-cols-2">
          {(["ida", "volta"] as const).map((t) => (
            <motion.div key={t} {...fadeUp} className="border border-border bg-card p-8">
              <div className="flex items-center gap-3 border-b border-border pb-4">
                <Plane className="h-5 w-5 text-gold-soft" />
                <span className="text-[0.65rem] uppercase tracking-[0.4em] text-gold-soft">
                  {t === "ida" ? "Detalhes da ida" : "Detalhes da volta"}
                </span>
              </div>
              <div className="mt-6 space-y-6">
                {voos[t].map((v, i) => {
                  if (!v.data) {
                    return (
                      <div key={i} className="flex items-center gap-3 text-[0.7rem] uppercase tracking-[0.28em] text-off-white/50">
                        <span className="h-px flex-1 bg-border" />
                        {v.cia}
                        <span className="h-px flex-1 bg-border" />
                      </div>
                    );
                  }
                  return (
                    <div key={i}>
                      <div className="text-[0.65rem] uppercase tracking-[0.3em] text-gold-soft">{v.cia}</div>
                      <div className="mt-1 text-xs text-off-white/60">{v.data}</div>
                      <div className="mt-4 grid grid-cols-[1fr_auto_1fr] items-center gap-4">
                        <div>
                          <div className="font-display text-2xl text-off-white">{v.fromTime}</div>
                          <div className="mt-1 text-xs font-light text-off-white/70">{v.from}</div>
                        </div>
                        <div className="flex flex-col items-center text-[0.6rem] uppercase tracking-[0.3em] text-off-white/50">
                          <Plane className="h-4 w-4 rotate-90 text-gold-soft" />
                          <span className="mt-2">{v.dur}</span>
                        </div>
                        <div className="text-right">
                          <div className="font-display text-2xl text-off-white">{v.toTime}</div>
                          <div className="mt-1 text-xs font-light text-off-white/70">{v.to}</div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div {...fadeUp} className="mt-10 border-t border-border pt-6">
          <div className="text-[0.6rem] uppercase tracking-[0.4em] text-gold-soft">Franquia de bagagem</div>
          <ul className="mt-3 flex flex-wrap gap-x-8 gap-y-2 text-sm font-light text-off-white/80">
            {voos.bagagem.map((b) => (
              <li key={b} className="flex items-center gap-2"><span className="h-px w-4 bg-gold-soft" />{b}</li>
            ))}
          </ul>
        </motion.div>
      </div>
    </section>
  );
}

/* 09c — SEGURO INTER PRIME */
function Seguro() {
  return (
    <section className="bg-[color:var(--cvc-ink)] py-24 md:py-32">
      <div className="mx-auto max-w-6xl px-6 md:px-12">
        <div className="grid gap-12 lg:grid-cols-[1fr_1.4fr] lg:items-start">
          <motion.div {...fadeUp}>
            <span className="text-[0.65rem] uppercase tracking-[0.45em] text-gold-soft">Seguro Viagem</span>
            <h2 className="mt-4 font-display text-4xl font-light text-off-white md:text-6xl">
              Assist Card<br />
              <em className="text-gold-gradient bg-clip-text animate-shimmer">Inter Plus 150K.</em>
            </h2>
            <div className="mt-8 space-y-2 text-sm font-light text-off-white/80">
              <div className="flex items-center gap-3">
                <span className="text-[0.6rem] uppercase tracking-[0.35em] text-gold-soft w-16">Início</span>
                <span>segunda-feira, 16/nov/2026</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-[0.6rem] uppercase tracking-[0.35em] text-gold-soft w-16">Fim</span>
                <span>sexta-feira, 27/nov/2026</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-[0.6rem] uppercase tracking-[0.35em] text-gold-soft w-16">Cobertura</span>
                <span>4 adultos · 12 diárias</span>
              </div>
            </div>
          </motion.div>

          <motion.div {...fadeUp} className="border border-border bg-card p-8">
            <div className="text-[0.6rem] uppercase tracking-[0.4em] text-gold-soft">Assistências oferecidas</div>
            <ul className="mt-5 grid gap-3 text-sm font-light text-off-white/85 md:grid-cols-2">
              {seguroCoberturas.map((c) => (
                <li key={c} className="flex gap-3"><span className="mt-2 h-px w-4 flex-shrink-0 bg-gold-soft" />{c}</li>
              ))}
            </ul>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

/* 10 — INCLUDES */
function Includes() {
  const cols = [
    { t: "Inclui", items: [
      "Assistência à chegada no aeroporto por pessoal de língua espanhola",
      "Traslados de chegada e saída do aeroporto IST",
      "9 noites de acomodação nos hotéis indicados",
      "Regime alimentar conforme opção de itinerário escolhida",
      "Voo doméstico Istambul → Izmir (classe turística)",
      "Ticket de Trem de Alta Velocidade YHT Ancara → Istambul (classe turística)",
      "Visitas a Ancara, Capadócia, Pamukkale e Éfeso",
      "Excursão em Istambul (Bósforo + bairro Balat)",
      "Guia acompanhante em espanhol durante o passeio",
      "Ingressos aos lugares de interesse do itinerário",
      "Gorjetas para guia, motoristas e afins",
      "Taxas hoteleiras incluídas",
      "Seguro Viagem Assist Card Inter Plus 150K",
      "Assistência telefônica 24h",
    ]},
    { t: "Opção SI (Super Incluído)", items: [
      "Passeio de balão na Capadócia ao amanhecer",
      "Show da Noite Turca na Capadócia",
      "Visita de dia inteiro a Istambul com Santa Sofia e almoço",
      "Mesquita de Süleymaniye e parte asiática de Istambul",
      "Almoço na Mesquita do Sultão Süleyman",
    ]},
    { t: "Não inclui", items: [
      "Traslado de/para o Aeroporto Sabiha Gökçen (SAW) — mediante suplemento",
      "Bebidas em refeições não incluídas",
      "Almoços e jantares livres",
      "Despesas de caráter pessoal",
      "Passeios opcionais fora do roteiro",
    ]},
    { t: "Documentação & Dicas", items: [
      "Passaporte válido por +6 meses",
      "Turquia não exige visto para brasileiros",
      "Moeda: Lira Turca (TRY) · aceita-se USD e EUR",
      "Clima em março: 10–18°C — leve casaco",
      "Tomadas padrão europeu tipo C/F",
      "Fuso: GMT+3 (6h à frente de Curitiba)",
    ]},
  ];
  return (
    <section className="bg-[color:var(--cvc-ink)] py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-6 md:px-12">
        <motion.div {...fadeUp} className="mb-16">
          <span className="text-[0.65rem] uppercase tracking-[0.45em] text-gold-soft">Tudo o que você precisa saber</span>
          <h2 className="mt-4 font-display text-4xl font-light text-off-white md:text-5xl">
            Serviços <em className="text-gold-gradient bg-clip-text animate-shimmer">inclusos.</em>
          </h2>
        </motion.div>
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {cols.map((c, i) => (
            <motion.div key={c.t} {...fadeUp} transition={{ ...fadeUp.transition, delay: i * 0.05 }}>
              <h3 className="font-display text-xl text-off-white border-b border-gold-soft/40 pb-3">{c.t}</h3>
              <ul className="mt-5 space-y-3 text-sm font-light text-off-white/80">
                {c.items.map((x) => (
                  <li key={x} className="flex gap-3"><span className="mt-2 h-px w-4 flex-shrink-0 bg-gold-soft" />{x}</li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
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
        <motion.div {...fadeUp}>
          <p className="font-display text-3xl font-light leading-tight text-off-white md:text-5xl">
            Turquia, uma viagem para guardar{" "}
            <em className="text-gold-gradient bg-clip-text animate-shimmer">no coração pela vida inteira!</em>
          </p>
          <p className="mx-auto mt-6 max-w-xl text-sm font-light text-off-white/70 md:text-base">
            Cada detalhe pensado e curado só para vocês, pela CVC Park Shopping Boulevard.
          </p>
        </motion.div>
        {!revealed ? (
          <div className="mt-10 flex flex-col items-center">
            <button
              onClick={() => setRevealed(true)}
              aria-label="Revelar mensagem final"
              className="font-display text-9xl text-off-white/20 transition hover:text-gold-soft md:text-[12rem]"
            >
              ?
            </button>
            <span className="text-xs uppercase tracking-[0.4em] text-gold-soft">clique para ver</span>
          </div>
        ) : (
          <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1.2 }} className="mt-14">
            <p className="font-display text-2xl font-light italic leading-snug text-off-white md:text-4xl">
              "Uma experiência incrível, gerando algumas das mais inesquecíveis memórias da vida de Liliane e Família Singer Pereira.
              <br />
              <em className="text-gold-gradient bg-clip-text animate-shimmer">Obrigado pela confiança, já estamos ansiosos para a próxima aventura!</em>"
            </p>
            <div className="mt-10 text-xs uppercase tracking-[0.4em] text-gold-soft">CVC Park Shopping Boulevard</div>
          </motion.div>
        )}
      </div>
    </section>
  );
}

/* FOOTER */
function Footer() {
  return (
    <footer className="bg-[color:var(--cvc-ink)] border-t border-border py-16 text-off-white/75">
      <div className="mx-auto max-w-7xl px-6 md:px-12">
        <div className="flex flex-col items-start gap-6">
          <div className="font-display text-2xl tracking-[0.2em] text-off-white">CVC · ITUPAVA & PARK SHOPPING BOULEVARD</div>
          <p className="max-w-md text-sm font-light leading-relaxed">
            Curadoria de viagens internacionais. Parte da maior rede de viagens do Brasil — 1.500 lojas.
          </p>
        </div>

        <div className="mt-12 grid gap-10 md:grid-cols-2">
          {lojas.map((l) => (
            <div key={l.nome} className="border-t border-border pt-8">
              <div className="text-[0.65rem] uppercase tracking-[0.4em] text-gold-soft">Unidade</div>
              <h3 className="mt-3 font-display text-xl text-off-white">{l.nome}</h3>
              <p className="mt-1 text-sm font-light text-off-white/70">{l.endereco}</p>
              <p className="text-sm font-light text-off-white/70">{l.bairro}</p>
              <div className="mt-4 space-y-1 text-sm font-light">
                <p>
                  <span className="text-off-white/40">E-mail · </span>
                  <a href={`mailto:${l.email}`} className="text-off-white hover:text-gold-soft">{l.email}</a>
                </p>
                <p>
                  <span className="text-off-white/40">Instagram · </span>
                  <a href={`https://instagram.com/${l.insta.replace("@", "")}`} target="_blank" rel="noreferrer" className="text-off-white hover:text-gold-soft">{l.insta}</a>
                </p>
              </div>
              <a
                href={`https://wa.me/${l.wa}?text=${WA_MSG}`}
                target="_blank"
                rel="noreferrer"
                className="mt-5 inline-flex items-center gap-2 bg-[color:var(--cvc-silver)] px-5 py-3 text-[0.65rem] uppercase tracking-[0.3em] text-black transition hover:bg-off-white"
              >
                <MessageCircle className="h-4 w-4" /> WhatsApp {l.waDisplay}
              </a>
            </div>
          ))}
        </div>

        <div className="mt-12 border-t border-border pt-6 text-[0.65rem] uppercase tracking-[0.3em] text-off-white/40">
          Preços e condições sujeitos à disponibilidade · Imagens meramente ilustrativas
        </div>
      </div>
    </footer>
  );
}

/* FLOATING WHATSAPP */
function FloatingWa() {
  const [show, setShow] = useState(false);
  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 600);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  if (!show) return null;
  return (
    <a
      href={`https://wa.me/${lojas[0].wa}?text=${WA_MSG}`}
      target="_blank"
      rel="noreferrer"
      aria-label="Falar pelo WhatsApp"
      className="fixed bottom-6 right-6 z-40 flex h-14 w-14 items-center justify-center rounded-full bg-[color:var(--cvc-silver)] text-black shadow-xl transition hover:bg-off-white"
    >
      <MessageCircle className="h-6 w-6" />
    </a>
  );
}
