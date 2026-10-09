import { describe, expect, test } from "bun:test";
import { ofertaTurquia } from "./oferta-turquia";

describe("Oferta Super Turquia", () => {
  test("29 mil para duas pessoas", () => {
    expect(ofertaTurquia.total).toBe(29000);
    expect(ofertaTurquia.pessoas).toBe(2);
  });
  test("10 vezes no cartão sem juros", () => {
    expect(ofertaTurquia.parcelas).toBe(10);
    expect(ofertaTurquia.juros).toBe(0);
    expect(ofertaTurquia.total / ofertaTurquia.parcelas).toBe(2900);
  });
  test("28 mil à vista", () => {
    expect(ofertaTurquia.aVista).toBe(28000);
  });
});