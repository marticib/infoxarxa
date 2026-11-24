// Exercicis extra del tema 10: trobar i corregir errors de sintaxi,
// d'execució i de lògica.

export default [
  {
    id: 'parentesis-i-claus',
    level: 1,
    title: "Caça d'errors: parèntesis i claus",
    statement: "Aquest programa hauria de mostrar tres línies, però no arriba ni a començar. Té **tres errors de sintaxi**, tots de parèntesis o claus que falten o que sobren. Troba'ls amb l'ajuda de la consola.",
    expectedOutput: ['Llibreta: 3 €', 'Bolígraf: 1 €', 'Total: 4 €'],
    starter: `function mostrarPreu(producte, preu {
  console.log(\`\${producte}: \${preu} €\`);
}

mostrarPreu("Llibreta", 3);
mostrarPreu("Bolígraf", 1;
console.log("Total: 4 €");
}`,
    hint: "Amb els errors de sintaxi, la línia que indica la consola és on el navegador **s'ha adonat** del problema, que pot ser una mica després d'on és de veritat. Compta que cada parèntesi i cada clau que s'obre tingui la seva parella.",
    solution: `function mostrarPreu(producte, preu) {
  console.log(\`\${producte}: \${preu} €\`);
}

mostrarPreu("Llibreta", 3);
mostrarPreu("Bolígraf", 1);
console.log("Total: 4 €");`,
    explanation: "Faltava el parèntesi que tanca els paràmetres a la línia 1 i el de la crida de la línia 6, i sobrava la clau de l'última línia. Mentre hi hagi un sol error de sintaxi, el navegador no executa res: per això no es veia ni la primera línia.",
  },
  {
    id: 'noms-mal-escrits',
    level: 1,
    title: "Caça d'errors: els noms",
    statement: "El programa calcula el total d'una compra i diu quants productes hi ha. Té **dos noms mal escrits**. El primer atura el programa amb un error. El segon no dona cap error, però fa que el resultat sigui incorrecte.",
    expectedOutput: ['Total: 36 €', 'Productes: 2'],
    starter: `const preuUnitari = 12;
const quantitat = 3;
const productes = ["llapis", "goma"];

const total = preuunitari * quantitat;

console.log(\`Total: \${total} €\`);
console.log(\`Productes: \${productes.lenght}\`);`,
    hint: "El primer te'l diu la consola: llegeix el nom que apareix al missatge i compara'l, lletra a lletra, amb el de la declaració. Per al segon, mira què es mostra a la segona línia quan el primer ja està arreglat.",
    solution: `const preuUnitari = 12;
const quantitat = 3;
const productes = ["llapis", "goma"];

const total = preuUnitari * quantitat;

console.log(\`Total: \${total} €\`);
console.log(\`Productes: \${productes.length}\`);`,
    explanation: "Una variable que no existeix provoca un `ReferenceError`, i la consola t'hi porta directament. Una **propietat** que no existeix, en canvi, no dona cap error: val `undefined`. Per això `lenght` és un dels errors més difícils de veure: el programa funciona, però mostra «undefined».",
  },
  {
    id: 'condicions-enganyoses',
    level: 2,
    title: "Caça d'errors: les condicions",
    statement: "La persona té 18 anys i no té carnet. El programa hauria de dir que és major d'edat i que no pot conduir, però diu just el contrari en tots dos casos. No hi ha cap missatge d'error: hi ha **dos errors de lògica**, un a cada condició.",
    expectedOutput: ["És major d'edat", 'No pot conduir'],
    starter: `const edat = 18;
let teCarnet = false;

if (edat > 18) {
  console.log("És major d'edat");
} else {
  console.log("És menor d'edat");
}

if (teCarnet = true) {
  console.log("Pot conduir");
} else {
  console.log("No pot conduir");
}`,
    hint: [
      "A la primera condició, pregunta't què passa exactament amb el valor 18. Es compleix `18 > 18`?",
      "A la segona, compta els signes d'igual. Un de sol no compara: assigna.",
    ],
    solution: `const edat = 18;
let teCarnet = false;

if (edat >= 18) {
  console.log("És major d'edat");
} else {
  console.log("És menor d'edat");
}

if (teCarnet === true) {
  console.log("Pot conduir");
} else {
  console.log("No pot conduir");
}`,
    explanation: [
      "El primer és un error de frontera: amb `>`, els 18 anys justos queden fora. Aquests errors només es veuen provant el valor exacte del límit.",
      "El segon és més traïdor: `teCarnet = true` no pregunta res, **guarda** `true` a la variable, i l'`if` es troba un valor cert. Si la variable s'hagués declarat amb `const`, el navegador hauria avisat amb un error: és un bon motiu per fer servir `const` sempre que es pugui. I com que `teCarnet` ja és un booleà, la condició es pot escriure simplement `if (teCarnet)`.",
    ],
  },
  {
    id: 'el-bucle-curt',
    level: 2,
    title: "Caça d'errors: el bucle",
    statement: "El programa hauria de calcular la mitjana de les tres notes, que és 7. Té **dos errors**, tots dos relacionats amb el bucle. Un atura el programa; l'altre, quan hagis arreglat el primer, fa que la mitjana surti malament.",
    expectedOutput: ['Mitjana: 7'],
    starter: `const notes = [6, 8, 7];

for (let i = 0; i < notes.length - 1; i++) {
  let suma = 0;
  suma += notes[i];
}

console.log(\`Mitjana: \${suma / notes.length}\`);`,
    hint: [
      "El missatge de la consola diu que `suma` no existeix a l'última línia. On està declarada? Una variable declarada dins de les claus d'un bucle no existeix a fora, i a més torna a començar a cada volta.",
      "Per al segon, afegeix un `console.log(i)` dins del bucle i compta quantes voltes fa.",
    ],
    solution: `const notes = [6, 8, 7];

let suma = 0;

for (let i = 0; i < notes.length; i++) {
  suma += notes[i];
}

console.log(\`Mitjana: \${suma / notes.length}\`);`,
    explanation: "Un acumulador s'ha de declarar **abans** del bucle: dins, es crearia de nou a cada volta i no existiria en acabar. I la condició `i < notes.length - 1` s'atura una volta abans d'hora i es deixa l'última nota. Aquest segon error no avisa: dona una mitjana que sembla raonable, i només el descobreixes si saps quin resultat esperaves.",
  },
  {
    id: 'el-carret-avariat',
    level: 3,
    title: 'El carret avariat',
    statement: [
      "Aquest programa calcula l'import d'un carret de compra. L'enviament costa 5 € i és gratuït **a partir de** 40 € de compra. Hauria de mostrar les tres línies de l'exemple, però té **quatre errors** i cap d'ells fa sortir un missatge a la consola.",
      "Aplica el mètode de la unitat: mira què surt, pensa quina funció en pot ser la responsable i comprova-ho amb un `console.log` abans de canviar res. Arregla'ls d'un en un.",
    ],
    expectedOutput: ['Productes: 40 €', 'Enviament: 0 €', 'A pagar: 40 €'],
    starter: `const carret = [
  { nom: "Samarreta", preu: 15, quantitat: 2 },
  { nom: "Gorra", preu: 10, quantitat: 1 }
];

function calcularSubtotal(producte) {
  const subtotal = producte.preu * producte.quantiat;
}

function calcularTotal() {
  let total = 0;
  for (const producte of carret) {
    total =+ calcularSubtotal(producte);
  }
  return total;
}

function calcularEnviament(total) {
  if (total > 40) {
    return 0;
  }
  return 5;
}

const total = calcularTotal();
const enviament = calcularEnviament(total);

console.log(\`Productes: \${total} €\`);
console.log(\`Enviament: \${enviament} €\`);
console.log(\`A pagar: \${total + enviament} €\`);`,
    hint: [
      "Comença per `calcularSubtotal`: afegeix `console.log(calcularSubtotal(carret[0]));` i mira què retorna. Hi ha dos errors, en aquesta funció.",
      "Quan els subtotals siguin correctes, mira el total: és la suma de tots o només l'últim? Fixa't bé en l'operador. L'últim error és a la frontera dels 40 €.",
    ],
    solution: `const carret = [
  { nom: "Samarreta", preu: 15, quantitat: 2 },
  { nom: "Gorra", preu: 10, quantitat: 1 }
];

function calcularSubtotal(producte) {
  return producte.preu * producte.quantitat;
}

function calcularTotal() {
  let total = 0;
  for (const producte of carret) {
    total += calcularSubtotal(producte);
  }
  return total;
}

function calcularEnviament(total) {
  if (total >= 40) {
    return 0;
  }
  return 5;
}

const total = calcularTotal();
const enviament = calcularEnviament(total);

console.log(\`Productes: \${total} €\`);
console.log(\`Enviament: \${enviament} €\`);
console.log(\`A pagar: \${total + enviament} €\`);`,
    explanation: [
      "`calcularSubtotal` calculava el resultat però no el retornava (faltava el `return`), i a més llegia una propietat mal escrita, `quantiat`, que val `undefined`. Tots dos errors donaven `NaN`, i per això n'hi havia dos amagats darrere del mateix símptoma.",
      "`total =+ x` no és `total += x`: assigna a `total` el valor `+x`, i cada volta trepitja l'anterior. I `total > 40` deixava fora el cas exacte dels 40 €, quan l'enunciat diu «a partir de». Cap dels quatre feia saltar un error: només es troben sabent què hauria de sortir i seguint les dades pas a pas.",
    ],
  },
];
