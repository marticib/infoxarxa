// Codi del projecte final (gestor de tasques).
//
// El JavaScript està dividit en peces per poder mostrar el projecte fase a
// fase: cada fase és la suma de les peces que ja s'han explicat. La portada i
// la unitat 11 fan servir aquest mateix codi.

// ---------------------------------------------------------------------------
// HTML i CSS de la versió base (fases 1 a 7)
// ---------------------------------------------------------------------------

export const PROJECT_HTML = `<main class="app">
  <h1>Les meves tasques</h1>

  <form id="formulari" novalidate>
    <label for="text-tasca">Nova tasca</label>
    <div class="fila">
      <input type="text" id="text-tasca" autocomplete="off" aria-describedby="error-tasca">
      <button type="submit">Afegeix</button>
    </div>
    <p id="error-tasca" class="error" role="alert"></p>
  </form>

  <div class="filtres" role="group" aria-label="Filtra les tasques">
    <button type="button" id="filtre-totes" aria-pressed="true">Totes</button>
    <button type="button" id="filtre-pendents" aria-pressed="false">Pendents</button>
    <button type="button" id="filtre-completades" aria-pressed="false">Completades</button>
  </div>

  <ul id="llista"></ul>
  <p id="buit" class="buit" hidden>No hi ha tasques per mostrar.</p>
  <p id="comptador" class="comptador"></p>
</main>`;

export const PROJECT_CSS = `body {
  margin: 0;
  padding: 16px;
  font-family: system-ui, sans-serif;
  color: #1b2233;
  background: #eef1f8;
}

.app {
  max-width: 480px;
  margin: 0 auto;
  padding: 20px;
  background: #ffffff;
  border-radius: 12px;
}

h1 {
  margin: 0 0 16px;
  font-size: 1.5rem;
}

label {
  display: block;
  margin-bottom: 4px;
  font-weight: 600;
}

.fila {
  display: flex;
  gap: 8px;
}

input[type="text"] {
  flex: 1;
  min-width: 0;
  padding: 10px;
  border: 1px solid #8a94a8;
  border-radius: 8px;
}

input[aria-invalid="true"] {
  border: 2px solid #b3261e;
}

button {
  padding: 10px 14px;
  font-weight: 600;
  color: #ffffff;
  background: #3451d1;
  border: 0;
  border-radius: 8px;
  cursor: pointer;
}

.error {
  min-height: 1.5em;
  margin: 4px 0 12px;
  font-weight: 600;
  color: #b3261e;
}

.filtres {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-bottom: 12px;
}

.filtres button {
  color: #1b2233;
  background: #e3e7f2;
}

.filtres button[aria-pressed="true"] {
  color: #ffffff;
  background: #1b2233;
}

#llista {
  margin: 0;
  padding: 0;
  list-style: none;
}

.tasca {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 10px 0;
  border-bottom: 1px solid #dfe3ee;
}

.tasca input[type="checkbox"] {
  flex: none;
  width: 20px;
  height: 20px;
}

.tasca span,
.tasca label {
  flex: 1;
  margin: 0;
  font-weight: 400;
}

.tasca.completada span,
.tasca.completada label {
  color: #5d6780;
  text-decoration: line-through;
}

.tasca button {
  padding: 6px 10px;
  color: #b3261e;
  background: #fdecea;
}

.buit {
  margin: 0;
  padding: 24px 0;
  text-align: center;
  color: #5d6780;
}

.comptador {
  margin: 12px 0 0;
  font-weight: 600;
}`;

// ---------------------------------------------------------------------------
// Peces de JavaScript
// ---------------------------------------------------------------------------

export const STATE = `// ---------- 1. Estat: les dades de l'aplicació ----------
let tasques = [
  { id: 1, text: "Estudiar JavaScript", completada: true },
  { id: 2, text: "Fer el projecte final", completada: false }
];
let seguentId = 3;`;

export const STATE_FILTER = `${STATE}
let filtreActual = "totes";`;

export const ELEMENTS_LIST = `// ---------- 2. Elements de la pàgina ----------
const llista = document.querySelector("#llista");
const missatgeBuit = document.querySelector("#buit");`;

export const ELEMENTS_FORM = `const formulari = document.querySelector("#formulari");
const inputTasca = document.querySelector("#text-tasca");
const errorTasca = document.querySelector("#error-tasca");`;

