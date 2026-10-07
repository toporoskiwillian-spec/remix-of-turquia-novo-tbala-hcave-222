# Plano — LP Super Turquia (dados oficiais)

Atualizar a landing page atual com o conteúdo do documento anexo, mantendo a mesma identidade visual dark luxury (Playfair + Inter, gradientes gold) e o rodapé com as duas lojas.

## 1. Cabeçalho / Hero
- Título: "Super Turquia com Trem de Alta Velocidade & Hotel Caverna"
- Datas: 01/03/2027 → 11/03/2027 (10 diárias, 2 viajantes)
- Código: 102-S-T-C · Special Tours
- Rota resumida: Istambul · Izmir · Pamukkale · Capadócia · Ancara

## 2. Roteiro (substituir os 10 dias atuais)
Reescrever cada DayCard com o conteúdo real do PDF:
1. Istambul — chegada e traslado
2. Istambul — Santa Sofia, Topkapi, Mesquita Azul, Hipódromo, Grande Bazar
3. Istambul — Balat, Bósforo, Bazar Egípcio, Süleymaniye
4. Izmir / Éfeso — Casa da Virgem Maria
5. Pamukkale — Hierápolis e Castelo do Algodão
6. Capadócia — Kervansaray e paisagens lunares
7. Capadócia — Göreme, Uchisar, Urgup + opcional balão
8. Ancara — Lago Salgado, Castelo de Ancara
9. Ancara → Istambul de **Trem de Alta Velocidade (YHT)**
10. Istambul — traslado de saída

Manter os vídeos cinematográficos já gerados por dia (reaproveitar/remapear conforme cidade).

## 3. Nova seção "Voos incluídos" (após roteiro)
Bloco editorial com os trechos:
- **Ida** — 01/mar KLM GRU→AMS 13:55→05:25 · parada 6h35 · 02/mar Pegasus AMS→SAW 12:00→17:30
- **Volta** — 11/mar Air France IST→CDG 07:15→09:00 · parada 1h25 · AF CDG→GRU 10:25→18:25
- Bagagem: 1 mochila + 1 mão + 1 despachada 23kg

## 4. Nova seção "Seguro Inter Prime 250K"
Card com lista de coberturas (assistência médica, sala VIP GRU/BEL/REC/GIG/POA/FOR, cancelamento multi-motivos, traslado familiar, hospedagem acompanhante, extravio de documentos, traslado de corpo etc.)

## 5. Serviços inclusos (atualizar)
Lista completa do PDF: assistência espanhola, 9 noites, show Noite Turca (SI), regime alimentar, balão (SI), Süleymaniye (SI), visitas Ankara/Capadócia/Pamukkale/Éfeso, tour Istambul c/ almoço (SI), Bósforo + Balat, guia espanhol, ticket YHT Ancara-Istambul, voo Istambul-Izmir, ingressos, gorjetas, taxas hoteleiras, seguro, assistência 24h.

## 6. Investimento (substituir bloco atual)
- **R$ 29.000,00** total para 2 pessoas
- 10x sem juros no cartão ou boleto
- À vista: **R$ 26.500,00**
- CTA WhatsApp Itupava

## 7. Rodapé
Corrigir endereço da Shopping Boulevard: "LINHA VERDE, 16303 – Xaxim, Curitiba – PR" (hoje está BR-116). Demais dados mantidos.

## Técnico
- Editar somente `src/routes/index.tsx` (dados + duas novas sections: Voos e Seguro)
- Atualizar `head()` title/description para refletir datas e trem de alta velocidade
- Reaproveitar vídeos/imagens já em `src/assets/turquia/`; remapear dias 8-10 (Ancara, YHT, Istambul) se necessário — gerar 1-2 vídeos novos apenas se algum destino ficar sem mídia adequada
- Sem mudanças em styles.css nem em outros arquivos
