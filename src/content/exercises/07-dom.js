// Exercicis extra del tema 7: seleccionar, modificar, crear i eliminar elements.

export default [
  {
    id: 'omple-la-fitxa',
    level: 1,
    title: 'Omple la fitxa',
    statement: "La fitxa de la pàgina té tres espais buits. Omple'ls amb les dades de l'objecte `alumne`.",
    expected: "La fitxa mostra «Nom: Laia Puig», «Cicle: DAW» i «Curs: 1».",
    html: `<h1>Fitxa de l'alumna</h1>
<p>Nom: <span id="nom"></span></p>
<p>Cicle: <span id="cicle"></span></p>
<p>Curs: <span id="curs"></span></p>`,
    css: `span { font-weight: 700; }`,
    starter: `const alumne = { nom: "Laia Puig", cicle: "DAW", curs: 1 };

// Escriu el teu codi aquí
`,
    hint: "Per a cada dada necessites dues coses: trobar l'element amb `document.querySelector(\"#nom\")` i assignar-li el text amb `textContent`.",
    solution: `const alumne = { nom: "Laia Puig", cicle: "DAW", curs: 1 };

document.querySelector("#nom").textContent = alumne.nom;
document.querySelector("#cicle").textContent = alumne.cicle;
document.querySelector("#curs").textContent = alumne.curs;`,
    explanation: "Les dades són a l'objecte i la pàgina només les mostra. Si canvies el nom a l'objecte i tornes a executar, la fitxa canvia sense tocar l'HTML. `curs` és un nombre, i `textContent` el converteix a text sense que calgui fer res.",
  },
  {
    id: 'avis-llegit',
    level: 1,
    title: "Marca l'avís com a llegit",
    statement: "L'avís de la pàgina està destacat perquè té la classe `nou`. Treu-li aquesta classe, posa-li la classe `llegit` i canvia el text per «No tens missatges nous.». Al final, mostra a la consola si l'element té la classe `llegit`.",
    expectedOutput: ['true'],
    expected: "L'avís deixa d'estar destacat i passa a veure's en gris, amb el text nou.",
    html: `<p id="avis" class="avis nou">Tens 1 missatge nou.</p>`,
    css: `.avis {
  padding: 10px 14px;
  border-radius: 8px;
}

.nou {
  font-weight: 700;
  background: #fff3bf;
}

.llegit {
  color: #5d6780;
  background: #eef1f8;
}`,
    hint: "`classList.remove`, `classList.add` i `classList.contains`. Recorda que dins de `classList` el nom de la classe s'escriu sense punt.",
    solution: `const avis = document.querySelector("#avis");

avis.classList.remove("nou");
avis.classList.add("llegit");
avis.textContent = "No tens missatges nous.";

console.log(avis.classList.contains("llegit"));`,
    explanation: "JavaScript no canvia cap color: canvia quines classes té l'element, i el CSS fa la resta. La classe `avis` no s'ha tocat, i per això l'element conserva el farciment i les vores arrodonides.",
  },
  {
    id: 'numera-els-passos',
    level: 2,
    title: 'Numera els passos',
    statement: "La recepta té quatre passos sense numerar. Afegeix al davant del text de cada un el seu número («1. », «2. »…) i escriu a `#total` quants passos hi ha, amb el format «4 passos».",
    expected: "Cada pas comença pel seu número, de l'1 al 4, i sota la llista hi diu «4 passos».",
    html: `<h1>Truita a la francesa</h1>
<ul>
  <li class="pas">Bat els ous</li>
  <li class="pas">Escalfa la paella</li>
  <li class="pas">Aboca-hi els ous</li>
  <li class="pas">Plega la truita i serveix-la</li>
</ul>
<p id="total"></p>`,
    css: `ul {
  padding-left: 0;
  list-style: none;
}`,
    hint: "`querySelectorAll(\".pas\")` retorna tots els passos. Recorre'ls amb un `for...of` i porta el compte en una variable que comenci a 1. El text nou es construeix a partir del que ja té: `pas.textContent`.",
    solution: `const passos = document.querySelectorAll(".pas");

let numero = 1;

for (const pas of passos) {
  pas.textContent = \`\${numero}. \${pas.textContent}\`;
  numero++;
}

document.querySelector("#total").textContent = \`\${passos.length} passos\`;`,
    explanation: "`textContent` serveix per escriure i també per llegir: a la dreta de l'`=` hi ha el text que l'element ja tenia, i a l'esquerra el lloc on es guarda el nou. El total surt de `passos.length`, de manera que si s'afegeix un pas a l'HTML no cal tocar el JavaScript.",
  },
  {
    id: 'elimina-els-esgotats',
    level: 2,
    title: 'Elimina els productes esgotats',
    statement: "A la llista de la botiga hi ha productes amb la classe `esgotat`. Elimina'ls de la pàgina, mostra a la consola quants n'has eliminat i escriu a `#resum` quants productes queden, amb el format «Queden 3 productes».",
    expectedOutput: ['Eliminats: 2'],
    expected: "A la llista només queden el teclat, el monitor i els auriculars, i a sota hi diu «Queden 3 productes».",
    html: `<ul id="productes">
  <li>Teclat</li>
  <li class="esgotat">Ratolí</li>
  <li>Monitor</li>
  <li class="esgotat">Càmera web</li>
  <li>Auriculars</li>
</ul>
<p id="resum"></p>`,
    css: `.esgotat {
  color: #b3261e;
  text-decoration: line-through;
}`,
    hint: [
      "Selecciona els esgotats amb `querySelectorAll(\".esgotat\")` i crida `remove()` a cada un, dins d'un bucle.",
      "Per saber quants en queden, torna a preguntar a la pàgina **després** d'eliminar: `document.querySelectorAll(\"#productes li\").length`.",
    ],
    solution: `const esgotats = document.querySelectorAll(".esgotat");

for (const producte of esgotats) {
  producte.remove();
}

console.log(\`Eliminats: \${esgotats.length}\`);

const restants = document.querySelectorAll("#productes li");
document.querySelector("#resum").textContent = \`Queden \${restants.length} productes\`;`,
    explanation: "La llista `esgotats` es va obtenir abans d'eliminar res i no canvia: continua tenint els dos elements, encara que ja no siguin a la pàgina. Per això, per comptar els que queden, cal fer una selecció nova.",
  },
  {
    id: 'taula-de-notes',
    level: 3,
    title: 'La taula de notes',
    statement: [
      "Pinta una fila de la taula per a cada alumne de l'array: un `<tr>` amb dues cel·les `<td>`, una per al nom i una per a la nota. Les files amb una nota inferior a 5 han de tenir la classe `suspes`.",
      "Sota la taula, escriu a `#mitjana` la mitjana del grup, amb el format «Mitjana del grup: 6.5».",
    ],
    expected: "Una taula amb quatre files. La d'en Biel es veu en vermell. A sota: «Mitjana del grup: 6.5».",
    html: `<table>
  <thead>
    <tr><th>Nom</th><th>Nota</th></tr>
  </thead>
  <tbody id="files"></tbody>
</table>
<p id="mitjana"></p>`,
    css: `table {
  border-collapse: collapse;
}

th,
td {
  padding: 6px 16px;
  text-align: left;
  border-bottom: 1px solid #dfe3ee;
}

.suspes {
  color: #b3261e;
  font-weight: 700;
}`,
    starter: `const alumnes = [
  { nom: "Aina", nota: 8 },
  { nom: "Biel", nota: 4 },
  { nom: "Clara", nota: 7 },
  { nom: "Dani", nota: 7 }
];

const files = document.querySelector("#files");

// Escriu el teu codi aquí
`,
    hint: [
      "Per a cada alumne has de crear tres elements: la fila i les dues cel·les. Les cel·les s'afegeixen a la fila, i la fila, a `files`.",
      "Aprofita el mateix bucle per anar sumant les notes en un acumulador. La mitjana es calcula i s'escriu en acabar el bucle.",
    ],
    solution: `const alumnes = [
  { nom: "Aina", nota: 8 },
  { nom: "Biel", nota: 4 },
  { nom: "Clara", nota: 7 },
  { nom: "Dani", nota: 7 }
];

const files = document.querySelector("#files");

let suma = 0;

for (const alumne of alumnes) {
  const fila = document.createElement("tr");
  if (alumne.nota < 5) {
    fila.classList.add("suspes");
  }

  const celNom = document.createElement("td");
  celNom.textContent = alumne.nom;

  const celNota = document.createElement("td");
  celNota.textContent = alumne.nota;

  fila.append(celNom, celNota);
  files.append(fila);

  suma += alumne.nota;
}

const mitjana = suma / alumnes.length;
document.querySelector("#mitjana").textContent = \`Mitjana del grup: \${mitjana}\`;`,
    explanation: "És el mateix patró de renderitzar una llista, amb un nivell més: cada fila conté dues cel·les. Un element no es veu fins que s'afegeix a un altre que ja és a la pàgina; per això les cel·les van a la fila i la fila va al `<tbody>`.",
  },
];
