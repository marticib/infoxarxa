// Exercicis extra del tema 6: arrays, objectes i arrays d'objectes.

export default [
  {
    id: 'primer-i-ultim',
    level: 1,
    title: "El primer i l'últim",
    statement: "Mostra el primer i l'últim element d'una llista de colors. El programa ha de continuar funcionant si la llista té més o menys elements.",
    data: ['colors = ["vermell", "verd", "blau", "groc"]'],
    expectedOutput: ['Primer: vermell', 'Últim: groc'],
    hint: "El primer element és sempre a la posició 0. L'última posició depèn de quants n'hi ha: és `colors.length - 1`.",
    solution: `const colors = ["vermell", "verd", "blau", "groc"];

console.log(\`Primer: \${colors[0]}\`);
console.log(\`Últim: \${colors[colors.length - 1]}\`);`,
    explanation: "Com que les posicions comencen a 0, una llista de quatre elements té les posicions 0, 1, 2 i 3. Escriure `colors[3]` funcionaria avui, però deixaria de funcionar el dia que s'hi afegís un cinquè color.",
  },
  {
    id: 'fitxa-pelicula',
    level: 1,
    title: "La fitxa d'una pel·lícula",
    statement: "Has vist la versió estesa de la pel·lícula, que dura 10 minuts més. Actualitza l'objecte: suma 10 a la durada i marca-la com a vista. Després mostra la fitxa, i una segona línia que digui `Ja l'he vista` o `Pendent de veure` segons el valor de `vista`.",
    data: ['pelicula = { titol: "Coco", any: 2017, durada: 105, vista: false }'],
    expectedOutput: ['Coco (2017), 115 min', "Ja l'he vista"],
    hint: "Les propietats d'un objecte es modifiquen com les variables: `pelicula.durada += 10`. Per a la segona línia necessites un `if` que miri `pelicula.vista`.",
    solution: `const pelicula = { titol: "Coco", any: 2017, durada: 105, vista: false };

pelicula.durada += 10;
pelicula.vista = true;

console.log(\`\${pelicula.titol} (\${pelicula.any}), \${pelicula.durada} min\`);

if (pelicula.vista) {
  console.log("Ja l'he vista");
} else {
  console.log("Pendent de veure");
}`,
    explanation: "L'objecte està declarat amb `const`, però això només impedeix assignar un altre objecte a la variable. Les seves propietats es poden modificar tantes vegades com calgui.",
  },
  {
    id: 'cua-del-forn',
    level: 2,
    title: 'La cua del forn',
    statement: "Al forn hi ha dues persones fent cua. Segueix els quatre passos dels comentaris: les persones noves es posen al final i s'atén sempre la primera.",
    data: ['cua = ["Aina", "Bru"]'],
    expectedOutput: ['Atenem: Aina', 'Queden: 3', 'Següent: Bru'],
    starter: `const cua = ["Aina", "Bru"];

// 1. Arriba la Cai i es posa al final

// 2. Atenen la primera persona: mostra «Atenem: nom»

// 3. Arriba en Dídac

// 4. Mostra quantes persones queden i qui és la següent
`,
    hint: "`push` afegeix al final i `shift` treu el primer element. `shift`, a més, **retorna** l'element que ha tret: guarda'l en una constant per poder-lo mostrar.",
    solution: `const cua = ["Aina", "Bru"];

// 1. Arriba la Cai i es posa al final
cua.push("Cai");

// 2. Atenen la primera persona: mostra «Atenem: nom»
const atesa = cua.shift();
console.log(\`Atenem: \${atesa}\`);

// 3. Arriba en Dídac
cua.push("Dídac");

// 4. Mostra quantes persones queden i qui és la següent
console.log(\`Queden: \${cua.length}\`);
console.log(\`Següent: \${cua[0]}\`);`,
    explanation: "Entrar pel final i sortir pel principi és exactament com funciona una cua. Després dels quatre passos, l'array és `[\"Bru\", \"Cai\", \"Dídac\"]`: qui és a la posició 0 és sempre la pròxima persona.",
  },
  {
    id: 'total-cistella',
    level: 2,
    title: 'El total de la cistella',
    statement: "Cada producte de la cistella té un preu i una quantitat. Mostra una línia per a cada producte amb el que costa en total (preu per quantitat) i, al final, l'import de tota la compra.",
    expectedOutput: ['Pa: 3 €', 'Formatge: 6 €', 'Suc: 6 €', 'Total: 15 €'],
    starter: `const cistella = [
  { nom: "Pa", preu: 1.5, quantitat: 2 },
  { nom: "Formatge", preu: 6, quantitat: 1 },
  { nom: "Suc", preu: 2, quantitat: 3 }
];

// Escriu el teu codi aquí
`,
    hint: "Recorre l'array amb `for...of`. A cada volta, calcula el subtotal del producte, mostra'l i suma'l a un acumulador declarat abans del bucle.",
    solution: `const cistella = [
  { nom: "Pa", preu: 1.5, quantitat: 2 },
  { nom: "Formatge", preu: 6, quantitat: 1 },
  { nom: "Suc", preu: 2, quantitat: 3 }
];

let total = 0;

for (const producte of cistella) {
  const subtotal = producte.preu * producte.quantitat;
  console.log(\`\${producte.nom}: \${subtotal} €\`);
  total += subtotal;
}

console.log(\`Total: \${total} €\`);`,
    explanation: "A cada volta, `producte` és un dels objectes de l'array, i les seves dades es llegeixen amb el punt. L'acumulador és el mateix patró de la unitat de bucles: l'única novetat és que el que se suma surt de dues propietats d'un objecte.",
  },
  {
    id: 'inventari',
    level: 3,
    title: "L'inventari de la botiga",
    statement: [
      "Completa les dues funcions. `buscarProducte` rep un `id` i retorna el producte que el té. `vendre` rep un `id` i una quantitat: si hi ha prou estoc, el resta i mostra «Venut: *quantitat* x *nom*»; si no, mostra «No hi ha prou estoc de *nom*» i no toca res.",
      "El codi del final fa dues vendes i mostra com queda l'inventari: no el modifiquis.",
    ],
    expectedOutput: ['Venut: 2 x Teclat', 'No hi ha prou estoc de Ratolí', 'Teclat: 3', 'Ratolí: 1'],
    starter: `const productes = [
  { id: 1, nom: "Teclat", estoc: 5 },
  { id: 2, nom: "Ratolí", estoc: 1 }
];

function buscarProducte(id) {

}

function vendre(id, quantitat) {

}

vendre(1, 2);
vendre(2, 3);

for (const producte of productes) {
  console.log(\`\${producte.nom}: \${producte.estoc}\`);
}`,
    hint: [
      "`buscarProducte` recorre l'array i, quan troba un producte amb aquell `id`, el retorna de seguida amb `return`.",
      "`vendre` comença cridant `buscarProducte`. Si l'estoc és inferior a la quantitat, mostra l'avís i surt amb `return`. Si no, resta amb `-=`.",
    ],
    solution: `const productes = [
  { id: 1, nom: "Teclat", estoc: 5 },
  { id: 2, nom: "Ratolí", estoc: 1 }
];

function buscarProducte(id) {
  for (const producte of productes) {
    if (producte.id === id) {
      return producte;
    }
  }
}

function vendre(id, quantitat) {
  const producte = buscarProducte(id);

  if (producte.estoc < quantitat) {
    console.log(\`No hi ha prou estoc de \${producte.nom}\`);
    return;
  }

  producte.estoc -= quantitat;
  console.log(\`Venut: \${quantitat} x \${producte.nom}\`);
}

vendre(1, 2);
vendre(2, 3);

for (const producte of productes) {
  console.log(\`\${producte.nom}: \${producte.estoc}\`);
}`,
    explanation: [
      "`buscarProducte` no retorna una còpia: retorna **el mateix objecte** que hi ha a l'array. Per això, quan `vendre` en modifica l'estoc, el canvi es veu després en recórrer `productes`.",
      "Els productes s'identifiquen per l'`id` i no per la posició ni pel nom: l'`id` no canvia encara que la llista es reordeni o que dos productes es diguin igual.",
    ],
  },
];
