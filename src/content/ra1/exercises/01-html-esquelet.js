// Exercicis extra del tema 1: HTML, l'esquelet d'una pàgina.
// Només fan servir el que s'ha explicat a la unitat 1: encara no hi ha CSS.

const pagina = (titol, cos) => `<!DOCTYPE html>
<html lang="ca">
  <head>
    <meta charset="UTF-8">
    <title>${titol}</title>
  </head>
  <body>
${cos}
  </body>
</html>`;

export default [
  {
    id: 'titols-i-apartats',
    level: 1,
    title: 'Això no són paràgrafs',
    statement: 'Tot el text està marcat com a paràgraf, però hi ha tres línies que són títols. Converteix «Vall de Núria» en l\'encapçalament principal de la pàgina, i «Com arribar-hi» i «Quan anar-hi», en encapçalaments d\'apartat.',
    expected: 'Un títol gran, i a sota dos apartats, cadascun amb el seu subtítol i un paràgraf.',
    html: `<p>Vall de Núria</p>
<p>Com arribar-hi</p>
<p>Amb el tren cremallera des de Ribes de Freser.</p>
<p>Quan anar-hi</p>
<p>De juny a octubre, quan ja no hi ha neu.</p>`,
    hint: "Has de canviar el nom de l'etiqueta a tres línies, i a cada una l'has de canviar dues vegades: a l'obertura i al tancament.",
    solution: {
      html: `<h1>Vall de Núria</h1>
<h2>Com arribar-hi</h2>
<p>Amb el tren cremallera des de Ribes de Freser.</p>
<h2>Quan anar-hi</h2>
<p>De juny a octubre, quan ja no hi ha neu.</p>`,
    },
    explanation: "L'etiqueta es tria pel que és el text, no per com es veu. «Vall de Núria» és el títol de tota la pàgina, i les altres dues línies, el títol de cada apartat.",
    checks: [
      { label: 'El títol principal és «Vall de Núria»', selector: 'h1', count: 1, text: 'Vall de Núria' },
      { label: "Hi ha dos encapçalaments d'apartat", selector: 'h2', count: 2 },
      { label: 'El primer apartat es diu «Com arribar-hi»', selector: 'h2', text: 'Com arribar-hi' },
      { label: 'Només queden dos paràgrafs', selector: 'p', count: 2 },
    ],
  },
  {
    id: 'nom-de-la-pestanya',
    level: 1,
    title: 'El nom de la pestanya i l\'idioma',
    statement: 'Aquesta pàgina s\'ha fet copiant-ne una altra, i han quedat dues coses per canviar. La pestanya ha de dir «Mapa · Camins», i la pàgina està escrita en català, no en anglès.',
    expected: 'La pàgina es veu igual, però la barra de sobre diu «Mapa · Camins».',
    html: `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8">
    <title>Pàgina nova</title>
  </head>
  <body>
    <h1>Mapa de rutes</h1>
    <p>Aquí hi haurà el mapa amb totes les rutes.</p>
  </body>
</html>`,
    fileNames: { html: 'mapa.html' },
    hint: "Són dos canvis petits: el contingut del `<title>` i el valor de l'atribut `lang`. El codi del català és `ca`.",
    solution: {
      html: pagina(
        'Mapa · Camins',
        `    <h1>Mapa de rutes</h1>
    <p>Aquí hi haurà el mapa amb totes les rutes.</p>`
      ),
    },
    explanation: "Cap dels dos canvis es nota al cos de la pàgina. El `<title>` es veu a la pestanya, i `lang` no es veu enlloc: el fan servir els lectors de pantalla i els traductors.",
    checks: [
      { label: 'La pestanya diu «Mapa · Camins»', selector: 'head > title', text: 'Mapa · Camins' },
      { label: 'La pàgina diu que és en català', selector: 'html', attr: { lang: 'ca' } },
    ],
  },
  {
    id: 'amaga-sense-esborrar',
    level: 2,
    title: 'Dues maneres de fer desaparèixer un paràgraf',
    statement: [
      'Hi ha dos paràgrafs que no s\'han de veure, i cadascun es treu d\'una manera diferent.',
      'La línia que comença per «Revisar» és una nota per a tu: converteix-la en un comentari. L\'avís del funicular ja no val, però el tornaràs a necessitar: deixa\'l com a paràgraf i amaga\'l amb l\'atribut que fa que un element no es mostri.',
    ],
    expected: 'El títol i dos paràgrafs: la descripció de la ruta i el temps que es triga.',
    html: `<h1>Sant Jeroni</h1>
<p>Una ruta de dificultat mitjana per la muntanya de Montserrat.</p>
<p>Revisar: la distància és 11 km o 12 km?</p>
<p>Aquesta setmana el funicular està tancat per obres.</p>
<p>La ruta es fa en unes 4 hores i 30 minuts.</p>`,
    hint: [
      'Un comentari va entre `<!--` i `-->`. Les etiquetes `<p>` de la nota ja no fan falta.',
      "L'atribut és `hidden`. No porta valor i va dins de l'etiqueta d'obertura.",
    ],
    solution: {
      html: `<h1>Sant Jeroni</h1>
<p>Una ruta de dificultat mitjana per la muntanya de Montserrat.</p>
<!-- Revisar: la distància és 11 km o 12 km? -->
<p hidden>Aquesta setmana el funicular està tancat per obres.</p>
<p>La ruta es fa en unes 4 hores i 30 minuts.</p>`,
    },
    explanation: "El comentari deixa de ser un element: per al navegador, allà no hi ha res. El paràgraf amb `hidden`, en canvi, continua existint: només cal treure-li l'atribut perquè torni a sortir.",
    checks: [
      { label: 'La nota ja no és un paràgraf: en queden tres', selector: 'p', count: 3 },
      { label: "L'avís del funicular té l'atribut `hidden`", selector: 'p[hidden]', count: 1, text: 'funicular' },
      { label: 'Els altres dos paràgrafs es continuen veient', selector: 'p:not([hidden])', count: 2 },
    ],
  },
  {
    id: 'fitxa-en-linies',
    level: 2,
    title: 'Salts de línia, on toca i on no',
    statement: [
      'Fes que les tres dades de la fitxa (distància, temps i dificultat) es vegin cada una a la seva línia, sense deixar de ser un sol paràgraf.',
      'A més, algú ha posat tres `<br>` per separar els dos últims paràgrafs. Treu-los: dos paràgrafs ja se separen sols.',
    ],
    expected: 'El títol, la fitxa en tres línies seguides i, a sota, dos paràgrafs amb la separació normal entre ells.',
    html: `<h1>Pica d'Estats</h1>
<p>Distància: 18 km
Temps: 9 h
Dificultat: difícil</p>
<p>És el cim més alt de Catalunya.</p>
<br>
<br>
<br>
<p>Surt d'hora: la ruta és llarga.</p>`,
    hint: 'El `<br>` serveix quan el salt forma part del text, com a la fitxa. Entre dos paràgrafs no en cal cap.',
    solution: {
      html: `<h1>Pica d'Estats</h1>
<p>Distància: 18 km<br>
Temps: 9 h<br>
Dificultat: difícil</p>
<p>És el cim més alt de Catalunya.</p>
<p>Surt d'hora: la ruta és llarga.</p>`,
    },
    explanation: "Dins de la fitxa, els salts de línia formen part del contingut i s'han de dir amb `<br>`, perquè els del codi no compten. Entre paràgrafs, en canvi, l'espai ja el posa el navegador, i quan calgui canviar-lo ho farem amb CSS.",
    checks: [
      { label: 'La fitxa té salts de línia entre les seves tres dades', selector: 'p br', count: { min: 2, max: 3 } },
      { label: 'No queda cap `<br>` solt entre paràgrafs', selector: 'body > br', exists: false },
      { label: 'Continua havent-hi tres paràgrafs', selector: 'p', count: 3 },
    ],
  },
  {
    id: 'repara-el-document',
    level: 3,
    title: 'Un document amb quatre errors',
    statement: [
      "Aquest document es veu, però malament: a dalt de tot surt un text estrany, el primer paràgraf sembla un títol i falta l'últim apartat sencer.",
      "Hi ha quatre errors. Tots són coses que has vist a la unitat: un atribut, una etiqueta que no és on toca, una que no es tanca i un comentari mal acabat. Troba'ls i arregla'ls.",
    ],
    expected: 'El títol «Estany de Sant Maurici», un paràgraf, el subtítol «Com arribar-hi» i un altre paràgraf. A la barra de sobre, «Sant Maurici · Camins».',
    html: `<!DOCTYPE html>
<html> lang="ca"
  <head>
    <meta charset="UTF-8">
  </head>
  <body>
    <title>Sant Maurici · Camins</title>
    <h1>Estany de Sant Maurici
    <p>Una ruta fàcil de 7 quilòmetres.</p>
    <!-- Pendent: afegir-hi una foto ->
    <h2>Com arribar-hi</h2>
    <p>Amb cotxe fins a Espot i, des d'allà, a peu.</p>
  </body>
</html>`,
    fileNames: { html: 'ruta.html' },
    hint: [
      'Ves de dalt a baix. El text estrany de dalt de la pàgina et diu on és el primer error: què hi fa, allà fora?',
      "Un comentari s'acaba amb dos guions i un `>`. Si no es tanca bé, tot el que ve després també és comentari.",
    ],
    solution: {
      html: pagina(
        'Sant Maurici · Camins',
        `    <h1>Estany de Sant Maurici</h1>
    <p>Una ruta fàcil de 7 quilòmetres.</p>
    <!-- Pendent: afegir-hi una foto -->
    <h2>Com arribar-hi</h2>
    <p>Amb cotxe fins a Espot i, des d'allà, a peu.</p>`
      ),
    },
    explanation: [
      "L'atribut `lang` era fora de l'etiqueta, i el navegador el mostrava com a text. El `<title>` era al `<body>` en lloc del `<head>`. Al `<h1>` li faltava el tancament i s'empassava el paràgraf. I el comentari acabava amb `->` en lloc de `-->`, de manera que la resta del document quedava comentada.",
      "Cap d'aquests errors fa aparèixer un missatge. Els has trobat mirant què es veia malament i buscant-ne la causa al codi: és la manera de depurar HTML.",
    ],
    checks: [
      { label: 'La pàgina diu que és en català', selector: 'html', attr: { lang: 'ca' } },
      { label: 'El `<title>` és dins del `<head>`', selector: 'head > title', text: 'Sant Maurici' },
      { label: 'El `<meta charset>` és dins del `<head>`', selector: 'head > meta[charset]' },
      { label: 'El primer paràgraf ja no forma part del títol', selector: 'h1 p', exists: false },
      { label: "Es torna a veure l'apartat «Com arribar-hi»", selector: 'h2', count: 1, text: 'Com arribar-hi' },
      { label: 'Hi ha dos paràgrafs', selector: 'p', count: 2 },
    ],
  },
];
