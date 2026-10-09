export const ofertaTurquia = {
  pessoas: 2,
  total: 29000,
  parcelas: 10,
  juros: 0,
  aVista: 28000,
  boleto: "boleto aprova fácil",
} as const;

export function formatBRL(value: number) {
  return new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(value);
}