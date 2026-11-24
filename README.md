# Dossiers interactius · HTML, CSS i JavaScript

Aplicació web educativa amb dos dossiers del Grau Superior d'Informàtica:

- **RA1 · HTML i CSS des de zero.** Etiquetes, estils, el model de caixa, pensar en quadrats (contenidors), `display` (block, flex i grid) i `position`. El projecte final és maquetar una pàgina tipus YouTube: la pàgina inicial i la d'un vídeo.
- **RA2 · JavaScript des de zero.** Variables, condicionals, bucles, funcions, arrays i objectes, el DOM, esdeveniments i formularis. El projecte final és afegir JavaScript a aquella mateixa pàgina.

No són documents passats a web: gairebé tot el codi es pot executar i modificar a la mateixa pàgina. Cada dossier treballa amb un exemple guia que creix a cada unitat (una web de rutes de muntanya al RA1, un gestor de tasques al RA2) i acaba en el projecte final.

Només frontend: React + Vite, en JavaScript. Sense backend, sense base de dades i sense serveis externs. El progrés es desa al `localStorage` del navegador.

## Posar-la en marxa

```bash
npm install
npm run dev
```

Altres ordres: `npm run build` genera la versió estàtica a `dist/` i `npm run preview` la serveix en local. Cal Node 20.19 o superior.

## Què hi ha

A la portada (`#/`) es tria el dossier. Cada dossier té:

- **11 unitats.** Cada una comença amb un problema, explica els conceptes amb exemples que es poden modificar i acaba amb errors habituals, 4 exercicis més un de final, resum, vocabulari i qüestionari. L'última és el projecte final, que es construeix per fases.
- **Secció d'exercicis**: només exercicis, sense teoria, agrupats en 10 temes (un per unitat) i ordenats en tres nivells. Reuneix els exercicis de cada unitat i 50 de nous. Cada exercici es pot marcar com a fet, i es marca sol quan està ben resolt.
- **Glossari** amb cercador i índex alfabètic.
- **Cercador** (`Ctrl`/`⌘` + `K`, o la tecla `/`): unitats, apartats, exemples, exercicis, errors habituals i termes del glossari del dossier on s'és. L'índex es construeix al navegador a partir del mateix contingut.
- **Progrés local**: unitats visitades i completades, resultats dels qüestionaris, exercicis fets, última unitat oberta i llista de comprovació del projecte. El mode clar o fosc és comú.
- **Pantalla completa**, de dues menes. La de la pàgina (botó a la capçalera, i a l'inici de cada unitat i de cada tema d'exercicis) amaga la barra lateral i deixa els apunts sols. La de cada editor (botó «Pantalla completa» de qualsevol exemple, exercici o demostració) l'amplia a tota la finestra, amb l'enunciat i el codi a l'esquerra i el resultat a la dreta.

### El dossier d'HTML i CSS (RA1)

Els editors només tenen HTML i CSS, i **la pàgina es torna a pintar mentre s'escriu**: no hi ha botó d'executar. A la previsualització hi ha:

- **«Quadrats»**: dibuixa el contorn de cada caixa de la pàgina, amb el nom dels contenidors. És el dibuix que es faria a la pissarra, tret de la pàgina de veritat.
- **«Objectiu»**, als exercicis: com queda la pàgina amb la solució, per comparar-la amb el resultat propi (també amb els quadrats dibuixats).
- **Comprovacions**: cada exercici porta una llista del que ha de complir el resultat («el menú és una fila», «hi ha 24 píxels entre enllaços»). Es comproven soles mirant on queden les caixes, de manera que qualsevol solució correcta val.
- **Finestra d'escriptori simulada**: les pàgines senceres (el projecte, les maquetes amb capçalera i menú lateral) es pinten amb amplada d'escriptori i es mostren reduïdes si no hi caben, també al mòbil.

I dues demos pròpies: el **dibuix de quadrats** d'una pàgina, que es va obrint nivell a nivell amb l'HTML que li correspon, i un **banc de proves** per a flex, grid, position i el model de caixa.

### El dossier de JavaScript (RA2)

Els exemples i exercicis s'executen amb un botó i tenen consola. Els exercicis de consola comproven sols si la sortida coincideix amb l'esperada. Demos pròpies: les tres capes d'una pàgina, l'ordre d'execució amb `defer`, la traça d'un bucle, els mètodes d'un array, l'arbre del DOM i un inspector d'esdeveniments.

