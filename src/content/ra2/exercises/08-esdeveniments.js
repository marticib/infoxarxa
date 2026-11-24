// Exercicis extra del tema 8: click, input, keydown i l'objecte event.

export default [
  {
    id: 'mostra-la-resposta',
    level: 1,
    title: 'Mostra i amaga la resposta',
    statement: "Fes que el botó mostri la resposta de l'endevinalla i que, si es torna a prémer, la torni a amagar. El text del botó ha de dir en cada moment el que farà: «Mostra la resposta» o «Amaga la resposta». Actualitza també l'atribut `aria-expanded`.",
    expected: "El primer clic mostra «La pinta.» i el botó passa a dir «Amaga la resposta». El segon ho deixa com al principi.",
    html: `<p><strong>Endevinalla:</strong> què té dents i no mossega?</p>
<button type="button" id="boto" aria-expanded="false" aria-controls="resposta">Mostra la resposta</button>
<p id="resposta" hidden>La pinta.</p>`,
    css: `button { padding: 8px 14px; }`,
    hint: "La propietat `hidden` és un booleà: la pots invertir amb `resposta.hidden = !resposta.hidden`. Després, pregunta en quin estat ha quedat per decidir el text del botó.",
    solution: `const boto = document.querySelector("#boto");
const resposta = document.querySelector("#resposta");

boto.addEventListener("click", () => {
  resposta.hidden = !resposta.hidden;

  if (resposta.hidden) {
    boto.textContent = "Mostra la resposta";
  } else {
    boto.textContent = "Amaga la resposta";
  }

  boto.setAttribute("aria-expanded", String(!resposta.hidden));
});`,
    explanation: "Un sol listener serveix per a les dues accions, perquè no diu «mostra» ni «amaga»: diu «fes el contrari del que hi ha ara». `aria-expanded` és el contrari de `hidden`: quan la resposta està amagada, el botó no està expandit.",
  },
  {
    id: 'salutacio-en-directe',
    level: 1,
    title: 'Una salutació en directe',
    statement: "Mentre la persona escriu el seu nom, el paràgraf ha de dir «Hola, *nom*!». Si esborra tot el text, ha de tornar a dir «Escriu el teu nom.».",
    expected: "En escriure «Laia», el paràgraf va canviant lletra a lletra fins a dir «Hola, Laia!». En buidar el camp, torna el text inicial.",
    html: `<label for="nom">El teu nom</label>
<input type="text" id="nom" autocomplete="off">
<p id="salutacio">Escriu el teu nom.</p>`,
    css: `label {
  display: block;
  font-weight: 600;
}

input { padding: 8px; }`,
    hint: "L'esdeveniment que es produeix a cada tecla és `input`. Dins del listener, el que hi ha escrit en aquell moment és a la propietat `value` del camp.",
    solution: `const campNom = document.querySelector("#nom");
const salutacio = document.querySelector("#salutacio");

campNom.addEventListener("input", () => {
  if (campNom.value === "") {
    salutacio.textContent = "Escriu el teu nom.";
  } else {
    salutacio.textContent = \`Hola, \${campNom.value}!\`;
  }
});`,
    explanation: "L'esdeveniment `input` es dispara a cada canvi, també quan s'esborra. Per això cal preveure el cas del camp buit: sense l'`if`, en esborrar-ho tot quedaria un trist «Hola, !».",
  },
  {
    id: 'pregunta-amb-retorn',
    level: 2,
    title: 'Respon amb Retorn',
    statement: [
      "Quan la persona premi **Retorn** dins del camp, comprova la resposta: si ha escrit `42`, mostra «Correcte!»; si no, «Torna-ho a provar.».",
      "Quan premi **Escape**, buida el camp i esborra el missatge.",
    ],
    expected: "Amb «42» i Retorn apareix «Correcte!». Amb qualsevol altra cosa, «Torna-ho a provar.». Escape ho deixa tot en blanc.",
    html: `<label for="resposta">Quant fan 6 × 7?</label>
<input type="text" id="resposta" autocomplete="off">
<p id="resultat"></p>`,
    css: `label {
  display: block;
  font-weight: 600;
}

input { padding: 8px; }`,
    hint: "Escolta `keydown` al camp i mira `event.key`: val `\"Enter\"` per a Retorn i `\"Escape\"` per a Escape. Recorda que `value` és sempre un text: compara'l amb `\"42\"`, entre cometes.",
    solution: `const camp = document.querySelector("#resposta");
const resultat = document.querySelector("#resultat");

camp.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    if (camp.value === "42") {
      resultat.textContent = "Correcte!";
    } else {
      resultat.textContent = "Torna-ho a provar.";
    }
  } else if (event.key === "Escape") {
    camp.value = "";
    resultat.textContent = "";
  }
});`,
    explanation: "El listener s'executa a **cada** tecla, però només fa alguna cosa amb dues. `event.key` és el que permet distingir-les. La comparació és amb el text `\"42\"` perquè `value` sempre és un string: amb `===`, el nombre `42` no hi coincidiria mai.",
  },
  {
    id: 'mida-de-lletra',
    level: 2,
    title: 'Tria la mida de la lletra',
    statement: [
      "Els tres botons han de canviar la mida del text: «Petita» li posa la classe `petita`, «Gran» li posa la classe `gran` i «Normal» li treu totes dues.",
      "Fes-ho amb **una sola funció** per als tres botons, i marca el botó triat amb `aria-pressed`.",
    ],
    expected: "El text es fa petit, normal o gran segons el botó, i el botó triat queda destacat.",
    html: `<div role="group" aria-label="Mida de la lletra">
  <button type="button" class="mida" aria-pressed="false">Petita</button>
  <button type="button" class="mida" aria-pressed="true">Normal</button>
  <button type="button" class="mida" aria-pressed="false">Gran</button>
</div>
<p id="text">Llegir còmodament és el primer pas per entendre el que es llegeix.</p>`,
    css: `button {
  padding: 8px 14px;
  background: #e3e7f2;
  border: 0;
  border-radius: 8px;
}

button[aria-pressed="true"] {
  color: #ffffff;
  background: #1b2233;
}

.petita { font-size: 0.8rem; }
.gran { font-size: 1.5rem; }`,
    hint: [
      "Selecciona els tres botons amb `querySelectorAll` i posa'ls el mateix listener dins d'un bucle. Dins de la funció, `event.target` és el botó que s'ha premut.",
      "Comença sempre traient les dues classes del text. Després, segons `event.target.textContent`, posa la que toqui.",
    ],
    solution: `const botons = document.querySelectorAll(".mida");
const text = document.querySelector("#text");

function canviarMida(event) {
  const triada = event.target.textContent;

  text.classList.remove("petita");
  text.classList.remove("gran");

  if (triada === "Petita") {
    text.classList.add("petita");
  } else if (triada === "Gran") {
    text.classList.add("gran");
  }

  for (const boto of botons) {
    boto.setAttribute("aria-pressed", String(boto === event.target));
  }
}

for (const boto of botons) {
  boto.addEventListener("click", canviarMida);
}`,
    explanation: "Treure primer les dues classes estalvia haver de recordar quina hi havia abans: es parteix sempre de zero i es posa només la que toca. El bucle final compara cada botó amb `event.target`, de manera que només el premut queda amb `aria-pressed=\"true\"`.",
  },
  {
    id: 'estrelles',
    level: 3,
    title: 'Valora amb estrelles',
    statement: [
      "Fes que les cinc estrelles serveixin per posar una nota. En prémer-ne una, aquesta i totes les anteriors han de rebre la classe `plena`, i les posteriors l'han de perdre. A sota, el text ha de dir «Has posat 3 de 5».",
      "La nota triada és una dada: guarda-la en una variable i escriu una funció que pinti les estrelles a partir d'ella.",
    ],
    expected: "En prémer la tercera estrella, les tres primeres es pinten de groc i el text diu «Has posat 3 de 5». Si després es prem la primera, només en queda una de pintada.",
    html: `<div role="group" aria-label="Valoració">
  <button type="button" class="estrella" aria-label="1 estrella">★</button>
  <button type="button" class="estrella" aria-label="2 estrelles">★</button>
  <button type="button" class="estrella" aria-label="3 estrelles">★</button>
  <button type="button" class="estrella" aria-label="4 estrelles">★</button>
  <button type="button" class="estrella" aria-label="5 estrelles">★</button>
</div>
<p id="resultat">Encara no has valorat.</p>`,
    css: `.estrella {
  padding: 0 2px;
  font-size: 2rem;
  line-height: 1;
  color: #b9c1d4;
  background: none;
  border: 0;
  cursor: pointer;
}

.estrella.plena { color: #e0a800; }`,
    starter: `const estrelles = document.querySelectorAll(".estrella");
const resultat = document.querySelector("#resultat");

let nota = 0;

function renderitzar() {
  // Pinta les estrelles i el text a partir de «nota»

}

// Posa un listener a cada estrella
`,
    hint: [
      "`estrelles` es comporta com un array: `estrelles[0]` és la primera i `estrelles[4]`, l'última. Recorre-les amb un `for` clàssic, amb comptador, per saber a quina posició ets.",
      "Dins de `renderitzar`, l'estrella de la posició `i` ha d'estar plena si `i < nota`. Al listener de l'estrella de la posició `i`, la nota passa a ser `i + 1`.",
    ],
    solution: `const estrelles = document.querySelectorAll(".estrella");
const resultat = document.querySelector("#resultat");

let nota = 0;

function renderitzar() {
  for (let i = 0; i < estrelles.length; i++) {
    if (i < nota) {
      estrelles[i].classList.add("plena");
    } else {
      estrelles[i].classList.remove("plena");
    }
  }
  resultat.textContent = \`Has posat \${nota} de \${estrelles.length}\`;
}

for (let i = 0; i < estrelles.length; i++) {
  estrelles[i].addEventListener("click", () => {
    nota = i + 1;
    renderitzar();
  });
}`,
    explanation: [
      "Cada listener només fa dues coses: canviar la nota i demanar que es torni a pintar. No toca cap estrella directament. És `renderitzar` qui, mirant la nota, decideix com ha d'estar cadascuna.",
      "Cada listener recorda el seu propi valor d'`i`, perquè el comptador està declarat amb `let` dins del `for`. Per això la tercera estrella posa sempre un 3, encara que el bucle ja hagi acabat fa estona.",
    ],
  },
];
