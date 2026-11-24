import { p, list, code, example, concept, warning, challenge, project, table } from '../../blocks.js';

// A partir d'aquesta unitat, els exemples només ensenyen el que va dins del
// <body>. Encara no hi ha CSS: tot es veu amb l'aspecte per defecte.

// El contingut de la portada de la web de rutes, tal com queda en aquesta unitat.
const HTML_PORTADA = `<h1>Camins</h1>
<p>Rutes de muntanya per a tots els nivells.</p>

<form>
  <label for="cerca">Cerca una ruta</label>
  <input type="search" id="cerca" placeholder="Nom de la ruta">
  <button type="submit">Cerca</button>
</form>

<h2>Rutes destacades</h2>
<ul>
  <li><a href="ruta.html">Camí de Ronda</a> · 12 km · Fàcil</li>
  <li><a href="ruta.html">Vall de Núria</a> · 9 km · Mitjana</li>
  <li><a href="ruta.html">Pica d'Estats</a> · 18 km · Difícil</li>
</ul>

<p><a href="consells.html">Consells abans de sortir</a></p>`;

const indent = (text, spaces) =>
  text
    .split('\n')
    .map((line) => (line === '' ? line : ' '.repeat(spaces) + line))
    .join('\n');

export const glossary = [
  {
    term: 'Encapçalament',
    definition:
      "Títol d'una pàgina o d'un dels seus apartats. N'hi ha sis nivells, de `<h1>` (el més important) a `<h6>`, i junts formen l'índex de la pàgina.",
  },
  {
    term: 'Enllaç',
    definition: "Element `<a>` que porta a una altra pàgina quan es clica. El destí s'escriu a l'atribut `href`.",
  },
  {
    term: 'Ruta relativa',
    definition:
      "Adreça d'un fitxer escrita a partir de la carpeta del fitxer on s'escriu: `ruta.html`, `imatges/foto.jpg`. No porta ni `https://` ni el nom del lloc web.",
  },
  {
    term: 'Adreça absoluta',
    definition:
      "Adreça completa d'una pàgina o d'un fitxer, que comença per `https://`. Serveix per enllaçar a un altre lloc web.",
  },
  {
    term: 'Text alternatiu',
    definition:
      "Descripció d'una imatge que s'escriu a l'atribut `alt`. Es mostra quan la imatge no es pot carregar i és el que llegeixen els lectors de pantalla.",
  },
  {
    term: 'Llista',
    definition: "Conjunt d'elements `<li>` dins d'un `<ul>` (llista sense ordre) o d'un `<ol>` (llista numerada).",
  },
  {
    term: 'Formulari',
    definition:
      "Element `<form>` que agrupa camps i botons perquè les dades que s'hi escriuen es puguin enviar juntes.",
  },
  {
    term: 'Placeholder',
    definition:
      "Text d'ajuda que es veu dins d'un camp mentre és buit. Desapareix quan es comença a escriure i no substitueix l'etiqueta del camp.",
  },
];

