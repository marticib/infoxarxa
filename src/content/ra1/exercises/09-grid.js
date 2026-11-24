// Exercicis extra del tema 9: Grid (files i columnes alhora).
// Només fan servir el que s'ha explicat fins a la unitat 9.

const BASE = `body {
  font-family: Arial, sans-serif;
}`;

const RUTES = [
  { nom: 'Camí de Ronda', alt: 'Un camí arran de mar', nivell: 'Fàcil' },
  { nom: 'Vall de Núria', alt: 'El camí vell de Núria', nivell: 'Mitjana' },
  { nom: "Pica d'Estats", alt: "El cim de la Pica d'Estats", nivell: 'Difícil' },
  { nom: 'Estany de Sant Maurici', alt: 'Un estany envoltat de muntanyes', nivell: 'Fàcil' },
  { nom: 'Puigmal', alt: 'La carena del Puigmal', nivell: 'Difícil' },
  { nom: 'Sant Jeroni', alt: 'Les agulles de Montserrat', nivell: 'Mitjana' },
];

// Una galeria de targetes senzilles: la foto i el nom de la ruta.
const HTML_GALERIA = `<div class="galeria">
${RUTES.map(
  (ruta, index) => `  <article class="ruta">
    <img src="imatges/ruta-${index + 1}.jpg" alt="${ruta.alt}">
    <h3>${ruta.nom}</h3>
  </article>`
).join('\n\n')}
</div>`;

// Tres targetes amb un peu: el nom de la ruta i la seva dificultat.
const HTML_AMB_PEU = `<div class="galeria">
${RUTES.slice(0, 3)
  .map(
    (ruta, index) => `  <article class="ruta">
    <img src="imatges/ruta-${index + 1}.jpg" alt="${ruta.alt}">
    <div class="peu">
      <h3>${ruta.nom}</h3>
      <span class="etiqueta">${ruta.nivell}</span>
    </div>
  </article>`
  )
  .join('\n\n')}
</div>`;

const CSS_AMB_PEU = `.ruta {
  border: 1px solid #c9d6cf;
  border-radius: 8px;
}

.ruta img {
  display: block;
  width: 100%;
  border-radius: 8px 8px 0 0;
}

.peu h3 {
  margin: 0;
  font-size: 16px;
}

.etiqueta {
  padding: 2px 8px;
  font-size: 13px;
  background: #e8f3ee;
  border-radius: 10px;
}`;

const CSS_GALERIA = `.ruta img {
  display: block;
  width: 100%;
  border-radius: 8px;
}

.ruta h3 {
  margin: 8px 0 0;
  font-size: 15px;
}`;

