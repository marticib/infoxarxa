// Exercicis extra del tema 8: Flexbox a fons (repartir l'espai i niuar).
// Només fan servir el que s'ha explicat fins a la unitat 8.

const BASE = `body {
  font-family: Arial, sans-serif;
}`;

const PAGINA = `* {
  box-sizing: border-box;
}

body {
  margin: 0;
  font-family: Arial, sans-serif;
}`;

const TEXT_LLARG =
  "Una de les rutes més boniques del Pirineu. Surt del poble de Queralbs, segueix el camí vell entre boscos i salts d'aigua i arriba al santuari en unes tres hores. A l'hivern hi pot haver neu i gel a partir de mig camí, i convé informar-se'n abans de sortir.";

export default [
  {
    id: 'tres-parts-iguals',
    level: 1,
    title: 'Tres parts iguals',
    statement: "El resum d'una ruta té tres dades. Estan en fila, però cada una fa l'amplada del seu text i sobra espai a la dreta. Fes que les tres facin la mateixa amplada i que, juntes, omplin tota la fila.",
    expected: 'Tres caixes verdes de la mateixa amplada, d\'una punta a l\'altra de la fila.',
    html: `<div class="resum">
  <div class="dada">12 km</div>
  <div class="dada">3 h 30 min</div>
  <div class="dada">640 m de pujada</div>
</div>`,
    css: `${BASE}

.resum {
  display: flex;
  gap: 12px;
}

.dada {
  padding: 12px 8px;
  color: #ffffff;
  text-align: center;
  background: #1f6f54;
  border-radius: 8px;
}`,
    hint: 'La propietat que busques s\'escriu als fills, a la regla `.dada`. És la que diu «queda\'t l\'espai que sobri».',
    solution: {
      css: `${BASE}

.resum {
  display: flex;
  gap: 12px;
}

.dada {
  flex: 1;
  padding: 12px 8px;
  color: #ffffff;
  text-align: center;
  background: #1f6f54;
  border-radius: 8px;
}`,
    },
    explanation: "Quan tots els germans tenen `flex: 1`, es reparteixen l'amplada de la fila a parts iguals, encara que els seus textos siguin de llargades diferents.",
    checks: [
      { label: 'Les tres dades fan la mateixa amplada', selector: '.dada', sameSize: 'width' },
      { label: "L'última arriba fins al final de la fila", selector: '.dada:last-child', offset: { right: 0 } },
      { label: 'Continuen separades 12 píxels', selector: '.dada', gap: { x: 12 } },
    ],
  },
  {
    id: 'foto-de-mida-fixa',
    level: 1,
    title: 'Una foto que no es fa petita',
    statement: "La foto d'aquesta ruta hauria de fer 120 píxels d'ample, però el text del costat és tan llarg que la fa més petita. Fes que la foto faci sempre 120 píxels.",
    expected: 'La foto, de 120 píxels, a l\'esquerra, i el text al costat, partit en les línies que calgui.',
    html: `<article class="ruta">
  <div class="foto">
    <img src="imatges/ruta-2.jpg" alt="El camí vell de Núria">
  </div>

  <p>${TEXT_LLARG}</p>
</article>`,
    css: `${BASE}

.ruta {
  display: flex;
  gap: 16px;
}

.foto {
  width: 120px;
}

.foto img {
  display: block;
  width: 100%;
  border-radius: 8px;
}

.ruta p {
  margin: 0;
  line-height: 1.5;
}`,
    hint: 'L\'amplada ja és correcta. Falta dir que aquesta peça no s\'ha d\'encongir: és una propietat de fill, i va a `.foto`.',
    solution: {
      css: `${BASE}

.ruta {
  display: flex;
  gap: 16px;
}

.foto {
  flex: none;
  width: 120px;
}

.foto img {
  display: block;
  width: 100%;
  border-radius: 8px;
}

.ruta p {
  margin: 0;
  line-height: 1.5;
}`,
    },
    explanation: "El paràgraf voldria ocupar una sola línia molt llarga. Com que no hi cap, el navegador encongeix els dos fills. `flex: none` treu la foto del repartiment: és el text qui s'adapta.",
    checks: [
      { label: "La foto fa 120 píxels d'ample", selector: '.foto', size: { width: 120 } },
      { label: 'La foto queda a l\'esquerra del text', selector: '.foto', leftOf: '.ruta p' },
    ],
  },
  {
    id: 'opinio-amb-nota',
    level: 2,
    title: 'Una opinió amb la nota a la cantonada',
    statement: "L'opinió té tres peces en fila, centrades verticalment: l'avatar, el text i la nota. Fes dues coses: que el text es quedi tot l'espai que sobra, de manera que la nota arribi al marge dret, i que la nota quedi a dalt de la targeta en lloc de centrada. L'avatar ha de continuar centrat.",
    expected: 'L\'avatar a l\'esquerra, centrat. El nom i el text al mig. I la nota «4,5» a la cantonada de dalt a la dreta.',
    html: `<article class="opinio">
  <img class="avatar" src="imatges/avatar-3.png" alt="">

  <div class="text">
    <strong>Marc R.</strong>
    <p>El tram final té molta pedra solta. Porteu bastons i calçat de muntanya.</p>
  </div>

  <span class="nota">4,5</span>
</article>`,
    css: `${BASE}

.opinio {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px;
  border: 1px solid #c9d6cf;
  border-radius: 8px;
}

.avatar {
  width: 48px;
  height: 48px;
  border-radius: 50%;
}

.text p {
  margin: 4px 0 0;
  line-height: 1.5;
}

.nota {
  padding: 4px 8px;
  font-weight: bold;
  color: #ffffff;
  background: #1f6f54;
  border-radius: 6px;
}`,
    hint: [
      'Són dues propietats de fill, cada una en un fill diferent.',
      'El text es queda el que sobra: `flex: 1`. La nota fa una excepció a l\'`align-items` del pare: `align-self`.',
    ],
    solution: {
      css: `${BASE}

.opinio {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px;
  border: 1px solid #c9d6cf;
  border-radius: 8px;
}

.avatar {
  width: 48px;
  height: 48px;
  border-radius: 50%;
}

.text {
  flex: 1;
}

.text p {
  margin: 4px 0 0;
  line-height: 1.5;
}

.nota {
  align-self: flex-start;
  padding: 4px 8px;
  font-weight: bold;
  color: #ffffff;
  background: #1f6f54;
  border-radius: 6px;
}`,
    },
    explanation: "El text, amb `flex: 1`, s'estira i empeny la nota fins al marge dret. La nota, amb `align-self: flex-start`, deixa de fer cas de l'`align-items: center` del pare i puja a dalt. L'avatar no ha canviat: continua obeint el pare.",
    checks: [
      { label: 'La nota toca el marge dret de la targeta', selector: '.nota', offset: { right: 12 } },
      { label: 'La nota queda a dalt de la targeta', selector: '.nota', offset: { top: 12 } },
      { label: 'El text arriba fins a 12 píxels de la nota', selector: '.opinio .text, .opinio .nota', gap: { x: 12 } },
      { label: "L'avatar continua centrat verticalment", selector: '.avatar', centered: 'y' },
    ],
  },
  {
    id: 'cercador-de-dins',
    level: 2,
    title: 'Un cercador que creix per dins i per fora',
    statement: [
      "La capçalera té el logo, un formulari de cerca i l'enllaç «Entra». Fes que el formulari es quedi tot l'espai entre el logo i l'enllaç.",
      "Dins del formulari, el camp de text i el botó han d'anar en fila, separats 8 píxels, i el camp s'ha d'estirar fins que el botó toqui el final del formulari.",
    ],
    expected: 'El logo a l\'esquerra, «Entra» a la dreta de tot i, al mig, un camp de text llarg amb el botó «Cerca» al final.',
    width: 760,
    html: `<header class="capcalera">
  <a class="logo" href="index.html">▲ Camins</a>

  <form class="cercador">
    <input type="search" placeholder="Cerca una ruta">
    <button type="submit">Cerca</button>
  </form>

  <a class="entra" href="#">Entra</a>
</header>`,
    css: `body {
  margin: 0;
  font-family: Arial, sans-serif;
}

.capcalera {
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 12px 24px;
  background: #1f6f54;
}

.capcalera a {
  color: #ffffff;
  text-decoration: none;
}

.logo {
  font-size: 22px;
  font-weight: bold;
}

.cercador input {
  padding: 8px 12px;
  font-size: 16px;
  border: 0;
  border-radius: 6px;
}

.cercador button {
  padding: 8px 12px;
  font-size: 16px;
  color: #ffffff;
  background: #23312b;
  border: 0;
  border-radius: 6px;
}`,
    hint: [
      'El formulari és fill de la capçalera i, alhora, pare del camp i del botó. Necessita una propietat de cada mena.',
      '`.cercador` porta `flex: 1` (per créixer dins de la capçalera) i `display: flex` amb `gap` (per col·locar els seus fills). I el camp, un altre `flex: 1`.',
    ],
    solution: {
      css: `body {
  margin: 0;
  font-family: Arial, sans-serif;
}

.capcalera {
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 12px 24px;
  background: #1f6f54;
}

.capcalera a {
  color: #ffffff;
  text-decoration: none;
}

.logo {
  font-size: 22px;
  font-weight: bold;
}

.cercador {
  display: flex;
  flex: 1;
  gap: 8px;
}

.cercador input {
  flex: 1;
  padding: 8px 12px;
  font-size: 16px;
  border: 0;
  border-radius: 6px;
}

.cercador button {
  padding: 8px 12px;
  font-size: 16px;
  color: #ffffff;
  background: #23312b;
  border: 0;
  border-radius: 6px;
}`,
    },
    explanation: "Hi ha dos `flex: 1`, un a cada nivell. El del formulari el fa créixer dins de la capçalera. El del camp el fa créixer dins del formulari. Cada un es queda l'espai que sobra del seu propi pare.",
    checks: [
      { label: '«Entra» toca el marge dret de la capçalera', selector: '.entra', offset: { right: 24 } },
      { label: 'El formulari ocupa tot l\'espai entre el logo i «Entra»', selector: '.capcalera > *', gap: { x: 16 } },
      { label: 'El camp i el botó estan en fila, separats 8 píxels', selector: '.cercador > *', arrange: 'row', gap: { x: 8 } },
      { label: 'El botó «Cerca» toca el final del formulari', selector: '.cercador button', offset: { right: 0 } },
    ],
  },
  {
    id: 'pagina-amb-panell',
    level: 3,
    title: 'Un panell, una llista i dues targetes',
    statement: [
      "Aquesta és la pàgina de rutes sense maquetar. Obre l'«Objectiu» amb els quadrats activats, fes-te'n el dibuix i escriu el CSS que falta. Tot es fa amb Flexbox.",
      "El panell de filtres va a l'esquerra, amb 180 píxels d'ample, i el contingut es queda la resta, a 24 píxels. Dins del panell, el títol i els enllaços van en columna, separats 8 píxels. Les dues rutes van l'una sota l'altra, separades 16 píxels. I cada ruta és una fila: la foto, de 140 píxels, el text i el botó «Veure», que ha de tocar el marge dret de la targeta.",
    ],
    expected: 'A l\'esquerra, el panell verd clar amb quatre enllaços en columna. A la dreta, dues targetes: a cada una, la foto, el nom de la ruta i, al final, el botó.',
    width: 900,
    boxes: true,
    html: `<div class="cos">
  <aside class="filtres">
    <h2>Dificultat</h2>
    <a href="#">Totes</a>
    <a href="#">Fàcil</a>
    <a href="#">Mitjana</a>
    <a href="#">Difícil</a>
  </aside>

  <main class="contingut">
    <article class="ruta">
      <div class="foto">
        <img src="imatges/ruta-1.jpg" alt="Un camí arran de mar">
      </div>
      <div class="text">
        <h3>Camí de Ronda</h3>
        <p>12 km · 3 h 30 min · Fàcil</p>
      </div>
      <a class="boto" href="ruta.html">Veure</a>
    </article>

    <article class="ruta">
      <div class="foto">
        <img src="imatges/ruta-2.jpg" alt="El camí vell de Núria">
      </div>
      <div class="text">
        <h3>Vall de Núria</h3>
        <p>9 km · 3 h · Mitjana</p>
      </div>
      <a class="boto" href="ruta.html">Veure</a>
    </article>
  </main>
</div>`,
    css: `${PAGINA}

.cos {
  padding: 24px;
}

.filtres {
  width: 180px;
  padding: 16px;
  background: #e8f3ee;
  border-radius: 8px;
}

.filtres h2 {
  margin: 0;
  font-size: 16px;
}

.filtres a {
  color: #1f6f54;
}

.ruta {
  padding: 12px;
  border: 1px solid #c9d6cf;
  border-radius: 8px;
}

.foto {
  width: 140px;
}

.foto img {
  display: block;
  width: 100%;
  border-radius: 6px;
}

.text h3,
.text p {
  margin: 0 0 4px;
}

.boto {
  padding: 8px 16px;
  color: #ffffff;
  text-decoration: none;
  background: #1f6f54;
  border-radius: 20px;
}`,
    hint: [
      'Hi ha quatre quadrats amb fills per col·locar: `.cos` (fila), `.filtres` (columna), `.contingut` (columna) i cada `.ruta` (fila).',
      'A cada fila, decideix qui té mida fixa (`flex: none`) i qui es queda el que sobra (`flex: 1`). El botó arriba al marge dret perquè el text, al seu costat, s\'ha estirat.',
    ],
    solution: {
      css: `${PAGINA}

.cos {
  display: flex;
  gap: 24px;
  padding: 24px;
}

.filtres {
  display: flex;
  flex: none;
  flex-direction: column;
  gap: 8px;
  width: 180px;
  padding: 16px;
  background: #e8f3ee;
  border-radius: 8px;
}

.filtres h2 {
  margin: 0;
  font-size: 16px;
}

.filtres a {
  color: #1f6f54;
}

.contingut {
  display: flex;
  flex: 1;
  flex-direction: column;
  gap: 16px;
}

.ruta {
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 12px;
  border: 1px solid #c9d6cf;
  border-radius: 8px;
}

.foto {
  flex: none;
  width: 140px;
}

.foto img {
  display: block;
  width: 100%;
  border-radius: 6px;
}

.text {
  flex: 1;
}

.text h3,
.text p {
  margin: 0 0 4px;
}

.boto {
  padding: 8px 16px;
  color: #ffffff;
  text-decoration: none;
  background: #1f6f54;
  border-radius: 20px;
}`,
    },
    explanation: [
      "Són quatre contenidors flex, un per a cada quadrat amb fills: la pàgina (una fila), el panell (una columna), el contingut (una columna) i cada targeta (una fila).",
      "I a cada fila es repeteix la mateixa parella: una peça de mida fixa (`flex: none`) i una altra que es queda la resta (`flex: 1`). El panell i el contingut; la foto i el text. És el mateix dibuix a dues escales.",
    ],
    checks: [
      { label: 'El panell queda a l\'esquerra del contingut', selector: '.cos > *', arrange: 'row' },
      { label: "El panell fa 180 píxels d'ample", selector: '.filtres', size: { width: 180 } },
      { label: 'El contingut comença a 24 píxels del panell i arriba al marge dret', selector: '.contingut', rightOf: '.filtres', offset: { right: 24 } },
      { label: 'Hi ha 24 píxels entre el panell i el contingut', selector: '.cos > *', gap: { x: 24 } },
      { label: 'El títol i els filtres estan en columna, separats 8 píxels', selector: '.filtres > *', arrange: 'column', gap: 8 },
      { label: 'Les dues rutes estan separades 16 píxels', selector: '.ruta', arrange: 'column', gap: 16 },
      { label: 'A cada ruta, la foto, el text i el botó estan en fila', selector: '.ruta:first-child > *', arrange: 'row' },
      { label: "Les fotos fan 140 píxels d'ample", selector: '.foto', all: true, size: { width: 140 } },
      { label: 'El botó de cada ruta toca el marge dret de la targeta', selector: '.boto', all: true, offset: { right: 12 } },
    ],
  },
];
