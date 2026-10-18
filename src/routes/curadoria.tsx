import { createFileRoute, Link } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { useState, type ChangeEvent } from "react";
import { AlertTriangle, Copy, ImagePlus, Loader2, Plus, Sparkles, Trash2 } from "lucide-react";
import { gerarFichaHotel, type FichaEditorial } from "@/lib/curadoria.functions";

export const Route = createFileRoute("/curadoria")({
  head: () => ({
    meta: [
      { title: "Curadoria de Hotéis · CVC Curitiba" },
      { name: "description", content: "Ferramenta interna para gerar fichas editoriais de hotéis a partir de fontes e fotos da equipe CVC." },
      { property: "og:title", content: "Curadoria de Hotéis · CVC Curitiba" },
      { property: "og:description", content: "Fichas editoriais de hotéis baseadas apenas em materiais verificados." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: CuradoriaPage,
});

interface Fonte { id: string; label: string; content: string }
interface Foto { id: string; dataUrl: string; caption: string }

const MAX_FOTOS = 10;
const MAX_BYTES = 2_000_000;

const field =
  "w-full rounded-xl border border-border bg-background/60 px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary";
const goldBtn =
  "inline-flex items-center justify-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-bold text-primary-foreground transition hover:shadow-[0_0_24px_var(--gold-soft)] disabled:opacity-50";

function readFile(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const r = new FileReader();
    r.onload = () => resolve(String(r.result));
    r.onerror = () => reject(r.error);
    r.readAsDataURL(file);
  });
}

function fichaToText(f: FichaEditorial): string {
  const l = (v: string | null) => v ?? "— DADO AUSENTE —";
  return [
    `# ${f.titulo}`,
    `Estrelas: ${l(f.estrelas)}`,
    `Endereço: ${l(f.endereco)}`,
    `Check-in: ${l(f.checkIn)} · Check-out: ${l(f.checkOut)}`,
    "",
    f.resumoEditorial,
    "",
    "## Destaques", ...f.destaques.map((d) => `- ${d}`),
    "## Serviços", ...f.servicos.map((d) => `- ${d}`),
    "## Avaliações", ...f.avaliacoes.map((a) => `- ${a.fonte}: ${a.nota}`),
    "## Fotos", ...f.fotos.map((p) => `- Foto ${p.indice}${p.sugeridaComoCapa ? " (capa)" : ""}: ${p.legendaSugerida}`),
    "## Dados ausentes", ...f.dadosAusentes.map((d) => `- ${d.campo}: ${d.motivo}`),
    ...(f.conflitos.length ? ["## Conflitos entre fontes", ...f.conflitos.map((c) => `- ${c}`)] : []),
    "## Fontes", ...f.fontesUsadas.map((s) => `- ${s}`),
  ].join("\n");
}

function CuradoriaPage() {
  const gerar = useServerFn(gerarFichaHotel);
  const [hotelName, setHotelName] = useState("");
  const [city, setCity] = useState("");
  const [notes, setNotes] = useState("");
  const [fontes, setFontes] = useState<Fonte[]>([{ id: crypto.randomUUID(), label: "", content: "" }]);
  const [fotos, setFotos] = useState<Foto[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [ficha, setFicha] = useState<FichaEditorial | null>(null);
  const [copied, setCopied] = useState(false);

  async function onFiles(e: ChangeEvent<HTMLInputElement>) {
    const files = Array.from(e.target.files ?? []);
    e.target.value = "";
    const room = MAX_FOTOS - fotos.length;
    const ok = files.filter((f) => f.type.startsWith("image/") && f.size <= MAX_BYTES).slice(0, room);
    if (ok.length < files.length) setError(`Algumas fotos foram ignoradas (máx. ${MAX_FOTOS} fotos, até 2 MB cada).`);
    const loaded = await Promise.all(ok.map(async (f) => ({ id: crypto.randomUUID(), dataUrl: await readFile(f), caption: "" })));
    setFotos((p) => [...p, ...loaded]);
  }

  async function onSubmit() {
    setError(null);
    setFicha(null);
    setLoading(true);
    try {
      const res = await gerar({
        data: {
          hotelName, city, notes,
          sources: fontes.filter((f) => f.content.trim()).map(({ label, content }) => ({ label, content })),
          photos: fotos.map(({ dataUrl, caption }) => ({ dataUrl, caption })),
        },
      });
      if (res.ok) setFicha(res.ficha);
      else setError(res.error);
    } catch {
      setError("Verifique nome do hotel e cidade (mínimo 2 letras) e tente novamente.");
    } finally {
      setLoading(false);
    }
  }

  const canSubmit = hotelName.trim().length >= 2 && city.trim().length >= 2 && !loading;

  return (
    <main className="min-h-screen bg-background px-4 py-10 text-foreground md:px-8">
      <div className="mx-auto max-w-5xl space-y-8">
        <header className="space-y-2">
          <Link to="/" className="text-xs uppercase tracking-[0.3em] text-muted-foreground hover:text-primary">← Voltar à página</Link>
          <h1 className="font-display text-4xl text-primary md:text-5xl">Curadoria de Hotéis</h1>
          <p className="text-sm text-muted-foreground">Envie informações, fontes e fotos. A ficha é gerada somente com esses materiais e os dados que faltarem ficam em destaque.</p>
        </header>

        <section className="grid gap-4 rounded-2xl border border-border bg-card p-6 md:grid-cols-2">
          <label className="space-y-2 text-sm font-semibold">Nome do hotel
            <input className={field} value={hotelName} onChange={(e) => setHotelName(e.target.value)} placeholder="Ex.: Uranus Istanbul Topkapi" />
          </label>
          <label className="space-y-2 text-sm font-semibold">Cidade
            <input className={field} value={city} onChange={(e) => setCity(e.target.value)} placeholder="Ex.: Istambul" />
          </label>
          <label className="space-y-2 text-sm font-semibold md:col-span-2">Observações da equipe
            <textarea className={`${field} min-h-24`} value={notes} onChange={(e) => setNotes(e.target.value)} placeholder="Informações confirmadas pela equipe ou pela operadora" />
          </label>
        </section>

        <section className="space-y-4 rounded-2xl border border-border bg-card p-6">
          <h2 className="font-display text-2xl text-primary">Fontes</h2>
          {fontes.map((f, i) => (
            <div key={f.id} className="space-y-2 rounded-xl border border-border p-4">
              <div className="flex gap-2">
                <input className={field} aria-label={`Nome da fonte ${i + 1}`} value={f.label} placeholder="Nome ou link (ex.: Booking.com)"
                  onChange={(e) => setFontes((p) => p.map((x) => (x.id === f.id ? { ...x, label: e.target.value } : x)))} />
                <button type="button" aria-label="Remover fonte" className="rounded-full p-3 text-muted-foreground hover:text-destructive"
                  onClick={() => setFontes((p) => p.filter((x) => x.id !== f.id))}><Trash2 className="h-4 w-4" /></button>
              </div>
              <textarea className={`${field} min-h-32`} aria-label={`Conteúdo da fonte ${i + 1}`} value={f.content} placeholder="Cole aqui o texto copiado da fonte"
                onChange={(e) => setFontes((p) => p.map((x) => (x.id === f.id ? { ...x, content: e.target.value } : x)))} />
            </div>
          ))}
          {fontes.length < 10 && (
            <button type="button" className="inline-flex items-center gap-2 text-sm font-semibold text-primary hover:underline"
              onClick={() => setFontes((p) => [...p, { id: crypto.randomUUID(), label: "", content: "" }])}><Plus className="h-4 w-4" /> Adicionar fonte</button>
          )}
        </section>

        <section className="space-y-4 rounded-2xl border border-border bg-card p-6">
          <h2 className="font-display text-2xl text-primary">Fotos ({fotos.length}/{MAX_FOTOS})</h2>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {fotos.map((p, i) => (
              <figure key={p.id} className="space-y-2 rounded-xl border border-border p-3">
                <img src={p.dataUrl} alt={p.caption || `Foto ${i + 1}`} className="aspect-video w-full rounded-lg object-cover" />
                <figcaption className="flex gap-2">
                  <input className={field} aria-label={`Legenda da foto ${i + 1}`} value={p.caption} placeholder={`Legenda da foto ${i + 1}`}
                    onChange={(e) => setFotos((x) => x.map((y) => (y.id === p.id ? { ...y, caption: e.target.value } : y)))} />
                  <button type="button" aria-label={`Remover foto ${i + 1}`} className="rounded-full p-3 text-muted-foreground hover:text-destructive"
                    onClick={() => setFotos((x) => x.filter((y) => y.id !== p.id))}><Trash2 className="h-4 w-4" /></button>
                </figcaption>
              </figure>
            ))}
          </div>
          {fotos.length < MAX_FOTOS && (
            <label className="inline-flex cursor-pointer items-center gap-2 rounded-full border border-primary px-5 py-2 text-sm font-semibold text-primary hover:shadow-[0_0_18px_var(--gold-soft)]">
              <ImagePlus className="h-4 w-4" /> Enviar fotos
              <input type="file" accept="image/*" multiple className="sr-only" onChange={onFiles} />
            </label>
          )}
        </section>

        <div className="flex flex-wrap items-center gap-4">
          <button type="button" className={goldBtn} disabled={!canSubmit} onClick={onSubmit}>
            {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Sparkles className="h-4 w-4" />}
            {loading ? "Gerando ficha…" : "Gerar ficha editorial"}
          </button>
          {error && <p role="alert" className="text-sm text-destructive">{error}</p>}
        </div>

        {ficha && <FichaView ficha={ficha} fotos={fotos} copied={copied} onCopy={async () => {
          await navigator.clipboard.writeText(fichaToText(ficha));
          setCopied(true);
          setTimeout(() => setCopied(false), 2000);
        }} />}
      </div>
    </main>
  );
}

interface FichaViewProps { ficha: FichaEditorial; fotos: Foto[]; copied: boolean; onCopy: () => void }

function Missing() {
  return <span className="rounded-md bg-destructive/15 px-2 py-0.5 text-xs font-bold text-destructive">Dado ausente</span>;
}

function FichaView({ ficha, fotos, copied, onCopy }: FichaViewProps) {
  const row = (k: string, v: string | null) => (
    <div className="flex flex-wrap justify-between gap-2 border-b border-border py-2 text-sm"><span className="text-muted-foreground">{k}</span>{v ? <span>{v}</span> : <Missing />}</div>
  );
  return (
    <section className="space-y-6 rounded-2xl border border-primary/50 bg-card p-6">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <h2 className="font-display text-3xl text-primary">{ficha.titulo}</h2>
        <button type="button" className={goldBtn} onClick={onCopy}><Copy className="h-4 w-4" />{copied ? "Copiado!" : "Copiar ficha"}</button>
      </div>

      {ficha.dadosAusentes.length > 0 && (
        <div role="note" className="rounded-xl border border-destructive/50 bg-destructive/10 p-4">
          <p className="mb-2 flex items-center gap-2 font-bold text-destructive"><AlertTriangle className="h-4 w-4" /> Dados ausentes ({ficha.dadosAusentes.length})</p>
          <ul className="space-y-1 text-sm">{ficha.dadosAusentes.map((d) => <li key={d.campo}><strong>{d.campo}:</strong> {d.motivo}</li>)}</ul>
        </div>
      )}
      {ficha.conflitos.length > 0 && (
        <div className="rounded-xl border border-primary/50 bg-primary/10 p-4 text-sm">
          <p className="mb-2 font-bold text-primary">Conflitos entre fontes</p>
          <ul className="list-disc space-y-1 pl-5">{ficha.conflitos.map((c) => <li key={c}>{c}</li>)}</ul>
        </div>
      )}

      <div>{row("Estrelas", ficha.estrelas)}{row("Endereço", ficha.endereco)}{row("Check-in", ficha.checkIn)}{row("Check-out", ficha.checkOut)}</div>
      <p className="leading-relaxed">{ficha.resumoEditorial}</p>

      <div className="grid gap-6 md:grid-cols-2">
        <List title="Destaques" items={ficha.destaques} />
        <List title="Serviços" items={ficha.servicos} />
        <List title="Avaliações" items={ficha.avaliacoes.map((a) => `${a.fonte}: ${a.nota}`)} />
        <List title="Fontes usadas" items={ficha.fontesUsadas} />
      </div>

      {ficha.fotos.length > 0 && (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {ficha.fotos.map((p) => {
            const src = fotos[p.indice - 1]?.dataUrl;
            return (
              <figure key={p.indice} className="space-y-2">
                {src && <img src={src} alt={p.legendaSugerida} className="aspect-video w-full rounded-lg object-cover" />}
                <figcaption className="text-xs text-muted-foreground">{p.sugeridaComoCapa && <strong className="text-primary">Capa · </strong>}{p.legendaSugerida}</figcaption>
              </figure>
            );
          })}
        </div>
      )}
    </section>
  );
}

function List({ title, items }: { title: string; items: string[] }) {
  return (
    <div>
      <h3 className="mb-2 font-display text-lg text-primary">{title}</h3>
      {items.length ? <ul className="list-disc space-y-1 pl-5 text-sm">{items.map((i) => <li key={i}>{i}</li>)}</ul> : <Missing />}
    </div>
  );
}
