// Exercicis extra del tema 3: comparacions, if / else if / else i operadors lògics.

export default [
  {
    id: 'positiu-negatiu',
    level: 1,
    title: 'Positiu, negatiu o zero',
    statement: "Mostra `Positiu`, `Negatiu` o `Zero` segons el valor d'un nombre.",
    data: ['numero = -4'],
    expectedOutput: ['Negatiu'],
    hint: "Hi ha tres casos: necessites `if`, `else if` i `else`. L'últim no ha de preguntar res: si no és més gran ni més petit que zero, només pot ser zero.",
    solution: `const numero = -4;

if (numero > 0) {
  console.log("Positiu");
} else if (numero < 0) {
  console.log("Negatiu");
} else {
  console.log("Zero");
}`,
    explanation: "Les condicions es comproven en ordre i només s'executa la primera que es compleix. Prova-ho amb un 9 i amb un 0 per recórrer els tres camins.",
  },
  {
    id: 'el-mes-gran',
    level: 1,
    title: 'El més gran de tres',
    statement: "Tres amics comparen quants punts han fet en un joc. Mostra quina és la puntuació més alta.",
    data: ['anna = 12', 'bru = 45', 'carla = 30'],
    expectedOutput: ['La puntuació més alta és 45'],
    hint: "Un nombre és el més gran de tres si és més gran o igual que cadascun dels altres dos. Són dues comparacions unides per `&&`.",
    solution: `const anna = 12;
const bru = 45;
const carla = 30;

let maxima = carla;

if (anna >= bru && anna >= carla) {
  maxima = anna;
} else if (bru >= carla) {
  maxima = bru;
}

console.log(\`La puntuació més alta és \${maxima}\`);`,
    explanation: "Si l'Anna no és la més alta, la més alta ha de ser en Bru o la Carla, i per això al segon bloc n'hi ha prou amb comparar-los entre ells. Quan no es compleix cap de les dues condicions, `maxima` conserva el valor inicial: el de la Carla.",
  },
  {
    id: 'any-de-traspas',
    level: 2,
    title: 'Any de traspàs',
    statement: [
      "Un any és de traspàs si és divisible per 4. Però hi ha una excepció: els que són divisibles per 100 **no** ho són, tret que també siguin divisibles per 400.",
      "Mostra `És de traspàs` o `No és de traspàs`. Quan et funcioni amb el 1900, prova-ho amb el 2000 i el 2024, que sí que ho són.",
    ],
    data: ['any = 1900'],
    expectedOutput: ['No és de traspàs'],
    hint: "Hi ha dues maneres de ser de traspàs, unides per un «o»: ser divisible per 400, o bé ser divisible per 4 **i no** ser-ho per 100. Un nombre és divisible per un altre quan el residu (`%`) és zero.",
    solution: `const any = 1900;

if (any % 400 === 0 || (any % 4 === 0 && any % 100 !== 0)) {
  console.log("És de traspàs");
} else {
  console.log("No és de traspàs");
}`,
    explanation: "El 1900 és divisible per 4, però també per 100 i no per 400: no és de traspàs. El 2000 ho és perquè és divisible per 400. Els parèntesis no són obligatoris aquí, perquè `&&` es calcula abans que `||`, però fan que la condició es llegeixi com la frase de l'enunciat.",
  },
  {
    id: 'preu-entrada',
    level: 2,
    title: "El preu de l'entrada",
    statement: [
      "Un museu cobra segons l'edat: fins a 3 anys és gratuït; de 4 a 12, 5 €; de 13 a 64, 9 €; i a partir de 65, 6 €.",
      "Els dimecres hi ha 2 € de descompte per a tothom que pagui entrada. Calcula el preu final.",
    ],
    data: ['edat = 70', 'esDimecres = true'],
    expectedOutput: ['Preu: 4 €'],
    hint: [
      "Són dues decisions separades. Primer decideix el preu segons l'edat, amb una cadena de `if` i `else if`.",
      "Després, en un `if` a part, aplica el descompte. Vigila que qui entra gratis no acabi amb un preu negatiu.",
    ],
    solution: `const edat = 70;
const esDimecres = true;

let preu = 0;

if (edat <= 3) {
  preu = 0;
} else if (edat <= 12) {
  preu = 5;
} else if (edat <= 64) {
  preu = 9;
} else {
  preu = 6;
}

if (esDimecres && preu > 0) {
  preu -= 2;
}

console.log(\`Preu: \${preu} €\`);`,
    explanation: "El preu per edat i el descompte del dimecres no depenen l'un de l'altre, i per això van en dos condicionals separats. La condició `preu > 0` evita que un nadó acabi «cobrant» 2 €: prova-ho amb `edat = 2`.",
  },
  {
    id: 'pedra-paper-tisores',
    level: 3,
    title: 'Pedra, paper, tisores',
    statement: [
      "Dues persones juguen a pedra, paper, tisores. La pedra guanya les tisores, les tisores guanyen el paper i el paper guanya la pedra.",
      "Mostra `Empat`, `Guanya A` o `Guanya B`. Comprova-ho amb totes les combinacions que puguis.",
    ],
    data: ['jugadorA = "tisores"', 'jugadorB = "pedra"'],
    expectedOutput: ['Guanya B'],
    hint: [
      "Comença pel cas més fàcil: si tots dos han triat el mateix, hi ha empat.",
      "Després escriu les tres combinacions en què guanya A, unides amb `||`. Si no és empat i no guanya A, no cal preguntar res més.",
    ],
    solution: `const jugadorA = "tisores";
const jugadorB = "pedra";

if (jugadorA === jugadorB) {
  console.log("Empat");
} else if (
  (jugadorA === "pedra" && jugadorB === "tisores") ||
  (jugadorA === "tisores" && jugadorB === "paper") ||
  (jugadorA === "paper" && jugadorB === "pedra")
) {
  console.log("Guanya A");
} else {
  console.log("Guanya B");
}`,
    explanation: "Hi ha nou combinacions possibles, però només cal escriure'n tres: les que fan guanyar A. L'empat es resol amb una sola comparació, i tot el que queda és que guanya B. Triar bé l'ordre de les preguntes estalvia la meitat de la feina.",
  },
];
