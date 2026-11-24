import { p, list, steps, code, example, concept, warning, challenge, project, table, compare } from '../../blocks.js';

// Un document HTML sencer, amb el que es vulgui dins del <body>.
// Als apartats sobre l'esquelet, els exemples són fitxers complets.
const pagina = (titol, cos) => `<!DOCTYPE html>
<html lang="ca">
  <head>
    <meta charset="UTF-8">
    <title>${titol}</title>
  </head>
  <body>
${cos}
  </body>
</html>`;

// Un tros de pàgina amb un títol i dos apartats.
const HTML_APARTATS = `<h1>Camins</h1>
<p>Rutes de muntanya per a tots els nivells.</p>

<h2>Rutes fàcils</h2>
<p>Per començar: poc desnivell i camins ben marcats.</p>

<h2>Rutes difícils</h2>
<p>Per a qui ja té experiència i bona forma.</p>`;

const FITXER_INDEX = { html: 'index.html' };

export const glossary = [
  {
    term: 'HTML',
    definition:
      "Llenguatge de marques amb què s'escriu el contingut d'una pàgina web. Diu què és cada part (un títol, un paràgraf, una imatge), no com es veu.",
  },
  {
    term: 'Etiqueta',
    definition:
      "Marca d'HTML: un nom entre `<` i `>`. Gairebé totes van per parelles, una d'obertura (`<p>`) i una de tancament (`</p>`).",
  },
  {
    term: 'Element',
    definition:
      "El conjunt d'una etiqueta d'obertura, el seu contingut i l'etiqueta de tancament. `<p>Hola</p>` és un element paràgraf.",
  },
  {
    term: 'Atribut',
    definition:
      'Informació extra que s\'escriu dins de l\'etiqueta d\'obertura, amb un nom i un valor entre cometes: `lang="ca"`.',
  },
  {
    term: 'Element buit',
    definition: 'Element que no té contingut ni etiqueta de tancament, com `<br>` o `<meta>`.',
  },
  {
    term: 'Niuament',
    definition:
      "Posar un element dins d'un altre. El de fora és el pare i el de dins, el fill. L'últim element que s'obre és el primer que s'ha de tancar.",
  },
  {
    term: 'Sagnat',
    definition:
      'Espais al principi de cada línia de codi que mostren qui és dins de qui. El navegador els ignora: són per a les persones.',
  },
  {
    term: 'Comentari',
    definition: 'Text entre `<!--` i `-->` que el navegador no mostra. Serveix per deixar notes dins del codi.',
  },
];