export const ELEMENTS_FILTERS = `const comptador = document.querySelector("#comptador");
const botoTotes = document.querySelector("#filtre-totes");
const botoPendents = document.querySelector("#filtre-pendents");
const botoCompletades = document.querySelector("#filtre-completades");`;

export const FN_VALIDATE = `function validarTasca(text) {
  if (text === "") {
    return "Escriu el text de la tasca.";
  }
  if (text.length > 60) {
    return "El text és massa llarg (màxim 60 caràcters).";
  }
  return "";
}`;

export const FN_CREATE = `function crearTasca(text) {
  const tasca = { id: seguentId, text: text, completada: false };
  seguentId++;
  return tasca;
}

function afegirTasca(text) {
  tasques.push(crearTasca(text));
}`;

export const FN_TOGGLE = `function canviarEstat(id) {
  for (const tasca of tasques) {
    if (tasca.id === id) {
      tasca.completada = !tasca.completada;
    }
  }
}`;

export const FN_REMOVE = `function eliminarTasca(id) {
  const restants = [];
  for (const tasca of tasques) {
    if (tasca.id !== id) {
      restants.push(tasca);
    }
  }
  tasques = restants;
}`;

export const FN_VISIBLE = `function obtenirTasquesVisibles() {
  const visibles = [];
  for (const tasca of tasques) {
    if (filtreActual === "totes") {
      visibles.push(tasca);
    } else if (filtreActual === "pendents" && !tasca.completada) {
      visibles.push(tasca);
    } else if (filtreActual === "completades" && tasca.completada) {
      visibles.push(tasca);
    }
  }
  return visibles;
}`;

export const FN_COUNT = `function comptarPendents() {
  let pendents = 0;
  for (const tasca of tasques) {
    if (!tasca.completada) {
      pendents++;
    }
  }
  return pendents;
}`;

const DATA_HEADER = '// ---------- 3. Funcions que treballen amb les dades ----------';
const PAGE_HEADER = '// ---------- 4. Funcions que pinten la pàgina ----------';
const EVENTS_HEADER = '// ---------- 5. Esdeveniments ----------';

// Fase 2: només el text.
export const ELEMENT_V1 = `function crearElementTasca(tasca) {
  const element = document.createElement("li");
  element.classList.add("tasca");
  if (tasca.completada) {
    element.classList.add("completada");
  }

  const text = document.createElement("span");
  text.textContent = tasca.text;

  element.append(text);
  return element;
}`;

// Fase 4: casella per completar.
export const ELEMENT_V2 = `function crearElementTasca(tasca) {
  const element = document.createElement("li");
  element.classList.add("tasca");
  if (tasca.completada) {
    element.classList.add("completada");
  }

  const casella = document.createElement("input");
  casella.type = "checkbox";
  casella.id = \`tasca-\${tasca.id}\`;
  casella.checked = tasca.completada;
  casella.addEventListener("change", () => {
    canviarEstat(tasca.id);
    renderitzar();
  });

  const etiqueta = document.createElement("label");
  etiqueta.setAttribute("for", casella.id);
  etiqueta.textContent = tasca.text;

  element.append(casella, etiqueta);
  return element;
}`;

// Fase 5: botó per eliminar.
export const ELEMENT_V3 = `function crearElementTasca(tasca) {
  const element = document.createElement("li");
  element.classList.add("tasca");
  if (tasca.completada) {
    element.classList.add("completada");
  }

  const casella = document.createElement("input");
  casella.type = "checkbox";
  casella.id = \`tasca-\${tasca.id}\`;
  casella.checked = tasca.completada;
  casella.addEventListener("change", () => {
    canviarEstat(tasca.id);
    renderitzar();
  });

  const etiqueta = document.createElement("label");
  etiqueta.setAttribute("for", casella.id);
  etiqueta.textContent = tasca.text;

  const botoEliminar = document.createElement("button");
  botoEliminar.type = "button";
  botoEliminar.textContent = "Elimina";
  botoEliminar.setAttribute("aria-label", \`Elimina la tasca: \${tasca.text}\`);
  botoEliminar.addEventListener("click", () => {
    eliminarTasca(tasca.id);
    renderitzar();
  });

  element.append(casella, etiqueta, botoEliminar);
  return element;
}`;

