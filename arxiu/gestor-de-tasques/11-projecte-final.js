import { p, list, steps, code, example, concept, warning, project, table, custom } from '../blocks.js';
import {
  PROJECT_HTML,
  PROJECT_CSS,
  PROJECT_HTML_FULL,
  PROJECT_CSS_FULL,
  PROJECT_JS,
  PROJECT_JS_SAVE,
  PROJECT_JS_FULL,
  PHASE_JS,
  STATE,
  ELEMENTS_LIST,
  ELEMENTS_FORM,
  ELEMENTS_FILTERS,
  FN_VALIDATE,
  FN_CREATE,
  FN_TOGGLE,
  FN_REMOVE,
  FN_VISIBLE,
  FN_COUNT,
  ELEMENT_V1,
  ELEMENT_V2,
  RENDER_V1,
  RENDER_V2,
  EVENT_SUBMIT,
  EVENT_FILTERS,
  START,
} from '../projectCode.js';

const indent = (text, spaces) =>
  text
    .split('\n')
    .map((line) => (line === '' ? line : ' '.repeat(spaces) + line))
    .join('\n');

const INDEX_HTML = `<!DOCTYPE html>
<html lang="ca">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Les meves tasques</title>
    <link rel="stylesheet" href="estils.css">
    <script src="app.js" defer></script>
  </head>
  <body>
${indent(PROJECT_HTML, 4)}
  </body>
</html>`;

