// Exercicis extra del tema 10: position (relative, absolute i fixed).
// Només fan servir el que s'ha explicat fins a la unitat 10.

const BASE = `body {
  font-family: Arial, sans-serif;
}`;

const CAPCALERA_HTML = `<header class="capcalera">
  <a class="logo" href="index.html">▲ Camins</a>

  <nav class="menu">
    <a href="index.html">Rutes</a>
    <a href="mapa.html">Mapa</a>
    <a href="consells.html">Consells</a>
  </nav>
</header>`;

export default [
  {
    id: 'un-pas-al-costat',
    level: 1,
    title: 'Un pas al costat',
    statement: "Les tres etapes d'una ruta estan apilades. Mou la caixa «Refugi» 20 píxels cap avall i 30 cap a la dreta, **sense que les altres dues es moguin**: el seu lloc ha de quedar reservat.",
    expected: 'La caixa taronja desplaçada cap avall i cap a la dreta, trepitjant una mica la de sota. «Sortida» i «Cim» continuen on eren.',
    html: `<div class="etapes">
  <div class="etapa">Sortida</div>
  <div class="etapa refugi">Refugi</div>
  <div class="etapa cim">Cim</div>
</div>`,
    css: `${BASE}

.etapa {
  width: 140px;
  height: 40px;
  padding: 0 12px;
  line-height: 40px;
  color: #ffffff;
  background: #1f6f54;
}

.refugi {
  background: #c2410c;
}`,
    hint: 'Si ho fas amb marges, «Cim» també es mourà. Necessites el valor de `position` que desplaça la caixa però li guarda el lloc, i dues vores.',
    solution: {
      css: `${BASE}

.etapa {
  width: 140px;
  height: 40px;
  padding: 0 12px;
  line-height: 40px;
  color: #ffffff;
  background: #1f6f54;
}

.refugi {
  position: relative;
  top: 20px;
  left: 30px;
  background: #c2410c;
}`,
    },
    explanation: "`top: 20px` allunya la caixa 20 píxels de la vora de dalt del lloc on era (baixa) i `left: 30px` l'allunya de l'esquerra. Com que amb `relative` continua al flux, «Cim» no s'assabenta de res.",
    checks: [
      { label: '«Refugi» ha baixat 20 píxels', selector: '.refugi', inside: '.etapes', offset: { top: 60 } },
      { label: '…i s\'ha mogut 30 píxels cap a la dreta', selector: '.refugi', inside: '.etapes', offset: { left: 30 } },
      { label: '«Cim» no s\'ha mogut del seu lloc', selector: '.cim', inside: '.etapes', offset: { top: 80, left: 0 } },
    ],
  },
  {
    id: 'distancia-a-la-cantonada',
    level: 1,
    title: 'Els quilòmetres, sobre la foto',
    statement: "Posa la distància de la ruta **a sobre** de la foto, a la cantonada de baix a l'esquerra, a 8 píxels de cada vora. Aquí no hi ha res preparat: hauràs de tocar dues regles.",
    expected: 'L\'etiqueta fosca «12 km» sobre la foto, a baix a l\'esquerra.',
    html: `<div class="foto">
  <img src="imatges/ruta-1.jpg" alt="Un camí arran de mar">
  <span class="distancia">12 km</span>
</div>`,
    css: `${BASE}

.foto {
  width: 280px;
}

.foto img {
  display: block;
  width: 100%;
  border-radius: 8px;
}

.distancia {
  padding: 4px 10px;
  font-size: 13px;
  font-weight: bold;
  color: #ffffff;
  background: #23312b;
  border-radius: 12px;
}`,
    hint: [
      'L\'etiqueta ha de sortir del flux i col·locar-se amb `left` i `bottom`.',
      'Perquè es col·loqui respecte de la foto i no de la pàgina, el seu contenidor ha de ser una caixa posicionada.',
    ],
    solution: {
      css: `${BASE}

.foto {
  position: relative;
  width: 280px;
}

.foto img {
  display: block;
  width: 100%;
  border-radius: 8px;
}

.distancia {
  position: absolute;
  left: 8px;
  bottom: 8px;
  padding: 4px 10px;
  font-size: 13px;
  font-weight: bold;
  color: #ffffff;
  background: #23312b;
  border-radius: 12px;
}`,
    },
    explanation: "`.foto` porta `relative` per fer de referència, i l'etiqueta, `absolute`. Sense el `relative`, `bottom: 8px` es comptaria des de baix de la pàgina i l'etiqueta desapareixeria de la foto.",
    checks: [
      { label: 'L\'etiqueta és a 8 píxels de la vora esquerra de la foto', selector: '.distancia', inside: '.foto', offset: { left: 8 } },
      { label: '…i a 8 píxels de la vora de baix', selector: '.distancia', inside: '.foto', offset: { bottom: 8 } },
      { label: 'Sota la foto ja no hi queda el lloc de l\'etiqueta', selector: '.foto img', inside: '.foto', offset: { bottom: 0 } },
    ],
  },
  {
    id: 'avis-a-baix',
    level: 2,
    title: 'Un avís que no es perd',
    statement: [
      "Hi ha avís de vent fort, i no volem que ningú el passi per alt. Clava'l a la vora de **baix** de la finestra, d'una banda a l'altra, de manera que es vegi sempre encara que la pàgina es desplaci.",
      "Quan arribis al final de la pàgina, l'avís taparà l'últim consell. Perquè no passi, dona al `<body>` un `padding-bottom` de 60 píxels.",
    ],
    expected: 'Una franja taronja enganxada a baix de la finestra, d\'una vora a l\'altra, quieta mentre els consells es desplacen. En arribar al final, l\'últim consell es veu sencer.',
    viewport: 280,
    html: `<h1>Consells</h1>
<p>Mira la previsió del temps abans de sortir de casa.</p>
<p>Porta aigua de sobres i alguna cosa per menjar.</p>
<p>Digues a algú quina ruta faràs.</p>
<p>No estrenis mai unes botes el dia de la sortida.</p>
<p>Descarrega't el mapa abans de perdre la cobertura.</p>
<p>Comença d'hora i torna amb llum.</p>
<p>Emporta't totes les deixalles.</p>

<p class="avis">Avís de vent fort al Pirineu aquest cap de setmana.</p>`,
    css: `${BASE}

.avis {
  margin: 0;
  padding: 12px 16px;
  color: #ffffff;
  background: #c2410c;
}`,
    hint: [
      'A l\'avís li calen quatre línies: el `position` que pren la finestra com a referència i tres vores. Amb l\'esquerra i la dreta alhora, s\'estira.',
      'El `padding-bottom` va a una regla `body`, que ja existeix al principi del CSS.',
    ],
    solution: {
      css: `body {
  padding-bottom: 60px;
  font-family: Arial, sans-serif;
}

.avis {
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  margin: 0;
  padding: 12px 16px;
  color: #ffffff;
  background: #c2410c;
}`,
    },
    explanation: "És una capçalera fixa del revés: en lloc de `top: 0`, `bottom: 0`; i en lloc d'apartar el contingut per dalt, se li deixa lloc per baix. Fixa't que l'avís toca les vores de la finestra i no fa cas del marge del `<body>`: ja no és al flux.",
    checks: [
      { label: 'L\'avís és fix', selector: '.avis', style: { position: 'fixed' } },
      { label: 'Toca la vora de baix de la finestra', selector: '.avis', at: { bottom: 0 } },
      { label: 'Va d\'una banda a l\'altra de la finestra', selector: '.avis', at: { left: 0, right: 0 } },
      { label: 'El <body> deixa 60 píxels lliures a baix', selector: 'body', style: { 'padding-bottom': '60px' } },
    ],
  },
  {
    id: 'menu-lateral-fix',
    level: 2,
    title: 'Els filtres, sempre a l\'esquerra',
    statement: [
      "La capçalera ja és fixa. Ara fes que el menú de filtres també ho sigui: enganxat a l'esquerra de la finestra, des de **sota de la capçalera** (que fa 56 píxels d'alt) fins a **baix de tot**. Ja fa 180 píxels d'ample.",
      "Després, aparta el contingut perquè no quedi a sota del menú.",
    ],
    expected: 'El menú de filtres, de color verd clar, ocupa tota l\'alçada de la finestra per sota de la capçalera. El títol i les rutes queden a la seva dreta. En baixar, només es mou la llista.',
    width: 800,
    viewport: 320,
    html: `${CAPCALERA_HTML}

<aside class="lateral">
  <a href="#">Totes les rutes</a>
  <a href="#">Fàcils</a>
  <a href="#">Mitjanes</a>
  <a href="#">Difícils</a>
</aside>

<main class="contingut">
  <h1>Rutes</h1>
  <p>Camí de Ronda · 12 km · Fàcil</p>
  <p>Vall de Núria · 9 km · Mitjana</p>
  <p>Pica d'Estats · 18 km · Difícil</p>
  <p>Estany de Sant Maurici · 7 km · Fàcil</p>
  <p>Puigmal · 14 km · Difícil</p>
  <p>Sant Jeroni · 11 km · Mitjana</p>
</main>`,
    css: `* {
  box-sizing: border-box;
}

body {
  margin: 0;
  font-family: Arial, sans-serif;
}

.capcalera {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 56px;
  padding: 0 24px;
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

.menu {
  display: flex;
  gap: 24px;
}

.lateral {
  width: 180px;
  padding: 16px;
  background: #e8f3ee;
}

.lateral a {
  display: block;
  padding: 8px 0;
  color: #23312b;
}

.contingut {
  margin-top: 56px;
  padding: 16px 24px;
}

.contingut p {
  margin: 0;
  padding: 14px 0;
  border-bottom: 1px solid #c9d6cf;
}`,
    hint: [
      'El menú necessita el `position` i tres vores: `top`, `left` i `bottom`. Amb la de dalt i la de baix alhora, s\'estira de dalt a baix.',
      'El contingut ja s\'aparta de la capçalera amb `margin-top`. Li falta apartar-se del menú, pel costat on és el menú i amb la seva mateixa amplada.',
    ],
    solution: {
      css: `* {
  box-sizing: border-box;
}

body {
  margin: 0;
  font-family: Arial, sans-serif;
}

.capcalera {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 56px;
  padding: 0 24px;
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

.menu {
  display: flex;
  gap: 24px;
}

.lateral {
  position: fixed;
  top: 56px;
  left: 0;
  bottom: 0;
  width: 180px;
  padding: 16px;
  background: #e8f3ee;
}

.lateral a {
  display: block;
  padding: 8px 0;
  color: #23312b;
}

.contingut {
  margin-top: 56px;
  margin-left: 180px;
  padding: 16px 24px;
}

.contingut p {
  margin: 0;
  padding: 14px 0;
  border-bottom: 1px solid #c9d6cf;
}`,
    },
    explanation: "El menú no té alçada: té `top: 56px` i `bottom: 0`, i s'estira entre totes dues vores, faci l'alçada que faci la finestra. I com que ha sortit del flux, el contingut necessita un marge per cada caixa fixa: 56 píxels a dalt per la capçalera i 180 a l'esquerra pel menú.",
    checks: [
      { label: 'El menú de filtres és fix', selector: '.lateral', style: { position: 'fixed' } },
      { label: 'Comença just sota la capçalera i toca la vora esquerra', selector: '.lateral', at: { top: 56, left: 0 } },
      { label: 'Arriba fins a baix de tot de la finestra', selector: '.lateral', at: { bottom: 0 } },
      { label: 'Continua fent 180 píxels d\'ample', selector: '.lateral', size: { width: 180 } },
      { label: 'El contingut queda a la dreta del menú', selector: '.contingut h1', rightOf: '.lateral' },
    ],
  },
  {
    id: 'targeta-completa',
    level: 3,
    title: 'Una foto amb tres coses a sobre',
    statement: [
      "Aquesta foto ha de portar tres coses a sobre. Abans d'escriure res, mira l'«Objectiu» amb els «Quadrats» activats i compta quantes caixes trepitgen la foto.",
      "La dificultat, a dalt a l'esquerra, i el botó del cor, a dalt a la dreta: tots dos a 8 píxels de les vores. El peu, enganxat a baix i estirat d'una banda a l'altra.",
      "I dins del peu, el nom de la ruta ha de quedar a l'esquerra i els quilòmetres, a la dreta de tot.",
    ],
    expected: 'La foto amb «Mitjana» a dalt a l\'esquerra, un cor dins d\'un cercle blanc a dalt a la dreta i, a baix, una franja fosca amb «Sant Jeroni» a una punta i «11 km» a l\'altra.',
    boxes: true,
    html: `<div class="foto">
  <img src="imatges/ruta-6.jpg" alt="Agulles de roca">
  <span class="dificultat">Mitjana</span>
  <button class="desa" type="button" aria-label="Desa la ruta">♥</button>

  <div class="peu">
    <strong>Sant Jeroni</strong>
    <span>11 km</span>
  </div>
</div>`,
    css: `${BASE}

.foto {
  width: 300px;
}

.foto img {
  display: block;
  width: 100%;
}

.dificultat {
  padding: 4px 10px;
  font-size: 13px;
  font-weight: bold;
  color: #ffffff;
  background: #1f6f54;
  border-radius: 12px;
}

.desa {
  width: 36px;
  height: 36px;
  font-size: 18px;
  color: #c2410c;
  background: #ffffff;
  border: 0;
  border-radius: 50%;
}

.peu {
  padding: 8px 12px;
  color: #ffffff;
  background: #23312b;
}`,
    hint: [
      'Tres caixes surten del flux (`.dificultat`, `.desa` i `.peu`) i una sola fa de referència per a totes tres.',
      'El peu és, alhora, una caixa posicionada i un contenidor: per posar el nom a una punta i els quilòmetres a l\'altra, torna a la unitat de Flexbox.',
    ],
    solution: {
      css: `${BASE}

.foto {
  position: relative;
  width: 300px;
}

.foto img {
  display: block;
  width: 100%;
}

.dificultat {
  position: absolute;
  top: 8px;
  left: 8px;
  padding: 4px 10px;
  font-size: 13px;
  font-weight: bold;
  color: #ffffff;
  background: #1f6f54;
  border-radius: 12px;
}

.desa {
  position: absolute;
  top: 8px;
  right: 8px;
  width: 36px;
  height: 36px;
  font-size: 18px;
  color: #c2410c;
  background: #ffffff;
  border: 0;
  border-radius: 50%;
}

.peu {
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  justify-content: space-between;
  padding: 8px 12px;
  color: #ffffff;
  background: #23312b;
}`,
    },
    explanation: [
      "Un sol `position: relative`, a `.foto`, fa de referència per a les tres caixes `absolute`. Cada una tria les vores des d'on es compta: dalt i esquerra, dalt i dreta, i les tres del peu, que per això s'estira.",
      "El peu fa dos papers alhora. Cap enfora és una caixa col·locada a sobre de la foto; cap endins és un contenidor flex que reparteix els seus dos fills amb `space-between`. `position` diu on va la caixa, i `flex`, com s'ordena el que té a dins.",
    ],
    checks: [
      { label: 'La dificultat és a 8 píxels de dalt i de l\'esquerra de la foto', selector: '.dificultat', inside: '.foto', offset: { top: 8, left: 8 } },
      { label: 'El cor és a 8 píxels de dalt i de la dreta de la foto', selector: '.desa', inside: '.foto', offset: { top: 8, right: 8 } },
      { label: 'El peu toca la vora de baix i va d\'una banda a l\'altra', selector: '.peu', inside: '.foto', offset: { left: 0, right: 0, bottom: 0 } },
      { label: 'Res no ocupa lloc sota la foto', selector: '.foto img', inside: '.foto', offset: { bottom: 0 } },
      { label: 'El nom de la ruta i els quilòmetres estan a la mateixa fila', selector: '.peu > *', arrange: 'row' },
      { label: 'Els quilòmetres toquen el marge dret del peu', selector: '.peu span', inside: '.peu', offset: { right: 12 } },
    ],
  },
];
