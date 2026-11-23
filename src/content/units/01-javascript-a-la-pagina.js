import { p, list, code, example, concept, warning, challenge, project, table, compare, custom } from '../blocks.js';

const PLANTILLA_HTML = `<!DOCTYPE html>
<html lang="ca">
  <head>
    <meta charset="UTF-8">
    <title>Gestor de tasques</title>
    <link rel="stylesheet" href="estils.css">
    <script src="app.js" defer></script>
  </head>
  <body>
    <h1>Les meves tasques</h1>
    <button id="afegir">Afegeix una tasca</button>
  </body>
</html>`;

export default {
  id: 'javascript-a-la-pagina',
  number: 1,
  title: 'JavaScript entra a la pàgina',
  shortTitle: 'JavaScript entra a la pàgina',
  description:
    "Què fa JavaScript que no poden fer HTML ni CSS, com es connecta amb una pàgina i on has de mirar quan alguna cosa no funciona.",

  problem: {
    title: "Tenim un botó, però encara no fa res",
    text: [
      "Imagina que has maquetat la primera versió d'un gestor de tasques: un títol, una llista i un botó «Afegeix una tasca». Amb HTML has posat cada cosa al seu lloc i amb CSS li has donat bon aspecte. Obres la pàgina, prems el botó… i no passa res.",
      "No has fet res malament. HTML sap dir *què hi ha* a la pàgina i CSS sap dir *com es veu*, però cap dels dos sap dir *què ha de passar* quan algú hi interactua. Per a això necessitem un tercer llenguatge: JavaScript.",
    ],
  },

  goals: [
    "Explicar quina feina fa cada un dels tres llenguatges d'una pàgina web.",
    "Escriure missatges a la consola del navegador amb `console.log()`.",
    "Connectar un fitxer JavaScript a una pàgina amb `<script>` i `defer`.",
    "Llegir un missatge d'error de la consola i trobar la línia que falla.",
  ],

  projectPiece:
    "El gestor arrenca: tres fitxers (`index.html`, `estils.css` i `app.js`) ben connectats, i una primera línia de JavaScript que ens confirma a la consola que tot està enllaçat.",

  finalProject:
    "Connectaràs tres fitxers de JavaScript a les dues pàgines que vas maquetar al RA1, amb `<script defer>` i en l'ordre correcte.",

  sections: [
    {
      id: 'tres-capes',
      title: 'HTML, CSS i JavaScript: tres capes',
      blocks: [
        p("Una pàgina web es construeix amb tres llenguatges, i cadascun té una feina diferent. No competeixen entre ells: se sumen."),
        table(
          ['Llenguatge', 'Què aporta', 'Al gestor de tasques'],
          [
            ['**HTML**', 'Contingut i estructura', '«Hi ha un títol, una llista i un botó.»'],
            ['**CSS**', 'Aspecte', '«El botó és blau i les tasques tenen una vora a l\'esquerra.»'],
            ['**JavaScript**', 'Comportament', '«Quan es prem el botó, s\'afegeix una tasca a la llista.»'],
          ],
          'Les tres capes d\'una pàgina web'
        ),
        p("La millor manera d'entendre-ho és veure la mateixa pàgina amb cada capa activada i desactivada. Prem el botó «Afegeix una tasca» amb JavaScript desactivat i després torna-ho a provar amb JavaScript activat."),
        custom('ThreeLayers'),
        concept(
          'JavaScript dona comportament a la pàgina',
          "HTML i CSS *descriuen* una pàgina; JavaScript la fa *reaccionar*. Tot el que canvia a la pantalla sense recarregar la pàgina (un menú que s'obre, un comptador que puja, un error que apareix sota un formulari) és feina de JavaScript."
        ),
        p("Hi ha una altra diferència important. HTML i CSS són llenguatges per *descriure* coses. JavaScript és un **llenguatge de programació**: serveix per donar instruccions, pas a pas, que el navegador executa."),
        warning(
          'JavaScript no és Java',
          "Tenen noms semblants per motius comercials dels anys noranta, però són dos llenguatges diferents. Quan busquis informació, assegura't que parla de JavaScript (sovint abreujat **JS**)."
        ),
      ],
    },

    {
      id: 'javascript-al-navegador',
      title: 'JavaScript al navegador',
      blocks: [
        p("Per començar a programar amb JavaScript no cal instal·lar res. Tots els navegadors (Chrome, Firefox, Edge, Safari) porten a dins un programa que entén JavaScript i l'executa. Quan el navegador carrega una pàgina i hi troba codi JavaScript, simplement el fa funcionar."),
        p("Un programa és una llista d'**instruccions**. El navegador les executa una darrere l'altra, de dalt a baix, igual que tu seguiries una recepta de cuina. Cada instrucció s'acaba amb un punt i coma."),
        code(`console.log("Primera instrucció");
console.log("Segona instrucció");
console.log("Tercera instrucció");`),
        p("En aquest programa hi ha tres instruccions. El navegador executa la primera, quan ha acabat executa la segona i després la tercera. Mai no se'n salta cap ni les fa en un altre ordre."),
        concept(
          "L'ordre importa",
          "El navegador executa el codi de dalt a baix, una instrucció cada vegada. Bona part dels errors de qui comença venen de fer les coses en un ordre que no toca: fer servir una cosa abans d'haver-la creat."
        ),
      ],
    },

    {
      id: 'consola',
      title: 'La consola: el teu primer lloc de proves',
      blocks: [
        p("Abans de tocar res de la pàgina necessitem un lloc on veure què fa el nostre codi. Aquest lloc és la **consola** del navegador: un panell pensat per a qui programa, que les persones que visiten la web no veuen mai."),
        list(
          "A Windows i Linux: prem **F12** o **Ctrl + Maj + I** i tria la pestanya «Console».",
          "A Mac: prem **Cmd + Opció + I** i tria la pestanya «Console».",
          "També pots fer clic dret a la pàgina, triar «Inspecciona» i anar a «Console»."
        ),
        p("La instrucció `console.log()` escriu a la consola el que li posem entre parèntesis. Si és un text, ha d'anar entre cometes."),
        example({
          title: 'El teu primer missatge',
          intro: "Prem «Executar». El panell «Resultat» fa de consola: hi veuràs el mateix que veuries a la consola del navegador.",
          js: `console.log("Hola, món!");`,
          expected: "A la consola apareix el text `Hola, món!`, sense les cometes.",
          why: "Les cometes no formen part del missatge: serveixen per dir-li a JavaScript on comença i on acaba el text.",
        }),
        p("Els exemples d'aquest dossier també escriuen a la consola *real* del navegador. Obre-la ara (F12) i torna a executar l'exemple: hi trobaràs el mateix missatge. Acostuma't a tenir-la sempre oberta mentre programes."),
        p("Dins d'un programa pots escriure tantes instruccions com vulguis. Les línies que comencen per `//` són **comentaris**: notes per a les persones que llegeixen el codi. El navegador les ignora."),
        example({
          title: 'Diverses instruccions, en ordre',
          intro: "Abans d'executar-lo, intenta endevinar què apareixerà i en quin ordre.",
          js: `// Això és un comentari: el navegador no l'executa
console.log("Obrint el gestor de tasques...");
console.log("Tasques pendents:");
console.log(3);
console.log(2 + 3);`,
          expected: "Quatre línies: dos textos, el número `3` i el número `5`.",
          why: "Els números s'escriuen sense cometes. Per això `2 + 3` es calcula i mostra `5`: JavaScript sap fer operacions amb números.",
        }),
        challenge({
          statement: "Canvia el programa perquè mostri el teu nom en una línia i el nom del teu cicle en una altra. Després afegeix-hi una tercera línia que mostri el resultat de multiplicar `7 * 6`.",
          starter: `console.log("El meu nom");
`,
          hint: "Cada `console.log()` escriu una línia. El text va entre cometes; l'operació `7 * 6`, sense.",
          solution: `console.log("Marta Soler");
console.log("Desenvolupament d'Aplicacions Web");
console.log(7 * 6);`,
          explanation: "Tres instruccions, tres línies. Si haguessis escrit `\"7 * 6\"` entre cometes, JavaScript ho hauria tractat com un text i hauria mostrat `7 * 6` en lloc de `42`.",
        }),
      ],
    },

    {
      id: 'etiqueta-script',
      title: "L'etiqueta script: JavaScript intern i extern",
      blocks: [
        p("La consola va bé per fer proves, però el codi d'una aplicació ha de viure amb la pàgina. Per connectar JavaScript amb un document HTML fem servir l'etiqueta `<script>`, i ho podem fer de dues maneres."),
        compare(
          {
            title: 'JavaScript intern',
            lang: 'html',
            code: `<script>
  console.log("Hola des de l'HTML");
</script>`,
            text: "El codi s'escriu directament dins de l'etiqueta. Va bé per a una prova ràpida, però barreja dos llenguatges en un mateix fitxer.",
          },
          {
            title: 'JavaScript extern',
            tone: 'good',
            lang: 'html',
            code: `<script src="app.js"></script>`,
            text: "El codi viu en un fitxer a part, acabat en `.js`, i l'HTML només diu on és. **És la manera que farem servir sempre.**",
          }
        ),
        p("Per què extern? Pel mateix motiu pel qual poses el CSS en un fitxer a part:"),
        list(
          "Cada fitxer té una sola feina: l'HTML descriu, el CSS dona estil i el JavaScript fa funcionar.",
          "El mateix fitxer `.js` es pot fer servir en diverses pàgines.",
          "L'editor t'ajuda més: colors, autocompletat i avisos pensats per a JavaScript.",
          "Quan alguna cosa falla, la consola et diu el fitxer i la línia exactes."
        ),
        warning(
          'Un script amb src ignora el que té a dins',
          "Si una etiqueta `<script>` té l'atribut `src`, el navegador carrega aquell fitxer i **no executa** res del que hagis escrit entre `<script>` i `</script>`. O una cosa o l'altra."
        ),
      ],
    },

    {
      id: 'ordre-i-defer',
      title: "Ordre d'execució i l'atribut defer",
      blocks: [
        p("Ja sabem connectar un fitxer. Ara toca decidir *on* posem l'etiqueta `<script>`, i aquí hi ha una trampa que atrapa gairebé tothom la primera vegada."),
        p("El navegador llegeix l'HTML de dalt a baix. Si pel camí troba un `<script>`, s'atura, executa aquell codi i després continua. El problema arriba quan el codi vol fer servir un element que el navegador *encara no ha llegit*."),
        custom('ScriptOrderDemo'),
        p("Comprova-ho tu mateix. Aquests dos exemples tenen exactament el mateix JavaScript: una sola instrucció que busca el títol de la pàgina i li canvia el text. L'única diferència és el moment en què s'executa."),
        example({
          title: 'Sense defer: massa aviat',
          intro: "Aquí l'script s'executa des del `<head>`, abans que el navegador hagi llegit el `<body>`.",
          runAt: 'head',
          html: `<h1 id="titol">Carregant…</h1>`,
          js: `console.log("L'script comença");
document.querySelector("#titol").textContent = "Les meves tasques";
console.log("L'script acaba");`,
          expected: "El títol continua dient «Carregant…» i a la consola apareix un `TypeError`. El tercer missatge no arriba a sortir.",
          why: "Quan s'executa la segona línia, l'`<h1>` encara no existeix. `document.querySelector(\"#titol\")` no troba res i retorna `null`, i a `null` no se li pot canviar el text.",
        }),
        example({
          title: 'Amb defer: quan tot està a punt',
          intro: "El mateix codi, però ara l'script espera que el navegador hagi llegit tot l'HTML.",
          html: `<h1 id="titol">Carregant…</h1>`,
          js: `console.log("L'script comença");
document.querySelector("#titol").textContent = "Les meves tasques";
console.log("L'script acaba");`,
          expected: "El títol passa a dir «Les meves tasques» i a la consola surten els dos missatges, sense cap error.",
        }),
        concept(
          "Posa sempre defer",
          "Escriu l'etiqueta al `<head>` amb l'atribut `defer`: `<script src=\"app.js\" defer></script>`. El navegador descarregarà el fitxer mentre llegeix la pàgina i l'executarà just quan hagi acabat de llegir tot l'HTML."
        ),
        p("Veuràs pàgines antigues que posen el `<script>` al final del `<body>`, just abans de `</body>`. Aconsegueix el mateix efecte, perquè quan el navegador hi arriba ja ha llegit tota la resta. Funciona, però `defer` ho diu de manera més clara i manté totes les connexions de la pàgina juntes al `<head>`."),
        project(
          "Aquesta és la plantilla amb què començarà el gestor de tasques. Crea una carpeta amb tres fitxers (`index.html`, `estils.css` i `app.js`) i copia-hi això a `index.html`. A `app.js` escriu-hi només `console.log(\"Gestor de tasques en marxa\");`. Si en obrir la pàgina veus el missatge a la consola, tot està ben connectat.",
          { title: 'La plantilla del gestor', code: PLANTILLA_HTML, lang: 'html' }
        ),
      ],
    },

    {
      id: 'primer-boto',
      title: 'El primer botó que fa alguna cosa',
      blocks: [
        p("Ja tenim prou peces per tornar al problema del principi: un botó que no feia res. Aquest exemple fa servir coses que encara no hem explicat a fons, així que de moment llegeix-lo com si fos una frase."),
        example({
          title: 'Un botó que saluda',
          intro: "Executa'l i prem el botó de la pàgina. Fixa't que el missatge de la consola apareix cada vegada que hi fas clic.",
          html: `<h1>Gestor de tasques</h1>
<button id="saluda">Saluda'm</button>
<p id="missatge"></p>`,
          css: `button { padding: 8px 14px; }
#missatge { font-weight: 600; }`,
          js: `function saludar() {
  document.querySelector("#missatge").textContent = "Hola! Ja tens el teu primer botó amb JavaScript.";
  console.log("Algú ha premut el botó");
}

document.querySelector("#saluda").addEventListener("click", saludar);`,
          why: "L'última línia es llegeix així: «busca l'element amb id `saluda` i, quan hi facin clic, executa `saludar`». Les instruccions de dins de `saludar` no s'executen en carregar la pàgina: es queden esperant el clic.",
        }),
        p("En aquestes poques línies hi ha tres idees que anirem desplegant al llarg del dossier:"),
        list(
          "**Agrupar instruccions sota un nom** (`function saludar`) per executar-les quan calgui. Ho veurem a la [unitat 5](#/unitat/funcions).",
          "**Trobar un element de la pàgina** (`document.querySelector`) i canviar-lo. Ho veurem a la [unitat 7](#/unitat/dom).",
          "**Reaccionar a una acció** (`addEventListener`). Ho veurem a la [unitat 8](#/unitat/esdeveniments)."
        ),
        p("No cal que ara ho entenguis tot. N'hi ha prou que et quedis amb la idea general: JavaScript pot trobar elements de la pàgina, canviar-los i esperar que passi alguna cosa."),
        challenge({
          statement: "Modifica l'exemple perquè, en prémer el botó, el paràgraf digui «Tens 3 tasques pendents» i a la consola aparegui «Missatge actualitzat».",
          html: `<h1>Gestor de tasques</h1>
<button id="saluda">Quantes tasques tinc?</button>
<p id="missatge"></p>`,
          starter: `function saludar() {
  document.querySelector("#missatge").textContent = "Hola!";
  console.log("Algú ha premut el botó");
}

document.querySelector("#saluda").addEventListener("click", saludar);`,
          hint: "Només has de canviar els dos textos que hi ha entre cometes dins de la funció. La resta ja fa el que ha de fer.",
          solution: `function saludar() {
  document.querySelector("#missatge").textContent = "Tens 3 tasques pendents";
  console.log("Missatge actualitzat");
}

document.querySelector("#saluda").addEventListener("click", saludar);`,
          explanation: "L'estructura no canvia: un element que escolta el clic i una funció que diu què s'ha de fer. Només han canviat les dades, que són els textos.",
        }),
      ],
    },

    {
      id: 'errors-de-consola',
      title: 'Quan alguna cosa falla: els errors de la consola',
      blocks: [
        p("Programar vol dir equivocar-se sovint, i això no canvia amb l'experiència. El que sí que canvia és la rapidesa amb què trobes l'error. La consola és la teva millor aliada: quan JavaScript no pot continuar, hi escriu un missatge en vermell que t'explica què ha passat i on."),
        code(`Uncaught ReferenceError: consol is not defined        app.js:3`, { lang: 'text', title: 'Consola' }),
        p("Sembla críptic, però sempre té les mateixes tres parts:"),
        list(
          "**El tipus d'error** (`ReferenceError`): la categoria del problema.",
          "**El missatge** (`consol is not defined`): què ha passat exactament. Aquí, que no existeix res que es digui `consol`.",
          "**El fitxer i la línia** (`app.js:3`): on has d'anar a mirar. Si hi fas clic, el navegador t'hi porta."
        ),
        example({
          title: 'Un nom mal escrit',
          intro: "A la segona línia falta una lletra. Fixa't en quines línies s'arriben a executar.",
          js: `console.log("Abans de l'error");
consol.log("Aquesta línia té un error");
console.log("Després de l'error");`,
          expected: "Surt el primer missatge i després un `ReferenceError` a la línia 2. El tercer missatge no apareix.",
          why: "Quan JavaScript troba un error, **s'atura**: no executa res del que ve després. Per això un sol error pot fer que «no funcioni res» a la pàgina.",
        }),
        example({
          title: 'Una cometa que falta',
          intro: "Ara l'error és d'escriptura: el text de la segona línia no es tanca.",
          js: `console.log("Primera línia");
console.log("Segona línia);
console.log("Tercera línia");`,
          expected: "Només apareix un `SyntaxError`. Aquesta vegada no surt ni el primer missatge.",
          why: "Abans d'executar res, el navegador llegeix tot el fitxer per comprovar que està ben escrit. Si troba un error de sintaxi, no executa **cap** línia, ni tan sols les correctes.",
        }),
        table(
          ['Tipus', 'Què vol dir', 'Causa típica'],
          [
            ['`SyntaxError`', 'El codi està mal escrit', 'Falta una cometa, un parèntesi o una clau'],
            ['`ReferenceError`', 'Fas servir un nom que no existeix', 'Una paraula mal escrita o amb majúscules diferents'],
            ['`TypeError`', 'Fas una operació amb un valor que no la permet', "Intentar canviar un element que no s'ha trobat (`null`)"],
          ],
          'Els tres errors que veuràs més sovint'
        ),
        warning(
          'Majúscules i minúscules són lletres diferents',
          "Per a JavaScript, `console`, `Console` i `CONSOLE` són tres noms diferents, i només el primer existeix. El mateix passa amb `querySelector`: si escrius `queryselector`, falla."
        ),
        concept(
          "Llegeix l'error abans de tocar res",
          "La reacció natural davant d'un error és canviar coses a l'atzar fins que funcioni. Resisteix-t'hi: llegeix el missatge, ves a la línia que indica i mira què hi ha escrit de veritat, no el que creus que hi vas escriure."
        ),
      ],
    },
  ],

  commonErrors: [
    {
      title: "L'script s'executa abans que existeixi l'HTML",
      badLang: 'html',
      bad: `<head>
  <script src="app.js"></script>
</head>
<body>
  <h1 id="titol">Tasques</h1>
</body>`,
      message: "Uncaught TypeError: Cannot set properties of null (setting 'textContent')",
      why: "Sense `defer`, l'script s'executa quan el navegador encara no ha llegit el `<body>`. Qualsevol element que busqui encara no existeix.",
      fixLang: 'html',
      fix: `<head>
  <script src="app.js" defer></script>
</head>
<body>
  <h1 id="titol">Tasques</h1>
</body>`,
    },
    {
      title: 'La ruta del fitxer no és correcta',
      badLang: 'html',
      bad: `<script src="aap.js" defer></script>`,
      message: 'GET file:///.../aap.js net::ERR_FILE_NOT_FOUND',
      why: "Si el nom o la carpeta del fitxer no coincideixen exactament, el navegador no el troba i no executa res. La pàgina es veu bé però «no fa res». La pista és a la consola: hi apareix un error de càrrega amb el nom del fitxer que no ha trobat.",
      fixLang: 'html',
      fix: `<script src="app.js" defer></script>`,
    },
    {
      title: 'Text sense cometes',
      bad: `console.log(Hola);`,
      message: 'Uncaught ReferenceError: Hola is not defined',
      why: "Sense cometes, JavaScript no ho interpreta com un text sinó com el *nom* d'alguna cosa, la busca i no la troba. Tot text ha d'anar entre cometes.",
      fix: `console.log("Hola");`,
    },
    {
      title: 'Majúscules on no toca',
      bad: `Console.Log("Hola");`,
      message: 'Uncaught ReferenceError: Console is not defined',
      why: "JavaScript distingeix majúscules i minúscules. L'objecte es diu `console` i el mètode es diu `log`, tot en minúscules.",
      fix: `console.log("Hola");`,
    },
    {
      title: "Codi dins d'un script que ja té src",
      badLang: 'html',
      bad: `<script src="app.js" defer>
  console.log("Això no s'executarà mai");
</script>`,
      why: "Quan l'etiqueta té `src`, el navegador només executa el fitxer extern i ignora el contingut de l'etiqueta. No dona cap error: senzillament no passa res, i per això costa de trobar.",
      fixLang: 'html',
      fix: `<script src="app.js" defer></script>`,
    },
  ],

  exercises: [
    {
      id: 'primer-missatge',
      title: 'El teu primer missatge',
      statement: "Escriu una instrucció que mostri a la consola el text `Hola, JavaScript!`.",
      expectedOutput: ['Hola, JavaScript!'],
      hint: "La instrucció per escriure a la consola és `console.log()`. El text va entre cometes, dins dels parèntesis.",
      solution: `console.log("Hola, JavaScript!");`,
      explanation: "`console.log()` mostra el que rep entre parèntesis. Les cometes delimiten el text i no apareixen a la consola. El punt i coma indica que la instrucció s'ha acabat.",
    },
    {
      id: 'tres-missatges',
      title: 'Tres missatges en ordre',
      statement: "Escriu un programa que mostri aquests tres missatges, cadascun en una línia i exactament en aquest ordre.",
      expectedOutput: ['Obrint la pàgina...', 'Carregant les tasques...', 'Tot a punt!'],
      hint: "Necessites tres instruccions `console.log()`, una sota l'altra. El navegador les executa de dalt a baix.",
      solution: `console.log("Obrint la pàgina...");
console.log("Carregant les tasques...");
console.log("Tot a punt!");`,
      explanation: "L'ordre en què escrius les instruccions és l'ordre en què s'executen. Si canvies les línies de lloc, els missatges també canvien de lloc.",
    },
    {
      id: 'dos-errors',
      title: 'Caça els dos errors',
      statement: [
        "Aquest programa hauria de mostrar dos missatges, però té **dos errors**. Executa'l, llegeix el que diu la consola i corregeix-los d'un en un.",
        "Fixa't en una cosa: la consola no t'ensenya els dos errors alhora.",
      ],
      expectedOutput: ['Primer missatge', 'Segon missatge'],
      starter: `consle.log("Primer missatge");
console.log("Segon missatge);`,
      hint: "El primer error que veuràs és un `SyntaxError` a la línia 2: compta les cometes. Quan l'hagis arreglat, apareixerà un altre error a la línia 1: llegeix la paraula lletra a lletra.",
      solution: `console.log("Primer missatge");
console.log("Segon missatge");`,
      explanation: "A la línia 2 faltava la cometa de tancament (error de sintaxi) i a la línia 1 hi deia `consle` en lloc de `console` (un nom que no existeix). L'error de sintaxi surt primer perquè el navegador revisa tot el fitxer abans d'executar res; fins que no està ben escrit, no arriba a descobrir el segon.",
    },
    {
      id: 'canvia-titol',
      title: 'Canvia el títol',
      statement: "La instrucció de l'editor canvia el text del títol de la pàgina. Modifica-la perquè el títol digui «Les meves tasques» i afegeix-hi una segona instrucció que mostri «Títol canviat» a la consola.",
      expected: "El títol de la pàgina diu «Les meves tasques» i a la consola apareix `Títol canviat`.",
      html: `<h1 id="titol">Títol provisional</h1>
<p>Aquesta serà la pàgina del gestor de tasques.</p>`,
      starter: `document.querySelector("#titol").textContent = "Títol provisional";`,
      hint: "El text nou va entre cometes, a la dreta del signe `=`. Per al missatge de la consola, afegeix una línia amb `console.log()`.",
      solution: `document.querySelector("#titol").textContent = "Les meves tasques";
console.log("Títol canviat");`,
      explanation: "La primera instrucció troba l'element amb `id=\"titol\"` i li posa un text nou. La segona s'executa just després: per això, quan veus el missatge a la consola, saps del cert que la línia anterior no ha fallat.",
    },
  ],

  finalExercise: {
    id: 'pagina-benvinguda',
    title: 'La pàgina de benvinguda',
    statement: [
      "Completa el programa perquè faci tres coses, seguint els comentaris numerats:",
      "**1.** Mostrar «Pàgina carregada» a la consola. **2.** Canviar el títol per «Gestor de tasques». **3.** Fer que, en prémer el botó, el paràgraf digui «Has entrat a l'aplicació».",
    ],
    expected: "En executar-lo, el títol canvia i la consola mostra `Pàgina carregada`. En prémer «Entra», apareix el text sota el botó.",
    html: `<h1 id="titol">Sense títol</h1>
<button id="boto">Entra</button>
<p id="missatge"></p>`,
    css: `button { padding: 8px 14px; }`,
    starter: `// 1. Mostra «Pàgina carregada» a la consola


// 2. Canvia el text del títol per «Gestor de tasques»


// 3. Quan es premi el botó, el paràgraf ha de dir «Has entrat a l'aplicació»
function entrar() {

}

document.querySelector("#boto").addEventListener("click", entrar);`,
    hint: [
      "Per al pas 2, fixa't en l'exercici anterior: `document.querySelector(\"#titol\").textContent = \"…\";`.",
      "Per al pas 3 necessites la mateixa instrucció, però amb `#missatge`, i escrita **dins** de les claus de la funció `entrar`.",
    ],
    solution: `// 1. Mostra «Pàgina carregada» a la consola
console.log("Pàgina carregada");

// 2. Canvia el text del títol per «Gestor de tasques»
document.querySelector("#titol").textContent = "Gestor de tasques";

// 3. Quan es premi el botó, el paràgraf ha de dir «Has entrat a l'aplicació»
function entrar() {
  document.querySelector("#missatge").textContent = "Has entrat a l'aplicació";
}

document.querySelector("#boto").addEventListener("click", entrar);`,
    explanation: [
      "Les instruccions 1 i 2 s'executen de seguida, en carregar la pàgina, perquè estan escrites «a fora», al nivell principal del programa.",
      "La instrucció de dins de `entrar` no s'executa fins que algú prem el botó. Aquesta diferència entre *el que passa en carregar* i *el que passa quan l'usuari fa alguna cosa* és una de les idees més importants de JavaScript al navegador.",
    ],
  },

  summary: [
    "HTML aporta el contingut, CSS l'aspecte i **JavaScript el comportament**.",
    "El navegador executa JavaScript de dalt a baix, una instrucció cada vegada.",
    "`console.log()` escriu a la consola. És l'eina bàsica per saber què fa el teu codi.",
    "El JavaScript va en un fitxer extern, connectat amb `<script src=\"app.js\" defer></script>` al `<head>`.",
    "`defer` fa que l'script s'executi quan tot l'HTML ja s'ha llegit.",
    "Un error atura l'execució. La consola et diu el tipus, el missatge, el fitxer i la línia.",
  ],

  quiz: [
    {
      question: "Quin llenguatge s'encarrega que passi alguna cosa quan una persona prem un botó?",
      options: [
        { text: 'JavaScript', correct: true },
        { text: 'HTML', why: "HTML crea el botó, però no pot descriure què ha de passar quan es prem." },
        { text: 'CSS', why: "CSS pot canviar l'aspecte del botó (fins i tot en passar-hi per sobre), però no pot executar accions." },
        { text: 'Cap: els botons ja funcionen sols', why: "Un `<button>` sol no fa res fins que algú hi connecta codi." },
      ],
      explanation: "HTML descriu el contingut i CSS l'aspecte. El comportament, és a dir, què passa quan algú interactua amb la pàgina, és feina de JavaScript.",
    },
    {
      question: "Què fa l'atribut `defer` a `<script src=\"app.js\" defer>`?",
      options: [
        { text: "Fa que l'script s'executi quan el navegador ha acabat de llegir tot l'HTML.", correct: true },
        { text: "Fa que l'script s'executi dues vegades.", why: "L'script s'executa una sola vegada; `defer` només en canvia el moment." },
        { text: "Evita que l'script s'executi fins que l'usuari fa clic.", why: "L'script s'executa sol, sense esperar cap acció: només espera que s'acabi de llegir l'HTML." },
        { text: "Converteix un script extern en intern.", why: "`defer` no canvia on és el codi; a més, només té efecte en scripts externs (amb `src`)." },
      ],
      explanation: "Amb `defer`, el fitxer es descarrega mentre es llegeix la pàgina i s'executa al final. Així tots els elements ja existeixen quan el codi els busca.",
    },
    {
      question: "Què es veu a la consola en executar aquest codi?",
      code: `console.log("A");
consol.log("B");
console.log("C");`,
      options: [
        { text: 'A i després un ReferenceError', correct: true },
        { text: 'A, B i C', why: "`consol` no existeix (hi falta la `e`), de manera que la segona línia falla." },
        { text: 'A, un error i després C', why: "Quan hi ha un error, l'execució s'atura: la tercera línia no s'arriba a executar." },
        { text: "Només un error: no s'executa cap línia", why: "Això passaria amb un error de sintaxi. Aquí el codi està ben escrit; el que falla és un nom que no existeix." },
      ],
      explanation: "La primera línia s'executa bé. La segona provoca un `ReferenceError` perquè `consol` no està definit, i a partir d'aquí JavaScript s'atura.",
    },
    {
      question: "A la consola apareix «Uncaught TypeError: Cannot set properties of null — app.js:4». Què indica `app.js:4`?",
      options: [
        { text: "El fitxer i la línia on s'ha produït l'error.", correct: true },
        { text: "Que hi ha quatre errors al fitxer.", why: "La consola mostra cada error per separat; el número no és un recompte." },
        { text: "Que l'error s'ha repetit quatre vegades.", why: "Quan un missatge es repeteix, el navegador ho indica d'una altra manera, amb un comptador al davant." },
        { text: "Que és la quarta versió del fitxer.", why: "El navegador no sap res de versions: el número sempre és una línia del fitxer." },
      ],
      explanation: "Després del missatge, la consola indica el fitxer i el número de línia. És el primer lloc on has d'anar a mirar.",
    },
  ],
};
