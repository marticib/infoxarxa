// Exercicis extra del tema 4: for, while, comptadors, acumuladors i recorreguts.

export default [
  {
    id: 'taula-del-7',
    level: 1,
    title: 'La taula del 7',
    statement: "Mostra la taula de multiplicar del 7, de l'1 al 10, amb el format de l'exemple.",
    expectedOutput: [
      '7 x 1 = 7',
      '7 x 2 = 14',
      '7 x 3 = 21',
      '7 x 4 = 28',
      '7 x 5 = 35',
      '7 x 6 = 42',
      '7 x 7 = 49',
      '7 x 8 = 56',
      '7 x 9 = 63',
      '7 x 10 = 70',
    ],
    hint: "Un bucle `for` amb un comptador que vagi de l'1 al 10. A cada volta, mostra una línia amb un template literal on aparegui el comptador i el resultat de multiplicar-lo per 7.",
    solution: `const taula = 7;

for (let i = 1; i <= 10; i++) {
  console.log(\`\${taula} x \${i} = \${taula * i}\`);
}`,
    explanation: "El bucle fa deu voltes i l'única cosa que canvia de l'una a l'altra és `i`. Com que el 7 és en una constant, per obtenir la taula del 9 només cal canviar una línia.",
  },
  {
    id: 'multiples-de-3',
    level: 2,
    title: 'Compta els múltiples de 3',
    statement: "Compta quants múltiples de 3 hi ha entre l'1 i el 50, tots dos inclosos, i mostra el resultat en una frase.",
    expectedOutput: ['Hi ha 16 múltiples de 3'],
    hint: "Necessites un comptador declarat **abans** del bucle. Dins del bucle, suma-hi 1 només quan el residu de dividir per 3 sigui zero.",
    solution: `let quantitat = 0;

for (let i = 1; i <= 50; i++) {
  if (i % 3 === 0) {
    quantitat++;
  }
}

console.log(\`Hi ha \${quantitat} múltiples de 3\`);`,
    explanation: "És el patró del comptador: una variable que comença a zero, un bucle que ho revisa tot i una condició que decideix quan sumar. El `console.log` va fora del bucle, perquè volem el resultat final i no un missatge a cada volta.",
  },
  {
    id: 'nota-mes-alta',
    level: 2,
    title: 'La nota més alta',
    statement: "Troba la nota més alta d'una llista i mostra-la. El programa ha de continuar funcionant si la llista canvia.",
    data: ['notes = [6, 9, 4, 8]'],
    expectedOutput: ['La nota més alta és 9'],
    hint: "Guarda en una variable la nota més alta que has vist fins ara. Recorre la llista i, cada vegada que en trobis una de més alta, substitueix-la.",
    solution: `const notes = [6, 9, 4, 8];

let maxima = notes[0];

for (const nota of notes) {
  if (nota > maxima) {
    maxima = nota;
  }
}

console.log(\`La nota més alta és \${maxima}\`);`,
    explanation: "La variable `maxima` comença amb la primera nota i no amb un zero: així el programa també funcionaria amb una llista de nombres negatius. A cada volta es compara la nota actual amb la millor que s'ha vist.",
  },
  {
    id: 'estalvis',
    level: 2,
    title: 'Quants mesos falten?',
    statement: "Vols comprar uns auriculars que costen 200 €. Cada mes estalvies 35 €. Calcula quants mesos necessites per arribar-hi i quants diners tindràs aleshores.",
    data: ['preu = 200', 'estalviMensual = 35'],
    expectedOutput: ['Mesos necessaris: 6', 'Tindràs 210 €'],
    hint: "No saps d'entrada quantes voltes calen: és un cas per a `while`. El bucle ha de continuar **mentre** els estalvis siguin inferiors al preu.",
    solution: `const preu = 200;
const estalviMensual = 35;

let estalvis = 0;
let mesos = 0;

while (estalvis < preu) {
  estalvis += estalviMensual;
  mesos++;
}

console.log(\`Mesos necessaris: \${mesos}\`);
console.log(\`Tindràs \${estalvis} €\`);`,
    explanation: "Amb `for` se sap quantes voltes es faran; amb `while`, quina condició les atura. Dins del bucle canvia `estalvis`, que és el que la condició comprova: si no canviés, el bucle no s'acabaria mai.",
  },
  {
    id: 'fizz-buzz',
    level: 3,
    title: 'Fizz, Buzz',
    statement: [
      "Mostra els nombres de l'1 al 15, un a cada línia, amb tres excepcions: en lloc dels múltiples de 3, mostra `Fizz`; en lloc dels múltiples de 5, `Buzz`; i en lloc dels que ho són de tots dos, `FizzBuzz`.",
      "És un dels exercicis més coneguts de la programació: es fa servir sovint en entrevistes de feina.",
    ],
    expectedOutput: ['1', '2', 'Fizz', '4', 'Buzz', 'Fizz', '7', '8', 'Fizz', 'Buzz', '11', 'Fizz', '13', '14', 'FizzBuzz'],
    hint: "L'ordre de les condicions és la clau. El 15 és múltiple de 3 i de 5: si preguntes primer pel 3, entrarà allà i no arribarà mai al cas de tots dos.",
    solution: `for (let i = 1; i <= 15; i++) {
  if (i % 3 === 0 && i % 5 === 0) {
    console.log("FizzBuzz");
  } else if (i % 3 === 0) {
    console.log("Fizz");
  } else if (i % 5 === 0) {
    console.log("Buzz");
  } else {
    console.log(i);
  }
}`,
    explanation: "En una cadena de `else if` només s'executa la primera condició que es compleix. Per això el cas més específic (múltiple de tots dos) ha d'anar primer: si anés al final, el 15 ja hauria entrat pel cas del 3.",
  },
];
