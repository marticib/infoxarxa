# JavaScript des de zero · Dossier interactiu RA2

Aplicació web educativa per estudiar el RA2 d'introducció a JavaScript (Grau Superior d'Informàtica). No és un document passat a web: gairebé tot el codi es pot executar i modificar a la mateixa pàgina. Les unitats treballen amb un exemple guia, un gestor de tasques, i acaben en un projecte final: afegir JavaScript a la pàgina tipus YouTube que es va maquetar al RA1.

Només frontend: React + Vite, en JavaScript. Sense backend, sense base de dades i sense serveis externs. El progrés es desa al `localStorage` del navegador.

## Posar-la en marxa

```bash
npm install
npm run dev
```

Altres ordres: `npm run build` genera la versió estàtica a `dist/` i `npm run preview` la serveix en local. Cal Node 20.19 o superior.

## Què hi ha

- **11 unitats**: de «JavaScript entra a la pàgina» fins al projecte final. Cada una comença amb un problema, explica els conceptes amb exemples executables i acaba amb errors habituals, 4 exercicis més un de final, resum, vocabulari i qüestionari.
- **Exemples i exercicis executables** amb editor, consola, pista i solució amagada. Els exercicis de consola comproven sols si la sortida coincideix amb l'esperada.
- **Secció d'exercicis** (`#/exercicis`): només exercicis, sense teoria, agrupats en 10 temes (un per unitat) i ordenats en tres nivells. Reuneix els exercicis de cada unitat i 50 de nous. Cada exercici es pot marcar com a fet; els de consola es marquen sols quan la sortida és correcta.
- **Projecte final** (unitat 11): les interaccions principals d'una pàgina tipus YouTube, en dues pàgines (la inicial i la del vídeo) que comparteixen un fitxer de dades. Es construeix en 9 fases, cadascuna amb un exemple executable, i té 5 ampliacions.
- **Demos interactives**: les tres capes d'una pàgina, l'ordre d'execució amb `defer`, la traça d'un bucle, els mètodes d'un array, l'arbre del DOM i un inspector d'esdeveniments.
- **Progrés local**: unitats visitades i completades, resultats dels qüestionaris, exercicis fets, última unitat oberta, llista de comprovació del projecte i mode clar o fosc.
- **Cercador global** (`Ctrl`/`⌘` + `K`, o la tecla `/`): unitats, apartats, exemples, exercicis, errors habituals i termes del glossari. L'índex es construeix al navegador a partir del mateix contingut.
- **Navegació**: recorregut d'unitats a la barra lateral, índex de la unitat (columna a la dreta en pantalles amples, barra flotant en mòbil i tauleta), enllaç directe a cada apartat i barra de progrés de lectura.
- **Pantalla completa**, de dues menes. La de la pàgina (botó a la capçalera, i a l'inici de cada unitat i de cada tema d'exercicis) amaga la barra lateral i deixa els apunts sols. La de cada editor (botó «Pantalla completa» de qualsevol exemple, exercici o demostració) l'amplia a tota la finestra, amb l'enunciat i el codi a l'esquerra i el resultat a la dreta.
- **Glossari** amb cercador i índex alfabètic.

## Estructura

```
src/
├─ content/            El temari, com a dades
│  ├─ units/           Una unitat per fitxer
│  ├─ exercises/       Els exercicis extra, un fitxer per tema
│  ├─ blocks.js        Constructors dels blocs de contingut (paràgraf, exemple, avís…)
│  ├─ projectCode.js   El codi del projecte final (HTML, CSS i JavaScript), peça a peça i fase a fase
│  ├─ projectChecklist.js
│  ├─ glossary.js
│  └─ index.js         Llista ordenada d'unitats
├─ components/
│  ├─ layout/          Layout, Sidebar, Header, SearchDialog, ProgressBar, TableOfContents, PreviousNextNavigation
│  ├─ lesson/          LessonPage, Section, Blocks, Callouts, ExerciseCard, QuizCard, Glossary
│  ├─ code/            CodeBlock, CodeEditor, CodeRunner, RunnableExample, ConsoleOutput
│  ├─ special/         Demos amb maquetació pròpia
│  └─ ui/              Icon, RichText, ConfirmDialog
├─ pages/              Portada, secció d'exercicis (índex i tema), glossari i pàgina no trobada
├─ state/              Progrés, tema i pantalla completa (context de React; el progrés i el tema, a localStorage)
├─ lib/                Execució aïllada, ressaltat de sintaxi, rutes, índex del cercador, banc d'exercicis, utilitats
├─ assets/fonts/       Tipografies (Inter i JetBrains Mono), incloses al projecte
└─ styles/             Variables de disseny (clar i fosc), tipografies, base, layout i components
```