## Estructura

```
src/
├─ content/            El temari, com a dades
│  ├─ blocks.js        Constructors dels blocs de contingut i documentació del format
│  ├─ ra1/             Dossier d'HTML i CSS
│  │  ├─ index.js      Dades del dossier, textos de la portada i llista d'unitats
│  │  ├─ units/        Una unitat per fitxer (amb el seu vocabulari)
│  │  ├─ exercises/    Els exercicis extra, un fitxer per tema
│  │  ├─ projectCode.js       El projecte final (HTML i CSS), peça a peça i fase a fase
│  │  └─ projectChecklist.js
│  └─ ra2/             Dossier de JavaScript, amb la mateixa estructura (i glossary.js)
├─ components/
│  ├─ layout/          Layout, Sidebar, Header, SearchDialog, ProgressBar, TableOfContents, PreviousNextNavigation
│  ├─ lesson/          LessonPage, Section, Blocks, Callouts, ExerciseCard, QuizCard, Glossary
│  ├─ code/            CodeBlock, CodeEditor, CodeRunner, RunnableExample, ConsoleOutput
│  ├─ special/         Demos amb maquetació pròpia
│  └─ ui/              Icon, RichText, ConfirmDialog
├─ pages/              Portada general, portada d'un dossier, exercicis (índex i tema), glossari i pàgina no trobada
├─ state/              Dossier actual, progrés, tema i pantalla completa (context de React)
├─ lib/                Dossiers, rutes, execució aïllada, imatges de mostra, ressaltat de sintaxi, cercador, utilitats
├─ assets/fonts/       Tipografies (Inter i JetBrains Mono), incloses al projecte
└─ styles/             Variables de disseny (clar i fosc), tipografies, base, layout i components
```

Les adreces porten el dossier al davant: `#/ra1/unitat/flexbox`, `#/ra2/exercicis/bucles`, `#/ra1/glossari`. Les adreces d'abans que hi hagués dos dossiers (`#/unitat/variables`, `#/exercicis`, `#/glossari`) continuen funcionant.

## Disseny

Tot l'aspecte surt de `src/styles/tokens.css`: colors, radis, ombres i mides. El mode fosc només redefineix aquestes variables, de manera que canviar el color principal o el d'un tipus de caixa és tocar una línia.

Les tipografies són **Inter** (text) i **JetBrains Mono** (codi), amb llicència SIL OFL 1.1. Els fitxers són a `src/assets/fonts/` i es declaren a `src/styles/fonts.css`: no es carrega res de cap servidor extern i no afegeixen cap dependència a `package.json`. Si es treuen, l'aplicació fa servir les tipografies del sistema.

## Com s'executa el codi de l'alumnat

El codi no s'executa mai dins de l'aplicació. Va a un `<iframe sandbox="allow-scripts allow-forms">`, sense `allow-same-origin`: un origen aïllat que no pot accedir al document, a les galetes ni al `localStorage` de l'aplicació, i no es fa servir `eval()` sobre el context de l'app. L'iframe es comunica amb `postMessage` (`src/lib/sandbox.js` i `src/lib/sandboxRuntime.js`).

**Al dossier de JavaScript**, cada «Executar» crea un iframe nou, que s'encarrega de:

- capturar `console.log`, `warn`, `error` i `table`, i els errors de sintaxi i d'execució amb el número de línia;
- aturar els bucles infinits al cap d'un segon (`src/lib/loopGuard.js`);
- oferir un `localStorage` de prova que es conserva entre execucions del mateix exemple;
- avisar quan un formulari s'envia sense `preventDefault()`, en lloc de recarregar de veritat;
- explicar on portaria un enllaç a una altra pàgina (`video.html`), en lloc de sortir de la previsualització.

Un exemple pot tenir un segon fitxer de JavaScript (`dataJs`, per defecte `dades.js`) que s'executa abans que el principal, i pot posar nom a les pestanyes amb `fileNames`.

**Al dossier d'HTML i CSS**, la pàgina es torna a carregar sola quan es deixa d'escriure. No s'hi afegeix cap estil de base: es veu amb els del navegador, com un fitxer `.html` obert de veritat. A més:

