import { p, list, code, example, concept, warning, project, table } from '../blocks.js';

const CSS_FORM = `label {
  display: block;
  margin: 10px 0 4px;
  font-weight: 600;
}

input[type="text"],
input[type="password"] {
  width: 100%;
  max-width: 320px;
  padding: 8px;
  border: 1px solid #8a94a8;
  border-radius: 6px;
}

input[aria-invalid="true"] {
  border: 2px solid #b3261e;
}

button {
  margin-top: 12px;
  padding: 8px 14px;
}

.error {
  min-height: 1.4em;
  margin: 4px 0 0;
  font-weight: 600;
  color: #b3261e;
}

.correcte {
  font-weight: 600;
  color: #17663a;
}`;

const FN_VALIDAR_NOM = `function validarNom(nom) {
  if (nom === "") {
    return "El nom és obligatori.";
  }
  if (nom.length < 3) {
    return "El nom ha de tenir almenys 3 caràcters.";
  }
  return "";
}`;

const FN_VALIDAR_CORREU = `function validarCorreu(correu) {
  if (correu === "") {
    return "El correu és obligatori.";
  }
  if (!correu.includes("@") || !correu.includes(".")) {
    return "El correu no sembla vàlid.";
  }
  return "";
}`;

const FN_VALIDAR_EDAT = `function validarEdat(text) {
  if (text === "") {
    return "L'edat és obligatòria.";
  }

  const edat = Number(text);

  if (Number.isNaN(edat)) {
    return "L'edat ha de ser un nombre.";
  }
  if (edat < 16) {
    return "Has de tenir almenys 16 anys.";
  }
  return "";
}`;

const FN_MOSTRAR_ERROR = `function mostrarError(camp, avis, missatge) {
  avis.textContent = missatge;

  if (missatge === "") {
    camp.removeAttribute("aria-invalid");
  } else {
    camp.setAttribute("aria-invalid", "true");
  }
}`;

const HTML_REGISTRE = `<form id="registre" novalidate>
  <label for="nom">Nom</label>
  <input type="text" id="nom" autocomplete="off" aria-describedby="avis-nom">
  <p id="avis-nom" class="error" role="alert"></p>

  <label for="correu">Correu electrònic</label>
  <input type="text" id="correu" autocomplete="off" aria-describedby="avis-correu">
  <p id="avis-correu" class="error" role="alert"></p>

  <label for="edat">Edat</label>
  <input type="text" id="edat" autocomplete="off" aria-describedby="avis-edat">
  <p id="avis-edat" class="error" role="alert"></p>

  <button type="submit">Registra'm</button>
</form>
<p id="resultat" class="correcte" role="status"></p>`;

