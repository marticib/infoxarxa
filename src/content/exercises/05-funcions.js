// Exercicis extra del tema 5: declarar funcions, paràmetres i return.

export default [
  {
    id: 'crear-salutacio',
    level: 1,
    title: 'Una salutació a mida',
    statement: "Escriu una funció `saludar` que rebi un nom i **retorni** el text «Hola, *nom*!». Les dues crides del final ja estan escrites: no les modifiquis.",
    expectedOutput: ['Hola, Biel!', 'Hola, Noa!'],
    starter: `// Escriu aquí la funció saludar


console.log(saludar("Biel"));
console.log(saludar("Noa"));`,
    hint: "La funció té un paràmetre i una sola instrucció: un `return` amb un template literal.",
    solution: `function saludar(nom) {
  return \`Hola, \${nom}!\`;
}

console.log(saludar("Biel"));
console.log(saludar("Noa"));`,
    explanation: "La funció no mostra res: construeix el text i el retorna. Qui la crida decideix què fer-ne. Aquí el passem a `console.log`, però el podríem posar en un element de la pàgina sense canviar la funció.",
  },
  {
    id: 'area-rectangle',
    level: 1,
    title: "L'àrea de qualsevol rectangle",
    statement: "Escriu una funció `calcularArea` que rebi la base i l'altura d'un rectangle i en retorni l'àrea.",
    expectedOutput: ['15', '40'],
    starter: `// Escriu aquí la funció calcularArea


console.log(calcularArea(3, 5));
console.log(calcularArea(8, 5));`,
    hint: "Dos paràmetres, separats per una coma. L'ordre en què els declares és l'ordre en què rebran els valors de la crida.",
    solution: `function calcularArea(base, altura) {
  return base * altura;
}

console.log(calcularArea(3, 5));
console.log(calcularArea(8, 5));`,
    explanation: "A la primera crida, `base` val 3 i `altura` val 5; a la segona, 8 i 5. La mateixa funció serveix per a tots els rectangles: només canvien els arguments.",
  },
  {
    id: 'el-maxim',
    level: 2,
    title: 'El més gran de dos',
    statement: "Escriu una funció `obtenirMaxim` que rebi dos nombres i retorni el més gran. Si són iguals, pot retornar qualsevol dels dos.",
    expectedOutput: ['9', '7', '5'],
    starter: `// Escriu aquí la funció obtenirMaxim


console.log(obtenirMaxim(4, 9));
console.log(obtenirMaxim(7, 2));
console.log(obtenirMaxim(5, 5));`,
    hint: "Un `if` que compari els dos paràmetres, amb un `return` a cada camí.",
    solution: `function obtenirMaxim(a, b) {
  if (a > b) {
    return a;
  }
  return b;
}

console.log(obtenirMaxim(4, 9));
console.log(obtenirMaxim(7, 2));
console.log(obtenirMaxim(5, 5));`,
    explanation: "Un `return` acaba la funció immediatament. Si `a` és més gran, la funció surt pel primer `return` i no arriba mai al segon: per això no cal cap `else`.",
  },
  {
    id: 'qualificacio',
    level: 2,
    title: 'De la nota a la qualificació',
    statement: "Escriu una funció `obtenirQualificacio` que rebi una nota i retorni el text que li correspon: `Suspès` per sota de 5, `Aprovat` de 5 fins a menys de 7, `Notable` de 7 fins a menys de 9 i `Excel·lent` a partir de 9.",
    expectedOutput: ['Suspès', 'Aprovat', 'Notable', 'Excel·lent'],
    starter: `// Escriu aquí la funció obtenirQualificacio


console.log(obtenirQualificacio(3));
console.log(obtenirQualificacio(5.5));
console.log(obtenirQualificacio(7));
console.log(obtenirQualificacio(9.5));`,
    hint: "Comprova els casos de menor a major. Com que cada `return` surt de la funció, a cada pas ja saps que la nota no és inferior al límit anterior.",
    solution: `function obtenirQualificacio(nota) {
  if (nota < 5) {
    return "Suspès";
  }
  if (nota < 7) {
    return "Aprovat";
  }
  if (nota < 9) {
    return "Notable";
  }
  return "Excel·lent";
}

console.log(obtenirQualificacio(3));
console.log(obtenirQualificacio(5.5));
console.log(obtenirQualificacio(7));
console.log(obtenirQualificacio(9.5));`,
    explanation: "Quan s'arriba al segon `if`, la nota segur que és 5 o més: si no, la funció ja hauria retornat «Suspès». Aquesta manera d'escriure-ho, amb un `return` a cada cas, estalvia tots els `else`.",
  },
  {
    id: 'informe-alumne',
    level: 3,
    title: "L'informe d'una alumna",
    statement: [
      "Escriu dues funcions. `calcularMitjana` rep una llista de notes i en retorna la mitjana. `crearInforme` rep un nom i una llista de notes i retorna una frase com la de l'exemple: el nom, la mitjana i si aprova o no.",
      "**`crearInforme` ha de fer servir `calcularMitjana`**: no hi tornis a escriure el bucle.",
    ],
    expectedOutput: ['Júlia: 8 (aprova)', 'Marc: 4.5 (no aprova)'],
    starter: `// Escriu aquí les funcions calcularMitjana i crearInforme


console.log(crearInforme("Júlia", [8, 6, 10]));
console.log(crearInforme("Marc", [3, 6]));`,
    hint: [
      "`calcularMitjana` necessita un acumulador i un bucle `for...of`. La mitjana és la suma dividida per `notes.length`.",
      "Dins de `crearInforme`, guarda el resultat de `calcularMitjana(notes)` en una constant. Després decideix el text final amb un `if`.",
    ],
    solution: `function calcularMitjana(notes) {
  let suma = 0;
  for (const nota of notes) {
    suma += nota;
  }
  return suma / notes.length;
}

function crearInforme(nom, notes) {
  const mitjana = calcularMitjana(notes);

  let resultat = "no aprova";
  if (mitjana >= 5) {
    resultat = "aprova";
  }

  return \`\${nom}: \${mitjana} (\${resultat})\`;
}

console.log(crearInforme("Júlia", [8, 6, 10]));
console.log(crearInforme("Marc", [3, 6]));`,
    explanation: "Una funció en pot cridar una altra, i fer servir el que retorna. `crearInforme` no sap com es calcula una mitjana, ni li cal: només sap a qui demanar-la. Si demà la mitjana s'hagués de calcular d'una altra manera, només canviaria una funció.",
  },
];
