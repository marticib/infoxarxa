// Glossari del dossier. Cada terme pertany a la unitat on apareix per primera
// vegada: es mostra al resum d'aquella unitat i a la pàgina general del glossari.

const U1 = 'javascript-a-la-pagina';
const U2 = 'variables';
const U3 = 'condicionals';
const U4 = 'bucles';
const U5 = 'funcions';
const U6 = 'arrays-i-objectes';
const U7 = 'dom';
const U8 = 'esdeveniments';
const U9 = 'formularis';
const U10 = 'depuracio';
const U11 = 'projecte-final';

export const glossary = [
  // Unitat 1
  { term: 'JavaScript', unit: U1, definition: "Llenguatge de programació que dona comportament a les pàgines web. No s'ha de confondre amb Java." },
  { term: 'Instrucció', unit: U1, definition: "Cada una de les ordres d'un programa. El navegador les executa d'una en una, de dalt a baix." },
  { term: 'Consola', unit: U1, definition: "Panell de les eines de desenvolupament del navegador on el codi escriu missatges i on apareixen els errors. S'obre amb F12." },
  { term: 'console.log()', unit: U1, definition: "Instrucció que escriu a la consola el valor que rep entre parèntesis." },
  { term: 'Script', unit: U1, definition: "Codi JavaScript connectat a una pàgina amb l'etiqueta `<script>`. Pot ser intern (escrit dins l'etiqueta) o extern (un fitxer `.js`)." },
  { term: 'defer', unit: U1, definition: "Atribut de l'etiqueta `<script>` que fa que el fitxer s'executi quan el navegador ja ha llegit tot l'HTML." },
  { term: 'Comentari', unit: U1, definition: "Text que el navegador ignora, pensat per a les persones que llegeixen el codi. Comença amb `//`." },

  // Unitat 2
  { term: 'Variable', unit: U2, definition: "Nom que es posa a un valor per poder-lo fer servir més endavant." },
  { term: 'Declarar', unit: U2, definition: "Crear una variable amb `const` o `let`. Es fa una sola vegada." },
  { term: 'Assignar', unit: U2, definition: "Guardar un valor en una variable amb el signe `=`." },
  { term: 'const', unit: U2, definition: "Paraula clau per declarar una variable que no es podrà reassignar. És l'opció per defecte." },
  { term: 'let', unit: U2, definition: "Paraula clau per declarar una variable el valor de la qual podrà canviar." },
  { term: 'Tipus de dada', unit: U2, definition: "La mena d'un valor: text, nombre, booleà… Determina quines operacions s'hi poden fer." },
  { term: 'String', unit: U2, definition: "Tipus de dada per al text. S'escriu entre cometes: `\"Hola\"`." },
  { term: 'Number', unit: U2, definition: "Tipus de dada per als nombres, tant enters com decimals: `19`, `3.5`." },
  { term: 'Booleà', unit: U2, definition: "Tipus de dada que només pot valer `true` (cert) o `false` (fals)." },
  { term: 'undefined', unit: U2, definition: "Valor d'una variable declarada a la qual encara no s'ha assignat res, o d'una propietat que no existeix." },
  { term: 'null', unit: U2, definition: "Valor que indica expressament que no hi ha res. És el que retorna `querySelector` quan no troba l'element." },
  { term: 'typeof', unit: U2, definition: "Operador que retorna el tipus d'un valor en forma de text: `typeof 5` dona `\"number\"`." },
  { term: 'Concatenar', unit: U2, definition: "Unir dos textos amb l'operador `+`." },
  { term: 'Template literal', unit: U2, definition: "Text escrit entre accents greus que pot incloure valors amb `${ }`: `` `Hola, ${nom}` ``." },
  { term: 'NaN', unit: U2, definition: "«Not a Number»: el resultat d'una operació o conversió numèrica que no té sentit, com `Number(\"hola\")`." },
  { term: 'Conversió de tipus', unit: U2, definition: "Transformar un valor d'un tipus a un altre amb `Number()`, `String()` o `Boolean()`." },

  // Unitat 3
  { term: 'Expressió booleana', unit: U3, definition: "Tros de codi que, un cop calculat, dona `true` o `false`. Per exemple, `edat >= 18`." },
  { term: 'Operador de comparació', unit: U3, definition: "Símbol que compara dos valors i dona un booleà: `>`, `<`, `>=`, `<=`, `===` i `!==`." },
  { term: 'Igualtat estricta', unit: U3, definition: "La comparació amb `===`, que té en compte el valor i el tipus. És la que s'ha de fer servir sempre." },
  { term: 'Condicional', unit: U3, definition: "Estructura (`if`, `else if`, `else`) que executa un bloc de codi o un altre segons una condició." },
  { term: 'Operador lògic', unit: U3, definition: "Símbol que combina o inverteix condicions: `&&` (i), `||` (o) i `!` (no)." },
  { term: 'Operador ternari', unit: U3, definition: "Forma curta de triar entre dos valors: `condicio ? valorSiCert : valorSiFals`." },

  // Unitat 4
  { term: 'Bucle', unit: U4, definition: "Estructura (`for`, `while`) que repeteix un bloc de codi mentre es compleix una condició." },
  { term: 'Iteració', unit: U4, definition: "Cada una de les repeticions d'un bucle. També se'n diu volta." },
  { term: 'Comptador', unit: U4, definition: "Variable que augmenta d'un en un per comptar quantes vegades passa alguna cosa." },
  { term: 'Acumulador', unit: U4, definition: "Variable que va sumant (o enganxant) valors dins d'un bucle per obtenir un total." },
  { term: 'Bucle infinit', unit: U4, definition: "Bucle la condició del qual no arriba mai a ser falsa. Bloqueja la pàgina." },

  // Unitat 5
  { term: 'Funció', unit: U5, definition: "Bloc de codi amb nom que es pot executar tantes vegades com calgui." },
  { term: 'Cridar una funció', unit: U5, definition: "Demanar que una funció s'executi, escrivint el seu nom seguit de parèntesis." },
  { term: 'Paràmetre', unit: U5, definition: "Variable que es declara entre els parèntesis d'una funció i que rep un valor a cada crida." },
  { term: 'Argument', unit: U5, definition: "Valor concret que es passa a una funció en cridar-la." },
  { term: 'return', unit: U5, definition: "Instrucció que retorna un valor a qui ha cridat la funció i l'acaba immediatament." },
  { term: 'Àmbit', unit: U5, definition: "Zona del codi on una variable existeix i es pot fer servir. En anglès, *scope*." },
  { term: 'Variable local', unit: U5, definition: "Variable declarada dins d'una funció o d'un bloc. Només existeix allà dins." },
  { term: 'Variable global', unit: U5, definition: "Variable declarada fora de qualsevol funció. Es pot fer servir des de tot el programa." },
  { term: 'Arrow function', unit: U5, definition: "Manera curta d'escriure una funció, amb el símbol `=>`: `(a, b) => a + b`." },

  // Unitat 6
  { term: 'Array', unit: U6, definition: "Llista ordenada de valors guardada en una sola variable. S'escriu entre claudàtors." },
  { term: 'Índex', unit: U6, definition: "Número de la posició d'un element dins d'un array. El primer és el 0." },
  { term: "Element (d'un array)", unit: U6, definition: "Cada un dels valors que conté un array." },
  { term: 'Objecte', unit: U6, definition: "Conjunt de dades amb nom que descriuen una mateixa cosa. S'escriu entre claus." },
  { term: 'Propietat', unit: U6, definition: "Cada una de les dades d'un objecte, formada per un nom i un valor. S'hi accedeix amb un punt: `tasca.text`." },
  { term: 'Mètode', unit: U6, definition: "Funció que pertany a un objecte o a un array i que es crida amb un punt: `tasques.push(…)`." },
  { term: 'Callback', unit: U6, definition: "Funció que es passa a una altra funció perquè aquesta l'executi quan toqui, com a `forEach` o `addEventListener`." },

  // Unitat 7
  { term: 'DOM', unit: U7, definition: "*Document Object Model*: l'arbre d'objectes que el navegador construeix a partir de l'HTML i que JavaScript pot modificar." },
  { term: 'Node', unit: U7, definition: "Cada una de les peces de l'arbre del DOM. Les etiquetes HTML es converteixen en nodes de tipus element." },
  { term: 'Element (del DOM)', unit: U7, definition: "Node del DOM que correspon a una etiqueta HTML, com un `<li>` o un `<button>`." },
  { term: 'Selector', unit: U7, definition: "Text que identifica elements de la pàgina amb la sintaxi de CSS: `\"#titol\"`, `\".tasca\"`, `\"li\"`." },
  { term: 'querySelector()', unit: U7, definition: "Mètode que retorna el primer element que coincideix amb un selector, o `null` si no n'hi ha cap." },
  { term: 'textContent', unit: U7, definition: "Propietat amb el text d'un element. És la manera segura de mostrar text a la pàgina." },
  { term: 'innerHTML', unit: U7, definition: "Propietat que interpreta un text com a HTML. No s'ha de fer servir amb dades que vinguin d'una persona." },
  { term: 'classList', unit: U7, definition: "Propietat per gestionar les classes d'un element amb `add`, `remove`, `toggle` i `contains`." },
  { term: 'Renderitzar', unit: U7, definition: "Generar o actualitzar el que es veu a la pàgina a partir de les dades del programa." },
  { term: 'XSS', unit: U7, definition: "Atac que consisteix a injectar codi en una pàgina a través d'un text que es mostra sense precaucions." },

  // Unitat 8
  { term: 'Esdeveniment', unit: U8, definition: "Avís que genera el navegador quan passa alguna cosa: un clic, una tecla, l'enviament d'un formulari." },
  { term: 'Listener', unit: U8, definition: "Funció que es queda escoltant un esdeveniment d'un element i s'executa quan es produeix." },
  { term: 'addEventListener()', unit: U8, definition: "Mètode que connecta una funció amb un esdeveniment d'un element." },
  { term: 'Objecte event', unit: U8, definition: "Objecte que rep el listener amb la informació del que ha passat: `event.target`, `event.key`…" },
  { term: 'preventDefault()', unit: U8, definition: "Mètode de l'objecte event que cancel·la l'acció per defecte del navegador, com recarregar la pàgina en enviar un formulari." },

  // Unitat 9
  { term: 'Validació', unit: U9, definition: "Comprovació que una dada compleix unes regles abans de fer-la servir." },
  { term: 'trim()', unit: U9, definition: "Mètode dels strings que retorna el text sense els espais del principi ni del final." },
  { term: 'Validació de client', unit: U9, definition: "La que es fa al navegador. Millora l'experiència, però es pot esquivar." },
  { term: 'Validació de servidor', unit: U9, definition: "La que es fa al servidor. És l'única que garanteix que les dades són correctes." },
  { term: 'Accessibilitat', unit: U9, definition: "Conjunt de pràctiques perquè una pàgina la pugui fer servir tothom, també amb teclat o amb lector de pantalla." },

  // Unitat 10
  { term: 'Depurar', unit: U10, definition: "Buscar i corregir els errors d'un programa. En anglès, *debugging*." },
  { term: 'Error de sintaxi', unit: U10, definition: "Error d'escriptura que impedeix al navegador llegir el codi. No s'executa cap línia." },
  { term: "Error d'execució", unit: U10, definition: "Error que es produeix quan una instrucció no es pot dur a terme. El programa s'atura en aquell punt." },
  { term: 'Error de lògica', unit: U10, definition: "Error en què el programa s'executa sense avisos, però no fa el que s'esperava." },
  { term: 'Breakpoint', unit: U10, definition: "Punt d'aturada: marca que fa que el depurador pausi el programa en una línia per inspeccionar-lo." },
  { term: 'Número màgic', unit: U10, definition: "Valor escrit directament al codi sense cap nom que n'expliqui el significat." },

  // Unitat 11
  { term: 'Estat', unit: U11, definition: "El conjunt de dades que descriuen com està l'aplicació en un moment donat: la cerca, el filtre actiu, si has fet «m'agrada», els comentaris…" },
  { term: 'toLowerCase()', unit: U11, definition: "Mètode dels textos que en retorna una còpia en minúscules. Permet comparar dos textos sense distingir majúscules de minúscules." },
  { term: "Paràmetre de l'adreça", unit: U11, definition: "Dada que viatja dins d'una adreça, després d'un interrogant: a `video.html?id=4`, el paràmetre `id` val 4. Es llegeix amb `URLSearchParams`." },
  { term: 'localStorage', unit: U11, definition: "Magatzem del navegador on una pàgina pot guardar text que es conserva encara que es recarregui o es tanqui." },
  { term: 'JSON', unit: U11, definition: "Format de text per representar dades. `JSON.stringify` hi converteix un objecte i `JSON.parse` el reconstrueix." },
];