- L'HTML pot ser un tros (el que aniria dins del `<body>`) o un document sencer. Si és un document sencer, el CSS de la pestanya només s'aplica quan el `<head>` té `<link rel="stylesheet" href="estils.css">`, com a la realitat; si el nom no coincideix, apareix un avís.
- Les imatges són de mostra i es generen al navegador (`src/lib/sampleImages.js`): `imatges/foto.jpg`, `imatges/ruta-1.jpg`, `imatges/miniatura-1.jpg`, `imatges/avatar-1.png`… Un nom que no existeix es veu com una imatge trencada, amb un avís. No es descarrega res.
- Els quadrats i les comprovacions es calculen dins del mateix iframe. Les comprovacions són dades (un selector i unes condicions), no codi.

## Pantalla completa

La maquetació de la pantalla completa és sempre CSS (`src/state/FullscreenContext.jsx` només porta l'estat), de manera que funciona a tots els navegadors. Quan el navegador ho permet, a més es demana la pantalla completa de veritat amb l'API Fullscreen; on no existeix, com a l'iPhone, es queda en «finestra completa».

L'editor ampliat és el mateix element, que passa a `position: fixed`: no canvia de lloc dins del document, i per això l'iframe no es recarrega i es conserva tot el que s'hi havia fet. Mentre està ampliat fa de diàleg (el focus no en surt) i es tanca amb el botó «Surt», amb `Escape` o canviant de pàgina.

## Editar o ampliar el temari

El contingut no viu dins dels components. Cada unitat és un objecte amb `sections`, `commonErrors`, `exercises`, `finalExercise`, `summary` i `quiz`; cada apartat és una llista de blocs creats amb les funcions de `content/blocks.js`:

```js
p("Text amb `codi`, **negreta** i [enllaços](#/unitat/variables)."),
example({ title: 'Preu amb IVA', intro: '…', js: `const preu = 100;` }),           // RA2
example({ title: 'Tres caixes en fila', html: `…`, css: `…`, boxes: true }),      // RA1
concept('Idea clau', '…'),
```

El format complet (camps dels exemples i exercicis de cada dossier, imatges disponibles, comprovacions i components) està documentat al mateix `content/blocks.js`.

Per afegir una unitat, crea el fitxer a `content/ra1/units/` o `content/ra2/units/` seguint l'estructura de les altres i afegeix-lo a l'`index.js` del dossier. Els identificadors de les unitats no es poden repetir entre dossiers.

Per afegir exercicis a la secció d'exercicis, escriu-los al fitxer del seu tema a `exercises/`, amb el mateix format que els de les unitats i un `level` (1 bàsic, 2 mitjà, 3 repte). Els exercicis de les unitats no porten nivell: els dos primers es consideren bàsics, els dos següents mitjans i l'exercici final un repte.

Un exercici del RA1 porta els fitxers de partida (`html`, `css`), la solució (`solution: { html, css }`, només els fitxers que canvien) i les comprovacions:

```js
checks: [
  { label: 'Els tres enllaços estan en fila', selector: '.menu a', arrange: 'row' },
  { label: 'Hi ha 24 píxels entre enllaç i enllaç', selector: '.menu a', gap: 24 },
],
```

Convé que les comprovacions mirin on queden les caixes i no quina propietat s'ha fet servir, i que passin a qualsevol amplada (o que l'exercici fixi la de la finestra simulada amb `width`).

### Els projectes finals

Els dos projectes parteixen d'una pàgina de mostra, ClasseTube, perquè el dossier no té accés a les pàgines de cada alumne. La maqueta és a `content/ra1/projectCode.js` i les seves interaccions, a `content/ra2/projectCode.js`; tots dos fan servir els mateixos noms de classe. Si el vostre disseny en fa servir d'altres, el que cal adaptar és l'HTML i el CSS de mostra d'aquests fitxers i, al RA2, els selectors de les peces de JavaScript.

El projecte anterior del RA2, que consistia a muntar el gestor de tasques fase a fase, s'ha conservat fora de l'aplicació, a `arxiu/gestor-de-tasques/`. No es carrega ni s'inclou al `build`; es pot esborrar si no es vol recuperar.

Un detall a tenir present: el codi dels exemples s'escriu dins de *template literals*, de manera que els accents greus i els `${` del codi de l'alumne s'han d'escapar (`` \` `` i `\${`).
