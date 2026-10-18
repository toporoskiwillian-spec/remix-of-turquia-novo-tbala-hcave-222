import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

/**
 * Curadoria editorial de hotéis.
 * A IA recebe SOMENTE os materiais enviados pela equipe (textos, fontes, fotos)
 * e devolve uma ficha estruturada + lista de dados ausentes. Nada é inventado.
 */

const MAX_PHOTOS = 10;
const MAX_PHOTO_CHARS = 3_000_000; // ~2,2 MB por foto em data URL

const inputSchema = z.object({
  hotelName: z.string().trim().min(2).max(160),
  city: z.string().trim().min(2).max(120),
  notes: z.string().trim().max(30_000).default(""),
  sources: z
    .array(z.object({ label: z.string().trim().max(200), content: z.string().trim().max(30_000) }))
    .max(10),
  photos: z
    .array(
      z.object({
        dataUrl: z.string().startsWith("data:image/").max(MAX_PHOTO_CHARS),
        caption: z.string().trim().max(300),
      }),
    )
    .max(MAX_PHOTOS),
});

export type CuradoriaInput = z.infer<typeof inputSchema>;

const fichaSchema = z.object({
  titulo: z.string(),
  estrelas: z.string().nullable(),
  endereco: z.string().nullable(),
  resumoEditorial: z.string(),
  destaques: z.array(z.string()),
  servicos: z.array(z.string()),
  checkIn: z.string().nullable(),
  checkOut: z.string().nullable(),
  avaliacoes: z.array(z.object({ fonte: z.string(), nota: z.string() })),
  fotos: z.array(z.object({ indice: z.number(), legendaSugerida: z.string(), sugeridaComoCapa: z.boolean() })),
  dadosAusentes: z.array(z.object({ campo: z.string(), motivo: z.string() })),
  conflitos: z.array(z.string()),
  fontesUsadas: z.array(z.string()),
});

export type FichaEditorial = z.infer<typeof fichaSchema>;
export type CuradoriaResult = { ok: true; ficha: FichaEditorial } | { ok: false; error: string };

const INSTRUCTIONS = `Você é editor de conteúdo da CVC Curitiba (lojas Itupava e Shopping Boulevard).
Crie uma ficha editorial de hotel em português do Brasil usando EXCLUSIVAMENTE os materiais fornecidos.
Regras obrigatórias:
- Nunca invente, estime ou complete dados (estrelas, endereço, notas, horários, serviços). Se não estiver nos materiais, use null ou lista vazia e registre em "dadosAusentes" com o motivo.
- Verifique sempre: estrelas, endereço, check-in, check-out, avaliações, serviços principais, foto de fachada, foto de quarto. Registre cada ausência.
- Se fontes divergirem, registre em "conflitos" citando as fontes.
- Fotos: descreva apenas o que é visível; não afirme que a foto é do hotel se nada indicar isso. Indique no máximo uma capa.
- "fontesUsadas" lista apenas os rótulos das fontes efetivamente usadas.
- Tom elegante e objetivo, sem exageros nem promessas.`;

export const gerarFichaHotel = createServerFn({ method: "POST" })
  .inputValidator((data: unknown) => inputSchema.parse(data))
  .handler(async ({ data }): Promise<CuradoriaResult> => {
    const apiKey = process.env["LOVABLE_API_KEY"];
    if (!apiKey) return { ok: false, error: "Serviço de IA não configurado." };

    const hasMaterial = data.notes.length > 0 || data.sources.some((s) => s.content) || data.photos.length > 0;
    if (!hasMaterial) return { ok: false, error: "Envie ao menos um texto, fonte ou foto." };

    const { createOpenAI } = await import("@ai-sdk/openai");
    const { streamText, Output } = await import("ai");

    const provider = createOpenAI({
      baseURL: "https://ai.gateway.lovable.dev/v1",
      apiKey,
      headers: { "Lovable-API-Key": apiKey, "X-Lovable-AIG-SDK": "vercel-ai-sdk" },
    });

    const text = [
      `Hotel: ${data.hotelName}`,
      `Cidade: ${data.city}`,
      data.notes ? `\n## Observações da equipe\n${data.notes}` : "",
      ...data.sources
        .filter((s) => s.content)
        .map((s, i) => `\n## Fonte ${i + 1} — ${s.label || "sem rótulo"}\n${s.content}`),
      data.photos.length
        ? `\n## Fotos (${data.photos.length})\n${data.photos.map((p, i) => `Foto ${i + 1}: legenda da equipe = ${p.caption || "(sem legenda)"}`).join("\n")}`
        : "\n## Fotos\nNenhuma foto enviada.",
    ].join("\n");

    try {
      const result = streamText({
        model: provider.responses("openai/gpt-6-astra"),
        instructions: INSTRUCTIONS,
        output: Output.object({ schema: fichaSchema }),
        maxRetries: 0,
        messages: [
          {
            role: "user",
            content: [
              { type: "text", text },
              ...data.photos.map((p) => ({ type: "image" as const, image: new URL(p.dataUrl) })),
            ],
          },
        ],
        providerOptions: {
          openai: {
            forceReasoning: true,
            reasoningEffort: "medium",
            reasoningSummary: "auto",
            store: false,
            include: ["reasoning.encrypted_content"],
          },
        },
      });
      const ficha = await result.output;
      return { ok: true, ficha };
    } catch (err) {
      console.error("curadoria error", err);
      const status = (err as { statusCode?: number }).statusCode;
      if (status === 402) return { ok: false, error: "Créditos de IA insuficientes. Adicione créditos em Settings → Plans & credits." };
      if (status === 429) return { ok: false, error: "Muitas solicitações. Aguarde um minuto e tente novamente." };
      if (status === 403) return { ok: false, error: "Acesso à IA bloqueado para este workspace." };
      return { ok: false, error: "Não foi possível gerar a ficha agora. Tente novamente." };
    }
  });
