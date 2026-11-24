// Exercicis extra del tema 7: Flexbox (files i columnes).
// Només fan servir el que s'ha explicat fins a la unitat 7.

const BASE = `body {
  font-family: Arial, sans-serif;
}`;

export default [
  {
    id: 'xips-en-fila',
    level: 1,
    title: 'Una fila de xips',
    statement: "Els filtres de dificultat s'han de veure en una fila, separats 8 píxels entre ells. Ara mateix estan apilats.",
    expected: 'Quatre xips de costat, amb una mica d\'aire entre l\'un i l\'altre.',
    html: `<div class="xips">
  <div class="xip">Totes</div>
  <div class="xip">Fàcil</div>
  <div class="xip">Mitjana</div>
  <div class="xip">Difícil</div>
</div>`,
    css: `${BASE}

.xip {
  padding: 6px 12px;
  background: #e8f3ee;
  border-radius: 16px;
}`,
    hint: 'Has d\'afegir una regla nova per al pare dels xips, `.xips`, amb dues propietats.',
    solution: {
      css: `${BASE}

.xips {
  display: flex;
  gap: 8px;
}

.xip {
  padding: 6px 12px;
  background: #e8f3ee;
  border-radius: 16px;
}`,
    },
    explanation: "Els xips són `<div>`, i per tant blocs que s'apilen. En fer flex el seu pare, es posen en fila i només ocupen l'amplada del seu text.",
    checks: [
      { label: 'Els xips estan en fila', selector: '.xip', arrange: 'row' },
      { label: 'Hi ha 8 píxels entre xip i xip', selector: '.xip', gap: 8 },
    ],
  },
  {
    id: 'missatge-al-mig',
    level: 1,
    title: 'Un missatge al mig',
    statement: "Quan una cerca no troba res, es mostra aquest avís. Centra el text dins de la caixa, tant d'esquerra a dreta com de dalt a baix. La caixa ja fa 200 píxels d'alt.",
    expected: 'El text «No hi ha cap ruta amb aquest nom» al bell mig de la caixa grisa.',
    html: `<div class="avis">
  <p>No hi ha cap ruta amb aquest nom.</p>
</div>`,
    css: `${BASE}

.avis {
  height: 200px;
  background: #f0f0f0;
  border-radius: 8px;
}

.avis p {
  margin: 0;
}`,
    hint: 'Són les tres línies de l\'apartat «Centrar del tot», i van a `.avis`.',
    solution: {
      css: `${BASE}

.avis {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 200px;
  background: #f0f0f0;
  border-radius: 8px;
}

.avis p {
  margin: 0;
}`,
    },
    explanation: "`justify-content` centra a l'eix principal (en una fila, l'horitzontal) i `align-items`, al transversal. Es nota perquè la caixa és més gran que el paràgraf.",
    checks: [
      { label: 'El text està centrat d\'esquerra a dreta', selector: '.avis p', centered: 'x' },
      { label: 'El text està centrat de dalt a baix', selector: '.avis p', centered: 'y' },
      { label: 'El paràgraf només ocupa el que necessita', selector: '.avis p', size: { maxHeight: 60 } },
    ],
  },
  {
    id: 'peu-de-pagina',
    level: 2,
    title: 'El peu de pàgina',
    statement: "El peu té el text del copyright i un grup de tres enllaços. El copyright ha d'anar a l'esquerra i els enllaços a la dreta, en fila, separats 16 píxels. Tot centrat verticalment.",
    expected: 'Una franja fosca amb el copyright a l\'esquerra i «Contacte», «Avís legal» i «Xarxes» a la dreta, a la mateixa línia.',
    width: 720,
    html: `<footer class="peu">
  <p>© 2025 Camins</p>

  <div class="enllacos">
    <a href="#">Contacte</a>
    <a href="#">Avís legal</a>
    <a href="#">Xarxes</a>
  </div>
</footer>`,
    css: `body {
  margin: 0;
  font-family: Arial, sans-serif;
}

.peu {
  padding: 16px 24px;
  color: #ffffff;
  background: #23312b;
}

.peu p {
  margin: 0;
  font-size: 20px;
}

.peu a {
  display: block;
  color: #ffffff;
}`,
    hint: [
      'Dibuixa els quadrats: el peu té dos fills, i el segon fill té tres enllaços a dins.',
      'Són dos contenidors flex: `.peu` (una cosa a cada punta) i `.enllacos` (una fila amb `gap`).',
    ],
    solution: {
      css: `body {
  margin: 0;
  font-family: Arial, sans-serif;
}

.peu {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px 24px;
  color: #ffffff;
  background: #23312b;
}

.peu p {
  margin: 0;
  font-size: 20px;
}

.enllacos {
  display: flex;
  gap: 16px;
}

.peu a {
  display: block;
  color: #ffffff;
}`,
    },
    explanation: "El peu col·loca els seus dos fills (el paràgraf i el grup d'enllaços) un a cada punta. El grup d'enllaços, que és un altre quadrat amb fills, els posa en fila pel seu compte.",
    checks: [
      { label: 'El copyright i els enllaços estan a la mateixa fila', selector: '.peu > *', arrange: 'row' },
      { label: 'El copyright toca el marge esquerre', selector: '.peu p', offset: { left: 24 } },
      { label: 'Els enllaços toquen el marge dret', selector: '.enllacos', offset: { right: 24 } },
      { label: 'Els tres enllaços estan en fila, separats 16 píxels', selector: '.enllacos a', arrange: 'row', gap: 16 },
      { label: 'Els enllaços estan centrats verticalment', selector: '.enllacos', centered: 'y' },
    ],
  },
  {
    id: 'targeta-horitzontal',
    level: 2,
    title: 'Una targeta amb la foto al costat',
    statement: "La targeta d'una ruta té una foto i un bloc de text. Posa la foto a l'esquerra i el text a la dreta, separats 16 píxels, amb el text centrat verticalment respecte de la foto.",
    expected: 'La foto a l\'esquerra i, al seu costat, el títol i la distància, a mitja alçada de la foto.',
    html: `<article class="ruta">
  <img src="imatges/ruta-2.jpg" alt="Un camí entre muntanyes">

  <div class="text">
    <h3>Vall de Núria</h3>
    <p>12 km · 3 h 30 min</p>
  </div>
</article>`,
    css: `${BASE}

.ruta {
  padding: 12px;
  border: 1px solid #c9d6cf;
  border-radius: 8px;
}

.ruta img {
  width: 160px;
  border-radius: 6px;
}

.text h3,
.text p {
  margin: 0 0 4px;
}`,
    hint: 'La targeta té dos fills: la imatge i el `<div class="text">`. Tot el que necessites s\'escriu a `.ruta`.',
    solution: {
      css: `${BASE}

.ruta {
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 12px;
  border: 1px solid #c9d6cf;
  border-radius: 8px;
}

.ruta img {
  width: 160px;
  border-radius: 6px;
}

.text h3,
.text p {
  margin: 0 0 4px;
}`,
    },
    explanation: "Per a la targeta, el títol i el paràgraf són una sola cosa: el quadrat `.text`. Per això es mouen junts. Aquest patró, una imatge i un bloc de text al costat, surt contínuament: comentaris, llistes de vídeos, resultats de cerca.",
    checks: [
      { label: 'La foto queda a l\'esquerra del text', selector: '.ruta img', leftOf: '.text' },
      { label: 'Estan a la mateixa fila', selector: '.ruta > *', arrange: 'row' },
      { label: 'Hi ha 16 píxels entre la foto i el text', selector: '.ruta > *', gap: 16 },
      { label: 'El text està centrat a l\'alçada de la foto', selector: '.text', centered: 'y' },
    ],
  },
  {
    id: 'barra-de-navegacio',
    level: 3,
    title: 'La barra de navegació del mòbil',
    statement: [
      "Les aplicacions de mòbil acostumen a tenir una barra a baix amb quatre opcions. Cada opció té una icona i, a sota, el seu nom.",
      "Reparteix les quatre opcions per tota l'amplada, deixant a les vores la meitat de l'espai que hi ha entre elles. Dins de cada opció, la icona ha d'anar a sobre del text, tots dos centrats i separats 4 píxels.",
    ],
    expected: 'Quatre opcions repartides per tota la barra. A cada una, la icona a dalt i el nom a sota, centrats.',
    html: `<nav class="barra">
  <a class="opcio" href="#">
    <span class="icona">▲</span>
    <span>Rutes</span>
  </a>
  <a class="opcio" href="#">
    <span class="icona">◎</span>
    <span>Mapa</span>
  </a>
  <a class="opcio" href="#">
    <span class="icona">♥</span>
    <span>Desades</span>
  </a>
  <a class="opcio" href="#">
    <span class="icona">☺</span>
    <span>Perfil</span>
  </a>
</nav>`,
    css: `body {
  margin: 0;
  font-family: Arial, sans-serif;
}

.barra {
  padding: 8px 0;
  background: #1f6f54;
}

.opcio {
  font-size: 13px;
  color: #ffffff;
  text-decoration: none;
}

.icona {
  font-size: 22px;
}`,
    hint: [
      'Hi ha dos nivells de quadrats: la barra, amb quatre opcions en fila, i cada opció, amb dues coses en columna.',
      'La barra reparteix amb un dels valors `space-`. Cada `.opcio` és un contenidor flex amb `flex-direction: column`.',
    ],
    solution: {
      css: `body {
  margin: 0;
  font-family: Arial, sans-serif;
}

.barra {
  display: flex;
  justify-content: space-around;
  padding: 8px 0;
  background: #1f6f54;
}

.opcio {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
  font-size: 13px;
  color: #ffffff;
  text-decoration: none;
}

.icona {
  font-size: 22px;
}`,
    },
    explanation: [
      "És una fila de columnes. La barra és un contenidor flex en fila que reparteix les opcions amb `space-around`. Cada opció és, alhora, filla de la barra i contenidor flex dels seus dos `<span>`, que col·loca en columna.",
      "Un mateix element pot fer els dos papers: és així com, amb files i columnes ficades les unes dins de les altres, es pot muntar qualsevol disseny.",
    ],
    checks: [
      { label: 'Les quatre opcions estan en fila', selector: '.opcio', arrange: 'row' },
      { label: 'Es reparteixen amb space-around', selector: '.barra', style: { 'justify-content': 'space-around' } },
      { label: 'A cada opció, la icona va a sobre del nom', selector: '.opcio:first-child > span', arrange: 'column' },
      { label: 'La icona està centrada dins de l\'opció', selector: '.icona', all: true, centered: 'x' },
      { label: 'Hi ha 4 píxels entre la icona i el nom', selector: '.opcio:first-child > span', gap: 4 },
    ],
  },
];