// Fase 7: el focus no es perd en tornar a pintar.
export const ELEMENT_V4 = `function crearElementTasca(tasca) {
  const element = document.createElement("li");
  element.classList.add("tasca");
  if (tasca.completada) {
    element.classList.add("completada");
  }

  const casella = document.createElement("input");
  casella.type = "checkbox";
  casella.id = \`tasca-\${tasca.id}\`;
  casella.checked = tasca.completada;
  casella.addEventListener("change", () => {
    canviarEstat(tasca.id);
    renderitzar();
    // La casella d'abans ja no existeix: tornem el focus a la nova.
    const novaCasella = document.querySelector(\`#tasca-\${tasca.id}\`);
    if (novaCasella !== null) {
      novaCasella.focus();
    }
  });

  const etiqueta = document.createElement("label");
  etiqueta.setAttribute("for", casella.id);
  etiqueta.textContent = tasca.text;

  const botoEliminar = document.createElement("button");
  botoEliminar.type = "button";
  botoEliminar.textContent = "Elimina";
  botoEliminar.setAttribute("aria-label", \`Elimina la tasca: \${tasca.text}\`);
  botoEliminar.addEventListener("click", () => {
    eliminarTasca(tasca.id);
    renderitzar();
    inputTasca.focus();
  });

  element.append(casella, etiqueta, botoEliminar);
  return element;
}`;

export const RENDER_V1 = `function renderitzar() {
  llista.innerHTML = "";
  for (const tasca of tasques) {
    llista.append(crearElementTasca(tasca));
  }
  missatgeBuit.hidden = tasques.length > 0;
}`;

// Fase 6: filtres i comptador.
export const RENDER_V2 = `function renderitzar() {
  const visibles = obtenirTasquesVisibles();

  llista.innerHTML = "";
  for (const tasca of visibles) {
    llista.append(crearElementTasca(tasca));
  }
  missatgeBuit.hidden = visibles.length > 0;

  const pendents = comptarPendents();
  if (pendents === 1) {
    comptador.textContent = "1 tasca pendent";
  } else {
    comptador.textContent = \`\${pendents} tasques pendents\`;
  }

  botoTotes.setAttribute("aria-pressed", String(filtreActual === "totes"));
  botoPendents.setAttribute("aria-pressed", String(filtreActual === "pendents"));
  botoCompletades.setAttribute("aria-pressed", String(filtreActual === "completades"));
}`;

export const EVENT_SUBMIT = `formulari.addEventListener("submit", (event) => {
  event.preventDefault();

  const text = inputTasca.value.trim();
  const error = validarTasca(text);

  if (error !== "") {
    errorTasca.textContent = error;
    inputTasca.setAttribute("aria-invalid", "true");
    inputTasca.focus();
    return;
  }

  errorTasca.textContent = "";
  inputTasca.removeAttribute("aria-invalid");
  afegirTasca(text);
  inputTasca.value = "";
  inputTasca.focus();
  renderitzar();
});`;

export const EVENT_FILTERS = `function canviarFiltre(nouFiltre) {
  filtreActual = nouFiltre;
  renderitzar();
}

botoTotes.addEventListener("click", () => canviarFiltre("totes"));
botoPendents.addEventListener("click", () => canviarFiltre("pendents"));
botoCompletades.addEventListener("click", () => canviarFiltre("completades"));`;

export const START = `// ---------- Arrencada ----------
renderitzar();`;

const program = (...parts) => parts.join('\n\n');

// ---------------------------------------------------------------------------
// El programa complet a cada fase
// ---------------------------------------------------------------------------

