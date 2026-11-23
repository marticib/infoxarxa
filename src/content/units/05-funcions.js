import { p, list, code, example, concept, warning, project, compare } from '../blocks.js';

export default {
  id: 'funcions',
  number: 5,
  title: 'Funcions',
  shortTitle: 'Funcions',
  description:
    "Com agrupar instruccions sota un nom per reutilitzar-les: paràmetres, valors de retorn, àmbit de les variables i arrow functions.",

  problem: {
    title: "El programa funciona, però el mateix codi apareix copiat en tres llocs",
    text: [
      "Els bucles ens han estalviat repetir codi quan fem el mateix moltes vegades seguides. Però hi ha una altra mena de repetició: la mateixa operació que es necessita en **llocs diferents** del programa. Comprovar si el text d'una tasca és vàlid cal fer-ho en crear-la i també en editar-la. Calcular un preu amb IVA cal fer-ho al carretó, al tiquet i a la factura.",
      "Si copiem el codi a cada lloc, el dia que canviï una regla haurem de recordar tots els llocs on és. Ens cal una manera d'escriure una operació una sola vegada, posar-li un nom i fer-la servir on calgui. Això és una funció.",
    ],
  },

  goals: [
    "Declarar una funció i cridar-la tantes vegades com calgui.",
    "Passar-li dades amb paràmetres i recuperar-ne el resultat amb `return`.",
    "Distingir entre *retornar* un valor i *mostrar-lo*.",
    "Explicar on existeix una variable segons on s'ha declarat.",
  ],

  projectPiece:
    "El gestor guanya les seves primeres funcions: `validarTasca` decideix si un text és acceptable, `crearMissatge` redacta el resum de pendents i `crearTasca` fabrica una tasca nova.",

  finalProject:
    "Cada interacció serà una funció petita amb un nom clar: `validarComentari`, `obtenirVideosVisibles`, `crearTargetaVideo`.",

  sections: [
    {
      id: 'per-que-funcions',
      title: 'Per què dividim el programa en funcions',
      blocks: [
        p("Mira aquest programa. Calcula el preu amb IVA de tres productes, i per fer-ho repeteix la mateixa fórmula tres vegades:"),
        code(`const preuTeclat = 30;
console.log(preuTeclat + preuTeclat * 0.21);

const preuRatoli = 15;
console.log(preuRatoli + preuRatoli * 0.21);

const preuPantalla = 180;
console.log(preuPantalla + preuPantalla * 0.21);`),
        p("Si demà l'IVA passa a ser del 23 %, hauràs de buscar i canviar la fórmula a tot arreu. I si te'n deixes una, el programa donarà resultats diferents segons la pantalla, que és un error difícil de detectar."),
        concept(
          'Funció',
          "Una funció és un bloc de codi amb nom. S'escriu una vegada i es pot executar tantes vegades com calgui, des de qualsevol punt del programa."
        ),
        p("Fer servir funcions té quatre avantatges que es noten des del primer dia:"),
        list(
          "**Reutilitzar**: el codi s'escriu una vegada i es fa servir moltes.",
          "**Canviar en un sol lloc**: si la regla canvia, només toques la funció.",
          "**Posar nom a les coses**: `calcularPreuAmbIva(preu)` s'entén sense haver de llegir la fórmula.",
          "**Dividir un problema gran** en trossos petits que es poden pensar i provar per separat."
        ),
        p("De fet, ja fa dies que fas servir funcions: `console.log()`, `Number()` i `String()` són funcions que algú va escriure perquè tu no haguessis de fer-ho. Ara aprendràs a crear les teves."),
      ],
    },

    {
      id: 'declarar-i-cridar',
      title: 'Declarar i cridar',
      blocks: [
        p("Amb una funció es fan dues coses diferents, en dos moments diferents:"),
        list(
          "**Declarar-la**: explicar què fa. S'escriu la paraula `function`, el nom, uns parèntesis i, entre claus, les instruccions.",
          "**Cridar-la**: demanar que s'executi. S'escriu el nom seguit de parèntesis."
        ),
        example({
          title: 'Una funció que saluda',
          intro: "La funció es declara a dalt i es crida dues vegades. Fixa't en l'ordre dels missatges.",
          js: `function saludar() {
  console.log("Hola!");
  console.log("Benvinguda al gestor de tasques");
}

console.log("Abans de cridar la funció");
saludar();
saludar();
console.log("Després de cridar la funció");`,
          expected: "El missatge «Abans…», la salutació dues vegades (quatre línies) i el missatge «Després…».",
          why: "Declarar una funció no executa res: el navegador només se n'apunta les instruccions. El codi de dins s'executa cada vegada que apareix `saludar()`, i quan acaba, el programa continua a la línia següent de la crida.",
        }),
        concept(
          'Declarar no és executar',
          "Una funció declarada i mai cridada no fa res. Si escrius una funció i «no funciona», la primera cosa a comprovar és si realment l'has cridada."
        ),
        p("Com que una funció *fa* alguna cosa, el seu nom acostuma a començar amb un verb: `calcularTotal`, `mostrarTasques`, `validarCorreu`. Les que responen sí o no solen començar per `es` o `te`: `esParell`, `teDescompte`."),
      ],
    },

    {
      id: 'parametres-i-arguments',
      title: 'Paràmetres i arguments',
      blocks: [
        p("La funció `saludar` sempre fa exactament el mateix. Perquè una funció sigui útil de veritat ha de poder treballar amb dades diferents a cada crida. Aquestes dades hi entren pels **paràmetres**: variables que es declaren entre els parèntesis i que reben el seu valor quan es crida la funció."),
        example({
          title: 'Una funció per sumar',
          intro: "La mateixa funció, cridada amb valors diferents.",
          js: `function sumar(a, b) {
  console.log(a + b);
}

sumar(2, 3);
sumar(10, 20);`,
          expected: "`5` i `30`.",
          why: "A la primera crida, `a` val 2 i `b` val 3. A la segona, `a` val 10 i `b` val 20. Els valors s'assignen **per ordre**: el primer valor va al primer paràmetre.",
        }),
        p("Hi ha dues paraules que es confonen sovint, i val la pena distingir-les:"),
        list(
          "Un **paràmetre** és el *nom* que apareix a la declaració: `a` i `b`. És una variable que espera un valor.",
          "Un **argument** és el *valor concret* que es passa a la crida: `2` i `3`."
        ),
        example({
          title: 'Saludar pel nom',
          intro: "L'argument pot ser un valor escrit directament o una variable.",
          js: `function saludar(nom) {
  console.log(\`Hola, \${nom}!\`);
}

saludar("Anna");
saludar("Marc");

const alumna = "Júlia";
saludar(alumna);`,
          expected: "`Hola, Anna!`, `Hola, Marc!` i `Hola, Júlia!`.",
          why: "A la tercera crida, el que es passa a la funció és el *valor* de la variable `alumna`. Dins de la funció, aquest valor es diu `nom`: els noms de fora i de dins no han de coincidir.",
        }),
        warning(
          'Si falta un argument, el paràmetre val undefined',
          "Cridar `saludar()` sense res entre parèntesis no dona error: mostra `Hola, undefined!`. JavaScript no comprova que hagis passat tots els arguments, ni que siguin del tipus correcte."
        ),
      ],
    },

    {
      id: 'return',
      title: 'return: tornar un resultat',
      blocks: [
        p("Les funcions que hem escrit fins ara mostren el resultat a la consola, però el programa no pot fer res més amb ell. Si volem *fer servir* el que ha calculat una funció (guardar-lo, sumar-lo, comparar-lo), la funció ha de **retornar-lo** amb `return`."),
        example({
          title: 'Sumar i retornar',
          intro: "Ara la funció no mostra res: torna el resultat a qui l'ha cridada.",
          js: `function sumar(a, b) {
  return a + b;
}

const resultat = sumar(2, 3);
console.log(resultat);

console.log(sumar(10, 20) * 2);`,
          expected: "`5` i `60`.",
          why: "Quan la funció acaba, la crida `sumar(2, 3)` queda substituïda pel valor retornat. És com si en aquell punt hi hagués escrit un `5`. Per això la podem guardar en una variable o fer-la servir dins d'un càlcul.",
        }),
        example({
          title: 'Calcular el preu amb IVA',
          intro: "El problema del principi de la unitat, resolt amb una funció.",
          js: `function calcularPreuAmbIva(preu) {
  const iva = 0.21;
  return preu + preu * iva;
}

console.log(calcularPreuAmbIva(100));
console.log(calcularPreuAmbIva(50));
console.log(calcularPreuAmbIva(200));`,
          expected: "`121`, `60.5` i `242`.",
          why: "La fórmula ja només és en un lloc. Si l'IVA canvia, es modifica una línia i totes les crides donen el resultat nou.",
        }),
        p("`return` fa dues coses alhora: torna el valor i **acaba la funció immediatament**. Qualsevol línia que hi hagi després dins de la funció no s'executa. I si una funció arriba al final sense trobar cap `return`, retorna `undefined`."),
        example({
          title: 'Una funció que respon sí o no',
          intro: "El resultat d'una comparació és un booleà, i es pot retornar directament.",
          js: `function esParell(numero) {
  return numero % 2 === 0;
}

console.log(esParell(4));
console.log(esParell(7));

if (esParell(10)) {
  console.log("El 10 és parell");
}`,
          expected: "`true`, `false` i `El 10 és parell`.",
          why: "`numero % 2 === 0` ja dona `true` o `false`: no cal cap `if` per decidir què retornar. I com que la funció retorna un booleà, la seva crida es pot posar directament com a condició.",
        }),
      ],
    },

    {
      id: 'retornar-o-mostrar',
      title: 'Retornar no és mostrar',
      blocks: [
        p("Aquesta és, probablement, la confusió més freqüent quan es comença amb funcions. Com que als exercicis gairebé sempre acabem mostrant el resultat, és fàcil pensar que `console.log` i `return` fan el mateix. No ho fan."),
        compare(
          {
            title: 'Mostrar',
            code: `function doblar(n) {
  console.log(n * 2);
}`,
            text: "Escriu el resultat a la consola perquè el vegi una persona. El programa no en rep res: la crida val `undefined`.",
          },
          {
            title: 'Retornar',
            tone: 'good',
            code: `function doblar(n) {
  return n * 2;
}`,
            text: "Lliura el resultat al programa, que en pot fer el que vulgui. A la consola no hi apareix res si ningú ho demana.",
          }
        ),
        example({
          title: 'La diferència, en acció',
          intro: "Dues funcions que semblen equivalents. Mira què s'ha guardat a `a` i a `b`.",
          js: `function doblarMostrant(n) {
  console.log(n * 2);
}

function doblarRetornant(n) {
  return n * 2;
}

const a = doblarMostrant(5);
const b = doblarRetornant(5);

console.log(a);
console.log(b);
console.log(b + 1);`,
          expected: "`10`, `undefined`, `10` i `11`.",
          why: "El primer `10` l'escriu `doblarMostrant` mentre s'executa. Però com que no retorna res, a `a` s'hi guarda `undefined`. En canvi, `b` conté el 10 de veritat, i s'hi pot continuar operant.",
        }),
        concept(
          'Les funcions que calculen, retornen',
          "Una funció que retorna el resultat serveix per a tot: avui el mostres a la consola, demà l'escrius a la pàgina i demà passat el fas servir en un altre càlcul. Una funció que només el mostra, només serveix per a la consola."
        ),
      ],
    },

    {
      id: 'ambit',
      title: 'Variables locals i àmbit',
      blocks: [
        p("Les variables que es declaren dins d'una funció només existeixen **dins d'aquella funció**. Se'n diuen **variables locals**. Es creen quan la funció comença i desapareixen quan acaba. Els paràmetres també són variables locals."),
        example({
          title: 'Una variable que no surt de la funció',
          intro: "L'última línia intenta fer servir, des de fora, una variable declarada dins de la funció.",
          js: `function aplicarDescompte(preu) {
  const descompte = preu * 0.1;
  return preu - descompte;
}

console.log(aplicarDescompte(50));
console.log(descompte);`,
          expected: "`45` i després un `ReferenceError` a la línia 7.",
          why: "`descompte` només existeix mentre s'executa `aplicarDescompte`. Fora de la funció, aquest nom no vol dir res. L'única cosa que surt d'una funció és el que retorna.",
        }),
        p("La zona del codi on una variable existeix s'anomena el seu **àmbit** (en anglès, *scope*). N'hi ha de dues menes principals:"),
        list(
          "**Àmbit global**: variables declarades fora de qualsevol funció o bloc. Es poden fer servir des de tot arreu.",
          "**Àmbit local**: variables declarades dins d'una funció, o dins de les claus d'un `if` o d'un bucle. Només existeixen allà dins."
        ),
        example({
          title: 'Global i local',
          intro: "La funció fa servir una variable global i una de local.",
          js: `const nomApp = "Gestor de tasques";

function mostrarTitol() {
  const versio = 2;
  console.log(\`\${nomApp} (versió \${versio})\`);
}

mostrarTitol();
console.log(nomApp);`,
          expected: "`Gestor de tasques (versió 2)` i `Gestor de tasques`.",
          why: "Des de dins d'una funció es veuen les variables de fora, però des de fora no es veuen les de dins. La visibilitat només va en una direcció.",
        }),
        concept(
          'Les dades entren pels paràmetres i surten pel return',
          "Que una funció *pugui* llegir variables globals no vol dir que sigui bona idea. Una funció que només depèn dels seus paràmetres es pot entendre, provar i reutilitzar sense conèixer la resta del programa."
        ),
        p("Les claus d'un `if` o d'un `for` també creen un àmbit per a `let` i `const`: per això l'acumulador declarat dins d'un bucle no existia a fora. I aquí és on `var` es comporta de manera estranya, tal com vam avançar a la unitat 2: ignora les claus dels blocs, i una variable declarada amb `var` dins d'un `if` continua existint a fora."),
        warning(
          'No reaprofitis noms',
          "Si dins d'una funció declares una variable amb el mateix nom que una de global, dins de la funció mana la local i la global queda tapada. És legal, però crea confusió: fes servir noms diferents."
        ),
      ],
    },

    {
      id: 'arrow-functions',
      title: 'Introducció a les arrow functions',
      blocks: [
        p("A JavaScript, una funció és també un valor: es pot guardar en una variable, igual que un nombre o un text. Aprofitant això, hi ha una manera més curta d'escriure funcions, anomenada **arrow function** o funció fletxa pel símbol `=>` que fa servir."),
        p("Aquestes tres funcions fan exactament el mateix:"),
        compare(
          {
            title: 'Funció tradicional',
            code: `function doblar(n) {
  return n * 2;
}`,
          },
          {
            title: 'Arrow function',
            code: `const doblar = (n) => {
  return n * 2;
};`,
            text: "Desapareix la paraula `function` i apareix `=>` entre els paràmetres i el cos.",
          }
        ),
        code(`// Arrow function en una sola línia
const doblar = (n) => n * 2;`),
        p("L'última versió és la més compacta: quan el cos és **una sola expressió**, es poden treure les claus i el `return`. El valor de l'expressió es retorna automàticament. Pots llegir `(n) => n * 2` com «a partir de `n`, obtén `n * 2`»."),
        example({
          title: 'Arrow functions en acció',
          intro: "Es criden exactament igual que les altres.",
          js: `const sumar = (a, b) => a + b;

const saludar = (nom) => {
  console.log(\`Hola, \${nom}!\`);
};

console.log(sumar(2, 3));
saludar("Anna");`,
          expected: "`5` i `Hola, Anna!`.",
          why: "`sumar` té una sola expressió i no necessita claus ni `return`. `saludar` executa una instrucció que no retorna res, i per això porta claus.",
        }),
        warning(
          'Amb claus, el return torna a ser obligatori',
          "`const doblar = (n) => { n * 2 };` no retorna res: en posar-hi claus, el retorn automàtic desapareix i la funció dona `undefined`. O sense claus, o amb claus i `return`."
        ),
        p("Quina has de fer servir? Per a les funcions principals del programa, la declaració tradicional amb `function` és clara i té un avantatge pràctic: es pot cridar des de qualsevol punt del fitxer, fins i tot abans de la línia on està escrita. Una arrow function guardada en una `const` s'ha de definir abans de fer-la servir."),
        p("Les arrow functions brillen en un altre cas: quan cal passar una funció petita a una altra funció. Ho veuràs amb `forEach` a la unitat 6 i amb `addEventListener` a la unitat 8."),
      ],
    },

    {
      id: 'responsabilitat-unica',
      title: 'Una funció, una feina',
      blocks: [
        p("Saber escriure funcions no és suficient: cal saber quin codi posar a cada una. La regla més útil és que **cada funció ha de fer una sola cosa**. Un bon senyal: si per explicar què fa necessites la paraula «i» («valida la tasca *i* la mostra *i* actualitza el comptador»), segurament en són tres."),
        p("Les funcions petites i amb una sola responsabilitat es poden provar per separat i combinar de maneres que no havies previst. Aquestes tres seran peces del gestor de tasques."),
        example({
          title: 'Una funció que crea un missatge',
          intro: "Segons el nombre de tasques pendents, la frase canvia. La funció no mostra res: retorna el text.",
          js: `function crearMissatge(pendents) {
  if (pendents === 0) {
    return "No tens cap tasca pendent";
  }
  if (pendents === 1) {
    return "Tens 1 tasca pendent";
  }
  return \`Tens \${pendents} tasques pendents\`;
}

console.log(crearMissatge(0));
console.log(crearMissatge(1));
console.log(crearMissatge(5));`,
          expected: "Tres frases diferents, una per a cada cas.",
          why: "Com que `return` acaba la funció, no calen `else`: si s'ha complert el primer `if`, la funció ja ha sortit i no arriba al segon. Aquest estil s'anomena «retorn anticipat» i estalvia molts nivells de sagnat.",
        }),
        example({
          title: 'Una funció que valida una tasca',
          intro: "Respon amb un booleà: el text és acceptable o no ho és.",
          js: `function validarTasca(text) {
  if (text === "") {
    return false;
  }
  if (text.length > 40) {
    return false;
  }
  return true;
}

console.log(validarTasca("Estudiar JavaScript"));
console.log(validarTasca(""));`,
          expected: "`true` i `false`.",
          why: "La funció concentra totes les regles de validació. El dia que n'afegim una de nova, només caldrà tocar aquest lloc, i tot el programa l'aplicarà.",
        }),
        example({
          title: "Una funció que crea l'objecte d'una tasca",
          intro: "Un tast del que ve: la funció retorna diverses dades agrupades en una sola peça.",
          js: `function crearTasca(id, text) {
  return {
    id: id,
    text: text,
    completada: false
  };
}

const tasca = crearTasca(1, "Estudiar JavaScript");

console.log(tasca);
console.log(tasca.text);
console.log(tasca.completada);`,
          expected: "Primer totes les dades de la tasca juntes, i després el text i `false`.",
          why: "El que hi ha entre claus després del `return` és un **objecte**: un paquet de dades on cada dada té un nom. Encara no l'hem explicat; li dedicarem la unitat següent. De moment, queda't amb la idea que una funció pot retornar una cosa més rica que un sol nombre o un sol text.",
        }),
        project(
          "Amb aquestes tres funcions el gestor comença a tenir estructura. Cada una té un nom que explica què fa, rep el que necessita pels paràmetres i retorna el resultat sense mostrar res. Encara ens falta un bon lloc on guardar totes les tasques, i això és el que resoldrem a continuació.",
          { title: 'Les primeres funcions del gestor' }
        ),
      ],
    },
  ],

  commonErrors: [
    {
      title: 'Oblidar el return',
      bad: `function calcularTotal(preu, quantitat) {
  const total = preu * quantitat;
}

console.log(calcularTotal(10, 3)); // undefined`,
      why: "La funció fa el càlcul i el guarda en una variable local, que desapareix quan la funció acaba. Sense `return`, el resultat no surt mai de la funció i la crida val `undefined`.",
      fix: `function calcularTotal(preu, quantitat) {
  const total = preu * quantitat;
  return total;
}

console.log(calcularTotal(10, 3)); // 30`,
    },
    {
      title: 'Cridar una funció sense parèntesis',
      bad: `function saludar() {
  return "Hola!";
}

console.log(saludar); // ƒ saludar()`,
      why: "Sense parèntesis no es crida la funció: s'hi fa referència, com a qualsevol altra variable. Per això la consola mostra la funció mateixa en lloc del seu resultat. Els parèntesis són el que la posa en marxa.",
      fix: `function saludar() {
  return "Hola!";
}

console.log(saludar()); // Hola!`,
    },
    {
      title: 'Mostrar el resultat i després intentar fer-lo servir',
      bad: `function sumar(a, b) {
  console.log(a + b);
}

const total = sumar(2, 3) + 10;
console.log(total); // NaN`,
      why: "`sumar` mostra un 5 a la consola, però no el retorna: la crida val `undefined`, i `undefined + 10` dona `NaN`. Veure el 5 a la consola fa pensar que la funció «funciona».",
      fix: `function sumar(a, b) {
  return a + b;
}

const total = sumar(2, 3) + 10;
console.log(total); // 15`,
    },
    {
      title: 'Escriure codi després del return',
      bad: `function crearMissatge(nom) {
  return \`Hola, \${nom}\`;
  console.log("Missatge creat");
}`,
      why: "`return` acaba la funció a l'instant. La línia de sota no s'executa mai, i no hi ha cap error que t'avisi. Tot el que hagi de passar ha d'anar abans del `return`.",
      fix: `function crearMissatge(nom) {
  console.log("Creant el missatge");
  return \`Hola, \${nom}\`;
}`,
    },
    {
      title: "Fer servir una variable local fora de la funció",
      bad: `function calcularIva(preu) {
  const importIva = preu * 0.21;
}

calcularIva(100);
console.log(importIva);`,
      message: 'Uncaught ReferenceError: importIva is not defined',
      why: "`importIva` només existeix dins de la funció. Per fer servir el resultat a fora, la funció l'ha de retornar i qui la crida l'ha de guardar.",
      fix: `function calcularIva(preu) {
  return preu * 0.21;
}

const importIva = calcularIva(100);
console.log(importIva);`,
    },
  ],

  exercises: [
    {
      id: 'doblar',
      title: 'El doble',
      statement: "Escriu una funció `doblar` que rebi un nombre i en **retorni** el doble. Les dues crides del final ja estan escrites: no les modifiquis.",
      expectedOutput: ['8', '20'],
      starter: `// Declara aquí la funció doblar


console.log(doblar(4));
console.log(doblar(10));`,
      hint: "La funció necessita un paràmetre i una sola línia amb `return`. Fixa't que qui mostra el resultat són els `console.log` de fora.",
      solution: `function doblar(numero) {
  return numero * 2;
}

console.log(doblar(4));
console.log(doblar(10));`,
      explanation: "La funció no mostra res: calcula i retorna. Són les crides de fora les que decideixen què fer amb el resultat. Si haguessis posat un `console.log` dins de la funció en lloc del `return`, les dues últimes línies mostrarien `undefined`.",
    },
    {
      id: 'preu-amb-iva',
      title: 'Preu amb IVA, per a qualsevol IVA',
      statement: "Escriu una funció `calcularPreuAmbIva` que rebi dos paràmetres, el preu i l'IVA (en tant per u), i retorni el preu final.",
      expectedOutput: ['121', '55'],
      starter: `// Declara aquí la funció calcularPreuAmbIva


console.log(calcularPreuAmbIva(100, 0.21));
console.log(calcularPreuAmbIva(50, 0.1));`,
      hint: "Dos paràmetres separats per una coma. L'ordre en què els declaris ha de coincidir amb l'ordre dels arguments de les crides: primer el preu, després l'IVA.",
      solution: `function calcularPreuAmbIva(preu, iva) {
  return preu + preu * iva;
}

console.log(calcularPreuAmbIva(100, 0.21));
console.log(calcularPreuAmbIva(50, 0.1));`,
      explanation: "En convertir l'IVA en un paràmetre, la mateixa funció serveix per al tipus general, el reduït i qualsevol altre. Com més coses rep una funció pels paràmetres, menys coses porta fixades a dins i més reutilitzable és.",
    },
    {
      id: 'major-edat',
      title: "És major d'edat?",
      statement: "Escriu una funció `esMajorEdat` que rebi una edat i retorni `true` si és 18 o més, i `false` si no.",
      expectedOutput: ['true', 'false'],
      starter: `// Declara aquí la funció esMajorEdat


console.log(esMajorEdat(20));
console.log(esMajorEdat(15));`,
      hint: "Una comparació ja dona un booleà. No et cal cap `if`: pots retornar directament el resultat de la comparació.",
      solution: `function esMajorEdat(edat) {
  return edat >= 18;
}

console.log(esMajorEdat(20));
console.log(esMajorEdat(15));`,
      explanation: "`edat >= 18` val `true` o `false`, i això és exactament el que volem retornar. Escriure `if (edat >= 18) { return true; } else { return false; }` dona el mateix resultat amb cinc línies més.",
    },
    {
      id: 'salutacio',
      title: 'Una salutació per a cada hora',
      statement: "Escriu una funció `crearSalutacio` que rebi un nom i una hora (de 0 a 23) i retorni la salutació adequada: «Bon dia» abans de les 14, «Bona tarda» abans de les 21 i «Bona nit» la resta.",
      expectedOutput: ['Bon dia, Anna', 'Bona tarda, Marc', 'Bona nit, Júlia'],
      starter: `// Declara aquí la funció crearSalutacio


console.log(crearSalutacio("Anna", 9));
console.log(crearSalutacio("Marc", 16));
console.log(crearSalutacio("Júlia", 22));`,
      hint: "Fes servir retorns anticipats: un `if` amb el seu `return` per a cada franja i un `return` final per al cas que queda. El text es construeix amb un template literal.",
      solution: `function crearSalutacio(nom, hora) {
  if (hora < 14) {
    return \`Bon dia, \${nom}\`;
  }
  if (hora < 21) {
    return \`Bona tarda, \${nom}\`;
  }
  return \`Bona nit, \${nom}\`;
}

console.log(crearSalutacio("Anna", 9));
console.log(crearSalutacio("Marc", 16));
console.log(crearSalutacio("Júlia", 22));`,
      explanation: "Cada `return` acaba la funció, i per això no calen `else`: si s'arriba al segon `if` és perquè l'hora ja no és inferior a 14. La funció retorna el text i no sap res de la consola, de manera que demà es podria fer servir per escriure la salutació a la pàgina.",
    },
  ],

  finalExercise: {
    id: 'validador',
    title: 'El validador de tasques',
    statement: [
      "Escriu una funció `validarTasca` que rebi el text d'una tasca i retorni un **missatge** amb el resultat de la validació, seguint aquestes regles en aquest ordre:",
      "Si el text és buit: «El text no pot ser buit». Si té menys de 3 caràcters: «El text és massa curt». Si en té més de 40: «El text és massa llarg». En qualsevol altre cas: «Correcte».",
    ],
    expectedOutput: [
      '"" → El text no pot ser buit',
      '"Hi" → El text és massa curt',
      '"Estudiar JavaScript" → Correcte',
    ],
    starter: `// 1. Declara aquí la funció validarTasca(text)


// 2. No toquis aquest codi: posa a prova la teva funció
const proves = ["", "Hi", "Estudiar JavaScript"];

for (let i = 0; i < proves.length; i++) {
  console.log(\`"\${proves[i]}" → \${validarTasca(proves[i])}\`);
}`,
    hint: [
      "El nombre de caràcters d'un text és `text.length`. Per saber si és buit, compara'l amb `\"\"`.",
      "Fes servir retorns anticipats, un per regla, i deixa `return \"Correcte\";` per al final.",
    ],
    solution: `// 1. Declara aquí la funció validarTasca(text)
function validarTasca(text) {
  if (text === "") {
    return "El text no pot ser buit";
  }
  if (text.length < 3) {
    return "El text és massa curt";
  }
  if (text.length > 40) {
    return "El text és massa llarg";
  }
  return "Correcte";
}

// 2. No toquis aquest codi: posa a prova la teva funció
const proves = ["", "Hi", "Estudiar JavaScript"];

for (let i = 0; i < proves.length; i++) {
  console.log(\`"\${proves[i]}" → \${validarTasca(proves[i])}\`);
}`,
    explanation: [
      "La funció té una sola feina: decidir què es pot dir d'un text. No el demana, no el mostra i no el guarda. Per això el bucle de proves la pot cridar amb tres textos diferents sense que la funció sàpiga d'on venen.",
      "L'ordre de les regles importa: un text buit també té menys de 3 caràcters, però volem donar el missatge més precís. La comprovació més específica va primer.",
    ],
  },

  summary: [
    "Una funció és un bloc de codi amb nom: es **declara** una vegada i es **crida** tantes com calgui.",
    "Els **paràmetres** són les variables de la declaració; els **arguments**, els valors de cada crida.",
    "`return` torna un valor a qui ha cridat la funció i l'acaba a l'instant. Sense `return`, la funció dona `undefined`.",
    "Retornar no és mostrar: `console.log` escriu per a les persones; `return` lliura el valor al programa.",
    "Les variables declarades dins d'una funció són locals: no existeixen a fora.",
    "`(a, b) => a + b` és una arrow function: una manera curta d'escriure funcions petites.",
    "Cada funció, una sola feina, i un nom que l'expliqui.",
  ],

  quiz: [
    {
      question: "En aquest codi, què són `a` i `b`?",
      code: `function sumar(a, b) {
  return a + b;
}

sumar(2, 3);`,
      options: [
        { text: 'Paràmetres', correct: true },
        { text: 'Arguments', why: "Els arguments són els valors concrets de la crida: `2` i `3`." },
        { text: 'Variables globals', why: "Només existeixen dins de la funció: són variables locals." },
        { text: 'Valors de retorn', why: "El valor de retorn és el resultat d'`a + b`, no `a` ni `b`." },
      ],
      explanation: "Els paràmetres són els noms que apareixen a la declaració. Reben els arguments (`2` i `3`) en el moment de la crida.",
    },
    {
      question: "Què mostra l'última línia d'aquest codi?",
      code: `function saludar(nom) {
  console.log(\`Hola, \${nom}\`);
}

const resultat = saludar("Anna");
console.log(resultat);`,
      options: [
        { text: '`undefined`', correct: true },
        { text: '`Hola, Anna`', why: "Aquest text el mostra el `console.log` de dins de la funció, però no es retorna: a `resultat` no s'hi guarda." },
        { text: '`Anna`', why: "`\"Anna\"` és l'argument que entra a la funció, no el que en surt." },
        { text: 'Un error', why: "Guardar el resultat d'una funció sense `return` és vàlid: senzillament val `undefined`." },
      ],
      explanation: "La funció mostra un missatge però no retorna res. Una funció sense `return` dona `undefined`, i això és el que es guarda a `resultat`.",
    },
    {
      question: "Què passa quan s'executa aquest codi?",
      code: `function calcular() {
  const total = 50;
  return total;
}

calcular();
console.log(total);`,
      options: [
        { text: "Un ReferenceError: `total` no existeix fora de la funció.", correct: true },
        { text: 'Es mostra `50`.', why: "La funció retorna 50, però ningú guarda aquest valor, i la variable `total` és local." },
        { text: 'Es mostra `undefined`.', why: "`undefined` seria el valor d'una variable declarada sense valor. Aquí, fora de la funció, la variable ni tan sols està declarada." },
        { text: 'Es mostra `0`.', why: "Les variables no tenen un valor inicial de 0. I aquesta no existeix a fora." },
      ],
      explanation: "`total` és una variable local de `calcular`. Per fer servir el resultat caldria guardar-lo: `const total = calcular();`.",
    },
    {
      question: "Quina arrow function equival a aquesta funció?",
      code: `function triple(n) {
  return n * 3;
}`,
      options: [
        { text: '`const triple = (n) => n * 3;`', correct: true },
        { text: '`const triple = (n) => { n * 3 };`', why: "Amb claus cal escriure `return`. Tal com està, la funció retorna `undefined`." },
        { text: '`const triple = n * 3;`', why: "Això no és una funció: és un càlcul que s'executa una sola vegada, i a més `n` no existeix." },
        { text: '`function triple = (n) => n * 3;`', why: "Barreja les dues sintaxis i no és vàlid: una arrow function es guarda en una variable declarada amb `const`." },
      ],
      explanation: "Sense claus, una arrow function retorna automàticament el valor de la seva única expressió.",
    },
    {
      question: "Què es veu a la consola?",
      code: `function prova() {
  return "A";
  console.log("B");
}

console.log(prova());`,
      options: [
        { text: 'Només A', correct: true },
        { text: 'B i després A', why: "El `console.log(\"B\")` és després del `return`, i mai s'arriba a executar." },
        { text: 'A i després B', why: "`return` acaba la funció immediatament: la línia de sota no s'executa." },
        { text: '`undefined`', why: "La funció sí que té un `return` que s'executa, i retorna `\"A\"`." },
      ],
      explanation: "`return` torna el valor i acaba la funció. El codi que hi ha a continuació dins de la mateixa funció és inabastable.",
    },
  ],
};