export default [
  {
    id: 'dues-columnes',
    level: 1,
    title: 'Quatre consells, dues columnes',
    statement: "Els quatre consells estan apilats. Col·loca'ls en una graella de dues columnes iguals, amb 16 píxels de separació en tots dos sentits.",
    expected: 'Dues files de dues caixes verd clar, de la mateixa amplada.',
    html: `<div class="consells">
  <div class="consell">Porta aigua de sobres</div>
  <div class="consell">Mira la previsió del temps</div>
  <div class="consell">Avisa algú de la ruta que faràs</div>
  <div class="consell">Emporta't les deixalles</div>
</div>`,
    css: `${BASE}

.consell {
  padding: 12px;
  background: #e8f3ee;
  border-radius: 8px;
}`,
    hint: 'Has d\'afegir una regla per al pare, `.consells`, amb tres propietats: la que activa la graella, la que dibuixa dues columnes i la que les separa.',
    solution: {
      css: `${BASE}

.consells {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
}

.consell {
  padding: 12px;
  background: #e8f3ee;
  border-radius: 8px;
}`,
    },
    explanation: "`1fr 1fr` són dues columnes que es reparteixen l'amplada a parts iguals. Els quatre consells les omplen per ordre: dos a la primera fila i dos a la segona.",
    checks: [
      { label: 'Hi ha dues columnes', selector: '.consell', columns: 2 },
      { label: 'Els quatre consells ocupen dues files', selector: '.consell', rows: 2 },
      { label: 'Les dues columnes fan la mateixa amplada', selector: '.consell', sameSize: 'width' },
      { label: 'Hi ha 16 píxels entre columnes i entre files', selector: '.consell', gap: 16 },
    ],
  },
  {
    id: 'quatre-per-fila',
    level: 1,
    title: 'Els mesos de l\'any',
    statement: "La fitxa d'una ruta mostra en quins mesos es recomana fer-la. Col·loca els dotze mesos en una graella de quatre columnes iguals, separats 8 píxels. Fes servir `repeat()` per no haver d'escriure la mateixa mida quatre vegades.",
    expected: 'Tres files de quatre mesos. Els recomanats, de maig a octubre, es veuen en verd.',
    html: `<div class="mesos">
  <div class="mes">Gen</div>
  <div class="mes">Feb</div>
  <div class="mes">Mar</div>
  <div class="mes">Abr</div>
  <div class="mes bo">Mai</div>
  <div class="mes bo">Jun</div>
  <div class="mes bo">Jul</div>
  <div class="mes bo">Ago</div>
  <div class="mes bo">Set</div>
  <div class="mes bo">Oct</div>
  <div class="mes">Nov</div>
  <div class="mes">Des</div>
</div>`,
    css: `${BASE}

.mes {
  padding: 8px 4px;
  font-size: 14px;
  text-align: center;
  background: #f0f0f0;
  border-radius: 6px;
}

.bo {
  color: #ffffff;
  background: #1f6f54;
}`,
    hint: '`repeat()` porta dues coses entre parèntesis, separades per una coma: quantes columnes vols i quant fa cada una.',
    solution: {
      css: `${BASE}

.mesos {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 8px;
}

.mes {
  padding: 8px 4px;
  font-size: 14px;
  text-align: center;
  background: #f0f0f0;
  border-radius: 6px;
}

.bo {
  color: #ffffff;
  background: #1f6f54;
}`,
    },
    explanation: "`repeat(4, 1fr)` és el mateix que `1fr 1fr 1fr 1fr`. Amb quatre columnes, els dotze mesos formen tres files sense que hagis dit enlloc quantes files hi ha.",
    checks: [
      { label: 'Hi ha quatre columnes', selector: '.mes', columns: 4 },
      { label: 'Els dotze mesos ocupen tres files', selector: '.mes', rows: 3 },
      { label: 'Tots els mesos fan la mateixa amplada', selector: '.mes', sameSize: 'width' },
      { label: 'Hi ha 8 píxels entre columnes i entre files', selector: '.mes', gap: 8 },
    ],
  },
  {
    id: 'fitxa-tecnica',
    level: 2,
    title: 'La fitxa tècnica',
    statement: "La fitxa té vuit caixes: el nom de cada dada i, a continuació, el seu valor. Col·loca-les en dues columnes: la dels noms ha de fer sempre 120 píxels i la dels valors s'ha de quedar la resta. Entre el nom i el valor hi ha d'haver 16 píxels, i entre una fila i la següent, 8.",
    expected: 'Quatre files. A cada una, el nom de la dada a l\'esquerra, en negreta, i el seu valor al costat. Tots els valors comencen a la mateixa columna.',
    html: `<div class="fitxa">
  <div class="nom">Distància</div>
  <div class="valor">12 km</div>

  <div class="nom">Temps</div>
  <div class="valor">3 h 30 min</div>

  <div class="nom">Desnivell</div>
  <div class="valor">640 m de pujada</div>

  <div class="nom">Dificultat</div>
  <div class="valor">Fàcil</div>
</div>`,
    css: `${BASE}

.fitxa {
  padding: 16px;
  background: #e8f3ee;
  border-radius: 8px;
}

.nom {
  font-weight: bold;
  color: #5b6b63;
}`,
    hint: [
      'La graella és `.fitxa`. Les dues columnes no són iguals: una té una mida fixa i l\'altra, una fracció.',
      'A `gap`, quan hi ha dos valors, el primer és la separació entre files.',
    ],
    solution: {
      css: `${BASE}

.fitxa {
  display: grid;
  grid-template-columns: 120px 1fr;
  gap: 8px 16px;
  padding: 16px;
  background: #e8f3ee;
  border-radius: 8px;
}

.nom {
  font-weight: bold;
  color: #5b6b63;
}`,
    },
    explanation: "Amb dues columnes, les vuit caixes van caient de dues en dues: un nom i el seu valor a cada fila. La columna de 120 píxels és de la graella, no de cada nom, i per això tots els valors comencen exactament al mateix punt.",
    checks: [
      { label: 'Hi ha dues columnes i quatre files', selector: '.fitxa > *', columns: 2, rows: 4 },
      { label: 'La columna dels noms fa 120 píxels', selector: '.nom', all: true, size: { width: 120 } },
      { label: 'Hi ha 16 píxels entre el nom i el valor, i 8 entre files', selector: '.fitxa > *', gap: { x: 16, y: 8 } },
      { label: 'Els valors arriben fins al marge dret de la fitxa', selector: '.valor', all: true, offset: { right: 16 } },
    ],
  },
  {
    id: 'targetes-amb-peu',
    level: 2,
    title: 'Una graella amb files a dins',
    statement: [
      "Hi ha tres rutes, cada una amb la foto i un peu amb el nom i la dificultat. Fes dues coses, cada una amb l'eina que li toca.",
      "Primer, posa les tres rutes en una graella de tres columnes iguals, separades 16 píxels. Després, dins del peu de cada targeta, posa el nom a l'esquerra i l'etiqueta de dificultat a la dreta, a la mateixa línia i centrats verticalment. El peu ha de tenir 12 píxels de `padding`.",
    ],
    expected: 'Tres targetes iguals de costat. A cada una, la foto a dalt i, a sota, el nom de la ruta a una punta i la dificultat a l\'altra.',
    width: 760,
    boxes: true,
    html: HTML_AMB_PEU,
    css: `${BASE}

${CSS_AMB_PEU}`,
    hint: [
      'Són dues regles noves: una per a `.galeria` i una per a `.peu`.',
      'La galeria té files i columnes: Grid. El peu és una sola fila amb una cosa a cada punta: Flexbox, amb `space-between`.',
    ],
    solution: {
      css: `${BASE}

.galeria {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 16px;
}

.peu {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px;
}

${CSS_AMB_PEU}`,
    },
    explanation: "La galeria vol cel·les iguals i alineades, i això és feina de Grid. El peu és una fila de dues peces de mides diferents, una a cada punta, i això és feina de Flexbox. Les dues eines no competeixen: una fa la quadrícula i l'altra, l'interior de cada cel·la.",
    checks: [
      { label: 'La galeria té tres columnes', selector: '.ruta', columns: 3 },
      { label: 'Les tres rutes fan la mateixa amplada', selector: '.ruta', sameSize: 'width' },
      { label: 'Hi ha 16 píxels entre ruta i ruta', selector: '.ruta', gap: { x: 16 } },
      { label: 'A cada peu, l\'etiqueta queda a la mateixa línia que el nom', selector: '.ruta:first-child .etiqueta', sameRow: '.ruta:first-child h3', rightOf: '.ruta:first-child h3' },
      { label: 'L\'etiqueta queda a 12 píxels del marge dret de la targeta', selector: '.etiqueta', all: true, offset: { right: 12 } },
    ],
  },
  {
    id: 'galeria-adaptable',
    level: 3,
    title: 'Una galeria que s\'adapta sola',
    statement: [
      "Les sis rutes surten l'una sota l'altra. Converteix-les en una galeria que triï ella mateixa quantes columnes hi caben: cada columna ha de fer com a mínim 140 píxels i, si sobra espai, les columnes se l'han de repartir. La separació és de 16 píxels en tots dos sentits.",
      "Quan et funcioni, amplia l'exercici a pantalla completa i torna: el nombre de columnes ha de canviar sense que toquis res.",
    ],
    expected: 'Una galeria amb dues columnes quan l\'espai és estret i quatre o més quan és ample. Les rutes sempre omplen tota l\'amplada.',
    html: HTML_GALERIA,
    css: `${BASE}

${CSS_GALERIA}`,
    hint: [
      'És la recepta de l\'apartat «Per anar més lluny» de la unitat: `repeat()` amb `auto-fill` al lloc del número.',
      'La mida de cada columna és `minmax(140px, 1fr)`: com a mínim 140 píxels i, com a màxim, una fracció de l\'espai.',
    ],
    solution: {
      css: `${BASE}

.galeria {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(140px, 1fr));
  gap: 16px;
}

${CSS_GALERIA}`,
    },
    explanation: [
      "`auto-fill` posa tantes columnes com hi càpiguen, i `minmax(140px, 1fr)` diu quant fa cada una: mai menys de 140 píxels, i si sobra espai se'l reparteixen a parts iguals.",
      "Amb un número fix, com `repeat(3, 1fr)`, la galeria tindria sempre tres columnes: minúscules en una pantalla estreta i enormes en una de molt ampla. Aquí és la graella qui s'adapta.",
    ],
    checks: [
      { label: 'La segona ruta queda al costat de la primera', selector: '.ruta:nth-child(2)', sameRow: '.ruta:first-child', rightOf: '.ruta:first-child' },
      { label: 'Cap ruta fa menys de 140 píxels d\'ample ni més de 300', selector: '.ruta', all: true, size: { minWidth: 140, maxWidth: 300 } },
      { label: 'Totes les rutes fan la mateixa amplada', selector: '.ruta', sameSize: 'width' },
      { label: 'Hi ha 16 píxels entre rutes, de costat i de dalt a baix', selector: '.ruta', gap: 16 },
    ],
  },
];