export const PHASE_JS = {
  render: program(STATE, ELEMENTS_LIST, PAGE_HEADER, ELEMENT_V1, RENDER_V1, START),

  add: program(
    STATE,
    `${ELEMENTS_LIST}\n${ELEMENTS_FORM}`,
    DATA_HEADER,
    FN_VALIDATE,
    FN_CREATE,
    PAGE_HEADER,
    ELEMENT_V1,
    RENDER_V1,
    EVENTS_HEADER,
    EVENT_SUBMIT,
    START
  ),

  toggle: program(
    STATE,
    `${ELEMENTS_LIST}\n${ELEMENTS_FORM}`,
    DATA_HEADER,
    FN_VALIDATE,
    FN_CREATE,
    FN_TOGGLE,
    PAGE_HEADER,
    ELEMENT_V2,
    RENDER_V1,
    EVENTS_HEADER,
    EVENT_SUBMIT,
    START
  ),

  remove: program(
    STATE,
    `${ELEMENTS_LIST}\n${ELEMENTS_FORM}`,
    DATA_HEADER,
    FN_VALIDATE,
    FN_CREATE,
    FN_TOGGLE,
    FN_REMOVE,
    PAGE_HEADER,
    ELEMENT_V3,
    RENDER_V1,
    EVENTS_HEADER,
    EVENT_SUBMIT,
    START
  ),

  filter: program(
    STATE_FILTER,
    `${ELEMENTS_LIST}\n${ELEMENTS_FORM}\n${ELEMENTS_FILTERS}`,
    DATA_HEADER,
    FN_VALIDATE,
    FN_CREATE,
    FN_TOGGLE,
    FN_REMOVE,
    FN_VISIBLE,
    FN_COUNT,
    PAGE_HEADER,
    ELEMENT_V3,
    RENDER_V2,
    EVENTS_HEADER,
    EVENT_SUBMIT,
    EVENT_FILTERS,
    START
  ),

  polish: program(
    STATE_FILTER,
    `${ELEMENTS_LIST}\n${ELEMENTS_FORM}\n${ELEMENTS_FILTERS}`,
    DATA_HEADER,
    FN_VALIDATE,
    FN_CREATE,
    FN_TOGGLE,
    FN_REMOVE,
    FN_VISIBLE,
    FN_COUNT,
    PAGE_HEADER,
    ELEMENT_V4,
    RENDER_V2,
    EVENTS_HEADER,
    EVENT_SUBMIT,
    EVENT_FILTERS,
    START
  ),
};

/** El projecte base complet (totes les funcionalitats mínimes). */
export const PROJECT_JS = PHASE_JS.polish;

// ---------------------------------------------------------------------------
// Versió amb totes les ampliacions
// ---------------------------------------------------------------------------

export const PROJECT_HTML_FULL = `<main class="app">
  <div class="capcalera">
    <h1>Les meves tasques</h1>
    <button type="button" id="boto-tema" aria-pressed="false">Mode fosc</button>
  </div>

  <form id="formulari" novalidate>
    <label for="text-tasca">Nova tasca</label>
    <div class="fila">
      <input type="text" id="text-tasca" autocomplete="off" aria-describedby="error-tasca">
      <button type="submit">Afegeix</button>
    </div>
    <p id="error-tasca" class="error" role="alert"></p>
  </form>

  <div class="filtres" role="group" aria-label="Filtra les tasques">
    <button type="button" id="filtre-totes" aria-pressed="true">Totes</button>
    <button type="button" id="filtre-pendents" aria-pressed="false">Pendents</button>
    <button type="button" id="filtre-completades" aria-pressed="false">Completades</button>
  </div>

  <ul id="llista"></ul>
  <p id="buit" class="buit" hidden>No hi ha tasques per mostrar.</p>

  <div class="peu">
    <p id="comptador" class="comptador"></p>
    <button type="button" id="netejar">Elimina les completades</button>
  </div>
</main>`;

export const PROJECT_CSS_FULL = `${PROJECT_CSS}

/* ---------- Ampliacions ---------- */

.capcalera,
.peu {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
}

.capcalera {
  margin-bottom: 16px;
}

.capcalera h1 {
  margin: 0;
}

.peu {
  margin-top: 12px;
}

.peu .comptador {
  margin: 0;
}

#boto-tema,
#netejar {
  padding: 6px 10px;
  color: #1b2233;
  background: #e3e7f2;
}

button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.tasca .secundari {
  color: #1b2233;
  background: #e3e7f2;
}

.edicio {
  display: flex;
  flex: 1;
  flex-wrap: wrap;
  gap: 8px;
}

.tasca .error {
  flex-basis: 100%;
  margin: 0;
}

/* Mode fosc: només canviem colors */
body.fosc {
  color: #e7eaf3;
  background: #0e121b;
}

body.fosc .app {
  background: #1b2130;
}

body.fosc input[type="text"] {
  color: #e7eaf3;
  background: #0e121b;
  border-color: #5d6780;
}

body.fosc .tasca {
  border-bottom-color: #343d52;
}

body.fosc .tasca.completada label,
body.fosc .buit {
  color: #a5aec5;
}

body.fosc .error {
  color: #ffa094;
}

body.fosc .filtres button,
body.fosc #boto-tema,
body.fosc #netejar,
body.fosc .tasca .secundari {
  color: #e7eaf3;
  background: #343d52;
}

body.fosc .filtres button[aria-pressed="true"],
body.fosc #boto-tema[aria-pressed="true"] {
  color: #0e121b;
  background: #e7eaf3;
}`;

