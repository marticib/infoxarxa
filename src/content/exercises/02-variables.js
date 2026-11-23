// Exercicis extra del tema 2: variables, tipus, operadors i conversions.

export default [
  {
    id: 'any-que-ve',
    level: 1,
    title: "L'any que ve",
    statement: "Guarda una edat en una constant i mostra dues frases: l'edat actual i la que es tindrà l'any que ve. La segona s'ha de calcular a partir de la primera.",
    data: ['edat = 17'],
    expectedOutput: ['Ara tinc 17 anys', "L'any que ve en tindré 18"],
    hint: "Dins d'un template literal pots posar una operació sencera entre `${` i `}`, no només el nom d'una variable.",
    solution: `const edat = 17;

console.log(\`Ara tinc \${edat} anys\`);
console.log(\`L'any que ve en tindré \${edat + 1}\`);`,
    explanation: "`edat + 1` es calcula i el resultat s'insereix al text. La constant no canvia: continua valent 17. Si demà canvies el 17 per un 20, les dues frases s'actualitzen soles.",
  },
  {
    id: 'area-i-perimetre',
    level: 1,
    title: 'Àrea i perímetre',
    statement: "Calcula l'àrea i el perímetre d'un rectangle a partir de la base i l'altura.",
    data: ['base = 8', 'altura = 5'],
    expectedOutput: ['Àrea: 40', 'Perímetre: 26'],
    hint: "L'àrea és base per altura. El perímetre, dues vegades la base més dues vegades l'altura.",
    solution: `const base = 8;
const altura = 5;

const area = base * altura;
const perimetre = 2 * base + 2 * altura;

console.log(\`Àrea: \${area}\`);
console.log(\`Perímetre: \${perimetre}\`);`,
    explanation: "Guardar cada resultat en una constant amb nom fa que el programa es llegeixi sol. La multiplicació es fa abans que la suma, com a matemàtiques, i per això no calen parèntesis al perímetre.",
  },
  {
    id: 'intercanvi',
    level: 2,
    title: 'Intercanvia les begudes',
    statement: "El cambrer s'ha equivocat: a la taula 1 hi ha el te i a la taula 2, el cafè, i havia de ser al revés. Intercanvia els valors de les dues variables **sense tornar a escriure els textos** i mostra com queden.",
    data: ['taula1 = "te"', 'taula2 = "cafè"'],
    expectedOutput: ['Taula 1: cafè', 'Taula 2: te'],
    starter: `let taula1 = "te";
let taula2 = "cafè";

// Intercanvia els valors aquí

console.log(\`Taula 1: \${taula1}\`);
console.log(\`Taula 2: \${taula2}\`);`,
    hint: "Si fas `taula1 = taula2`, el valor antic de `taula1` es perd. Abans de trepitjar-lo, guarda'l en una tercera variable.",
    solution: `let taula1 = "te";
let taula2 = "cafè";

const safata = taula1;
taula1 = taula2;
taula2 = safata;

console.log(\`Taula 1: \${taula1}\`);
console.log(\`Taula 2: \${taula2}\`);`,
    explanation: "Una variable només pot guardar un valor: quan n'hi assignes un de nou, l'anterior desapareix. La variable `safata` aguanta el te mentre el cafè canvia de taula, igual que faria el cambrer.",
  },
  {
    id: 'suma-que-no-suma',
    level: 2,
    title: 'La suma que no suma',
    statement: "Dos valors arriben d'un formulari, i per això són textos. Mostra primer què passa si els «sumes» directament, i després la suma de veritat.",
    data: ['primer = "12"', 'segon = "30"'],
    expectedOutput: ['1230', '42'],
    hint: "Amb dos textos, l'operador `+` els enganxa. Per sumar-los com a nombres, converteix-los abans amb `Number()`.",
    solution: `const primer = "12";
const segon = "30";

console.log(primer + segon);
console.log(Number(primer) + Number(segon));`,
    explanation: "L'operador `+` fa dues feines diferents: suma nombres i uneix textos. Si un dels dos valors és un text, tria unir. És un dels errors més habituals amb formularis, i no dona cap missatge: simplement, el resultat és un altre.",
  },
  {
    id: 'repartir-pizzes',
    level: 3,
    title: 'Repartim les pizzes',
    statement: "Hi ha 3 pizzes de 8 porcions cadascuna per repartir entre 5 persones. Tothom n'ha de rebre el mateix nombre de porcions senceres. Calcula quantes en toquen a cadascú i quantes en sobren.",
    data: ['pizzes = 3', 'porcionsPerPizza = 8', 'persones = 5'],
    expectedOutput: ['Porcions per persona: 4', 'Sobren: 4'],
    hint: [
      "El que sobra és el residu de la divisió, i es calcula amb l'operador `%`.",
      "Per saber quantes en toquen a cadascú, resta primer les que sobren del total: el que queda sí que es pot dividir sense decimals.",
    ],
    solution: `const pizzes = 3;
const porcionsPerPizza = 8;
const persones = 5;

const total = pizzes * porcionsPerPizza;
const sobren = total % persones;
const perPersona = (total - sobren) / persones;

console.log(\`Porcions per persona: \${perPersona}\`);
console.log(\`Sobren: \${sobren}\`);`,
    explanation: "`24 / 5` dona 4.8, que no ens serveix: no es reparteixen vuit dècimes de porció. L'operador `%` ens diu quantes en sobren (4), i en treure-les del total queden 20, que sí que es reparteixen exactament.",
  },
];
