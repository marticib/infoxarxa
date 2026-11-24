import { p, list, code, example, concept, warning, challenge, project, table, compare } from '../../blocks.js';

export default {
  id: 'condicionals',
  number: 3,
  title: 'Condicionals',
  shortTitle: 'Condicionals',
  description:
    "Com fer que un programa prengui decisions: comparar valors, combinar condicions i executar un codi o un altre segons el resultat.",

  problem: {
    title: "Ja tenim dades, però encara no podem prendre decisions",
    text: [
      "Amb variables hem pogut guardar el text d'una tasca i si està completada. Però el programa fa sempre el mateix, valguin el que valguin: mostra les dades i prou. Una aplicació de veritat ha de comportar-se diferent segons la situació.",
      "Si el text de la tasca és buit, no l'hem d'acceptar. Si la tasca està completada, l'hem de mostrar ratllada. Si no en queda cap de pendent, volem felicitar la persona. Totes aquestes frases comencen per «si», i això és exactament el que aprendrem a escriure.",
    ],
  },

  goals: [
    "Escriure comparacions que donen `true` o `false`.",
    "Explicar per què fem servir `===` i no `==`.",
    "Triar entre dos o més camins amb `if`, `else if` i `else`.",
    "Combinar condicions amb `&&`, `||` i `!`.",
  ],

  projectPiece:
    "El gestor comença a decidir: rebutja una tasca si el text és buit i mostra cada tasca d'una manera o d'una altra segons si està completada.",

  finalProject:
    "Decidiràs quins vídeos es veuen segons la cerca i la categoria, i què diu cada botó segons el seu estat.",

  sections: [
    {
      id: 'expressions-booleanes',
      title: 'Preguntes que es responen amb sí o no',
      blocks: [
        p("Tota decisió comença amb una pregunta que només té dues respostes possibles. *És major d'edat? Ha aprovat? El text és buit?* A JavaScript, aquestes preguntes s'escriuen com a **comparacions**, i la resposta és un booleà: `true` o `false`."),
        table(
          ['Operador', 'Pregunta', 'Exemple', 'Resultat'],
          [
            ['`>`', 'És més gran que…?', '`7 > 5`', '`true`'],
            ['`<`', 'És més petit que…?', '`7 < 5`', '`false`'],
            ['`>=`', 'És més gran o igual que…?', '`5 >= 5`', '`true`'],
            ['`<=`', 'És més petit o igual que…?', '`7 <= 5`', '`false`'],
            ['`===`', 'És igual a…?', '`5 === 5`', '`true`'],
            ['`!==`', 'És diferent de…?', '`5 !== 5`', '`false`'],
          ],
          'Operadors de comparació'
        ),
        example({
          title: 'Comparacions amb una edat',
          intro: "Cada línia fa una pregunta sobre la variable `edat`. Canvia'n el valor i mira com canvien les respostes.",
          js: `const edat = 19;

console.log(edat >= 18);
console.log(edat < 18);
console.log(edat === 19);
console.log(edat !== 19);

const esMajorEdat = edat >= 18;
console.log(esMajorEdat);`,
          expected: "`true`, `false`, `true`, `false` i `true`.",
          why: "Una comparació és un valor com qualsevol altre: es pot mostrar, i també es pot guardar en una variable, com fem amb `esMajorEdat`.",
        }),
        concept(
          'Expressió booleana',
          "Qualsevol tros de codi que, un cop calculat, dona `true` o `false` és una expressió booleana. Són la matèria primera de totes les decisions d'un programa."
        ),
      ],
    },

    {
      id: 'igualtat',
      title: '== i ===: per què sempre farem servir tres iguals',
      blocks: [
        p("A JavaScript hi ha dos operadors per preguntar si dos valors són iguals, i es comporten diferent quan els valors són de **tipus diferents**:"),
        list(
          "`===` (igualtat estricta) compara el valor **i** el tipus. Si els tipus no coincideixen, la resposta és `false` i prou.",
          "`==` (igualtat feble) primer intenta convertir els dos valors al mateix tipus, i després compara. Les regles d'aquesta conversió són complicades i donen resultats sorprenents."
        ),
        example({
          title: 'La diferència, en cinc línies',
          intro: "Les dues últimes línies comparen el nombre zero amb un text buit.",
          js: `console.log(5 === 5);
console.log(5 === "5");
console.log(5 == "5");

console.log(0 == "");
console.log(0 === "");`,
          expected: "`true`, `false`, `true`, `true` i `false`.",
          why: "Amb `==`, JavaScript converteix `\"5\"` a nombre i diu que són iguals. Pitjor encara: considera que `0` i un text buit són el mateix. Amb `===` no hi ha conversions ni sorpreses: un nombre i un text mai són iguals.",
        }),
        concept(
          'Sempre === i !==',
          "Fes servir sempre la igualtat estricta. Si has de comparar valors de tipus diferents, converteix-los tu primer amb `Number()` o `String()`: així la conversió es veu al codi i la decideixes tu."
        ),
        warning(
          'Un sol = no compara: assigna',
          "`=` guarda un valor en una variable. `===` pregunta si dos valors són iguals. Confondre'ls dins d'una condició és un dels errors clàssics, i el trobaràs explicat al final de la unitat."
        ),
      ],
    },

    {
      id: 'if-else',
      title: 'if i else: fer una cosa o una altra',
      blocks: [
        p("Ara que sabem fer preguntes, podem actuar segons la resposta. La instrucció `if` executa un bloc de codi **només si** la condició és certa. Opcionalment, `else` indica què fer quan no ho és."),
        code(`if (condicio) {
  // s'executa si la condició és true
} else {
  // s'executa si la condició és false
}`),
        list(
          "La condició va entre **parèntesis** i ha de ser una expressió booleana.",
          "Cada bloc va entre **claus** `{ }`. El codi de dins se sagna dos espais perquè es vegi d'un cop d'ull què pertany a cada camí.",
          "No hi ha punt i coma després de les claus."
        ),
        example({
          title: "Major o menor d'edat",
          intro: "Canvia el valor d'`edat` per 18, per 30 i per 5, i executa'l cada vegada.",
          js: `const edat = 16;

if (edat >= 18) {
  console.log("Ets major d'edat");
} else {
  console.log("Ets menor d'edat");
}

console.log("Fi de la comprovació");`,
          expected: "Amb 16: `Ets menor d'edat` i després `Fi de la comprovació`.",
          why: "Només s'executa un dels dos blocs, mai tots dos. Un cop acabat, el programa continua amb la primera línia de després del condicional, que per això s'executa sempre.",
        }),
        p("L'`else` no és obligatori. Si només vols fer alguna cosa quan la condició es compleix, i res quan no, escriu només l'`if`:"),
        code(`const tasquesPendents = 0;

if (tasquesPendents === 0) {
  console.log("Enhorabona, ho tens tot fet!");
}`),
        challenge({
          statement: "Una botiga ofereix enviament gratuït a partir de 50 €. Escriu un condicional que mostri `Enviament gratuït` si l'import arriba al mínim i `Enviament: 4,95 €` si no hi arriba.",
          starter: `const importCompra = 50;

// Escriu aquí el condicional
`,
          expectedOutput: ['Enviament gratuït'],
          hint: "«A partir de 50» inclou el 50. Quin operador necessites: `>` o `>=`?",
          solution: `const importCompra = 50;

if (importCompra >= 50) {
  console.log("Enviament gratuït");
} else {
  console.log("Enviament: 4,95 €");
}`,
          explanation: "Els casos límit són on s'amaguen els errors. Amb `>` en lloc de `>=`, una compra de 50 € justos pagaria enviament. Prova sempre el teu codi amb el valor exacte de la frontera.",
        }),
      ],
    },

    {
      id: 'else-if',
      title: 'else if: més de dos camins',
      blocks: [
        p("Sovint hi ha més de dues possibilitats. Una nota pot ser un suspès, un aprovat, un notable o un excel·lent. Per encadenar diverses preguntes fem servir `else if`."),
        example({
          title: "Classificació d'una nota",
          intro: "Prova-ho amb diverses notes: 9.5, 7, 5 i 3.",
          js: `const nota = 7.5;

if (nota >= 9) {
  console.log("Excel·lent");
} else if (nota >= 7) {
  console.log("Notable");
} else if (nota >= 5) {
  console.log("Aprovat");
} else {
  console.log("Suspès");
}`,
          expected: "Amb 7.5: `Notable`.",
          why: "Les condicions es comproven **en ordre, de dalt a baix**. Quan una es compleix, s'executa el seu bloc i la resta se salten, encara que també fossin certes. Per això a la segona branca n'hi ha prou amb `nota >= 7`: si hi hem arribat, ja sabem que la nota no és 9 o més.",
        }),
        warning(
          "L'ordre de les condicions importa",
          "Si a l'exemple comencéssim preguntant `nota >= 5`, totes les notes aprovades entrarien en aquest primer bloc i mai arribarien a «Notable» ni a «Excel·lent». Ordena les condicions de la més restrictiva a la més general."
        ),
        p("L'`else` final recull tots els casos que no han entrat en cap condició anterior. Pensa-hi com en un «en qualsevol altre cas»."),
      ],
    },

    {
      id: 'operadors-logics',
      title: 'Combinar condicions: &&, || i !',
      blocks: [
        p("De vegades una sola pregunta no és suficient. Un nom d'usuari és vàlid si no és massa curt **i** no és massa llarg. Una persona té descompte si és estudiant **o** té més de 65 anys. Per combinar condicions tenim tres operadors lògics:"),
        table(
          ['Operador', 'Es llegeix', 'Dona true quan…', 'Exemple'],
          [
            ['`&&`', 'i', 'les dues condicions són certes', '`edat >= 18 && teCarnet`'],
            ['`||`', 'o', 'almenys una de les dues és certa', '`esEstudiant || edat > 65`'],
            ['`!`', 'no', 'la condició és falsa (la inverteix)', '`!completada`'],
          ],
          'Operadors lògics'
        ),
        example({
          title: "Validació d'un nom d'usuari",
          intro: "El nom ha de tenir entre 3 i 12 caràcters. Prova amb `\"jo\"`, amb un text buit i amb un nom molt llarg.",
          js: `const usuari = "anna_dev";

const massaCurt = usuari.length < 3;
const massaLlarg = usuari.length > 12;

if (usuari === "") {
  console.log("El nom d'usuari és obligatori");
} else if (massaCurt || massaLlarg) {
  console.log("El nom ha de tenir entre 3 i 12 caràcters");
} else {
  console.log("Nom d'usuari vàlid");
}`,
          expected: "Amb `anna_dev`: `Nom d'usuari vàlid`.",
          why: "Guardar cada comparació en una constant amb un nom clar (`massaCurt`, `massaLlarg`) fa que la condició es llegeixi com una frase. `usuari.length` és el nombre de caràcters del text.",
        }),
        example({
          title: "L'estat d'una tasca",
          intro: "L'operador `!` inverteix un booleà: `!completada` es llegeix «no completada».",
          js: `const completada = false;
const esUrgent = true;

if (!completada && esUrgent) {
  console.log("Atenció: tasca urgent per fer");
} else if (!completada) {
  console.log("Tasca pendent");
} else {
  console.log("Tasca completada");
}`,
          expected: "`Atenció: tasca urgent per fer`",
          why: "Com que `completada` ja és un booleà, no cal comparar-lo amb res: `if (completada)` vol dir «si està completada» i `if (!completada)`, «si no ho està». Escriure `completada === true` funciona, però és redundant.",
        }),
        warning(
          'Cada costat ha de ser una comparació completa',
          "En català diem «si l'edat és més gran que 18 i més petita que 65», però a JavaScript no es pot escriure `edat > 18 && < 65`: és un error de sintaxi. Cal repetir la variable: `edat > 18 && edat < 65`."
        ),
        p("Quan barregis `&&` i `||` en una mateixa condició, posa-hi parèntesis per deixar clar què va amb què, igual que faries en una operació matemàtica: `esSoci && (importCompra > 100 || teCupo)`."),
      ],
    },

    {
      id: 'niats',
      title: 'Condicionals niats',
      blocks: [
        p("Dins del bloc d'un `if` hi pot anar qualsevol codi, i això inclou un altre `if`. D'això se'n diu **niar** condicionals, i serveix quan una segona pregunta només té sentit si la primera s'ha complert."),
        example({
          title: "Descompte segons l'import",
          intro: "Només hi ha descompte en compres de 100 € o més. I dins d'aquestes, els socis en tenen un de més gran.",
          js: `const importCompra = 120;
const esSoci = true;

let descompte = 0;

if (importCompra >= 100) {
  if (esSoci) {
    descompte = 20;
  } else {
    descompte = 10;
  }
}

const preuFinal = importCompra - importCompra * descompte / 100;

console.log(\`Descompte: \${descompte}%\`);
console.log(\`Preu final: \${preuFinal} €\`);`,
          expected: "`Descompte: 20%` i `Preu final: 96 €`.",
          why: "La pregunta «és soci?» només es fa si la compra arriba als 100 €. Si no hi arriba, se salta tot el bloc exterior i `descompte` es queda amb el valor inicial, `0`.",
        }),
        concept(
          'Declarar fora, assignar dins',
          "Fixa't en el patró: declarem `descompte` amb `let` **abans** del condicional, amb un valor per defecte, i dins de cada branca només li assignem un valor nou. Així la variable existeix sempre, passi el que passi."
        ),
        p("Niar està bé, però cada nivell fa el codi més difícil de seguir. Quan en tinguis més de dos, mira si pots combinar les preguntes amb `&&`. L'exemple anterior també es pot escriure així:"),
        code(`if (importCompra >= 100 && esSoci) {
  descompte = 20;
} else if (importCompra >= 100) {
  descompte = 10;
}`),
      ],
    },

    {
      id: 'ternari',
      title: "Ampliació: l'operador ternari",
      blocks: [
        p("Hi ha un cas tan habitual que té una sintaxi pròpia, més curta: triar entre **dos valors** segons una condició. És l'operador ternari, i té tres parts separades per `?` i `:`."),
        code(`condicio ? valorSiEsCerta : valorSiEsFalsa`),
        compare(
          {
            title: 'Amb if i else',
            code: `let estat;

if (completada) {
  estat = "Completada";
} else {
  estat = "Pendent";
}`,
          },
          {
            title: 'Amb l\'operador ternari',
            code: `const estat = completada ? "Completada" : "Pendent";`,
            text: "Es llegeix: «està completada? Si és que sí, `\"Completada\"`; si és que no, `\"Pendent\"`».",
          }
        ),
        example({
          title: "El text de l'estat d'una tasca",
          intro: "Canvia `completada` a `false` i torna'l a executar.",
          js: `const text = "Estudiar JavaScript";
const completada = true;

const estat = completada ? "Completada" : "Pendent";
console.log(\`\${text}: \${estat}\`);`,
          expected: "`Estudiar JavaScript: Completada`",
        }),
        warning(
          'Només per triar entre dos valors',
          "El ternari és útil quan és curt. Si necessites més de dues opcions, o executar diverses instruccions, fes servir `if` i `else`: un ternari dins d'un altre ternari és molt difícil de llegir."
        ),
        project(
          "Amb condicionals, el gestor ja pot aplicar les seves dues primeres regles: no acceptar tasques buides i mostrar cada tasca segons el seu estat. De moment ho fem a la consola, amb `[x]` per a les completades i `[ ]` per a les pendents.",
          {
            title: 'Les primeres decisions del gestor',
            code: `const textTasca = "Estudiar JavaScript";
const completada = false;

if (textTasca === "") {
  console.log("Error: la tasca no pot estar buida");
} else if (completada) {
  console.log(\`[x] \${textTasca}\`);
} else {
  console.log(\`[ ] \${textTasca}\`);
}`,
          }
        ),
      ],
    },
  ],

  commonErrors: [
    {
      title: 'Fer servir = en lloc de === dins de la condició',
      bad: `let nota = 4;

if (nota = 10) {
  console.log("Matrícula d'honor!");
}`,
      why: "Amb un sol `=` no es compara: s'assigna el valor 10 a `nota`, i el resultat de l'assignació (10) es considera cert. El missatge es mostra sempre i, a més, la variable ha canviat. No hi ha cap error a la consola. Si `nota` fos `const`, almenys saltaria un `TypeError`: un motiu més per preferir `const`.",
      fix: `let nota = 4;

if (nota === 10) {
  console.log("Matrícula d'honor!");
}`,
    },
    {
      title: 'Deixar una comparació a mitges',
      bad: `if (edat >= 18 && <= 65) {
  console.log("En edat laboral");
}`,
      message: "Uncaught SyntaxError: Unexpected token '<='",
      why: "A cada costat de `&&` hi ha d'haver una comparació completa, amb el seu valor a l'esquerra. JavaScript no sobreentén que la segona també parla d'`edat`.",
      fix: `if (edat >= 18 && edat <= 65) {
  console.log("En edat laboral");
}`,
    },
    {
      title: 'Ordenar malament les condicions',
      bad: `if (nota >= 5) {
  console.log("Aprovat");
} else if (nota >= 9) {
  console.log("Excel·lent");
}`,
      why: "Un 9.5 també és més gran o igual que 5, de manera que entra al primer bloc i mai arriba al segon. No hi ha cap error: simplement, «Excel·lent» no surt mai.",
      fix: `if (nota >= 9) {
  console.log("Excel·lent");
} else if (nota >= 5) {
  console.log("Aprovat");
}`,
    },
    {
      title: 'Un punt i coma després de la condició',
      bad: `if (edat >= 18); {
  console.log("Pots entrar");
}`,
      why: "El punt i coma tanca l'`if` abans d'hora: el condicional es queda sense cos, i el bloc de sota passa a ser codi normal que s'executa sempre. Després dels parèntesis d'un `if` hi va directament la clau.",
      fix: `if (edat >= 18) {
  console.log("Pots entrar");
}`,
    },
    {
      title: 'Comparar un text amb un nombre',
      bad: `const edat = "18"; // ve d'un formulari

if (edat === 18) {
  console.log("Tens 18 anys");
}`,
      why: "`\"18\"` és un text i `18` és un nombre: amb `===` mai són iguals, i el missatge no es mostra. La solució no és passar a `==`, sinó convertir el valor al tipus correcte abans de comparar.",
      fix: `const edat = Number("18");

if (edat === 18) {
  console.log("Tens 18 anys");
}`,
    },
  ],

  exercises: [
    {
      id: 'parell-senar',
      title: 'Parell o senar',
      statement: "Mostra si un nombre és parell o senar.",
      data: ['numero = 7'],
      expectedOutput: ['7 és senar'],
      hint: "Un nombre és parell quan el residu de dividir-lo per 2 és zero. L'operador del residu és `%`.",
      solution: `const numero = 7;

if (numero % 2 === 0) {
  console.log(\`\${numero} és parell\`);
} else {
  console.log(\`\${numero} és senar\`);
}`,
      explanation: "`numero % 2` només pot donar 0 o 1. Comparant-lo amb 0 obtenim un booleà que decideix quina de les dues branques s'executa. Prova de canviar el 7 per un 10 per comprovar l'altre camí.",
    },
    {
      id: 'aprovat',
      title: 'Aprovat o suspès',
      statement: "Una nota aprova si és 5 o més. Mostra `Aprovat` o `Suspès` segons el valor de la nota.",
      data: ['nota = 4.5'],
      expectedOutput: ['Suspès'],
      hint: "«5 o més» inclou el 5. Fes servir `>=`.",
      solution: `const nota = 4.5;

if (nota >= 5) {
  console.log("Aprovat");
} else {
  console.log("Suspès");
}`,
      explanation: "Amb dues possibilitats n'hi ha prou amb un `if` i un `else`. Comprova-ho també amb un 5 exacte: és el valor on un `>` en lloc de `>=` donaria un resultat injust.",
    },
    {
      id: 'temperatura',
      title: 'Quin temps fa?',
      statement: "Mostra un missatge segons la temperatura: per sota de 10 graus, `Fa fred`; de 10 fins a menys de 25, `S'hi està bé`; a partir de 25, `Fa calor`.",
      data: ['temperatura = 18'],
      expectedOutput: ["S'hi està bé"],
      hint: "Hi ha tres casos: necessites `if`, `else if` i `else`. Si ordenes bé les condicions, a la segona no cal que tornis a preguntar si és més gran o igual que 10.",
      solution: `const temperatura = 18;

if (temperatura < 10) {
  console.log("Fa fred");
} else if (temperatura < 25) {
  console.log("S'hi està bé");
} else {
  console.log("Fa calor");
}`,
      explanation: "Quan s'arriba al segon `else if`, ja sabem que la temperatura no és inferior a 10: si ho fos, hauria entrat al primer bloc. Per això `temperatura < 25` és suficient.",
    },
    {
      id: 'concert',
      title: 'Qui pot entrar al concert?',
      statement: "En un concert hi poden entrar les persones majors d'edat. Les de 16 i 17 anys també, però només si porten una autorització. Mostra `Pot entrar` o `No pot entrar`.",
      data: ['edat = 16', 'teAutoritzacio = true'],
      expectedOutput: ['Pot entrar'],
      hint: "Hi ha dues maneres de poder entrar, unides per un «o». La segona té dues condicions unides per un «i». Posa-hi parèntesis.",
      solution: `const edat = 16;
const teAutoritzacio = true;

if (edat >= 18 || (edat >= 16 && teAutoritzacio)) {
  console.log("Pot entrar");
} else {
  console.log("No pot entrar");
}`,
      explanation: "La condició tradueix la frase gairebé paraula per paraula: «major d'edat **o** (16 o més **i** amb autorització)». Prova-ho amb 16 sense autorització, amb 15 amb autorització i amb 30: has de cobrir tots els camins.",
    },
  ],

  finalExercise: {
    id: 'descomptes',
    title: 'Calculadora de descomptes',
    statement: [
      "Una botiga aplica un descompte segons l'import de la compra: un 15 % a partir de 100 €, un 10 % a partir de 50 € i cap descompte per sota.",
      "A més, els socis tenen sempre 5 punts addicionals de descompte, sigui quin sigui l'import. Calcula el percentatge final i el preu que cal pagar.",
    ],
    data: ['importCompra = 80', 'esSoci = true'],
    expectedOutput: ['Descompte: 15%', 'Preu final: 68 €'],
    starter: `const importCompra = 80;
const esSoci = true;

let descompte = 0;

// 1. Decideix el descompte segons l'import

// 2. Suma-hi 5 punts si és soci

// 3. Calcula el preu final i mostra les dues línies
`,
    hint: [
      "Són dues decisions independents: primer l'import (amb `if` i `else if`) i després, en un `if` separat, si és soci.",
      "Per sumar 5 al descompte que ja hi hagi, fes servir `descompte += 5`. El preu final és l'import menys `importCompra * descompte / 100`.",
    ],
    solution: `const importCompra = 80;
const esSoci = true;

let descompte = 0;

// 1. Decideix el descompte segons l'import
if (importCompra >= 100) {
  descompte = 15;
} else if (importCompra >= 50) {
  descompte = 10;
}

// 2. Suma-hi 5 punts si és soci
if (esSoci) {
  descompte += 5;
}

// 3. Calcula el preu final i mostra les dues línies
const preuFinal = importCompra - importCompra * descompte / 100;

console.log(\`Descompte: \${descompte}%\`);
console.log(\`Preu final: \${preuFinal} €\`);`,
    explanation: [
      "La decisió sobre l'import i la decisió sobre si és soci no depenen l'una de l'altra, i per això van en dos condicionals **separats**, no encadenats amb `else`. Si el segon fos un `else if`, un soci amb una compra de 80 € es quedaria sense els seus 5 punts.",
      "El primer condicional no té `else` final: si l'import és inferior a 50, `descompte` conserva el valor inicial, `0`.",
    ],
  },

  summary: [
    "Una comparació (`>`, `<`, `>=`, `<=`, `===`, `!==`) dona sempre un booleà.",
    "Fes servir sempre `===` i `!==`: comparen valor i tipus, sense conversions amagades.",
    "`if` executa un bloc si la condició és certa; `else` cobreix el cas contrari; `else if` afegeix més camins.",
    "Les condicions encadenades es comproven en ordre i només s'executa la primera que es compleix.",
    "`&&` exigeix que es compleixin les dues condicions, `||` en demana almenys una i `!` inverteix el resultat.",
    "El ternari `condicio ? a : b` és una drecera per triar entre dos valors.",
  ],

  quiz: [
    {
      question: "Què mostra aquesta instrucció?",
      code: `console.log("5" === 5);`,
      options: [
        { text: '`false`', correct: true },
        { text: '`true`', why: "Seria `true` amb `==`, que converteix els tipus. `===` no en converteix cap." },
        { text: '`"5"`', why: "Una comparació sempre dona un booleà, mai un dels valors comparats." },
        { text: 'Un error', why: "Comparar valors de tipus diferents és vàlid: senzillament dona `false`." },
      ],
      explanation: "`===` compara el valor i el tipus. Un string i un number mai són estrictament iguals.",
    },
    {
      question: "Si `nota` val 8, què mostra aquest codi?",
      code: `if (nota >= 5) {
  console.log("Aprovat");
} else if (nota >= 7) {
  console.log("Notable");
} else {
  console.log("Suspès");
}`,
      options: [
        { text: 'Aprovat', correct: true },
        { text: 'Notable', why: "La condició `nota >= 7` és certa, però no s'arriba a comprovar: la primera ja s'ha complert." },
        { text: 'Aprovat i Notable', why: "En una cadena d'`if` i `else if` només s'executa un bloc: el primer que es compleix." },
        { text: 'Res', why: "8 és més gran o igual que 5, de manera que la primera condició es compleix." },
      ],
      explanation: "Les condicions es comproven de dalt a baix i s'executa només la primera certa. Aquí estan mal ordenades: la més restrictiva hauria d'anar primer.",
    },
    {
      question: "Què mostra aquest codi?",
      code: `const edat = 20;
const teCarnet = false;

console.log(edat >= 18 && teCarnet);`,
      options: [
        { text: '`false`', correct: true },
        { text: '`true`', why: "Amb `&&` s'han de complir les dues condicions, i `teCarnet` és `false`." },
        { text: '`20`', why: "L'expressió combina dos booleans; el resultat no és l'edat." },
        { text: 'Un error, perquè `teCarnet` no és una comparació', why: "Un booleà es pot fer servir directament en una condició: no cal comparar-lo amb res." },
      ],
      explanation: "`edat >= 18` és `true`, però `&&` només dona `true` si els dos costats ho són.",
    },
    {
      question: "Aquest codi mostra «Matrícula!» encara que la nota sigui un 4. Per què?",
      code: `let nota = 4;

if (nota = 10) {
  console.log("Matrícula!");
}`,
      options: [
        { text: "Perquè `=` assigna 10 a `nota` en lloc de comparar, i la condició es dona per certa.", correct: true },
        { text: "Perquè hi falta un `else`.", why: "L'`else` és opcional i no canvia quan es compleix la condició." },
        { text: "Perquè el 10 hauria d'anar entre cometes.", why: "Entre cometes seria un text. El problema no és el valor, sinó l'operador." },
        { text: "Perquè un `if` sense `else if` s'executa sempre.", why: "Un `if` només s'executa quan la seva condició és certa." },
      ],
      explanation: "Per comparar s'ha d'escriure `===`. Amb un sol `=` es fa una assignació, que no dona cap error però canvia la variable i fa que la condició sigui certa.",
    },
    {
      question: "Si `completada` val `false`, quin valor es guarda a `estat`?",
      code: `const estat = completada ? "Feta" : "Pendent";`,
      options: [
        { text: '`"Pendent"`', correct: true },
        { text: '`"Feta"`', why: "El primer valor, el de després del `?`, es tria quan la condició és certa." },
        { text: '`false`', why: "El ternari no retorna la condició, sinó un dels dos valors que hi ha després." },
        { text: '`undefined`', why: "El ternari sempre dona un dels seus dos valors." },
      ],
      explanation: "`condicio ? a : b` dona `a` si la condició és certa i `b` si és falsa.",
    },
  ],
};
