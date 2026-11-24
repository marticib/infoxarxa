import { p, list, code, example, concept, warning, project, table, compare, custom } from '../../blocks.js';

const CSS_BOTONS = `button {
  padding: 8px 14px;
}`;

const CSS_CAMPS = `label {
  display: block;
  margin-bottom: 4px;
  font-weight: 600;
}

input[type="text"] {
  width: 100%;
  max-width: 320px;
  padding: 8px;
  border: 1px solid #8a94a8;
  border-radius: 6px;
}

button {
  margin-top: 8px;
  padding: 8px 14px;
}`;

const CSS_LLISTA = `ul {
  padding: 0;
  list-style: none;
}

li {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px 0;
  border-bottom: 1px solid #dfe3ee;
}

li span,
li label {
  flex: 1;
}

.completada label {
  color: #5d6780;
  text-decoration: line-through;
}

button {
  padding: 6px 10px;
}`;

const TASQUES_INICIALS = `{ id: 1, text: "Estudiar JavaScript", completada: true },
  { id: 2, text: "Fer la compra", completada: false },
  { id: 3, text: "Enviar el treball", completada: false }`;

export default {
  id: 'esdeveniments',
  number: 8,
  title: 'Esdeveniments',
  shortTitle: 'Esdeveniments',
  description:
    "Com fer que la pàgina respongui al que fa la persona: clics, tecles, canvis en un camp i enviaments de formulari.",

  problem: {
    title: "La pàgina ja mostra les tasques, però només es poden mirar",
    text: [
      "Hem aconseguit que les tasques apareguin a la pàgina. Però la persona que la fa servir no hi pot fer res: no pot marcar una tasca com a feta ni eliminar-la. Tots els canvis els hem de fer nosaltres, tocant el codi.",
      "Ens falta l'última peça d'una aplicació interactiva: que el programa s'assabenti del que fa la persona i hi reaccioni. A la unitat 1 en vam fer un tast amb un botó que saludava, i a la unitat anterior l'hem tornat a fer servir sense explicar-lo. Ara toca entendre'l de veritat.",
    ],
  },

  goals: [
    "Explicar la relació entre una acció, un esdeveniment i una funció.",
    "Connectar una funció a un esdeveniment amb `addEventListener`.",
    "Fer servir els esdeveniments `click`, `input`, `change`, `keydown` i `submit`.",
    "Llegir informació de l'objecte `event` i aturar el comportament per defecte amb `preventDefault()`.",
    "Afegir esdeveniments a elements creats des de JavaScript.",
  ],

  projectPiece:
    "El gestor es torna interactiu: cada tasca porta una casella per completar-la i un botó per eliminar-la, i tots dos funcionen.",

  finalProject:
    "El menú, els filtres i els botons de «m'agrada» i de subscripció reaccionaran als clics, i el cercador, a cada tecla.",

  sections: [
    {
      id: 'que-es-un-esdeveniment',
      title: 'Què és un esdeveniment',
      blocks: [
        p("Fins ara, el nostre codi s'executava de dalt a baix quan es carregava la pàgina, i s'acabava. Però una aplicació passa la major part del temps *esperant*: esperant que algú premi un botó, escrigui en un camp o enviï un formulari."),
        p("Cada vegada que passa alguna cosa d'aquestes, el navegador genera un **esdeveniment** (en anglès, *event*): un avís que diu «ha passat això, en aquest element». Si nosaltres hem deixat una funció «escoltant» aquell avís, el navegador l'executa."),
        custom('EventInspector'),
        concept(
          'Acció, esdeveniment, funció',
          "La persona fa una **acció**. El navegador la converteix en un **esdeveniment**. Si hi ha una **funció** escoltant aquell esdeveniment en aquell element, s'executa. Tota la interactivitat d'una pàgina és aquesta cadena, repetida."
        ),
        table(
          ['Esdeveniment', 'Quan es produeix', 'Elements habituals'],
          [
            ['`click`', 'Es prem un element (amb el ratolí, el dit o el teclat)', 'Botons'],
            ['`input`', "Canvia el contingut d'un camp, a cada caràcter", 'Camps de text'],
            ['`change`', "Es confirma un canvi de valor", 'Caselles, desplegables'],
            ['`keydown`', 'Es prem una tecla', 'Camps de text, el document'],
            ['`submit`', "S'envia un formulari", 'Formularis'],
          ],
          'Els esdeveniments que farem servir'
        ),
      ],
    },

    {
      id: 'addeventlistener',
      title: 'addEventListener: escoltar un esdeveniment',
      blocks: [
        p("Per connectar una funció amb un esdeveniment fem servir el mètode `addEventListener`, que tenen tots els elements. Necessita dues coses: el **nom de l'esdeveniment**, entre cometes, i la **funció** que s'ha d'executar."),
        code(`element.addEventListener("click", funcio);`),
        example({
          title: 'Un botó que incrementa un comptador',
          intro: "Cada clic suma 1 a una variable i actualitza el número de la pàgina.",
          html: `<p>Has fet <strong id="comptador">0</strong> clics</p>
<button id="sumar">Suma 1</button>`,
          css: CSS_BOTONS,
          js: `const botoSumar = document.querySelector("#sumar");
const comptador = document.querySelector("#comptador");

let clics = 0;

function sumarClic() {
  clics++;
  comptador.textContent = clics;
}

botoSumar.addEventListener("click", sumarClic);`,
          expected: "El número augmenta d'un en un a cada clic.",
          why: "L'última línia no executa `sumarClic`: la deixa registrada. Qui la crida és el navegador, cada vegada que es produeix un `click` al botó. Fixa't en el patró: el valor es guarda en una variable (`clics`) i la pàgina es limita a mostrar-lo.",
        }),
        warning(
          'La funció es passa sense parèntesis',
          "`addEventListener(\"click\", sumarClic)` entrega la funció perquè el navegador la cridi més endavant. Amb parèntesis, `sumarClic()`, la funció s'executaria immediatament, en carregar la pàgina, i al botó no hi quedaria res connectat."
        ),
        p("Quan la funció és curta i només es fa servir en aquell lloc, és habitual escriure-la directament com a arrow function. Les dues formes són equivalents:"),
        compare(
          {
            title: 'Amb una funció amb nom',
            code: `function sumarClic() {
  clics++;
  comptador.textContent = clics;
}

botoSumar.addEventListener("click", sumarClic);`,
            text: "Útil quan la funció és llarga o es reutilitza en més d'un lloc.",
          },
          {
            title: 'Amb una arrow function',
            code: `botoSumar.addEventListener("click", () => {
  clics++;
  comptador.textContent = clics;
});`,
            text: "Tot queda junt: l'element, l'esdeveniment i el que passa. És la forma que veuràs més sovint.",
          }
        ),
        p("En tots dos casos, la funció que passem és un **callback**, igual que la que passàvem a `forEach`: una funció que no cridem nosaltres, sinó que entreguem a algú altre perquè la cridi quan toqui."),
      ],
    },

    {
      id: 'click',
      title: 'click: obrir i tancar un menú',
      blocks: [
        p("L'esdeveniment `click` és el més habitual. I, malgrat el nom, no és exclusiu del ratolí: també es produeix quan es toca l'element en una pantalla tàctil o quan es prem Retorn o Espai amb el focus en un botó."),
        example({
          title: 'Mostrar o ocultar un menú',
          intro: "El botó alterna la visibilitat de la llista i, a més, informa del seu estat.",
          html: `<button id="boto-menu" aria-expanded="false" aria-controls="menu">Menú</button>
<ul id="menu" hidden>
  <li>Totes les tasques</li>
  <li>Pendents</li>
  <li>Completades</li>
</ul>`,
          css: CSS_BOTONS,
          js: `const botoMenu = document.querySelector("#boto-menu");
const menu = document.querySelector("#menu");

botoMenu.addEventListener("click", () => {
  const estaObert = !menu.hidden;

  menu.hidden = estaObert;
  botoMenu.setAttribute("aria-expanded", String(!estaObert));
});`,
          expected: "Cada clic mostra o amaga la llista.",
          why: "Primer mirem en quin estat està el menú i després fem el contrari. L'atribut `aria-expanded` no canvia res del que es veu, però un lector de pantalla el llegeix: gràcies a ell, una persona cega sap si el menú està desplegat o plegat.",
        }),
        concept(
          'Fes servir botons de veritat',
          "Un `<button>` rep el focus amb el tabulador i respon a Retorn i a Espai sense que hagis de fer res. Un `<div>` amb un listener de `click` només funciona amb el ratolí. Si una cosa es pot prémer, ha de ser un `<button>`."
        ),
      ],
    },

    {
      id: 'objecte-event',
      title: "L'objecte event",
      blocks: [
        p("Quan el navegador crida la nostra funció, li passa un argument: un objecte amb tota la informació sobre el que acaba de passar. Si el volem, només hem de declarar un paràmetre per rebre'l. Per costum se'n diu `event`."),
        table(
          ['Propietat', 'Què conté'],
          [
            ['`event.type`', "El nom de l'esdeveniment: `\"click\"`, `\"input\"`…"],
            ['`event.target`', "L'element on s'ha produït"],
            ['`event.key`', 'La tecla premuda (en esdeveniments de teclat)'],
          ],
          "Propietats útils de l'objecte event"
        ),
        example({
          title: 'Una sola funció per a tres botons',
          intro: "Els tres botons comparteixen la mateixa funció. Com sap quin s'ha premut?",
          html: `<button class="color">Vermell</button>
<button class="color">Verd</button>
<button class="color">Blau</button>
<p id="resultat">Tria un color</p>`,
          css: CSS_BOTONS,
          js: `const botons = document.querySelectorAll(".color");
const resultat = document.querySelector("#resultat");

function mostrarTria(event) {
  console.log(event.type);
  console.log(event.target);

  resultat.textContent = \`Has triat: \${event.target.textContent}\`;
}

for (const boto of botons) {
  boto.addEventListener("click", mostrarTria);
}`,
          expected: "En prémer un botó, el paràgraf mostra el seu color. A la consola es veuen `click` i l'element premut.",
          why: "`event.target` és l'element on ha passat l'esdeveniment. Gràcies a ell, una mateixa funció pot servir per a molts elements i comportar-se diferent segons quin l'hagi provocat.",
        }),
      ],
    },

    {
      id: 'input-i-change',
      title: 'input i change: quan canvia un valor',
      blocks: [
        p("Per als camps de formulari hi ha dos esdeveniments que s'assemblen i convé distingir. Tots dos avisen que el valor ha canviat, però en moments diferents."),
        example({
          title: 'Detectar canvis en un input',
          intro: "Escriu el teu nom a poc a poc i mira com la pàgina es va actualitzant.",
          html: `<label for="nom">El teu nom</label>
<input type="text" id="nom" autocomplete="off">
<p id="salutacio">Hola!</p>
<p id="recompte">0 caràcters</p>`,
          css: CSS_CAMPS,
          js: `const campNom = document.querySelector("#nom");
const salutacio = document.querySelector("#salutacio");
const recompte = document.querySelector("#recompte");

campNom.addEventListener("input", (event) => {
  const text = event.target.value;

  salutacio.textContent = \`Hola, \${text}!\`;
  recompte.textContent = \`\${text.length} caràcters\`;
});`,
          expected: "La salutació i el recompte canvien a cada lletra que escrius o esborres.",
          why: "L'esdeveniment `input` es produeix **a cada canvi**. La propietat `value` conté el que hi ha escrit al camp en aquell moment, i sempre és un string. Aquí `event.target` i `campNom` són el mateix element.",
        }),
        example({
          title: 'Caselles i desplegables amb change',
          intro: "Marca la casella i tria una opció del desplegable.",
          html: `<p>
  <input type="checkbox" id="avisos">
  <label for="avisos">Vull rebre avisos</label>
</p>
<p>
  <label for="ordre">Ordena per</label>
  <select id="ordre">
    <option value="data">Data</option>
    <option value="nom">Nom</option>
    <option value="estat">Estat</option>
  </select>
</p>
<p id="estat">Encara no has canviat res.</p>`,
          js: `const casella = document.querySelector("#avisos");
const selector = document.querySelector("#ordre");
const estat = document.querySelector("#estat");

casella.addEventListener("change", () => {
  estat.textContent = \`Avisos activats: \${casella.checked}\`;
});

selector.addEventListener("change", () => {
  estat.textContent = \`Ordenat per: \${selector.value}\`;
});`,
          expected: "El paràgraf mostra `true` o `false` en marcar la casella, i el valor triat en canviar el desplegable.",
          why: "Una casella no té un text que es pugui llegir amb `value`: el que interessa és si està marcada, i això ho diu la propietat `checked`, que és un booleà. En un `<select>`, `value` és el valor de l'opció triada.",
        }),
        table(
          ['Esdeveniment', 'Quan es produeix en un camp de text', 'Quan convé'],
          [
            ['`input`', 'A cada caràcter que s\'escriu o s\'esborra', 'Reaccionar a l\'instant: comptar caràcters, filtrar una llista'],
            ['`change`', 'Quan el camp perd el focus havent canviat', 'Caselles, botons d\'opció i desplegables'],
          ],
          'input o change?'
        ),
      ],
    },

    {
      id: 'keydown',
      title: 'keydown: reaccionar a una tecla',
      blocks: [
        p("L'esdeveniment `keydown` es produeix cada vegada que es prem una tecla. La propietat `event.key` diu quina: `\"a\"`, `\"A\"`, `\"7\"`, o un nom per a les tecles especials, com `\"Enter\"`, `\"Escape\"` o `\"ArrowDown\"`."),
        example({
          title: 'Retorn per buscar, Escape per esborrar',
          intro: "Escriu alguna cosa i prova les dues tecles. La consola mostra el nom de cada tecla que prems.",
          html: `<label for="cerca">Cerca una tasca</label>
<input type="text" id="cerca" autocomplete="off">
<p id="resultat">Retorn per buscar, Escape per esborrar.</p>`,
          css: CSS_CAMPS,
          js: `const campCerca = document.querySelector("#cerca");
const resultat = document.querySelector("#resultat");

campCerca.addEventListener("keydown", (event) => {
  console.log(event.key);

  if (event.key === "Enter") {
    resultat.textContent = \`Buscant «\${campCerca.value}»…\`;
  }

  if (event.key === "Escape") {
    campCerca.value = "";
    resultat.textContent = "Cerca esborrada";
  }
});`,
          expected: "Amb Retorn, el paràgraf mostra el text buscat. Amb Escape, el camp es buida.",
          why: "El listener s'executa a cada tecla, però només fa alguna cosa quan `event.key` és una de les dues que ens interessen. Fixa't que `value` també es pot **assignar**: és la manera de canviar o buidar un camp des del codi.",
        }),
        warning(
          'El teclat no és un extra',
          "Hi ha persones que no poden fer servir el ratolí, i moltes altres que simplement van més de pressa amb el teclat. Tot el que es pugui fer amb un clic s'ha de poder fer també amb tecles. Si fas servir botons, enllaços i camps de formulari de veritat, el navegador ja se n'encarrega gairebé sempre."
        ),
      ],
    },

    {
      id: 'submit-i-preventdefault',
      title: 'submit i preventDefault()',
      blocks: [
        p("Els formularis tenen un comportament heretat dels primers temps de la web: quan s'envien, el navegador recull les dades, les envia a un servidor i **carrega una pàgina nova**. En una aplicació com la nostra, que ho fa tot amb JavaScript i sense servidor, això és un desastre: en recarregar, totes les variables es perden."),
        example({
          title: 'Enviar un formulari… i perdre-ho tot',
          intro: "Escriu una tasca i prem el botó. El codi és correcte, però mira què passa amb la pàgina.",
          html: `<form id="formulari">
  <label for="tasca">Nova tasca</label>
  <input type="text" id="tasca" autocomplete="off">
  <button type="submit">Afegeix</button>
</form>
<p id="missatge"></p>`,
          css: CSS_CAMPS,
          js: `const formulari = document.querySelector("#formulari");
const campTasca = document.querySelector("#tasca");
const missatge = document.querySelector("#missatge");

formulari.addEventListener("submit", () => {
  missatge.textContent = \`Has escrit: \${campTasca.value}\`;
});`,
          expected: "El formulari desapareix i queda un avís de «Pàgina recarregada».",
          why: "El listener s'executa i escriu el missatge, però immediatament després el navegador fa el que fa per defecte amb un formulari: enviar-lo i recarregar. El missatge dura una fracció de segon. (En aquest dossier, la recàrrega es mostra amb un avís en lloc de fer-se de veritat.)",
        }),
        p("La solució és dir-li al navegador que no faci el que faria per defecte. L'objecte `event` té un mètode per a això: `preventDefault()`."),
        example({
          title: 'Enviar un formulari sense recarregar',
          intro: "L'únic canvi és la primera línia del listener. Prova-ho amb el botó i també prement Retorn dins del camp.",
          html: `<form id="formulari">
  <label for="tasca">Nova tasca</label>
  <input type="text" id="tasca" autocomplete="off">
  <button type="submit">Afegeix</button>
</form>
<p id="missatge"></p>`,
          css: CSS_CAMPS,
          js: `const formulari = document.querySelector("#formulari");
const campTasca = document.querySelector("#tasca");
const missatge = document.querySelector("#missatge");

formulari.addEventListener("submit", (event) => {
  event.preventDefault();

  missatge.textContent = \`Has escrit: \${campTasca.value}\`;
});`,
          expected: "El missatge apareix i es queda. La pàgina no es recarrega.",
          why: "`event.preventDefault()` cancel·la l'acció per defecte del navegador per a aquell esdeveniment. La resta del listener s'executa amb normalitat, i el control de què passa amb les dades queda a les nostres mans.",
        }),
        concept(
          "Escolta el submit del formulari, no el click del botó",
          "Un formulari es pot enviar prement el botó o prement Retorn dins d'un camp. L'esdeveniment `submit` del `<form>` cobreix tots dos casos; el `click` del botó, només un. Per això el listener va al formulari."
        ),
      ],
    },

    {
      id: 'per-que-no-onclick',
      title: "Per què no fem servir onclick a l'HTML",
      blocks: [
        p("Hi ha una altra manera de connectar un esdeveniment, que trobaràs en molts tutorials: escriure'l directament a l'HTML com un atribut."),
        compare(
          {
            title: "Amb l'atribut onclick",
            tone: 'bad',
            lang: 'html',
            code: `<button onclick="saludar()">Saluda</button>`,
            text: "Funciona, però posa JavaScript dins de l'HTML.",
          },
          {
            title: 'Amb addEventListener',
            tone: 'good',
            code: `const boto = document.querySelector("#saluda");

boto.addEventListener("click", saludar);`,
            text: "L'HTML només descriu la pàgina. Tot el comportament és al fitxer JavaScript.",
          }
        ),
        p("No és que `onclick` estigui prohibit, però `addEventListener` és millor com a opció principal, per quatre motius:"),
        list(
          "**Separa les capes.** L'HTML es queda amb el contingut i el JavaScript amb el comportament, com vam dir a la unitat 1.",
          "**Tot el comportament és en un sol lloc.** Per saber què fa un botó no has d'anar saltant entre dos fitxers.",
          "**Permet diversos listeners** per al mateix esdeveniment en el mateix element. Amb l'atribut només n'hi pot haver un.",
          "**Serveix per a elements creats amb JavaScript**, que no tenen cap HTML on escriure l'atribut."
        ),
      ],
    },

    {
      id: 'elements-creats',
      title: 'Esdeveniments en elements creats amb JavaScript',
      blocks: [
        p("Les tasques del gestor no són a l'HTML: les crea la funció `renderitzar`. Com els posem esdeveniments? De la manera més directa: **en el moment de crear cada element**, li afegim el seu listener."),
        example({
          title: 'Marcar una tasca com a completada',
          intro: "Cada tasca té la seva casella. En marcar-la, canvia la dada i es torna a pintar la llista.",
          html: `<h1>Les meves tasques</h1>
<ul id="llista"></ul>`,
          css: CSS_LLISTA,
          js: `const tasques = [
  ${TASQUES_INICIALS}
];

const llista = document.querySelector("#llista");

function renderitzar() {
  llista.innerHTML = "";

  for (const tasca of tasques) {
    const element = document.createElement("li");
    if (tasca.completada) {
      element.classList.add("completada");
    }

    const casella = document.createElement("input");
    casella.type = "checkbox";
    casella.id = \`tasca-\${tasca.id}\`;
    casella.checked = tasca.completada;

    const etiqueta = document.createElement("label");
    etiqueta.setAttribute("for", casella.id);
    etiqueta.textContent = tasca.text;

    casella.addEventListener("change", () => {
      tasca.completada = casella.checked;
      renderitzar();
    });

    element.append(casella, etiqueta);
    llista.append(element);
  }
}

renderitzar();`,
          expected: "Tres tasques amb casella. En marcar-ne o desmarcar-ne una, el text es ratlla o es desratlla.",
          why: "A cada volta del bucle es crea una funció nova que «recorda» la `tasca` i la `casella` d'aquella volta. Per això, quan es marca la segona casella, el listener sap exactament quina tasca ha de canviar. L'etiqueta està enllaçada amb la casella (`for` i `id`), de manera que també es pot fer clic al text.",
        }),
        example({
          title: 'Eliminar una tasca',
          intro: "Ara cada tasca té un botó. El listener elimina la tasca de l'array i torna a pintar.",
          html: `<h1>Les meves tasques</h1>
<ul id="llista"></ul>`,
          css: CSS_LLISTA,
          js: `let tasques = [
  ${TASQUES_INICIALS}
];

const llista = document.querySelector("#llista");

function eliminarTasca(id) {
  const restants = [];
  for (const tasca of tasques) {
    if (tasca.id !== id) {
      restants.push(tasca);
    }
  }
  tasques = restants;
}

function renderitzar() {
  llista.innerHTML = "";

  for (const tasca of tasques) {
    const element = document.createElement("li");

    const text = document.createElement("span");
    text.textContent = tasca.text;

    const boto = document.createElement("button");
    boto.type = "button";
    boto.textContent = "Elimina";
    boto.setAttribute("aria-label", \`Elimina la tasca: \${tasca.text}\`);
    boto.addEventListener("click", () => {
      eliminarTasca(tasca.id);
      renderitzar();
    });

    element.append(text, boto);
    llista.append(element);
  }
}

renderitzar();`,
          expected: "Tres tasques amb un botó «Elimina». En prémer-lo, la tasca desapareix.",
          why: "El listener no toca la pàgina: crida `eliminarTasca`, que modifica l'array, i després `renderitzar`, que ho torna a pintar tot. L'atribut `aria-label` dona a cada botó un nom diferent per als lectors de pantalla; sense ell, hi hauria tres botons que es dirien tots «Elimina».",
        }),
        concept(
          'El cicle de tota aplicació interactiva',
          "**Esdeveniment → canviar les dades → tornar a pintar.** El listener mai modifica la pàgina directament: actualitza l'array i crida `renderitzar`. Aquest cicle és el mateix en un gestor de tasques de cent línies i en les aplicacions web més grans."
        ),
        project(
          "Amb aquests dos exemples, el gestor ja té dues de les seves funcionalitats definitives: completar i eliminar. Fixa't que les funcions de dades (`eliminarTasca`) són les mateixes de la unitat 6, sense canvis. Ens falta poder **crear** tasques des de la pàgina, i això vol dir demanar un text a la persona… i no refiar-nos del que escrigui.",
          { title: 'El gestor ja respon' }
        ),
      ],
    },
  ],

  commonErrors: [
    {
      title: 'Cridar la funció en lloc de passar-la',
      bad: `boto.addEventListener("click", saludar());`,
      why: "Els parèntesis executen `saludar` immediatament, en carregar la pàgina, i el que es passa a `addEventListener` és el seu resultat (normalment `undefined`). La salutació surt una vegada, sola, i el botó no fa res. No hi ha cap error a la consola.",
      fix: `boto.addEventListener("click", saludar);`,
    },
    {
      title: "Escriure «onclick» com a nom de l'esdeveniment",
      bad: `boto.addEventListener("onclick", saludar);`,
      why: "`onclick` és el nom de l'atribut d'HTML. L'esdeveniment es diu `click`. Com que cap esdeveniment es diu «onclick», el listener no s'executa mai, i tampoc hi ha cap avís.",
      fix: `boto.addEventListener("click", saludar);`,
    },
    {
      title: 'Oblidar preventDefault() en un formulari',
      bad: `formulari.addEventListener("submit", () => {
  afegirTasca(camp.value);
  renderitzar();
});`,
      why: "La tasca s'afegeix i es pinta, però tot seguit el navegador envia el formulari i recarrega la pàgina. El resultat és una pampallugada i un formulari buit.",
      fix: `formulari.addEventListener("submit", (event) => {
  event.preventDefault();
  afegirTasca(camp.value);
  renderitzar();
});`,
    },
    {
      title: 'Afegir un listener a un element que no existeix',
      bad: `const boto = document.querySelector("#enviar-formulari");
boto.addEventListener("click", enviar);`,
      message: "Uncaught TypeError: Cannot read properties of null (reading 'addEventListener')",
      why: "El selector no coincideix amb cap element i `querySelector` ha retornat `null`. Repassa l'`id` de l'HTML lletra a lletra i comprova que l'script es carrega amb `defer`.",
      fix: `const boto = document.querySelector("#enviar");
boto.addEventListener("click", enviar);`,
    },
    {
      title: "Llegir el valor del camp fora del listener",
      bad: `const text = camp.value;

boto.addEventListener("click", () => {
  console.log(text); // sempre ""
});`,
      why: "La primera línia s'executa en carregar la pàgina, quan el camp encara és buit, i guarda aquell text buit per sempre. El valor s'ha de llegir en el moment de l'esdeveniment, dins del listener.",
      fix: `boto.addEventListener("click", () => {
  const text = camp.value;
  console.log(text);
});`,
    },
    {
      title: "Afegir el listener d'un element fix dins de renderitzar",
      bad: `function renderitzar() {
  llista.innerHTML = "";
  // ... pinta les tasques ...

  botoAfegir.addEventListener("click", afegir);
}`,
      why: "`botoAfegir` no es torna a crear: és sempre el mateix. Cada crida a `renderitzar` li afegeix un listener més, i al cap de cinc pintades un sol clic afegeix cinc tasques. Els listeners dels elements fixos es posen una sola vegada, fora de qualsevol funció que es repeteixi.",
      fix: `function renderitzar() {
  llista.innerHTML = "";
  // ... pinta les tasques ...
}

botoAfegir.addEventListener("click", afegir);`,
    },
  ],

  exercises: [
    {
      id: 'comptador-botons',
      title: 'Un comptador amb tres botons',
      statement: "Fes que els tres botons funcionin: un suma 1, un altre resta 1 i el tercer torna el comptador a zero. El número de la pàgina s'ha d'actualitzar cada vegada.",
      expected: "El número puja, baixa i torna a 0 segons el botó que es premi.",
      html: `<p>Valor: <strong id="valor">0</strong></p>
<button id="restar">Resta 1</button>
<button id="sumar">Suma 1</button>
<button id="reiniciar">Torna a zero</button>`,
      css: CSS_BOTONS,
      starter: `const valor = document.querySelector("#valor");
const botoSumar = document.querySelector("#sumar");
const botoRestar = document.querySelector("#restar");
const botoReiniciar = document.querySelector("#reiniciar");

let comptador = 0;

// Afegeix un listener a cada botó
`,
      hint: "Els tres listeners fan dues coses: canviar la variable `comptador` i escriure-la a la pàgina. Aquesta segona part és idèntica en tots tres: pots posar-la en una funció `mostrarValor()`.",
      solution: `const valor = document.querySelector("#valor");
const botoSumar = document.querySelector("#sumar");
const botoRestar = document.querySelector("#restar");
const botoReiniciar = document.querySelector("#reiniciar");

let comptador = 0;

function mostrarValor() {
  valor.textContent = comptador;
}

botoSumar.addEventListener("click", () => {
  comptador++;
  mostrarValor();
});

botoRestar.addEventListener("click", () => {
  comptador--;
  mostrarValor();
});

botoReiniciar.addEventListener("click", () => {
  comptador = 0;
  mostrarValor();
});`,
      explanation: "És el cicle de sempre, en petit: cada esdeveniment canvia la dada i després es torna a pintar. `mostrarValor` fa de `renderitzar`. Tenir-la separada evita repetir la mateixa línia tres vegades i assegura que la pàgina sempre mostra el valor real de la variable.",
    },
    {
      id: 'magrada',
      title: "El botó «M'agrada»",
      statement: "Fes que el botó s'activi i es desactivi a cada clic. Quan estigui actiu ha de tenir la classe `actiu`, dir «T'agrada» i tenir l'atribut `aria-pressed` a `\"true\"`. Quan no, ha de tornar a l'estat inicial.",
      expected: "El botó alterna entre «M'agrada» (blanc) i «T'agrada» (de color) a cada clic.",
      html: `<button id="agrada" aria-pressed="false">M'agrada</button>`,
      css: `button {
  padding: 8px 14px;
  color: #1b2233;
  background: #ffffff;
  border: 2px solid #3451d1;
  border-radius: 999px;
}

button.actiu {
  color: #ffffff;
  background: #3451d1;
}`,
      starter: `const boto = document.querySelector("#agrada");

// Afegeix el listener de click
`,
      hint: "Fes servir `classList.toggle` i després pregunta amb `classList.contains` en quin estat ha quedat. A partir d'aquest booleà pots decidir el text i l'atribut.",
      solution: `const boto = document.querySelector("#agrada");

boto.addEventListener("click", () => {
  boto.classList.toggle("actiu");
  const actiu = boto.classList.contains("actiu");

  boto.setAttribute("aria-pressed", String(actiu));

  if (actiu) {
    boto.textContent = "T'agrada";
  } else {
    boto.textContent = "M'agrada";
  }
});`,
      explanation: "El color és cosa del CSS: JavaScript només posa i treu la classe. El text canvia perquè l'estat no depengui únicament del color, i `aria-pressed` comunica el mateix als lectors de pantalla. Tres maneres de dir una sola cosa, perquè arribi a tothom.",
    },
    {
      id: 'comptador-caracters',
      title: 'El comptador de caràcters',
      statement: "El text d'una tasca no pot passar de 20 caràcters. Mentre la persona escriu, mostra quants en porta amb el format `7 / 20`. Si se'n passa, el comptador ha de rebre la classe `excedit`, i l'ha de perdre si torna a estar dins del límit.",
      expected: "El comptador s'actualitza a cada lletra i es posa en vermell i negreta a partir del caràcter 21.",
      html: `<label for="tasca">Text de la tasca</label>
<input type="text" id="tasca" autocomplete="off">
<p id="recompte">0 / 20</p>`,
      css: `${CSS_CAMPS}

.excedit {
  font-weight: 700;
  color: #b3261e;
}`,
      starter: `const camp = document.querySelector("#tasca");
const recompte = document.querySelector("#recompte");
const LIMIT = 20;

// Afegeix el listener que actualitza el comptador
`,
      hint: "L'esdeveniment que es produeix a cada caràcter és `input`. La longitud del text és `camp.value.length`. Per a la classe necessites un `if` amb `add` i un `else` amb `remove`.",
      solution: `const camp = document.querySelector("#tasca");
const recompte = document.querySelector("#recompte");
const LIMIT = 20;

camp.addEventListener("input", () => {
  const llargada = camp.value.length;

  recompte.textContent = \`\${llargada} / \${LIMIT}\`;

  if (llargada > LIMIT) {
    recompte.classList.add("excedit");
  } else {
    recompte.classList.remove("excedit");
  }
});`,
      explanation: "El límit és una constant amb nom, i no un 20 repetit pel codi. És important l'`else`: sense ell, la classe es posaria en passar-se del límit i ja no es trauria mai, encara que la persona esborrés caràcters.",
    },
    {
      id: 'tanca-escape',
      title: 'Tanca amb el botó o amb Escape',
      statement: [
        "L'avís s'ha de poder tancar de dues maneres: prement el botó «Tanca» o prement la tecla Escape. Les dues han de fer exactament el mateix, de manera que el codi que amaga l'avís ha d'estar en un sol lloc.",
        "Per provar la tecla, primer fes clic dins de la pàgina de resultat perquè rebi les pulsacions.",
      ],
      expected: "L'avís desapareix tant amb el botó com amb la tecla Escape.",
      html: `<div id="avis" class="avis">
  <p>Tens 3 tasques que vencen avui.</p>
  <button id="tancar">Tanca</button>
</div>
<p>La resta de la pàgina.</p>`,
      css: `.avis {
  margin-bottom: 12px;
  padding: 12px;
  background: #fff5dc;
  border: 1px solid #efcf86;
  border-radius: 8px;
}

.avis p {
  margin: 0 0 8px;
}

button {
  padding: 6px 12px;
}`,
      starter: `const avis = document.querySelector("#avis");
const botoTancar = document.querySelector("#tancar");

function tancarAvis() {
  // Amaga l'avís
}

// 1. El botó ha de cridar tancarAvis

// 2. La tecla Escape, premuda a qualsevol lloc, també
`,
      hint: [
        "Per amagar l'avís n'hi ha prou amb `avis.hidden = true`.",
        "Les tecles premudes «a qualsevol lloc» s'escolten a `document`: `document.addEventListener(\"keydown\", ...)`. Dins, comprova si `event.key` és `\"Escape\"`.",
      ],
      solution: `const avis = document.querySelector("#avis");
const botoTancar = document.querySelector("#tancar");

function tancarAvis() {
  avis.hidden = true;
}

// 1. El botó ha de cridar tancarAvis
botoTancar.addEventListener("click", tancarAvis);

// 2. La tecla Escape, premuda a qualsevol lloc, també
document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    tancarAvis();
  }
});`,
      explanation: "Dos esdeveniments diferents acaben cridant la mateixa funció. Si demà tancar l'avís ha de fer alguna cosa més, només caldrà tocar `tancarAvis`. El listener de teclat es posa a `document` perquè funcioni independentment de quin element tingui el focus.",
    },
  ],

  finalExercise: {
    id: 'llista-interactiva',
    title: 'La llista de tasques interactiva',
    statement: [
      "Ajunta en una sola llista les dues funcionalitats de la unitat. Cada tasca ha de tenir una casella per marcar-la com a completada (o desmarcar-la) i un botó per eliminar-la.",
      "Les funcions que treballen amb les dades ja estan escrites. Et falta crear la casella i el botó dins de `renderitzar` i connectar-hi els esdeveniments.",
    ],
    expected: "Tres tasques, cadascuna amb casella, text i botó «Elimina». Marcar la casella ratlla el text; el botó fa desaparèixer la tasca.",
    html: `<h1>Les meves tasques</h1>
<ul id="llista"></ul>`,
    css: CSS_LLISTA,
    starter: `let tasques = [
  ${TASQUES_INICIALS}
];

const llista = document.querySelector("#llista");

function canviarEstat(id) {
  for (const tasca of tasques) {
    if (tasca.id === id) {
      tasca.completada = !tasca.completada;
    }
  }
}

function eliminarTasca(id) {
  const restants = [];
  for (const tasca of tasques) {
    if (tasca.id !== id) {
      restants.push(tasca);
    }
  }
  tasques = restants;
}

function renderitzar() {
  llista.innerHTML = "";

  for (const tasca of tasques) {
    const element = document.createElement("li");
    if (tasca.completada) {
      element.classList.add("completada");
    }

    // 1. Crea la casella (checkbox) i fes que cridi canviarEstat

    // 2. Crea l'etiqueta amb el text de la tasca

    // 3. Crea el botó d'eliminar i fes que cridi eliminarTasca

    // 4. Afegeix-ho tot a l'element
    llista.append(element);
  }
}

renderitzar();`,
    hint: [
      "La casella és un `input` amb `type = \"checkbox\"`. El seu esdeveniment és `change`; el del botó, `click`.",
      "Els dos listeners acaben igual: després de modificar les dades, cal cridar `renderitzar()`.",
    ],
    solution: `let tasques = [
  ${TASQUES_INICIALS}
];

const llista = document.querySelector("#llista");

function canviarEstat(id) {
  for (const tasca of tasques) {
    if (tasca.id === id) {
      tasca.completada = !tasca.completada;
    }
  }
}

function eliminarTasca(id) {
  const restants = [];
  for (const tasca of tasques) {
    if (tasca.id !== id) {
      restants.push(tasca);
    }
  }
  tasques = restants;
}

function renderitzar() {
  llista.innerHTML = "";

  for (const tasca of tasques) {
    const element = document.createElement("li");
    if (tasca.completada) {
      element.classList.add("completada");
    }

    // 1. Crea la casella (checkbox) i fes que cridi canviarEstat
    const casella = document.createElement("input");
    casella.type = "checkbox";
    casella.id = \`tasca-\${tasca.id}\`;
    casella.checked = tasca.completada;
    casella.addEventListener("change", () => {
      canviarEstat(tasca.id);
      renderitzar();
    });

    // 2. Crea l'etiqueta amb el text de la tasca
    const etiqueta = document.createElement("label");
    etiqueta.setAttribute("for", casella.id);
    etiqueta.textContent = tasca.text;

    // 3. Crea el botó d'eliminar i fes que cridi eliminarTasca
    const boto = document.createElement("button");
    boto.type = "button";
    boto.textContent = "Elimina";
    boto.setAttribute("aria-label", \`Elimina la tasca: \${tasca.text}\`);
    boto.addEventListener("click", () => {
      eliminarTasca(tasca.id);
      renderitzar();
    });

    // 4. Afegeix-ho tot a l'element
    element.append(casella, etiqueta, boto);
    llista.append(element);
  }
}

renderitzar();`,
    explanation: [
      "Mira com està repartida la feina. Les funcions `canviarEstat` i `eliminarTasca` només saben de dades. `renderitzar` només sap convertir dades en elements. I els listeners són el pont: un parell de línies que criden una funció de dades i després tornen a pintar.",
      "Aquesta separació és el que permetrà que el projecte creixi sense embolicar-se. Per afegir una funcionalitat nova només caldrà una funció de dades més i un listener més.",
    ],
  },

  summary: [
    "Un **esdeveniment** és l'avís que genera el navegador quan passa alguna cosa: un clic, una tecla, un canvi en un camp.",
    "`element.addEventListener(\"tipus\", funcio)` deixa una funció escoltant. La funció es passa **sense parèntesis**.",
    "`click` per a botons, `input` per reaccionar a cada caràcter, `change` per a caselles i desplegables, `keydown` per a tecles i `submit` per a formularis.",
    "L'objecte `event` porta la informació del que ha passat: `event.target`, `event.key`, `event.type`.",
    "`event.preventDefault()` evita que un formulari recarregui la pàgina en enviar-se.",
    "Als elements creats amb JavaScript se'ls afegeix el listener en el moment de crear-los.",
    "El cicle sempre és el mateix: **esdeveniment → canviar les dades → tornar a pintar**.",
  ],

  quiz: [
    {
      question: "En carregar la pàgina surt la salutació sense que ningú hagi premut res, i després el botó no fa res. Quin és el problema?",
      code: `boto.addEventListener("click", saludar());`,
      options: [
        { text: "Els parèntesis executen `saludar` immediatament en lloc de passar-la com a funció.", correct: true },
        { text: "El nom de l'esdeveniment hauria de ser `\"onclick\"`.", why: "L'esdeveniment es diu `click`. `onclick` és el nom de l'atribut d'HTML." },
        { text: "`addEventListener` només accepta arrow functions.", why: "Accepta qualsevol funció, amb nom o sense." },
        { text: "Falta `event.preventDefault()`.", why: "`preventDefault` evita l'acció per defecte del navegador, però no té res a veure amb quan s'executa la funció." },
      ],
      explanation: "A `addEventListener` se li ha de passar la funció, no el resultat de cridar-la: `saludar`, sense parèntesis.",
    },
    {
      question: "Vols actualitzar un comptador de caràcters a cada lletra que s'escriu en un camp de text. Quin esdeveniment has d'escoltar?",
      options: [
        { text: '`input`', correct: true },
        { text: '`change`', why: "En un camp de text, `change` no es produeix fins que el camp perd el focus." },
        { text: '`submit`', why: "`submit` és un esdeveniment del formulari sencer i només es produeix quan s'envia." },
        { text: '`click`', why: "`click` avisa que s'ha premut el camp, no que s'hi ha escrit." },
      ],
      explanation: "`input` es produeix cada vegada que canvia el contingut del camp, caràcter a caràcter.",
    },
    {
      question: "Per a què serveix `event.preventDefault()` dins del listener de `submit` d'un formulari?",
      options: [
        { text: "Perquè el navegador no enviï el formulari ni recarregui la pàgina.", correct: true },
        { text: "Per aturar l'execució de la resta del listener.", why: "El listener continua executant-se amb normalitat. Qui atura una funció és `return`." },
        { text: "Per buidar els camps del formulari.", why: "Els camps no es toquen. Si els vols buidar, ho has de fer tu." },
        { text: "Per impedir que s'enviï prement Retorn.", why: "Retorn continua provocant l'esdeveniment `submit`: el que s'evita és el que el navegador fa després." },
      ],
      explanation: "L'acció per defecte d'un formulari és enviar-se i carregar una pàgina nova. `preventDefault()` la cancel·la i deixa que sigui el nostre codi qui decideixi què es fa.",
    },
    {
      question: "Dins d'un listener, què conté `event.target`?",
      options: [
        { text: "L'element on s'ha produït l'esdeveniment.", correct: true },
        { text: "El nom de l'esdeveniment, com `\"click\"`.", why: "El nom de l'esdeveniment és a `event.type`." },
        { text: "La funció que s'està executant.", why: "L'objecte `event` descriu el que ha passat, no el codi que hi respon." },
        { text: "La tecla que s'ha premut.", why: "La tecla és a `event.key`, i només en esdeveniments de teclat." },
      ],
      explanation: "`event.target` és l'element que ha originat l'esdeveniment. Permet que una mateixa funció serveixi per a diversos elements.",
    },
    {
      question: "Per què preferim `addEventListener` a escriure `onclick=\"…\"` directament a l'HTML?",
      options: [
        { text: "Perquè manté el comportament al fitxer JavaScript, separat de l'HTML, i permet més d'un listener.", correct: true },
        { text: "Perquè `onclick` ja no funciona als navegadors actuals.", why: "Continua funcionant. La raó és d'organització del codi, no de compatibilitat." },
        { text: "Perquè `addEventListener` s'executa molt més de pressa.", why: "La diferència de velocitat és inapreciable." },
        { text: "Perquè amb `addEventListener` no cal JavaScript.", why: "`addEventListener` és JavaScript." },
      ],
      explanation: "Amb `addEventListener`, l'HTML descriu la pàgina i el JavaScript concentra tot el comportament. A més, funciona amb elements creats dinàmicament.",
    },
  ],
};
