import { p, list, steps, code, example, concept, warning, project, table, compare } from '../blocks.js';

const CSS_GESTOR = `label {
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
}

.error {
  min-height: 1.4em;
  margin: 4px 0 0;
  font-weight: 600;
  color: #b3261e;
}`;

const HTML_GESTOR = `<h1>Les meves tasques</h1>

<form id="formulari" novalidate>
  <label for="text-tasca">Nova tasca</label>
  <input type="text" id="text-tasca" autocomplete="off" aria-describedby="error-tasca">
  <p id="error-tasca" class="error" role="alert"></p>
  <button type="submit">Afegeix</button>
</form>

<ul id="llista"></ul>
<p id="comptador"></p>`;

export default {
  id: 'depuracio',
  number: 10,
  title: 'Depuració i bones pràctiques',
  shortTitle: 'Depuració i bones pràctiques',
  description:
    "Com trobar un error sense anar a cegues, i com escriure codi que en tingui menys: noms clars, funcions petites i cada cosa al seu lloc.",

  problem: {
    title: "L'aplicació creix, i els errors també",
    text: [
      "Ja tens totes les peces per fer una aplicació sencera, i a la unitat següent ho faràs: el projecte final. Quan les ajuntis, el programa tindrà més de cent línies, i és segur que alguna cosa no funcionarà a la primera. No perquè ho facis malament: és el que li passa a tothom que programa, cada dia.",
      "La diferència entre qui s'encalla una tarda sencera i qui ho resol en cinc minuts no és el talent: és el mètode. Davant d'un «no funciona», pots començar a canviar coses a veure què passa, o pots investigar com ho faria un detectiu. Aquesta unitat va de la segona manera, i de com escriure codi que doni menys feina a l'hora de buscar-hi errors.",
    ],
  },

  goals: [
    "Distingir entre errors de sintaxi, d'execució i de lògica.",
    "Interpretar un missatge d'error de la consola i localitzar-ne l'origen.",
    "Investigar el valor de les variables amb `console.log`, `console.table` i breakpoints.",
    "Seguir un mètode ordenat per trobar i corregir un error.",
    "Aplicar bones pràctiques: noms descriptius, funcions petites, sense duplicació i amb les capes separades.",
  ],

  projectPiece:
    "Abans de muntar el projecte, guanyes les eines per mantenir-lo: sabràs què fer quan alguna cosa falli i quines normes seguir perquè el codi continuï sent llegible quan creixi.",

  finalProject:
    "Amb dues pàgines i tres fitxers de JavaScript, llegir bé la consola serà el que et farà avançar.",

  sections: [
    {
      id: 'tres-tipus-d-errors',
      title: "Tres tipus d'errors",
      blocks: [
        p("No tots els errors són iguals, i el primer pas per trobar-ne un és saber de quina mena és. N'hi ha de tres tipus, i cadascun es busca d'una manera diferent."),
        table(
          ['Tipus', 'Què passa', 'Quan es detecta', 'Qui t\'avisa'],
          [
            ['**De sintaxi**', 'El codi està mal escrit', 'Abans d\'executar res', 'La consola (i l\'editor)'],
            ['**D\'execució**', 'Una instrucció no es pot dur a terme', 'Quan s\'arriba a aquella línia', 'La consola'],
            ['**De lògica**', 'El programa fa una cosa diferent de la que volies', 'Quan mires el resultat', 'Ningú'],
          ],
          "Els tres tipus d'errors"
        ),
        example({
          title: 'Un error de sintaxi',
          intro: "Falta un parèntesi. Fixa't en si arriba a sortir el primer missatge.",
          js: `console.log("Inici del programa");

const nota = 7;

if (nota >= 5 {
  console.log("Aprovat");
}`,
          expected: "Només un `SyntaxError` a la línia 5. El missatge «Inici del programa» no surt.",
          why: "El navegador revisa tot el fitxer abans de començar. Si no el pot entendre, no executa cap línia. Són els errors més fàcils: la consola diu la línia i l'editor acostuma a marcar-los en vermell mentre escrius.",
        }),
        example({
          title: "Un error d'execució",
          intro: "El codi està ben escrit, però una de les línies demana una cosa impossible.",
          js: `const tasques = [
  { id: 1, text: "Estudiar" },
  { id: 2, text: "Comprar" }
];

console.log(tasques[0].text);
console.log(tasques[2].text);
console.log("Fi del programa");`,
          expected: "`Estudiar`, i després un `TypeError` a la línia 7. L'últim missatge no surt.",
          why: "L'array només té les posicions 0 i 1. `tasques[2]` és `undefined`, i a `undefined` no se li pot demanar la propietat `text`. El programa s'executa fins que topa amb el problema, i allà s'atura.",
        }),
        example({
          title: 'Un error de lògica',
          intro: "Aquest programa calcula la mitjana de tres notes: 7, 8 i 6. La mitjana correcta és 7.",
          js: `const notes = [7, 8, 6];
let suma = 0;

for (let i = 1; i < notes.length; i++) {
  suma += notes[i];
}

console.log(\`Mitjana: \${suma / notes.length}\`);`,
          expected: "`Mitjana: 4.666666666666667`, sense cap missatge d'error.",
          why: "La consola no es queixa perquè el codi és vàlid i totes les instruccions es poden executar. Però el bucle comença a 1 i se salta la primera nota. Canvia l'`1` per un `0` i torna'l a executar.",
        }),
        concept(
          "L'ordinador fa el que li dius, no el que vols",
          "Els errors de lògica són els més difícils perquè ningú t'avisa: el programa funciona, però malament. L'única manera de detectar-los és **comprovar els resultats**, sabent per endavant quin hauria de ser el correcte."
        ),
      ],
    },

    {
      id: 'llegir-la-consola',
      title: 'Llegir la consola',
      blocks: [
        p("Quan hi ha un error de sintaxi o d'execució, la consola et dona més informació de la que sembla. Val la pena aprendre a llegir-la sencera."),
        code(
          `Uncaught TypeError: Cannot read properties of undefined (reading 'text')
    at crearElementTasca (app.js:12:23)
    at renderitzar (app.js:27:18)
    at app.js:40:1`,
          { lang: 'text', title: 'Consola' }
        ),
        list(
          "**El tipus** (`TypeError`) et diu la categoria de l'error.",
          "**El missatge** explica què ha passat: s'ha intentat llegir la propietat `text` d'una cosa que era `undefined`.",
          "**La primera línia de sota** diu on ha passat exactament: a la funció `crearElementTasca`, línia 12 del fitxer `app.js`.",
          "**Les línies següents** expliquen el camí: `crearElementTasca` l'havia cridada `renderitzar` des de la línia 27, que al seu torn s'havia cridat des de la línia 40."
        ),
        p("Els missatges són en anglès i fan servir sempre les mateixes fórmules. Amb aquestes sis en tens prou per entendre la gran majoria dels errors que veuràs:"),
        table(
          ['Missatge', 'Què vol dir', 'On has de mirar'],
          [
            ['`x is not defined`', 'Fas servir un nom que no existeix', "L'ortografia del nom, i si és una variable local d'una altra funció"],
            ["`Cannot read properties of undefined (reading 'x')`", "Demanes `.x` a una cosa que val `undefined`", "El que hi ha **a l'esquerra del punt**: un índex que no existeix, una propietat mal escrita"],
            ['`Cannot read properties of null`', "Demanes una propietat a `null`", 'El selector del `querySelector` anterior'],
            ['`x is not a function`', 'Crides com a funció una cosa que no ho és', "El nom del mètode: `lenght()`, `addEventListner`…"],
            ['`Assignment to constant variable`', 'Intentes canviar una `const`', 'La declaració: potser havia de ser `let`'],
            ['`Unexpected token`', 'Hi ha un símbol on no toca', 'Parèntesis, claus i cometes de la línia indicada i de l\'anterior'],
          ],
          'Els missatges més habituals, traduïts'
        ),
        concept(
          'Comença sempre pel primer error',
          "Quan la consola mostra diversos errors, molts cops els de sota són conseqüència del primer. Arregla el de dalt de tot, torna a executar i mira què queda. Sovint n'han desaparegut uns quants."
        ),
      ],
    },

    {
      id: 'console-log-i-table',
      title: 'Investigar amb console.log() i console.table()',
      blocks: [
        p("Davant d'un error de lògica no hi ha cap missatge que et guiï. Has de mirar dins del programa mentre s'executa: quin valor té aquesta variable en aquest punt? És el que esperava? La manera més senzilla de fer-ho és mostrar-lo."),
        example({
          title: 'Trobar un error amb console.log',
          intro: "El total hauria de ser 34 (tres unitats a 10 € i 4 € d'enviament), però surt un altre resultat. Les dues línies de `console.log` de dins de la funció ja hi són posades per investigar.",
          js: `function calcularTotal(preu, quantitat, enviament) {
  const subtotal = preu * quantitat;

  console.log("subtotal:", subtotal, typeof subtotal);
  console.log("enviament:", enviament, typeof enviament);

  return subtotal + enviament;
}

console.log(calcularTotal(10, 3, "4"));`,
          expected: "`subtotal: 30 number`, `enviament: 4 string` i `304`.",
          why: "El segon missatge delata el problema: `enviament` és un text, i per això el `+` enganxa en lloc de sumar. A simple vista, un 4 i un `\"4\"` es veuen iguals; mostrar el `typeof` treu tots els dubtes. La solució és convertir-lo amb `Number()`.",
        }),
        p("Per treure profit dels `console.log` de depuració:"),
        list(
          "**Posa-hi una etiqueta.** `console.log(\"total:\", total)` és molt més útil que un número solt entre vint línies de consola.",
          "**Mostra el valor just abans de la línia sospitosa.** Si allà encara és correcte, el problema és més avall; si ja és incorrecte, és més amunt.",
          "**Comprova el tipus** amb `typeof` quan un valor es comporti de manera estranya.",
          "**Treu-los quan hagis acabat.** Els missatges de depuració no han de quedar al codi definitiu."
        ),
        p("Quan el que vols inspeccionar és un array d'objectes, `console.table()` el mostra en forma de taula, amb una fila per element i una columna per propietat."),
        example({
          title: 'Revisar dades amb console.table',
          intro: "Les mateixes dades, mostrades de dues maneres.",
          js: `const tasques = [
  { id: 1, text: "Estudiar JavaScript", completada: true },
  { id: 2, text: "Fer la compra", completada: false },
  { id: 3, text: "Enviar el treball" }
];

console.log(tasques);
console.table(tasques);`,
          expected: "Primer l'array en una sola línia, i després una taula amb tres files.",
          why: "A la taula es veu d'un cop d'ull que a la tercera tasca li falta la propietat `completada`: la seva casella queda buida. En una sola línia de text, aquest descuit passaria desapercebut.",
        }),
      ],
    },

    {
      id: 'breakpoints',
      title: 'Breakpoints: aturar el programa per mirar-lo',
      blocks: [
        p("`console.log` té un inconvenient: has de saber per endavant què vols mirar, modificar el codi i tornar a executar. Els navegadors porten una eina més potent, el **depurador**, que permet **aturar el programa en una línia** i examinar-ho tot amb calma. El punt on demanes que s'aturi es diu **breakpoint** (punt d'aturada)."),
        steps(
          "Obre les eines de desenvolupament (**F12**) i ves a la pestanya **Sources** (a Firefox es diu **Depurador**).",
          "Al panell de l'esquerra, obre el teu fitxer `app.js`.",
          "Fes clic sobre el **número de la línia** on vols aturar-te. Hi apareix una marca: ja tens un breakpoint.",
          "Fes que el codi s'executi: recarrega la pàgina o prem el botó que provoca l'error.",
          "El programa s'atura just abans d'executar aquella línia. Passa el ratolí per sobre de qualsevol variable per veure'n el valor, o consulta el panell **Scope**, que les llista totes.",
          "Avança amb els botons de control i mira com canvien els valors.",
          "Quan acabis, torna a fer clic al número de línia per treure el breakpoint."
        ),
        table(
          ['Botó', 'Què fa', 'Quan el faràs servir'],
          [
            ['**Resume** (reprèn)', 'Continua fins al següent breakpoint', 'Ja has vist el que volies'],
            ['**Step over** (pas següent)', 'Executa la línia actual i s\'atura a la següent', 'Per avançar línia a línia'],
            ['**Step into** (entra)', 'Si la línia crida una funció, hi entra', 'Quan sospites de la funció cridada'],
            ['**Step out** (surt)', 'Acaba la funció actual i torna a qui l\'ha cridada', 'Quan has entrat massa endins'],
          ],
          'Els controls del depurador'
        ),
        p("També pots posar un breakpoint des del codi escrivint la instrucció `debugger;` en una línia. Si les eines de desenvolupament estan obertes, el programa s'hi atura. Recorda treure-la després."),
        concept(
          'console.log o breakpoint?',
          "`console.log` va bé per a una comprovació ràpida d'un valor concret. Un breakpoint és millor quan no saps ben bé què busques, quan vols seguir un bucle volta a volta o quan necessites veure moltes variables alhora. Practica'l amb el teu projecte: és de les habilitats que més temps estalvien."
        ),
      ],
    },

    {
      id: 'metode',
      title: 'Un mètode per trobar errors',
      blocks: [
        p("Les eines no serveixen de gaire sense un ordre. Quan alguna cosa no funcioni, segueix aquests passos. Sembla lent, però és molt més ràpid que provar canvis a l'atzar."),
        steps(
          "**Reprodueix l'error.** Què has de fer exactament perquè falli? Si no el pots provocar quan vols, no podràs saber si l'has arreglat.",
          "**Llegeix la consola.** Hi ha algun missatge? Quin tipus d'error és? A quina línia?",
          "**Localitza'l.** Quina funció s'està executant quan falla? Si no ho saps, ves descartant: funciona fins aquí? I fins aquí?",
          "**Formula una hipòtesi.** Una frase concreta: «crec que `tasca` val `undefined` perquè el bucle fa una volta de més».",
          "**Comprova-la** amb un `console.log` o un breakpoint. Si no es confirma, has après una cosa i en formules una altra.",
          "**Corregeix una sola cosa.** Si en canvies tres alhora, no sabràs quina ho ha arreglat, ni si alguna ha espatllat res.",
          "**Verifica.** Repeteix el pas 1: ja no falla? I la resta de l'aplicació continua funcionant?"
        ),
        warning(
          "Canviar coses a l'atzar no és depurar",
          "Tocar codi sense saber per què falla pot amagar el símptoma sense resoldre la causa, i acostuma a introduir errors nous. Si no saps què passa, la feina no és canviar: és investigar."
        ),
        p("Un últim truc que funciona sorprenentment bé: **explica el problema en veu alta**, línia a línia, a un company o encara que sigui a un objecte de la taula. Obligar-te a dir què fa cada línia fa que sovint trobis l'error a mitja explicació."),
      ],
    },

    {
      id: 'noms-i-funcions',
      title: 'Noms descriptius i funcions petites',
      blocks: [
        p("La millor manera de depurar de pressa és escriure codi on els errors no es puguin amagar. Les dues funcions següents fan exactament el mateix. En quina trobaries abans un error?"),
        compare(
          {
            title: 'Noms que no diuen res',
            tone: 'bad',
            code: `function f(a) {
  let x = 0;
  for (const t of a) {
    if (!t.c) x++;
  }
  return x;
}`,
            text: "Per saber què fa, l'has de llegir sencera i deduir-ho.",
          },
          {
            title: 'Noms que expliquen',
            tone: 'good',
            code: `function comptarPendents(tasques) {
  let pendents = 0;
  for (const tasca of tasques) {
    if (!tasca.completada) {
      pendents++;
    }
  }
  return pendents;
}`,
            text: "El nom de la funció ja diu què fa, i cada línia es llegeix com una frase.",
          }
        ),
        list(
          "**Variables**: un substantiu que digui què contenen. `preuFinal`, no `pf`.",
          "**Booleans**: que es llegeixin com una pregunta de sí o no. `completada`, `esValid`, `teErrors`.",
          "**Funcions**: un verb que digui què fan. `validarTasca`, `renderitzar`, `comptarPendents`.",
          "**Arrays** en plural i **objectes** en singular: `tasques` i `tasca`.",
          "Res d'abreviatures que només entens tu, i només tu aquesta setmana."
        ),
        p("El mateix val per a la mida de les funcions. Una funció de sis línies amb una sola feina es pot comprovar mirant-la. Una de vuitanta que valida, calcula, pinta i guarda no es pot provar per parts, i quan falla no saps per on començar."),
        concept(
          'El codi es llegeix moltes més vegades de les que s\'escriu',
          "L'escriuràs una vegada, però el llegiràs cada cop que hi busquis un error o hi vulguis afegir alguna cosa. Qualsevol esforç per fer-lo clar es recupera amb escreix. I la persona que més cops el llegirà ets tu mateix, d'aquí a un mes."
        ),
        p("Els **comentaris** ajuden quan expliquen *per què* es fa una cosa, no *què* es fa. `// suma 1 al comptador` no aporta res. `// els id no es reaprofiten: per això no fem servir length` estalvia una confusió."),
      ],
    },

    {
      id: 'globals-i-duplicacio',
      title: 'Evitar variables globals i codi duplicat',
      blocks: [
        p("Una **variable global** es pot llegir i modificar des de qualsevol punt del programa. Sembla còmode, però quan el seu valor és incorrecte, qualsevol de les teves funcions pot ser la culpable. Com més variables globals, més llocs has de revisar."),
        list(
          "Mantén com a globals només l'**estat de l'aplicació** (l'array de tasques, el filtre actiu) i les referències als elements de la pàgina.",
          "Tota la resta, que siguin variables locals i paràmetres: les dades entren a la funció pels parèntesis i en surten pel `return`."
        ),
        p("L'altre gran enemic és el **codi duplicat**. Si la mateixa lògica és en dos llocs, tard o d'hora en corregiràs un i t'oblidaràs de l'altre."),
        compare(
          {
            title: 'El mateix codi, tres vegades',
            tone: 'bad',
            code: `botoTotes.addEventListener("click", () => {
  filtreActual = "totes";
  renderitzar();
});

botoPendents.addEventListener("click", () => {
  filtreActual = "pendents";
  renderitzar();
});

botoCompletades.addEventListener("click", () => {
  filtreActual = "completades";
  renderitzar();
});`,
          },
          {
            title: 'Una funció amb un paràmetre',
            tone: 'good',
            code: `function canviarFiltre(nouFiltre) {
  filtreActual = nouFiltre;
  renderitzar();
}

botoTotes.addEventListener("click", () => canviarFiltre("totes"));
botoPendents.addEventListener("click", () => canviarFiltre("pendents"));
botoCompletades.addEventListener("click", () => canviarFiltre("completades"));`,
            text: "El que canvia d'un cas a l'altre es converteix en paràmetre. Si canviar de filtre ha de fer una cosa més, es toca un sol lloc.",
          }
        ),
        p("També compten com a duplicació els **números màgics**: valors escrits directament al codi sense explicació, com un `60` que apareix a la validació i una altra vegada al missatge d'error. Dona'ls un nom i fes-lo servir a tot arreu:"),
        code(`const LONGITUD_MAXIMA = 60;

if (text.length > LONGITUD_MAXIMA) {
  return \`El text és massa llarg (màxim \${LONGITUD_MAXIMA} caràcters).\`;
}`),
      ],
    },

    {
      id: 'separar-i-accessibilitat',
      title: 'Cada capa al seu lloc, i una pàgina per a tothom',
      blocks: [
        p("A la unitat 1 vam dir que HTML, CSS i JavaScript tenen feines diferents. Ara que saps que JavaScript *pot* fer les feines dels altres dos, cal recordar que no *ha* de fer-les."),
        table(
          ['En lloc de…', 'Fes servir…', 'Per què'],
          [
            ['`<button onclick="afegir()">`', '`boto.addEventListener("click", afegir)`', "El comportament queda tot al fitxer JavaScript"],
            ['`element.style.color = "red"`', '`element.classList.add("error")`', "L'aspecte queda tot al CSS i es pot canviar sense tocar el codi"],
            ['`llista.innerHTML += "<li>" + text + "</li>"`', '`createElement` i `textContent`', "No barreja HTML dins de strings i no té riscos de seguretat"],
          ],
          'Separar HTML, CSS i JavaScript'
        ),
        p("L'altra norma que no és opcional és l'**accessibilitat**: que la pàgina la pugui fer servir tothom, també qui navega amb teclat, amb un lector de pantalla o amb la pantalla ampliada. Gairebé tot s'aconsegueix fent servir l'HTML tal com està pensat:"),
        list(
          "**Botons de veritat** (`<button>`) per a tot el que es pugui prémer. Mai un `<div>` amb un listener de `click`.",
          "**Una etiqueta** (`<label for=\"…\">`) per a cada camp de formulari.",
          "**El focus s'ha de veure.** No treguis el contorn del focus amb CSS si no el substitueixes per un altre.",
          "**No depenguis només del color.** Un error és un text, no només una vora vermella.",
          "**Els missatges d'error, associats al seu camp** amb `aria-describedby`.",
          "**L'estat dels controls, comunicat** amb atributs com `aria-expanded` o `aria-pressed` quan canvia.",
          "**Prova-ho sense ratolí.** Si pots fer-ho tot amb el tabulador, Retorn i Espai, vas per bon camí."
        ),
        warning(
          'No confiïs només en la validació del navegador',
          "Els atributs com `required` o `maxlength` són una ajuda, però es poden esquivar i no cobreixen casos com un text fet d'espais. Les dades que el teu codi fa servir les ha de comprovar el teu codi."
        ),
        project(
          "Tot això és el que distingeix un projecte que «funciona» d'un projecte ben fet. A la unitat següent faràs el projecte final fase a fase; a cada fase, torna a aquesta llista: els noms s'entenen? Cada funció fa una sola cosa? Hi ha codi repetit? Es pot fer servir sense ratolí?",
          { title: 'La llista de comprovació abans del projecte' }
        ),
      ],
    },
  ],

  commonErrors: [
    {
      title: "Arreglar l'últim error de la consola en lloc del primer",
      why: "Quan una línia falla, sovint en fa fallar d'altres més avall: una variable que no s'ha arribat a crear, una funció que no s'ha arribat a definir. Si comences pel final, perds temps amb símptomes. Comença sempre pel primer missatge, corregeix-lo i torna a executar.",
    },
    {
      title: 'Mostrar valors sense etiqueta',
      bad: `console.log(preu);
console.log(total);
console.log(descompte);`,
      why: "A la consola apareixen tres números sense cap pista de quin és quin. Quan n'hi ha deu, ja no es pot seguir. Una etiqueta de text al davant ho resol.",
      fix: `console.log("preu:", preu);
console.log("total:", total);
console.log("descompte:", descompte);`,
    },
    {
      title: 'Suposar el valor d\'una variable en lloc de comprovar-lo',
      bad: `// "Segur que quantitat és un nombre..."
const total = quantitat + 1;`,
      why: "La majoria d'errors de lògica venen d'una suposició falsa: «aquí segur que val 3», «això segur que és un array». Depurar és substituir suposicions per comprovacions. Si en tens el més petit dubte, mostra el valor i el seu tipus.",
      fix: `console.log("quantitat:", quantitat, typeof quantitat);
const total = quantitat + 1;`,
    },
    {
      title: 'Canviar diverses coses alhora',
      why: "Si modifiques tres línies i l'error desapareix, no saps quina de les tres l'ha arreglat, ni si les altres dues eren necessàries o han introduït un problema nou. Fes un canvi, comprova'l, i només llavors fes el següent.",
    },
    {
      title: 'Deixar els missatges de depuració al codi definitiu',
      bad: `function afegirTasca(text) {
  console.log("aquí arriba");
  console.log("text:", text);
  debugger;
  tasques.push(crearTasca(text));
}`,
      why: "Els `console.log` de prova omplen la consola i amaguen els errors de veritat. Un `debugger;` oblidat atura l'aplicació a qualsevol persona que tingui les eines de desenvolupament obertes. Quan hagis trobat l'error, neteja.",
      fix: `function afegirTasca(text) {
  tasques.push(crearTasca(text));
}`,
    },
  ],

  exercises: [
    {
      id: 'bug-sintaxi',
      title: 'Caça d\'errors 1: la sintaxi',
      statement: "Aquest programa hauria de mostrar les tres tasques i el total, però no arriba ni a començar. Té **dos errors de sintaxi**. Troba'ls llegint els missatges de la consola.",
      expectedOutput: ['- Estudiar', '- Comprar', '- Enviar', 'Total: 3'],
      starter: `const tasques = ["Estudiar", "Comprar", "Enviar"];

for (const tasca of tasques {
  console.log(\`- \${tasca}\`);
}

console.log(\`Total: \${tasques.length}\`;`,
      hint: "La consola només t'ensenyarà un error cada vegada. Ves a la línia que indica i compta els parèntesis: cada un que s'obre s'ha de tancar.",
      solution: `const tasques = ["Estudiar", "Comprar", "Enviar"];

for (const tasca of tasques) {
  console.log(\`- \${tasca}\`);
}

console.log(\`Total: \${tasques.length}\`);`,
      explanation: "Faltava el parèntesi de tancament a la capçalera del `for` (línia 3) i a l'últim `console.log` (línia 7). Amb un error de sintaxi no s'executa res, i per això fins que no has arreglat el primer no has pogut veure el segon.",
    },
    {
      id: 'bug-execucio',
      title: "Caça d'errors 2: l'execució",
      statement: "El programa calcula la mitjana de les notes d'un alumne, que hauria de ser 7. Té **dos noms mal escrits**. El primer atura el programa amb un error; el segon no, però espatlla el resultat.",
      expectedOutput: ['Marc: 7'],
      starter: `const alumne = {
  nom: "Marc",
  notes: [6, 8, 7]
};

let suma = 0;

for (const nota of alumne.nota) {
  suma += nota;
}

const mitjana = suma / alumne.notes.lenght;
console.log(\`\${alumne.nom}: \${mitjana}\`);`,
      hint: [
        "L'error diu que una cosa «is not iterable», és a dir, que no es pot recórrer. Què val `alumne.nota`? Compara-ho amb el nom de la propietat a l'objecte.",
        "Quan el resultat sigui `NaN`, mostra per separat `suma` i el divisor. Un dels dos no serà un nombre.",
      ],
      solution: `const alumne = {
  nom: "Marc",
  notes: [6, 8, 7]
};

let suma = 0;

for (const nota of alumne.notes) {
  suma += nota;
}

const mitjana = suma / alumne.notes.length;
console.log(\`\${alumne.nom}: \${mitjana}\`);`,
      explanation: "`alumne.nota` (en singular) no existeix i val `undefined`, que no es pot recórrer: error d'execució. `lenght` tampoc existeix, però dividir per `undefined` no dona error, sinó `NaN`. Dos descuits idèntics amb conseqüències diferents: per això cal comprovar sempre el resultat, encara que la consola estigui neta.",
    },
    {
      id: 'bug-logica',
      title: "Caça d'errors 3: la lògica",
      statement: "Aquest programa compta les tasques pendents. N'hi ha tres, però en diu una. No hi ha cap missatge d'error: hauràs d'investigar. Hi ha **dos errors de lògica**.",
      expectedOutput: ['Pendents: 3'],
      starter: `const tasques = [
  { text: "Estudiar", completada: false },
  { text: "Comprar", completada: false },
  { text: "Enviar", completada: true },
  { text: "Repassar", completada: false }
];

let pendents = 0;

for (let i = 1; i < tasques.length; i++) {
  if (tasques[i].completada) {
    pendents++;
  }
}

console.log(\`Pendents: \${pendents}\`);`,
      hint: [
        "Afegeix dins del bucle `console.log(i, tasques[i].text, tasques[i].completada);` i mira quines tasques es revisen i quines fan pujar el comptador.",
        "Un dels errors és a la condició de l'`if` i l'altre, a la capçalera del `for`.",
      ],
      solution: `const tasques = [
  { text: "Estudiar", completada: false },
  { text: "Comprar", completada: false },
  { text: "Enviar", completada: true },
  { text: "Repassar", completada: false }
];

let pendents = 0;

for (let i = 0; i < tasques.length; i++) {
  if (!tasques[i].completada) {
    pendents++;
  }
}

console.log(\`Pendents: \${pendents}\`);`,
      explanation: "La condició comptava les tasques completades en lloc de les pendents (faltava el `!`), i el bucle començava a 1, de manera que se saltava la primera. Fixa't que si només arregles la condició, el resultat passa a ser 2: millor, però encara incorrecte. Per això cal saber quin és el resultat esperat abans de donar un error per resolt.",
    },
    {
      id: 'bug-dom',
      title: "Caça d'errors 4: el DOM",
      statement: [
        "La pàgina hauria de mostrar una llista amb tres tasques i el text «Total: 3». En canvi, la llista surt buida i el total diu «undefined». A la consola no hi ha cap error.",
        "Hi ha **tres errors**. Quan arreglis el primer, n'apareixerà un de nou a la consola.",
      ],
      expected: "Una llista amb «Estudiar», «Comprar» i «Enviar», i a sota el text «Total: 3».",
      html: `<h1>Tasques</h1>
<ul id="llista"></ul>
<p id="total"></p>`,
      starter: `const tasques = ["Estudiar", "Comprar", "Enviar"];

const llista = document.querySelector("llista");
const total = document.querySelector("#total");

for (const tasca of tasques) {
  const element = document.createElement("li");
  element.textContent = tasca;
}

total.textContent = \`Total: \${tasques.lenght}\`;`,
      hint: [
        "Dins del bucle es crea cada element i se li posa el text. Quin és el tercer pas perquè es vegi a la pàgina?",
        "Quan afegeixis aquest pas apareixerà un error «of null». Mira el selector de `llista`. I per al total, repassa com s'escriu la propietat que dona la longitud.",
      ],
      solution: `const tasques = ["Estudiar", "Comprar", "Enviar"];

const llista = document.querySelector("#llista");
const total = document.querySelector("#total");

for (const tasca of tasques) {
  const element = document.createElement("li");
  element.textContent = tasca;
  llista.append(element);
}

total.textContent = \`Total: \${tasques.length}\`;`,
      explanation: "Faltava l'`append`, el selector no tenia coixinet i `length` estava mal escrit. El segon error estava amagat pel primer: com que `llista` no es feia servir enlloc, el fet que fos `null` no molestava ningú. Arreglar un error sovint en deixa veure un altre, i això no vol dir que ho estiguis fent malament.",
    },
  ],

  finalExercise: {
    id: 'gestor-avariat',
    title: 'El gestor avariat',
    statement: [
      "Algú ha escrit aquesta versió reduïda del gestor de tasques i ha deixat una llista de queixes dels usuaris. Fes servir el mètode de la unitat per trobar i arreglar els **quatre errors**:",
      "**1.** En afegir una tasca, la pàgina es recarrega. **2.** Quan això ja no passa, cada vegada que s'afegeix una tasca les anteriors surten repetides. **3.** El comptador diu sempre «Pendents: 0». **4.** Es poden afegir tasques fetes només d'espais.",
    ],
    expected: "En començar: una tasca i «Pendents: 1». En afegir-ne una altra: dues tasques (sense repeticions) i «Pendents: 2». Una tasca buida o d'espais mostra l'error i no s'afegeix.",
    html: HTML_GESTOR,
    css: CSS_GESTOR,
    starter: `const tasques = [
  { id: 1, text: "Estudiar JavaScript", completada: false }
];
let seguentId = 2;

const formulari = document.querySelector("#formulari");
const inputTasca = document.querySelector("#text-tasca");
const errorTasca = document.querySelector("#error-tasca");
const llista = document.querySelector("#llista");
const comptador = document.querySelector("#comptador");

function renderitzar() {
  let pendents = 0;

  for (const tasca of tasques) {
    const element = document.createElement("li");
    element.textContent = tasca.text;
    llista.append(element);

    if (tasca.completada = false) {
      pendents++;
    }
  }

  comptador.textContent = \`Pendents: \${pendents}\`;
}

formulari.addEventListener("submit", () => {
  const text = inputTasca.value;

  if (text === "") {
    errorTasca.textContent = "Escriu el text de la tasca.";
    return;
  }

  errorTasca.textContent = "";
  tasques.push({ id: seguentId, text: text, completada: false });
  seguentId++;

  inputTasca.value = "";
  renderitzar();
});

renderitzar();`,
    hint: [
      "Ves queixa per queixa, en ordre, i arregla'n una cada vegada. La primera i la quarta són al listener; la segona i la tercera, a `renderitzar`.",
      "Per a la tercera, mira amb atenció quants signes d'igual hi ha a la condició de l'`if`.",
    ],
    solution: `const tasques = [
  { id: 1, text: "Estudiar JavaScript", completada: false }
];
let seguentId = 2;

const formulari = document.querySelector("#formulari");
const inputTasca = document.querySelector("#text-tasca");
const errorTasca = document.querySelector("#error-tasca");
const llista = document.querySelector("#llista");
const comptador = document.querySelector("#comptador");

function renderitzar() {
  llista.innerHTML = "";
  let pendents = 0;

  for (const tasca of tasques) {
    const element = document.createElement("li");
    element.textContent = tasca.text;
    llista.append(element);

    if (tasca.completada === false) {
      pendents++;
    }
  }

  comptador.textContent = \`Pendents: \${pendents}\`;
}

formulari.addEventListener("submit", (event) => {
  event.preventDefault();

  const text = inputTasca.value.trim();

  if (text === "") {
    errorTasca.textContent = "Escriu el text de la tasca.";
    return;
  }

  errorTasca.textContent = "";
  tasques.push({ id: seguentId, text: text, completada: false });
  seguentId++;

  inputTasca.value = "";
  renderitzar();
});

renderitzar();`,
    explanation: [
      "**1.** Faltava `event.preventDefault()` (i el paràmetre `event` per poder-lo cridar). **2.** `renderitzar` no buidava la llista abans de pintar. **3.** La condició feia servir `=` en lloc de `===`: assignava `false` i no comptava mai res. **4.** Faltava `trim()` en llegir el camp.",
      "Cap dels quatre feia sortir un missatge d'error. Tots quatre els has vist abans, en una unitat o altra, a l'apartat d'errors habituals. Reconèixer-los és el que t'estalviarà temps quan muntis el projecte.",
    ],
  },

  summary: [
    "Hi ha errors de **sintaxi** (el codi no es pot llegir), d'**execució** (una instrucció no es pot fer) i de **lògica** (fa una cosa diferent de la que volies).",
    "Un missatge d'error té tipus, missatge i ubicació. Comença sempre pel **primer** que aparegui.",
    "`console.log(\"etiqueta:\", valor)` i `typeof` serveixen per comprovar què val una variable. `console.table` mostra arrays d'objectes.",
    "Un **breakpoint** atura el programa en una línia per inspeccionar-ne totes les variables.",
    "Mètode: reproduir, llegir, localitzar, fer una hipòtesi, comprovar-la, corregir **una** cosa i verificar.",
    "Noms descriptius, funcions petites, poques variables globals i cap codi duplicat fan que els errors tinguin menys llocs on amagar-se.",
    "HTML per al contingut, CSS per a l'aspecte i JavaScript per al comportament. I una pàgina que tothom pugui fer servir.",
  ],

  quiz: [
    {
      question: "Un programa s'executa sense cap missatge a la consola, però el total que mostra és incorrecte. Quin tipus d'error és?",
      options: [
        { text: 'Un error de lògica', correct: true },
        { text: 'Un error de sintaxi', why: "Amb un error de sintaxi el programa no s'hauria ni començat a executar, i la consola ho diria." },
        { text: "Un error d'execució", why: "Un error d'execució atura el programa i deixa un missatge a la consola." },
        { text: 'No és cap error: si no hi ha missatge, el codi és correcte', why: "La consola només detecta el que no es pot executar. No sap què volies que fes el programa." },
      ],
      explanation: "En un error de lògica, el codi és vàlid i s'executa sencer, però no fa el que s'esperava. Només es detecta comprovant el resultat.",
    },
    {
      question: "La consola mostra tres errors, un sota l'altre. Per quin has de començar?",
      options: [
        { text: "Pel primer: els altres en poden ser una conseqüència.", correct: true },
        { text: "Per l'últim, que és el més recent.", why: "Els últims acostumen a ser efectes dels anteriors. Arreglar-los primer és perdre temps." },
        { text: "Pel que tingui el missatge més curt.", why: "La llargada del missatge no diu res de la importància ni de l'ordre." },
        { text: "És indiferent: s'han d'arreglar tots igualment.", why: "Sovint, en arreglar el primer, els altres desapareixen sols." },
      ],
      explanation: "Un error pot impedir que es creïn variables o funcions que es necessiten més avall, i provocar una cadena d'errors. El primer és la causa més probable.",
    },
    {
      question: "Apareix l'error «Cannot read properties of null (reading 'addEventListener')». Quina és la causa més probable?",
      options: [
        { text: "`querySelector` no ha trobat l'element i ha retornat `null`.", correct: true },
        { text: "El mètode `addEventListener` no existeix.", why: "Sí que existeix. El problema és el valor al qual se li demana, que és `null`." },
        { text: "Falta un punt i coma a la línia anterior.", why: "Això donaria, en tot cas, un error de sintaxi, no un `TypeError` sobre `null`." },
        { text: "La funció del listener no està declarada.", why: "En aquest cas l'error seria «… is not defined», un `ReferenceError`." },
      ],
      explanation: "L'error diu que a l'esquerra del punt hi ha `null`. Un element és `null` quan el selector no coincideix amb res o quan l'script s'ha executat abans que existís.",
    },
    {
      question: "Què fa un breakpoint?",
      options: [
        { text: "Atura l'execució en una línia perquè puguis inspeccionar les variables.", correct: true },
        { text: "Corregeix automàticament l'error d'aquella línia.", why: "Cap eina corregeix el codi per tu: el depurador només t'ensenya què passa." },
        { text: "Fa que el navegador se salti aquella línia.", why: "La línia s'executa igualment, quan decideixes continuar." },
        { text: "Mostra un avís a les persones que visiten la pàgina.", why: "Els breakpoints només existeixen a les eines de desenvolupament del teu navegador." },
      ],
      explanation: "Un breakpoint pausa el programa just abans d'una línia. Mentre està aturat pots veure el valor de totes les variables i avançar pas a pas.",
    },
    {
      question: "Quin és el millor nom per a una funció que retorna el nombre de tasques no completades?",
      options: [
        { text: '`comptarPendents`', correct: true },
        { text: '`f2`', why: "No diu res del que fa: caldria llegir-ne el codi cada vegada." },
        { text: '`tasques`', why: "És un substantiu, i a més sembla el nom de l'array. Una funció fa alguna cosa: el nom ha de començar amb un verb." },
        { text: '`ferCoses`', why: "Té verb, però és tan genèric que serviria per a qualsevol funció." },
      ],
      explanation: "Un bon nom de funció és un verb i diu exactament què fa. Així, `comptarPendents(tasques)` s'entén sense haver d'obrir la funció.",
    },
  ],
};