## Disseny

Tot l'aspecte surt de `src/styles/tokens.css`: colors, radis, ombres i mides. El mode fosc només redefineix aquestes variables, de manera que canviar el color principal o el d'un tipus de caixa és tocar una línia.

Les tipografies són **Inter** (text) i **JetBrains Mono** (codi), amb llicència SIL OFL 1.1. Els fitxers són a `src/assets/fonts/` i es declaren a `src/styles/fonts.css`: no es carrega res de cap servidor extern i no afegeixen cap dependència a `package.json`. Si es treuen, l'aplicació fa servir les tipografies del sistema.

## Com s'executa el codi de l'alumnat

Cada «Executar» crea un `<iframe sandbox="allow-scripts allow-forms">` nou, sense `allow-same-origin`. El codi hi corre en un origen aïllat: no pot accedir al document, a les galetes ni al `localStorage` de l'aplicació, i no es fa servir `eval()` sobre el context de l'app. L'iframe es comunica amb `postMessage` (`src/lib/sandbox.js` i `src/lib/sandboxRuntime.js`) i s'encarrega de:

- capturar `console.log`, `warn`, `error` i `table`, i els errors de sintaxi i d'execució amb el número de línia;
- aturar els bucles infinits al cap d'un segon (`src/lib/loopGuard.js`);
- oferir un `localStorage` de prova que es conserva entre execucions del mateix exemple;
- avisar quan un formulari s'envia sense `preventDefault()`, en lloc de recarregar de veritat;
- explicar on portaria un enllaç a una altra pàgina (`video.html`), en lloc de sortir de la previsualització.

Un exemple pot tenir un segon fitxer de JavaScript (`dataJs`, per defecte `dades.js`) que s'executa abans que el principal, en el seu propi `<script>`, i pot posar nom a les pestanyes amb `fileNames`. Així els exemples del projecte mostren els fitxers de veritat: `inici.js`, `dades.js`, `index.html` i `estils.css`.

## Pantalla completa

La maquetació de la pantalla completa és sempre CSS (`src/state/FullscreenContext.jsx` només porta l'estat), de manera que funciona a tots els navegadors. Quan el navegador ho permet, a més es demana la pantalla completa de veritat amb l'API Fullscreen; on no existeix, com a l'iPhone, es queda en «finestra completa».

L'editor ampliat és el mateix element, que passa a `position: fixed`: no canvia de lloc dins del document, i per això l'iframe no es recarrega i es conserva tot el que s'hi havia fet. Mentre està ampliat fa de diàleg (el focus no en surt) i es tanca amb el botó «Surt», amb `Escape` o canviant de pàgina.

## Editar o ampliar el temari

El contingut no viu dins dels components. Cada unitat és un objecte amb `sections`, `commonErrors`, `exercises`, `finalExercise`, `summary` i `quiz`; cada apartat és una llista de blocs creats amb les funcions de `content/blocks.js`:

```js
p("Text amb `codi`, **negreta** i [enllaços](#/unitat/variables)."),
example({ title: 'Preu amb IVA', intro: '…', js: `const preu = 100;` }),
concept('Idea clau', '…'),
```

Per afegir una unitat, crea el fitxer a `content/units/` seguint l'estructura de les altres i afegeix-lo a `content/index.js`.

Per afegir exercicis a la secció d'exercicis, escriu-los al fitxer del seu tema a `content/exercises/`, amb el mateix format que els de les unitats i un `level` (1 bàsic, 2 mitjà, 3 repte). Els exercicis de les unitats no porten nivell: els dos primers es consideren bàsics, els dos següents mitjans i l'exercici final un repte.

### El projecte final

El projecte parteix d'una pàgina de mostra, ClasseTube, perquè el dossier no té accés a les pàgines que cada alumne va fer al RA1. Tot el seu codi és a `content/projectCode.js`. Si el vostre HTML del RA1 fa servir altres classes o identificadors, el que cal adaptar és l'HTML i el CSS de mostra d'aquest fitxer (`homeHtml`, `videoHtml` i `PROJECT_CSS`) i els selectors de les peces de JavaScript.

El projecte anterior, que consistia a muntar el gestor de tasques fase a fase, s'ha conservat fora de l'aplicació, a `arxiu/gestor-de-tasques/`. No es carrega ni s'inclou al `build`; es pot esborrar si no es vol recuperar.

Un detall a tenir present: el codi dels exemples s'escriu dins de *template literals*, de manera que els accents greus i els `${` del codi de l'alumne s'han d'escapar (`` \` `` i `\${`).
