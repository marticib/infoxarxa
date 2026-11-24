// Exercicis extra del tema 1. Només fan servir el que s'explica a la unitat:
// console.log, l'ordre de les instruccions, els errors i el primer botó.

export default [
  {
    id: 'targeta-presentacio',
    level: 1,
    title: 'La targeta de presentació',
    statement: "Escriu un programa que mostri aquestes tres línies a la consola, exactament en aquest ordre.",
    expectedOutput: ['Nom: Ada Lovelace', 'Professió: programadora', 'Any: 1843'],
    hint: "Una instrucció `console.log()` per a cada línia. Tot el que hi ha entre les cometes es mostra tal qual, també els dos punts i els espais.",
    solution: `console.log("Nom: Ada Lovelace");
console.log("Professió: programadora");
console.log("Any: 1843");`,
    explanation: "Cada `console.log()` escriu una línia. A la tercera, `1843` forma part del text perquè és dins de les cometes: JavaScript no el tracta com un nombre.",
  },
  {
    id: 'text-o-calcul',
    level: 1,
    title: 'Text o càlcul?',
    statement: "Mostra dues línies. La primera ha de ser el text `10 + 5`, tal com està escrit. La segona, el resultat de fer aquesta operació.",
    expectedOutput: ['10 + 5', '15'],
    hint: "L'única diferència entre les dues instruccions són les cometes. Amb cometes és un text; sense, JavaScript fa el càlcul.",
    solution: `console.log("10 + 5");
console.log(10 + 5);`,
    explanation: "Les cometes diuen a JavaScript «això és un text, no el toquis». Sense cometes, `10 + 5` és una operació: es calcula primer i després es mostra el resultat.",
  },
  {
    id: 'recepta-desordenada',
    level: 2,
    title: 'La recepta desordenada',
    statement: "Aquest programa mostra els passos d'una recepta, però algú n'ha barrejat les línies. Posa-les en ordre sense reescriure-les: només has de moure-les.",
    expectedOutput: ['1. Escalfa la paella', '2. Bat els ous', '3. Aboca els ous a la paella', '4. Serveix la truita'],
    starter: `console.log("3. Aboca els ous a la paella");
console.log("1. Escalfa la paella");
console.log("4. Serveix la truita");
console.log("2. Bat els ous");`,
    hint: "El navegador executa les instruccions de dalt a baix. El número de cada pas és només text: no canvia l'ordre en què s'executa.",
    solution: `console.log("1. Escalfa la paella");
console.log("2. Bat els ous");
console.log("3. Aboca els ous a la paella");
console.log("4. Serveix la truita");`,
    explanation: "L'ordre d'execució és l'ordre de les línies al fitxer. Que un text comenci per «1.» no vol dir res per a JavaScript: per ell és un text com qualsevol altre.",
  },
  {
    id: 'tres-errors',
    level: 2,
    title: 'Caça els tres errors',
    statement: [
      "Aquest programa hauria de mostrar quatre línies, però té **tres errors**. Executa'l, llegeix el missatge de la consola, arregla el que diu i torna a executar.",
      "La consola només t'ensenya un error cada vegada: n'hauràs de corregir un per descobrir el següent.",
    ],
    expectedOutput: ['Carregant vídeos...', 'Vídeos carregats:', '8', 'Fet!'],
    starter: `console.log("Carregant vídeos...");
console.log("Vídeos carregats:');
console.lgo(8);
Console.log("Fet!");`,
    hint: "A la línia 2, mira amb quina cometa comença el text i amb quina acaba. A la 3, llegeix el nom de la instrucció lletra a lletra. A la 4, recorda que JavaScript distingeix majúscules de minúscules.",
    solution: `console.log("Carregant vídeos...");
console.log("Vídeos carregats:");
console.log(8);
console.log("Fet!");`,
    explanation: "El primer error és de sintaxi (un text que comença amb `\"` i acaba amb `'`) i impedeix que s'executi res. Un cop arreglat, el programa arrenca i s'atura a la línia 3, perquè `console.lgo` no existeix. I la línia 4 falla perquè `Console`, amb majúscula, és un nom diferent de `console`.",
  },
  {
    id: 'dos-botons',
    level: 3,
    title: 'Dos botons, dos missatges',
    statement: [
      "A la pàgina hi ha dos botons. El primer ja funciona: en prémer-lo, el paràgraf diu «Hola!». Fes que el segon botó hi escrigui «Fins aviat!».",
      "Fixa't en com està fet el primer i escriu el mateix per al segon: una funció i la línia que la connecta amb el botó.",
    ],
    expected: "En prémer «Saluda», el paràgraf diu «Hola!». En prémer «Acomiada't», diu «Fins aviat!».",
    html: `<button id="boto-hola">Saluda</button>
<button id="boto-adeu">Acomiada't</button>
<p id="missatge"></p>`,
    css: `button { padding: 8px 14px; }`,
    starter: `function saludar() {
  document.querySelector("#missatge").textContent = "Hola!";
}

document.querySelector("#boto-hola").addEventListener("click", saludar);

// Escriu aquí la funció del segon botó i connecta-la
`,
    hint: "Necessites una funció nova, per exemple `acomiadar`, amb la mateixa instrucció però un altre text. I una línia com l'última, canviant l'`id` del botó i el nom de la funció.",
    solution: `function saludar() {
  document.querySelector("#missatge").textContent = "Hola!";
}

document.querySelector("#boto-hola").addEventListener("click", saludar);

function acomiadar() {
  document.querySelector("#missatge").textContent = "Fins aviat!";
}

document.querySelector("#boto-adeu").addEventListener("click", acomiadar);`,
    explanation: "Cada botó té la seva funció, i cap de les dues s'executa en carregar la pàgina: esperen el clic. Els dos botons escriuen al mateix paràgraf, i per això l'últim que es prem és el que es veu.",
  },
];
