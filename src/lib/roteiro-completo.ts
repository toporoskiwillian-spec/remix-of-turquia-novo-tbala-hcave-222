export interface DiaRoteiro {
  dia: string;
  cidade: string;
  resumo: string;
  refeicao: string;
  texto: string;
}

export const roteiroCompleto: DiaRoteiro[] = [
  {
    dia: "Dia 1 · 02/abr", cidade: "Istambul", refeicao: "Livre",
    resumo: "Chegada à cidade onde Europa e Ásia se encontram.",
    texto: "Chegada ao Aeroporto Internacional de Istambul (IST), recepção com a equipe e traslado ao hotel. Restante do dia livre para conhecer por conta própria a antiga Bizâncio e Constantinopla, cujas áreas históricas são Patrimônio Mundial da UNESCO. Acomodação.\n\nTraslado de chegada pelo aeroporto Sabiha Gökçen (SAW): suplemento de USD 50, com base em dois passageiros.",
  },
  {
    dia: "Dia 2 · 03/abr", cidade: "Istambul Histórica", refeicao: "Café · Almoço no passeio opcional",
    resumo: "Dia livre ou uma imersão opcional no coração bizantino e otomano.",
    texto: "Café da manhã e dia livre para passeios e compras.\n\nOpcional: visita de dia inteiro com almoço, incluindo Santa Sofia, Palácio Topkapi e seu harém, Mesquita Azul, Hipódromo Romano e Grande Bazar. A visita é incluída somente na opção SI (Super Incluído). Acomodação.",
  },
  {
    dia: "Dia 3 · 04/abr", cidade: "Istambul · Bósforo e Balat", refeicao: "Café · Almoço no passeio opcional",
    resumo: "Casas coloridas de Balat e um passeio entre continentes pelo Bósforo.",
    texto: "Café da manhã. Visita ao bairro judeu de Balat, com sua igreja ortodoxa e casas coloridas. Passeio de barco pelo Bósforo, entre palácios dos sultões e antigas casas de madeira. Visita ao Bazar Egípcio, o Bazar das Especiarias. Restante do dia livre.\n\nOpcional: excursão com almoço à Mesquita de Süleymaniye, ao Palácio Beylerbeyi na costa asiática e à colina de Çamlıca. Incluída somente na opção SI. Retorno ao hotel e acomodação.",
  },
  {
    dia: "Dia 4 · 05/abr", cidade: "Istambul → Ancara · Trem-bala", refeicao: "Café · Jantar",
    resumo: "A Turquia pela janela do trem de alta velocidade YHT.",
    texto: "Café da manhã. Traslado à estação e viagem de trem de alta velocidade para Ancara, capital da Turquia. Durante a viagem, aprecie as paisagens do Lago Sapanca, das Montanhas de Bolu e da região de Eskişehir. Chegada a Ancara e traslado ao hotel. Jantar e acomodação.",
  },
  {
    dia: "Dia 5 · 06/abr", cidade: "Ancara → Capadócia", refeicao: "Café · Jantar",
    resumo: "Da história de Atatürk ao Lago Salgado e às paisagens lunares.",
    texto: "Café da manhã. Visita ao Mausoléu de Atatürk, fundador da República Turca, e ao Castelo de Ancara, com fortificações dos séculos VII e IX, casas otomanas e vistas da cidade antiga.\n\nÀ tarde, saída por estrada para a Capadócia. No caminho, passagem pelo Lago Salgado, o segundo maior da Turquia. Chegada à região de paisagens lunares moldadas por camadas de lava vulcânica. Jantar e acomodação.",
  },
  {
    dia: "Dia 6 · 07/abr", cidade: "Capadócia", refeicao: "Café · Jantar",
    resumo: "Göreme, Uçhisar e as chaminés de fada em um dia inesquecível.",
    texto: "Opcional ao amanhecer: passeio de balão sobre as paisagens da Capadócia, incluído somente na opção SI e sujeito às condições climáticas.\n\nCafé da manhã. Excursão de dia inteiro pela Capadócia: Vale de Göreme e suas igrejas escavadas na rocha, aldeias de Uçhisar, chaminés de fada de Ürgüp e Vale de Güvercinlik, com vista panorâmica do Castelo de Uçhisar. Visita a um estabelecimento de artesanato, pedras típicas e joias. Jantar e acomodação.\n\nÀ noite, show opcional da Noite Turca, incluído somente na opção SI.",
  },
  {
    dia: "Dia 7 · 08/abr", cidade: "Capadócia → Pamukkale", refeicao: "Café · Jantar",
    resumo: "O Castelo do Algodão e as ruínas de Hierápolis.",
    texto: "Café da manhã. Saída pela região da Anatólia até a província de Denizli. Visita a Pamukkale e Hierápolis, declaradas Patrimônio da Humanidade. Conheça as ruínas da antiga cidade helenística e o Castelo do Algodão, com cascatas brancas e piscinas naturais formadas pela passagem de águas termais calcárias. Chegada ao hotel. Jantar e acomodação.",
  },
  {
    dia: "Dia 8 · 09/abr", cidade: "Pamukkale · Éfeso · Izmir → Istambul", refeicao: "Café",
    resumo: "A Biblioteca de Celso, a Casa da Virgem Maria e o retorno a Istambul.",
    texto: "Café da manhã. Saída para Éfeso, cidade greco-romana dos séculos I e II e Patrimônio Mundial da UNESCO, com visita ao Teatro Romano, à Biblioteca de Celso e à Rua de Mármore. Visita à Casa da Virgem Maria, importante lugar de peregrinação. Parada em uma loja de couro da região do Egeu.\n\nTraslado ao aeroporto de Izmir e voo para Istambul. Na chegada, traslado ao hotel e acomodação.",
  },
  {
    dia: "Dia 9 · 10/abr", cidade: "Istambul · Retorno", refeicao: "Café",
    resumo: "Tempo livre antes do traslado de saída.",
    texto: "Café da manhã. Tempo livre até o horário do traslado ao Aeroporto Internacional de Istambul (IST) para embarque no voo de regresso. Fim dos serviços.\n\nTraslado de saída pelo aeroporto Sabiha Gökçen (SAW): suplemento de USD 50, com base em dois passageiros.",
  },
];
