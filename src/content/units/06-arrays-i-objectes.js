import { p, list, code, example, concept, warning, challenge, project, table, compare, custom } from '../blocks.js';

const TASQUES = `const tasques = [
  { id: 1, text: "Estudiar JavaScript", completada: false },
  { id: 2, text: "Fer la compra", completada: true },
  { id: 3, text: "Enviar el treball", completada: false }
];`;

export default {
  id: 'arrays-i-objectes',
  number: 6,
  title: 'Arrays i objectes',
  shortTitle: 'Arrays i objectes',
  description:
    "Com organitzar moltes dades: llistes ordenades amb arrays, fitxes amb objectes i la combinació de totes dues coses, que és la forma que tenen les dades reals.",

  problem: {
    title: "Tenim funcions i dades soltes, però cada tasca té diverses dades i n'hi ha moltes",
    text: [
      "A la unitat de bucles vam guardar les tasques en dues llistes paral·leles: una amb els textos i una altra amb els estats. Funcionava, però era fràgil. Si esborres una tasca d'una llista i t'oblides de l'altra, a partir d'aquell punt cada text queda aparellat amb l'estat d'una altra tasca.",
      "El problema de fons és que les dades d'una mateixa tasca (el text, si està feta, el seu identificador) haurien de viatjar juntes. Ens falta una manera d'agrupar *diverses dades d'una mateixa cosa*, i una manera de tenir *moltes d'aquestes coses* en ordre. Són els objectes i els arrays.",
    ],
  },

  goals: [
    "Crear arrays, accedir als seus elements i modificar-los.",
    "Afegir i treure elements amb `push`, `pop`, `shift` i `unshift`.",
    "Recórrer un array amb `for...of` i amb `forEach`.",
    "Crear objectes i llegir-ne i canviar-ne les propietats.",
    "Treballar amb arrays d'objectes: la forma de les dades del gestor.",
  ],

  projectPiece:
    "El gestor ja té les seves dades definitives: un array on cada tasca és un objecte amb `id`, `text` i `completada`, i les operacions per afegir-ne, completar-ne i eliminar-ne.",

  finalProject:
    "Els vídeos sortiran de l'HTML i passaran a ser objectes dins d'un array, i els comentaris també.",

  sections: [
    {
      id: 'arrays',
      title: 'Arrays: una llista ordenada',
      blocks: [
        p("Un **array** és una llista ordenada de valors guardada en una sola variable. Ja en vam fer servir a la unitat de bucles; ara els mirarem amb calma."),
        example({
          title: "Un array d'alumnes",
          intro: "Cada línia mostra una manera diferent de consultar l'array.",
          js: `const alumnes = ["Anna", "Marc", "Júlia"];

console.log(alumnes);
console.log(alumnes.length);
console.log(alumnes[0]);
console.log(alumnes[2]);
console.log(alumnes[alumnes.length - 1]);
console.log(alumnes[5]);`,
          expected: "L'array sencer, `3`, `Anna`, `Júlia`, `Júlia` una altra vegada i `undefined`.",
          why: "Cada valor de l'array és un **element**, i la seva posició és l'**índex**. Els índexs comencen a 0, de manera que l'últim element sempre és a la posició `length - 1`. Demanar un índex que no existeix no dona error: retorna `undefined`.",
        }),
        concept(
          'Els índexs comencen a 0',
          "En un array de 3 elements, els índexs són 0, 1 i 2. `length` val 3, però la posició 3 no existeix. Aquest desajust d'una unitat és l'origen de la majoria d'errors amb arrays."
        ),
        p("Un array pot contenir valors de qualsevol tipus: textos, nombres, booleans i, com veurem, objectes. A la pràctica, però, gairebé sempre contindrà coses de la mateixa mena: una llista de noms, una llista de preus, una llista de tasques."),
      ],
    },

    {
      id: 'modificar-posicions',
      title: 'Accedir i modificar posicions',
      blocks: [
        p("Els claudàtors serveixen tant per llegir un element com per canviar-lo. Si a l'esquerra del `=` hi posem `array[índex]`, substituïm el que hi havia en aquella posició."),
        example({
          title: 'Un array de productes',
          intro: "Canviem un element i n'afegim un en una posició nova.",
          js: `const productes = ["Teclat", "Ratolí", "Pantalla"];

productes[1] = "Ratolí sense fil";
console.log(productes);

productes[3] = "Auriculars";
console.log(productes);
console.log(productes.length);`,
          expected: "L'array amb el segon element canviat; després amb quatre elements; i `4`.",
          why: "Assignar a una posició que ja existeix la substitueix. Assignar a la primera posició lliure fa créixer l'array. (Per afegir elements, però, hi ha una manera millor que veurem de seguida.)",
        }),
        p("Potser t'ha sorprès una cosa: l'array està declarat amb `const` i, tot i això, l'hem modificat. No hi ha cap contradicció."),
        compare(
          {
            title: 'Permès: canviar el contingut',
            tone: 'good',
            code: `const productes = ["Teclat"];

productes[0] = "Ratolí";
productes.push("Pantalla");`,
            text: "La variable continua apuntant al mateix array. Només n'ha canviat el contingut.",
          },
          {
            title: 'Prohibit: canviar d\'array',
            tone: 'bad',
            code: `const productes = ["Teclat"];

productes = ["Ratolí"];
// TypeError: Assignment to
// constant variable.`,
            text: "Aquí intentem que la variable apunti a un array diferent, i això `const` no ho permet.",
          }
        ),
        concept(
          'const protegeix la variable, no el contingut',
          "`const` garanteix que el nom sempre es referirà al mateix array (o al mateix objecte). El que hi ha a dins es pot modificar lliurement. Per això els arrays i els objectes es declaren gairebé sempre amb `const`."
        ),
      ],
    },

    {
      id: 'afegir-i-treure',
      title: 'Afegir i treure: push, pop, shift i unshift',
      blocks: [
        p("Els arrays porten incorporades funcions per a les operacions més habituals. Com que pertanyen a l'array, s'anomenen **mètodes** i es criden amb un punt: `alumnes.push(\"Pau\")`. N'hi ha quatre per afegir i treure elements dels extrems:"),
        custom('ArrayVisualizer'),
        table(
          ['Mètode', 'Què fa', 'Què retorna'],
          [
            ['`push(valor)`', 'Afegeix un element **al final**', 'La nova longitud'],
            ['`pop()`', "Treu l'**últim** element", "L'element que ha tret"],
            ['`unshift(valor)`', 'Afegeix un element **al principi**', 'La nova longitud'],
            ['`shift()`', 'Treu el **primer** element', "L'element que ha tret"],
          ],
          'Mètodes per afegir i treure elements'
        ),
        example({
          title: 'Un carretó de la compra',
          intro: "Segueix l'estat de l'array després de cada operació.",
          js: `const carreto = ["Teclat", "Ratolí"];

carreto.push("Pantalla");
console.log(carreto);

const ultim = carreto.pop();
console.log(ultim);
console.log(carreto);

carreto.unshift("Auriculars");
console.log(carreto);

carreto.shift();
console.log(carreto);`,
          expected: "L'array creix amb «Pantalla», la perd (i la guardem a `ultim`), guanya «Auriculars» al davant i els torna a perdre.",
          why: "Tots quatre mètodes **modifiquen l'array original**. `pop` i `shift`, a més, retornen l'element que han tret, i per això el podem guardar en una variable si ens interessa.",
        }),
        p("De tots quatre, `push` és amb diferència el que faràs servir més: afegir una tasca nova a la llista és un `push`."),
        challenge({
          statement: "Una botiga atén per ordre d'arribada. A la cua hi ha l'Anna i en Marc. Arriba en Pau i es posa al final. Després s'atén la primera persona de la cua. Mostra a qui s'atén i quantes persones queden.",
          starter: `const cua = ["Anna", "Marc"];

// 1. Arriba en Pau

// 2. S'atén la primera persona

// 3. Mostra els dos missatges
`,
          expectedOutput: ['Atenem: Anna', 'Queden: 2'],
          hint: "Qui arriba es posa al final (`push`) i qui s'atén surt del principi (`shift`). Guarda en una constant el que retorna `shift`.",
          solution: `const cua = ["Anna", "Marc"];

// 1. Arriba en Pau
cua.push("Pau");

// 2. S'atén la primera persona
const atesa = cua.shift();

// 3. Mostra els dos missatges
console.log(\`Atenem: \${atesa}\`);
console.log(\`Queden: \${cua.length}\`);`,
          explanation: "`shift` fa dues coses: treu el primer element de l'array i el retorna. Després de l'operació, a la cua hi queden en Marc i en Pau, i `length` val 2.",
        }),
      ],
    },

    {
      id: 'recorrer-arrays',
      title: 'Recórrer arrays: for...of i forEach',
      blocks: [
        p("Ja saps recórrer un array amb el `for` clàssic i un índex. Funciona, però obliga a escriure molt per dir una cosa senzilla: «per a cada element, fes això». Hi ha dues maneres més directes."),
        example({
          title: 'for...of: cada element, directament',
          intro: "No hi ha índex, ni condició, ni actualització.",
          js: `const alumnes = ["Anna", "Marc", "Júlia"];

for (const alumne of alumnes) {
  console.log(\`Hola, \${alumne}\`);
}`,
          expected: "Una salutació per a cada alumne.",
          why: "A cada volta, la variable `alumne` conté el següent element de l'array. Es pot declarar amb `const` perquè a cada volta es crea una variable nova. Com que no hi ha índexs, és impossible passar-se de llarg.",
        }),
        p("La segona manera és el mètode `forEach`. En lloc d'escriure un bucle, li passem una **funció** i l'array s'encarrega de cridar-la una vegada per a cada element."),
        example({
          title: 'forEach: una funció per a cada element',
          intro: "La funció que passem pot rebre l'element i, si el volem, també el seu índex.",
          js: `const alumnes = ["Anna", "Marc", "Júlia"];

alumnes.forEach((alumne, index) => {
  console.log(\`\${index + 1}. \${alumne}\`);
});`,
          expected: "Els tres noms, numerats.",
          why: "El que hi ha entre els parèntesis de `forEach` és una arrow function. No la cridem nosaltres: l'hi entreguem a `forEach` perquè la cridi ell. Una funció que es passa a una altra perquè l'executi s'anomena **callback**, i és una idea que tornarà amb força a la unitat d'esdeveniments.",
        }),
        table(
          ['Manera', 'Quan convé'],
          [
            ['`for (let i = 0; …)`', "Quan necessites l'índex, vols saltar elements o recórrer només una part."],
            ['`for (const x of llista)`', 'Quan vols fer alguna cosa amb cada element. És la més llegible.'],
            ['`llista.forEach((x) => …)`', "El mateix cas, en forma de mètode. Dona l'índex com a segon paràmetre."],
          ],
          'Tres maneres de recórrer un array'
        ),
        concept(
          'Per defecte, for...of',
          "Si només vols passar per tots els elements, fes servir `for...of`: és curt, es llegeix com una frase i no té índexs on equivocar-se. Reserva el `for` clàssic per quan necessitis la posició."
        ),
      ],
    },

    {
      id: 'objectes',
      title: "Objectes: diverses dades d'una mateixa cosa",
      blocks: [
        p("Un array va bé per a una llista de coses semblants. Però com descrivim *una sola cosa* que té diverses dades? Una alumna té nom, edat i cicle. Podríem fer tres variables, però res no indicaria que van juntes, i amb trenta alumnes en serien noranta."),
        p("Un **objecte** agrupa diverses dades sota un sol nom. Cada dada és una **propietat**, formada per un nom i un valor."),
        example({
          title: 'Un objecte alumna',
          intro: "Per llegir una propietat s'escriu el nom de l'objecte, un punt i el nom de la propietat.",
          js: `const alumna = {
  nom: "Anna",
  edat: 19,
  cicle: "DAW",
  repetidora: false
};

console.log(alumna);
console.log(alumna.nom);
console.log(alumna.edat + 1);`,
          expected: "L'objecte sencer, `Anna` i `20`.",
          why: "`alumna.nom` es llegeix «el nom de l'alumna». Cada propietat es comporta com una variable que viu dins de l'objecte: es pot mostrar, comparar o fer servir en un càlcul.",
        }),
        p("La sintaxi té tres regles:"),
        list(
          "L'objecte va entre **claus** `{ }`.",
          "Cada propietat s'escriu `nom: valor`, amb **dos punts** (no amb `=`).",
          "Les propietats se separen amb **comes**."
        ),
        example({
          title: 'Un objecte producte',
          intro: "Les propietats es poden modificar, i també se'n poden afegir de noves.",
          js: `const producte = {
  nom: "Teclat",
  preu: 30,
  estoc: 5
};

producte.preu = 25;
producte.estoc--;
producte.enOferta = true;

console.log(producte);
console.log(producte.color);`,
          expected: "L'objecte amb el preu a 25, l'estoc a 4 i la propietat nova `enOferta`. Després, `undefined`.",
          why: "Assignar a una propietat que existeix la canvia; assignar a una que no existeix la crea. I llegir una propietat que no existeix, com `color`, no dona error: retorna `undefined`.",
        }),
        warning(
          'Un nom de propietat mal escrit no avisa',
          "Si escrius `producte.estco` en lloc de `producte.estoc`, JavaScript no es queixa: et dona `undefined` en llegir, o crea una propietat nova en assignar. Quan una dada et surti `undefined`, repassa primer l'ortografia."
        ),
        table(
          ['Característica', 'Array', 'Objecte'],
          [
            ['Serveix per a', 'Moltes coses de la mateixa mena', "Diverses dades d'una sola cosa"],
            ["S'escriu amb", 'Claudàtors `[ ]`', 'Claus `{ }`'],
            ["S'hi accedeix per", 'Posició: `alumnes[0]`', 'Nom: `alumna.edat`'],
            ["L'ordre", 'És important', 'No és important'],
          ],
          'Array o objecte?'
        ),
      ],
    },

    {
      id: 'arrays-d-objectes',
      title: "Arrays d'objectes: la forma de les dades reals",
      blocks: [
        p("Arrays i objectes es combinen de manera natural: una llista on cada element és un objecte. Aquesta és l'estructura que trobaràs a gairebé totes les aplicacions: una llista de productes, d'usuaris, de missatges… o de tasques."),
        example({
          title: "Un array d'objectes de tasques",
          intro: "Per arribar a una dada concreta s'encadenen el claudàtor i el punt.",
          js: `${TASQUES}

console.log(tasques.length);
console.log(tasques[0]);
console.log(tasques[0].text);
console.log(tasques[1].completada);`,
          expected: "`3`, el primer objecte sencer, `Estudiar JavaScript` i `true`.",
          why: "Llegeix `tasques[0].text` d'esquerra a dreta: de l'array `tasques`, l'element de la posició 0 (que és un objecte), i d'aquest objecte, la propietat `text`.",
        }),
        example({
          title: 'Recórrer les tasques',
          intro: "A cada volta, `tasca` és un objecte sencer.",
          js: `${TASQUES}

for (const tasca of tasques) {
  if (tasca.completada) {
    console.log(\`[x] \${tasca.text}\`);
  } else {
    console.log(\`[ ] \${tasca.text}\`);
  }
}

console.table(tasques);`,
          expected: "Les tres tasques amb la seva marca i, a sota, una taula amb totes les dades.",
          why: "Compara-ho amb les dues llistes paral·leles de la unitat de bucles: ara el text i l'estat de cada tasca viatgen junts i no es poden descol·locar. `console.table` mostra un array d'objectes en forma de taula, molt útil per revisar dades.",
        }),
        concept(
          'Per què cada tasca té un id',
          "El text es pot repetir o editar, i la posició canvia cada vegada que s'elimina una tasca. L'`id` és un número que no canvia mai i que identifica una tasca i només una. Sempre que hàgim de dir «aquesta tasca», ho farem pel seu `id`."
        ),
      ],
    },

    {
      id: 'dada-objecte-colleccio',
      title: 'Dada, objecte i col·lecció',
      blocks: [
        p("Quan les estructures s'encaixen les unes dins les altres, és fàcil perdre de vista a quin nivell som. Aquests tres nivells apareixen contínuament, i saber sempre a quin et trobes evita molts errors."),
        table(
          ['Nivell', 'Què és', 'Exemple', 'Com hi arribem'],
          [
            ['**Dada**', 'Un sol valor', '`"Estudiar JavaScript"`', '`tasques[0].text`'],
            ['**Objecte**', "Totes les dades d'una cosa", '`{ id: 1, text: "…", completada: false }`', '`tasques[0]`'],
            ['**Col·lecció**', 'Moltes coses de la mateixa mena', '`[ { … }, { … }, { … } ]`', '`tasques`'],
          ],
          'Tres nivells de dades'
        ),
        p("Un costum senzill ajuda molt: posa noms en **plural** als arrays (`tasques`, `alumnes`) i en **singular** als objectes (`tasca`, `alumna`). Així, `for (const tasca of tasques)` es llegeix sol, i quan vegis `tasques.text` et grinyolarà de seguida: el text el té *una* tasca, no la llista."),
        concept(
          'A quin nivell soc?',
          "Abans d'escriure un punt o un claudàtor, pregunta't què tens entre mans: una llista, una cosa o una dada? A una llista se li demanen posicions i `length`; a una cosa, propietats; a una dada, res més."
        ),
      ],
    },

    {
      id: 'gestionar-tasques',
      title: 'Afegir, modificar i eliminar una tasca',
      blocks: [
        p("Amb tot això ja podem fer les tres operacions bàsiques sobre la llista de tasques. Totes tres fan servir només eines que ja coneixes."),
        example({
          title: 'Les tres operacions',
          intro: "Llegeix els comentaris i intenta predir com quedarà la taula final.",
          js: `let tasques = [
  { id: 1, text: "Estudiar JavaScript", completada: false },
  { id: 2, text: "Fer la compra", completada: false }
];

// AFEGIR: un objecte nou al final de l'array
tasques.push({ id: 3, text: "Enviar el treball", completada: false });

// MODIFICAR: busquem la tasca amb id 2 i la marquem com a feta
for (const tasca of tasques) {
  if (tasca.id === 2) {
    tasca.completada = true;
  }
}

// ELIMINAR: ens quedem amb totes menys la que té id 1
const restants = [];
for (const tasca of tasques) {
  if (tasca.id !== 1) {
    restants.push(tasca);
  }
}
tasques = restants;

console.table(tasques);`,
          expected: "Una taula amb dues tasques: la 2, completada, i la 3, pendent.",
          why: "Per **modificar**, recorrem l'array fins a trobar l'`id` que busquem i canviem la propietat. Per **eliminar**, fem la feina al revés: construïm un array nou amb totes les tasques que volem conservar i substituïm l'antic. Per això aquí `tasques` és `let`: és l'únic cas en què reassignem la variable.",
        }),
        project(
          "Aquestes tres operacions són el cor del gestor. A l'exercici final de la unitat les convertiràs en funcions (`afegirTasca`, `completarTasca`, `eliminarTasca`), i al projecte final faràs servir les mateixes operacions amb vídeos i comentaris. L'única cosa que ens falta és que tot això es vegi a la pàgina, i no només a la consola.",
          { title: "L'estat del gestor de tasques" }
        ),
      ],
    },

    {
      id: 'find-i-filter',
      title: 'Ampliació: find i filter',
      blocks: [
        p("Buscar un element i quedar-se amb una part de la llista són operacions tan habituals que els arrays tenen mètodes per fer-les en una línia. Funcionen com `forEach`: reben una funció que respon `true` o `false` per a cada element."),
        list(
          "`find` retorna **el primer element** per al qual la funció respon `true` (o `undefined` si no n'hi ha cap).",
          "`filter` retorna **un array nou** amb tots els elements per als quals la funció respon `true`. L'array original no canvia."
        ),
        example({
          title: 'Buscar i filtrar',
          intro: "Les mateixes operacions de l'apartat anterior, escrites amb mètodes.",
          js: `${TASQUES}

const segona = tasques.find((tasca) => tasca.id === 2);
console.log(segona.text);

const pendents = tasques.filter((tasca) => !tasca.completada);
console.log(pendents.length);

const senseLaPrimera = tasques.filter((tasca) => tasca.id !== 1);
console.table(senseLaPrimera);`,
          expected: "`Fer la compra`, `2` i una taula amb les tasques 2 i 3.",
          why: "`filter` fa exactament el que fèiem a mà: recórrer l'array i posar en un de nou els elements que passen la prova. La funció `(tasca) => tasca.id !== 1` és la prova.",
        }),
        p("Al projecte final escriurem aquests bucles a mà, perquè es vegi què passa a cada pas. Quan ho tinguis clar, pots substituir-los per `find` i `filter`: el resultat és el mateix i el codi queda més curt."),
      ],
    },
  ],

  commonErrors: [
    {
      title: 'Comptar les posicions des de 1',
      bad: `const alumnes = ["Anna", "Marc", "Júlia"];

console.log(alumnes[1]); // Marc`,
      why: "El primer element és a la posició 0, no a l'1. No hi ha cap error: simplement obtens el segon element quan volies el primer.",
      fix: `const alumnes = ["Anna", "Marc", "Júlia"];

console.log(alumnes[0]); // Anna`,
    },
    {
      title: "Fer servir length com a índex de l'últim element",
      bad: `const alumnes = ["Anna", "Marc", "Júlia"];

console.log(alumnes[alumnes.length]); // undefined`,
      why: "`length` val 3, però les posicions són 0, 1 i 2. L'últim element sempre és a `length - 1`.",
      fix: `const alumnes = ["Anna", "Marc", "Júlia"];

console.log(alumnes[alumnes.length - 1]); // Júlia`,
    },
    {
      title: "Demanar una propietat a l'array en lloc de a l'element",
      bad: `const tasques = [
  { id: 1, text: "Estudiar" },
  { id: 2, text: "Comprar" }
];

console.log(tasques.text); // undefined`,
      why: "`tasques` és la llista, i la llista no té cap propietat `text`: la tenen els objectes de dins. Primer cal triar un element amb els claudàtors.",
      fix: `console.log(tasques[0].text); // Estudiar`,
    },
    {
      title: 'Oblidar la coma entre dues propietats',
      bad: `const alumna = {
  nom: "Anna"
  edat: 19
};`,
      message: "Uncaught SyntaxError: Unexpected identifier 'edat'",
      why: "Les propietats d'un objecte se separen amb comes. L'error assenyala la paraula que JavaScript no esperava trobar: la coma que falta és just abans.",
      fix: `const alumna = {
  nom: "Anna",
  edat: 19
};`,
    },
    {
      title: 'Escriure = en lloc de : dins d\'un objecte',
      bad: `const producte = {
  nom = "Teclat",
  preu = 30
};`,
      message: 'Uncaught SyntaxError: Invalid shorthand property initializer',
      why: "Dins de les claus d'un objecte, el nom i el valor se separen amb dos punts. El signe `=` només es fa servir després, per modificar: `producte.preu = 25`.",
      fix: `const producte = {
  nom: "Teclat",
  preu: 30
};`,
    },
    {
      title: 'Intentar substituir un array declarat amb const',
      bad: `const tasques = ["Estudiar", "Comprar"];

tasques = [];`,
      message: 'Uncaught TypeError: Assignment to constant variable.',
      why: "Es pot modificar el contingut d'un array `const`, però no assignar-li un array diferent. Si el programa necessita substituir-lo (com quan eliminem una tasca), s'ha de declarar amb `let`.",
      fix: `let tasques = ["Estudiar", "Comprar"];

tasques = [];`,
    },
  ],

  exercises: [
    {
      id: 'llista-compra',
      title: 'La llista de la compra',
      statement: "Tens una llista de la compra amb tres productes. Afegeix-hi `\"pa\"` al final i treu-ne el primer, que ja has comprat. Després mostra quants productes hi queden i el nom de cadascun.",
      data: ['compra = ["llet", "ous", "fruita"]'],
      expectedOutput: ['Productes: 3', 'ous', 'fruita', 'pa'],
      starter: `const compra = ["llet", "ous", "fruita"];

// Afegeix "pa" al final i treu el primer

// Mostra la quantitat i després cada producte
`,
      hint: "`push` afegeix al final i `shift` treu del principi. Per mostrar cada producte, un `for...of` és la manera més curta.",
      solution: `const compra = ["llet", "ous", "fruita"];

compra.push("pa");
compra.shift();

console.log(\`Productes: \${compra.length}\`);

for (const producte of compra) {
  console.log(producte);
}`,
      explanation: "Després d'afegir-ne un i treure'n un, la llista continua tenint tres elements, però ja no són els mateixos. El `for...of` passa per tots sense necessitat de saber quants n'hi ha.",
    },
    {
      id: 'fitxa-producte',
      title: "La fitxa d'un producte",
      statement: "Un teclat costa 30 € i en queden 5 unitats. El preu puja 5 € i se'n ven una unitat. Actualitza l'objecte i mostra'n la fitxa en una frase.",
      data: ['producte = { nom: "Teclat", preu: 30, estoc: 5 }'],
      expectedOutput: ['Teclat: 35 € (4 unitats)'],
      starter: `const producte = {
  nom: "Teclat",
  preu: 30,
  estoc: 5
};

// Actualitza el preu i l'estoc

// Mostra la fitxa
`,
      hint: "Les propietats es modifiquen com qualsevol variable: `producte.preu += 5`. Per a la frase, un template literal amb les tres propietats.",
      solution: `const producte = {
  nom: "Teclat",
  preu: 30,
  estoc: 5
};

producte.preu += 5;
producte.estoc--;

console.log(\`\${producte.nom}: \${producte.preu} € (\${producte.estoc} unitats)\`);`,
      explanation: "Una propietat d'un objecte admet les mateixes operacions que una variable: `+=`, `--` i totes les altres. I l'objecte pot ser `const`, perquè en modifiquem el contingut, no el substituïm.",
    },
    {
      id: 'mitjana-alumna',
      title: "La mitjana d'una alumna",
      statement: "Un objecte pot tenir un array com a propietat. Calcula la mitjana de les notes d'aquesta alumna i mostra-la en una frase.",
      data: ['alumna = { nom: "Júlia", notes: [8, 6, 10] }'],
      expectedOutput: ['Júlia té una mitjana de 8'],
      starter: `const alumna = {
  nom: "Júlia",
  notes: [8, 6, 10]
};

// Suma les notes, calcula la mitjana i mostra la frase
`,
      hint: "`alumna.notes` és un array com qualsevol altre: el pots recórrer amb `for...of` i preguntar-li la longitud amb `alumna.notes.length`.",
      solution: `const alumna = {
  nom: "Júlia",
  notes: [8, 6, 10]
};

let suma = 0;

for (const nota of alumna.notes) {
  suma += nota;
}

const mitjana = suma / alumna.notes.length;
console.log(\`\${alumna.nom} té una mitjana de \${mitjana}\`);`,
      explanation: "Les estructures es poden encaixar en qualsevol direcció: arrays dins d'objectes i objectes dins d'arrays. `alumna.notes` és un array, i tot el que saps d'arrays s'hi aplica.",
    },
    {
      id: 'nomes-pendents',
      title: 'Només les pendents',
      statement: "Mostra el text de les tasques que encara no estan completades i, al final, quantes són.",
      expectedOutput: ['Fer la compra', 'Repassar CSS', 'Pendents: 2'],
      starter: `const tasques = [
  { id: 1, text: "Estudiar JavaScript", completada: true },
  { id: 2, text: "Fer la compra", completada: false },
  { id: 3, text: "Enviar el treball", completada: true },
  { id: 4, text: "Repassar CSS", completada: false }
];

// Recorre les tasques, mostra les pendents i compta-les
`,
      hint: "Dins del bucle, la condició és `!tasca.completada`. Necessites un comptador declarat abans del bucle.",
      solution: `const tasques = [
  { id: 1, text: "Estudiar JavaScript", completada: true },
  { id: 2, text: "Fer la compra", completada: false },
  { id: 3, text: "Enviar el treball", completada: true },
  { id: 4, text: "Repassar CSS", completada: false }
];

let pendents = 0;

for (const tasca of tasques) {
  if (!tasca.completada) {
    console.log(tasca.text);
    pendents++;
  }
}

console.log(\`Pendents: \${pendents}\`);`,
      explanation: "És el mateix informe de la unitat de bucles, però amb una sola llista en lloc de dues. Cada `tasca` porta totes les seves dades: ja no hi ha índexs paral·lels que es puguin descompassar.",
    },
  ],

  finalExercise: {
    id: 'mini-gestor',
    title: 'El gestor de tasques, sense pàgina',
    statement: [
      "Completa les quatre funcions d'aquest gestor de tasques que treballa només amb dades. El codi del final les fa servir: no el modifiquis.",
      "Cada tasca nova ha de rebre l'identificador guardat a `seguentId`, i després aquest valor ha d'augmentar perquè no es repeteixi mai.",
    ],
    expectedOutput: ['[ ] 1. Estudiar JavaScript', '[x] 2. Fer la compra', '[ ] 4. Repassar CSS'],
    starter: `let tasques = [
  { id: 1, text: "Estudiar JavaScript", completada: false },
  { id: 2, text: "Fer la compra", completada: false }
];
let seguentId = 3;

function afegirTasca(text) {
  // Crea un objecte amb id, text i completada, i afegeix-lo a l'array

}

function completarTasca(id) {
  // Busca la tasca amb aquest id i marca-la com a completada

}

function eliminarTasca(id) {
  // Deixa a l'array totes les tasques menys la que té aquest id

}

function mostrarTasques() {
  // Mostra cada tasca amb el format: [x] 2. Fer la compra

}

// No toquis aquest codi: fa servir les teves funcions
afegirTasca("Enviar el treball");
afegirTasca("Repassar CSS");
completarTasca(2);
eliminarTasca(3);
mostrarTasques();`,
    hint: [
      "Per afegir: `tasques.push({ id: seguentId, text: text, completada: false })` i després `seguentId++`.",
      "Per eliminar no pots treure un element del mig amb `pop` ni `shift`: construeix un array nou amb les tasques que tenen un `id` diferent i assigna'l a `tasques`.",
    ],
    solution: `let tasques = [
  { id: 1, text: "Estudiar JavaScript", completada: false },
  { id: 2, text: "Fer la compra", completada: false }
];
let seguentId = 3;

function afegirTasca(text) {
  tasques.push({ id: seguentId, text: text, completada: false });
  seguentId++;
}

function completarTasca(id) {
  for (const tasca of tasques) {
    if (tasca.id === id) {
      tasca.completada = true;
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

function mostrarTasques() {
  for (const tasca of tasques) {
    if (tasca.completada) {
      console.log(\`[x] \${tasca.id}. \${tasca.text}\`);
    } else {
      console.log(\`[ ] \${tasca.id}. \${tasca.text}\`);
    }
  }
}

// No toquis aquest codi: fa servir les teves funcions
afegirTasca("Enviar el treball");
afegirTasca("Repassar CSS");
completarTasca(2);
eliminarTasca(3);
mostrarTasques();`,
    explanation: [
      "Fixa't en els identificadors del resultat: 1, 2 i 4. La tasca 3 s'ha eliminat i el seu número no es reaprofita. Per això cal una variable `seguentId` independent de la longitud de l'array: si féssim servir `tasques.length + 1`, després d'eliminar una tasca n'apareixerien dues amb el mateix `id`.",
      "Aquestes quatre funcions són el nucli del gestor. Quan hi afegim una pàgina, només canviarà `mostrarTasques`: en lloc d'escriure a la consola, crearà elements HTML.",
    ],
  },

  summary: [
    "Un **array** és una llista ordenada. Els índexs comencen a 0 i l'últim és `length - 1`.",
    "`push` i `pop` treballen amb el final de l'array; `unshift` i `shift`, amb el principi.",
    "`for (const element of llista)` és la manera més clara de recórrer un array. `forEach` fa el mateix rebent una funció.",
    "Un **objecte** agrupa dades amb nom: `{ nom: \"Anna\", edat: 19 }`. S'hi accedeix amb un punt: `alumna.nom`.",
    "`const` impedeix reassignar la variable, però permet modificar el contingut d'un array o d'un objecte.",
    "Les dades reals acostumen a ser **arrays d'objectes**: `tasques[0].text`.",
    "Cada tasca té un `id` únic i estable per poder-la identificar.",
  ],

  quiz: [
    {
      question: "Què mostra aquest codi?",
      code: `const colors = ["vermell", "verd", "blau"];

console.log(colors[1]);`,
      options: [
        { text: '`verd`', correct: true },
        { text: '`vermell`', why: "`vermell` és a la posició 0, que és la primera." },
        { text: '`blau`', why: "`blau` és a la posició 2." },
        { text: '`undefined`', why: "La posició 1 existeix: l'array té les posicions 0, 1 i 2." },
      ],
      explanation: "Els índexs comencen a 0, de manera que la posició 1 correspon al segon element.",
    },
    {
      question: "Com queda l'array després d'aquestes operacions?",
      code: `const llista = ["a", "b"];

llista.push("c");
llista.shift();`,
      options: [
        { text: '`["b", "c"]`', correct: true },
        { text: '`["a", "b"]`', why: "Això seria si `shift` tragués l'últim element, però treu el primer." },
        { text: '`["a", "b", "c"]`', why: "Falta aplicar el `shift`, que treu el primer element." },
        { text: '`["c"]`', why: "`shift` només treu un element: el primer." },
      ],
      explanation: "`push(\"c\")` afegeix al final: `[\"a\", \"b\", \"c\"]`. `shift()` treu el primer: `[\"b\", \"c\"]`.",
    },
    {
      question: "Si `tasques` és un array d'objectes amb les propietats `id` i `text`, com s'obté el text de la primera tasca?",
      options: [
        { text: '`tasques[0].text`', correct: true },
        { text: '`tasques.text[0]`', why: "L'array no té cap propietat `text`: primer cal triar l'element i després la propietat." },
        { text: '`tasques.text`', why: "`text` és una propietat de cada objecte, no de la llista. Això dona `undefined`." },
        { text: '`tasques[1].text`', why: "La posició 1 és la segona tasca." },
      ],
      explanation: "Primer es tria l'element amb els claudàtors (`tasques[0]`, un objecte) i després la propietat amb el punt (`.text`).",
    },
    {
      question: "Aquest codi funciona?",
      code: `const numeros = [1, 2];

numeros.push(3);`,
      options: [
        { text: "Sí: `const` impedeix reassignar la variable, però no modificar el contingut de l'array.", correct: true },
        { text: "No: dona un TypeError perquè l'array és constant.", why: "El `TypeError` només apareix si intentes assignar un altre array a la variable." },
        { text: "No: per fer `push` l'array s'ha de declarar amb `let`.", why: "`push` modifica el contingut, no la variable. Amb `const` és suficient." },
        { text: "Sí, però l'element nou es perd.", why: "L'element s'afegeix de manera normal: l'array passa a tenir tres elements." },
      ],
      explanation: "`const` protegeix la variable, no el contingut. L'array continua sent el mateix; només ha crescut.",
    },
    {
      question: "Quina estructura és la més adequada per guardar les dades d'**un sol** producte: el nom, el preu i l'estoc?",
      options: [
        { text: 'Un objecte: `{ nom: "Teclat", preu: 30, estoc: 5 }`', correct: true },
        { text: 'Un array: `["Teclat", 30, 5]`', why: "Funcionaria, però les posicions no expliquen què és cada dada: caldria recordar que la posició 2 és l'estoc." },
        { text: 'Tres arrays, un per a cada dada', why: "Són les llistes paral·leles que volíem evitar: les dades d'una mateixa cosa quedarien separades." },
        { text: 'Un string: `"Teclat, 30, 5"`', why: "Tot quedaria convertit en un sol text, i no es podria operar amb el preu ni amb l'estoc." },
      ],
      explanation: "Un objecte agrupa diverses dades d'una mateixa cosa i dona un nom a cadascuna: `producte.preu` s'explica sol.",
    },
  ],
};
