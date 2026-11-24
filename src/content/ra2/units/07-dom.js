import { p, list, example, concept, warning, challenge, project, table, custom } from '../../blocks.js';

const CSS_TARGETA = `.targeta {
  margin-bottom: 8px;
  padding: 12px;
  border: 1px solid #b4bdd1;
  border-radius: 8px;
}

.targeta h2 {
  margin: 0 0 4px;
  font-size: 1.1rem;
}

.targeta p {
  margin: 0;
}`;

const CSS_TASQUES = `ul {
  padding-left: 20px;
}

.completada {
  color: #5d6780;
  text-decoration: line-through;
}`;

export default {
  id: 'dom',
  number: 7,
  title: 'Introducció al DOM',
  shortTitle: 'Introducció al DOM',
  description:
    "Com JavaScript llegeix i modifica la pàgina: trobar elements, canviar-ne el text i l'aspecte, crear-ne de nous i pintar dades a la pantalla.",

  problem: {
    title: "Ja tenim diverses tasques, però encara no apareixen a la pàgina",
    text: [
      "El nostre gestor ja sap guardar tasques, afegir-ne, completar-les i eliminar-les. Però tot això passa a la consola, un lloc que només mirem els qui programem. Qui faci servir l'aplicació no hi veurà res: la pàgina continua tan quieta com el primer dia.",
      "Ha arribat el moment de connectar les dades amb el que es veu. A la unitat 1 ja vam fer una petita trampa per canviar un títol. Ara veurem què hi havia al darrere i aprendrem a fer-ho bé: a convertir un array de tasques en elements de la pàgina.",
    ],
  },

  goals: [
    "Explicar què és el DOM i quina relació té amb l'HTML.",
    "Trobar elements amb `querySelector` i `querySelectorAll`.",
    "Canviar el text, les classes i els atributs d'un element.",
    "Crear elements nous i afegir-los a la pàgina.",
    "Pintar una llista d'elements a partir d'un array.",
  ],

  projectPiece:
    "Les tasques surten de la consola i apareixen a la pàgina: la funció `renderitzar` recorre l'array i crea un element de llista per a cada tasca.",

  finalProject:
    "Crearàs les targetes dels vídeos i els comentaris amb `createElement`, i obriràs el menú posant i traient una classe.",

  sections: [
    {
      id: 'que-es-el-dom',
      title: 'Què és el DOM',
      blocks: [
        p("Quan el navegador llegeix el teu fitxer HTML no es limita a dibuixar-lo. Primer construeix, a la memòria, una representació de la pàgina en forma d'arbre: cada etiqueta es converteix en un **node**, i els nodes pengen els uns dels altres tal com les etiquetes estan niades. Aquest arbre és el **DOM** (*Document Object Model*)."),
        p("Aquesta és la idea més important de la unitat: **JavaScript no modifica el fitxer HTML. Modifica el DOM**, i el navegador torna a dibuixar la pàgina cada vegada que el DOM canvia. Per això, si recarregues, tot torna a ser com al fitxer original."),
        custom('DomTree'),
        concept(
          'El DOM és la pàgina viva',
          "L'HTML és el plànol; el DOM és l'edifici construït. JavaScript treballa sempre sobre l'edifici: hi pot canviar coses, afegir-ne i treure'n, sense tocar mai el plànol."
        ),
        p("La porta d'entrada a aquest arbre és un objecte que el navegador ens dona ja creat: `document`. Representa la pàgina sencera, i tot el que fem amb el DOM comença per aquí."),
        p("I una bona notícia: cada node del DOM és un **objecte**, com els de la unitat anterior. Té propietats que es llegeixen i es modifiquen amb un punt (`titol.textContent`) i mètodes que es criden (`llista.append(...)`). No hi ha sintaxi nova: només propietats i mètodes que encara no coneixies."),
      ],
    },

    {
      id: 'seleccionar',
      title: 'Seleccionar elements: querySelector i querySelectorAll',
      blocks: [
        p("Abans de canviar un element, l'hem de trobar. El mètode `document.querySelector()` rep un **selector de CSS** (els mateixos que ja fas servir als fulls d'estil) i retorna el primer element de la pàgina que hi coincideix."),
        table(
          ['Selector', 'Què troba'],
          [
            ['`"h1"`', 'El primer element `<h1>`'],
            ['`"#titol"`', "L'element amb `id=\"titol\"`"],
            ['`".tasca"`', 'El primer element amb la classe `tasca`'],
            ['`"ul li"`', 'El primer `<li>` que hi hagi dins d\'un `<ul>`'],
          ],
          'Els selectors són els mateixos que a CSS'
        ),
        example({
          title: 'Canviar un títol',
          intro: "Guardem l'element en una constant i després en modifiquem el text.",
          html: `<h1 id="titol">Títol antic</h1>
<p class="info">Primer paràgraf</p>
<p class="info">Segon paràgraf</p>`,
          js: `const titol = document.querySelector("#titol");
console.log(titol);

titol.textContent = "Les meves tasques";

const paragraf = document.querySelector(".info");
console.log(paragraf.textContent);`,
          expected: "El títol de la pàgina canvia. A la consola es veu l'element `<h1>` tal com era quan l'hem trobat i el text `Primer paràgraf`.",
          why: "Guardar l'element en una constant ens permet buscar-lo una sola vegada i fer-lo servir tantes com calgui. Fixa't que `.info` coincideix amb dos paràgrafs, però `querySelector` només retorna el primer.",
        }),
        p("Quan volem **tots** els elements que coincideixen, fem servir `querySelectorAll()`. Retorna una llista d'elements que es comporta de manera molt semblant a un array: té `length` i es pot recórrer amb `for...of` o amb `forEach`."),
        example({
          title: 'Tots els elements que coincideixen',
          intro: "El bucle modifica cada paràgraf de la llista.",
          html: `<h1 id="titol">Notes</h1>
<p class="info">Primer paràgraf</p>
<p class="info">Segon paràgraf</p>`,
          js: `const paragrafs = document.querySelectorAll(".info");
console.log(paragrafs.length);

for (const paragraf of paragrafs) {
  paragraf.textContent = paragraf.textContent + " (revisat)";
}`,
          expected: "A la consola, `2`. A la pàgina, els dos paràgrafs acaben amb «(revisat)».",
          why: "`querySelectorAll` sempre retorna una llista, encara que només hi hagi un element o cap. Per fer alguna cosa amb els elements, cal recórrer-la.",
        }),
        example({
          title: 'Quan no es troba res',
          intro: "El selector té un error: l'`id` del botó no és el que busquem.",
          html: `<button id="enviar">Envia</button>`,
          js: `const boto = document.querySelector("#boto-enviar");
console.log(boto);

boto.textContent = "Envia el formulari";`,
          expected: "A la consola, `null` i després un `TypeError` a la línia 4.",
          why: "Si cap element coincideix amb el selector, `querySelector` no dona error: retorna `null`. L'error apareix a la línia següent, quan intentem fer servir aquest `null` com si fos un element. Quan vegis «of null» en un error, mira el selector de la línia anterior.",
        }),
        warning(
          'Un selector equivocat no avisa',
          "`querySelector(\"titol\")`, sense coixinet, busca una etiqueta `<titol>`, que no existeix. El resultat és `null`. Recorda: `#` per a `id`, `.` per a classe i res per a etiquetes."
        ),
      ],
    },

    {
      id: 'text-content',
      title: 'Canviar el contingut: textContent i innerHTML',
      blocks: [
        p("La propietat `textContent` conté el text d'un element. Es pot llegir per saber què hi diu i s'hi pot assignar un text nou per canviar-lo. És la que farem servir sempre."),
        p("Hi ha una altra propietat que s'hi assembla: `innerHTML`. La diferència és que interpreta el text com a **codi HTML**."),
        example({
          title: 'El mateix text, de dues maneres',
          intro: "Assignem el mateix string a dos paràgrafs, un amb cada propietat.",
          html: `<p id="amb-text"></p>
<p id="amb-html"></p>`,
          js: `const missatge = "Tasca <strong>urgent</strong>";

document.querySelector("#amb-text").textContent = missatge;
document.querySelector("#amb-html").innerHTML = missatge;`,
          expected: "El primer paràgraf mostra les etiquetes tal com estan escrites. El segon mostra la paraula «urgent» en negreta.",
          why: "`textContent` tracta el string com a text i prou: els símbols `<` i `>` es mostren com a caràcters normals. `innerHTML` el llegeix com a HTML i crea els elements que hi hagi.",
        }),
        p("Sembla que `innerHTML` sigui més potent, i ho és. Precisament per això és perillós. Si el text ve d'una persona (un nom escrit en un formulari, un comentari), `innerHTML` interpretarà **qualsevol cosa** que hi hagi escrit, també codi."),
        example({
          title: "El risc d'innerHTML",
          intro: "Imagina que algú, en lloc del seu nom, escriu això en un formulari de registre.",
          html: `<p>Benvinguda, <span id="nom"></span></p>
<p>Aquí hi hauria el contingut important de la pàgina.</p>`,
          js: `// Això ho ha escrit una persona en un camp de text
const nomUsuari = "<img src='x' onerror='document.body.textContent = \\"Aquesta pàgina ha estat manipulada\\"'>";

document.querySelector("#nom").innerHTML = nomUsuari;`,
          expected: "Tot el contingut de la pàgina desapareix i només queda el text «Aquesta pàgina ha estat manipulada».",
          why: "El text conté una imatge que no es pot carregar i una instrucció que s'executa quan això passa. En fer servir `innerHTML`, el navegador crea la imatge i executa el codi. Ara canvia `innerHTML` per `textContent` i torna'l a executar: el text es mostra tal qual, inofensiu.",
        }),
        concept(
          'textContent per defecte',
          "Fes servir sempre `textContent` per posar text en un element. Reserva `innerHTML` per a HTML que hagis escrit tu mateix al codi, i mai per a res que vingui d'una persona o de fora. Aquest tipus d'atac s'anomena XSS i és un dels més freqüents a la web."
        ),
      ],
    },

    {
      id: 'classlist',
      title: "Canviar l'aspecte: classList",
      blocks: [
        p("Per canviar l'aspecte d'un element no escriurem colors ni mides des de JavaScript. L'aspecte és feina del CSS. El que farem és definir les classes al full d'estils i, des de JavaScript, **posar-les i treure-les**. La propietat `classList` té quatre mètodes per fer-ho:"),
        table(
          ['Mètode', 'Què fa'],
          [
            ['`classList.add("activa")`', 'Afegeix la classe'],
            ['`classList.remove("activa")`', 'Treu la classe'],
            ['`classList.toggle("activa")`', 'La posa si no hi és i la treu si hi és'],
            ['`classList.contains("activa")`', 'Respon `true` o `false`: la té?'],
          ],
          'Mètodes de classList'
        ),
        p("Els dos exemples següents necessiten reaccionar a un clic, i per això fan servir `addEventListener`, com vam fer a la unitat 1. De moment llegeix-lo com «quan es premi el botó, fes això»; la unitat següent li està dedicada sencera."),
        example({
          title: 'Mostrar i ocultar contingut',
          intro: "La classe `ocult` està definida al CSS amb `display: none`. JavaScript només la posa i la treu.",
          html: `<button id="boto">Mostra o amaga els detalls</button>
<p id="detalls" class="ocult">Aquesta tasca s'ha d'entregar divendres abans de les 12 h.</p>`,
          css: `.ocult {
  display: none;
}

button {
  padding: 8px 14px;
}`,
          js: `const boto = document.querySelector("#boto");
const detalls = document.querySelector("#detalls");

boto.addEventListener("click", () => {
  detalls.classList.toggle("ocult");
  console.log(detalls.classList.contains("ocult"));
});`,
          expected: "Cada clic mostra o amaga el paràgraf, i a la consola s'alternen `false` i `true`.",
          why: "`toggle` estalvia un `if`: no cal preguntar si la classe hi és per decidir si posar-la o treure-la. Mira la pestanya CSS: tot el que té a veure amb l'aspecte és allà.",
        }),
        example({
          title: 'Activar el mode fosc',
          intro: "Una sola classe al `<body>` canvia els colors de tota la pàgina.",
          html: `<h1>Gestor de tasques</h1>
<p>Prem el botó per canviar l'aspecte de la pàgina.</p>
<button id="tema">Canvia el tema</button>`,
          css: `body {
  color: #1b2233;
  background: #ffffff;
}

body.fosc {
  color: #e7eaf3;
  background: #161b27;
}

button {
  padding: 8px 14px;
}`,
          js: `const botoTema = document.querySelector("#tema");

botoTema.addEventListener("click", () => {
  document.body.classList.toggle("fosc");
});`,
          expected: "Cada clic alterna entre fons clar i fons fosc.",
          why: "`document.body` és una drecera per arribar a l'element `<body>` sense haver-lo de buscar. Tota la feina de colors la fa el CSS amb el selector `body.fosc`.",
        }),
        warning(
          'A classList, el nom va sense punt',
          "El punt forma part dels selectors de CSS, no del nom de la classe. `classList.add(\".fosc\")` afegiria una classe que es diu literalment «.fosc», i cap regla del CSS hi coincidiria. S'escriu `classList.add(\"fosc\")`."
        ),
      ],
    },

    {
      id: 'atributs',
      title: 'Modificar atributs',
      blocks: [
        p("Els atributs que escrius a l'HTML (`href`, `id`, `disabled`, `hidden`…) també es poden llegir i canviar des de JavaScript. La majoria existeixen com a propietats de l'element, amb el mateix nom."),
        example({
          title: 'Atributs que canvien',
          intro: "Un botó que es desactiva, un avís que s'amaga i un enllaç que rep un destí.",
          html: `<p><a id="enllac">Enllaç sense destí</a></p>
<button id="enviar">Envia</button>
<p id="avis">Aquest avís desapareixerà.</p>
<p id="contacte">Secció de contacte</p>`,
          css: `button {
  padding: 8px 14px;
}`,
          js: `const botoEnviar = document.querySelector("#enviar");
botoEnviar.disabled = true;

const avis = document.querySelector("#avis");
avis.hidden = true;

const enllac = document.querySelector("#enllac");
enllac.setAttribute("href", "#contacte");
enllac.textContent = "Ves a contacte";
console.log(enllac.getAttribute("href"));`,
          expected: "El botó queda desactivat, l'avís desapareix i l'enllaç passa a tenir text i destí. A la consola, `#contacte`.",
          why: "`disabled` i `hidden` són atributs booleans: n'hi ha prou d'assignar-los `true` o `false`. Per a la resta, `setAttribute(nom, valor)` posa qualsevol atribut i `getAttribute(nom)` en llegeix el valor.",
        }),
        table(
          ['Vull…', 'Com es fa'],
          [
            ['Desactivar un botó', '`boto.disabled = true`'],
            ['Amagar un element', '`element.hidden = true`'],
            ['Posar un atribut qualsevol', '`element.setAttribute("aria-label", "Tanca")`'],
            ['Llegir un atribut', '`element.getAttribute("href")`'],
            ['Treure un atribut', '`element.removeAttribute("aria-invalid")`'],
          ],
          'Operacions habituals amb atributs'
        ),
        p("`setAttribute` és la manera general i serveix per a tots els atributs, inclosos els d'accessibilitat que comencen per `aria-`. Els farem servir a la unitat de formularis i al projecte."),
        concept(
          'Dues maneres d\'amagar',
          "Pots amagar un element amb la propietat `hidden` o amb una classe de CSS. Totes dues són correctes. `hidden` és més directa quan només vols que una cosa hi sigui o no; una classe et dona més control sobre com desapareix."
        ),
      ],
    },

    {
      id: 'crear-elements',
      title: 'Crear i eliminar elements',
      blocks: [
        p("Fins ara hem modificat elements que ja eren a l'HTML. Però una tasca nova no existeix al fitxer: l'hem de fabricar nosaltres. Crear un element i fer que es vegi sempre són tres passos:"),
        list(
          "**Crear-lo** amb `document.createElement(\"etiqueta\")`. En aquest moment existeix a la memòria, però no és a la pàgina.",
          "**Configurar-lo**: posar-li text, classes i atributs, igual que faries amb qualsevol altre element.",
          "**Afegir-lo** a un element que ja sigui a la pàgina, amb `append()`. Només llavors es veu."
        ),
        example({
          title: 'Crear una targeta',
          intro: "Tres elements nous: un `<article>` que conté un títol i un paràgraf.",
          html: `<h1>Productes</h1>
<div id="cataleg"></div>`,
          css: CSS_TARGETA,
          js: `const cataleg = document.querySelector("#cataleg");

// 1. Crear
const targeta = document.createElement("article");
const titol = document.createElement("h2");
const preu = document.createElement("p");

// 2. Configurar
targeta.classList.add("targeta");
titol.textContent = "Teclat mecànic";
preu.textContent = "45 €";

// 3. Afegir a la pàgina
targeta.append(titol, preu);
cataleg.append(targeta);`,
          expected: "Sota el títol «Productes» apareix una targeta amb el nom i el preu.",
          why: "`append` posa un o diversos elements dins d'un altre, al final. Primer muntem la targeta (títol i preu a dins) i després la pengem del catàleg, que ja és a la pàgina. Prova d'esborrar l'última línia: la targeta es crea igualment, però no es veu.",
        }),
        warning(
          'Un element creat no es veu fins que s\'afegeix',
          "`createElement` només fabrica l'element. Si t'oblides de l'`append`, no hi ha cap error: l'element existeix a la memòria i a la pàgina no hi apareix res."
        ),
        p("Eliminar és molt més senzill: tots els elements tenen un mètode `remove()` que els treu de la pàgina."),
        example({
          title: 'Eliminar un element',
          intro: "Després d'eliminar-lo, el tornem a buscar per comprovar que ja no hi és.",
          html: `<p id="avis">Tens una notificació pendent.</p>
<p>La resta de la pàgina continua igual.</p>`,
          js: `const avis = document.querySelector("#avis");
avis.remove();

console.log(document.querySelector("#avis"));`,
          expected: "El primer paràgraf desapareix i a la consola es mostra `null`.",
        }),
        challenge({
          statement: "Afegeix un tercer element a la llista amb el text «Enviar el treball». Ha de quedar al final.",
          html: `<ul id="llista">
  <li>Estudiar JavaScript</li>
  <li>Fer la compra</li>
</ul>`,
          starter: `const llista = document.querySelector("#llista");

// Crea un <li>, posa-li el text i afegeix-lo a la llista
`,
          hint: "Són els tres passos: `document.createElement(\"li\")`, assignar `textContent` i `llista.append(...)`.",
          solution: `const llista = document.querySelector("#llista");

const element = document.createElement("li");
element.textContent = "Enviar el treball";
llista.append(element);`,
          explanation: "L'element nou es penja de la llista, que ja era a la pàgina, i per això es veu immediatament. `append` sempre afegeix al final.",
        }),
      ],
    },

    {
      id: 'renderitzar',
      title: "Renderitzar dades d'un array",
      blocks: [
        p("Ja tenim totes les peces: sabem recórrer un array i sabem crear elements. Ajuntant-les obtenim el patró més important de tota la programació d'interfícies: **tenir les dades en un array i generar la pàgina a partir d'elles**. D'això se'n diu *renderitzar* (o, simplement, pintar)."),
        example({
          title: "Crear una llista des d'un array",
          intro: "Per a cada nom de l'array, un `<li>` a la pàgina.",
          html: `<h1>Alumnes</h1>
<ul id="llista"></ul>`,
          js: `const alumnes = ["Anna", "Marc", "Júlia", "Pau"];
const llista = document.querySelector("#llista");

for (const alumne of alumnes) {
  const element = document.createElement("li");
  element.textContent = alumne;
  llista.append(element);
}`,
          expected: "Una llista amb els quatre noms.",
          why: "Els tres passos de crear un element, dins d'un bucle. Afegeix un nom a l'array i torna'l a executar: la pàgina s'adapta sola, sense tocar l'HTML.",
        }),
        p("En una aplicació, les dades canvien: s'afegeixen tasques, se'n completen, se n'eliminen. Cada vegada que canvien, cal tornar a pintar. Per això posem el codi dins d'una funció que puguem cridar tantes vegades com calgui."),
        example({
          title: 'Renderitzar les tasques',
          intro: "La funció es crida dues vegades: en començar i després d'afegir una tasca.",
          html: `<h1>Les meves tasques</h1>
<ul id="llista"></ul>
<p id="resum"></p>`,
          css: CSS_TASQUES,
          js: `const tasques = [
  { id: 1, text: "Estudiar JavaScript", completada: true },
  { id: 2, text: "Fer la compra", completada: false },
  { id: 3, text: "Enviar el treball", completada: false }
];

const llista = document.querySelector("#llista");
const resum = document.querySelector("#resum");

function renderitzarTasques() {
  llista.innerHTML = "";

  for (const tasca of tasques) {
    const element = document.createElement("li");
    element.textContent = tasca.text;
    if (tasca.completada) {
      element.classList.add("completada");
    }
    llista.append(element);
  }

  resum.textContent = \`Total: \${tasques.length} tasques\`;
}

renderitzarTasques();

// Les dades canvien... i tornem a pintar
tasques.push({ id: 4, text: "Repassar el DOM", completada: false });
renderitzarTasques();`,
          expected: "Quatre tasques, la primera ratllada, i el text `Total: 4 tasques`.",
          why: "La primera línia de la funció buida la llista. Sense ella, la segona crida afegiria les quatre tasques a sota de les tres que ja hi havia. Prova de comentar-la per veure-ho.",
        }),
        p("Aquest `llista.innerHTML = \"\"` és l'únic ús d'`innerHTML` que ens permetrem. Assignar-hi un text buit, escrit per nosaltres, no té cap risc: simplement elimina tot el que hi havia dins de l'element."),
        concept(
          'Les dades manen; la pàgina les reflecteix',
          "Quan alguna cosa canvia, **no** modifiquem la pàgina directament. Modifiquem l'array i després cridem la funció que ho torna a pintar tot. Així la pàgina mai pot mostrar una cosa diferent del que diuen les dades."
        ),
        project(
          "Aquesta funció és el que faltava al gestor de la unitat anterior. Allà, `mostrarTasques` escrivia a la consola; aquí, `renderitzarTasques` fa el mateix recorregut, però crea elements. La resta del programa (afegir, completar, eliminar) no ha de canviar: només ha de cridar-la després de cada operació. El que encara no pot fer la pàgina és *escoltar* la persona que la fa servir.",
          { title: 'El gestor ja es veu' }
        ),
      ],
    },
  ],

  commonErrors: [
    {
      title: 'Oblidar el coixinet o el punt del selector',
      bad: `const titol = document.querySelector("titol");
titol.textContent = "Tasques";`,
      message: "Uncaught TypeError: Cannot set properties of null (setting 'textContent')",
      why: "Sense `#` ni `.`, el selector busca una etiqueta `<titol>`, que no existeix. `querySelector` retorna `null` i l'error salta a la línia següent.",
      fix: `const titol = document.querySelector("#titol");
titol.textContent = "Tasques";`,
    },
    {
      title: "Tractar una llista d'elements com si fos un sol element",
      bad: `const tasques = document.querySelectorAll(".tasca");
tasques.classList.add("completada");`,
      message: "Uncaught TypeError: Cannot read properties of undefined (reading 'add')",
      why: "`querySelectorAll` retorna una llista, i la llista no té `classList`: la té cada element. Cal recórrer-la.",
      fix: `const tasques = document.querySelectorAll(".tasca");

for (const tasca of tasques) {
  tasca.classList.add("completada");
}`,
    },
    {
      title: 'Escriure el punt dins de classList',
      bad: `boto.classList.add(".actiu");`,
      why: "No hi ha cap error, però l'element rep una classe que es diu «.actiu», amb el punt inclòs, i la regla `.actiu { }` del CSS no s'hi aplica. El punt és part del selector, no del nom.",
      fix: `boto.classList.add("actiu");`,
    },
    {
      title: "Crear un element i no afegir-lo a la pàgina",
      bad: `const element = document.createElement("li");
element.textContent = "Tasca nova";`,
      why: "L'element s'ha creat i configurat, però no penja de cap altre. Existeix a la memòria i no es veu enlloc. Tampoc hi ha cap error que ho indiqui.",
      fix: `const element = document.createElement("li");
element.textContent = "Tasca nova";
llista.append(element);`,
    },
    {
      title: 'Tornar a pintar sense buidar abans',
      bad: `function renderitzar() {
  for (const tasca of tasques) {
    const element = document.createElement("li");
    element.textContent = tasca.text;
    llista.append(element);
  }
}`,
      why: "Cada crida afegeix tots els elements a sota dels que ja hi havia. Després d'afegir una tasca, la llista mostra les antigues dues vegades.",
      fix: `function renderitzar() {
  llista.innerHTML = "";

  for (const tasca of tasques) {
    const element = document.createElement("li");
    element.textContent = tasca.text;
    llista.append(element);
  }
}`,
    },
    {
      title: "Posar text d'una persona amb innerHTML",
      bad: `const nom = campNom.value;
salutacio.innerHTML = "Hola, " + nom;`,
      why: "Si la persona escriu etiquetes HTML en lloc del seu nom, el navegador les interpretarà, i això inclou codi que es pot executar. Qualsevol text que no hagis escrit tu ha d'anar amb `textContent`.",
      fix: `const nom = campNom.value;
salutacio.textContent = "Hola, " + nom;`,
    },
  ],

  exercises: [
    {
      id: 'titol-subtitol',
      title: 'Títol i subtítol',
      statement: "Canvia el títol de la pàgina per «Gestor de tasques» i fes que el subtítol mostri quantes tasques hi ha pendents, a partir de la variable `pendents`.",
      expected: "El títol diu «Gestor de tasques» i el subtítol, «Tens 3 tasques pendents».",
      html: `<h1 id="titol">Sense títol</h1>
<p id="subtitol">Sense subtítol</p>`,
      starter: `const pendents = 3;

// Selecciona els dos elements i canvia'n el text
`,
      hint: "Necessites dos `querySelector`, un per a cada `id`. Per al subtítol, construeix el text amb un template literal que faci servir `pendents`.",
      solution: `const pendents = 3;

const titol = document.querySelector("#titol");
const subtitol = document.querySelector("#subtitol");

titol.textContent = "Gestor de tasques";
subtitol.textContent = \`Tens \${pendents} tasques pendents\`;`,
      explanation: "Cada element es busca una vegada i es guarda en una constant. Com que el subtítol es construeix a partir de la variable, si `pendents` canvia només cal tornar a executar aquesta línia.",
    },
    {
      id: 'destacar-urgents',
      title: 'Destaca les urgents',
      statement: "Algunes tasques de la llista tenen la classe `urgent`. Afegeix a totes aquestes la classe `destacada`, que ja està definida al CSS, i mostra a la consola quantes n'hi ha.",
      expected: "Les dues tasques urgents queden amb fons groc i a la consola apareix `2`.",
      html: `<ul>
  <li class="tasca">Estudiar JavaScript</li>
  <li class="tasca urgent">Enviar el treball</li>
  <li class="tasca">Fer la compra</li>
  <li class="tasca urgent">Renovar la matrícula</li>
</ul>`,
      css: `.destacada {
  font-weight: 700;
  background: #fff5dc;
}`,
      starter: `// Selecciona totes les tasques urgents

// Afegeix-los la classe "destacada" i mostra quantes són
`,
      hint: "`querySelectorAll(\".urgent\")` retorna una llista. La classe s'ha d'afegir a cada element, dins d'un bucle. La quantitat és el `length` de la llista.",
      solution: `const urgents = document.querySelectorAll(".urgent");

for (const tasca of urgents) {
  tasca.classList.add("destacada");
}

console.log(urgents.length);`,
      explanation: "`querySelectorAll` retorna tots els elements que coincideixen. Com que és una llista, les operacions s'han de fer element a element, però `length` sí que es pot preguntar directament a la llista.",
    },
    {
      id: 'targeta-producte',
      title: 'Una targeta de producte',
      statement: "A partir de l'objecte `producte`, crea una targeta dins de l'element `#cataleg`: un `<article>` amb la classe `targeta` que contingui un `<h2>` amb el nom i un `<p>` amb el preu seguit del símbol de l'euro.",
      expected: "Una targeta amb el títol «Ratolí sense fil» i el text «25 €».",
      html: `<h1>Productes</h1>
<div id="cataleg"></div>`,
      css: CSS_TARGETA,
      starter: `const producte = { nom: "Ratolí sense fil", preu: 25 };

const cataleg = document.querySelector("#cataleg");

// Crea els tres elements, configura'ls i afegeix-los
`,
      hint: "Crea els tres elements, posa-hi classe i textos, i després fes dos `append`: el títol i el preu dins de la targeta, i la targeta dins del catàleg.",
      solution: `const producte = { nom: "Ratolí sense fil", preu: 25 };

const cataleg = document.querySelector("#cataleg");

const targeta = document.createElement("article");
targeta.classList.add("targeta");

const titol = document.createElement("h2");
titol.textContent = producte.nom;

const preu = document.createElement("p");
preu.textContent = \`\${producte.preu} €\`;

targeta.append(titol, preu);
cataleg.append(targeta);`,
      explanation: "Les dades surten de l'objecte i no estan escrites dins del codi que crea els elements. Si convertissis aquestes línies en una funció `crearTargeta(producte)`, podries cridar-la per a cada producte d'un array.",
    },
    {
      id: 'llista-amb-total',
      title: "La llista d'alumnes, amb total",
      statement: "Pinta els noms de l'array dins de la llista `#alumnes`, un `<li>` per a cada nom, i escriu a `#total` quants n'hi ha.",
      expected: "Una llista amb quatre noms i, a sota, el text «Total: 4 alumnes».",
      html: `<h1>Alumnes</h1>
<ul id="alumnes"></ul>
<p id="total"></p>`,
      starter: `const alumnes = ["Anna", "Marc", "Júlia", "Pau"];

const llista = document.querySelector("#alumnes");
const total = document.querySelector("#total");

// Crea un <li> per a cada alumne i escriu el total
`,
      hint: "Un `for...of` amb els tres passos a dins: crear, posar el text i afegir. El total s'escriu una sola vegada, després del bucle.",
      solution: `const alumnes = ["Anna", "Marc", "Júlia", "Pau"];

const llista = document.querySelector("#alumnes");
const total = document.querySelector("#total");

for (const alumne of alumnes) {
  const element = document.createElement("li");
  element.textContent = alumne;
  llista.append(element);
}

total.textContent = \`Total: \${alumnes.length} alumnes\`;`,
      explanation: "El total surt d'`alumnes.length`, no d'un número escrit a mà. Així la llista i el recompte no es poden contradir: tots dos surten de les mateixes dades.",
    },
  ],

  finalExercise: {
    id: 'renderitzar-tasques',
    title: 'Renderitza les tasques, amb estat buit',
    statement: [
      "Completa la funció `renderitzarTasques`. Ha de buidar la llista i crear un `<li>` per a cada tasca, amb la classe `completada` si ho està. També ha d'escriure a `#comptador` quantes tasques queden pendents.",
      "Quan l'array no tingui cap tasca, s'ha de mostrar el paràgraf `#buit`; quan en tingui, ha d'estar amagat. Per comprovar-ho, quan et funcioni canvia l'array per `[]` i torna'l a executar.",
    ],
    expected: "Tres tasques, la segona ratllada, i el text «Pendents: 2». Amb l'array buit: cap tasca, el missatge «No hi ha tasques» i «Pendents: 0».",
    html: `<h1>Les meves tasques</h1>
<ul id="llista"></ul>
<p id="buit" hidden>No hi ha tasques.</p>
<p id="comptador"></p>`,
    css: CSS_TASQUES,
    starter: `const tasques = [
  { id: 1, text: "Estudiar JavaScript", completada: false },
  { id: 2, text: "Fer la compra", completada: true },
  { id: 3, text: "Enviar el treball", completada: false }
];

const llista = document.querySelector("#llista");
const missatgeBuit = document.querySelector("#buit");
const comptador = document.querySelector("#comptador");

function renderitzarTasques() {
  // 1. Buida la llista

  // 2. Crea un <li> per a cada tasca i compta les pendents

  // 3. Mostra o amaga el missatge d'estat buit

  // 4. Escriu el nombre de pendents
}

renderitzarTasques();`,
    hint: [
      "Declara un comptador `pendents` dins de la funció, abans del bucle, i suma-hi 1 cada vegada que trobis una tasca no completada.",
      "`missatgeBuit.hidden` ha de ser `true` quan hi hagi tasques i `false` quan no n'hi hagi. Pots assignar-li directament una comparació: `tasques.length > 0`.",
    ],
    solution: `const tasques = [
  { id: 1, text: "Estudiar JavaScript", completada: false },
  { id: 2, text: "Fer la compra", completada: true },
  { id: 3, text: "Enviar el treball", completada: false }
];

const llista = document.querySelector("#llista");
const missatgeBuit = document.querySelector("#buit");
const comptador = document.querySelector("#comptador");

function renderitzarTasques() {
  // 1. Buida la llista
  llista.innerHTML = "";

  // 2. Crea un <li> per a cada tasca i compta les pendents
  let pendents = 0;

  for (const tasca of tasques) {
    const element = document.createElement("li");
    element.textContent = tasca.text;

    if (tasca.completada) {
      element.classList.add("completada");
    } else {
      pendents++;
    }

    llista.append(element);
  }

  // 3. Mostra o amaga el missatge d'estat buit
  missatgeBuit.hidden = tasques.length > 0;

  // 4. Escriu el nombre de pendents
  comptador.textContent = \`Pendents: \${pendents}\`;
}

renderitzarTasques();`,
    explanation: [
      "La funció no rep res ni retorna res: llegeix l'array `tasques` i deixa la pàgina tal com diuen les dades. Cridar-la una vegada o deu dona sempre el mateix resultat, i això és el que la fa segura.",
      "`missatgeBuit.hidden = tasques.length > 0` estalvia un `if`: la comparació ja dona el booleà que necessitem. I l'estat buit és un detall que distingeix una aplicació cuidada: una llista en blanc, sense cap explicació, fa pensar que alguna cosa ha fallat.",
    ],
  },

  summary: [
    "El **DOM** és l'arbre d'objectes que el navegador construeix a partir de l'HTML. JavaScript modifica el DOM, no el fitxer.",
    "`document.querySelector(selector)` retorna el primer element que coincideix, o `null`. `querySelectorAll` retorna tots els que coincideixen, en una llista.",
    "`textContent` canvia el text de manera segura. `innerHTML` interpreta HTML i no s'ha de fer servir amb text que vingui d'una persona.",
    "L'aspecte es canvia posant i traient classes amb `classList.add`, `remove` i `toggle`.",
    "Per afegir un element: `createElement`, configurar-lo i `append`. Per treure'l: `remove()`.",
    "**Renderitzar** és generar la pàgina a partir de les dades: buidar el contenidor, recórrer l'array i crear un element per a cada dada.",
  ],

  quiz: [
    {
      question: "A la pàgina hi ha tres elements amb la classe `tasca`. Què retorna `document.querySelector(\".tasca\")`?",
      options: [
        { text: 'El primer dels tres elements', correct: true },
        { text: 'Una llista amb els tres elements', why: "Això és el que fa `querySelectorAll`. `querySelector` en retorna només un." },
        { text: "L'últim dels tres elements", why: "Retorna el primer que troba, en l'ordre en què apareixen a la pàgina." },
        { text: '`null`, perquè n\'hi ha més d\'un', why: "`null` només es retorna quan no hi ha cap element que coincideixi." },
      ],
      explanation: "`querySelector` sempre retorna un sol element: el primer que coincideix amb el selector.",
    },
    {
      question: "Què retorna `document.querySelector(\"#menu\")` si a la pàgina no hi ha cap element amb aquest `id`?",
      options: [
        { text: '`null`', correct: true },
        { text: '`undefined`', why: "`undefined` és el que dona una variable sense valor o una propietat inexistent. `querySelector` retorna expressament `null`." },
        { text: 'Un error que atura el programa', why: "La cerca no falla. L'error arriba després, quan intentes fer servir el resultat com si fos un element." },
        { text: 'Un element buit creat automàticament', why: "`querySelector` només busca: no crea mai elements." },
      ],
      explanation: "Quan no troba res, `querySelector` retorna `null`. Per això els errors del tipus «Cannot set properties of null» apunten sempre a un selector que no coincideix amb res.",
    },
    {
      question: "Has de mostrar a la pàgina un nom que una persona ha escrit en un formulari. Quina propietat has de fer servir?",
      options: [
        { text: '`textContent`', correct: true },
        { text: '`innerHTML`', why: "Interpretaria com a HTML el que la persona hagi escrit, i això permet injectar codi a la pàgina." },
        { text: '`classList`', why: "`classList` gestiona les classes de l'element, no el seu contingut." },
        { text: '`hidden`', why: "`hidden` decideix si l'element es veu o no; no en canvia el text." },
      ],
      explanation: "`textContent` tracta el valor com a text i prou. És l'opció segura per a qualsevol dada que no hagis escrit tu mateix.",
    },
    {
      question: "Aquest codi no dona cap error, però la tasca no apareix a la pàgina. Per què?",
      code: `const element = document.createElement("li");
element.textContent = "Tasca nova";`,
      options: [
        { text: "Perquè falta afegir l'element a la pàgina amb `append`.", correct: true },
        { text: "Perquè el text s'hauria de posar amb `innerHTML`.", why: "`textContent` posa el text correctament. El problema és que l'element no penja de cap altre." },
        { text: "Perquè `createElement` només funciona amb `<div>`.", why: "`createElement` pot crear qualsevol etiqueta HTML." },
        { text: "Perquè falta l'atribut `defer` a l'script.", why: "`defer` afecta els elements que ja són a l'HTML. Aquí l'element es crea des de JavaScript." },
      ],
      explanation: "`createElement` crea l'element a la memòria. Fins que no s'afegeix a un element que ja és a la pàgina, no es veu.",
    },
    {
      question: "Què fa `element.classList.toggle(\"actiu\")`?",
      options: [
        { text: "Afegeix la classe si no la té i la treu si la té.", correct: true },
        { text: "Afegeix sempre la classe.", why: "Això és el que fa `classList.add`." },
        { text: "Comprova si l'element té la classe.", why: "Per comprovar-ho hi ha `classList.contains`, que no modifica res." },
        { text: "Canvia el nom de la classe per un altre.", why: "`toggle` no canvia noms: només posa o treu la classe indicada." },
      ],
      explanation: "`toggle` alterna: és la manera més curta de fer que alguna cosa s'activi i es desactivi amb la mateixa acció.",
    },
  ],
};