export const PROJECT_JS_FULL = `// ---------- 1. Estat: les dades de l'aplicació ----------
const CLAU_TASQUES = "tasques";
const CLAU_TEMA = "tema";

let tasques = [
  { id: 1, text: "Estudiar JavaScript", completada: true },
  { id: 2, text: "Fer el projecte final", completada: false }
];
let seguentId = 3;
let filtreActual = "totes";
let idEnEdicio = null;

// ---------- 2. Elements de la pàgina ----------
const llista = document.querySelector("#llista");
const missatgeBuit = document.querySelector("#buit");
const formulari = document.querySelector("#formulari");
const inputTasca = document.querySelector("#text-tasca");
const errorTasca = document.querySelector("#error-tasca");
const comptador = document.querySelector("#comptador");
const botoTotes = document.querySelector("#filtre-totes");
const botoPendents = document.querySelector("#filtre-pendents");
const botoCompletades = document.querySelector("#filtre-completades");
const botoNetejar = document.querySelector("#netejar");
const botoTema = document.querySelector("#boto-tema");

// ---------- 3. Funcions que treballen amb les dades ----------
${FN_VALIDATE}

${FN_CREATE}

${FN_TOGGLE}

${FN_REMOVE}

function eliminarCompletades() {
  const pendents = [];
  for (const tasca of tasques) {
    if (!tasca.completada) {
      pendents.push(tasca);
    }
  }
  tasques = pendents;
}

${FN_VISIBLE}

${FN_COUNT}

// ---------- 4. Guardar i recuperar (localStorage) ----------
function guardarTasques() {
  localStorage.setItem(CLAU_TASQUES, JSON.stringify(tasques));
}

function carregarTasques() {
  const text = localStorage.getItem(CLAU_TASQUES);
  if (text !== null) {
    tasques = JSON.parse(text);
    seguentId = 1;
    for (const tasca of tasques) {
      if (tasca.id >= seguentId) {
        seguentId = tasca.id + 1;
      }
    }
  }
}

function aplicarTema(esFosc) {
  if (esFosc) {
    document.body.classList.add("fosc");
  } else {
    document.body.classList.remove("fosc");
  }
  botoTema.setAttribute("aria-pressed", String(esFosc));
}

// ---------- 5. Funcions que pinten la pàgina ----------
function crearElementEdicio(tasca) {
  const element = document.createElement("li");
  element.classList.add("tasca");

  const formulariEdicio = document.createElement("form");
  formulariEdicio.classList.add("edicio");

  const camp = document.createElement("input");
  camp.type = "text";
  camp.id = "camp-edicio";
  camp.value = tasca.text;
  camp.setAttribute("aria-label", "Text de la tasca");

  const botoDesar = document.createElement("button");
  botoDesar.type = "submit";
  botoDesar.textContent = "Desa";

  const botoCancelar = document.createElement("button");
  botoCancelar.type = "button";
  botoCancelar.classList.add("secundari");
  botoCancelar.textContent = "Cancel·la";
  botoCancelar.addEventListener("click", () => {
    idEnEdicio = null;
    renderitzar();
  });

  const errorEdicio = document.createElement("p");
  errorEdicio.classList.add("error");
  errorEdicio.setAttribute("role", "alert");

  formulariEdicio.addEventListener("submit", (event) => {
    event.preventDefault();
    const text = camp.value.trim();
    const error = validarTasca(text);
    if (error !== "") {
      errorEdicio.textContent = error;
      camp.focus();
      return;
    }
    tasca.text = text;
    idEnEdicio = null;
    actualitzar();
  });

  formulariEdicio.append(camp, botoDesar, botoCancelar);
  element.append(formulariEdicio, errorEdicio);
  return element;
}

function crearElementTasca(tasca) {
  if (tasca.id === idEnEdicio) {
    return crearElementEdicio(tasca);
  }

  const element = document.createElement("li");
  element.classList.add("tasca");
  if (tasca.completada) {
    element.classList.add("completada");
  }

  const casella = document.createElement("input");
  casella.type = "checkbox";
  casella.id = \`tasca-\${tasca.id}\`;
  casella.checked = tasca.completada;
  casella.addEventListener("change", () => {
    canviarEstat(tasca.id);
    actualitzar();
    const novaCasella = document.querySelector(\`#tasca-\${tasca.id}\`);
    if (novaCasella !== null) {
      novaCasella.focus();
    }
  });

  const etiqueta = document.createElement("label");
  etiqueta.setAttribute("for", casella.id);
  etiqueta.textContent = tasca.text;

  const botoEditar = document.createElement("button");
  botoEditar.type = "button";
  botoEditar.classList.add("secundari");
  botoEditar.textContent = "Edita";
  botoEditar.setAttribute("aria-label", \`Edita la tasca: \${tasca.text}\`);
  botoEditar.addEventListener("click", () => {
    idEnEdicio = tasca.id;
    renderitzar();
    document.querySelector("#camp-edicio").focus();
  });

  const botoEliminar = document.createElement("button");
  botoEliminar.type = "button";
  botoEliminar.textContent = "Elimina";
  botoEliminar.setAttribute("aria-label", \`Elimina la tasca: \${tasca.text}\`);
  botoEliminar.addEventListener("click", () => {
    eliminarTasca(tasca.id);
    actualitzar();
    inputTasca.focus();
  });

  element.append(casella, etiqueta, botoEditar, botoEliminar);
  return element;
}

${RENDER_V2.replace(
  '  botoTotes.setAttribute',
  '  botoNetejar.disabled = pendents === tasques.length;\n\n  botoTotes.setAttribute'
)}

// Cada cop que les dades canvien: les guardem i tornem a pintar.
function actualitzar() {
  guardarTasques();
  renderitzar();
}

// ---------- 6. Esdeveniments ----------
${EVENT_SUBMIT.replace('  renderitzar();\n});', '  actualitzar();\n});')}

${EVENT_FILTERS}

botoNetejar.addEventListener("click", () => {
  eliminarCompletades();
  actualitzar();
});

botoTema.addEventListener("click", () => {
  const esFosc = !document.body.classList.contains("fosc");
  aplicarTema(esFosc);
  localStorage.setItem(CLAU_TEMA, String(esFosc));
});

// ---------- Arrencada ----------
carregarTasques();
aplicarTema(localStorage.getItem(CLAU_TEMA) === "true");
renderitzar();`;

