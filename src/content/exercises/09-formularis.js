// Exercicis extra del tema 9: llegir camps, validar i mostrar errors.

const FORM_CSS = `label {
  display: block;
  margin-top: 10px;
  font-weight: 600;
}

input[type="text"],
select {
  padding: 8px;
  border: 1px solid #8a94a8;
  border-radius: 6px;
}

input[aria-invalid="true"] {
  border: 2px solid #b3261e;
}

button {
  display: block;
  margin-top: 12px;
  padding: 8px 14px;
}

.error {
  min-height: 1.5em;
  margin: 4px 0 0;
  font-weight: 600;
  color: #b3261e;
}`;

export default [
  {
    id: 'suma-dos-nombres',
    level: 1,
    title: 'Suma dos nombres',
    statement: "Quan s'enviï el formulari, mostra a `#resultat` la suma dels dos nombres amb el format «12 + 30 = 42». La pàgina no s'ha de recarregar.",
    expected: "Amb 12 i 30, el resultat diu «12 + 30 = 42», i no «1230».",
    html: `<form id="formulari">
  <label for="primer">Primer nombre</label>
  <input type="text" id="primer" inputmode="numeric" autocomplete="off">

  <label for="segon">Segon nombre</label>
  <input type="text" id="segon" inputmode="numeric" autocomplete="off">

  <button type="submit">Suma</button>
</form>
<p id="resultat"></p>`,
    css: FORM_CSS,
    hint: "El valor d'un camp és sempre un text, encara que la persona hi escrigui xifres. Converteix-los amb `Number()` abans de sumar. I recorda `event.preventDefault()`.",
    solution: `const formulari = document.querySelector("#formulari");
const campPrimer = document.querySelector("#primer");
const campSegon = document.querySelector("#segon");
const resultat = document.querySelector("#resultat");

formulari.addEventListener("submit", (event) => {
  event.preventDefault();

  const primer = Number(campPrimer.value);
  const segon = Number(campSegon.value);

  resultat.textContent = \`\${primer} + \${segon} = \${primer + segon}\`;
});`,
    explanation: "Sense `Number()`, l'operador `+` trobaria dos textos i els enganxaria: «12» i «30» donarien «1230». Sense `preventDefault()`, el navegador enviaria el formulari i recarregaria la pàgina abans que es pogués veure res.",
  },
  {
    id: 'codi-postal',
    level: 2,
    title: 'Valida el codi postal',
    statement: [
      "Completa la funció `validarCodiPostal`. Rep un text (que ja arriba sense espais) i retorna un missatge d'error, o un text buit si és correcte.",
      "Les regles, en aquest ordre: si és buit, «El codi postal és obligatori.»; si no té exactament 5 caràcters, «Ha de tenir 5 xifres.»; si no es pot convertir en un nombre, «Només pot tenir xifres.».",
    ],
    expectedOutput: ['El codi postal és obligatori.', 'Ha de tenir 5 xifres.', 'Només pot tenir xifres.', 'true'],
    starter: `function validarCodiPostal(text) {
  // Retorna el missatge d'error, o "" si el codi és correcte

}

console.log(validarCodiPostal(""));
console.log(validarCodiPostal("0801"));
console.log(validarCodiPostal("vuit!"));
console.log(validarCodiPostal("08001") === "");`,
    hint: "Un `if` amb `return` per a cada regla, i un `return \"\"` al final. La quantitat de caràcters és `text.length`. Per saber si un text es pot convertir en nombre: `Number.isNaN(Number(text))`.",
    solution: `function validarCodiPostal(text) {
  if (text === "") {
    return "El codi postal és obligatori.";
  }
  if (text.length !== 5) {
    return "Ha de tenir 5 xifres.";
  }
  if (Number.isNaN(Number(text))) {
    return "Només pot tenir xifres.";
  }
  return "";
}

console.log(validarCodiPostal(""));
console.log(validarCodiPostal("0801"));
console.log(validarCodiPostal("vuit!"));
console.log(validarCodiPostal("08001") === "");`,
    explanation: [
      "La funció no sap res de formularis ni de camps: rep un text i retorna un altre text. Per això es pot provar amb quatre `console.log`, sense haver d'omplir cap formulari a mà. És la gran avantatge de separar la validació de la pàgina.",
      "Fixa't que el codi es valida com a text i **es continua guardant com a text**: si el convertíssim en nombre, «08001» perdria el zero inicial i es convertiria en 8001.",
    ],
  },
  {
    id: 'nom-usuari',
    level: 2,
    title: "Tria un nom d'usuari",
    statement: [
      "Valida el nom d'usuari quan s'enviï el formulari. Ha de ser obligatori («El nom d'usuari és obligatori.»), tenir entre 3 i 12 caràcters («Ha de tenir entre 3 i 12 caràcters.») i no pot contenir espais («No pot tenir espais.»).",
      "Si hi ha un error, mostra'l a `#error`, marca el camp amb `aria-invalid` i torna-hi el focus. Si és correcte, esborra l'error i mostra a `#exit` «Nom d'usuari acceptat: *nom*».",
    ],
    expected: "«ab» mostra l'error de longitud; «laia puig», el dels espais; «laia_p» s'accepta i l'error desapareix.",
    html: `<form id="formulari" novalidate>
  <label for="usuari">Nom d'usuari</label>
  <input type="text" id="usuari" autocomplete="off" aria-describedby="error">
  <p id="error" class="error" role="alert"></p>
  <button type="submit">Comprova</button>
</form>
<p id="exit"></p>`,
    css: FORM_CSS,
    starter: `const formulari = document.querySelector("#formulari");
const campUsuari = document.querySelector("#usuari");
const error = document.querySelector("#error");
const exit = document.querySelector("#exit");

function validarUsuari(text) {
  // Retorna el missatge d'error, o "" si és correcte

}

formulari.addEventListener("submit", (event) => {

});`,
    hint: [
      "A `validarUsuari`, un `if` amb `return` per a cada regla. Per saber si un text conté un espai: `text.includes(\" \")`.",
      "Al listener: `preventDefault`, llegir el valor amb `trim()`, validar i, segons el resultat, mostrar l'error (i sortir amb `return`) o mostrar l'èxit.",
    ],
    solution: `const formulari = document.querySelector("#formulari");
const campUsuari = document.querySelector("#usuari");
const error = document.querySelector("#error");
const exit = document.querySelector("#exit");

function validarUsuari(text) {
  if (text === "") {
    return "El nom d'usuari és obligatori.";
  }
  if (text.length < 3 || text.length > 12) {
    return "Ha de tenir entre 3 i 12 caràcters.";
  }
  if (text.includes(" ")) {
    return "No pot tenir espais.";
  }
  return "";
}

formulari.addEventListener("submit", (event) => {
  event.preventDefault();

  const usuari = campUsuari.value.trim();
  const missatge = validarUsuari(usuari);

  if (missatge !== "") {
    error.textContent = missatge;
    exit.textContent = "";
    campUsuari.setAttribute("aria-invalid", "true");
    campUsuari.focus();
    return;
  }

  error.textContent = "";
  campUsuari.removeAttribute("aria-invalid");
  exit.textContent = \`Nom d'usuari acceptat: \${usuari}\`;
});`,
    explanation: "`trim()` treu els espais del principi i del final, però no els del mig: per això «laia puig» arriba a la tercera regla. Quan el nom és correcte, cal **esborrar** l'error i treure `aria-invalid`: si no, el missatge de l'intent anterior es quedaria a la pantalla al costat del d'èxit.",
  },
  {
    id: 'propina',
    level: 2,
    title: 'Calcula la propina',
    statement: [
      "El formulari demana l'import d'un compte i el percentatge de propina. En enviar-lo, mostra a `#resultat` la propina i el total, amb el format «Propina: 2.5 € · Total: 27.5 €».",
      "Si l'import és buit, no és un nombre o no és més gran que zero, mostra «Escriu un import vàlid.» a `#error` i no calculis res.",
    ],
    expected: "Amb un import de 25 i el 10 %, el resultat és «Propina: 2.5 € · Total: 27.5 €». Amb «hola» o amb 0, apareix l'error.",
    html: `<form id="formulari" novalidate>
  <label for="import">Import del compte (€)</label>
  <input type="text" id="import" inputmode="decimal" autocomplete="off" aria-describedby="error">
  <p id="error" class="error" role="alert"></p>

  <label for="percentatge">Propina</label>
  <select id="percentatge">
    <option value="5">5 %</option>
    <option value="10" selected>10 %</option>
    <option value="15">15 %</option>
  </select>

  <button type="submit">Calcula</button>
</form>
<p id="resultat"></p>`,
    css: FORM_CSS,
    hint: [
      "El `value` d'un `<select>` és el `value` de l'opció triada, i també és un text: converteix-lo amb `Number()`, igual que l'import.",
      "Un text buit convertit amb `Number()` dona `0`, i un text que no és un nombre dona `NaN`. Comprova els dos casos: `Number.isNaN(importCompte) || importCompte <= 0`.",
    ],
    solution: `const formulari = document.querySelector("#formulari");
const campImport = document.querySelector("#import");
const selector = document.querySelector("#percentatge");
const error = document.querySelector("#error");
const resultat = document.querySelector("#resultat");

formulari.addEventListener("submit", (event) => {
  event.preventDefault();

  const importCompte = Number(campImport.value.trim());
  const percentatge = Number(selector.value);

  if (Number.isNaN(importCompte) || importCompte <= 0) {
    error.textContent = "Escriu un import vàlid.";
    resultat.textContent = "";
    campImport.setAttribute("aria-invalid", "true");
    campImport.focus();
    return;
  }

  error.textContent = "";
  campImport.removeAttribute("aria-invalid");

  const propina = importCompte * percentatge / 100;
  resultat.textContent = \`Propina: \${propina} € · Total: \${importCompte + propina} €\`;
});`,
    explanation: "El camp buit no necessita una comprovació a part: `Number(\"\")` dona 0, i el 0 ja queda descartat per `importCompte <= 0`. Amb alguns imports veuràs resultats amb molts decimals: els ordinadors no representen exactament tots els nombres decimals, i arrodonir-los és una feina a part.",
  },
  {
    id: 'reserva-taula',
    level: 3,
    title: 'Reserva una taula',
    statement: [
      "Fes funcionar el formulari de reserves d'un restaurant. El nom és obligatori («Escriu un nom.») i el nombre de persones ha de ser un nombre entre 1 i 8 («Han de ser entre 1 i 8 persones.»). Els dos errors s'han de mostrar alhora, cadascun sota el seu camp.",
      "Si tot és correcte, afegeix la reserva a l'array `reserves`, torna a pintar la llista i buida el formulari. Cada reserva es mostra com «Marta · 4 persones · terrassa» (o «interior», si la casella no està marcada), i a sota hi ha d'haver el total de persones: «Total: 4 persones».",
    ],
    expected: "Enviar el formulari buit mostra els dos errors. Una reserva correcta apareix a la llista, el total de persones augmenta i el formulari queda net, amb el cursor al nom.",
    html: `<form id="formulari" novalidate>
  <label for="nom">Nom de la reserva</label>
  <input type="text" id="nom" autocomplete="off" aria-describedby="error-nom">
  <p id="error-nom" class="error" role="alert"></p>

  <label for="persones">Nombre de persones</label>
  <input type="text" id="persones" inputmode="numeric" autocomplete="off" aria-describedby="error-persones">
  <p id="error-persones" class="error" role="alert"></p>

  <label><input type="checkbox" id="terrassa"> A la terrassa</label>

  <button type="submit">Reserva</button>
</form>

<h2>Reserves</h2>
<ul id="llista"></ul>
<p id="total"></p>`,
    css: FORM_CSS,
    starter: `const reserves = [];

const formulari = document.querySelector("#formulari");
const campNom = document.querySelector("#nom");
const campPersones = document.querySelector("#persones");
const casellaTerrassa = document.querySelector("#terrassa");
const errorNom = document.querySelector("#error-nom");
const errorPersones = document.querySelector("#error-persones");
const llista = document.querySelector("#llista");
const total = document.querySelector("#total");

function validarNom(text) {

}

function validarPersones(text) {

}

function renderitzar() {

}

formulari.addEventListener("submit", (event) => {

});

renderitzar();`,
    hint: [
      "Les dues funcions de validació retornen un missatge o un text buit. Al listener, crida-les totes dues i escriu **sempre** el resultat a cada paràgraf d'error: si és un text buit, l'error anterior s'esborra sol.",
      "Si algun dels dos missatges no és buit, surt amb `return`. Si no, fes `reserves.push({ … })` amb les tres dades (`casellaTerrassa.checked` és el booleà de la casella), crida `renderitzar()` i després `formulari.reset()`.",
    ],
    solution: `const reserves = [];

const formulari = document.querySelector("#formulari");
const campNom = document.querySelector("#nom");
const campPersones = document.querySelector("#persones");
const casellaTerrassa = document.querySelector("#terrassa");
const errorNom = document.querySelector("#error-nom");
const errorPersones = document.querySelector("#error-persones");
const llista = document.querySelector("#llista");
const total = document.querySelector("#total");

function validarNom(text) {
  if (text === "") {
    return "Escriu un nom.";
  }
  return "";
}

function validarPersones(text) {
  const persones = Number(text);
  if (text === "" || Number.isNaN(persones) || persones < 1 || persones > 8) {
    return "Han de ser entre 1 i 8 persones.";
  }
  return "";
}

function renderitzar() {
  llista.innerHTML = "";
  let persones = 0;

  for (const reserva of reserves) {
    let lloc = "interior";
    if (reserva.terrassa) {
      lloc = "terrassa";
    }

    const element = document.createElement("li");
    element.textContent = \`\${reserva.nom} · \${reserva.persones} persones · \${lloc}\`;
    llista.append(element);

    persones += reserva.persones;
  }

  total.textContent = \`Total: \${persones} persones\`;
}

formulari.addEventListener("submit", (event) => {
  event.preventDefault();

  const nom = campNom.value.trim();
  const persones = campPersones.value.trim();

  const missatgeNom = validarNom(nom);
  const missatgePersones = validarPersones(persones);

  errorNom.textContent = missatgeNom;
  errorPersones.textContent = missatgePersones;

  if (missatgeNom !== "" || missatgePersones !== "") {
    return;
  }

  reserves.push({ nom: nom, persones: Number(persones), terrassa: casellaTerrassa.checked });
  renderitzar();
  formulari.reset();
  campNom.focus();
});

renderitzar();`,
    explanation: [
      "Per mostrar els dos errors alhora no es pot sortir amb `return` al primer: es validen els dos camps, s'escriuen els dos resultats i només llavors es decideix si es continua.",
      "A l'array es guarda `Number(persones)` i no el text: així el total es pot sumar. Si es guardés el text, `persones += reserva.persones` enganxaria xifres en lloc de sumar-les, i tres reserves de 4, 2 i 3 persones donarien «0423».",
    ],
  },
];
