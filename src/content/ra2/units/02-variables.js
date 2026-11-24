import { p, list, subtitle, example, concept, warning, challenge, project, table, compare } from '../../blocks.js';

export default {
  id: 'variables',
  number: 2,
  title: 'Variables i tipus de dades',
  shortTitle: 'Variables i tipus de dades',
  description:
    "Com es guarden dades per fer-les servir més endavant, quins tipus de dades hi ha i què passa quan es barregen.",

  problem: {
    title: "Ara podem reaccionar a un clic, però necessitem recordar dades",
    text: [
      "El botó de la unitat anterior sempre feia el mateix: mostrava un text fix que havíem escrit a mà. Però un gestor de tasques no pot funcionar amb textos fixos. Ha de saber quantes tasques hi ha, quin text té cadascuna i si ja està feta o no. I tot això canvia mentre la persona fa servir l'aplicació.",
      "Ens falta una manera de **guardar** una dada, posar-li un nom i recuperar-la més tard. D'això en diem variables, i són la primera eina de qualsevol llenguatge de programació.",
    ],
  },

  goals: [
    "Declarar variables amb `const` i `let` i triar la que toca en cada cas.",
    "Distingir els tipus bàsics: text, nombre i booleà, a més de `null` i `undefined`.",
    "Fer càlculs i construir frases que barregen text i valors.",
    "Convertir un valor d'un tipus a un altre i preveure què passa si no ho fas.",
  ],

  projectPiece:
    "Les dades d'una tasca deixen d'estar escrites a mà dins del codi: el text de la tasca, si està completada i el nombre de tasques pendents passen a ser variables amb nom.",

  finalProject:
    "L'estat de les pàgines seran variables: el text de la cerca, la categoria triada o si has fet «m'agrada».",

  sections: [
    {
      id: 'que-es-una-variable',
      title: 'Què és una variable',
      blocks: [
        p("Una **variable** és un nom que posem a un valor per poder-lo fer servir més endavant. En lloc d'escriure el mateix valor cada vegada, el guardem una sola vegada i després ens hi referim pel nom."),
        example({
          title: "Nom i edat d'una alumna",
          intro: "Dues variables: una guarda un text i l'altra, un nombre.",
          js: `const nom = "Anna";
const edat = 19;

console.log(nom);
console.log(edat);`,
          expected: "Dues línies: `Anna` i `19`.",
          why: "`const nom = \"Anna\";` crea una variable que es diu `nom` i hi guarda el text `\"Anna\"`. Quan després escrivim `nom` (sense cometes), JavaScript va a buscar el valor guardat.",
        }),
        p("Aquesta instrucció s'anomena **declaració**, i sempre té les mateixes quatre parts:"),
        list(
          "Una paraula clau: `const` o `let` (de seguida veurem la diferència).",
          "El **nom** que triem per a la variable.",
          "El signe `=`, que aquí vol dir «guarda-hi», no «és igual a».",
          "El **valor** que hi volem guardar."
        ),
        warning(
          'Amb cometes és un text; sense cometes és un nom',
          "`console.log(nom)` mostra el valor guardat a la variable: `Anna`. En canvi, `console.log(\"nom\")` mostra literalment la paraula `nom`. No dona cap error, i per això és una confusió difícil de veure."
        ),
        subtitle('Com triar un bon nom'),
        p("El nom d'una variable el tries tu, però hi ha regles i costums:"),
        list(
          "No pot tenir espais ni començar per un número.",
          "Quan té més d'una paraula, s'escriu en **camelCase**: tot junt, i cada paraula nova comença en majúscula (`preuTotal`, `tasquesPendents`).",
          "Les majúscules compten: `edat` i `Edat` són dues variables diferents.",
          "Ha d'explicar què conté. `preuAmbIva` és millor que `p2` o que `x`.",
          "Encara que el llenguatge ho permet, eviterem accents i caràcters especials: `numero`, no `número`."
        ),
        challenge({
          statement: "Crea una variable `ciutat` amb el nom de la teva ciutat i una variable `habitants` amb un nombre aproximat. Mostra les dues a la consola.",
          starter: `// Declara les dues variables i mostra-les
`,
          hint: "El text va entre cometes i el nombre no. Fes servir `const` per a totes dues.",
          solution: `const ciutat = "Manresa";
const habitants = 78000;

console.log(ciutat);
console.log(habitants);`,
          explanation: "Cada declaració guarda un valor sota un nom. A `console.log()` hi passem el nom sense cometes perquè volem el valor guardat, no la paraula.",
        }),
      ],
    },

    {
      id: 'const-i-let',
      title: 'const i let',
      blocks: [
        p("Hi ha dues paraules per declarar variables, i la diferència entre elles és una sola: si el valor podrà canviar o no."),
        table(
          ['Paraula', 'El valor pot canviar?', 'Quan la farem servir'],
          [
            ['`const`', 'No', "Sempre que es pugui: és l'opció per defecte."],
            ['`let`', 'Sí', 'Només quan sabem que el valor haurà de canviar: comptadors, acumuladors, estats.'],
          ]
        ),
        example({
          title: 'Un valor fix i un que canvia',
          intro: "El nom de l'aplicació no canvia mai; el nombre de tasques pendents, sí.",
          js: `const nomApp = "Gestor de tasques";
let tasquesPendents = 3;

console.log(tasquesPendents);

tasquesPendents = 2;
console.log(tasquesPendents);`,
          expected: "Primer `3` i després `2`.",
          why: "A la línia 6 **no** tornem a escriure `let`: la variable ja existeix i només li assignem un valor nou. Declarar es fa una sola vegada; assignar, tantes com calgui.",
        }),
        example({
          title: 'Què passa si intentem canviar una constant',
          intro: "Executa'l i llegeix l'error. Després canvia `const` per `let` a la primera línia i torna-ho a provar.",
          js: `const iva = 0.21;
console.log(iva);

iva = 0.10;
console.log(iva);`,
          expected: "Es mostra `0.21` i després un `TypeError` a la línia 4.",
          why: "`const` és una promesa: «aquest nom sempre apuntarà al mateix valor». Si el codi intenta trencar-la, JavaScript s'atura i t'avisa.",
        }),
        concept(
          'const per defecte, let quan calgui',
          "Declara-ho tot amb `const`. Si més endavant necessites canviar el valor, JavaScript t'avisarà amb un error i llavors ho canvies a `let`. Així, quan algú llegeix el teu codi i veu un `let`, sap que aquella variable canviarà en algun moment."
        ),
        subtitle('Per què no farem servir var'),
        p("En tutorials i codi antic trobaràs una tercera paraula: `var`. Era l'única manera de declarar variables fins al 2015, i encara funciona. Però té dos comportaments que provoquen errors difícils de trobar:"),
        list(
          "Permet declarar dues vegades la mateixa variable sense avisar, de manera que pots trepitjar un valor sense adonar-te'n.",
          "Les seves regles sobre *on* existeix la variable són confuses. Ho veurem quan parlem de l'àmbit, a la unitat de funcions."
        ),
        compare(
          {
            title: 'Amb var: cap avís',
            tone: 'bad',
            code: `var total = 10;
// ... 200 línies més avall ...
var total = 0;
console.log(total); // 0`,
            text: "Hem perdut el valor original sense voler i ningú ens ha dit res.",
          },
          {
            title: 'Amb let: error immediat',
            tone: 'good',
            code: `let total = 10;
// ... 200 línies més avall ...
let total = 0;
// SyntaxError: Identifier 'total'
// has already been declared`,
            text: "JavaScript detecta el problema abans d'executar res.",
          }
        ),
        p("Si trobes `var` en un exemple d'Internet, llegeix-lo com si fos `let`. Però en el teu codi, no l'escriguis."),
      ],
    },

    {
      id: 'tipus-de-dades',
      title: 'Tipus de dades',
      blocks: [
        p("No totes les dades són iguals: no és el mateix un nom que una edat, ni una edat que la resposta a «està completada?». Cada valor de JavaScript té un **tipus**, i el tipus determina què s'hi pot fer."),
        table(
          ['Tipus', 'Què representa', 'Exemples'],
          [
            ['`string`', 'Text', '`"Anna"`, `"Estudiar JavaScript"`, `""` (text buit)'],
            ['`number`', 'Nombres, enters o decimals', '`19`, `3.5`, `-2`, `0`'],
            ['`boolean`', 'Cert o fals', '`true`, `false`'],
            ['`undefined`', 'Encara no té cap valor', 'Una variable declarada sense valor'],
            ['`null`', "Buit expressament: «aquí no hi ha res»", '`null`'],
          ],
          'Els tipus de dades bàsics'
        ),
        p("L'operador `typeof` ens diu de quin tipus és un valor. És una eina molt útil quan alguna cosa no es comporta com esperaves."),
        example({
          title: 'Preguntar el tipus amb typeof',
          intro: "Fixa't en l'última variable: l'hem declarat, però no li hem donat cap valor.",
          js: `console.log(typeof "Anna");
console.log(typeof 19);
console.log(typeof true);

let telefon;
console.log(telefon);
console.log(typeof telefon);`,
          expected: "`string`, `number`, `boolean`, `undefined` i `undefined`.",
          why: "Una variable declarada amb `let` i sense valor conté `undefined`: és la manera que té JavaScript de dir «això existeix, però encara no hi ha res».",
        }),
        subtitle('Text: string'),
        p("Un **string** és una seqüència de caràcters entre cometes. Poden ser dobles (`\"Anna\"`) o simples (`'Anna'`): funcionen igual, però tria'n unes i mantén-les. En aquest dossier fem servir les dobles. Tots els strings tenen una propietat `length` que diu quants caràcters tenen: `\"Anna\".length` val `4`."),
        subtitle('Nombres: number'),
        p("JavaScript té un sol tipus per a tots els nombres, enters i decimals. Els decimals s'escriuen amb **punt**, no amb coma: `3.5`. I mai entre cometes: `\"3.5\"` ja no és un nombre, és un text."),
        subtitle('Cert o fals: boolean'),
        p("Un **booleà** només pot valer `true` o `false`, sense cometes. Serveix per guardar respostes de sí o no: `completada`, `esMajorEdat`, `teDescompte`. A la unitat següent veurem que són la base de totes les decisions."),
        subtitle('Els dos buits: undefined i null'),
        p("`undefined` vol dir «encara no s'hi ha posat res» i normalment el posa JavaScript. `null` vol dir «aquí no hi ha res, i ho sé»: el posem nosaltres expressament, o ens el retorna el navegador quan busca una cosa i no la troba (com passava amb `querySelector` a la unitat 1)."),
        warning(
          'typeof null diu "object"',
          "És un error de disseny de les primeres versions de JavaScript que ja no es pot corregir sense trencar pàgines antigues. Per saber si una variable és `null`, compara-la directament: `valor === null`."
        ),
        subtitle('Valor i tipus no són el mateix'),
        example({
          title: 'El 5 i el "5"',
          intro: "A la consola semblen iguals, però no ho són.",
          js: `const a = 5;
const b = "5";

console.log(a, typeof a);
console.log(b, typeof b);`,
          expected: "`5 number` i `5 string`.",
          why: "`5` és un nombre: s'hi poden fer operacions. `\"5\"` és un text que conté el caràcter 5, igual que podria contenir una lletra. Aquesta diferència provoca un dels errors més habituals, com veuràs al final de la unitat.",
        }),
        concept(
          'Tot valor té un tipus',
          "Davant d'un resultat estrany, la primera pregunta és: *de quin tipus és, realment, aquest valor?* Respondre-la amb `typeof` estalvia molta estona."
        ),
      ],
    },

    {
      id: 'operadors-matematics',
      title: 'Operadors matemàtics',
      blocks: [
        p("Amb els nombres es poden fer càlculs. Els operadors són els de tota la vida, amb un parell de símbols propis:"),
        table(
          ['Operador', 'Operació', 'Exemple', 'Resultat'],
          [
            ['`+`', 'Suma', '`7 + 2`', '`9`'],
            ['`-`', 'Resta', '`7 - 2`', '`5`'],
            ['`*`', 'Multiplicació', '`7 * 2`', '`14`'],
            ['`/`', 'Divisió', '`7 / 2`', '`3.5`'],
            ['`%`', 'Residu de la divisió', '`7 % 2`', '`1`'],
            ['`**`', 'Potència', '`7 ** 2`', '`49`'],
          ]
        ),
        p("L'operador `%` no té res a veure amb els percentatges: dona el que *sobra* en dividir. `7 % 2` és `1` perquè 7 entre 2 fa 3 i en sobra 1. Sembla poc útil, però és la manera de saber si un nombre és parell: si `numero % 2` dona `0`, ho és."),
        example({
          title: 'Preu amb IVA',
          intro: "El preu final és el preu original més la part que correspon a l'IVA.",
          js: `const preu = 100;
const iva = 0.21;

const preuFinal = preu + preu * iva;
console.log(preuFinal);`,
          expected: "`121`",
          why: "JavaScript respecta la prioritat de les operacions: primer multiplica (`preu * iva` fa `21`) i després suma. A la dreta del `=` hi pot haver qualsevol càlcul; a la variable s'hi guarda el resultat.",
        }),
        example({
          title: 'Mitjana de tres notes',
          intro: "Dos càlculs gairebé iguals. Només un és la mitjana.",
          js: `const nota1 = 7;
const nota2 = 8;
const nota3 = 6;

const senseParentesis = nota1 + nota2 + nota3 / 3;
const mitjana = (nota1 + nota2 + nota3) / 3;

console.log(senseParentesis);
console.log(mitjana);`,
          expected: "`17` i `7`.",
          why: "Sense parèntesis, la divisió es fa primer i només afecta `nota3`: 7 + 8 + 2. Els parèntesis obliguen a sumar abans de dividir. Quan tinguis dubtes, posa parèntesis: no fan cap mal i deixen clara la intenció.",
        }),
        example({
          title: 'Conversió de temperatura',
          intro: "Per passar de graus Celsius a Fahrenheit es multiplica per 9, es divideix per 5 i se suma 32.",
          js: `const celsius = 25;
const fahrenheit = celsius * 9 / 5 + 32;

console.log(fahrenheit);`,
          expected: "`77`",
        }),
        subtitle("Canviar una variable a partir d'ella mateixa"),
        p("Sovint volem modificar una variable fent servir el valor que ja té: sumar-li un, restar-li dos. Això s'escriu `pendents = pendents + 1`, que es llegeix «agafa el valor de `pendents`, suma-hi 1 i guarda el resultat a `pendents`». Com que és tan habitual, hi ha dreceres:"),
        table(
          ['Drecera', 'Equival a', 'Què fa'],
          [
            ['`pendents += 2`', '`pendents = pendents + 2`', 'Suma 2'],
            ['`pendents -= 2`', '`pendents = pendents - 2`', 'Resta 2'],
            ['`pendents++`', '`pendents = pendents + 1`', 'Suma 1'],
            ['`pendents--`', '`pendents = pendents - 1`', 'Resta 1'],
          ]
        ),
        example({
          title: 'Un comptador que puja i baixa',
          intro: "Intenta predir els quatre valors abans d'executar-lo.",
          js: `let pendents = 3;

pendents = pendents + 1;
console.log(pendents);

pendents += 2;
console.log(pendents);

pendents++;
console.log(pendents);

pendents--;
console.log(pendents);`,
          expected: "`4`, `6`, `7` i `6`.",
          why: "Com que la variable canvia, ha de ser `let`. Les dreceres `++` i `--` les farem servir constantment a la unitat de bucles.",
        }),
        warning(
          'Els decimals no sempre són exactes',
          "Prova `console.log(0.1 + 0.2)`: no dona `0.3`, sinó `0.30000000000000004`. No és un error de JavaScript: passa en gairebé tots els llenguatges per com els ordinadors guarden els decimals. De moment n'hi ha prou que no t'espantis si veus un resultat així."
        ),
      ],
    },

    {
      id: 'unir-text',
      title: 'Unir text: concatenació i template literals',
      blocks: [
        p("Gairebé mai voldrem mostrar una dada tota sola. Volem frases: «Tens 3 tasques pendents». Per construir-les hem d'unir trossos de text amb valors de variables."),
        p("La manera clàssica és la **concatenació**: amb strings, l'operador `+` no suma, sinó que enganxa."),
        example({
          title: 'Concatenar amb +',
          intro: "Fixa't en els espais de dins de les cometes: si no els poses tu, no hi són.",
          js: `const nom = "Anna";
const edat = 19;

console.log("Em dic " + nom + " i tinc " + edat + " anys.");`,
          expected: "`Em dic Anna i tinc 19 anys.`",
          why: "Quan un dels dos costats del `+` és un text, JavaScript converteix l'altre a text i els enganxa. Per això el nombre `19` acaba dins de la frase.",
        }),
        p("Funciona, però amb tantes cometes i signes `+` és fàcil descuidar-se un espai. Hi ha una manera més clara: els **template literals**. S'escriuen entre accents greus (`` ` ``) en lloc de cometes, i tot el que posem dins de `${ }` es calcula i se substitueix pel seu valor."),
        example({
          title: 'El mateix amb template literals',
          intro: "Dins de les claus hi pot anar una variable o qualsevol càlcul.",
          js: `const nom = "Anna";
const edat = 19;

console.log(\`Em dic \${nom} i tinc \${edat} anys.\`);
console.log(\`L'any que ve en tindré \${edat + 1}.\`);`,
          expected: "`Em dic Anna i tinc 19 anys.` i `L'any que ve en tindré 20.`",
          why: "La frase es llegeix gairebé com quedarà escrita. Els espais i la puntuació són on els veus, i no cal obrir i tancar cometes a cada tros.",
        }),
        p("L'accent greu és el que hi ha a la tecla de la dreta de la **P** en un teclat en català o castellà. Com que és una tecla d'accent, cal prémer-la i després fer un espai perquè aparegui."),
        concept(
          'Text + valors: template literals',
          "Sempre que hagis de barrejar text i variables, fes servir accents greus i `${ }`. Recorda que amb cometes normals no funciona: `\"Hola, ${nom}\"` mostra literalment `Hola, ${nom}`."
        ),
        challenge({
          statement: "Tens les dades d'un producte. Mostra-les en una sola frase amb aquest format: `Teclat mecànic: 45 € (queden 8 unitats)`.",
          starter: `const producte = "Teclat mecànic";
const preu = 45;
const estoc = 8;

// Mostra la frase amb un template literal
`,
          expectedOutput: ['Teclat mecànic: 45 € (queden 8 unitats)'],
          hint: "Escriu la frase entre accents greus i substitueix cada dada per `${nomDeLaVariable}`.",
          solution: `const producte = "Teclat mecànic";
const preu = 45;
const estoc = 8;

console.log(\`\${producte}: \${preu} € (queden \${estoc} unitats)\`);`,
          explanation: "Tot el que queda fora de `${ }` es mostra tal com està escrit, inclosos els dos punts, el símbol de l'euro i els parèntesis.",
        }),
      ],
    },

    {
      id: 'conversions',
      title: 'Conversions entre tipus',
      blocks: [
        p("Hem vist que amb strings el `+` enganxa en lloc de sumar. Això té una conseqüència que convé conèixer bé, perquè apareix el primer dia que treballes amb formularis: **tot el que una persona escriu en un camp de text arriba a JavaScript com a string**, encara que hi hagi escrit un número."),
        example({
          title: 'Sumar un nombre i un text',
          intro: "La variable `quantitat` simula un valor que ve d'un formulari: és un text.",
          js: `const quantitat = "5";

console.log(quantitat + 3);
console.log(quantitat * 3);
console.log(Number(quantitat) + 3);`,
          expected: "`53`, `15` i `8`.",
          why: "Amb `+`, com que hi ha un text, JavaScript enganxa: `\"5\"` i `3` fan `\"53\"`. Amb `*` no té sentit enganxar, així que converteix el text a nombre pel seu compte. Aquesta falta de coherència és una font d'errors: és millor no dependre'n i convertir nosaltres, amb `Number()`.",
        }),
        p("JavaScript ofereix tres funcions per convertir un valor al tipus que ens interessa:"),
        table(
          ['Funció', 'Converteix a', 'Exemples'],
          [
            ['`Number()`', 'Nombre', '`Number("42")` → `42` · `Number("3.5")` → `3.5` · `Number("")` → `0`'],
            ['`String()`', 'Text', '`String(42)` → `"42"` · `String(true)` → `"true"`'],
            ['`Boolean()`', 'Cert o fals', '`Boolean("hola")` → `true` · `Boolean(0)` → `false`'],
          ]
        ),
        subtitle('Quan la conversió no és possible: NaN'),
        p("Què passa si demanem `Number(\"hola\")`? No hi ha cap nombre raonable per a aquest text, així que el resultat és un valor especial: `NaN`, de *Not a Number* («no és un nombre»). I és contagiós: qualsevol càlcul amb `NaN` torna a donar `NaN`."),
        example({
          title: 'Conversions, una per una',
          intro: "Prediu cada resultat abans d'executar-lo. N'hi ha alguna que sorprèn.",
          js: `console.log(Number("42") + 1);
console.log(Number("hola"));
console.log(Number("hola") + 1);
console.log(String(42) + 1);

console.log(Boolean(""));
console.log(Boolean("hola"));
console.log(Boolean(0));
console.log(Boolean(7));`,
          expected: "`43`, `NaN`, `NaN`, `421`, `false`, `true`, `false` i `true`.",
          why: "`String(42) + 1` dona `421` perquè, un cop convertit a text, el `+` torna a enganxar. I amb `Boolean()` la regla és senzilla: els valors «buits» donen `false` i tota la resta dona `true`.",
        }),
        concept(
          'Els valors que compten com a false',
          "Només hi ha sis valors que `Boolean()` converteix a `false`: `false`, `0`, `\"\"` (text buit), `null`, `undefined` i `NaN`. Qualsevol altre valor es converteix a `true`, inclosos `\"0\"` i `\"false\"`, que són textos i no estan buits."
        ),
        project(
          "Amb el que saps ja pots descriure una tasca amb variables. El text és un string, l'estat és un booleà i el nombre de tasques pendents és un nombre que canvia, de manera que ha de ser `let`.",
          {
            title: 'Les dades del gestor, amb nom',
            code: `const textTasca = "Estudiar JavaScript";
let completada = false;
let tasquesPendents = 1;

console.log(\`Tasca: \${textTasca}\`);
console.log(\`Completada: \${completada}\`);
console.log(\`Pendents: \${tasquesPendents}\`);`,
          }
        ),
        p("Encara no és gaire cosa: tenim les dades, però el programa no pot fer res diferent segons el que valguin. Això és exactament el que resoldrem a la unitat següent."),
      ],
    },
  ],

  commonErrors: [
    {
      title: 'Canviar el valor d\'una constant',
      bad: `const pendents = 3;
pendents = 4;`,
      message: 'Uncaught TypeError: Assignment to constant variable.',
      why: "Una variable declarada amb `const` no pot rebre un valor nou. Si el valor ha de canviar, s'ha de declarar amb `let`.",
      fix: `let pendents = 3;
pendents = 4;`,
    },
    {
      title: 'Fer servir una variable abans de declarar-la',
      bad: `console.log(nom);
const nom = "Anna";`,
      message: "Uncaught ReferenceError: Cannot access 'nom' before initialization",
      why: "El codi s'executa de dalt a baix. A la primera línia la variable encara no s'ha creat. La declaració ha d'anar abans del primer ús.",
      fix: `const nom = "Anna";
console.log(nom);`,
    },
    {
      title: 'Posar entre cometes el nom d\'una variable',
      bad: `const nom = "Anna";
console.log("Hola, nom");`,
      why: "No hi ha cap missatge d'error: simplement es mostra `Hola, nom`. Dins d'unes cometes normals tot és text, i JavaScript no hi busca variables.",
      fix: `const nom = "Anna";
console.log(\`Hola, \${nom}\`);`,
    },
    {
      title: 'Sumar un text que sembla un nombre',
      bad: `const unitats = "2";
const total = unitats + 1;
console.log(total); // "21"`,
      why: "Com que `unitats` és un string, el `+` enganxa en lloc de sumar. Tampoc dona error, i el resultat sembla un nombre raonable: per això costa de detectar.",
      fix: `const unitats = "2";
const total = Number(unitats) + 1;
console.log(total); // 3`,
    },
    {
      title: 'Declarar dues vegades la mateixa variable',
      bad: `let total = 10;
let total = 20;`,
      message: "Uncaught SyntaxError: Identifier 'total' has already been declared",
      why: "`let` només s'escriu la primera vegada, per crear la variable. Per canviar-ne el valor després, s'escriu només el nom.",
      fix: `let total = 10;
total = 20;`,
    },
  ],

  exercises: [
    {
      id: 'presentacio',
      title: 'Presentació',
      statement: "Crea dues constants, `nom` i `cicle`, i mostra una frase que les combini.",
      data: ['nom = "Marc"', 'cicle = "DAW"'],
      expectedOutput: ['Em dic Marc i estudio DAW.'],
      hint: "Fes servir un template literal: accents greus i `${ }` per a cada variable. No et descuidis el punt final.",
      solution: `const nom = "Marc";
const cicle = "DAW";

console.log(\`Em dic \${nom} i estudio \${cicle}.\`);`,
      explanation: "Les dues dades són textos que no canvien, així que les declarem amb `const`. El template literal substitueix cada `${ }` pel valor de la variable i deixa la resta de la frase tal com l'hem escrit.",
    },
    {
      id: 'preu-iva',
      title: 'Calcula el preu amb IVA',
      statement: "Crea dues constants, `preu` i `iva`, i mostra el preu final.",
      data: ['preu = 100', 'iva = 0.21'],
      expectedOutput: ['121'],
      hint: "El preu final és el preu original més la part corresponent a l'IVA. Aquesta part es calcula multiplicant el preu per l'IVA.",
      solution: `const preu = 100;
const iva = 0.21;

const preuFinal = preu + preu * iva;
console.log(preuFinal);`,
      explanation: "`preu * iva` dona l'import de l'impost (21) i es calcula primer, perquè la multiplicació té prioritat sobre la suma. Guardar el resultat en una tercera constant amb un nom clar fa que el codi s'expliqui sol.",
    },
    {
      id: 'celsius',
      title: 'De Celsius a Fahrenheit',
      statement: "Converteix una temperatura de graus Celsius a Fahrenheit i mostra el resultat en una frase. La fórmula és: multiplicar per 9, dividir per 5 i sumar 32.",
      data: ['celsius = 25'],
      expectedOutput: ['25 °C són 77 °F'],
      hint: "Calcula primer el resultat i guarda'l en una constant `fahrenheit`. Després construeix la frase amb un template literal que faci servir les dues variables.",
      solution: `const celsius = 25;
const fahrenheit = celsius * 9 / 5 + 32;

console.log(\`\${celsius} °C són \${fahrenheit} °F\`);`,
      explanation: "La multiplicació i la divisió es fan d'esquerra a dreta abans que la suma, que és just l'ordre que demana la fórmula. Si canvies el valor de `celsius`, la frase s'actualitza sola: aquest és l'avantatge de no escriure els números directament dins del text.",
    },
    {
      id: 'comptador',
      title: 'El comptador de tasques',
      statement: "Comences el dia amb 3 tasques pendents. En completes una i després te n'encarreguen dues més. Mostra el valor del comptador després de cada canvi i, al final, una frase amb el total.",
      data: ['pendents = 3'],
      expectedOutput: ['2', '4', 'Tasques pendents: 4'],
      hint: "El valor canviarà dues vegades: quin tipus de declaració necessites? Per restar 1 pots fer servir `--`, i per sumar 2, `+=`.",
      solution: `let pendents = 3;

pendents--;
console.log(pendents);

pendents += 2;
console.log(pendents);

console.log(\`Tasques pendents: \${pendents}\`);`,
      explanation: "La variable ha de ser `let` perquè el seu valor canvia. Cada `console.log()` mostra el valor que té la variable *en aquell moment*: per això el mateix nom dona primer 2 i després 4.",
    },
  ],

  finalExercise: {
    id: 'tiquet',
    title: 'El tiquet de compra',
    statement: [
      "Una botiga en línia ha de mostrar el tiquet d'una comanda. Calcula el subtotal (preu per quantitat), l'import de l'IVA sobre el subtotal i el total, que inclou les despeses d'enviament.",
      "**Atenció:** les despeses d'enviament arriben d'un formulari, i per tant són un text.",
    ],
    data: ['producte = "Llibreta"', 'preuUnitari = 12.5', 'quantitat = 4', 'iva = 0.21', 'enviament = "4"'],
    expectedOutput: ['Producte: Llibreta', 'Subtotal: 50 €', 'IVA: 10.5 €', 'Enviament: 4 €', 'Total: 64.5 €'],
    starter: `const producte = "Llibreta";
const preuUnitari = 12.5;
const quantitat = 4;
const iva = 0.21;
const enviament = "4";

// Calcula el subtotal, l'import de l'IVA i el total

// Mostra les cinc línies del tiquet
`,
    hint: [
      "Fes els càlculs en tres passos, cadascun en la seva constant: `subtotal`, `importIva` i `total`.",
      "Si el total et dona `60.54`, mira de quin tipus és `enviament`. Què fa el `+` quan un dels dos valors és un text?",
    ],
    solution: `const producte = "Llibreta";
const preuUnitari = 12.5;
const quantitat = 4;
const iva = 0.21;
const enviament = "4";

const subtotal = preuUnitari * quantitat;
const importIva = subtotal * iva;
const total = subtotal + importIva + Number(enviament);

console.log(\`Producte: \${producte}\`);
console.log(\`Subtotal: \${subtotal} €\`);
console.log(\`IVA: \${importIva} €\`);
console.log(\`Enviament: \${enviament} €\`);
console.log(\`Total: \${total} €\`);`,
    explanation: [
      "La clau és `Number(enviament)`. Sense la conversió, `60.5 + \"4\"` enganxa els dos valors i dona el text `\"60.54\"`: un resultat que sembla un preu vàlid però és incorrecte. Els errors que no fan saltar cap avís són els més perillosos.",
      "Separar el càlcul en passos amb nom (`subtotal`, `importIva`, `total`) fa que cada línia es pugui comprovar per separat i que les frases finals siguin fàcils d'escriure.",
    ],
  },

  summary: [
    "Una variable és un nom per a un valor. Es declara una vegada i es fa servir tantes com calgui.",
    "`const` per als valors que no canvien (la majoria); `let` per als que sí. `var`, mai.",
    "Els tipus bàsics són `string`, `number` i `boolean`. `undefined` vol dir «sense valor encara» i `null`, «buit expressament».",
    "`typeof` diu de quin tipus és un valor. `5` i `\"5\"` no són el mateix.",
    "Amb textos, `+` enganxa. Per construir frases, fes servir template literals: `` `Hola, ${nom}` ``.",
    "`Number()`, `String()` i `Boolean()` converteixen entre tipus. Una conversió impossible a nombre dona `NaN`.",
  ],

  quiz: [
    {
      question: "Has de guardar el nombre de tasques pendents, que anirà canviant mentre es fa servir l'aplicació. Quina declaració és la més adequada?",
      options: [
        { text: '`let pendents = 0;`', correct: true },
        { text: '`const pendents = 0;`', why: "Amb `const` no podries modificar el valor: el primer canvi donaria un `TypeError`." },
        { text: '`var pendents = 0;`', why: "Funcionaria, però `var` és la manera antiga i té comportaments que provoquen errors. No la fem servir." },
        { text: '`pendents = 0;`', why: "Falta la paraula clau. Una variable s'ha de declarar amb `const` o `let` abans de fer-la servir." },
      ],
      explanation: "Quan sabem que el valor ha de canviar, toca `let`. Per a tota la resta, `const`.",
    },
    {
      question: "Què mostra aquesta instrucció?",
      code: `console.log(typeof "42");`,
      options: [
        { text: '`string`', correct: true },
        { text: '`number`', why: "Les cometes el converteixen en un text, encara que els caràcters siguin xifres." },
        { text: '`text`', why: "Aquest tipus no existeix a JavaScript: els textos són de tipus `string`." },
        { text: '`undefined`', why: "`undefined` és el tipus d'una variable sense valor, i aquí hi ha un valor ben clar." },
      ],
      explanation: "Qualsevol cosa escrita entre cometes és un `string`, sigui quin sigui el seu contingut.",
    },
    {
      question: "Què mostra aquesta instrucció?",
      code: `console.log("5" + 3);`,
      options: [
        { text: '`53`', correct: true },
        { text: '`8`', why: "Seria així si tots dos fossin nombres, però `\"5\"` és un text." },
        { text: '`15`', why: "Això seria una multiplicació. A més, amb `+` i un text no es fa cap càlcul." },
        { text: '`NaN`', why: "`NaN` apareix quan una conversió a nombre falla. Aquí no es converteix res a nombre: s'enganxen textos." },
      ],
      explanation: "Si un dels dos costats del `+` és un string, JavaScript converteix l'altre a string i els enganxa.",
    },
    {
      question: "Què retorna `Number(\"hola\")`?",
      options: [
        { text: '`NaN`', correct: true },
        { text: '`0`', why: "`0` és el que retorna `Number(\"\")`, amb un text buit." },
        { text: '`"hola"`', why: "`Number()` sempre retorna un valor de tipus `number`, mai un text." },
        { text: 'Un error que atura el programa', why: "No es llança cap error: el programa continua, però amb un valor (`NaN`) que contaminarà els càlculs." },
      ],
      explanation: "`NaN` (*Not a Number*) és el resultat d'una conversió a nombre que no té sentit. No atura el programa, i per això convé comprovar les dades abans de fer-hi càlculs.",
    },
    {
      question: "Si `const n = 3;`, quina instrucció mostra exactament «Tens 3 tasques»?",
      options: [
        { text: '``console.log(`Tens ${n} tasques`);``', correct: true },
        { text: '`console.log("Tens ${n} tasques");`', why: "Amb cometes normals, `${n}` no es calcula: es mostra tal qual." },
        { text: '`console.log("Tens " + "n" + " tasques");`', why: "`\"n\"` entre cometes és la lletra n, no la variable." },
        { text: '`console.log(Tens n tasques);`', why: "Sense cometes de cap mena, JavaScript no ho pot interpretar i dona un error de sintaxi." },
      ],
      explanation: "La substitució amb `${ }` només funciona dins d'un template literal, és a dir, entre accents greus.",
    },
  ],
};