export default {
  id: 'formularis',
  number: 9,
  title: 'Formularis i validació',
  shortTitle: 'Formularis i validació',
  description:
    "Com llegir el que escriu una persona, comprovar que és correcte abans de fer-lo servir i explicar-li amb claredat què ha de corregir.",

  problem: {
    title: "Ja podem completar i eliminar tasques, però encara no en podem crear de noves",
    text: [
      "Al gestor li falta el més bàsic: un camp on escriure una tasca i un botó per afegir-la. Tècnicament ja ho sabem fer, perquè és un formulari amb un listener de `submit`. El problema és un altre.",
      "Fins ara totes les dades les escrivíem nosaltres al codi, i sabíem que eren correctes. A partir del moment que deixem escriure una persona, pot arribar qualsevol cosa: un text buit, només espais, un text de tres-cents caràcters, lletres on esperàvem un número. Un programa no es pot refiar del que rep. Abans de fer servir una dada, l'ha de comprovar.",
    ],
  },

  goals: [
    "Llegir el valor d'un camp de formulari i netejar-lo amb `trim()`.",
    "Validar que un camp no és buit, que té la longitud adequada i que és un nombre.",
    "Mostrar els errors a la pàgina de manera clara i accessible.",
    "Impedir que es facin servir dades incorrectes i deixar el formulari a punt per tornar-hi.",
    "Explicar per què la validació del navegador no substitueix la del servidor.",
  ],

  projectPiece:
    "El gestor rep el seu formulari: es poden crear tasques noves, i si el text és buit o massa llarg apareix un missatge d'error en lloc d'una tasca.",

  finalProject:
    "Validaràs el formulari de comentaris i faràs que el cercador funcioni sense recarregar la pàgina.",

  sections: [
    {
      id: 'llegir-un-input',
      title: 'Seleccionar inputs i llegir-ne el valor',
      blocks: [
        p("Un camp de formulari se selecciona com qualsevol altre element, amb `querySelector`. El que hi ha escrit es llegeix amb la propietat `value`, que ja vam fer servir a la unitat anterior. Hi ha dues coses que cal tenir sempre presents:"),
        list(
          "`value` **sempre és un string**, encara que la persona hi hagi escrit un número i encara que el camp sigui de tipus `number`.",
          "El valor s'ha de llegir **en el moment de l'esdeveniment**, dins del listener. Si el llegeixes en carregar la pàgina, obtindràs el camp buit."
        ),
        example({
          title: 'Llegir un text i un nombre',
          intro: "Escriu un nom i una edat i envia el formulari. Mira també què surt a la consola.",
          html: `<form id="formulari">
  <label for="nom">Nom</label>
  <input type="text" id="nom" autocomplete="off">

  <label for="edat">Edat</label>
  <input type="text" id="edat" autocomplete="off">

  <button type="submit">Envia</button>
</form>
<p id="resultat"></p>`,
          css: CSS_FORM,
          js: `const formulari = document.querySelector("#formulari");
const campNom = document.querySelector("#nom");
const campEdat = document.querySelector("#edat");
const resultat = document.querySelector("#resultat");

formulari.addEventListener("submit", (event) => {
  event.preventDefault();

  const nom = campNom.value;
  const edat = Number(campEdat.value);

  console.log(typeof campEdat.value);
  resultat.textContent = \`Hola, \${nom}. L'any que ve tindràs \${edat + 1} anys.\`;
});`,
          expected: "Amb «Anna» i «19»: `Hola, Anna. L'any que ve tindràs 20 anys.` A la consola, `string`.",
          why: "La consola confirma que el valor del camp és un text. Sense `Number()`, `edat + 1` enganxaria i donaria «191». Ara prova d'enviar el formulari buit, o amb lletres a l'edat: el programa no es queixa, però el resultat no té sentit. Això és el que hem d'arreglar.",
        }),
        concept(
          'Tot el que ve d\'un formulari és text',
          "Abans de fer càlculs amb un valor d'un formulari, converteix-lo amb `Number()`. I abans de fer-lo servir per a qualsevol cosa, comprova que és el que esperaves."
        ),
      ],
    },

    {
      id: 'trim',
      title: 'Netejar el text amb trim()',
      blocks: [
        p("El primer problema amb el text que escriu una persona són els espais. Algú pot prémer la barra espaiadora abans d'escriure, o deixar-ne un al final. I, sobretot, pot escriure *només* espais: un text que sembla buit, però que per a JavaScript no ho és."),
        p("Els strings tenen un mètode per a això: `trim()` retorna el mateix text sense els espais del principi i del final."),
        example({
          title: 'Espais que no es veuen',
          intro: "Dos textos: un amb espais sobrers i un fet només d'espais.",
          js: `const text = "   Estudiar JavaScript   ";

console.log(text.length);
console.log(text.trim());
console.log(text.trim().length);

const nomesEspais = "     ";

console.log(nomesEspais === "");
console.log(nomesEspais.trim() === "");`,
          expected: "`25`, `Estudiar JavaScript`, `19`, `false` i `true`.",
          why: "Cinc espais són un text de cinc caràcters, diferent del text buit. Només després de passar-lo per `trim()` es queda en `\"\"`. Sense aquest pas, una persona podria crear una tasca «en blanc».",
        }),
        concept(
          'Primer trim(), després tota la resta',
          "Acostuma't a escriure `camp.value.trim()` cada vegada que llegeixis un camp de text. Així validaràs i guardaràs el text net, i no el que la persona ha teclejat exactament."
        ),
      ],
    },

    {
      id: 'validar',
      title: 'Validar: camps buits, longitud i nombres',
      blocks: [
        p("**Validar** és comprovar que una dada compleix unes regles abans de fer-la servir. Una bona manera d'organitzar-ho és escriure una funció per a cada camp que rebi el valor i retorni un **missatge d'error**, o un text buit si tot és correcte. És el mateix patró del validador de tasques de la unitat de funcions."),
        example({
          title: 'Validació de nom i correu',
          intro: "Dues funcions de validació, provades amb diversos valors. Quan el resultat és un text buit, vol dir que no hi ha cap error.",
          js: `${FN_VALIDAR_NOM}

${FN_VALIDAR_CORREU}

console.log("Nom buit:", validarNom(""));
console.log("Nom curt:", validarNom("Jo"));
console.log("Nom correcte:", validarNom("Anna"));

console.log("Correu sense arrova:", validarCorreu("anna.example.com"));
console.log("Correu correcte:", validarCorreu("anna@example.com"));`,
          expected: "Tres línies amb un missatge d'error i dues sense res després dels dos punts.",
          why: "Les regles van de la més bàsica a la més específica, amb retorns anticipats. `includes()` és un mètode dels strings que respon `true` o `false`: conté aquest tros de text? Fixa't que les funcions no saben res de la pàgina: reben un text i retornen un text.",
        }),
        p("La comprovació del correu és molt senzilla a propòsit. Validar de veritat una adreça és sorprenentment difícil, i l'única manera segura de saber si existeix és enviar-hi un missatge. Per al nostre nivell, comprovar que té una arrova i un punt ja evita la majoria de descuits."),
        p("Amb els nombres hi ha una dificultat afegida: hem de comprovar que el text es pot convertir. Recorda que `Number(\"hola\")` dona `NaN`. Per detectar-lo hi ha una funció específica, `Number.isNaN()`."),
        example({
          title: 'Validar un nombre',
          intro: "L'edat arriba com a text. La funció el converteix i comprova el resultat.",
          js: `${FN_VALIDAR_EDAT}

console.log("Buit:", validarEdat(""));
console.log("Lletres:", validarEdat("vint"));
console.log("Massa jove:", validarEdat("12"));
console.log("Correcte:", validarEdat("19"));`,
          expected: "Tres missatges d'error diferents i una última línia sense error.",
          why: "Primer es comprova que no sigui buit (perquè `Number(\"\")` dona `0`, no `NaN`, i ens enganyaria). Després es converteix, i només si el resultat és un nombre de veritat es comprova el rang.",
        }),
        warning(
          'NaN no és igual a res, ni a si mateix',
          "La comparació `edat === NaN` dona sempre `false`, fins i tot quan `edat` és `NaN`. És l'únic valor de JavaScript que no és igual a ell mateix. Per això cal `Number.isNaN(edat)`."
        ),
      ],
    },

    {
      id: 'mostrar-errors',
      title: 'Mostrar els errors a la pàgina',
      blocks: [
        p("Saber que una dada és incorrecta no serveix de res si la persona no se n'assabenta. I la consola no compta: ningú que no programi la mirarà mai. L'error ha d'aparèixer **a la pàgina, al costat del camp** que l'ha provocat, i dir clarament què cal fer."),
        p("L'HTML es prepara per endavant: sota cada camp hi ha un paràgraf buit on JavaScript escriurà el missatge quan calgui."),
        code(
          `<label for="nom">Nom</label>
<input type="text" id="nom" aria-describedby="avis-nom">
<p id="avis-nom" class="error" role="alert"></p>`,
          { lang: 'html' }
        ),
        p("En aquestes tres línies hi ha quatre detalls d'accessibilitat que marquen la diferència:"),
        list(
          "El `<label>` està enllaçat amb el camp pel parell `for` i `id`. Sense etiqueta, un lector de pantalla només diria «camp de text».",
          "`aria-describedby` enllaça el camp amb el seu missatge: quan el focus arriba al camp, el lector de pantalla llegeix també l'error.",
          "`role=\"alert\"` fa que el missatge s'anunciï en veu alta en el moment que apareix.",
          "Quan el camp és incorrecte, hi afegim `aria-invalid=\"true\"` des de JavaScript. El CSS l'aprofita per canviar la vora."
        ),
        example({
          title: "Un camp amb el seu missatge d'error",
          intro: "Envia el formulari buit, després amb dues lletres i finalment amb un nom correcte.",
          html: `<form id="formulari" novalidate>
  <label for="nom">Nom</label>
  <input type="text" id="nom" autocomplete="off" aria-describedby="avis-nom">
  <p id="avis-nom" class="error" role="alert"></p>

  <button type="submit">Continua</button>
</form>
<p id="resultat" class="correcte" role="status"></p>`,
          css: CSS_FORM,
          js: `const formulari = document.querySelector("#formulari");
const campNom = document.querySelector("#nom");
const avisNom = document.querySelector("#avis-nom");
const resultat = document.querySelector("#resultat");

${FN_VALIDAR_NOM}

formulari.addEventListener("submit", (event) => {
  event.preventDefault();

  const nom = campNom.value.trim();
  const error = validarNom(nom);

  avisNom.textContent = error;

  if (error !== "") {
    campNom.setAttribute("aria-invalid", "true");
    campNom.focus();
    resultat.textContent = "";
    return;
  }

  campNom.removeAttribute("aria-invalid");
  resultat.textContent = \`Benvinguda, \${nom}!\`;
});`,
          expected: "Amb el camp buit o massa curt, apareix el missatge sota el camp, la vora es torna vermella i el focus hi torna. Amb un nom correcte, l'error desapareix i surt la benvinguda.",
          why: "`avisNom.textContent = error` serveix per als dos casos: si hi ha error l'escriu, i si no n'hi ha (text buit) esborra el que hi hagués d'abans. El `return` talla el listener perquè no es continuï amb una dada incorrecta.",
        }),
        concept(
          'No depenguis només del color',
          "Una vora vermella no la veu tothom igual, i un lector de pantalla no la veu de cap manera. L'error ha de ser sempre un **text** que expliqui què passa. El color i la vora són un reforç."
        ),
      ],
    },

    {
      id: 'evitar-enviament',
      title: "Evitar l'enviament incorrecte",
      blocks: [
        p("Quan un formulari té diversos camps, el listener de `submit` segueix sempre els mateixos passos:"),
        list(
          "Cridar `event.preventDefault()`.",
          "Llegir tots els valors, amb `trim()`.",
          "Validar-los tots i mostrar **tots** els errors alhora, no d'un en un.",
          "Si n'hi ha algun, posar el focus al primer camp incorrecte i sortir amb `return`.",
          "Si tot és correcte, fer servir les dades."
        ),
        example({
          title: 'Formulari de registre',
          intro: "Tres camps, cadascun amb la seva funció de validació. Prova d'enviar-lo buit per veure tots els errors de cop.",
          html: HTML_REGISTRE,
          css: CSS_FORM,
          js: `const formulari = document.querySelector("#registre");
const campNom = document.querySelector("#nom");
const campCorreu = document.querySelector("#correu");
const campEdat = document.querySelector("#edat");
const avisNom = document.querySelector("#avis-nom");
const avisCorreu = document.querySelector("#avis-correu");
const avisEdat = document.querySelector("#avis-edat");
const resultat = document.querySelector("#resultat");

${FN_VALIDAR_NOM}

${FN_VALIDAR_CORREU}

${FN_VALIDAR_EDAT}

${FN_MOSTRAR_ERROR}

formulari.addEventListener("submit", (event) => {
  event.preventDefault();

  const nom = campNom.value.trim();
  const correu = campCorreu.value.trim();
  const edat = campEdat.value.trim();

  const errorNom = validarNom(nom);
  const errorCorreu = validarCorreu(correu);
  const errorEdat = validarEdat(edat);

  mostrarError(campNom, avisNom, errorNom);
  mostrarError(campCorreu, avisCorreu, errorCorreu);
  mostrarError(campEdat, avisEdat, errorEdat);

  resultat.textContent = "";

  if (errorNom !== "") {
    campNom.focus();
    return;
  }
  if (errorCorreu !== "") {
    campCorreu.focus();
    return;
  }
  if (errorEdat !== "") {
    campEdat.focus();
    return;
  }

  resultat.textContent = \`Registre correcte. Benvinguda, \${nom}!\`;
});`,
          expected: "Buit: tres errors i el focus al nom. Si corregeixes un camp i tornes a enviar, el seu error desapareix i el focus va al següent camp incorrecte.",
          why: "`mostrarError` fa la mateixa feina per als tres camps: escriure (o esborrar) el missatge i posar (o treure) `aria-invalid`. Mostrar tots els errors alhora estalvia a la persona haver d'enviar el formulari tres vegades per descobrir-los d'un en un.",
        }),
      ],
    },

    {
      id: 'netejar',
      title: 'Netejar el formulari',
      blocks: [
        p("Quan les dades s'han acceptat, el formulari ha de quedar a punt per tornar-lo a fer servir. Hi ha tres operacions que acostumen a anar juntes:"),
        table(
          ['Vull…', 'Com es fa'],
          [
            ['Buidar un camp', '`camp.value = ""`'],
            ['Buidar tots els camps del formulari', '`formulari.reset()`'],
            ['Tornar el cursor a un camp', '`camp.focus()`'],
          ],
          'Deixar el formulari a punt'
        ),
        p("`reset()` torna tots els camps al valor que tenien a l'HTML, que normalment és buit. I `focus()` és un petit detall que es nota molt: després d'afegir una tasca, el cursor torna al camp i es pot escriure la següent sense tocar el ratolí."),
        warning(
          'reset() no esborra els teus missatges d\'error',
          "`reset()` només afecta els camps. Els paràgrafs d'error i els atributs `aria-invalid` els has posat tu, i ets tu qui els ha de treure."
        ),
      ],
    },

    {
      id: 'client-i-servidor',
      title: 'Validació de client i validació de servidor',
      blocks: [
        p("Tot el que hem fet en aquesta unitat s'executa al navegador de la persona, i per això se'n diu **validació de client**. És important entendre què aconsegueix i què no."),
        p("El codi JavaScript d'una pàgina es pot veure, modificar i desactivar des de les eines de desenvolupament del navegador. Qualsevol persona amb una mica d'interès pot saltar-se les teves comprovacions i enviar al servidor les dades que vulgui."),
        table(
          ['Aspecte', 'Validació de client', 'Validació de servidor'],
          [
            ['On s\'executa', 'Al navegador', 'Al servidor'],
            ['Serveix per a', 'Ajudar: avisa a l\'instant, sense esperes', 'Protegir: garanteix que les dades són correctes'],
            ['Es pot saltar?', 'Sí, fàcilment', 'No'],
            ['És obligatòria?', 'Molt recomanable', 'Sempre'],
          ],
          'Dues validacions amb objectius diferents'
        ),
        concept(
          'La validació de client és comoditat, no seguretat',
          "Valida al client perquè fer servir l'aplicació sigui agradable. Valida al servidor perquè les dades siguin fiables. Quan una aplicació guarda dades en un servidor, cal fer totes dues coses, i mai només la primera."
        ),
        p("L'HTML també porta la seva pròpia validació: atributs com `required`, `minlength`, `maxlength` o `type=\"email\"` fan que el navegador comprovi el camp i mostri un avís. És útil i no costa res, però té les mateixes limitacions: els missatges i l'aspecte canvien d'un navegador a un altre, i els atributs es poden esborrar des de les eines de desenvolupament amb dos clics."),
        p("Quan fem la validació nosaltres amb JavaScript, com en aquesta unitat, afegim l'atribut `novalidate` al `<form>` perquè els avisos del navegador no se sobreposin als nostres."),
        warning(
          'No confiïs només en la validació del navegador',
          "Un `required` a l'HTML no garanteix que el valor arribi ple. Tracta'l com una ajuda per a la persona, i comprova sempre les dades al teu codi."
        ),
      ],
    },

    {
      id: 'formulari-de-tasques',
      title: 'El formulari per crear tasques',
      blocks: [
        p("Ja ho tenim tot per donar al gestor la peça que li faltava. El formulari té un sol camp, i el listener segueix exactament els passos que hem vist: llegir amb `trim()`, validar, mostrar l'error o afegir la tasca, i deixar el camp a punt."),
        example({
          title: 'Crear tasques amb validació',
          intro: "Prova d'afegir una tasca buida, una feta només d'espais i una de correcta.",
          html: `<h1>Les meves tasques</h1>

<form id="formulari" novalidate>
  <label for="text-tasca">Nova tasca</label>
  <input type="text" id="text-tasca" autocomplete="off" aria-describedby="error-tasca">
  <p id="error-tasca" class="error" role="alert"></p>
  <button type="submit">Afegeix</button>
</form>

<ul id="llista"></ul>`,
          css: CSS_FORM,
          js: `const tasques = [
  { id: 1, text: "Estudiar JavaScript", completada: false }
];
let seguentId = 2;

const formulari = document.querySelector("#formulari");
const inputTasca = document.querySelector("#text-tasca");
const errorTasca = document.querySelector("#error-tasca");
const llista = document.querySelector("#llista");

function validarTasca(text) {
  if (text === "") {
    return "Escriu el text de la tasca.";
  }
  if (text.length > 60) {
    return "El text és massa llarg (màxim 60 caràcters).";
  }
  return "";
}

function renderitzar() {
  llista.innerHTML = "";

  for (const tasca of tasques) {
    const element = document.createElement("li");
    element.textContent = tasca.text;
    llista.append(element);
  }
}

formulari.addEventListener("submit", (event) => {
  event.preventDefault();

  const text = inputTasca.value.trim();
  const error = validarTasca(text);

  if (error !== "") {
    errorTasca.textContent = error;
    inputTasca.setAttribute("aria-invalid", "true");
    inputTasca.focus();
    return;
  }

  errorTasca.textContent = "";
  inputTasca.removeAttribute("aria-invalid");

  tasques.push({ id: seguentId, text: text, completada: false });
  seguentId++;

  inputTasca.value = "";
  inputTasca.focus();
  renderitzar();
});

renderitzar();`,
          expected: "Un text buit o d'espais mostra el missatge d'error i no afegeix res. Un text correcte apareix a la llista, el camp es buida i el cursor hi torna.",
          why: "El text que s'afegeix a la llista es posa amb `textContent`, de manera que si algú escriu etiquetes HTML es mostren com a text i no s'executen. La validació decideix; l'array rep la dada; `renderitzar` pinta. Cada part fa una sola cosa.",
        }),
        project(
          "Amb aquest formulari, el gestor ja té totes les peces: dades en un array d'objectes, funcions per modificar-les, una funció que les pinta, esdeveniments que connecten la persona amb les dades i una validació que filtra el que entra. Abans d'aplicar tot això al projecte final, que serà una pàgina diferent, dedicarem una unitat a una habilitat que necessitaràs molt quan el codi creixi: trobar els errors.",
          { title: 'El gestor ja pot créixer' }
        ),
      ],
    },
  ],

  commonErrors: [
    {
      title: 'Fer càlculs amb un valor sense convertir-lo',
      bad: `const edat = campEdat.value;
const anyVinent = edat + 1;

console.log(anyVinent); // "191"`,
      why: "`value` és un string, i amb strings el `+` enganxa. No hi ha cap error, i el resultat sembla un número: per això pot passar desapercebut fins que algú veu una edat de 191 anys.",
      fix: `const edat = Number(campEdat.value);
const anyVinent = edat + 1;

console.log(anyVinent); // 20`,
    },
    {
      title: 'Validar sense treure els espais',
      bad: `const text = camp.value;

if (text === "") {
  mostrarError("El camp és obligatori.");
}`,
      why: "Un text fet només d'espais no és igual a `\"\"`, de manera que passa la validació i acaba creant una tasca en blanc. Cal netejar-lo abans de comprovar-lo.",
      fix: `const text = camp.value.trim();

if (text === "") {
  mostrarError("El camp és obligatori.");
}`,
    },
    {
      title: 'Comparar amb NaN fent servir ===',
      bad: `const edat = Number(campEdat.value);

if (edat === NaN) {
  mostrarError("L'edat ha de ser un nombre.");
}`,
      why: "`NaN` no és igual a res, ni tan sols a si mateix: la condició és sempre falsa i l'error no es mostra mai. Per saber si un valor és `NaN` cal la funció `Number.isNaN()`.",
      fix: `const edat = Number(campEdat.value);

if (Number.isNaN(edat)) {
  mostrarError("L'edat ha de ser un nombre.");
}`,
    },
    {
      title: "No esborrar l'error quan el camp ja és correcte",
      bad: `if (error !== "") {
  avis.textContent = error;
  return;
}

afegirTasca(text);`,
      why: "Quan la persona corregeix el camp i torna a enviar, la tasca s'afegeix però el missatge d'error antic continua a la pantalla, dient que hi ha un problema que ja no existeix.",
      fix: `if (error !== "") {
  avis.textContent = error;
  return;
}

avis.textContent = "";
afegirTasca(text);`,
    },
    {
      title: "Llegir value en una casella de verificació",
      bad: `if (casellaCondicions.value) {
  registrar();
}`,
      why: "El `value` d'una casella és un text fix (per defecte, `\"on\"`), tant si està marcada com si no. Com que és un text no buit, la condició es compleix sempre. L'estat de la casella és a la propietat `checked`.",
      fix: `if (casellaCondicions.checked) {
  registrar();
}`,
    },
    {
      title: "Refiar-se només de l'atribut required",
      badLang: 'html',
      bad: `<input type="text" id="tasca" required>`,
      why: "`required` impedeix enviar el camp buit, però accepta un text fet d'espais i es pot treure des de les eines de desenvolupament. És una bona ajuda, però no substitueix la comprovació al codi.",
      fix: `const text = campTasca.value.trim();

if (text === "") {
  // mostrar l'error i no continuar
}`,
    },
  ],

  exercises: [
    {
      id: 'saluda-nom',
      title: 'Saluda pel nom',
      statement: "Quan s'enviï el formulari, mostra «Hola, *nom*!» al paràgraf `#missatge`. Si el camp és buit o només té espais, mostra-hi «Escriu el teu nom.».",
      expected: "Amb «  Anna  »: `Hola, Anna!` (sense espais sobrers). Amb el camp buit o ple d'espais: `Escriu el teu nom.`",
      html: `<form id="formulari" novalidate>
  <label for="nom">Com et dius?</label>
  <input type="text" id="nom" autocomplete="off">
  <button type="submit">Saluda'm</button>
</form>
<p id="missatge" role="status"></p>`,
      css: CSS_FORM,
      starter: `const formulari = document.querySelector("#formulari");
const campNom = document.querySelector("#nom");
const missatge = document.querySelector("#missatge");

formulari.addEventListener("submit", (event) => {
  // 1. Evita que la pàgina es recarregui

  // 2. Llegeix el nom, sense espais sobrers

  // 3. Mostra la salutació o l'avís
});`,
      hint: "Llegeix el valor amb `campNom.value.trim()` i compara'l amb `\"\"`. Un `if` i un `else` decideixen quin dels dos textos s'escriu.",
      solution: `const formulari = document.querySelector("#formulari");
const campNom = document.querySelector("#nom");
const missatge = document.querySelector("#missatge");

formulari.addEventListener("submit", (event) => {
  // 1. Evita que la pàgina es recarregui
  event.preventDefault();

  // 2. Llegeix el nom, sense espais sobrers
  const nom = campNom.value.trim();

  // 3. Mostra la salutació o l'avís
  if (nom === "") {
    missatge.textContent = "Escriu el teu nom.";
  } else {
    missatge.textContent = \`Hola, \${nom}!\`;
  }
});`,
      explanation: "Els tres passos apareixeran en tots els formularis que facis: evitar la recàrrega, llegir net i decidir. Gràcies a `trim()`, un nom envoltat d'espais es mostra bé i un camp ple d'espais es tracta com a buit.",
    },
    {
      id: 'valida-edat',
      title: "Valida l'edat",
      statement: "Completa la funció `validarEdat` perquè retorni el missatge que toqui: «L'edat és obligatòria.» si és buida, «L'edat ha de ser un nombre.» si no es pot convertir, «Has de tenir almenys 16 anys.» si és inferior a 16, i un text buit si és correcta.",
      expected: "Buit, «abc» i «12» mostren cadascun el seu error. «19» mostra `Edat correcta: 19 anys.`",
      html: `<form id="formulari" novalidate>
  <label for="edat">Edat</label>
  <input type="text" id="edat" autocomplete="off" aria-describedby="missatge">
  <button type="submit">Comprova</button>
</form>
<p id="missatge" role="alert"></p>`,
      css: CSS_FORM,
      starter: `const formulari = document.querySelector("#formulari");
const campEdat = document.querySelector("#edat");
const missatge = document.querySelector("#missatge");

function validarEdat(text) {
  // Retorna el missatge d'error que toqui, o "" si és correcta

}

formulari.addEventListener("submit", (event) => {
  event.preventDefault();

  const text = campEdat.value.trim();
  const error = validarEdat(text);

  if (error !== "") {
    missatge.textContent = error;
  } else {
    missatge.textContent = \`Edat correcta: \${text} anys.\`;
  }
});`,
      hint: "L'ordre importa: primer el cas buit, després la conversió amb `Number()` i `Number.isNaN()`, i al final el rang. Cada regla, amb el seu `return`.",
      solution: `const formulari = document.querySelector("#formulari");
const campEdat = document.querySelector("#edat");
const missatge = document.querySelector("#missatge");

function validarEdat(text) {
  if (text === "") {
    return "L'edat és obligatòria.";
  }

  const edat = Number(text);

  if (Number.isNaN(edat)) {
    return "L'edat ha de ser un nombre.";
  }
  if (edat < 16) {
    return "Has de tenir almenys 16 anys.";
  }
  return "";
}

formulari.addEventListener("submit", (event) => {
  event.preventDefault();

  const text = campEdat.value.trim();
  const error = validarEdat(text);

  if (error !== "") {
    missatge.textContent = error;
  } else {
    missatge.textContent = \`Edat correcta: \${text} anys.\`;
  }
});`,
      explanation: "El cas buit s'ha de comprovar abans de convertir, perquè `Number(\"\")` dona `0` i no `NaN`: sense aquesta primera regla, un camp buit rebria el missatge «Has de tenir almenys 16 anys», que no és el que ha passat.",
    },
    {
      id: 'contrasenyes',
      title: 'Dues contrasenyes que han de coincidir',
      statement: "En un formulari de registre es demana la contrasenya dues vegades. Valida que tingui almenys 8 caràcters («La contrasenya ha de tenir almenys 8 caràcters.») i que les dues coincideixin («Les contrasenyes no coincideixen.»). Si tot és correcte, mostra «Contrasenya acceptada.» i buida el formulari.",
      expected: "Una contrasenya curta o dues de diferents mostren el seu error. Dues d'iguals i prou llargues mostren el missatge d'èxit i buiden els camps.",
      html: `<form id="formulari" novalidate>
  <label for="clau">Contrasenya</label>
  <input type="password" id="clau" aria-describedby="error">

  <label for="repeticio">Repeteix la contrasenya</label>
  <input type="password" id="repeticio" aria-describedby="error">

  <p id="error" class="error" role="alert"></p>
  <button type="submit">Crea el compte</button>
</form>
<p id="resultat" class="correcte" role="status"></p>`,
      css: CSS_FORM,
      starter: `const formulari = document.querySelector("#formulari");
const campClau = document.querySelector("#clau");
const campRepeticio = document.querySelector("#repeticio");
const error = document.querySelector("#error");
const resultat = document.querySelector("#resultat");

formulari.addEventListener("submit", (event) => {
  event.preventDefault();
  resultat.textContent = "";

  const clau = campClau.value;
  const repeticio = campRepeticio.value;

  // Comprova les dues regles i mostra l'error o el missatge d'èxit
});`,
      hint: [
        "Aquí no fem `trim()`: en una contrasenya, els espais poden ser volguts.",
        "Fes servir un `if` amb `return` per a cada error. Si s'arriba al final, tot és correcte: esborra l'error, mostra l'èxit i crida `formulari.reset()`.",
      ],
      solution: `const formulari = document.querySelector("#formulari");
const campClau = document.querySelector("#clau");
const campRepeticio = document.querySelector("#repeticio");
const error = document.querySelector("#error");
const resultat = document.querySelector("#resultat");

formulari.addEventListener("submit", (event) => {
  event.preventDefault();
  resultat.textContent = "";

  const clau = campClau.value;
  const repeticio = campRepeticio.value;

  if (clau.length < 8) {
    error.textContent = "La contrasenya ha de tenir almenys 8 caràcters.";
    campClau.focus();
    return;
  }

  if (clau !== repeticio) {
    error.textContent = "Les contrasenyes no coincideixen.";
    campRepeticio.focus();
    return;
  }

  error.textContent = "";
  resultat.textContent = "Contrasenya acceptada.";
  formulari.reset();
});`,
      explanation: "Aquesta validació compara dos camps entre ells, i per això no es pot resoldre amb atributs d'HTML: cal JavaScript. Fixa't que cada error porta el focus al camp que s'ha de corregir, i que en el cas correcte s'esborra el missatge d'error abans de mostrar l'èxit.",
    },
    {
      id: 'llista-compra-form',
      title: 'La llista de la compra',
      statement: "Fes que el formulari afegeixi productes a la llista. Si el text és buit, mostra «Escriu un producte.» i no afegeixis res. Si és correcte, afegeix-lo, esborra l'error, buida el camp i torna-hi el cursor.",
      expected: "Cada producte vàlid apareix a la llista i el camp queda buit i amb el cursor a punt. Un text buit mostra l'error.",
      html: `<form id="formulari" novalidate>
  <label for="producte">Producte</label>
  <input type="text" id="producte" autocomplete="off" aria-describedby="error">
  <p id="error" class="error" role="alert"></p>
  <button type="submit">Afegeix</button>
</form>
<ul id="llista"></ul>`,
      css: CSS_FORM,
      starter: `const formulari = document.querySelector("#formulari");
const campProducte = document.querySelector("#producte");
const error = document.querySelector("#error");
const llista = document.querySelector("#llista");

formulari.addEventListener("submit", (event) => {
  event.preventDefault();

  const text = campProducte.value.trim();

  // Si és buit: error i sortir

  // Si és correcte: crea un <li>, afegeix-lo i deixa el camp a punt
});`,
      hint: "El cas d'error acaba amb `return`. En el cas correcte hi ha cinc coses a fer: esborrar l'error, crear el `<li>`, posar-li el text, afegir-lo i netejar el camp amb `value = \"\"` i `focus()`.",
      solution: `const formulari = document.querySelector("#formulari");
const campProducte = document.querySelector("#producte");
const error = document.querySelector("#error");
const llista = document.querySelector("#llista");

formulari.addEventListener("submit", (event) => {
  event.preventDefault();

  const text = campProducte.value.trim();

  // Si és buit: error i sortir
  if (text === "") {
    error.textContent = "Escriu un producte.";
    campProducte.focus();
    return;
  }

  // Si és correcte: crea un <li>, afegeix-lo i deixa el camp a punt
  error.textContent = "";

  const element = document.createElement("li");
  element.textContent = text;
  llista.append(element);

  campProducte.value = "";
  campProducte.focus();
});`,
      explanation: "En aquest exercici els elements s'afegeixen directament a la pàgina, sense array, perquè la llista no s'ha de modificar després. Al gestor de tasques no ho podem fer així: allà les dades viuen en un array i la pàgina es genera a partir d'elles.",
    },
  ],

  finalExercise: {
    id: 'registre-complet',
    title: 'El formulari de registre complet',
    statement: [
      "Al formulari de registre de la unitat s'hi ha afegit una casella per acceptar les condicions. Les tres funcions de validació i `mostrarError` ja estan escrites. Completa el listener de `submit`.",
      "Ha de mostrar tots els errors alhora, cadascun sota el seu camp. Si la casella no està marcada, l'error és «Has d'acceptar les condicions.». El focus ha d'anar al primer camp incorrecte. Si tot és correcte, mostra «Registre correcte. Benvinguda, *nom*!» i buida el formulari.",
    ],
    expected: "Enviat buit: quatre errors i el focus al nom. Amb totes les dades correctes i la casella marcada: el missatge d'èxit i el formulari buit.",
    html: `<form id="registre" novalidate>
  <label for="nom">Nom</label>
  <input type="text" id="nom" autocomplete="off" aria-describedby="avis-nom">
  <p id="avis-nom" class="error" role="alert"></p>

  <label for="correu">Correu electrònic</label>
  <input type="text" id="correu" autocomplete="off" aria-describedby="avis-correu">
  <p id="avis-correu" class="error" role="alert"></p>

  <label for="edat">Edat</label>
  <input type="text" id="edat" autocomplete="off" aria-describedby="avis-edat">
  <p id="avis-edat" class="error" role="alert"></p>

  <p>
    <input type="checkbox" id="condicions" aria-describedby="avis-condicions">
    <label for="condicions" class="en-linia">Accepto les condicions</label>
  </p>
  <p id="avis-condicions" class="error" role="alert"></p>

  <button type="submit">Registra'm</button>
</form>
<p id="resultat" class="correcte" role="status"></p>`,
    css: `${CSS_FORM}

.en-linia {
  display: inline;
  font-weight: 400;
}`,
    starter: `const formulari = document.querySelector("#registre");
const campNom = document.querySelector("#nom");
const campCorreu = document.querySelector("#correu");
const campEdat = document.querySelector("#edat");
const casella = document.querySelector("#condicions");
const avisNom = document.querySelector("#avis-nom");
const avisCorreu = document.querySelector("#avis-correu");
const avisEdat = document.querySelector("#avis-edat");
const avisCondicions = document.querySelector("#avis-condicions");
const resultat = document.querySelector("#resultat");

${FN_VALIDAR_NOM}

${FN_VALIDAR_CORREU}

${FN_VALIDAR_EDAT}

${FN_MOSTRAR_ERROR}

formulari.addEventListener("submit", (event) => {
  event.preventDefault();
  resultat.textContent = "";

  // 1. Llegeix els tres valors (amb trim) i calcula els quatre errors

  // 2. Mostra tots els errors

  // 3. Posa el focus al primer camp incorrecte i surt

  // 4. Tot correcte: missatge d'èxit i formulari buit
});`,
    hint: [
      "L'error de la casella no necessita cap funció: és un text o un altre segons `casella.checked`. Declara'l amb `let errorCondicions = \"\";` i canvia'l dins d'un `if`.",
      "`mostrarError` serveix també per a la casella: `mostrarError(casella, avisCondicions, errorCondicions)`.",
    ],
    solution: `const formulari = document.querySelector("#registre");
const campNom = document.querySelector("#nom");
const campCorreu = document.querySelector("#correu");
const campEdat = document.querySelector("#edat");
const casella = document.querySelector("#condicions");
const avisNom = document.querySelector("#avis-nom");
const avisCorreu = document.querySelector("#avis-correu");
const avisEdat = document.querySelector("#avis-edat");
const avisCondicions = document.querySelector("#avis-condicions");
const resultat = document.querySelector("#resultat");

${FN_VALIDAR_NOM}

${FN_VALIDAR_CORREU}

${FN_VALIDAR_EDAT}

${FN_MOSTRAR_ERROR}

formulari.addEventListener("submit", (event) => {
  event.preventDefault();
  resultat.textContent = "";

  // 1. Llegeix els tres valors (amb trim) i calcula els quatre errors
  const nom = campNom.value.trim();
  const correu = campCorreu.value.trim();
  const edat = campEdat.value.trim();

  const errorNom = validarNom(nom);
  const errorCorreu = validarCorreu(correu);
  const errorEdat = validarEdat(edat);

  let errorCondicions = "";
  if (!casella.checked) {
    errorCondicions = "Has d'acceptar les condicions.";
  }

  // 2. Mostra tots els errors
  mostrarError(campNom, avisNom, errorNom);
  mostrarError(campCorreu, avisCorreu, errorCorreu);
  mostrarError(campEdat, avisEdat, errorEdat);
  mostrarError(casella, avisCondicions, errorCondicions);

  // 3. Posa el focus al primer camp incorrecte i surt
  if (errorNom !== "") {
    campNom.focus();
    return;
  }
  if (errorCorreu !== "") {
    campCorreu.focus();
    return;
  }
  if (errorEdat !== "") {
    campEdat.focus();
    return;
  }
  if (errorCondicions !== "") {
    casella.focus();
    return;
  }

  // 4. Tot correcte: missatge d'èxit i formulari buit
  resultat.textContent = \`Registre correcte. Benvinguda, \${nom}!\`;
  formulari.reset();
});`,
    explanation: [
      "El listener és llarg, però no és complicat: són els cinc passos de sempre, aplicats a quatre camps. Les regles de cada camp viuen a la seva funció, i `mostrarError` evita repetir quatre vegades la mateixa lògica.",
      "L'estat d'una casella es llegeix amb `checked`, no amb `value`. I el missatge d'èxit es construeix **abans** de cridar `reset()`, tot i que aquí no caldria, perquè `nom` ja és una còpia del valor: és un bon costum per no dependre de camps que estàs a punt de buidar.",
    ],
  },

  summary: [
    "El valor d'un camp es llegeix amb `value`, dins del listener, i **sempre és un string**. L'estat d'una casella es llegeix amb `checked`.",
    "`trim()` treu els espais del principi i del final. Fes-lo servir sempre abans de validar un text.",
    "Cada regla de validació és una funció que retorna un missatge d'error, o un text buit si tot és correcte.",
    "Per validar un nombre: `Number()` i després `Number.isNaN()`.",
    "Els errors es mostren a la pàgina, al costat del camp, amb text clar, `aria-describedby`, `role=\"alert\"` i `aria-invalid`.",
    "Al listener de `submit`: `preventDefault()`, llegir, validar, mostrar tots els errors, sortir si n'hi ha, i si no, fer servir les dades i netejar.",
    "La validació de client fa l'aplicació còmoda; la de servidor la fa segura. Una no substitueix l'altra.",
  ],

  quiz: [
    {
      question: "Una persona escriu 25 en un camp `<input type=\"number\">`. De quin tipus és `camp.value`?",
      options: [
        { text: 'String: `"25"`', correct: true },
        { text: 'Number: `25`', why: "El tipus del camp limita el que es pot escriure, però `value` continua sent un text." },
        { text: 'Depèn del navegador', why: "Tots els navegadors es comporten igual: `value` és sempre un string." },
        { text: '`undefined`, fins que s\'envia el formulari', why: "`value` conté en tot moment el que hi ha escrit al camp." },
      ],
      explanation: "`value` sempre és un string. Per fer-hi càlculs cal convertir-lo amb `Number()`.",
    },
    {
      question: "Què retorna `\"  hola  \".trim()`?",
      options: [
        { text: '`"hola"`', correct: true },
        { text: '`"hola  "`', why: "`trim()` treu els espais dels dos extrems, no només els del principi." },
        { text: '`"  hola"`', why: "`trim()` treu els espais dels dos extrems, no només els del final." },
        { text: '`""`', why: "Només s'eliminen els espais dels extrems. El text del mig es conserva." },
      ],
      explanation: "`trim()` retorna el text sense els espais del principi ni del final.",
    },
    {
      question: "Per què no n'hi ha prou amb validar les dades amb JavaScript al navegador?",
      options: [
        { text: "Perquè aquest codi s'executa a l'ordinador de l'usuari, que el pot modificar o saltar-se'l.", correct: true },
        { text: "Perquè JavaScript no pot comprovar la longitud d'un text.", why: "Sí que pot: `text.length` és una de les comprovacions més habituals." },
        { text: "Perquè la validació amb JavaScript només funciona en alguns navegadors.", why: "Funciona a tots. El problema no és de compatibilitat, sinó de confiança." },
        { text: "Perquè no pot mostrar missatges d'error a la pàgina.", why: "Precisament serveix per a això: avisar a l'instant, a la mateixa pàgina." },
      ],
      explanation: "La validació de client millora l'experiència, però qualsevol la pot esquivar. Les dades s'han de tornar a validar al servidor, que és l'únic lloc que controlem.",
    },
    {
      question: "Quin atribut enllaça un camp amb el seu missatge d'error perquè un lector de pantalla el llegeixi?",
      options: [
        { text: '`aria-describedby`', correct: true },
        { text: '`class`', why: "`class` serveix per als estils. Els lectors de pantalla no la interpreten." },
        { text: '`placeholder`', why: "`placeholder` és un text d'exemple dins del camp, que desapareix en escriure." },
        { text: '`name`', why: "`name` identifica el camp quan s'envien les dades, però no el relaciona amb cap missatge." },
      ],
      explanation: "`aria-describedby` conté l'`id` de l'element que descriu el camp. Quan el focus hi arriba, el lector de pantalla llegeix també aquell text.",
    },
    {
      question: "Com se sap si una casella de verificació (`<input type=\"checkbox\">`) està marcada?",
      options: [
        { text: '`casella.checked`', correct: true },
        { text: '`casella.value`', why: "`value` és un text fix (per defecte `\"on\"`) que no canvia en marcar o desmarcar la casella." },
        { text: '`casella.textContent`', why: "Una casella no té text a dins: `textContent` és buit." },
        { text: '`casella.selected`', why: "`selected` és una propietat de les opcions d'un desplegable, no de les caselles." },
      ],
      explanation: "`checked` és un booleà: `true` si la casella està marcada i `false` si no.",
    },
  ],
};