export default {
  id: 'projecte-final',
  number: 11,
  title: 'Projecte final: gestor de tasques',
  shortTitle: 'Projecte final',
  description:
    "Totes les peces del dossier, muntades en una aplicació completa. La construiràs per fases, i cada fase acaba amb alguna cosa que funciona.",

  problem: {
    title: "Tenim totes les peces, però encara no tenim l'aplicació",
    text: [
      "Al llarg de deu unitats has anat construint parts d'un gestor de tasques: variables per a les dades, condicionals per decidir, bucles per recórrer, funcions per organitzar, arrays d'objectes per guardar, el DOM per pintar, esdeveniments per escoltar i validació per filtrar. Cada part funcionava, però per separat.",
      "Ara toca ajuntar-ho. La dificultat d'aquesta unitat no és cap concepte nou: és **l'ordre**. Si intentes escriure-ho tot de cop, et trobaràs amb cent línies que no funcionen i sense saber per on començar a buscar. Per això ho farem a poc a poc, fase a fase, comprovant cada pas abans de fer el següent.",
    ],
  },

  goals: [
    "Organitzar un programa en quatre zones: estat, funcions de dades, funcions de pàgina i esdeveniments.",
    "Construir una aplicació de manera incremental, provant cada fase.",
    "Implementar afegir, validar, mostrar, completar, eliminar i filtrar tasques.",
    "Guardar i recuperar dades amb `localStorage` com a ampliació.",
  ],

  projectPiece:
    "Aquesta unitat **és** el projecte. Quan l'acabis tindràs una aplicació completa, feta per tu, que podràs ensenyar i continuar ampliant.",

  sections: [
    {
      id: 'com-treballarem',
      title: 'Abans de començar: el pla',
      blocks: [
        p("Construirem el gestor de tasques que has vist a la portada. Aquestes són les funcionalitats que ha de tenir quan acabem:"),
        list(
          "Afegir una tasca, validant que el text no sigui buit.",
          "Mostrar totes les tasques, i un estat buit quan no n'hi hagi cap.",
          "Marcar una tasca com a completada i desmarcar-la.",
          "Eliminar una tasca.",
          "Filtrar entre totes, pendents i completades.",
          "Mostrar el nombre de tasques pendents."
        ),
        p("Tot el JavaScript anirà en un sol fitxer, `app.js`, organitzat sempre en el mateix ordre. Aquesta estructura és el que evitarà que el codi es converteixi en un embolic:"),
        table(
          ['Zona', 'Què hi ha', 'Exemples'],
          [
            ['**1. Estat**', "Les dades de l'aplicació", '`tasques`, `filtreActual`, `seguentId`'],
            ['**2. Elements**', 'Les referències als elements de la pàgina', '`llista`, `formulari`, `inputTasca`'],
            ['**3. Funcions de dades**', "Llegeixen o modifiquen l'estat. No toquen la pàgina.", '`validarTasca`, `afegirTasca`, `eliminarTasca`'],
            ['**4. Funcions de pàgina**', "Pinten la pàgina a partir de l'estat.", '`crearElementTasca`, `renderitzar`'],
            ['**5. Esdeveniments**', 'Connecten les accions de la persona amb les funcions.', 'Els `addEventListener`'],
          ],
          "L'estructura d'app.js"
        ),
        concept(
          'Una sola direcció',
          "Els esdeveniments criden funcions de dades, que canvien l'estat. Després es crida `renderitzar`, que pinta la pàgina a partir de l'estat. Mai al revés: cap funció llegeix la pàgina per saber quines tasques hi ha. Les dades són a l'array, i la pàgina només n'és el reflex."
        ),
        p("Com has de treballar:"),
        steps(
          "Crea una carpeta nova amb tres fitxers: `index.html`, `estils.css` i `app.js`.",
          "A cada fase, **escriu el codi al teu projecte**, a mà. No el copiïs: escriure'l és el que fa que l'entenguis.",
          "Obre la pàgina al navegador, amb la consola oberta, i comprova que fa el que diu la fase.",
          "No passis a la fase següent fins que l'actual funcioni. Si alguna cosa falla, aplica el mètode de la unitat anterior."
        ),
        p("A cada fase trobaràs un exemple executable amb el programa sencer tal com ha de quedar en aquell punt. Fes-lo servir per comparar-lo amb el teu, no com a punt de partida."),
      ],
    },

    {
      id: 'fase-1',
      label: 'Fase 1',
      title: "L'esquelet: HTML i CSS",
      blocks: [
        p("Abans d'escriure JavaScript necessitem una pàgina per fer-lo funcionar. Aquesta fase no té res de nou per a tu, però val la pena mirar l'HTML amb atenció, perquè cada decisió està presa pensant en el codi que vindrà."),
        code(INDEX_HTML, { lang: 'html', title: 'index.html' }),
        list(
          "Cada element que JavaScript haurà de trobar té un **`id`**: el formulari, el camp, el paràgraf d'error, la llista, els botons de filtre.",
          "La **llista és buida**. Les tasques no s'escriuen a l'HTML: les crearà JavaScript a partir de les dades.",
          "El formulari té **`novalidate`** perquè la validació la farem nosaltres.",
          "El paràgraf d'error ja existeix, buit, amb **`role=\"alert\"`** i enllaçat al camp amb **`aria-describedby`**.",
          "El missatge d'estat buit també hi és, amagat amb **`hidden`**. JavaScript només haurà de mostrar-lo o amagar-lo.",
          "Els filtres són **botons de veritat**, amb `aria-pressed` per indicar quin està actiu.",
          "L'script es carrega amb **`defer`**."
        ),
        code(PROJECT_CSS, { lang: 'css', title: 'estils.css' }),
        p("El CSS no té cap secret, però fixa't en tres selectors que depenen del que farà JavaScript: `.tasca.completada`, que ratlla el text quan posem la classe; `input[aria-invalid=\"true\"]`, que marca el camp quan hi ha un error; i `.filtres button[aria-pressed=\"true\"]`, que destaca el filtre actiu."),
        example({
          title: 'Fase 1: la pàgina, encara sense vida',
          intro: "Només HTML i CSS, i una línia de JavaScript per confirmar que el fitxer està connectat. Prova d'escriure una tasca i prémer «Afegeix».",
          html: PROJECT_HTML,
          css: PROJECT_CSS,
          js: `console.log("Gestor de tasques en marxa");`,
          expected: "La pàgina es veu completa, però la llista és buida. En enviar el formulari, la pàgina es recarrega.",
          why: "És el punt de partida de la unitat 1: tenim un botó, però encara no fa res. La recàrrega passa perquè ningú escolta l'esdeveniment `submit`. El missatge de la consola confirma que `app.js` està ben enllaçat: no continuïs fins que el vegis al teu projecte.",
        }),
      ],
    },

    {
      id: 'fase-2',
      label: 'Fase 2',
      title: "L'estat i la primera pintada",
      blocks: [
        p("Comencem pel centre de l'aplicació: les dades. Tot el que el gestor sap és en dues variables. Les declarem amb `let` perquè, com vam veure a la unitat 6, eliminar una tasca vol dir substituir l'array per un de nou."),
        code(STATE),
        p("Hi posem dues tasques de mostra per tenir alguna cosa a pintar. `seguentId` guarda l'identificador que rebrà la pròxima tasca que es creï."),
        p("Després, les referències als elements que farem servir en aquesta fase. Es busquen una sola vegada, al principi:"),
        code(ELEMENTS_LIST),
        p("I ara, la pintada. La dividim en dues funcions, cadascuna amb una feina. La primera rep **una** tasca i retorna l'element `<li>` que la representa:"),
        code(ELEMENT_V1),
        p("La segona pinta **tota** la llista: la buida, crea un element per a cada tasca i decideix si s'ha de veure el missatge d'estat buit."),
        code(RENDER_V1),
        p("Fixa't en l'última línia de `renderitzar`: `tasques.length > 0` ja és un booleà, i s'assigna directament a `hidden`. Si hi ha tasques, el missatge s'amaga; si no n'hi ha, es mostra."),
        p("Finalment, la crida que ho posa tot en marxa. Sense ella, les funcions estarien declarades però ningú les executaria:"),
        code(START),
        example({
          title: 'Fase 2: les tasques apareixen',
          intro: "El programa sencer fins aquí. Les dues tasques de mostra surten a la pàgina, la primera ratllada.",
          html: PROJECT_HTML,
          css: PROJECT_CSS,
          js: PHASE_JS.render,
          expected: "Dues tasques a la llista: «Estudiar JavaScript», ratllada, i «Fer el projecte final».",
          why: "Les tasques ja no són a l'HTML ni estan escrites dins de les funcions: surten de l'array. Prova-ho: afegeix un tercer objecte a `tasques` i torna a executar. Després deixa l'array buit (`let tasques = [];`) per comprovar l'estat buit.",
        }),
        warning(
          'Comprova la fase abans de continuar',
          "Si al teu projecte no surten les tasques, mira la consola. Els sospitosos habituals: un `id` que no coincideix entre l'HTML i el `querySelector` (error «of null»), o haver-se oblidat de la crida final a `renderitzar()`."
        ),
      ],
    },

    {
      id: 'fase-3',
      label: 'Fase 3',
      title: 'Afegir tasques, amb validació',
      blocks: [
        p("Ara que la pintada funciona, podem deixar que la persona creï tasques. Necessitem tres elements més de la pàgina:"),
        code(ELEMENTS_FORM),
        p("A la zona de funcions de dades hi afegim la validació. És la mateixa idea de la unitat 9: rep un text i retorna un missatge d'error, o un text buit si és correcte."),
        code(FN_VALIDATE),
        p("També dues funcions petites per crear una tasca i afegir-la. `crearTasca` fabrica l'objecte i fa avançar `seguentId` perquè no hi hagi mai dos identificadors iguals; `afegirTasca` el posa a l'array."),
        code(FN_CREATE),
        p("I, a la zona d'esdeveniments, el listener del formulari. Segueix pas a pas la recepta de la unitat de formularis:"),
        code(EVENT_SUBMIT),
        list(
          "`preventDefault()` evita la recàrrega.",
          "El text es llegeix amb `trim()` i es passa per `validarTasca`.",
          "Si hi ha error: es mostra, es marca el camp, s'hi torna el focus i **se surt** amb `return`.",
          "Si no n'hi ha: s'esborra l'error, s'afegeix la tasca, es buida el camp, s'hi torna el focus i **es torna a pintar**."
        ),
        example({
          title: 'Fase 3: es poden crear tasques',
          intro: "Afegeix-ne unes quantes. Prova també d'enviar el camp buit, o només amb espais.",
          html: PROJECT_HTML,
          css: PROJECT_CSS,
          js: PHASE_JS.add,
          expected: "Les tasques noves apareixen al final de la llista. Un text buit mostra «Escriu el text de la tasca.» i no afegeix res.",
          why: "El listener no crea cap element: només crida `afegirTasca`, que modifica l'array, i `renderitzar`, que ho pinta tot de nou. És el cicle de la unitat 8: esdeveniment, dades, pintada.",
        }),
        concept(
          'La validació viu en una funció de dades',
          "`validarTasca` no sap res de formularis ni de camps: rep un text. Això vol dir que la podrem reutilitzar tal qual quan, a les ampliacions, calgui validar el text d'una tasca editada."
        ),
      ],
    },

    {
      id: 'fase-4',
      label: 'Fase 4',
      title: 'Completar i desmarcar',
      blocks: [
        p("Per marcar una tasca com a feta, cada tasca necessita una casella. Primer, la funció de dades: busca la tasca pel seu `id` i n'inverteix l'estat. Amb una sola funció tenim les dues operacions, completar i desmarcar."),
        code(FN_TOGGLE),
        p("Després ampliem `crearElementTasca`. On abans hi havia un `<span>` amb el text, ara hi haurà una casella i una etiqueta enllaçades:"),
        code(ELEMENT_V2),
        list(
          "La casella rep un `id` únic construït amb l'identificador de la tasca: `tasca-1`, `tasca-2`…",
          "L'etiqueta s'hi enllaça amb l'atribut `for`. Així es pot marcar fent clic al text, i un lector de pantalla llegeix el text de la tasca quan arriba a la casella.",
          "`casella.checked = tasca.completada` fa que la casella mostri l'estat real de la dada.",
          "El listener de `change` es crea en el mateix moment que la casella, i recorda de quina tasca és."
        ),
        example({
          title: 'Fase 4: les tasques es poden completar',
          intro: "Marca i desmarca les caselles. Afegeix una tasca nova i comprova que també té la seva.",
          html: PROJECT_HTML,
          css: PROJECT_CSS,
          js: PHASE_JS.toggle,
          expected: "En marcar una casella, el text es ratlla. En desmarcar-la, torna a la normalitat.",
          why: "El listener no ratlla res: canvia `tasca.completada` a l'array i torna a pintar. És `crearElementTasca` qui, en veure que la tasca està completada, hi posa la classe. Les tasques noves funcionen sense fer res especial, perquè passen per la mateixa funció.",
        }),
      ],
    },

    {
      id: 'fase-5',
      label: 'Fase 5',
      title: 'Eliminar tasques',
      blocks: [
        p("La funció de dades per eliminar ja la coneixes de la unitat 6: construeix un array nou amb totes les tasques menys la que té l'`id` indicat, i substitueix l'antic."),
        code(FN_REMOVE),
        p("A `crearElementTasca` hi afegim un botó, just abans de l'`append` final, i l'incloem entre els elements que s'afegeixen al `<li>`:"),
        code(`  const botoEliminar = document.createElement("button");
  botoEliminar.type = "button";
  botoEliminar.textContent = "Elimina";
  botoEliminar.setAttribute("aria-label", \`Elimina la tasca: \${tasca.text}\`);
  botoEliminar.addEventListener("click", () => {
    eliminarTasca(tasca.id);
    renderitzar();
  });

  element.append(casella, etiqueta, botoEliminar);
  return element;`),
        list(
          "`type = \"button\"` deixa clar que no és un botó d'enviar formulari.",
          "L'`aria-label` dona a cada botó un nom propi. Sense ell, un lector de pantalla diria «Elimina, botó» per a tots, sense indicar de quina tasca.",
          "El listener crida la funció de dades i torna a pintar. Com sempre."
        ),
        example({
          title: 'Fase 5: les tasques es poden eliminar',
          intro: "Elimina una tasca. Després elimina-les totes per veure l'estat buit, i torna'n a afegir una.",
          html: PROJECT_HTML,
          css: PROJECT_CSS,
          js: PHASE_JS.remove,
          expected: "Cada tasca té un botó «Elimina». Quan no en queda cap, apareix «No hi ha tasques per mostrar.».",
          why: "L'estat buit funciona sense haver tocat res: `renderitzar` ja comprovava la longitud de l'array des de la fase 2. Aquest és l'avantatge de tornar a pintar-ho tot a partir de les dades.",
        }),
        concept(
          "Per què no fem element.remove() i prou?",
          "Seria més curt eliminar només l'element de la pàgina. Però llavors la tasca continuaria a l'array, i reapareixeria a la pròxima pintada. Les dades i la pàgina dirien coses diferents. Canviant sempre l'array i tornant a pintar, això no pot passar."
        ),
      ],
    },

    {
      id: 'fase-6',
      label: 'Fase 6',
      title: 'Filtres i comptador de pendents',
      blocks: [
        p("El filtre és una dada més de l'aplicació: quina vista ha triat la persona. Per tant, va a l'estat. Afegeix aquesta línia a la zona 1:"),
        code(`let filtreActual = "totes";`),
        p("Necessitem els tres botons i el paràgraf del comptador:"),
        code(ELEMENTS_FILTERS),
        p("Ara, la idea clau d'aquesta fase: **filtrar no elimina res**. L'array `tasques` continua tenint totes les tasques. El que fem és calcular, cada vegada que pintem, quines s'han de *veure*. Aquesta funció retorna un array nou només amb les tasques visibles segons el filtre:"),
        code(FN_VISIBLE),
        p("I una altra funció de dades per comptar les pendents. Compta sobre **totes** les tasques, no sobre les visibles: el comptador ha de dir la veritat encara que estiguem mirant només les completades."),
        code(FN_COUNT),
        p("`renderitzar` creix. Ara pinta les tasques visibles, actualitza el comptador i marca quin botó de filtre està actiu:"),
        code(RENDER_V2),
        list(
          "El bucle recorre `visibles` en lloc de `tasques`, i l'estat buit depèn de `visibles.length`: si filtres per completades i no n'hi ha cap, també s'ha de veure el missatge.",
          "El text del comptador distingeix el singular del plural.",
          "`aria-pressed` ha de ser el text `\"true\"` o `\"false\"`. La comparació dona un booleà, i `String()` el converteix."
        ),
        p("Per acabar, els esdeveniments. Els tres botons fan el mateix amb un valor diferent, de manera que la part comuna va a una funció:"),
        code(EVENT_FILTERS),
        example({
          title: 'Fase 6: filtres i comptador',
          intro: "Canvia de filtre, marca tasques mentre en tens un d'actiu i mira com reacciona el comptador.",
          html: PROJECT_HTML,
          css: PROJECT_CSS,
          js: PHASE_JS.filter,
          expected: "El filtre actiu queda destacat. A «Pendents» només es veuen les tasques sense marcar; si en marques una, desapareix de la vista. El comptador diu sempre quantes en queden.",
          why: "Quan marques una tasca amb el filtre «Pendents» actiu, la tasca desapareix sola: en tornar a pintar, `obtenirTasquesVisibles` ja no la inclou. No ha calgut escriure cap codi per a aquest cas.",
        }),
        concept(
          'Una vista no és una còpia de les dades',
          "`visibles` es calcula de nou a cada pintada i es llença. Mai la guardem ni la modifiquem. L'única font de veritat és `tasques`; tot el que es veu se'n deriva."
        ),
      ],
    },

    {
      id: 'fase-7',
      label: 'Fase 7',
      title: 'Polir: el focus i la revisió final',
      blocks: [
        p("L'aplicació ja fa tot el que demanàvem. Però si la proves **només amb el teclat**, notaràs un problema: quan marques una casella amb la barra espaiadora, el focus desapareix i has de tornar a començar a tabular des de dalt."),
        p("Passa perquè `renderitzar` esborra tots els elements i en crea de nous. La casella que tenia el focus ja no existeix. La solució és tornar a posar el focus allà on toca després de pintar."),
        code(`  casella.addEventListener("change", () => {
    canviarEstat(tasca.id);
    renderitzar();
    // La casella d'abans ja no existeix: tornem el focus a la nova.
    const novaCasella = document.querySelector(\`#tasca-\${tasca.id}\`);
    if (novaCasella !== null) {
      novaCasella.focus();
    }
  });`),
        p("Busquem la casella nova pel seu `id`. Pot ser que no hi sigui (si hi ha un filtre actiu, la tasca pot haver sortit de la vista), i per això comprovem que no sigui `null` abans de fer-la servir."),
        p("En eliminar una tasca passa el mateix: el botó premut desapareix. Aquí portem el focus al camp de text, que és el lloc més útil per continuar:"),
        code(`  botoEliminar.addEventListener("click", () => {
    eliminarTasca(tasca.id);
    renderitzar();
    inputTasca.focus();
  });`),
        example({
          title: 'Fase 7: el projecte base, complet',
          intro: "Prova-ho tot sense ratolí: Tab per moure't, Espai per marcar caselles i prémer botons, Retorn per afegir.",
          html: PROJECT_HTML,
          css: PROJECT_CSS,
          js: PROJECT_JS,
          expected: "Totes les funcionalitats mínimes funcionen, i el focus no es perd en marcar ni en eliminar.",
          why: "Aquest és el programa sencer: unes 180 línies, organitzades en les cinc zones. Compara'l amb el teu, zona per zona.",
        }),
        p("Abans de donar el projecte per acabat, repassa el teu codi amb la llista de la unitat 10:"),
        list(
          "Els **noms** de variables i funcions expliquen què són i què fan?",
          "Cada **funció** fa una sola cosa? Les de dades no toquen la pàgina?",
          "Hi ha **codi duplicat** que es pugui convertir en una funció?",
          "Tot el text que ve de la persona es posa amb **`textContent`**?",
          "Has tret els **`console.log`** de prova?",
          "Es pot fer servir tot **sense ratolí**, i el focus es veu sempre?"
        ),
        custom('ProjectChecklist'),
      ],
    },

    {
      id: 'localstorage',
      label: 'Ampliació',
      title: 'Guardar dades al navegador: localStorage',
      blocks: [
        p("El gestor té una limitació evident: quan recarregues la pàgina, les tasques es perden i tornen les dues de mostra. És normal, perquè les variables de JavaScript només viuen mentre la pàgina està oberta."),
        p("Els navegadors ofereixen un petit magatzem on una pàgina pot guardar dades que **sobreviuen a la recàrrega**: `localStorage`. Funciona amb parells de clau i valor, i té tres operacions:"),
        table(
          ['Operació', 'Què fa'],
          [
            ['`localStorage.setItem("clau", valor)`', 'Guarda un valor sota una clau'],
            ['`localStorage.getItem("clau")`', 'Recupera el valor, o `null` si la clau no existeix'],
            ['`localStorage.removeItem("clau")`', 'Esborra la clau'],
          ],
          'Les operacions de localStorage'
        ),
        p("Hi ha una restricció important: **només pot guardar text**. Per guardar un array d'objectes l'hem de convertir a text, i per recuperar-lo, tornar-lo a convertir. D'això se n'encarreguen dues funcions:"),
        list(
          "`JSON.stringify(valor)` converteix un array o un objecte en un text.",
          "`JSON.parse(text)` fa el camí invers: a partir del text, reconstrueix l'array o l'objecte."
        ),
        example({
          title: 'Guardar i recuperar un array',
          intro: "Executa'l i fixa't en el tipus del valor a cada pas.",
          js: `const tasques = [
  { id: 1, text: "Estudiar JavaScript", completada: false }
];

// Guardar: de l'array a un text
const text = JSON.stringify(tasques);
console.log(text);
console.log(typeof text);

localStorage.setItem("tasques", text);

// Recuperar: del text a un array
const recuperat = localStorage.getItem("tasques");
const copia = JSON.parse(recuperat);

console.log(copia[0].text);
console.log(localStorage.getItem("una-clau-que-no-existeix"));`,
          expected: "El text amb format JSON, `string`, `Estudiar JavaScript` i `null`.",
          why: "El text que produeix `JSON.stringify` s'assembla molt a com escrivim els objectes a JavaScript, amb els noms de les propietats entre cometes. `JSON.parse` el torna a convertir en un array de veritat, amb el qual es pot treballar.",
        }),
        warning(
          'Sense JSON.stringify, es guarda «[object Object]»',
          "Si passes un array d'objectes directament a `setItem`, el navegador el converteix a text pel seu compte, i el resultat és `\"[object Object]\"`. No hi ha cap error, però les dades s'han perdut."
        ),
        p("En aquest dossier, cada exemple té el seu propi `localStorage` de prova, que es conserva entre execucions fins que prems «Reiniciar». Al teu projecte, les dades es guarden de veritat al navegador i les pots veure a les eines de desenvolupament, a la pestanya **Application** (o **Emmagatzematge**, a Firefox)."),
        project(
          "Amb `localStorage`, el gestor es converteix en una aplicació que es pot fer servir de veritat. És la base dels dos últims exercicis de la unitat. I recorda que continua sent un magatzem del navegador: les dades no surten d'aquell ordinador ni d'aquell navegador, i la persona les pot esborrar quan vulgui.",
          { title: 'Les tasques que no es perden' }
        ),
      ],
    },

    {
      id: 'versio-completa',
      label: 'Ampliació',
      title: 'La versió completa, amb totes les ampliacions',
      blocks: [
        p("Als exercicis d'aquesta unitat hi trobaràs cinc ampliacions per fer sobre el projecte base: eliminar les completades, mode clar i fosc, editar una tasca, guardar a `localStorage` i recuperar en recarregar. **Intenta-les primer pel teu compte.**"),
        p("Quan les tinguis, o si t'encalles en alguna, aquí tens el gestor amb totes cinc integrades. Per comprovar la persistència, afegeix unes quantes tasques i torna a prémer «Executar», que equival a recarregar la pàgina: les tasques han de continuar allà."),
        example({
          title: 'El gestor de tasques complet',
          intro: "La mateixa aplicació de la portada, amb el codi a la vista. «Reiniciar» esborra també les dades guardades.",
          html: PROJECT_HTML_FULL,
          css: PROJECT_CSS_FULL,
          js: PROJECT_JS_FULL,
          why: "El codi ha passat de 180 línies a unes 300, però l'estructura és la mateixa: s'han afegit funcions de dades, funcions de pàgina i listeners, cadascun a la seva zona. Una nova funció `actualitzar` agrupa les dues coses que cal fer cada vegada que les dades canvien: guardar i tornar a pintar.",
        }),
        p("A partir d'aquí, el projecte és teu. Algunes idees per continuar: ordenar les tasques, afegir-hi una data límit o una prioritat, un cercador, o un comptador de tasques completades avui. Per a cadascuna, fes-te les tres preguntes de sempre: quina dada nova necessito a l'estat? Quina funció de dades la modifica? Què ha de canviar a la pintada?"),
      ],
    },
  ],

  commonErrors: [
    {
      title: "Modificar la pàgina sense modificar l'array",
      bad: `botoEliminar.addEventListener("click", () => {
  element.remove();
});`,
      why: "La tasca desapareix de la pantalla, però continua a l'array. La pròxima vegada que es cridi `renderitzar` (en afegir una tasca, per exemple) tornarà a aparèixer, i el comptador de pendents no haurà canviat mai.",
      fix: `botoEliminar.addEventListener("click", () => {
  eliminarTasca(tasca.id);
  renderitzar();
});`,
    },
    {
      title: 'Oblidar-se de tornar a pintar',
      bad: `casella.addEventListener("change", () => {
  canviarEstat(tasca.id);
});`,
      why: "La dada canvia a l'array, però ningú ho trasllada a la pàgina: el text no es ratlla i el comptador no s'actualitza. Qualsevol canvi a l'estat ha d'anar seguit d'una crida a `renderitzar`.",
      fix: `casella.addEventListener("change", () => {
  canviarEstat(tasca.id);
  renderitzar();
});`,
    },
    {
      title: "Calcular l'id a partir de la longitud de l'array",
      bad: `function crearTasca(text) {
  return { id: tasques.length + 1, text: text, completada: false };
}`,
      why: "Funciona fins que s'elimina alguna tasca. Amb tres tasques (1, 2 i 3), si elimines la 2 i n'afegeixes una, rebrà l'`id` 3, que ja existeix. A partir d'aquí, completar o eliminar-ne una afecta totes dues.",
      fix: `function crearTasca(text) {
  const tasca = { id: seguentId, text: text, completada: false };
  seguentId++;
  return tasca;
}`,
    },
    {
      title: "Identificar la tasca per la seva posició",
      bad: `botoEliminar.addEventListener("click", () => {
  eliminarPerPosicio(index);
});`,
      why: "La posició d'una tasca canvia quan se n'elimina una d'anterior, i amb un filtre actiu la posició a la pantalla no coincideix amb la posició a l'array. L'`id`, en canvi, no canvia mai.",
      fix: `botoEliminar.addEventListener("click", () => {
  eliminarTasca(tasca.id);
  renderitzar();
});`,
    },
    {
      title: 'Guardar un array sense convertir-lo a text',
      bad: `localStorage.setItem("tasques", tasques);`,
      why: "`localStorage` només guarda text. L'array es converteix automàticament en `\"[object Object],[object Object]\"`, i les dades es perden sense cap avís. En recuperar-les, `JSON.parse` fallarà.",
      fix: `localStorage.setItem("tasques", JSON.stringify(tasques));`,
    },
    {
      title: "Recuperar de localStorage sense comprovar si hi ha res",
      bad: `tasques = JSON.parse(localStorage.getItem("tasques"));`,
      message: 'Uncaught TypeError: tasques is not iterable',
      why: "La primera vegada que s'obre l'aplicació no hi ha res guardat: `getItem` retorna `null`, i `JSON.parse(null)` també dona `null`. L'array queda substituït per `null`, i el primer bucle que intenta recórrer-lo falla.",
      fix: `const text = localStorage.getItem("tasques");

if (text !== null) {
  tasques = JSON.parse(text);
}`,
    },
  ],

  exercises: [
    {
      id: 'eliminar-completades',
      title: 'Ampliació 1: eliminar totes les completades',
      statement: [
        "A la pàgina hi ha un botó nou, «Elimina les completades» (`#netejar`), que encara no fa res. Fes que elimini de cop totes les tasques marcades.",
        "A l'editor tens el projecte base complet. Has d'afegir-hi tres coses, cadascuna a la seva zona: la referència al botó, una funció de dades i un listener.",
      ],
      expected: "En prémer el botó, desapareixen totes les tasques completades i queden només les pendents.",
      html: PROJECT_HTML_FULL,
      css: PROJECT_CSS_FULL,
      starter: PROJECT_JS,
      partialSolution: true,
      hint: "La funció de dades és gairebé idèntica a `eliminarTasca`: construeix un array nou, però aquí la condició per conservar una tasca és que **no** estigui completada.",
      solution: `// Zona 2 · Elements de la pàgina
const botoNetejar = document.querySelector("#netejar");

// Zona 3 · Funcions que treballen amb les dades
function eliminarCompletades() {
  const pendents = [];
  for (const tasca of tasques) {
    if (!tasca.completada) {
      pendents.push(tasca);
    }
  }
  tasques = pendents;
}

// Zona 5 · Esdeveniments
botoNetejar.addEventListener("click", () => {
  eliminarCompletades();
  renderitzar();
});`,
      explanation: "Una funcionalitat nova ha demanat exactament una peça a cada zona, i cap canvi a `renderitzar`: com que pinta a partir de l'array, s'adapta sola. Com a millora, pots afegir a `renderitzar` la línia `botoNetejar.disabled = comptarPendents() === tasques.length;` perquè el botó es desactivi quan no hi ha res per eliminar.",
    },
    {
      id: 'mode-fosc',
      title: 'Ampliació 2: mode clar i mode fosc',
      statement: [
        "El botó «Mode fosc» (`#boto-tema`) ha d'alternar la classe `fosc` del `<body>`. El CSS ja té tots els estils del mode fosc preparats: mira la pestanya CSS.",
        "El botó també ha d'indicar el seu estat amb `aria-pressed`: `\"true\"` quan el mode fosc està actiu i `\"false\"` quan no.",
      ],
      expected: "Cada clic canvia entre fons clar i fons fosc, i el botó queda destacat quan el mode fosc està actiu.",
      html: PROJECT_HTML_FULL,
      css: PROJECT_CSS_FULL,
      starter: PROJECT_JS,
      partialSolution: true,
      hint: "Escriu una funció `aplicarTema(esFosc)` que rebi un booleà i posi o tregui la classe i actualitzi `aria-pressed`. Al listener, calcula el nou estat amb `!document.body.classList.contains(\"fosc\")`.",
      solution: `// Zona 2 · Elements de la pàgina
const botoTema = document.querySelector("#boto-tema");

// Zona 4 · Funcions que pinten la pàgina
function aplicarTema(esFosc) {
  if (esFosc) {
    document.body.classList.add("fosc");
  } else {
    document.body.classList.remove("fosc");
  }
  botoTema.setAttribute("aria-pressed", String(esFosc));
}

// Zona 5 · Esdeveniments
botoTema.addEventListener("click", () => {
  const esFosc = !document.body.classList.contains("fosc");
  aplicarTema(esFosc);
});`,
      explanation: "JavaScript no toca cap color: només posa i treu una classe. Separar `aplicarTema` del listener sembla innecessari ara, però quan vulguis recordar el tema amb `localStorage` podràs cridar la mateixa funció en arrencar, amb el valor guardat.",
    },
    {
      id: 'editar-tasca',
      title: 'Ampliació 3: editar una tasca',
      statement: [
        "Afegeix a cada tasca un botó «Edita». En prémer-lo, la tasca s'ha de convertir en un petit formulari amb un camp de text (amb el text actual) i dos botons: «Desa» i «Cancel·la».",
        "En desar, el text nou s'ha de validar amb `validarTasca`. És l'ampliació més llarga: llegeix la pista abans de començar.",
      ],
      expected: "«Edita» transforma la tasca en un camp editable. «Desa» guarda el text nou si és vàlid; «Cancel·la» ho deixa com estava.",
      html: PROJECT_HTML_FULL,
      css: PROJECT_CSS_FULL,
      starter: PROJECT_JS,
      partialSolution: true,
      hint: [
        "Necessites una dada nova a l'estat: `let idEnEdicio = null;`. Guarda l'`id` de la tasca que s'està editant, o `null` si no se n'edita cap.",
        "Al principi de `crearElementTasca`, comprova si `tasca.id === idEnEdicio`. Si és així, retorna el que doni una funció nova, `crearElementEdicio(tasca)`, que construeix el formulari. El botó «Edita» només ha de canviar `idEnEdicio` i cridar `renderitzar`.",
      ],
      solution: `// Zona 1 · Estat
let idEnEdicio = null;

// Zona 4 · Una funció nova que pinta la tasca en mode edició
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
    renderitzar();
  });

  formulariEdicio.append(camp, botoDesar, botoCancelar);
  element.append(formulariEdicio, errorEdicio);
  return element;
}

// Zona 4 · A crearElementTasca, a la primera línia de la funció:
  if (tasca.id === idEnEdicio) {
    return crearElementEdicio(tasca);
  }

// Zona 4 · A crearElementTasca, abans de l'append final:
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

  element.append(casella, etiqueta, botoEditar, botoEliminar);`,
      explanation: [
        "La clau és que «quina tasca s'està editant» és una **dada**, i per tant va a l'estat. El botó «Edita» no transforma res a la pàgina: canvia `idEnEdicio` i torna a pintar. És `crearElementTasca` qui, en veure que aquella tasca és la que s'edita, la pinta d'una altra manera.",
        "Fixa't que `validarTasca` es reutilitza sense canvis, i que el formulari d'edició és un `<form>` de veritat: així es pot desar prement Retorn.",
      ],
    },
    {
      id: 'guardar',
      title: 'Ampliació 4: guardar les tasques',
      statement: [
        "Fes que cada vegada que les tasques canviïn es guardin a `localStorage`, sota la clau `\"tasques\"`.",
        "Per comprovar-ho, afegeix temporalment `console.log(localStorage.getItem(\"tasques\"));` després de guardar: has de veure el text JSON amb totes les tasques.",
      ],
      expected: "Després d'afegir, completar o eliminar una tasca, a `localStorage` hi ha un text JSON amb l'estat actual de totes les tasques.",
      html: PROJECT_HTML_FULL,
      css: PROJECT_CSS_FULL,
      starter: PROJECT_JS,
      partialSolution: true,
      hint: [
        "Escriu una funció `guardarTasques()` que faci `localStorage.setItem` amb el resultat de `JSON.stringify(tasques)`.",
        "Hi ha tres llocs on canvien les dades i es crida `renderitzar()`. En lloc de posar `guardarTasques()` a tots tres, crea una funció `actualitzar()` que cridi les dues i substitueix-hi les crides.",
      ],
      solution: `// Una zona nova, abans dels esdeveniments
const CLAU_TASQUES = "tasques";

function guardarTasques() {
  localStorage.setItem(CLAU_TASQUES, JSON.stringify(tasques));
}

// Cada cop que les dades canvien: les guardem i tornem a pintar.
function actualitzar() {
  guardarTasques();
  renderitzar();
}

// Als tres llocs on canvien les dades, canvia renderitzar() per actualitzar():
//   - al listener «change» de la casella
//   - al listener «click» del botó d'eliminar
//   - al final del listener «submit» del formulari`,
      explanation: [
        "Guardar i pintar són dues conseqüències de la mateixa cosa: que les dades han canviat. Agrupar-les a `actualitzar` evita oblidar-se'n una, i si demà cal fer una tercera cosa només s'haurà d'afegir aquí.",
        "El canvi de filtre continua cridant `renderitzar` directament: canvia el que es veu, però no les tasques, i no cal guardar res.",
      ],
    },
  ],

  finalExercise: {
    id: 'recuperar',
    title: 'Ampliació 5: recuperar les tasques en recarregar',
    statement: [
      "El programa de l'editor ja guarda les tasques cada vegada que canvien, però quan es torna a carregar comença de nou amb les dues de mostra. Escriu una funció `carregarTasques` i crida-la en arrencar, abans de la primera pintada.",
      "**Atenció a dos detalls:** la primera vegada no hi haurà res guardat, i `seguentId` s'ha de recalcular perquè les tasques noves no repeteixin cap identificador.",
      "Per provar-ho, afegeix unes quantes tasques i torna a prémer «Executar», que equival a recarregar la pàgina.",
    ],
    expected: "Les tasques afegides, completades o eliminades es conserven en tornar a executar. Una tasca nova rep un `id` que no coincideix amb cap dels existents.",
    html: PROJECT_HTML_FULL,
    css: PROJECT_CSS_FULL,
    starter: PROJECT_JS_SAVE,
    partialSolution: true,
    hint: [
      "`localStorage.getItem` retorna `null` si no hi ha res guardat. Només has de substituir `tasques` quan el resultat **no** sigui `null`.",
      "Per recalcular `seguentId`, recorre les tasques carregades i queda't amb l'`id` més gran que trobis; el següent serà aquest més 1.",
    ],
    solution: `// Al costat de guardarTasques
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

// ---------- Arrencada ----------
carregarTasques();
renderitzar();`,
    explanation: [
      "Si no hi ha res guardat, la funció no fa res i l'aplicació arrenca amb les tasques de mostra. Si n'hi ha, `JSON.parse` reconstrueix l'array i substitueix l'inicial.",
      "El recàlcul de `seguentId` és el detall que es descuida més sovint. Sense ell, el comptador tornaria a començar a 3 a cada recàrrega, i de seguida hi hauria dues tasques amb el mateix `id`: marcar-ne una marcaria l'altra. És un error que no dona cap missatge i que només apareix després d'uns quants usos, dels més difícils de trobar si no saps què busques.",
    ],
  },

  summary: [
    "Un programa ben organitzat separa **estat**, **funcions de dades**, **funcions de pàgina** i **esdeveniments**.",
    "El flux sempre va en una direcció: esdeveniment → canvi a les dades → `renderitzar`.",
    "L'array `tasques` és l'única font de veritat. La pàgina, el comptador i la vista filtrada es calculen a partir d'ell.",
    "Cada tasca s'identifica pel seu `id`, que no es reaprofita mai.",
    "Construir per fases i provar cada pas fa que els errors apareguin d'un en un, quan són fàcils de trobar.",
    "`localStorage` guarda text entre visites: `JSON.stringify` per guardar i `JSON.parse` per recuperar.",
    "Una funcionalitat nova acostuma a ser una peça a cada zona, sense tocar la resta.",
  ],

  quiz: [
    {
      question: "Després d'eliminar una tasca de l'array, la pàgina continua mostrant-la. Què és el més probable que falti?",
      options: [
        { text: 'Cridar `renderitzar()` després de modificar les dades.', correct: true },
        { text: 'Cridar `event.preventDefault()`.', why: "`preventDefault` evita l'acció per defecte del navegador; no té cap relació amb actualitzar la llista." },
        { text: 'Guardar les tasques a `localStorage`.', why: "Guardar fa que les dades sobrevisquin a una recàrrega, però no canvia el que es veu ara." },
        { text: 'Recarregar la pàgina amb F5.', why: "Recarregar tornaria a l'estat inicial i es perdrien tots els canvis." },
      ],
      explanation: "La pàgina no s'assabenta sola dels canvis a l'array. Després de modificar l'estat, cal tornar a pintar.",
    },
    {
      question: "Per què cada tasca té un `id` en lloc d'identificar-la per la seva posició a l'array?",
      options: [
        { text: "Perquè la posició canvia quan s'eliminen o es filtren tasques, i l'`id` no.", correct: true },
        { text: "Perquè JavaScript obliga que tots els objectes tinguin una propietat `id`.", why: "No hi ha cap obligació: és una decisió de disseny nostra." },
        { text: "Perquè els arrays d'objectes no tenen posicions.", why: "Sí que en tenen, com qualsevol array. El problema és que no són estables." },
        { text: "Perquè amb un `id` l'array ocupa menys memòria.", why: "N'ocupa una mica més: hi ha una dada addicional a cada objecte." },
      ],
      explanation: "Un identificador ha de ser estable. La posició d'una tasca canvia en eliminar-ne una d'anterior, i amb un filtre actiu ni tan sols coincideix amb el que es veu.",
    },
    {
      question: "Quan es tria el filtre «Pendents», què passa amb les tasques completades?",
      options: [
        { text: "Continuen a l'array `tasques`; simplement no es pinten.", correct: true },
        { text: "S'eliminen de l'array.", why: "Si s'eliminessin, en tornar a «Totes» haurien desaparegut." },
        { text: "Es marquen com a pendents.", why: "El filtre no modifica cap tasca: només decideix quines es veuen." },
        { text: "Es mouen a un segon array que es guarda per separat.", why: "L'array de visibles es calcula de nou a cada pintada i no es conserva." },
      ],
      explanation: "Filtrar és triar què es mostra. Les dades no canvien: `obtenirTasquesVisibles` calcula la vista a partir de `tasques` cada vegada.",
    },
    {
      question: "Què es guarda si s'executa aquesta instrucció amb un array d'objectes?",
      code: `localStorage.setItem("tasques", tasques);`,
      options: [
        { text: 'Un text inservible, com `"[object Object]"`.', correct: true },
        { text: "L'array, tal com és.", why: "`localStorage` només pot guardar text, no arrays ni objectes." },
        { text: 'Res: es produeix un error.', why: "No hi ha cap error, i això és el que el fa perillós: les dades es perden en silenci." },
        { text: '`null`', why: "`null` és el que retorna `getItem` quan una clau no existeix." },
      ],
      explanation: "Per guardar un array cal convertir-lo abans amb `JSON.stringify(tasques)`. Si no, el navegador el converteix a text a la seva manera i el contingut es perd.",
    },
    {
      question: "On ha d'anar la comprovació que el text d'una tasca nova no és buit?",
      options: [
        { text: "En una funció de validació, cridada des del listener de `submit` abans d'afegir la tasca.", correct: true },
        { text: 'Dins de `renderitzar`, just abans de pintar cada tasca.', why: "Quan s'arriba a pintar, la tasca ja és a l'array. S'ha de filtrar a l'entrada." },
        { text: "Enlloc: n'hi ha prou amb l'atribut `required` de l'HTML.", why: "`required` accepta un text fet d'espais i es pot esquivar. La comprovació ha de ser al codi." },
        { text: 'Al CSS, amagant les tasques buides.', why: "Amagar-les no evita que existeixin: continuarien a l'array i comptarien com a pendents." },
      ],
      explanation: "Les dades es validen en el moment que entren, abans de tocar l'estat. Tenir les regles en una funció a part permet reutilitzar-les, per exemple en editar una tasca.",
    },
  ],
};
