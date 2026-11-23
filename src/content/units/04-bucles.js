import { p, list, code, example, concept, warning, challenge, project, table, compare, custom } from '../blocks.js';

export default {
  id: 'bucles',
  number: 4,
  title: 'Bucles',
  shortTitle: 'Bucles',
  description:
    "Com repetir instruccions sense copiar-les: els bucles for i while, els comptadors, els acumuladors i la manera de recórrer una llista.",

  problem: {
    title: "Podem resoldre una tasca, però estem repetint massa codi",
    text: [
      "El nostre programa ja sap mostrar una tasca i decidir com es veu. Però un gestor en té moltes. Per mostrar-ne cinc hauríem de copiar les mateixes línies cinc vegades, i per mostrar-ne cent, cent vegades. I encara hi ha un problema més greu: quan escrivim el codi no sabem quantes tasques tindrà cada persona.",
      "Copiar i enganxar no és programar. Necessitem dir-li al navegador «fes això per a cada tasca», tantes vegades com calgui. Aquesta eina es diu bucle.",
    ],
  },

  goals: [
    "Repetir un bloc de codi un nombre concret de vegades amb `for`.",
    "Repetir-lo mentre es compleixi una condició amb `while`.",
    "Comptar i sumar valors amb comptadors i acumuladors.",
    "Recórrer tots els elements d'una llista i evitar els bucles infinits.",
  ],

  projectPiece:
    "El gestor ja pot mostrar totes les tasques, n'hi hagi tres o tres-centes, amb el seu número, i comptar quantes en queden de pendents.",

  finalProject:
    "Recorreràs la llista de vídeos per pintar la graella, i la de comentaris per pintar-los i comptar-los.",

  sections: [
    {
      id: 'per-que-repetir',
      title: 'Per què necessitem repetir',
      blocks: [
        p("Imagina que vols numerar cinc tasques a la consola. Amb el que saps fins ara, ho faries així:"),
        code(`console.log("Tasca 1");
console.log("Tasca 2");
console.log("Tasca 3");
console.log("Tasca 4");
console.log("Tasca 5");`),
        p("Funciona, però té tres problemes. Si en vols cent, has d'escriure cent línies. Si vols canviar el format, has de modificar-les totes. I, sobretot, només serveix si saps el nombre exacte per endavant."),
        p("Fixa't que les cinc línies són idèntiques excepte per un número que va augmentant. Quan detectis aquest patró, *la mateixa instrucció amb una petita variació*, és el moment de fer servir un bucle."),
        concept(
          'Bucle',
          "Un bucle repeteix un bloc de codi mentre es compleix una condició. Cada repetició s'anomena **iteració** o, més col·loquialment, **volta**."
        ),
      ],
    },

    {
      id: 'for',
      title: 'El bucle for',
      blocks: [
        p("El bucle `for` és el més habitual. Serveix quan sabem quantes vegades volem repetir alguna cosa. A la seva capçalera hi ha tres parts, separades per **punts i coma**:"),
        code(`for (inici; condicio; actualitzacio) {
  // cos: el codi que es repeteix
}`),
        list(
          "**Inici**: s'executa una sola vegada, abans de començar. Normalment crea un comptador: `let i = 1`.",
          "**Condició**: es comprova abans de cada volta. Si és certa, s'executa el cos; si és falsa, el bucle s'acaba.",
          "**Actualització**: s'executa al final de cada volta. Normalment fa avançar el comptador: `i++`."
        ),
        p("L'ordre en què passen les coses no és evident a primera vista. Segueix-lo pas a pas:"),
        custom('LoopTracer'),
        example({
          title: "Comptar de l'1 al 10",
          intro: "Una sola instrucció `console.log`, executada deu vegades.",
          js: `for (let i = 1; i <= 10; i++) {
  console.log(i);
}`,
          expected: "Deu línies, de l'`1` al `10`.",
          why: "A cada volta, `i` val una unitat més. Quan arriba a 11, la condició `i <= 10` és falsa i el bucle s'acaba sense executar el cos.",
        }),
        p("La variable del comptador es pot dir com vulguis, però per costum se'n diu `i` (d'*índex*). Ha de ser `let`, perquè canvia a cada volta, i només existeix dins del bucle."),
        challenge({
          statement: "Modifica el bucle perquè compti de 10 en 10, des del 10 fins al 50.",
          starter: `for (let i = 1; i <= 10; i++) {
  console.log(i);
}`,
          expectedOutput: ['10', '20', '30', '40', '50'],
          hint: "Has de canviar les tres parts de la capçalera: on comença, fins on arriba i quant avança. Recorda la drecera `i += 10`.",
          solution: `for (let i = 10; i <= 50; i += 10) {
  console.log(i);
}`,
          explanation: "L'actualització no ha de ser sempre `i++`. Pot sumar qualsevol quantitat, o restar-ne: `i--` serveix per comptar cap enrere.",
        }),
      ],
    },

    {
      id: 'comptadors-i-acumuladors',
      title: 'Comptadors i acumuladors',
      blocks: [
        p("Dins d'un bucle hi ha dos patrons que es repeteixen contínuament. Tots dos fan servir una variable que es declara **abans** del bucle i es modifica **a dins**."),
        list(
          "Un **comptador** suma 1 cada vegada que passa alguna cosa. Respon a «quants n'hi ha?».",
          "Un **acumulador** va sumant valors per obtenir un total. Respon a «quant sumen?»."
        ),
        example({
          title: "Sumar de l'1 al 100",
          intro: "La variable `suma` comença a zero i a cada volta s'hi afegeix el valor d'`i`.",
          js: `let suma = 0;

for (let i = 1; i <= 100; i++) {
  suma += i;
}

console.log(suma);`,
          expected: "`5050`",
          why: "`suma` és un acumulador. Es declara fora del bucle perquè ha de conservar el seu valor d'una volta a la següent. El `console.log` també és fora: volem el total una sola vegada, al final.",
        }),
        example({
          title: 'Comptar els múltiples de 3',
          intro: "Un bucle amb un condicional a dins: només comptem els nombres que compleixen una condició.",
          js: `let multiples = 0;

for (let i = 1; i <= 20; i++) {
  if (i % 3 === 0) {
    multiples++;
  }
}

console.log(\`Entre l'1 i el 20 hi ha \${multiples} múltiples de 3\`);`,
          expected: "`Entre l'1 i el 20 hi ha 6 múltiples de 3`",
          why: "`multiples` és un comptador: només augmenta quan el residu de dividir `i` entre 3 és zero. Bucles i condicionals es combinen sense cap regla especial.",
        }),
        example({
          title: 'La taula de multiplicar',
          intro: "Canvia el valor de `numero` per obtenir qualsevol altra taula.",
          js: `const numero = 7;

for (let i = 1; i <= 10; i++) {
  console.log(\`\${numero} x \${i} = \${numero * i}\`);
}`,
          expected: "Deu línies, de `7 x 1 = 7` a `7 x 10 = 70`.",
          why: "La instrucció és sempre la mateixa; el que canvia a cada volta és el valor d'`i`, i amb ell el resultat del càlcul.",
        }),
        concept(
          'La variable que acumula viu fora del bucle',
          "Si declares el comptador o l'acumulador **dins** del cos del bucle, es torna a crear a cada volta i perd el que portava. Declara'l abans del `for`, amb el valor inicial (gairebé sempre `0`)."
        ),
      ],
    },

    {
      id: 'while',
      title: 'El bucle while',
      blocks: [
        p("El bucle `while` només té una part: la condició. Repeteix el cos **mentre** la condició sigui certa. La inicialització i l'actualització les hem d'escriure nosaltres, on correspongui."),
        code(`while (condicio) {
  // cos: es repeteix mentre la condició sigui certa
}`),
        p("És el bucle adequat quan no sabem per endavant quantes voltes caldran, perquè depèn del que vagi passant."),
        example({
          title: "Quantes setmanes he d'estalviar?",
          intro: "Estalviem 15 € cada setmana. No sabem quantes setmanes calen per arribar a 100 €: que ho calculi el bucle.",
          js: `let estalvis = 0;
let setmanes = 0;

while (estalvis < 100) {
  estalvis += 15;
  setmanes++;
}

console.log(\`Calen \${setmanes} setmanes\`);
console.log(\`Tindràs \${estalvis} €\`);`,
          expected: "`Calen 7 setmanes` i `Tindràs 105 €`.",
          why: "El bucle continua mentre els estalvis siguin inferiors a 100. A la setena volta arriben a 105, la condició passa a ser falsa i el bucle s'acaba. `setmanes` és un comptador i `estalvis`, un acumulador.",
        }),
        p("Qualsevol `for` es pot escriure com un `while`, i al revés. Aquests dos bucles fan exactament el mateix:"),
        compare(
          {
            title: 'Amb for',
            code: `for (let i = 3; i > 0; i--) {
  console.log(i);
}`,
            text: "Les tres parts són a la capçalera: es veuen d'un cop d'ull.",
          },
          {
            title: 'Amb while',
            code: `let i = 3;

while (i > 0) {
  console.log(i);
  i--;
}`,
            text: "Les mateixes tres parts, repartides: l'inici abans, l'actualització al final del cos.",
          }
        ),
      ],
    },

    {
      id: 'bucles-infinits',
      title: 'Bucles infinits',
      blocks: [
        p("Un bucle s'acaba quan la seva condició passa a ser falsa. Si això no arriba mai, el bucle no s'atura: és un **bucle infinit**. El navegador es queda executant-lo sense parar, la pestanya deixa de respondre i al final s'ha de tancar."),
        example({
          title: 'Un bucle que no s\'acaba',
          intro: "En una pàgina real, aquest codi deixaria la pestanya penjada. Aquí el dossier ho detecta i atura l'execució al cap d'un segon.",
          js: `let i = 1;

while (i <= 5) {
  console.log(i);
  // Ens hem oblidat de fer avançar i
}`,
          expected: "El número `1` repetit moltíssimes vegades i, al final, un avís de bucle infinit.",
          why: "Com que `i` no canvia mai, sempre val 1 i la condició `i <= 5` sempre és certa. Afegeix `i++;` dins del bucle, després del `console.log`, i torna'l a executar.",
        }),
        p("Les tres causes més freqüents d'un bucle infinit:"),
        list(
          "**No actualitzar el comptador.** Passa sobretot amb `while`, perquè l'actualització no forma part de la capçalera.",
          "**Actualitzar-lo en la direcció contrària.** Per exemple, fer `i--` quan la condició és `i < 10`: cada vegada s'allunya més del final.",
          "**Una condició que es pot saltar.** Si el bucle acaba quan `i === 10` però `i` avança de 3 en 3, passarà de 9 a 12 i no s'aturarà mai. És més segur comparar amb `<` o `<=`."
        ),
        warning(
          'Abans d\'executar un bucle, comprova que s\'acaba',
          "Fes-te sempre dues preguntes: *quina variable fa que la condició arribi a ser falsa?* i *on la modifico?* Si no trobes la resposta a la segona, tens un bucle infinit."
        ),
      ],
    },

    {
      id: 'recorrer-una-llista',
      title: 'Recórrer una llista',
      blocks: [
        p("El motiu més habitual per escriure un bucle és fer alguna cosa amb **cada element d'una llista**: mostrar cada tasca, sumar cada preu, revisar cada nota. A JavaScript, una llista de valors s'anomena **array**. Li dedicarem tota la unitat 6; ara només en necessitem tres idees:"),
        list(
          "Es crea amb claudàtors, i els valors se separen amb comes: `[\"Anna\", \"Marc\", \"Júlia\"]`.",
          "S'accedeix a cada element pel número de la seva posició, entre claudàtors. **Les posicions comencen a comptar des de 0**: `alumnes[0]` és el primer.",
          "`alumnes.length` diu quants elements té."
        ),
        example({
          title: 'Una llista d\'alumnes',
          intro: "Primer mirem un element concret i la mida de la llista; després la recorrem sencera.",
          js: `const alumnes = ["Anna", "Marc", "Júlia", "Pau"];

console.log(alumnes[0]);
console.log(alumnes.length);

for (let i = 0; i < alumnes.length; i++) {
  console.log(\`\${i + 1}. \${alumnes[i]}\`);
}`,
          expected: "`Anna`, `4` i després els quatre noms numerats de l'1 al 4.",
          why: "El comptador `i` fa de posició: val 0, 1, 2 i 3, i `alumnes[i]` és l'element d'aquella posició. Com que a les persones ens agrada comptar des de l'1, mostrem `i + 1`.",
        }),
        concept(
          'El patró per recórrer un array',
          "`for (let i = 0; i < llista.length; i++)`. Comença a **0**, que és la primera posició, i continua mentre `i` sigui **estrictament més petit** que la longitud. Aprèn-te'l de memòria: l'escriuràs centenars de vegades."
        ),
        example({
          title: 'Mostrar diverses tasques',
          intro: "Afegeix una tasca més a l'array i torna'l a executar. No has de tocar res més.",
          js: `const tasques = ["Estudiar JavaScript", "Fer la compra", "Enviar el treball"];

console.log(\`Tens \${tasques.length} tasques:\`);

for (let i = 0; i < tasques.length; i++) {
  console.log(\`- \${tasques[i]}\`);
}`,
          expected: "`Tens 3 tasques:` i una línia per a cada tasca.",
          why: "El bucle no sap quantes tasques hi ha: ho pregunta a `tasques.length`. Per això funciona igual amb tres tasques que amb tres-centes. Aquest era el problema que teníem al principi de la unitat.",
        }),
        warning(
          'Amb <= et passes d\'una posició',
          "Un array de 4 elements té les posicions 0, 1, 2 i 3. La posició 4 no existeix. Si escrius `i <= alumnes.length`, a l'última volta demanaràs `alumnes[4]` i obtindràs `undefined`."
        ),
      ],
    },

    {
      id: 'for-o-while',
      title: 'Quan convé cada bucle',
      blocks: [
        p("Com que els dos bucles poden fer el mateix, la tria és una qüestió de claredat: quin dels dos explica millor el que vols fer?"),
        table(
          ['Situació', 'Bucle', 'Exemple'],
          [
            ['Sé quantes voltes vull fer', '`for`', 'Mostrar la taula de multiplicar del 7'],
            ['Vull recórrer una llista', '`for`', 'Mostrar totes les tasques'],
            ['Repeteixo fins que passi alguna cosa', '`while`', 'Estalviar fins a arribar a 100 €'],
          ]
        ),
        p("La regla pràctica: si pots dir «per a cada…» o «… vegades», fes servir `for`. Si dius «mentre…» o «fins que…», fes servir `while`. En aquest dossier, i en la majoria de codi que escriuràs, el `for` apareixerà molt més sovint."),
      ],
    },

    {
      id: 'bucles-niats',
      title: 'Un bucle dins d\'un altre: dibuixar amb caràcters',
      blocks: [
        p("Igual que passava amb els condicionals, dins del cos d'un bucle hi pot anar un altre bucle. Per entendre-ho anirem a poc a poc. Primer, un sol bucle que construeix una línia d'asteriscos enganxant-ne un a cada volta:"),
        example({
          title: 'Una línia de cinc asteriscos',
          intro: "Aquí l'acumulador no suma nombres: enganxa text.",
          js: `let linia = "";

for (let i = 1; i <= 5; i++) {
  linia += "*";
}

console.log(linia);`,
          expected: "`*****`",
          why: "`linia` comença sent un text buit i a cada volta se li afegeix un asterisc. `+=` funciona amb textos igual que amb nombres, però enganxant.",
        }),
        p("Ara posem aquest bucle dins d'un altre. El bucle de fora decideix **quantes files** hi ha; el de dins, **quants asteriscos** té cada fila."),
        example({
          title: 'Un triangle',
          intro: "A la fila 1 hi ha un asterisc, a la fila 2 n'hi ha dos, i així successivament.",
          js: `const alcada = 5;

for (let fila = 1; fila <= alcada; fila++) {
  let linia = "";

  for (let columna = 1; columna <= fila; columna++) {
    linia += "*";
  }

  console.log(linia);
}`,
          expected: "Cinc línies: la primera amb un asterisc i l'última amb cinc.",
          why: "La clau és la condició del bucle de dins: `columna <= fila`. El nombre de voltes que fa depèn de la fila on som. I aquí `linia` es declara dins del bucle de fora expressament: volem que cada fila comenci buida.",
        }),
        p("Quan hi ha bucles niats, noms com `fila` i `columna` ajuden molt més que `i` i `j` a no perdre's."),
        challenge({
          statement: "Canvia el programa perquè dibuixi un quadrat de 4 files i 4 columnes fet amb coixinets (`#`).",
          starter: `const mida = 4;

for (let fila = 1; fila <= mida; fila++) {
  let linia = "";

  // Bucle de dins: afegeix els coixinets d'aquesta fila

  console.log(linia);
}`,
          expectedOutput: ['####', '####', '####', '####'],
          hint: "En un quadrat totes les files tenen la mateixa llargada: el bucle de dins ha d'arribar sempre fins a `mida`, no fins a `fila`.",
          solution: `const mida = 4;

for (let fila = 1; fila <= mida; fila++) {
  let linia = "";

  for (let columna = 1; columna <= mida; columna++) {
    linia += "#";
  }

  console.log(linia);
}`,
          explanation: "L'única diferència amb el triangle és la condició del bucle de dins. Per cada volta del bucle de fora, el de dins fa totes les seves voltes: en total, `4 × 4 = 16` coixinets.",
        }),
        project(
          "Aquest és el pas que ens faltava per tractar moltes tasques alhora. De moment tenim dues llistes paral·leles: una amb els textos i una altra que diu si cada tasca està completada. El bucle les recorre totes dues amb el mateix índex.",
          {
            title: 'Mostrar totes les tasques, numerades',
            code: `const tasques = ["Estudiar JavaScript", "Fer la compra", "Enviar el treball"];
const completades = [true, false, false];

for (let i = 0; i < tasques.length; i++) {
  if (completades[i]) {
    console.log(\`\${i + 1}. [x] \${tasques[i]}\`);
  } else {
    console.log(\`\${i + 1}. [ ] \${tasques[i]}\`);
  }
}`,
          }
        ),
        p("Mantenir dues llistes sincronitzades és fràgil: si n'esborres un element d'una i no de l'altra, tot es descol·loca. Ho arreglarem a la unitat 6, quan cada tasca sigui una sola peça amb totes les seves dades."),
      ],
    },
  ],

  commonErrors: [
    {
      title: 'Oblidar-se de fer avançar el comptador',
      bad: `let i = 0;

while (i < 3) {
  console.log(i);
}`,
      why: "El valor d'`i` no canvia mai, de manera que la condició sempre és certa: bucle infinit. Amb `while`, l'actualització l'has d'escriure tu dins del cos.",
      fix: `let i = 0;

while (i < 3) {
  console.log(i);
  i++;
}`,
    },
    {
      title: 'Recórrer un array amb <= en lloc de <',
      bad: `const noms = ["Anna", "Marc"];

for (let i = 0; i <= noms.length; i++) {
  console.log(noms[i]);
}`,
      why: "L'array té les posicions 0 i 1, però el bucle arriba fins a la 2, que no existeix. No hi ha cap error: surt un `undefined` al final, que després pot provocar errors en altres llocs.",
      fix: `const noms = ["Anna", "Marc"];

for (let i = 0; i < noms.length; i++) {
  console.log(noms[i]);
}`,
    },
    {
      title: "Declarar l'acumulador dins del bucle",
      bad: `for (let i = 1; i <= 5; i++) {
  let suma = 0;
  suma += i;
}

console.log(suma);`,
      message: 'Uncaught ReferenceError: suma is not defined',
      why: "La variable es crea de nou a cada volta, començant de zero, i a més només existeix dins de les claus del bucle. Fora, no hi ha res que es digui `suma`.",
      fix: `let suma = 0;

for (let i = 1; i <= 5; i++) {
  suma += i;
}

console.log(suma);`,
    },
    {
      title: 'Declarar el comptador amb const',
      bad: `for (const i = 0; i < 3; i++) {
  console.log(i);
}`,
      message: 'Uncaught TypeError: Assignment to constant variable.',
      why: "La primera volta funciona, però quan `i++` intenta canviar el valor, falla. Un comptador canvia per definició: ha de ser `let`.",
      fix: `for (let i = 0; i < 3; i++) {
  console.log(i);
}`,
    },
    {
      title: 'Separar les parts del for amb comes',
      bad: `for (let i = 0, i < 3, i++) {
  console.log(i);
}`,
      message: "Uncaught SyntaxError: Unexpected token '<'",
      why: "Les tres parts de la capçalera del `for` se separen amb **punts i coma**, no amb comes.",
      fix: `for (let i = 0; i < 3; i++) {
  console.log(i);
}`,
    },
  ],

  exercises: [
    {
      id: 'compte-enrere',
      title: 'Compte enrere',
      statement: "Mostra un compte enrere del 5 a l'1 i, quan s'acabi, el missatge `Enlairament!`.",
      expectedOutput: ['5', '4', '3', '2', '1', 'Enlairament!'],
      hint: "El comptador ha de començar a 5 i anar baixant amb `i--`. Quina condició fa que s'aturi després de l'1? El missatge final va fora del bucle.",
      solution: `for (let i = 5; i >= 1; i--) {
  console.log(i);
}

console.log("Enlairament!");`,
      explanation: "Un bucle pot comptar cap enrere si l'inici és el valor més gran, la condició comprova el límit inferior i l'actualització resta. El missatge final és fora de les claus perquè només s'ha de mostrar una vegada.",
    },
    {
      id: 'parells',
      title: 'Els nombres parells',
      statement: "Mostra tots els nombres parells del 2 al 20, un a cada línia.",
      expectedOutput: ['2', '4', '6', '8', '10', '12', '14', '16', '18', '20'],
      hint: "Hi ha dues maneres: recórrer tots els nombres i mostrar només els que compleixin `i % 2 === 0`, o bé començar a 2 i avançar de dos en dos.",
      solution: `for (let i = 2; i <= 20; i += 2) {
  console.log(i);
}`,
      explanation: "Començant a 2 i sumant 2 a cada volta, el comptador només passa pels parells i no cal cap condicional. La versió amb `if (i % 2 === 0)` també és correcta: fa el doble de voltes, però per a vint nombres no té cap importància.",
    },
    {
      id: 'suma-parells',
      title: 'La suma dels parells',
      statement: "Calcula la suma de tots els nombres parells de l'1 al 50 i mostra el resultat en una frase.",
      expectedOutput: ['La suma és 650'],
      hint: "Necessites un acumulador declarat abans del bucle. El `console.log` ha d'anar després del bucle, no a dins.",
      solution: `let suma = 0;

for (let i = 2; i <= 50; i += 2) {
  suma += i;
}

console.log(\`La suma és \${suma}\`);`,
      explanation: "L'acumulador comença a zero fora del bucle i hi anem afegint cada nombre parell. Si el `console.log` fos dins del bucle, veuríem vint-i-cinc sumes parcials en lloc del total.",
    },
    {
      id: 'mitjana-notes',
      title: 'La mitjana de les notes',
      statement: "Calcula la mitjana de les notes d'una llista. El programa ha de continuar funcionant si s'hi afegeixen més notes.",
      data: ['notes = [7, 5, 9, 6]'],
      expectedOutput: ['Mitjana: 6.75'],
      starter: `const notes = [7, 5, 9, 6];

// Suma totes les notes amb un bucle i calcula la mitjana
`,
      hint: "Recorre l'array amb el patró habitual i acumula cada `notes[i]`. Per dividir, no escriguis un 4: fes servir `notes.length`.",
      solution: `const notes = [7, 5, 9, 6];

let suma = 0;

for (let i = 0; i < notes.length; i++) {
  suma += notes[i];
}

const mitjana = suma / notes.length;
console.log(\`Mitjana: \${mitjana}\`);`,
      explanation: "Dividir per `notes.length` en lloc de per 4 és el que fa que el programa serveixi per a qualsevol quantitat de notes. Un número escrit directament al codi, que ningú sap d'on surt, s'acostuma a anomenar «número màgic», i convé evitar-los.",
    },
  ],

  finalExercise: {
    id: 'informe-tasques',
    title: "L'informe de tasques",
    statement: [
      "Tens dues llistes paral·leles: els textos de les tasques i si cadascuna està completada. Mostra-les totes numerades, amb `[x]` davant de les completades i `[ ]` davant de les pendents.",
      "Al final, mostra quantes tasques queden pendents.",
    ],
    data: [
      'tasques = ["Estudiar JavaScript", "Fer la compra", "Enviar el treball", "Repassar CSS"]',
      'completades = [true, false, true, false]',
    ],
    expectedOutput: [
      '1. [x] Estudiar JavaScript',
      '2. [ ] Fer la compra',
      '3. [x] Enviar el treball',
      '4. [ ] Repassar CSS',
      'Pendents: 2',
    ],
    starter: `const tasques = ["Estudiar JavaScript", "Fer la compra", "Enviar el treball", "Repassar CSS"];
const completades = [true, false, true, false];

let pendents = 0;

// Recorre les tasques, mostra cada línia i compta les pendents

`,
    hint: [
      "Fes servir un sol bucle. El mateix índex `i` serveix per a les dues llistes: `tasques[i]` i `completades[i]`.",
      "Dins del bucle necessites un `if` i un `else`. El comptador `pendents` només ha d'augmentar a la branca de les tasques no completades.",
    ],
    solution: `const tasques = ["Estudiar JavaScript", "Fer la compra", "Enviar el treball", "Repassar CSS"];
const completades = [true, false, true, false];

let pendents = 0;

for (let i = 0; i < tasques.length; i++) {
  if (completades[i]) {
    console.log(\`\${i + 1}. [x] \${tasques[i]}\`);
  } else {
    console.log(\`\${i + 1}. [ ] \${tasques[i]}\`);
    pendents++;
  }
}

console.log(\`Pendents: \${pendents}\`);`,
    explanation: [
      "Aquest exercici ajunta tot el que has vist fins ara: variables, condicionals, template literals, un bucle sobre una llista i un comptador.",
      "Fixa't que `completades[i]` ja és un booleà, i per això es pot posar directament com a condició. El comptador viu fora del bucle i el total es mostra al final.",
    ],
  },

  summary: [
    "Un bucle repeteix un bloc de codi mentre es compleix una condició.",
    "`for (inici; condició; actualització)` és el bucle per quan saps quantes voltes cal fer o recorres una llista.",
    "`while (condició)` repeteix mentre la condició és certa: útil quan no saps quantes voltes caldran.",
    "Un comptador compta (`++`) i un acumulador suma (`+=`). Tots dos es declaren abans del bucle.",
    "Per recórrer un array: `for (let i = 0; i < llista.length; i++)`. Les posicions comencen a 0.",
    "Si la condició no arriba mai a ser falsa, el bucle és infinit i penja la pàgina.",
  ],

  quiz: [
    {
      question: "Quantes vegades s'executa el cos d'aquest bucle?",
      code: `for (let i = 0; i < 5; i++) {
  console.log("Hola");
}`,
      options: [
        { text: '5 vegades', correct: true },
        { text: '4 vegades', why: "`i` pren els valors 0, 1, 2, 3 i 4: en són cinc, perquè el 0 també compta." },
        { text: '6 vegades', why: "Quan `i` val 5, la condició `i < 5` ja és falsa i el cos no s'executa." },
        { text: 'Infinites vegades', why: "`i` augmenta a cada volta i acaba arribant a 5: la condició deixa de complir-se." },
      ],
      explanation: "Començant a 0 i amb la condició `i < 5`, el comptador val 0, 1, 2, 3 i 4. Són cinc voltes.",
    },
    {
      question: "Què mostra aquest codi?",
      code: `let total = 0;

for (let i = 1; i <= 4; i++) {
  total += i;
}

console.log(total);`,
      options: [
        { text: '`10`', correct: true },
        { text: '`4`', why: "4 és l'últim valor d'`i`, però `total` acumula la suma de tots: 1 + 2 + 3 + 4." },
        { text: '`0`', why: "`total` comença a 0, però a cada volta se li suma el valor d'`i`." },
        { text: '`1`, `3`, `6` i `10`, en quatre línies', why: "El `console.log` és fora del bucle: només s'executa una vegada, al final." },
      ],
      explanation: "`total` és un acumulador: 0 + 1 + 2 + 3 + 4 = 10. Com que es mostra després del bucle, només veiem el resultat final.",
    },
    {
      question: "Vols repetir una operació fins que els estalvis arribin a 500 €, sense saber quantes vegades caldrà. Quin bucle hi encaixa millor?",
      options: [
        { text: '`while`', correct: true },
        { text: '`for`', why: "Es podria fer, però `for` està pensat per quan coneixes el nombre de voltes o recorres una llista." },
        { text: 'Cap: n\'hi ha prou amb un `if`', why: "Un `if` s'executa com a màxim una vegada. Aquí cal repetir." },
        { text: 'Dos `for` niats', why: "Els bucles niats serveixen per a dues dimensions, com files i columnes. Aquí només hi ha una repetició." },
      ],
      explanation: "«Fins que passi alguna cosa» és la pista: `while (estalvis < 500)` ho expressa directament.",
    },
    {
      question: "Quin problema té aquest bucle?",
      code: `let i = 10;

while (i > 0) {
  console.log(i);
  i++;
}`,
      options: [
        { text: "És infinit: `i` augmenta i la condició `i > 0` sempre és certa.", correct: true },
        { text: "No s'executa cap vegada.", why: "10 és més gran que 0, de manera que la condició es compleix des de la primera volta." },
        { text: "Mostra els nombres del 10 a l'1 i s'atura.", why: "Per comptar cap enrere caldria `i--`. Amb `i++` el comptador s'allunya del zero." },
        { text: "Té un error de sintaxi.", why: "El codi està ben escrit. El problema és de lògica, i el navegador no el detecta." },
      ],
      explanation: "El comptador avança en la direcció contrària a la que faria falsa la condició. Hauria de ser `i--`.",
    },
    {
      question: "Què mostra aquest codi?",
      code: `const noms = ["Anna", "Marc", "Pau"];

for (let i = 0; i <= noms.length; i++) {
  console.log(noms[i]);
}`,
      options: [
        { text: 'Anna, Marc, Pau i `undefined`', correct: true },
        { text: 'Anna, Marc i Pau', why: "Seria així amb `i < noms.length`. Amb `<=` es fa una volta de més." },
        { text: 'Marc i Pau', why: "El bucle comença a 0, que és la posició del primer element." },
        { text: 'Un error que atura el programa', why: "Llegir una posició que no existeix no dona error: retorna `undefined`." },
      ],
      explanation: "L'array té les posicions 0, 1 i 2. Amb `<=`, el bucle també demana la posició 3, que no existeix i val `undefined`.",
    },
  ],
};