export default {
  id: 'html-esquelet',
  number: 1,
  title: "HTML: l'esquelet d'una pàgina",
  shortTitle: "L'esquelet d'una pàgina",
  description:
    "Què és l'HTML i com s'escriu: etiquetes, elements i atributs, i el document mínim que tota pàgina necessita per existir.",

  problem: {
    title: 'Vull fer una pàgina web i no sé ni què he d\'escriure a la primera línia',
    text: [
      "Obres l'editor, crees un fitxer en blanc i el cursor es queda parpellejant. Què s'hi escriu? Com sap el navegador que una línia és el títol i una altra, un paràgraf? I per què totes les pàgines que has vist per dins comencen amb les mateixes quatre o cinc línies estranyes?",
      "Una pàgina web és un fitxer de text, i res més. El navegador el llegeix de dalt a baix i el dibuixa. Però no endevina res: cal dir-li què és cada tros. El llenguatge amb què l'hi diem és l'HTML.",
      "En aquesta unitat escriuràs la teva primera pàgina, sencera. No serà bonica: l'aspecte és feina del CSS, que arriba a la unitat 3. Però serà una pàgina de veritat, amb totes les peces que el navegador espera trobar-hi.",
    ],
  },

  goals: [
    "Explicar quina feina fa l'HTML i quina no.",
    "Escriure elements amb l'etiqueta d'obertura, el contingut i l'etiqueta de tancament.",
    'Escriure de memòria el document mínim: `<!DOCTYPE html>`, `<html>`, `<head>` i `<body>`.',
    'Afegir atributs a una etiqueta.',
    'Niuar elements i sagnar el codi perquè es vegi qui és dins de qui.',
    'Fer servir comentaris i saber què fa el navegador amb els espais i els salts de línia.',
  ],

  projectPiece:
    'Neix la web de rutes: el fitxer `index.html`, amb el seu esquelet, el nom de la pestanya i el primer encapçalament.',

  finalProject:
    'Les dues pàgines del teu projecte, `index.html` i `video.html`, començaran amb aquest mateix esquelet.',

  sections: [
    {
      id: 'que-es-html',
      title: "Què és l'HTML",
      blocks: [
        p("Una pàgina web és, abans que res, un **fitxer de text**. El pots obrir amb qualsevol editor i llegir-lo. El que el fa especial és que el text porta **marques** que diuen què és cada tros: això és un títol, això és un paràgraf."),
        p("Aquestes marques són l'**HTML** (*HyperText Markup Language*, «llenguatge de marques d'hipertext»). El navegador llegeix el fitxer, entén les marques i dibuixa la pàgina."),
        example({
          title: 'El mateix text, sense marques i amb marques',
          intro: "A dalt hi ha tres línies de text sense marcar. A sota, les mateixes tres línies dient què és cada una. De moment és només un tros de pàgina: el que hi falta ho veurem d'aquí a dos apartats.",
          html: `Camins
Rutes de muntanya per a tots els nivells.
Tria'n una i surt a caminar.

<h1>Camins</h1>
<p>Rutes de muntanya per a tots els nivells.</p>
<p>Tria'n una i surt a caminar.</p>`,
          expected: 'Primer, les tres línies enganxades en una de sola, sense cap diferència entre elles. Després, un títol gran i dos paràgrafs separats.',
          why: "Sense marques, el navegador no sap on acaba una cosa i on comença l'altra: ho tracta tot com un sol text seguit. Amb `<h1>` i `<p>` sap que hi ha un títol i dos paràgrafs, i els dibuixa com a tals.",
        }),
        concept(
          "L'HTML diu què és, no com es veu",
          "L'HTML descriu l'**estructura** del contingut: quines peces hi ha i què és cada una. L'aspecte (colors, lletres, mides, on va cada cosa) és feina d'un altre llenguatge, el CSS, que comença a la [unitat 3](#/unitat/css-primers-passos). Si ara les pàgines et semblen lletges, és normal: és l'aspecte que els dona el navegador quan ningú li ha dit res."
        ),
        table(
          ['Llenguatge', "De què s'encarrega", 'Què diria'],
          [
            ['HTML', "L'estructura: què hi ha a la pàgina", '«Això és un títol»'],
            ['CSS', "L'aspecte: com es veu", '«Els títols, verds i centrats»'],
            ['JavaScript', 'El comportament: què fa', '«Quan es premi el botó, obre el menú»'],
          ],
          'Tres llenguatges, tres feines'
        ),
        p("L'HTML tampoc és un llenguatge de programació: no fa càlculs ni pren decisions. Per això no hi ha res que es pugui «penjar». Si t'equivoques, el navegador no et mostra cap error: fa el que pot amb el que troba. És còmode, però vol dir que els errors s'han de buscar mirant la pàgina i el codi."),
      ],
    },

    {
      id: 'etiquetes',
      title: 'Etiquetes i elements',
      blocks: [
        p("Una marca s'escriu amb una **etiqueta**: un nom entre els signes `<` i `>`. Gairebé totes van per parelles. L'**etiqueta d'obertura**, `<p>`, diu on comença una cosa. L'**etiqueta de tancament**, `</p>`, que és igual però amb una barra davant del nom, diu on s'acaba. El que queda al mig és el **contingut**."),
        code('<p>Rutes de muntanya per a tots els nivells.</p>', { lang: 'html', title: 'Un paràgraf' }),
        list(
          "`<p>` és l'etiqueta d'obertura.",
          '«Rutes de muntanya per a tots els nivells.» és el contingut.',
          "`</p>` és l'etiqueta de tancament.",
          'Tot plegat, de la primera `<` a l\'última `>`, és un **element**.'
        ),
        p("El nom de l'etiqueta diu quina mena d'element és. Amb tres en tens prou per començar:"),
        table(
          ['Etiqueta', 'Què marca'],
          [
            ['`<h1>`', "L'encapçalament principal: el títol de la pàgina"],
            ['`<h2>`', "L'encapçalament d'un apartat"],
            ['`<p>`', 'Un paràgraf de text'],
          ],
          'Les tres primeres etiquetes'
        ),
        example({
          title: 'Un títol i dos apartats',
          intro: "Canvia un `<h2>` per `<h1>`, o un `<p>` per `<h2>`, i mira com canvia el resultat. Recorda canviar també l'etiqueta de tancament.",
          html: HTML_APARTATS,
          expected: 'Un títol gran i, a sota, dos apartats: cadascun amb un títol una mica més petit i un paràgraf.',
          why: "El navegador dona a cada element un aspecte per defecte: els encapçalaments, grans i en negreta; els paràgrafs, amb una separació a dalt i a baix. Però no triïs l'etiqueta per la mida de la lletra: tria-la pel que **és** el text. La mida ja la canviarem amb CSS.",
        }),
        concept(
          'Etiqueta i element no són el mateix',
          "L'**etiqueta** és la marca: `<p>`. L'**element** és el conjunt sencer: obertura, contingut i tancament. Quan diem «afegeix un paràgraf» parlem de l'element, amb les seves dues etiquetes."
        ),
        warning(
          "L'etiqueta de tancament no és opcional",
          "Si obres un `<h2>` i no el tanques, el navegador no sap on s'acaba el títol i hi fica tot el que ve després. No avisa: simplement la resta de la pàgina surt amb lletra de títol."
        ),
        example({
          title: 'Què passa quan no tanques una etiqueta',
          intro: 'A la primera línia falta `</h2>`. Afegeix-lo al final de la línia i mira com els dos paràgrafs tornen a ser paràgrafs.',
          html: `<h2>Rutes fàcils
<p>Per començar: poc desnivell i camins ben marcats.</p>
<p>Aquest paràgraf també ha quedat dins del títol.</p>`,
          expected: 'Les tres línies surten grans i en negreta, com si tot fos un títol.',
          why: "Com que el títol no es tanca, el navegador considera que els dos paràgrafs encara són dins seu. No hi ha cap missatge d'error. Per això val la pena acostumar-se a escriure el tancament de seguida, abans que el contingut.",
        }),
        challenge({
          title: 'Un tercer apartat',
          statement: "Afegeix, entre els dos apartats que ja hi ha, un de nou: un encapçalament amb el text «Rutes mitjanes» i, a sota, un paràgraf que les descrigui amb les teves paraules.",
          html: HTML_APARTATS,
          hint: "Fixa't en com està escrit l'apartat «Rutes fàcils»: són dues línies, un `<h2>` i un `<p>`. El teu ha d'anar just abans de la línia de «Rutes difícils».",
          solution: {
            html: `<h1>Camins</h1>
<p>Rutes de muntanya per a tots els nivells.</p>

<h2>Rutes fàcils</h2>
<p>Per començar: poc desnivell i camins ben marcats.</p>

<h2>Rutes mitjanes</h2>
<p>Més llargues i amb més pujada, però sense passos complicats.</p>

<h2>Rutes difícils</h2>
<p>Per a qui ja té experiència i bona forma.</p>`,
          },
          explanation: "Un apartat són dos elements seguits: l'encapçalament i el paràgraf. Cap dels dos és dins de l'altre; van l'un després de l'altre, cadascun amb les seves dues etiquetes.",
          checks: [
            { label: "Hi ha tres encapçalaments d'apartat", selector: 'h2', count: 3 },
            { label: 'El segon es diu «Rutes mitjanes»', selector: 'h2:nth-of-type(2)', text: 'Rutes mitjanes' },
            { label: 'Hi ha quatre paràgrafs', selector: 'p', count: 4 },
            { label: "Cap paràgraf ha quedat dins d'un encapçalament", selector: 'h1 p, h2 p', exists: false },
          ],
        }),
      ],
    },

    {
      id: 'document-minim',
      title: 'El document mínim',
      blocks: [
        p("Fins ara hem escrit trossos. Una pàgina de veritat necessita unes quantes peces més al voltant, sempre les mateixes. Són poques, i les escriuràs a cada pàgina que facis."),
        example({
          title: 'La pàgina més petita possible',
          intro: "Aquest és un fitxer HTML sencer. Canvia el text de dins de `<title>` i fixa't en la barra de sobre de la pàgina, al costat dels tres punts: fa de pestanya del navegador.",
          html: pagina(
            'Camins',
            `    <h1>Camins</h1>
    <p>Rutes de muntanya per a tots els nivells.</p>`
          ),
          fileNames: FITXER_INDEX,
          expected: 'A la pàgina, el títol «Camins» i un paràgraf. A la barra de sobre, on en altres exemples diu «Pàgina», aquí diu «Camins».',
          why: "Només es dibuixa el que hi ha dins del `<body>`. El `<title>` és dins del `<head>`: no surt a la pàgina, sinó a la pestanya.",
        }),
        p('Anem peça per peça, de dalt a baix:'),
        table(
          ['Peça', 'Què diu al navegador'],
          [
            ['`<!DOCTYPE html>`', 'Que això és un document HTML modern. Va sempre a la primera línia i no es tanca.'],
            ['`<html lang="ca">` … `</html>`', "L'element que ho conté tot. `lang` diu en quin idioma està escrita la pàgina."],
            ['`<head>` … `</head>`', 'El cap: informació **sobre** la pàgina. No es dibuixa.'],
            ['`<meta charset="UTF-8">`', 'Com estan desats els caràcters. Sense això, els accents i la ç es poden veure malament.'],
            ['`<title>` … `</title>`', 'El nom de la pàgina: surt a la pestanya, als preferits i als resultats dels cercadors.'],
            ['`<body>` … `</body>`', 'El cos: tot el que es veu a la pàgina.'],
          ],
          "Les peces de l'esquelet"
        ),
        concept(
          'El cap i el cos',
          "Un document HTML té dues parts, i cada cosa va a la seva. Al `<head>` hi va el que el navegador ha de **saber** de la pàgina. Al `<body>`, el que la persona ha de **veure**. Quan dubtis d'on va una etiqueta, pregunta't: això es veu?"
        ),
        example({
          title: 'El nom de la pestanya i el títol de la pàgina',
          intro: "Una pàgina té dos «títols», i no cal que diguin el mateix. Canvia'n un i després l'altre, i mira on es veu cada canvi.",
          html: pagina(
            'Vall de Núria · Camins',
            `    <h1>Vall de Núria</h1>
    <p>Una ruta de 9 quilòmetres, de dificultat mitjana.</p>`
          ),
          fileNames: { html: 'ruta.html' },
          expected: 'A la barra de sobre, «Vall de Núria · Camins». A la pàgina, el títol «Vall de Núria» i un paràgraf.',
          why: "`<title>` és el nom del document: el que es veu a la pestanya quan tens deu pàgines obertes, i per això sol incloure el nom del lloc. `<h1>` és el títol que llegeix qui ja és dins de la pàgina.",
        }),
        warning(
          '`<!DOCTYPE html>` no és una etiqueta com les altres',
          "No té tancament ni contingut, i s'escriu una sola vegada, a la primera línia. Si te'l deixes, el navegador encara mostra la pàgina, però ho fa amb unes regles antigues, pensades per a pàgines de fa vint anys, i alguns estils es comporten de manera estranya. Posa'l sempre."
        ),
        challenge({
          title: 'Posa nom a la pestanya',
          statement: 'A aquesta pàgina li falta el nom de la pestanya: a la barra de sobre hi diu «Pàgina». Afegeix-hi un `<title>` amb el text «Consells · Camins», al lloc que li toca.',
          html: `<!DOCTYPE html>
<html lang="ca">
  <head>
    <meta charset="UTF-8">
  </head>
  <body>
    <h1>Consells per sortir a la muntanya</h1>
    <p>Mira el temps abans de sortir i porta sempre aigua.</p>
  </body>
</html>`,
          fileNames: { html: 'consells.html' },
          hint: 'El `<title>` no es veu a la pàgina. A quina de les dues parts del document va el que no es veu?',
          solution: {
            html: pagina(
              'Consells · Camins',
              `    <h1>Consells per sortir a la muntanya</h1>
    <p>Mira el temps abans de sortir i porta sempre aigua.</p>`
            ),
          },
          explanation: "El `<title>` va dins del `<head>`, amb el `<meta charset>`. Si l'haguessis escrit dins del `<body>`, la pestanya també hauria canviat, perquè el navegador és molt tolerant, però el document estaria mal escrit.",
          checks: [
            { label: 'La pestanya diu «Consells · Camins»', title: 'Consells · Camins' },
            { label: 'El `<title>` és dins del `<head>`', selector: 'head > title' },
            { label: 'Dins del `<body>` no hi ha cap `<title>`', selector: 'body title', exists: false },
          ],
        }),
      ],
    },

    {
      id: 'atributs',
      title: "Atributs: informació extra dins de l'etiqueta",
      blocks: [
        p('Algunes etiquetes necessiten dir alguna cosa més. Al document mínim n\'hi ha dues: `<html lang="ca">` i `<meta charset="UTF-8">`. Aquest tros extra és un **atribut**.'),
        code('<html lang="ca">', { lang: 'html', title: 'Una etiqueta amb un atribut' }),
        list(
          "S'escriu **dins de l'etiqueta d'obertura**, després del nom i separat per un espai.",
          'Té un **nom** (`lang`), un signe igual i un **valor entre cometes** (`"ca"`).',
          'Una etiqueta pot tenir diversos atributs, separats per espais.',
          "L'etiqueta de tancament no porta mai atributs."
        ),
        example({
          title: 'Un atribut amb valor i un sense',
          intro: 'El segon paràgraf té l\'atribut `hidden`. Esborra\'l (només la paraula `hidden`) i el paràgraf apareixerà.',
          html: pagina(
            'Camins',
            `    <h1>Camins</h1>
    <p>Rutes de muntanya per a tots els nivells.</p>
    <p hidden>Aquest paràgraf hi és, però no es mostra.</p>
    <p lang="en">Mountain routes for everyone.</p>`
          ),
          fileNames: FITXER_INDEX,
          expected: 'Es veuen el títol i dos paràgrafs: el primer i el que està en anglès. El del mig no surt.',
          why: '`hidden` és un atribut sense valor: n\'hi ha prou que hi sigui perquè l\'element no es mostri. `lang="en"` sí que en té: diu que aquell paràgraf concret està en anglès, encara que la resta de la pàgina sigui en català.',
        }),
        p("Fixa't que `lang` no canvia res a la vista. Molts atributs són així: no són per a qui mira la pàgina, sinó per a qui la llegeix d'una altra manera. Un lector de pantalla fa servir `lang` per triar la pronúncia, i un traductor automàtic, per saber de quin idioma parteix. Una pàgina ben feta no és només la que es veu bé."),
        table(
          ['Atribut', 'On va', 'Què diu'],
          [
            ['`lang="ca"`', "A `<html>` o a qualsevol element", 'En quin idioma està escrit el contingut'],
            ['`charset="UTF-8"`', 'A `<meta>`', 'Com estan desats els caràcters del fitxer'],
            ['`hidden`', 'A qualsevol element', "Que l'element no s'ha de mostrar"],
          ],
          'Els atributs que has vist fins ara'
        ),
        warning(
          'El valor, sempre entre cometes',
          "`lang=ca`, sense cometes, sovint funciona. Però quan el valor té un espai, el navegador el talla al primer espai i la resta es perd. Escriu sempre el valor entre cometes dobles i no hi hauràs de pensar mai."
        ),
      ],
    },

    {
      id: 'niuament',
      title: "Elements dins d'elements: el niuament",
      blocks: [
        p("Mira el document mínim una altra vegada. El `<title>` és **dins** del `<head>`. El `<head>` és dins de l'`<html>`. Un element pot contenir altres elements, i d'això se'n diu **niuar**."),
        code(
          `<html>
  <head>
    <title>…</title>
  </head>
  <body>
    <h1>…</h1>
    <p>…</p>
  </body>
</html>`,
          { lang: 'html', title: 'Qui és dins de qui' }
        ),
        p("Per parlar-ne fem servir paraules de família. L'`<html>` és el **pare** del `<head>` i del `<body>`. Ells dos són els seus **fills** i, entre ells, **germans**. El `<body>` és, alhora, fill de l'`<html>` i pare del `<h1>` i del `<p>`."),
        concept(
          'Capses dins de capses',
          "Pensa en cada element com una capsa. Dins d'una capsa n'hi pots posar d'altres, però una capsa no pot estar mig dins i mig fora d'una altra. Per això **l'últim element que has obert és el primer que has de tancar**. Aquesta idea, capses dins de capses, és la més important de tot el dossier: a la [unitat 5](#/unitat/contenidors) tornarà amb el nom de «pensar en quadrats»."
        ),
        compare(
          {
            title: 'Etiquetes creuades',
            tone: 'bad',
            lang: 'html',
            code: `<head>
  <title>Camins</head>
</title>`,
            text: 'El `<title>` s\'obre dins del `<head>` i es tanca fora. La capsa de dins sobresurt de la de fora.',
          },
          {
            title: 'Ben niuat',
            tone: 'good',
            lang: 'html',
            code: `<head>
  <title>Camins</title>
</head>`,
            text: "El `<title>` s'obre i es tanca dins del `<head>`. Primer es tanca el de dins; després, el de fora.",
          }
        ),
        example({
          title: 'Cada element és una caixa',
          intro: 'Aquest exemple comença amb el botó «Quadrats» activat: el dossier dibuixa una línia al voltant de cada element del `<body>`. Desactiva\'l i torna\'l a activar.',
          html: pagina(
            'Camins',
            `    <h1>Camins</h1>
    <p>Rutes de muntanya per a tots els nivells.</p>
    <h2>Rutes fàcils</h2>
    <p>Poc desnivell i camins ben marcats.</p>`
          ),
          fileNames: FITXER_INDEX,
          boxes: true,
          expected: "Quatre rectangles de línia discontínua, l'un sota l'altre: un per a cada element. Tots ocupen tota l'amplada de la pàgina.",
          why: "Per al navegador, cada element és una caixa rectangular, encara que normalment no se'n vegin les vores. De moment queda't només amb això: és una curiositat que d'aquí a unes unitats es convertirà en l'eina principal per col·locar les coses a la pàgina.",
        }),
        p("El navegador no necessita espais ni salts de línia per entendre el niuament. Qui els necessita ets tu. El **sagnat** consisteix a escriure cada fill una mica més endins que el seu pare: dos espais per cada nivell. Així, les etiquetes d'obertura i de tancament d'un mateix element queden a la mateixa alçada i es veu d'un cop d'ull què hi ha dins de què."),
        example({
          title: 'El mateix document, sense sagnar',
          intro: "Aquest document és correcte i es veu perfectament. Ara intenta respondre ràpid: on es tanca el `<head>`? Quants fills té el `<body>`? Després, endreça'l: una etiqueta per línia i dos espais més per cada nivell.",
          html: `<!DOCTYPE html>
<html lang="ca"><head><meta charset="UTF-8"><title>Camins</title></head>
<body><h1>Camins</h1><p>Rutes de muntanya per a tots els nivells.</p>
<h2>Rutes fàcils</h2><p>Poc desnivell i camins ben marcats.</p></body></html>`,
          fileNames: FITXER_INDEX,
          expected: 'La pàgina es veu exactament igual abans i després d\'endreçar el codi: un títol, un paràgraf, un subtítol i un altre paràgraf.',
          why: "Per al navegador, els espais i els salts de línia entre etiquetes no compten. El sagnat és per a les persones: fa que el niuament es vegi, i que una etiqueta sense tancar salti a la vista.",
        }),
      ],
    },

    {
      id: 'comentaris-i-espais',
      title: 'Comentaris, espais i salts de línia',
      blocks: [
        p("Un **comentari** és una nota dins del codi: per a tu, o per a qui el llegeixi després. Comença amb `<!--` i s'acaba amb `-->`. El navegador se'l salta."),
        example({
          title: 'Notes que no es veuen',
          intro: "Hi ha tres comentaris. L'últim conté un paràgraf sencer: treu-li les marques de comentari, la del principi i la del final, i el paràgraf apareixerà.",
          html: pagina(
            'Camins',
            `    <!-- Capçalera de la pàgina -->
    <h1>Camins</h1>

    <!-- Pendent: afegir-hi la llista de rutes -->
    <p>Rutes de muntanya per a tots els nivells.</p>

    <!-- <p>Aquest paràgraf està desactivat.</p> -->`
          ),
          fileNames: FITXER_INDEX,
          expected: 'Només es veuen el títol i un paràgraf. Cap dels tres comentaris surt a la pàgina.',
          why: "Tot el que queda entre `<!--` i `-->` s'ignora, encara que a dins hi hagi etiquetes. Per això els comentaris també serveixen per «apagar» un tros de pàgina sense esborrar-lo.",
        }),
        warning(
          'Un comentari no és un secret',
          "No es veu a la pàgina, però viatja dins del fitxer: qualsevol persona que miri el codi de la pàgina el pot llegir. No hi escriguis contrasenyes ni res que no vulguis que es llegeixi."
        ),
        p("Segona cosa que sorprèn: el navegador **ajunta els espais**. Tants espais seguits com vulguis, tabuladors i salts de línia compten com **un sol espai**."),
        example({
          title: 'Molts espais, un de sol',
          intro: 'Afegeix encara més espais i més línies en blanc dins dels paràgrafs. La pàgina no es mou.',
          html: pagina(
            'Camins',
            `    <p>Aquest       paràgraf     té
    molts     espais    i

    salts    de    línia.</p>

    <p>Camí de Ronda
    12 km
    3 h 30 min</p>`
          ),
          fileNames: FITXER_INDEX,
          expected: 'Dos paràgrafs de text seguit, amb un únic espai entre paraula i paraula. Les tres dades de la ruta surten a la mateixa línia.',
          why: "El navegador converteix qualsevol tirada d'espais i salts de línia en un sol espai. Gràcies a això pots sagnar el codi com vulguis sense que la pàgina canviï. Però també vol dir que prémer Retorn a l'editor no fa cap salt de línia a la pàgina.",
        }),
        p("Si vols que el text continuï a la línia següent **sense** començar un paràgraf nou, hi ha una etiqueta per a això: `<br>`. És un **element buit**: no té contingut ni etiqueta de tancament. El `<meta>` del `<head>` també ho és."),
        example({
          title: 'Un salt de línia de veritat',
          intro: 'Les tres dades són dins del mateix paràgraf. Treu un `<br>` i mira què passa amb aquelles dues línies.',
          html: pagina(
            'Camins',
            `    <p>Camí de Ronda<br>
    12 km<br>
    3 h 30 min</p>`
          ),
          fileNames: FITXER_INDEX,
          expected: "Tres línies curtes, l'una sota l'altra i sense separació entre elles.",
          why: "`<br>` talla la línia allà on el poses. No obre cap paràgraf nou: per això entre les tres línies no hi ha l'espai que el navegador deixa entre paràgraf i paràgraf.",
        }),
        warning(
          '`<br>` no és per fer espai',
          "Per separar dos blocs de text, fes dos `<p>`. Posar dos o tres `<br>` seguits per «deixar aire» és un pedaç: l'espai entre elements es controla amb CSS. Fes servir `<br>` només quan el salt forma part del text, com en una adreça o en un poema."
        ),
      ],
    },

    {
      id: 'del-fitxer-al-navegador',
      title: 'Del fitxer al navegador',
      blocks: [
        p("Una pàgina es desa en un fitxer de text amb l'extensió `.html`. La pàgina principal d'un lloc web es diu, per costum, `index.html`: és la que el servidor ensenya quan algú entra a l'adreça del lloc sense demanar cap fitxer concret."),
        list(
          'Noms **en minúscules**: `consells.html`, no `Consells.HTML`.',
          '**Sense espais ni accents**: `ruta-nuria.html`, no `ruta Núria.html`. Les paraules se separen amb guions.',
          "Sempre amb l'extensió **`.html`**."
        ),
        p('Per provar-ho al teu ordinador:'),
        steps(
          'Crea una carpeta per al projecte.',
          "A dins, crea un fitxer que es digui `index.html` amb un editor de codi.",
          "Escriu-hi el document mínim i desa'l.",
          "Obre el fitxer amb el navegador: fes-hi doble clic o arrossega'l a una finestra.",
          'Cada vegada que canviïs el codi, desa i recarrega la pàgina.'
        ),
        p("Aquí al dossier no cal desar ni recarregar: la pàgina es torna a pintar mentre escrius. Però acostuma't des del primer dia a escriure els exemples també al teu ordinador. Llegir HTML i escriure'n són coses diferents."),
        concept(
          'Als exemples del dossier, només el `<body>`',
          "L'esquelet és sempre el mateix, i repetir-lo a cada exemple faria perdre de vista el que s'està explicant. **A partir d'ara, gairebé tots els exemples i exercicis ensenyen només el que va dins del `<body>`.** El dossier hi posa la resta. Quan escriguis una pàgina de veritat, l'esquelet l'has de posar tu."
        ),
        example({
          title: 'Només el que va dins del body',
          intro: "Aquest exemple té dues línies i prou. Es veu igual que si les haguessis escrit dins del `<body>` del document mínim.",
          html: `<h1>Camins</h1>
<p>Rutes de muntanya per a tots els nivells.</p>`,
          expected: 'El títol i el paràgraf. A la barra de sobre torna a dir «Pàgina»: aquí no hi ha cap `<title>`.',
          why: "El dossier embolcalla el que escrius amb el `<!DOCTYPE html>`, l'`<html>`, el `<head>` i el `<body>`. En un fitxer de veritat això no ho fa ningú per tu: si només hi escrius aquestes dues línies, el navegador les mostrarà, però el document estarà incomplet.",
        }),
        project(
          "La web de rutes ja existeix. De moment és un sol fitxer, `index.html`, amb l'esquelet complet, el nom de la pestanya i un parell de línies de contingut. Els comentaris marquen on aniran les peces que encara no sabem fer.",
          {
            title: 'index.html, el primer fitxer de la web de rutes',
            lang: 'html',
            code: pagina(
              'Camins · Rutes de muntanya',
              `    <!-- Capçalera -->
    <h1>Camins</h1>
    <p>Rutes de muntanya per a tots els nivells.</p>

    <!-- Rutes: les afegirem a la unitat següent -->
    <h2>Rutes destacades</h2>
    <p>Aviat hi haurà la llista de rutes.</p>`
            ),
          }
        ),
      ],
    },
  ],

  commonErrors: [
    {
      title: "Oblidar l'etiqueta de tancament",
      bad: `<h1>Camins
<p>Rutes de muntanya per a tots els nivells.</p>`,
      badLang: 'html',
      symptom: 'El paràgraf surt amb la mateixa lletra gran i en negreta que el títol.',
      why: "El `<h1>` no es tanca, i el navegador entén que el paràgraf encara forma part del títol. No hi ha cap missatge d'error.",
      fix: `<h1>Camins</h1>
<p>Rutes de muntanya per a tots els nivells.</p>`,
      fixLang: 'html',
    },
    {
      title: 'Tancar les etiquetes en un ordre equivocat',
      bad: `<head>
  <meta charset="UTF-8">
  <title>Camins</head>
</title>`,
      badLang: 'html',
      symptom: 'A la pestanya hi diu «Camins</head>», amb l\'etiqueta escrita com si formés part del nom.',
      why: "El `<title>` encara era obert quan ha arribat `</head>`. El navegador s'ho ha pres com a text del títol, i no com una etiqueta. L'últim element que s'obre és el primer que es tanca.",
      fix: `<head>
  <meta charset="UTF-8">
  <title>Camins</title>
</head>`,
      fixLang: 'html',
    },
    {
      title: 'Esperar que el `<title>` es vegi a la pàgina',
      bad: `<head>
  <meta charset="UTF-8">
  <title>Camins</title>
</head>
<body>
  <p>Rutes de muntanya per a tots els nivells.</p>
</body>`,
      badLang: 'html',
      symptom: 'La pestanya diu «Camins», però a la pàgina no hi ha cap títol: comença directament pel paràgraf.',
      why: "El `<title>` és el nom del document i va al `<head>`, que no es dibuixa. El títol que es veu a la pàgina és un altre element, el `<h1>`, i va al `<body>`. Gairebé sempre calen tots dos.",
      fix: `<head>
  <meta charset="UTF-8">
  <title>Camins</title>
</head>
<body>
  <h1>Camins</h1>
  <p>Rutes de muntanya per a tots els nivells.</p>
</body>`,
      fixLang: 'html',
    },
    {
      title: "Escriure l'atribut fora de l'etiqueta",
      bad: `<html> lang="ca"
  <head>`,
      badLang: 'html',
      symptom: 'A dalt de tot de la pàgina apareix el text lang="ca".',
      why: "L'etiqueta s'acaba al signe `>`. Tot el que ve després ja és contingut, i el navegador el mostra com a text. Un atribut ha d'anar abans del `>` de l'etiqueta d'obertura.",
      fix: `<html lang="ca">
  <head>`,
      fixLang: 'html',
    },
    {
      title: 'Esperar que un salt de línia del codi es vegi a la pàgina',
      bad: `<p>Camí de Ronda
12 km
3 h 30 min</p>`,
      badLang: 'html',
      symptom: 'Tot surt en una sola línia: «Camí de Ronda 12 km 3 h 30 min».',
      why: "El navegador converteix els salts de línia del codi en un espai. Per saltar de línia dins d'un text cal dir-ho amb una etiqueta.",
      fix: `<p>Camí de Ronda<br>
12 km<br>
3 h 30 min</p>`,
      fixLang: 'html',
    },
  ],

  exercises: [
    {
      id: 'marca-el-text',
      title: 'Marca el text',
      statement: "Aquest text no porta cap marca i el navegador l'ensenya tot seguit. Converteix la primera línia en l'encapçalament principal de la pàgina i cada una de les altres dues, en un paràgraf.",
      expected: 'Un títol gran, «Estany de Sant Maurici», i a sota dos paràgrafs separats.',
      html: `Estany de Sant Maurici
Una ruta fàcil de 7 quilòmetres al voltant de l'estany.
Es fa en unes 2 hores.`,
      hint: "Cada línia necessita dues etiquetes: una d'obertura al principi i una de tancament al final. La del títol principal és `<h1>`.",
      solution: {
        html: `<h1>Estany de Sant Maurici</h1>
<p>Una ruta fàcil de 7 quilòmetres al voltant de l'estany.</p>
<p>Es fa en unes 2 hores.</p>`,
      },
      explanation: "Ara el navegador sap que hi ha tres coses diferents: un títol i dos paràgrafs. Per això ja no les ajunta en una sola línia i dona a cada una l'aspecte que li toca.",
      checks: [
        { label: 'Hi ha un encapçalament principal amb el nom de la ruta', selector: 'h1', count: 1, text: 'Estany de Sant Maurici' },
        { label: 'Hi ha dos paràgrafs', selector: 'p', count: 2 },
        { label: 'El primer paràgraf parla dels 7 quilòmetres', selector: 'p', text: '7 quilòmetres' },
        { label: 'Cap paràgraf ha quedat dins del títol', selector: 'h1 p', exists: false },
      ],
    },
    {
      id: 'completa-l-esquelet',
      title: "Completa l'esquelet",
      statement: [
        "A aquest document li falten peces. Algú hi ha escrit el contingut, però gairebé res de l'esquelet.",
        'Afegeix-hi el `<head>` amb el `<meta charset="UTF-8">` i un `<title>` que digui «Consells · Camins», posa el contingut dins d\'un `<body>` i indica que la pàgina és en català amb `lang="ca"`.',
      ],
      expected: 'La pàgina es veu igual que abans, però ara la barra de sobre diu «Consells · Camins».',
      html: `<!DOCTYPE html>
<html>

<h1>Consells</h1>
<p>Porta sempre aigua i mira el temps abans de sortir.</p>

</html>`,
      fileNames: { html: 'consells.html' },
      hint: [
        "L'`<html>` té dos fills, i van en aquest ordre: primer el `<head>` i després el `<body>`.",
        "L'idioma és un atribut de l'etiqueta `<html>`. El `<meta>` i el `<title>` van dins del `<head>`.",
      ],
      solution: {
        html: pagina(
          'Consells · Camins',
          `    <h1>Consells</h1>
    <p>Porta sempre aigua i mira el temps abans de sortir.</p>`
        ),
      },
      explanation: "El navegador ja mostrava la pàgina, perquè és molt tolerant i s'inventa les peces que falten. Però no pot endevinar el nom de la pestanya ni l'idioma: això l'hi has de dir tu. Per això l'esquelet s'escriu sempre sencer.",
      checks: [
        { label: 'La pàgina diu que és en català', selector: 'html', attr: { lang: 'ca' } },
        { label: 'El `<head>` indica com estan desats els caràcters', selector: 'head > meta[charset]' },
        { label: 'La pestanya diu «Consells · Camins»', selector: 'head > title', text: 'Consells · Camins' },
        { label: 'La pàgina conserva el títol i el paràgraf', selector: 'body', text: ['Consells', 'aigua'] },
      ],
    },
    {
      id: 'etiquetes-sense-tancar',
      title: 'Dues etiquetes sense tancar',
      statement: "Aquesta pàgina es veu estranya: gairebé tot el text surt gran i en negreta. Hi ha dues etiquetes que no s'han tancat. Troba-les i tanca-les.",
      expected: 'Un títol, «Puigmal», un paràgraf, un subtítol, «Què cal portar», i dos paràgrafs més amb lletra normal.',
      html: pagina(
        'Puigmal · Camins',
        `    <h1>Puigmal
    <p>Una ruta difícil: 14 quilòmetres i 6 hores.</p>

    <h2>Què cal portar
    <p>Aigua, menjar i roba d'abric.</p>
    <p>A dalt fa vent tot l'any.</p>`
      ),
      fileNames: { html: 'ruta.html' },
      hint: "Mira què surt amb lletra de títol i no ho hauria de ser: l'etiqueta que falta és la de l'encapçalament que hi ha just a sobre.",
      solution: {
        html: pagina(
          'Puigmal · Camins',
          `    <h1>Puigmal</h1>
    <p>Una ruta difícil: 14 quilòmetres i 6 hores.</p>

    <h2>Què cal portar</h2>
    <p>Aigua, menjar i roba d'abric.</p>
    <p>A dalt fa vent tot l'any.</p>`
        ),
      },
      explanation: "Faltaven `</h1>` i `</h2>`. Sense el tancament, cada encapçalament s'empassava els paràgrafs que tenia a sota. Si escrius sempre les dues etiquetes abans que el contingut, aquest error no et passarà.",
      checks: [
        { label: 'El primer paràgraf ja no forma part del títol', selector: 'h1 p', exists: false },
        { label: "Els dos últims paràgrafs ja no formen part de l'encapçalament", selector: 'h2 p', exists: false },
        { label: 'Continua havent-hi tres paràgrafs', selector: 'p', count: 3 },
      ],
    },
    {
      id: 'nota-i-adreca',
      title: 'Una nota i una adreça',
      statement: [
        "Dues feines. Primer: la nota del segon paràgraf és per a tu, no per a qui visiti la pàgina. Converteix-la en un comentari.",
        "Després: fes que l'adreça es vegi en tres línies, com en un sobre, sense partir-la en tres paràgrafs.",
      ],
      expected: "El títol i, a sota, l'adreça en tres línies seguides. La nota no es veu enlloc.",
      html: `<h1>Oficina de Camins</h1>
<p>Nota per a mi: confirmar l'horari abans de publicar.</p>
<p>Carrer de la Font, 3
08999 Vilanova de Dalt
Barcelona</p>`,
      hint: [
        'Un comentari comença amb `<!--` i s\'acaba amb `-->`. Les etiquetes `<p>` de la nota ja no calen.',
        'Per saltar de línia dins d\'un paràgraf hi ha un element buit: `<br>`.',
      ],
      solution: {
        html: `<h1>Oficina de Camins</h1>
<!-- Nota per a mi: confirmar l'horari abans de publicar. -->
<p>Carrer de la Font, 3<br>
08999 Vilanova de Dalt<br>
Barcelona</p>`,
      },
      explanation: "El comentari continua al codi, però el navegador no el mostra. I l'adreça és un sol paràgraf amb dos salts de línia: les tres línies van juntes perquè són una sola cosa.",
      checks: [
        { label: 'La nota ja no es veu a la pàgina: només queda un paràgraf', selector: 'p', count: 1 },
        { label: "L'adreça té salts de línia entre les seves tres parts", selector: 'p br', count: { min: 2, max: 3 } },
        { label: "L'adreça continua sencera dins del paràgraf", selector: 'p', text: ['Carrer de la Font', 'Vilanova de Dalt', 'Barcelona'] },
      ],
    },
  ],

  finalExercise: {
    id: 'pagina-de-consells',
    title: 'Una pàgina sencera, des de zero',
    statement: [
      "Escriu, sencera, la pàgina de consells de la web de rutes. Només et donem la primera línia: la resta de l'esquelet l'has de posar tu.",
      "La pàgina és en català i la pestanya ha de dir «Consells · Camins». El títol de la pàgina és «Consells per sortir a la muntanya». A sota hi ha dos apartats, «Abans de sortir» i «Durant la ruta», cadascun amb un paràgraf com a mínim. L'últim paràgraf de la pàgina ha de dir «En cas d'emergència,» i, a la línia següent, «truca al 112.».",
      "Sagna el codi: quan acabis, s'ha de veure d'un cop d'ull què hi ha dins de què.",
    ],
    expected: 'Un títol, dos apartats amb el seu subtítol i els seus paràgrafs, i un últim paràgraf de dues línies. A la barra de sobre, «Consells · Camins».',
    html: `<!DOCTYPE html>
`,
    fileNames: { html: 'consells.html' },
    hint: [
      "Comença per l'esquelet buit: `<html>`, i a dins `<head>` i `<body>`, amb les seves etiquetes de tancament. Quan el tinguis, omple primer el `<head>` i després el `<body>`.",
      'Les dues línies de l\'últim paràgraf van dins del mateix `<p>`, separades per un `<br>`.',
    ],
    solution: {
      html: pagina(
        'Consells · Camins',
        `    <h1>Consells per sortir a la muntanya</h1>

    <h2>Abans de sortir</h2>
    <p>Mira la previsió del temps i avisa algú de la ruta que faràs.</p>

    <h2>Durant la ruta</h2>
    <p>Beu aigua sovint, encara que no tinguis set.</p>
    <p>En cas d'emergència,<br>
    truca al 112.</p>`
      ),
    },
    explanation: [
      "És el document mínim amb una mica més de contingut al `<body>`. Al `<head>` hi ha el que el navegador ha de saber: com estan desats els caràcters i quin nom té la pàgina. Al `<body>`, el que es veu.",
      "Fixa't en el niuament: el `<body>` té sis fills, tots germans entre ells. Cap encapçalament conté cap paràgraf: van l'un després de l'altre.",
    ],
    checks: [
      { label: 'La pàgina diu que és en català', selector: 'html', attr: { lang: 'ca' } },
      { label: 'El `<head>` indica com estan desats els caràcters', selector: 'head > meta[charset]' },
      { label: 'La pestanya diu «Consells · Camins»', selector: 'head > title', text: 'Consells · Camins' },
      { label: 'Hi ha un sol títol principal, i parla de consells', selector: 'h1', count: 1, text: 'consells' },
      { label: 'Hi ha dos apartats, cadascun amb el seu `<h2>`', selector: 'h2', count: 2 },
      { label: 'El primer apartat es diu «Abans de sortir»', selector: 'h2', text: 'Abans de sortir' },
      { label: 'El segon es diu «Durant la ruta»', selector: 'h2:nth-of-type(2)', text: 'Durant la ruta' },
      { label: 'Hi ha, com a mínim, tres paràgrafs', selector: 'p', count: { min: 3 } },
      { label: "L'últim paràgraf té un salt de línia", selector: 'p:last-of-type br' },
    ],
  },

  summary: [
    "L'**HTML** marca què és cada part del contingut. L'aspecte és feina del CSS.",
    "Un **element** és una etiqueta d'obertura, el contingut i una etiqueta de tancament: `<p>…</p>`. Si no el tanques, el navegador no avisa.",
    "Tot document comença amb `<!DOCTYPE html>` i té un `<html>` amb dues parts: el `<head>`, amb el que el navegador ha de saber, i el `<body>`, amb el que es veu.",
    '`<title>` posa nom a la pestanya. `<h1>` és el títol que es veu a la pàgina.',
    'Un **atribut** s\'escriu dins de l\'etiqueta d\'obertura, amb el valor entre cometes: `lang="ca"`.',
    "Els elements es **niuen**: l'últim que s'obre és el primer que es tanca. El sagnat fa que es vegi.",
    "Els comentaris `<!-- -->` no es mostren. Els espais i els salts de línia seguits compten com un de sol; per saltar de línia dins d'un text hi ha `<br>`.",
  ],

  quiz: [
    {
      question: "Quina d'aquestes feines fa l'HTML?",
      options: [
        { text: 'Dir què és cada part del contingut: un títol, un paràgraf…', correct: true },
        { text: 'Decidir els colors i la mida de la lletra', why: "Això és l'aspecte, i se n'encarrega el CSS." },
        { text: 'Fer càlculs i prendre decisions', why: "L'HTML no és un llenguatge de programació: descriu, no calcula." },
        { text: 'Publicar la pàgina a Internet', why: "L'HTML és el contingut del fitxer. Publicar-lo es fa amb altres eines." },
      ],
      explanation: "L'HTML descriu l'estructura del contingut. Com es veu ho decideix el CSS, i què fa, JavaScript.",
    },
    {
      question: "Quin d'aquests paràgrafs està ben escrit?",
      options: [
        { text: "`<p>Surt d'hora.</p>`", correct: true },
        { text: "`<p>Surt d'hora.<p>`", why: "La segona etiqueta també és d'obertura: li falta la barra. El paràgraf no es tanca i se n'obre un altre." },
        { text: "`<p>Surt d'hora.<\\p>`", why: "La barra de l'etiqueta de tancament és `/`, no `\\`." },
        { text: "`</p>Surt d'hora.<p>`", why: "Les etiquetes estan girades: primer va la d'obertura i, al final, la de tancament." },
      ],
      explanation: "Un element comença amb l'etiqueta d'obertura, `<p>`, i s'acaba amb la de tancament, que porta una barra davant del nom: `</p>`.",
    },
    {
      question: "On s'escriu l'element `<title>`, i on es veu el seu text?",
      options: [
        { text: "S'escriu dins del `<head>` i es veu a la pestanya del navegador", correct: true },
        { text: "S'escriu dins del `<body>` i es veu a dalt de la pàgina", why: 'El títol que es veu a la pàgina és el `<h1>`. El `<title>` és informació sobre el document.' },
        { text: "S'escriu dins del `<head>` i es veu a dalt de la pàgina", why: 'Res del que hi ha al `<head>` es dibuixa a la pàgina.' },
        { text: "S'escriu abans del `<!DOCTYPE html>` i no es veu enlloc", why: 'El `<!DOCTYPE html>` és sempre la primera línia, i el `<title>` sí que es veu: a la pestanya.' },
      ],
      explanation: 'El `<head>` conté el que el navegador ha de saber de la pàgina, com el seu nom. El `<body>`, el que es dibuixa.',
    },
    {
      question: 'Dins d\'un paràgraf escrius «Bon», deu espais, «dia», prems Retorn dues vegades i escrius «a tothom». Què es veu a la pàgina?',
      options: [
        { text: '«Bon dia a tothom», tot seguit i amb un sol espai entre paraules', correct: true },
        { text: '«Bon» i «dia» separats per deu espais, i «a tothom» dues línies més avall', why: 'El navegador ajunta els espais i els salts de línia seguits en un de sol.' },
        { text: '«Bon dia» en una línia i «a tothom» a la següent', why: 'Un salt de línia del codi no és un salt de línia a la pàgina. Per fer-ne un cal `<br>`.' },
        { text: 'Res: el navegador mostra un error', why: "L'HTML no dona errors i, a més, aquest codi és correcte." },
      ],
      explanation: "Qualsevol tirada d'espais, tabuladors i salts de línia compta com un sol espai. Per això es pot sagnar el codi sense que la pàgina canviï.",
    },
    {
      question: "Quin d'aquests trossos de codi està ben niuat?",
      options: [
        { text: '`<body><h1>Camins</h1><p>Rutes</p></body>`', correct: true },
        { text: '`<body><h1>Camins<p></h1>Rutes</p></body>`', why: 'El `<p>` s\'obre dins del `<h1>` i es tanca fora: les etiquetes es creuen.' },
        { text: '`<body><h1>Camins</body></h1>`', why: "L'últim element que s'obre és el primer que s'ha de tancar: `</h1>` ha d'anar abans de `</body>`." },
        { text: '`<h1><body>Camins</body></h1>`', why: 'El `<body>` conté tot el que es veu, també els títols. No pot anar dins d\'un `<h1>`.' },
      ],
      explanation: "Un element ha de quedar sencer dins del seu pare. Es tanca primer el de dins i després el de fora.",
    },
    {
      question: 'A l\'etiqueta `<html lang="ca">`, què són `lang` i `"ca"`?',
      options: [
        { text: "`lang` és el nom d'un atribut i `\"ca\"`, el seu valor", correct: true },
        { text: '`lang` és una etiqueta i `"ca"`, el seu contingut', why: "L'etiqueta és `html`. El contingut d'un element va entre l'etiqueta d'obertura i la de tancament, no a dins de l'etiqueta." },
        { text: "`lang` és un element niuat dins de l'`<html>`", why: "Un element niuat tindria les seves pròpies etiquetes. `lang` s'escriu dins de l'etiqueta d'obertura." },
        { text: 'Són un comentari, i el navegador els ignora', why: 'Els comentaris van entre `<!--` i `-->`. Els atributs sí que es tenen en compte.' },
      ],
      explanation: "Un atribut dona informació extra sobre un element. S'escriu dins de l'etiqueta d'obertura: el nom, un signe igual i el valor entre cometes.",
    },
  ],
};