export default {
  id: 'html-contingut',
  number: 2,
  title: 'Contingut: text, enllaços, imatges i llistes',
  shortTitle: 'Text, enllaços i imatges',
  description:
    "Les etiquetes amb què s'escriu el contingut d'una pàgina: encapçalaments, text destacat, enllaços, imatges, llistes i els primers botons i camps.",

  problem: {
    title: 'Tinc l\'esquelet, però la pàgina no té res a dins',
    text: [
      "La web de rutes ja té un `index.html` ben format: el `<!DOCTYPE html>`, el `<head>`, el `<body>`. A dins, però, només hi ha un títol i un parell de paràgrafs. Una pàgina de veritat té una llista de rutes, fotos, enllaços per passar d'una pàgina a l'altra, un cercador.",
      "Tot això és contingut, i cada mena de contingut té la seva etiqueta. En aquesta unitat en veuràs una dotzena. No les has de memoritzar d'una tirada: la majoria tenen noms que diuen què fan, i les escriuràs tantes vegades que se't quedaran soles.",
      "Continua sense haver-hi CSS, i les pàgines es veuran amb l'aspecte per defecte. Fixa't en **què és** cada cosa, no en com es veu.",
    ],
  },

  goals: [
    "Ordenar el contingut amb encapçalaments, de `<h1>` a `<h6>`, sense saltar-te nivells.",
    'Destacar text amb `<strong>` i `<em>`.',
    'Enllaçar pàgines amb `<a href>` i escriure rutes relatives.',
    'Posar imatges amb `<img>`, amb un text alternatiu útil.',
    'Fer llistes amb `<ul>`, `<ol>` i `<li>`.',
    'Posar un botó i un camp de text amb la seva etiqueta.',
  ],

  projectPiece:
    'La web de rutes ja té contingut: la portada amb la llista de rutes i el cercador, la pàgina d\'una ruta amb la seva foto, i els enllaços per anar de l\'una a l\'altra.',

  finalProject:
    'Els títols dels vídeos, les miniatures, el cercador i els enllaços entre `index.html` i `video.html` es fan amb aquestes mateixes etiquetes.',

  sections: [
    {
      id: 'encapcalaments',
      title: 'Encapçalaments: de h1 a h6',
      blocks: [
        p("A la unitat anterior vas fer servir `<h1>` i `<h2>`. N'hi ha sis, de `<h1>` a `<h6>`, i funcionen com els títols d'un llibre: el títol, els capítols i els apartats de cada capítol."),
        table(
          ['Etiqueta', 'Què és'],
          [
            ['`<h1>`', 'El títol de la pàgina. Només n\'hi ha un.'],
            ['`<h2>`', 'El títol de cada apartat'],
            ['`<h3>`', "El títol d'un subapartat, dins d'un apartat"],
            ['`<h4>` a `<h6>`', 'Nivells més profunds. Es fan servir poc.'],
          ],
          "Els nivells d'encapçalament"
        ),
        example({
          title: "Els encapçalaments fan d'índex",
          intro: "Llegeix només els encapçalaments, saltant-te els paràgrafs. Es veu com està organitzada la pàgina?",
          html: `<h1>Camí de Ronda</h1>
<p>Una ruta fàcil arran de mar.</p>

<h2>La ruta</h2>
<p>12 quilòmetres entre cales i pinedes.</p>

<h3>Primer tram</h3>
<p>De la platja fins al far.</p>

<h3>Segon tram</h3>
<p>Del far fins al poble.</p>

<h2>Com arribar-hi</h2>
<p>Amb tren fins a l'estació i deu minuts a peu.</p>`,
          expected: 'Un títol gran, dos apartats amb un títol mitjà i, dins del primer apartat, dos trams amb un títol més petit.',
          why: "«Primer tram» i «Segon tram» són parts de «La ruta», i per això són `<h3>`. «Com arribar-hi» torna a ser un `<h2>`: obre un apartat nou, al mateix nivell que «La ruta».",
        }),
        concept(
          "Els encapçalaments són l'índex de la pàgina",
          "Si en llegir només els encapçalaments s'entén de què va la pàgina i com està ordenada, estan ben posats. Les persones que naveguen amb un lector de pantalla ho fan exactament així: salten d'encapçalament en encapçalament fins que troben el que busquen."
        ),
        list(
          'Un sol `<h1>` per pàgina: el seu títol.',
          "No et saltis nivells cap avall: després d'un `<h2>` pot venir un `<h3>`, però no un `<h4>`.",
          "Cap amunt sí que es pot saltar: després d'un `<h3>` pot venir un `<h2>`, que obre un apartat nou."
        ),
        warning(
          'No triïs el nivell per la mida de la lletra',
          "«Aquí vull una lletra més petita» no és un motiu per posar un `<h4>`. El nivell diu quin lloc ocupa el títol dins de la pàgina. La mida de cada nivell la canviaràs amb CSS, i podràs fer que un `<h2>` sigui tan petit com vulguis."
        ),
        challenge({
          title: 'Arregla els nivells',
          statement: "Qui ha escrit aquesta pàgina ha triat els encapçalaments per la mida. «Consells» és el títol de la pàgina. «Abans de sortir» i «Durant la ruta» en són els dos apartats, i «Si es fa fosc» és una part de «Durant la ruta». Posa a cada un el nivell que li toca.",
          html: `<h1>Consells</h1>

<h3>Abans de sortir</h3>
<p>Mira la previsió del temps.</p>

<h1>Durant la ruta</h1>
<p>Beu aigua sovint.</p>

<h4>Si es fa fosc</h4>
<p>Encén la llanterna i no surtis del camí.</p>`,
          hint: 'Són tres canvis. El títol de la pàgina és un `<h1>`; els apartats, `<h2>`; i el que és dins d\'un apartat, `<h3>`.',
          solution: {
            html: `<h1>Consells</h1>

<h2>Abans de sortir</h2>
<p>Mira la previsió del temps.</p>

<h2>Durant la ruta</h2>
<p>Beu aigua sovint.</p>

<h3>Si es fa fosc</h3>
<p>Encén la llanterna i no surtis del camí.</p>`,
          },
          explanation: "Ara l'índex es llegeix bé: un títol, dos apartats i, dins del segon, un subapartat. La pàgina es veu diferent, però això ja ho arreglarà el CSS: primer va l'estructura.",
          checks: [
            { label: 'Hi ha un sol `<h1>`: «Consells»', selector: 'h1', count: 1, text: 'Consells' },
            { label: 'Els dos apartats són `<h2>`', selector: 'h2', count: 2 },
            { label: '«Si es fa fosc» és un `<h3>`', selector: 'h3', count: 1, text: 'Si es fa fosc' },
            { label: 'Ja no hi ha cap `<h4>`', selector: 'h4', exists: false },
          ],
        }),
      ],
    },

    {
      id: 'text-destacat',
      title: 'Text destacat: strong i em',
      blocks: [
        p("Dins d'un paràgraf hi ha paraules que pesen més que les altres. Hi ha dues etiquetes per dir-ho:"),
        table(
          ['Etiqueta', 'Què vol dir', 'Com es veu per defecte'],
          [
            ['`<strong>`', "Importància: això no t'ho pots saltar", 'En negreta'],
            ['`<em>`', 'Èmfasi: la paraula que diries amb un altre to de veu', 'En cursiva'],
          ],
          'Dues maneres de destacar text'
        ),
        example({
          title: 'Importància i èmfasi',
          intro: 'Mou les etiquetes a unes altres paraules. Recorda que cada una té la seva etiqueta de tancament.',
          html: `<p><strong>Atenció:</strong> aquesta ruta no és per a principiants.</p>
<p>Surt d'hora. A la muntanya, el temps <em>sempre</em> canvia a la tarda.</p>
<p>Porta <strong>com a mínim</strong> un litre i mig d'aigua per persona.</p>`,
          expected: 'Tres paràgrafs. «Atenció:» i «com a mínim» surten en negreta, i «sempre», en cursiva.',
          why: "`<strong>` i `<em>` es posen al voltant de les paraules que es volen destacar, dins del paràgraf. El paràgraf continua sent un de sol: no es parteix.",
        }),
        p("Fixa't en una diferència amb el que has vist fins ara. Un `<h1>` o un `<p>` comencen sempre una línia nova. `<strong>` i `<em>` no: viuen **dins** del text, com una paraula més. Els enllaços i les imatges, que venen ara, també. D'aquesta diferència en parlarem a fons a la [unitat 6](#/unitat/display)."),
        p("També es poden niuar, respectant l'ordre de tancament que ja coneixes: `<strong>molt <em>molt</em> important</strong>`."),
        warning(
          '`<strong>` no vol dir «en negreta»',
          "Si vols que una cosa es vegi en negreta només perquè queda bé, això és aspecte, i ho faràs amb CSS. I si el que vols és un títol, fes servir un encapçalament: un paràgraf sencer dins d'un `<strong>` s'assembla a un títol, però no surt a l'índex de la pàgina."
        ),
      ],
    },

    {
      id: 'enllacos',
      title: "Enllaços: l'etiqueta a",
      blocks: [
        p("Els enllaços són el que converteix un grapat de pàgines en una web: l'«hipertext» del nom d'HTML. Es fan amb l'etiqueta `<a>` i un atribut, `href`, que diu on porten."),
        code('<a href="ruta.html">Camí de Ronda</a>', { lang: 'html', title: 'Un enllaç' }),
        list(
          "`href=\"ruta.html\"` és el **destí**: el fitxer que s'obrirà.",
          '«Camí de Ronda» és el **contingut**: el text que es veu i que es pot clicar.'
        ),
        example({
          title: 'Un enllaç a una altra pàgina',
          intro: "Fes clic en un enllaç. Aquesta previsualització només té una pàgina, així que en lloc d'anar-hi t'explica, a sota, on et portaria.",
          html: `<h1>Camins</h1>
<p>La ruta de la setmana és el <a href="ruta.html">Camí de Ronda</a>.</p>
<p><a href="consells.html">Consells abans de sortir</a></p>`,
          expected: 'Dos enllaços, blaus i subratllats. En clicar-ne un, a sota de la pàgina apareix un avís que diu quin fitxer obriria el navegador.',
          why: "`href` conté el nom del fitxer de destí. Com que `ruta.html` és a la mateixa carpeta que la pàgina on som, n'hi ha prou amb el nom. El primer enllaç és al mig d'una frase i el segon ocupa un paràgraf sencer: un enllaç pot anar a tots dos llocs.",
        }),
        table(
          ['`href`', 'On porta'],
          [
            ['`"ruta.html"`', 'A un altre fitxer del mateix lloc web'],
            ['`"https://www.example.com"`', "A un altre lloc web. Cal l'adreça sencera, amb `https://`."],
            ['`"#"`', "Enlloc. És un comodí per a un enllaç que encara no saps on portarà."],
          ],
          'Tres menes de destí'
        ),
        example({
          title: 'Un enllaç cap a fora i un de provisional',
          intro: 'Clica tots dos enllaços i compara què passa.',
          html: `<p>Abans de sortir, mira <a href="https://www.example.com/el-temps">la previsió del temps</a>.</p>
<p><a href="#">Mapa de la ruta</a> (aviat)</p>`,
          expected: "El primer enllaç fa aparèixer un avís amb l'adreça sencera. El segon no fa res.",
          why: "Una adreça que comença per `https://` és **absoluta**: diu el lloc web i la pàgina, i funciona des de qualsevol lloc. El `#` es fa servir mentre es munta una pàgina, perquè l'enllaç ja es vegi com a enllaç. Quan la pàgina de destí existeixi, s'hi posa el nom de veritat.",
        }),
        warning(
          "El text de l'enllaç ha de dir on porta",
          "«Fes clic aquí» no diu res. Qui mira la pàgina de pressa llegeix només els enllaços, i un lector de pantalla els pot llegir tots seguits, fora de la frase. Escriu «Consulta el mapa de la ruta», amb l'enllaç a «mapa de la ruta», i no «Per veure el mapa fes clic aquí»."
        ),
      ],
    },

    {
      id: 'imatges',
      title: 'Imatges: img, src i alt',
      blocks: [
        p("Una imatge no s'escriu dins del fitxer HTML: és un altre fitxer, i l'HTML només diu on és. L'etiqueta és `<img>`, i és un element buit, com `<br>`: no té contingut ni tancament. Tot el que necessita ho porta en dos atributs."),
        code('<img src="imatges/ruta-2.jpg" alt="Un camí que puja entre muntanyes">', { lang: 'html', title: 'Una imatge' }),
        list(
          '`src` (de *source*, «origen») diu **on és** el fitxer de la imatge.',
          "`alt` és el **text alternatiu**: descriu la imatge amb paraules per a qui no la pot veure."
        ),
        example({
          title: 'Una foto de la ruta',
          intro: "Canvia `ruta-2.jpg` per `ruta-20.jpg`, un fitxer que no existeix, i fixa't en tres coses: què es veu al lloc de la foto, què diu l'avís de sota i per a què ha servit l'`alt`.",
          html: `<h1>Vall de Núria</h1>
<img src="imatges/ruta-2.jpg" alt="Un paisatge de muntanyes amb el sol al fons" width="300">
<p>9 km · 3 h · Dificultat mitjana</p>`,
          expected: "El títol, un dibuix d'un paisatge de muntanya de 300 píxels d'ample i una línia amb les dades de la ruta.",
          why: "Quan la imatge no es pot carregar, el navegador ensenya el text de l'`alt` al seu lloc. És també el que un lector de pantalla llegeix a una persona que no hi veu. Per això l'`alt` no és opcional.",
        }),
        p("Una imatge es mostra a la seva mida real, que pot ser enorme. L'atribut `width` diu quants píxels d'ample ha de fer, i l'alçada s'ajusta sola. Quan sapiguem CSS, la mida la decidirem allà."),
        p("En aquest dossier tens unes quantes imatges de mostra per fer proves: de `imatges/ruta-1.jpg` a `imatges/ruta-6.jpg`, `imatges/foto.jpg`, `imatges/retrat.jpg`, `imatges/logo.png` i quatre avatars, de `imatges/avatar-1.png` a `imatges/avatar-4.png`. Al teu projecte hi posaràs les teves."),
        table(
          ['Quina imatge és', "Què s'escriu a l'`alt`"],
          [
            ['Una foto que explica alguna cosa', 'El que s\'hi veu: `alt="Un camí que puja entre muntanyes"`'],
            ['Un logo', 'El nom: `alt="Camins"`'],
            ['Un adorn que no aporta res', 'Res, però l\'atribut hi és: `alt=""`'],
            ['Qualsevol', 'Mai «imatge», «foto» ni el nom del fitxer'],
          ],
          'Com es tria un text alternatiu'
        ),
        example({
          title: 'Tres imatges, tres textos alternatius',
          intro: 'Hi ha un logo, una foto i un avatar que només fa bonic al costat del nom.',
          html: `<img src="imatges/logo.png" alt="Camins" width="60">
<h1>Rutes de muntanya</h1>
<img src="imatges/ruta-4.jpg" alt="Un paisatge de muntanyes verdes" width="300">
<p><img src="imatges/avatar-3.png" alt="" width="32"> Ruta proposada per la Laia</p>`,
          expected: 'El logo a dalt, el títol, la foto i una línia amb un avatar petit seguit del text.',
          why: "El logo fa de nom del lloc, i el seu `alt` és aquest nom. La foto es descriu. L'avatar no afegeix res que no digui ja el text del costat: amb `alt=\"\"`, un lector de pantalla se'l salta i llegeix només «Ruta proposada per la Laia».",
        }),
        warning(
          'Un `alt` buit no és el mateix que no posar `alt`',
          "`alt=\"\"` vol dir «aquesta imatge és un adorn, ignora-la». Sense l'atribut, el navegador no sap què és la imatge, i un lector de pantalla pot acabar llegint el nom del fitxer. L'atribut `alt` hi ha de ser sempre; el que canvia és què hi poses."
        ),
        example({
          title: 'Una imatge que és un enllaç',
          intro: 'Clica la foto i després el nom de la ruta. Totes dues coses porten al mateix lloc.',
          html: `<a href="ruta.html">
  <img src="imatges/ruta-1.jpg" alt="Camí de Ronda" width="300">
</a>
<p><a href="ruta.html">Camí de Ronda</a> · 12 km</p>`,
          expected: 'Una foto i, a sota, el nom de la ruta com a enllaç. En clicar la foto apareix el mateix avís que en clicar el nom.',
          why: "Un enllaç pot contenir qualsevol cosa, no només text. Quan conté una imatge, l'`alt` fa de text de l'enllaç: per això aquí diu on porta, «Camí de Ronda», i no què s'hi veu.",
        }),
      ],
    },

    {
      id: 'rutes-relatives',
      title: 'Rutes relatives: on és el fitxer?',
      blocks: [
        p("Tant `href` com `src` necessiten saber on és un fitxer. Quan el fitxer és del teu propi projecte, s'hi escriu una **ruta relativa**: el camí per arribar-hi **des del fitxer on ets**."),
        code(
          `camins/
  index.html
  ruta.html
  consells.html
  imatges/
    logo.png
    ruta-1.jpg
    ruta-2.jpg
  rutes/
    pica-estats.html`,
          { lang: 'text', title: 'La carpeta del projecte' }
        ),
        table(
          ['Soc a…', 'Vull arribar a…', "S'escriu"],
          [
            ['`index.html`', '`ruta.html`, que és a la mateixa carpeta', '`ruta.html`'],
            ['`index.html`', '`ruta-1.jpg`, dins de la carpeta `imatges`', '`imatges/ruta-1.jpg`'],
            ['`index.html`', '`pica-estats.html`, dins de la carpeta `rutes`', '`rutes/pica-estats.html`'],
            ['`rutes/pica-estats.html`', '`index.html`, que és una carpeta més amunt', '`../index.html`'],
          ],
          'Rutes relatives dins del projecte'
        ),
        example({
          title: 'Tres rutes relatives',
          intro: "Clica els dos enllaços i llegeix a l'avís quin fitxer obriria el navegador en cada cas.",
          html: `<img src="imatges/logo.png" alt="Camins" width="60">
<p><a href="ruta.html">La ruta de la setmana</a></p>
<p><a href="rutes/pica-estats.html">Pica d'Estats</a></p>`,
          expected: 'El logo i dos enllaços. Cada enllaç fa aparèixer un avís amb la ruta que té escrita a l\'`href`.',
          why: "`imatges/logo.png` vol dir «entra a la carpeta `imatges` i agafa `logo.png`». `ruta.html`, sense cap carpeta al davant, es busca al costat de la pàgina on som. I `rutes/pica-estats.html` entra primer a la carpeta `rutes`.",
        }),
        concept(
          "Una ruta relativa es llegeix des del fitxer on l'escrius",
          "El nom d'una carpeta i una barra volen dir «entra aquí». Dos punts, `..`, volen dir «puja a la carpeta de sobre». La mateixa imatge té una ruta diferent segons des de quin fitxer la demanis: per això, si mous un fitxer de carpeta, les seves rutes deixen de valdre."
        ),
        warning('Noms exactes, i mai una ruta del teu ordinador', [
          "Per a molts servidors, `Imatges/Ruta-1.JPG` i `imatges/ruta-1.jpg` són fitxers diferents. Al teu ordinador potser funciona i, un cop publicada la pàgina, la imatge surt trencada. Escriu el nom exactament com es diu el fitxer, i posa als fitxers noms en minúscules, sense espais ni accents.",
          "I no hi escriguis mai el camí sencer del teu ordinador, de l'estil `C:/Usuaris/laia/Escriptori/foto.jpg`. Aquest camí només existeix a la teva màquina: a qualsevol altra, la imatge no hi serà.",
        ]),
      ],
    },

    {
      id: 'llistes',
      title: 'Llistes: ul, ol i li',
      blocks: [
        p("Quan tens diverses coses de la mateixa mena, l'una rere l'altra, tens una llista. Es fa amb dues etiquetes: una per a la llista sencera i una altra, `<li>`, per a cada element."),
        table(
          ['Etiqueta', 'Quina llista és', 'Com es veu per defecte'],
          [
            ['`<ul>`', "Sense ordre: els elements es podrien canviar de lloc", 'Amb un punt davant de cada element'],
            ['`<ol>`', "Ordenada: l'ordre importa", 'Amb un número davant de cada element'],
            ['`<li>`', 'Cada element de la llista, de qualsevol de les dues', ''],
          ],
          'Les etiquetes de les llistes'
        ),
        example({
          title: 'Una llista sense ordre i una de numerada',
          intro: 'Afegeix un pas nou al mig de la segona llista i mira què passa amb els números.',
          html: `<h2>Què cal portar</h2>
<ul>
  <li>Aigua</li>
  <li>Menjar</li>
  <li>Roba d'abric</li>
</ul>

<h2>Com arribar-hi</h2>
<ol>
  <li>Agafa el tren fins a Ribes de Freser.</li>
  <li>Canvia al tren cremallera.</li>
  <li>Baixa a l'última parada.</li>
</ol>`,
          expected: 'Una llista de tres elements amb punts i una altra de tres passos numerats de l\'1 al 3.',
          why: "El material es pot llegir en qualsevol ordre: és un `<ul>`. Els passos no: és un `<ol>`. Els números no els escrius tu. Els posa el navegador, i si afegeixes o treus un pas es tornen a comptar sols.",
        }),
        concept(
          "La pregunta és si l'ordre importa",
          "Canvia mentalment els elements de lloc. Si el text continua volent dir el mateix, és un `<ul>`. Si deixa de tenir sentit, com en unes instruccions o en una classificació, és un `<ol>`."
        ),
        example({
          title: "Una llista d'enllaços",
          intro: 'Cada element de la llista conté un enllaç i una mica de text.',
          html: `<h2>Rutes</h2>
<ul>
  <li><a href="ruta.html">Camí de Ronda</a> · 12 km</li>
  <li><a href="ruta.html">Vall de Núria</a> · 9 km</li>
  <li><a href="ruta.html">Pica d'Estats</a> · 18 km</li>
</ul>`,
          expected: 'Tres línies amb un punt al davant. A cada una, el nom de la ruta és un enllaç i la distància, text normal.',
          why: "Dins d'un `<li>` hi pot anar qualsevol cosa: text, enllaços, imatges. L'enllaç només envolta el nom de la ruta, i per això la distància no es pot clicar.",
        }),
        p("Aquesta combinació, una llista amb un enllaç a cada element, és a tot arreu: els menús, els resultats d'una cerca, les graelles de productes o de vídeos. Que es vegi amb punts i cap avall és només l'aspecte per defecte: amb CSS es pot posar en fila i sense punts."),
        warning(
          'Dins d\'un `<ul>` o d\'un `<ol>` només hi van `<li>`',
          "El text, els enllaços i tot el que vulguis posar a la llista va **dins** de cada `<li>`, mai directament dins del `<ul>`. I un `<li>` no va mai sol: sempre és fill d'un `<ul>` o d'un `<ol>`."
        ),
        challenge({
          title: 'Passos numerats',
          statement: "Algú ha escrit tres passos dins d'un sol paràgraf i els ha numerat a mà. Converteix-los en una llista numerada de tres elements. Els números ja no els has d'escriure tu.",
          html: `<h2>Abans de sortir</h2>
<p>1. Mira la previsió del temps. 2. Avisa algú de la ruta que faràs. 3. Carrega el mòbil.</p>`,
          hint: "La llista és un `<ol>` amb tres `<li>` a dins. El paràgraf desapareix: cada frase passa a ser un element de la llista.",
          solution: {
            html: `<h2>Abans de sortir</h2>
<ol>
  <li>Mira la previsió del temps.</li>
  <li>Avisa algú de la ruta que faràs.</li>
  <li>Carrega el mòbil.</li>
</ol>`,
          },
          explanation: "Ara el navegador sap que són tres passos i en quin ordre van. Si demà n'afegeixes un al principi, els altres es tornaran a numerar sols.",
          checks: [
            { label: 'Hi ha una llista numerada amb tres elements', selector: 'ol > li', count: 3 },
            { label: 'El primer pas parla de la previsió del temps', selector: 'ol > li', text: 'previsió del temps' },
            { label: 'Ja no queda el paràgraf amb tot barrejat', selector: 'body > p', exists: false },
          ],
        }),
      ],
    },

    {
      id: 'botons-i-camps',
      title: 'Botons i camps de text',
      blocks: [
        p("Fins ara, tot era contingut per llegir. Queden dues etiquetes per al contingut amb què la persona **fa** coses: el botó i el camp de text."),
        example({
          title: 'Dos botons',
          intro: "Prem-los. Es comporten com a botons (s'enfonsen, es poden prémer amb el teclat), però no passa res més.",
          html: `<p>T'ha agradat aquesta ruta?</p>
<button type="button">Desa la ruta</button>
<button type="button">Comparteix</button>`,
          expected: 'Una frase i, a sota, dos botons grisos de costat.',
          why: "L'HTML diu que allà hi ha un botó i quin text porta. Què ha de passar quan es prem és feina de JavaScript, que és un altre dossier. `type=\"button\"` diu que és un botó normal i corrent, que no envia cap formulari.",
        }),
        p("Un camp de text és un `<input>`. També és un element buit, i l'atribut `type` diu quina mena de dada s'hi escriu. Un camp sol no diu què s'hi ha de posar: per això cada camp va amb la seva **etiqueta**, un element `<label>`."),
        code(
          `<label for="nom">El teu nom</label>
<input type="text" id="nom" placeholder="Per exemple, Laia">`,
          { lang: 'html', title: 'Un camp i la seva etiqueta' }
        ),
        list(
          "`id=\"nom\"` posa un **nom únic** al camp. A la pàgina no hi pot haver dos elements amb el mateix `id`.",
          "`for=\"nom\"` diu a l'etiqueta de quin camp parla: ha de tenir el mateix valor que l'`id` del camp.",
          "`placeholder` és un text d'ajuda que es veu dins del camp mentre és buit."
        ),
        example({
          title: 'Un camp amb la seva etiqueta',
          intro: 'Fes clic sobre el text «El teu nom», no sobre el camp, i mira on va a parar el cursor.',
          html: `<label for="nom">El teu nom</label>
<input type="text" id="nom" placeholder="Per exemple, Laia">`,
          expected: 'El text «El teu nom» i, al costat, un camp amb un text gris d\'exemple. En clicar el text, el cursor apareix dins del camp.',
          why: "Com que `for` i `id` coincideixen, el navegador sap que l'etiqueta i el camp van junts. Clicar l'etiqueta és com clicar el camp, i un lector de pantalla diu «El teu nom» quan s'hi entra.",
        }),
        table(
          ['`type`', "Què s'hi escriu"],
          [
            ['`"text"`', 'Un text curt qualsevol'],
            ['`"search"`', "El text d'una cerca"],
            ['`"email"`', 'Una adreça de correu'],
            ['`"password"`', "Una contrasenya: el que s'escriu no es veu"],
          ],
          'Alguns tipus de camp'
        ),
        p("Quan un camp i un botó treballen junts, com en un cercador, s'agrupen dins d'un `<form>`, un **formulari**. El botó que l'envia porta `type=\"submit\"`."),
        example({
          title: 'Un cercador petit',
          intro: 'Escriu alguna cosa al camp i prem «Cerca». Llegeix l\'avís que apareix a sota.',
          html: `<form>
  <label for="cerca">Cerca una ruta</label>
  <input type="search" id="cerca" placeholder="Nom de la ruta">
  <button type="submit">Cerca</button>
</form>`,
          expected: "Una etiqueta, un camp i un botó. En prémer el botó la pàgina no canvia, i a sota apareix un avís que explica què faria el navegador.",
          why: "Enviar un formulari vol dir fer arribar a un servidor el que s'hi ha escrit i rebre'n una pàgina nova. Aquí no hi ha cap servidor, i per això no passa res. L'HTML ja ha fet la seva part: dir que hi ha un cercador i de quines peces està fet. Fer que cerqui de veritat és feina de JavaScript.",
        }),
        warning(
          "El `placeholder` no fa d'etiqueta",
          "El text d'ajuda desapareix tan bon punt es comença a escriure, i llavors ja no hi ha res que digui què és aquell camp. A més, es veu en gris clar i costa de llegir. Posa sempre una `<label>`, i fes servir el `placeholder` només per donar un exemple."
        ),
      ],
    },

    {
      id: 'dues-pagines',
      title: 'Tot junt: dues pàgines enllaçades',
      blocks: [
        p("Amb les etiquetes d'aquesta unitat ja es pot escriure el contingut de la web de rutes. Són dues pàgines: la portada, amb la llista de rutes, i la pàgina d'una ruta. El que les converteix en un lloc web, i no en dos fitxers solts, són els enllaços que van de l'una a l'altra."),
        example({
          title: 'index.html: la portada',
          intro: 'El títol, el cercador, la llista de rutes i un enllaç als consells. Cada ruta porta a `ruta.html`.',
          html: HTML_PORTADA,
          fileNames: { html: 'index.html' },
          expected: 'El títol «Camins», una frase, el cercador, el subtítol «Rutes destacades» amb tres rutes i, al final, un enllaç.',
          why: "No hi ha res de nou: encapçalaments, un formulari, una llista d'enllaços i un paràgraf. Una pàgina es fa posant aquestes peces l'una rere l'altra, cadascuna amb l'etiqueta que diu què és.",
        }),
        example({
          title: "ruta.html: la pàgina d'una ruta",
          intro: 'La primera línia torna a la portada. La resta és la fitxa de la ruta.',
          html: `<p><a href="index.html">Torna a totes les rutes</a></p>

<h1>Camí de Ronda</h1>
<img src="imatges/ruta-1.jpg" alt="Un paisatge de muntanyes blaves" width="300">
<p>12 km · 3 h 30 min · <strong>Fàcil</strong></p>

<h2>Què cal portar</h2>
<ul>
  <li>Aigua</li>
  <li>Calçat còmode</li>
  <li>Protecció per al sol</li>
</ul>

<p><button type="button">Desa la ruta</button></p>`,
          fileNames: { html: 'ruta.html' },
          expected: "Un enllaç per tornar, el títol de la ruta, la foto, les dades amb la dificultat en negreta, una llista de material i un botó.",
          why: "L'enllaç de dalt porta a `index.html`, i els de la portada porten aquí: així es pot anar i tornar. Totes dues pàgines són a la mateixa carpeta, i per això les rutes relatives són només el nom del fitxer.",
        }),
        concept(
          'Tota pàgina ha de tenir un camí de tornada',
          "Quan enllacis una pàgina, pensa també en el viatge de tornada. Una pàgina a la qual es pot arribar però de la qual no es pot sortir és un carreró sense sortida. El més habitual és que el nom o el logo del lloc, a dalt de tot, enllaci sempre a la portada."
        ),
        project(
          "La web de rutes ja té dues pàgines amb contingut de veritat. Aquest és el fitxer `index.html` sencer: l'esquelet de la unitat anterior, i dins del `<body>`, el contingut d'aquesta. Continua sent lletja, però l'estructura ja hi és tota. A la unitat següent li començarem a donar aspecte.",
          {
            title: 'index.html, amb contingut',
            lang: 'html',
            code: `<!DOCTYPE html>
<html lang="ca">
  <head>
    <meta charset="UTF-8">
    <title>Camins · Rutes de muntanya</title>
  </head>
  <body>
${indent(HTML_PORTADA, 4)}
  </body>
</html>`,
          }
        ),
      ],
    },
  ],

  commonErrors: [
    {
      title: 'Un enllaç sense `href`',
      bad: `<a>Camí de Ronda</a>`,
      badLang: 'html',
      symptom: 'El text es veu com un text qualsevol: ni blau ni subratllat, i no es pot clicar.',
      why: "Sense `href`, el navegador no sap on ha de portar l'enllaç i no el tracta com a enllaç. L'etiqueta `<a>` sola no fa res.",
      fix: `<a href="ruta.html">Camí de Ronda</a>`,
      fixLang: 'html',
    },
    {
      title: "Escriure el nom de la imatge d'una manera diferent de com es diu el fitxer",
      bad: `<img src="imatges/Ruta-1.JPG" alt="Camí de Ronda">`,
      badLang: 'html',
      symptom: 'Al lloc de la foto surt el text «Camí de Ronda», i a sota, un avís que diu que la imatge no s\'ha trobat.',
      why: "El fitxer es diu `ruta-1.jpg`, tot en minúscules. Per al navegador, `Ruta-1.JPG` és un altre nom, i aquest fitxer no existeix. Passa el mateix amb una lletra de menys o amb la carpeta mal escrita.",
      fix: `<img src="imatges/ruta-1.jpg" alt="Camí de Ronda">`,
      fixLang: 'html',
    },
    {
      title: 'Posar text directament dins del `<ul>`',
      bad: `<ul>
  Aigua
  Menjar
</ul>`,
      badLang: 'html',
      symptom: 'El text surt tot seguit, en una sola línia i sense punts: «Aigua Menjar».',
      why: "El `<ul>` és només la capsa de la llista. Cada element ha d'anar dins del seu `<li>`: és el `<li>` el que fa la línia nova i el punt.",
      fix: `<ul>
  <li>Aigua</li>
  <li>Menjar</li>
</ul>`,
      fixLang: 'html',
    },
    {
      title: 'Triar els encapçalaments per la mida',
      bad: `<h1>Camí de Ronda</h1>
<h4>Com arribar-hi</h4>
<h4>Què cal portar</h4>`,
      badLang: 'html',
      symptom: "Es veu bé: els títols dels apartats surten més petits. El problema no es veu, però hi és: l'índex de la pàgina salta del nivell 1 al 4.",
      why: "El nivell diu el lloc que ocupa el títol dins de la pàgina, no la mida de la lletra. Els apartats d'una pàgina són `<h2>`. Si els vols més petits, ja ho faràs amb CSS.",
      fix: `<h1>Camí de Ronda</h1>
<h2>Com arribar-hi</h2>
<h2>Què cal portar</h2>`,
      fixLang: 'html',
    },
    {
      title: 'Un camp sense etiqueta, només amb `placeholder`',
      bad: `<input type="search" placeholder="Cerca una ruta">`,
      badLang: 'html',
      symptom: 'Sembla correcte, però quan comences a escriure el text d\'ajuda desapareix i ja no hi ha res que digui què és aquell camp.',
      why: "El `placeholder` és un exemple, no un nom. I un lector de pantalla necessita una `<label>` per poder dir de quin camp es tracta.",
      fix: `<label for="cerca">Cerca una ruta</label>
<input type="search" id="cerca" placeholder="Nom de la ruta">`,
      fixLang: 'html',
    },
  ],

  exercises: [
    {
      id: 'enllaca-les-rutes',
      title: 'Enllaça les rutes',
      statement: 'Converteix el nom de cada ruta en un enllaç a `ruta.html`. A l\'últim paràgraf, fes que la paraula «consells», i només aquesta paraula, sigui un enllaç a `consells.html`.',
      expected: 'Tres enllaços: els noms de les dues rutes i, dins de la frase del final, la paraula «consells».',
      html: `<h1>Rutes fàcils</h1>
<p>Camí de Ronda</p>
<p>Estany de Sant Maurici</p>
<p>Totes dues es poden fer amb canalla. Abans de sortir, llegeix els consells.</p>`,
      hint: "L'enllaç va dins del paràgraf, al voltant del text que s'ha de poder clicar: `<p><a href=\"…\">text</a></p>`.",
      solution: {
        html: `<h1>Rutes fàcils</h1>
<p><a href="ruta.html">Camí de Ronda</a></p>
<p><a href="ruta.html">Estany de Sant Maurici</a></p>
<p>Totes dues es poden fer amb canalla. Abans de sortir, llegeix els <a href="consells.html">consells</a>.</p>`,
      },
      explanation: "Un enllaç envolta exactament el text que es vol fer clicable. Als dos primers paràgrafs és tot el text; a l'últim, una sola paraula al mig de la frase. En tots tres casos el paràgraf continua sent un paràgraf.",
      checks: [
        { label: 'Hi ha tres enllaços', selector: 'a', count: 3 },
        { label: '«Camí de Ronda» porta a `ruta.html`', selector: 'a', text: 'Camí de Ronda', attr: { href: 'ruta.html' } },
        { label: 'Les dues rutes porten a `ruta.html`', selector: 'a[href="ruta.html"]', count: 2 },
        { label: 'La paraula «consells» porta a `consells.html`', selector: 'a[href="consells.html"]', text: 'consells' },
      ],
    },
    {
      id: 'foto-amb-alt',
      title: 'Una foto amb text alternatiu',
      statement: "Afegeix, entre el títol i el paràgraf, la foto `imatges/ruta-3.jpg`. Ha de fer 280 píxels d'ample i ha de tenir un text alternatiu que la descrigui.",
      expected: 'El títol, a sota un dibuix d\'un paisatge de muntanya i, al final, el paràgraf.',
      html: `<h1>Pica d'Estats</h1>
<p>El cim més alt de Catalunya: 3.143 metres.</p>`,
      hint: [
        "L'etiqueta és `<img>` i no es tanca. Necessita tres atributs: `src`, `alt` i `width`.",
        "Si al lloc de la foto surt un text, el nom del fitxer no està ben escrit: mira l'avís de sota de la pàgina.",
      ],
      solution: {
        html: `<h1>Pica d'Estats</h1>
<img src="imatges/ruta-3.jpg" alt="Un paisatge de muntanyes sota un cel lila" width="280">
<p>El cim més alt de Catalunya: 3.143 metres.</p>`,
      },
      explanation: "`src` diu on és el fitxer, `alt` el descriu i `width` en fixa l'amplada. L'ordre dels atributs és igual: el que importa és que tots tres siguin dins de l'etiqueta.",
      checks: [
        { label: 'Hi ha una imatge', selector: 'img', count: 1 },
        { label: "La foto es veu i fa 280 píxels d'ample", selector: 'img', size: { width: 280, minHeight: 100 } },
        { label: 'Té un text alternatiu', selector: 'img', attr: { alt: true } },
        { label: 'Va entre el títol i el paràgraf', selector: 'img', below: 'h1', above: 'p:last-of-type' },
      ],
    },
    {
      id: 'dues-llistes',
      title: 'Dues llistes',
      statement: [
        "El text barreja dues llistes dins de dos paràgrafs. Converteix el material en una llista sense ordre de quatre elements, i el que cal fer, en una llista numerada de tres passos.",
        "Posa un `<h2>` abans de cada llista: «Què has de portar» i «Què has de fer». Els paràgrafs ja no han de quedar.",
      ],
      expected: 'El títol, i a sota dos apartats: el primer amb una llista de quatre punts i el segon amb tres passos numerats.',
      html: `<h1>Abans de sortir</h1>
<p>Què has de portar: aigua, menjar, roba d'abric i una llanterna.</p>
<p>Què has de fer: primer, mira la previsió del temps. Després, avisa algú de la ruta que faràs. Finalment, carrega el mòbil.</p>`,
      hint: [
        "Pregunta't, per a cada llista, si l'ordre importa. La resposta et diu si és un `<ul>` o un `<ol>`.",
        'Les paraules «primer», «després» i «finalment» ja no calen: l\'ordre el dona la llista.',
      ],
      solution: {
        html: `<h1>Abans de sortir</h1>

<h2>Què has de portar</h2>
<ul>
  <li>Aigua</li>
  <li>Menjar</li>
  <li>Roba d'abric</li>
  <li>Una llanterna</li>
</ul>

<h2>Què has de fer</h2>
<ol>
  <li>Mira la previsió del temps.</li>
  <li>Avisa algú de la ruta que faràs.</li>
  <li>Carrega el mòbil.</li>
</ol>`,
      },
      explanation: "El material es pot posar a la motxilla en qualsevol ordre: és un `<ul>`. Els passos tenen un ordre, i per això són un `<ol>`. El que abans era el principi de cada paràgraf ara és l'encapçalament de l'apartat.",
      checks: [
        { label: 'El material és una llista sense ordre de quatre elements', selector: 'ul > li', count: 4 },
        { label: 'La llanterna és a la llista del material', selector: 'ul', text: 'llanterna' },
        { label: 'Els passos són una llista numerada de tres elements', selector: 'ol > li', count: 3 },
        { label: 'El primer pas és mirar el temps', selector: 'ol > li', text: 'temps' },
        { label: 'Cada llista té el seu `<h2>`', selector: 'h2', count: 2 },
      ],
    },
    {
      id: 'cercador-amb-etiqueta',
      title: 'Un cercador com cal',
      statement: [
        "Aquest camp vol ser un cercador, però li falta gairebé tot. Arregla'l:",
        'Posa\'l dins d\'un `<form>`. Fes que sigui de tipus `search` i dona-li l\'identificador `cerca`. Afegeix-hi, al davant, una `<label>` amb el text «Cerca una ruta», connectada al camp amb `for`. I afegeix-hi, al darrere, un botó amb el text «Cerca».',
      ],
      expected: 'El títol i, a sota, el text «Cerca una ruta», el camp i un botó.',
      html: `<h1>Camins</h1>
<input placeholder="Nom de la ruta">`,
      hint: [
        'El formulari és el pare de les tres peces: la `<label>`, l\'`<input>` i el `<button>`.',
        'Perquè l\'etiqueta quedi connectada, el seu `for` ha de dir el mateix que l\'`id` del camp.',
      ],
      solution: {
        html: `<h1>Camins</h1>
<form>
  <label for="cerca">Cerca una ruta</label>
  <input type="search" id="cerca" placeholder="Nom de la ruta">
  <button type="submit">Cerca</button>
</form>`,
      },
      explanation: "Un cercador són tres peces dins d'un formulari. El `type` diu quina mena de camp és, l'`id` li posa nom i el `for` de l'etiqueta hi apunta. Prova de clicar el text «Cerca una ruta»: el cursor ha d'anar al camp.",
      checks: [
        { label: 'El camp és dins del formulari i es diu `cerca`', selector: 'form input#cerca' },
        { label: 'El camp és de tipus `search`', selector: 'input', attr: { type: 'search' } },
        { label: "L'etiqueta diu «Cerca una ruta» i està connectada al camp", selector: 'form label', attr: { for: 'cerca' }, text: 'Cerca una ruta' },
        { label: 'Hi ha un botó «Cerca» dins del formulari', selector: 'form button', text: 'Cerca' },
      ],
    },
  ],

  finalExercise: {
    id: 'pagina-duna-ruta',
    title: "La pàgina d'una ruta, a partir del text",
    statement: [
      "T'han passat el text de la pàgina de la Vall de Núria sense cap marca, i el navegador l'ensenya tot seguit. Converteix-lo en una pàgina:",
      '«Torna a totes les rutes» és un paràgraf amb un enllaç a `index.html`. «Vall de Núria» és el títol de la pàgina. A sota del títol hi va la foto `imatges/ruta-2.jpg`, de 300 píxels d\'ample i amb text alternatiu. La línia de les dades és un paràgraf, amb «Dificultat mitjana» marcada com a important.',
      '«Com arribar-hi» i «Què cal portar» són els dos apartats. El primer té tres passos que s\'han de fer en ordre. El segon, tres coses que es poden portar en qualsevol ordre. I a l\'últim paràgraf, el nom de cada una de les dues rutes és un enllaç a `ruta.html`.',
    ],
    expected: 'Un enllaç per tornar, el títol, la foto, les dades, dos apartats amb una llista cadascun (la primera numerada) i una última línia amb dos enllaços.',
    html: `Torna a totes les rutes

Vall de Núria

9 km · 3 h · Dificultat mitjana

Com arribar-hi
Agafa el tren fins a Ribes de Freser.
Puja al tren cremallera.
Baixa a l'última parada.

Què cal portar
Aigua
Roba d'abric
Calçat de muntanya

Altres rutes: Camí de Ronda i Puigmal`,
    fileNames: { html: 'ruta.html' },
    hint: [
      "No ho facis tot de cop. Comença pels encapçalaments i els paràgrafs: quan la pàgina ja tingui forma, passa a les llistes, i deixa els enllaços i la foto per al final.",
      'La llista de «Com arribar-hi» és un `<ol>`; la de «Què cal portar», un `<ul>`. La paraula important va dins d\'un `<strong>`.',
    ],
    solution: {
      html: `<p><a href="index.html">Torna a totes les rutes</a></p>

<h1>Vall de Núria</h1>
<img src="imatges/ruta-2.jpg" alt="Un paisatge de muntanyes amb el sol al fons" width="300">
<p>9 km · 3 h · <strong>Dificultat mitjana</strong></p>

<h2>Com arribar-hi</h2>
<ol>
  <li>Agafa el tren fins a Ribes de Freser.</li>
  <li>Puja al tren cremallera.</li>
  <li>Baixa a l'última parada.</li>
</ol>

<h2>Què cal portar</h2>
<ul>
  <li>Aigua</li>
  <li>Roba d'abric</li>
  <li>Calçat de muntanya</li>
</ul>

<p>Altres rutes: <a href="ruta.html">Camí de Ronda</a> i <a href="ruta.html">Puigmal</a></p>`,
    },
    explanation: [
      "El text era el mateix abans i després. El que hi has afegit és el significat de cada tros: què és un títol, què és una llista, què es pot clicar. És exactament la feina de l'HTML.",
      "Fixa't que has pres decisions sense pensar en l'aspecte: `<ol>` perquè l'ordre importa, `<strong>` perquè la dificultat és important, `<h2>` perquè són apartats. Si l'estructura és bona, donar-li aspecte amb CSS serà molt més fàcil.",
    ],
    checks: [
      { label: 'El primer enllaç torna a `index.html`', selector: 'a', attr: { href: 'index.html' }, text: 'Torna' },
      { label: 'Hi ha un sol `<h1>`: «Vall de Núria»', selector: 'h1', count: 1, text: 'Vall de Núria' },
      { label: "La foto es veu, fa 300 píxels d'ample i té text alternatiu", selector: 'img', attr: { alt: true }, size: { width: 300, minHeight: 100 } },
      { label: '«Dificultat mitjana» està marcada com a important', selector: 'p strong', text: 'mitjana' },
      { label: 'Hi ha dos apartats, cadascun amb el seu `<h2>`', selector: 'h2', count: 2 },
      { label: 'Els passos per arribar-hi són una llista numerada de tres elements', selector: 'ol > li', count: 3 },
      { label: 'El material és una llista sense ordre de tres elements', selector: 'ul > li', count: 3 },
      { label: 'Les dues rutes del final enllacen a `ruta.html`', selector: 'a[href="ruta.html"]', count: 2 },
    ],
  },

  summary: [
    "Els encapçalaments, de `<h1>` a `<h6>`, formen l'índex de la pàgina: un sol `<h1>` i cap nivell saltat.",
    '`<strong>` marca text important i `<em>`, èmfasi. Van dins del text, sense tallar la línia.',
    'Un enllaç és `<a href="destí">text</a>`. El text ha de dir on porta.',
    'Una imatge és `<img src="fitxer" alt="descripció">`: un element buit amb dos atributs que no poden faltar.',
    "Una **ruta relativa** es llegeix des del fitxer on s'escriu: `ruta.html`, `imatges/logo.png`, `../index.html`.",
    "`<ul>` és una llista sense ordre i `<ol>`, una de numerada. A dins només hi van `<li>`.",
    '`<button>` és un botó i `<input>`, un camp. Cada camp porta la seva `<label>`, connectada amb `for` i `id`.',
  ],

  quiz: [
    {
      question: 'Quants elements `<h1>` hauria de tenir una pàgina?',
      options: [
        { text: 'Un: el títol de la pàgina', correct: true },
        { text: 'Tants com títols grans vulguis', why: 'La mida no decideix el nivell. Els títols dels apartats són `<h2>`, i la seva mida es canvia amb CSS.' },
        { text: 'Un per a cada apartat', why: 'Els apartats es titulen amb `<h2>`. El `<h1>` és el títol de tota la pàgina.' },
        { text: "Cap: n'hi ha prou amb el `<title>`", why: 'El `<title>` és el nom de la pestanya i no es veu a la pàgina.' },
      ],
      explanation: "El `<h1>` és el títol de la pàgina, i de títol només n'hi ha un. La resta d'encapçalaments pengen d'ell, per nivells.",
    },
    {
      question: "Què fa l'atribut `href` d'un enllaç?",
      options: [
        { text: "Diu a quina pàgina o fitxer porta l'enllaç", correct: true },
        { text: 'És el text que es veu i es clica', why: "El text que es clica és el contingut de l'element, entre `<a>` i `</a>`." },
        { text: "Fa que l'enllaç es vegi blau i subratllat", why: "Això és l'aspecte per defecte dels enllaços. `href` només diu el destí." },
        { text: "Descriu l'enllaç per als lectors de pantalla", why: "El que llegeix un lector de pantalla és el text de l'enllaç. Per això ha de dir on porta." },
      ],
      explanation: "`href` conté el destí: el nom d'un fitxer del mateix lloc o l'adreça sencera d'un altre. Sense `href`, l'element `<a>` no es comporta com un enllaç.",
    },
    {
      question: "Per a què serveix l'atribut `alt` d'una imatge?",
      options: [
        { text: "Descriu la imatge: es mostra si no es pot carregar i és el que llegeix un lector de pantalla", correct: true },
        { text: 'Diu on és el fitxer de la imatge', why: 'Això ho fa `src`.' },
        { text: 'És el títol que surt a sota de la imatge', why: "L'`alt` no es veu a la pàgina mentre la imatge es carrega bé." },
        { text: 'Fa la imatge més petita', why: 'La mida es canvia amb `width` i, més endavant, amb CSS.' },
      ],
      explanation: "L'`alt` és el text que substitueix la imatge quan no es pot veure, sigui perquè no s'ha carregat o perquè qui visita la pàgina no hi veu.",
    },
    {
      question: 'Ets a `index.html`. Al costat hi ha una carpeta que es diu `imatges`, i a dins, el fitxer `ruta-1.jpg`. Què has d\'escriure a l\'atribut `src`?',
      options: [
        { text: '`imatges/ruta-1.jpg`', correct: true },
        { text: '`ruta-1.jpg`', why: 'Això buscaria la foto al costat d\'`index.html`, i és una carpeta més endins.' },
        { text: '`../imatges/ruta-1.jpg`', why: '`..` puja a la carpeta de sobre, i la carpeta `imatges` és al costat d\'`index.html`, no més amunt.' },
        { text: '`Imatges/Ruta-1.JPG`', why: "Les majúscules compten: el nom s'ha d'escriure exactament com es diu el fitxer." },
      ],
      explanation: 'Una ruta relativa es llegeix des del fitxer on s\'escriu: el nom de la carpeta, una barra i el nom del fitxer.',
    },
    {
      question: "Has d'escriure els passos per arribar a l'inici d'una ruta, en l'ordre en què s'han de fer. Quina etiqueta fas servir per a la llista?",
      options: [
        { text: "`<ol>`, perquè l'ordre importa", correct: true },
        { text: '`<ul>`, i escric el número davant de cada pas', why: "Si l'ordre importa, la llista és un `<ol>`, i els números els posa el navegador." },
        { text: 'Només `<li>`, un per a cada pas, sense res al voltant', why: 'Els `<li>` han d\'anar sempre dins d\'un `<ul>` o d\'un `<ol>`.' },
        { text: 'Un `<p>` amb un `<br>` després de cada pas', why: 'Es veuria semblant, però el navegador no sabria que és una llista ni quants passos té.' },
      ],
      explanation: "`<ol>` és la llista ordenada. El navegador numera els elements, i els torna a numerar si n'afegeixes o en treus algun.",
    },
    {
      question: 'Com es connecta una `<label>` amb el seu camp?',
      options: [
        { text: "L'atribut `for` de la `<label>` té el mateix valor que l'`id` del camp", correct: true },
        { text: 'Posant el mateix text a la `<label>` i al `placeholder`', why: "El `placeholder` és un text d'ajuda dins del camp. No connecta res." },
        { text: 'Escrivint la `<label>` just abans del camp', why: 'Que estiguin de costat no les connecta: el navegador necessita que `for` i `id` coincideixin.' },
        { text: "Amb l'atribut `href` de la `<label>`", why: '`href` és dels enllaços. Les etiquetes dels camps fan servir `for`.' },
      ],
      explanation: "Quan `for` i `id` coincideixen, clicar l'etiqueta posa el cursor al camp, i un lector de pantalla sap dir de quin camp es tracta.",
    },
  ],
};
