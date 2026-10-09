import { describe, test } from "node:test";
import { strict as assert } from "node:assert";
import { ofertaTurquia } from "./oferta-turquia";

describe("Oferta Super Turquia", () => {
  test("29 mil para duas pessoas", () => {
    assert.equal(ofertaTurquia.total, 29000);
    assert.equal(ofertaTurquia.pessoas, 2);
  });
  test("10 vezes no cartão sem juros", () => {
    assert.equal(ofertaTurquia.parcelas, 10);
    assert.equal(ofertaTurquia.juros, 0);
    assert.equal(ofertaTurquia.total / ofertaTurquia.parcelas, 2900);
  });
  test("28 mil à vista", () => {
    assert.equal(ofertaTurquia.aVista, 28000);
  });
});