// ---------------------------------------------------------------------------
// Versió base que ja guarda les tasques (punt de partida de l'exercici final)
// ---------------------------------------------------------------------------

export const SAVE_FUNCTIONS = `// ---------- Guardar (localStorage) ----------
const CLAU_TASQUES = "tasques";

function guardarTasques() {
  localStorage.setItem(CLAU_TASQUES, JSON.stringify(tasques));
}

// Cada cop que les dades canvien: les guardem i tornem a pintar.
function actualitzar() {
  guardarTasques();
  renderitzar();
}`;

export const PROJECT_JS_SAVE = PROJECT_JS.replace(
  'canviarEstat(tasca.id);\n    renderitzar();',
  'canviarEstat(tasca.id);\n    actualitzar();'
)
  .replace('eliminarTasca(tasca.id);\n    renderitzar();', 'eliminarTasca(tasca.id);\n    actualitzar();')
  .replace('  inputTasca.focus();\n  renderitzar();\n});', '  inputTasca.focus();\n  actualitzar();\n});')
  .replace(EVENTS_HEADER, `${SAVE_FUNCTIONS}\n\n${EVENTS_HEADER}`)
  .replace(START, `// ---------- Arrencada ----------
// Falta recuperar les tasques guardades abans de pintar
renderitzar();`);

/** Demostració de la portada: el projecte amb totes les ampliacions. */
export const projectDemo = {
  html: PROJECT_HTML_FULL,
  css: PROJECT_CSS_FULL,
  js: PROJECT_JS_FULL,
};
