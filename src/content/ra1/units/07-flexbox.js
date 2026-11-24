import { p, list, example, concept, warning, challenge, project, table, compare, custom } from '../../blocks.js';

// Tres caixes de colors dins d'un contenidor: la base de gairebé tots els
// exemples de la unitat.
const HTML_CAIXES = `<div class="contenidor">
  <div class="caixa">Un</div>
  <div class="caixa">Dos</div>
  <div class="caixa">Tres</div>
</div>`;

const CSS_CAIXA = `.caixa {
  padding: 12px 20px;
  color: #ffffff;
  background: #1f6f54;
  border-radius: 6px;
}`;

const CSS_BASE = `body {
  font-family: Arial, sans-serif;
}`;

// La capçalera de la web de rutes, tal com la deixem en aquesta unitat.
const HTML_CAPCALERA = `<header class="capcalera">
  <a class="logo" href="index.html">▲ Camins</a>

  <nav class="menu">
    <a href="index.html">Rutes</a>
    <a href="mapa.html">Mapa</a>
    <a href="consells.html">Consells</a>
  </nav>
</header>`;

const CSS_CAPCALERA_BASE = `body {
  margin: 0;
  font-family: Arial, sans-serif;
}

.capcalera {
  padding: 12px 24px;
  color: #ffffff;
  background: #1f6f54;
}

.capcalera a {
  color: #ffffff;
  text-decoration: none;
}

.logo {
  font-size: 22px;
  font-weight: bold;
}`;

export const glossary = [
  {
    term: 'Flexbox',
    definition:
      'Sistema de maquetació de CSS que col·loca els fills d\'un contenidor en una fila o en una columna i reparteix l\'espai entre ells. S\'activa amb `display: flex` al contenidor.',
  },
  {
    term: 'Contenidor flex',
    definition: 'L\'element que té `display: flex`. És el pare: ell decideix com es col·loquen els seus fills directes.',
  },
  {
    term: 'Eix principal',
    definition:
      'La direcció en què un contenidor flex col·loca els fills: horitzontal amb `flex-direction: row` i vertical amb `column`. `justify-content` reparteix els fills al llarg d\'aquest eix.',
  },
  {
    term: 'Eix transversal',
    definition: 'L\'eix perpendicular al principal. `align-items` hi alinea els fills.',
  },
  {
    term: 'justify-content',
    definition: 'Propietat del contenidor flex que reparteix els fills al llarg de l\'eix principal: al principi, al centre, al final o separats.',
  },
  {
    term: 'align-items',
    definition: 'Propietat del contenidor flex que alinea els fills a l\'eix transversal. El valor per defecte, `stretch`, els estira.',
  },
  {
    term: 'gap',
    definition: 'Separació entre els fills d\'un contenidor flex o grid. No afegeix espai abans del primer ni després de l\'últim.',
  },
];

export default {
  id: 'flexbox',
  number: 7,
  title: 'Flexbox: files i columnes',
  shortTitle: 'Flexbox: files i columnes',
  description:
    'Com posar els quadrats de costat: un contenidor amb `display: flex` col·loca els seus fills en fila o en columna, els reparteix, els alinea i els separa.',

  problem: {
    title: 'Tinc els quadrats ben dibuixats, però tots queden l\'un sota l\'altre',
    text: [
      "Ja sabem mirar un disseny, dibuixar-hi els quadrats i convertir cada quadrat en un contenidor. El dibuix de la capçalera de la web de rutes és clar: el logo a l'esquerra i el menú a la dreta, a la mateixa alçada. Però quan l'escrivim, el menú cau a sota del logo.",
      "No és cap error: els contenidors són elements de bloc, i a la unitat anterior vam veure que els blocs s'apilen. Amb `inline-block` vam aconseguir posar coses de costat, però alinear-les o enviar-ne una a la dreta era una lluita.",
      "Flexbox resol això amb una idea molt simple: **li dius al quadrat de fora com ha de col·locar els quadrats de dins**. Una fila o una columna. Res més. I com que qualsevol disseny es pot dibuixar amb files i columnes ficades les unes dins de les altres, amb això n'hi ha prou per maquetar gairebé qualsevol pàgina.",
    ],
  },

  goals: [
    'Convertir un contenidor en flex i explicar què els passa als seus fills.',
    'Triar si els fills van en fila o en columna amb `flex-direction`.',
    "Repartir els fills al llarg de l'eix principal amb `justify-content`.",
    "Alinear-los a l'altre eix amb `align-items`.",
    'Separar-los amb `gap` en lloc de marges.',
    "Centrar un element dins d'un altre, en horitzontal i en vertical.",
  ],

  projectPiece:
    'La capçalera deixa de ser dues línies: el logo queda a l\'esquerra, el menú a la dreta i tots dos centrats a la mateixa alçada.',

  finalProject:
    'La capçalera de la teva pàgina tipus YouTube, la fila de xips de categories i la barra del canal són contenidors flex.',

  sections: [
    {
      id: 'display-flex',
      title: 'display: flex: una ordre que es dona al pare',
      blocks: [
        p("Per posar tres caixes de costat no toquem cap de les tres caixes. Anem al quadrat que les conté, **el pare**, i li posem `display: flex`. Des d'aquell moment, el pare és un **contenidor flex** i els seus fills es col·loquen en fila."),
        example({
          title: 'De columna a fila amb una sola línia',
          intro: "Mira el resultat i després esborra la línia `display: flex;` del CSS. Torna-la a escriure. Fes-ho un parell de vegades amb el botó «Quadrats» activat: veuràs què canvia a cada caixa.",
          html: HTML_CAIXES,
          css: `.contenidor {
  display: flex;
}

${CSS_CAIXA}`,
          boxes: true,
          expected: "Amb `display: flex`, les tres caixes verdes queden de costat, enganxades. Sense, cada una ocupa tota l'amplada i queden apilades.",
          why: "Sense flex, cada `<div>` és un bloc: ocupa tota la línia i el següent baixa. Amb flex al pare, els fills es posen l'un al costat de l'altre i només ocupen l'amplada que necessita el seu contingut.",
        }),
        p("Fixa't en tres coses que els han passat als fills, sense que els haguem escrit res:"),
        list(
          "**Es posen de costat**, d'esquerra a dreta, en l'ordre en què estan escrits a l'HTML.",
          "**Només fan l'amplada del seu contingut.** Ja no ocupen tota la línia.",
          "**Tots fan la mateixa alçada**: la del fill més alt. S'estiren per omplir el contenidor de dalt a baix."
        ),
        concept(
          'Flex s\'escriu al pare',
          "`display: flex` no es posa a l'element que vols moure: es posa al quadrat que el conté. Quan una cosa no es col·loca com vols, la pregunta és sempre la mateixa: **qui és el seu pare?** És allà on has d'anar a escriure."
        ),
        warning(
          'El pare continua sent un bloc',
          "El contenidor flex no canvia cap enfora: continua ocupant tota l'amplada i apilant-se amb els seus germans, com qualsevol bloc. El que canvia és com col·loca el que té **a dins**."
        ),
      ],
    },

    {
      id: 'flex-direction',
      title: 'Fila o columna: flex-direction',
      blocks: [
        p("Quan dibuixes un quadrat amb coses a dins, la primera pregunta és: **estan de costat o estan apilades?** A Flexbox, aquesta pregunta té una propietat: `flex-direction`."),
        table(
          ['Valor', 'Com queden els fills', 'Quan es fa servir'],
          [
            ['`row`', "En fila, d'esquerra a dreta. És el valor per defecte.", 'Capçaleres, menús, files de botons'],
            ['`column`', 'En columna, de dalt a baix', 'Menús laterals, el text d\'una targeta'],
          ],
          'Els dos valors de flex-direction que farem servir'
        ),
        custom('CssPlayground', {
          title: 'Prova-ho: flex-direction',
          intro: 'Canvia la direcció i mira com es recol·loquen les tres caixes.',
          items: 3,
          base: { display: 'flex', gap: '8px' },
          controls: [{ prop: 'flex-direction', options: ['row', 'column'] }],
          height: 150,
        }),
        p("Potser et preguntes per què cal `flex-direction: column`, si sense flex les caixes ja s'apilaven soles. La resposta arribarà de seguida: perquè en un contenidor flex pots **repartir, alinear i separar** els fills, tant si van en fila com si van en columna. En un bloc normal, no."),
        concept(
          'Dos eixos',
          "La direcció que tries és l'**eix principal**: per on avancen els fills. L'altre, el que el creua, és l'**eix transversal**. Amb `row`, el principal és horitzontal i el transversal, vertical. Amb `column`, és a l'inrevés. Les dues propietats que venen ara treballen cada una sobre un eix."
        ),
      ],
    },

    {
      id: 'justify-content',
      title: "Repartir els fills: justify-content",
      blocks: [
        p("En una fila, els fills només ocupen el que necessiten i gairebé sempre **sobra espai**. `justify-content` decideix què es fa amb aquest espai que sobra a l'eix principal."),
        custom('CssPlayground', {
          title: 'Prova-ho: justify-content',
          intro: "Passa per tots els valors. Fixa't on va a parar l'espai buit en cada cas.",
          items: 3,
          base: { display: 'flex' },
          controls: [
            {
              prop: 'justify-content',
              options: ['flex-start', 'center', 'flex-end', 'space-between', 'space-around', 'space-evenly'],
            },
          ],
          height: 90,
        }),
        table(
          ['Valor', "On va l'espai que sobra"],
          [
            ['`flex-start`', 'Tot al final: els fills queden al principi. És el valor per defecte.'],
            ['`center`', 'Meitat a cada banda: els fills queden al centre'],
            ['`flex-end`', 'Tot al principi: els fills queden al final'],
            ['`space-between`', 'Entre els fills. El primer i l\'últim toquen les vores.'],
            ['`space-around`', 'Entre els fills i, la meitat, a les vores'],
            ['`space-evenly`', 'Repartit igual entre els fills i a les vores'],
          ],
          'Valors de justify-content'
        ),
        p("El més útil per maquetar és `space-between`. Quan un quadrat té **una cosa a cada punta**, és el que necessites: no cal calcular cap marge."),
        example({
          title: 'El logo a una punta i el menú a l\'altra',
          intro: "La capçalera té dos fills: el logo i el menú. Amb `space-between`, l'espai que sobra queda al mig i cada fill se'n va a una punta.",
          html: HTML_CAPCALERA,
          css: `${CSS_CAPCALERA_BASE}

.capcalera {
  display: flex;
  justify-content: space-between;
}`,
          boxes: true,
          expected: "Una franja verda amb «▲ Camins» a l'esquerra i els tres enllaços a la dreta, a la mateixa línia.",
          why: "La capçalera té **dos** fills directes: l'enllaç del logo i el `<nav>`. Els tres enllaços no són fills de la capçalera, sinó del `<nav>`, i per això van junts com una sola caixa. Activa els quadrats i ho veuràs.",
        }),
        challenge({
          title: 'Tot al centre',
          statement: "Canvia el CSS perquè el logo i el menú quedin junts al centre de la capçalera, en lloc d'un a cada punta.",
          html: HTML_CAPCALERA,
          css: `${CSS_CAPCALERA_BASE}

.capcalera {
  display: flex;
  justify-content: space-between;
}`,
          hint: "Només has de canviar un valor. L'espai que sobra s'ha de repartir meitat a cada banda.",
          solution: {
            css: `${CSS_CAPCALERA_BASE}

.capcalera {
  display: flex;
  justify-content: center;
}`,
          },
          explanation: "Amb `center`, l'espai que sobra es reparteix a parts iguals a l'esquerra i a la dreta, i els dos fills queden enganxats al mig.",
          checks: [
            { label: 'El logo i el menú continuen de costat', selector: '.capcalera > *', arrange: 'row' },
            { label: 'Estan junts, sense espai entre ells', selector: '.capcalera > *', gap: 0 },
            { label: 'La capçalera els posa al centre', selector: '.capcalera', style: { 'justify-content': 'center' } },
          ],
        }),
      ],
    },

    {
      id: 'align-items',
      title: "Alinear a l'altre eix: align-items",
      blocks: [
        p("`justify-content` treballa al llarg de la fila. Però en una fila també cal decidir què passa **de dalt a baix**: si un fill és més baixet que els altres, on es posa? D'això se n'encarrega `align-items`."),
        custom('CssPlayground', {
          title: 'Prova-ho: align-items',
          intro: 'El contenidor és més alt que les caixes. Mira on queden amb cada valor.',
          items: ['Un', 'Dos', 'Tres'],
          base: { display: 'flex', gap: '8px' },
          controls: [{ prop: 'align-items', options: ['stretch', 'flex-start', 'center', 'flex-end'] }],
          height: 170,
        }),
        table(
          ['Valor', 'Què fa en una fila'],
          [
            ['`stretch`', "Estira els fills fins que fan l'alçada del contenidor. És el valor per defecte."],
            ['`flex-start`', 'Els posa a dalt, cadascun amb la seva alçada'],
            ['`center`', 'Els centra verticalment'],
            ['`flex-end`', 'Els posa a baix'],
          ],
          'Valors de align-items'
        ),
        p("A la capçalera de la web de rutes ens cal. El logo té la lletra més gran que el menú, i sense dir res el menú s'estira i el seu text queda enganxat a dalt."),
        example({
          title: 'Centrar el menú a l\'alçada del logo',
          intro: 'Esborra la línia `align-items: center;` i mira on queda el text del menú respecte del logo.',
          html: HTML_CAPCALERA,
          css: `${CSS_CAPCALERA_BASE}

.capcalera {
  display: flex;
  justify-content: space-between;
  align-items: center;
}`,
          boxes: true,
          expected: "El logo i els enllaços queden a la mateixa alçada, centrats dins de la franja verda. Sense `align-items`, els enllaços pugen a dalt.",
          why: "El fill més alt (el logo) marca l'alçada de la fila. Amb `center`, els altres fills es col·loquen al mig d'aquesta alçada en lloc d'estirar-se.",
        }),
        warning(
          'Quan la direcció és columna, els eixos es giren',
          "Amb `flex-direction: column`, l'eix principal és vertical. Llavors `justify-content` reparteix de dalt a baix i `align-items` alinea d'esquerra a dreta. No memoritzis «horitzontal» i «vertical»: recorda **principal** i **transversal**."
        ),
      ],
    },

    {
      id: 'gap',
      title: 'Separar els fills: gap',
      blocks: [
        p("Els fills d'un contenidor flex queden enganxats. Per separar-los, la propietat és `gap`, i també s'escriu al pare: és l'espai **entre** fill i fill."),
        example({
          title: 'Un menú amb aire',
          intro: 'El `<nav>` també és un contenidor flex: col·loca els seus tres enllaços en fila i els separa 24 píxels.',
          html: HTML_CAPCALERA,
          css: `${CSS_CAPCALERA_BASE}

.capcalera {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.menu {
  display: flex;
  gap: 24px;
}`,
          expected: 'Els tres enllaços del menú queden separats entre ells, i l\'últim continua tocant el marge dret de la capçalera.',
          why: "`gap` només posa espai entre els fills: ni abans del primer ni després de l'últim. Per això el menú no es mou de la vora dreta.",
        }),
        compare(
          {
            title: 'Amb marges',
            tone: 'bad',
            lang: 'css',
            code: `.menu a {
  margin-right: 24px;
}`,
            text: "Cada enllaç empeny el següent, però l'últim també té marge i el menú ja no arriba a la vora. Caldria una altra regla per treure-l'hi.",
          },
          {
            title: 'Amb gap',
            tone: 'good',
            lang: 'css',
            code: `.menu {
  display: flex;
  gap: 24px;
}`,
            text: 'Una sola propietat, al pare, i no sobra espai enlloc.',
          }
        ),
        concept(
          'Qui decideix la separació',
          "La separació entre germans és cosa del pare (`gap`). El `padding` és l'aire **de dins** de cada quadrat, i el `margin`, la distància amb el que té a fora. Si et trobes posant marges als fills per separar-los entre ells, segurament volies `gap`."
        ),
      ],
    },

    {
      id: 'centrar',
      title: 'Centrar del tot',
      blocks: [
        p("Centrar una cosa al mig d'una altra, en horitzontal i en vertical, va ser durant anys un dels maldecaps del CSS. Amb Flexbox són tres línies, sempre les mateixes."),
        example({
          title: 'Un missatge al mig de la caixa',
          intro: 'El contenidor fa 180 píxels d\'alt. El missatge queda exactament al centre.',
          html: `<div class="buit">
  <p>Encara no has desat cap ruta.</p>
</div>`,
          css: `${CSS_BASE}

.buit {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 180px;
  background: #e8f3ee;
  border-radius: 8px;
}`,
          boxes: true,
          expected: 'Una caixa de color verd clar amb el text centrat al mig, tant d\'esquerra a dreta com de dalt a baix.',
          why: "`justify-content: center` centra a l'eix principal (horitzontal) i `align-items: center`, a l'eix transversal (vertical). Funciona perquè el contenidor és més gran que el seu fill: hi ha espai per repartir.",
        }),
        warning(
          'Sense espai que sobri, no hi ha res a centrar',
          "Un contenidor fa, per defecte, l'alçada justa del seu contingut. Si no li dones una alçada (o no en té per algun altre motiu), `align-items: center` no es nota: el fill ja ocupa tota l'alçada disponible."
        ),
      ],
    },

    {
      id: 'fills-directes',
      title: 'Flex només mana sobre els fills directes',
      blocks: [
        p("Aquesta és la idea que connecta Flexbox amb els quadrats. Un contenidor flex col·loca **els seus fills**, i prou. El que hi hagi dins de cada fill no s'assabenta de res: continua col·locat com sempre."),
        example({
          title: 'El menú no es posa en fila',
          intro: 'La capçalera és flex, però el `<nav>` no. Activa els quadrats i compta quants fills té la capçalera.',
          html: `<header class="capcalera">
  <a class="logo" href="index.html">▲ Camins</a>

  <nav class="menu">
    <p>Rutes</p>
    <p>Mapa</p>
    <p>Consells</p>
  </nav>
</header>`,
          css: `${CSS_CAPCALERA_BASE}

.capcalera {
  display: flex;
  justify-content: space-between;
}

.menu p {
  margin: 0;
}`,
          boxes: true,
          expected: 'El logo a l\'esquerra i, a la dreta, les tres opcions del menú apilades en columna.',
          why: "La capçalera té dos fills (el logo i el `<nav>`) i els posa en fila. Els tres paràgrafs són fills del `<nav>`, que és un bloc normal: per això s'apilen. Per posar-los en fila, el `<nav>` també ha de ser flex.",
        }),
        concept(
          'Cada quadrat amb fills, una decisió',
          "Torna al dibuix. Per a cada quadrat que té quadrats a dins, pregunta't: **fila o columna?** Si la resposta és «fila», aquell quadrat necessita `display: flex`. Si a dins d'un dels fills torna a haver-hi una fila, aquell fill també. A la unitat següent farem servir això per maquetar peces senceres."
        ),
        custom('BoxSketch', {
          title: 'La capçalera, en quadrats',
          intro: 'Dos nivells de quadrats, dues files. Obre el dibuix per veure la de dins.',
          tree: {
            name: 'capçalera',
            tag: 'header.capcalera',
            dir: 'row',
            children: [
              { name: 'logo', tag: 'a.logo', basis: '30%' },
              {
                name: 'menú',
                tag: 'nav.menu',
                dir: 'row',
                children: [{ name: 'Rutes', tag: 'a' }, { name: 'Mapa', tag: 'a' }, { name: 'Consells', tag: 'a' }],
              },
            ],
          },
          steps: [
            'La capçalera és una **fila** amb dos fills: el logo i el menú. `display: flex` a `.capcalera`.',
            'El menú també és una **fila**, amb tres enllaços. `display: flex` a `.menu`.',
          ],
        }),
        project(
          "Amb el que hem vist, la capçalera de la web de rutes queda així. Són dos contenidors flex: un per a cada quadrat que té fills en fila.",
          {
            title: 'La capçalera, en una fila',
            lang: 'css',
            code: `.capcalera {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 24px;
}

.menu {
  display: flex;
  gap: 24px;
}`,
          }
        ),
      ],
    },
  ],

  commonErrors: [
    {
      title: 'Posar display: flex al fill que es vol moure',
      bad: `.logo {
  display: flex;
}`,
      badLang: 'css',
      symptom: 'El logo i el menú continuen l\'un sota l\'altre, com si no haguessis escrit res.',
      why: "`display: flex` col·loca els fills de l'element on l'escrius. El logo no té fills per col·locar, i el seu pare, que és qui hauria de posar-lo de costat amb el menú, continua sent un bloc normal.",
      fix: `.capcalera {
  display: flex;
}`,
      fixLang: 'css',
    },
    {
      title: 'Esperar que flex col·loqui també els nets',
      bad: `.capcalera {
  display: flex;
}

/* Els enllaços de dins del <nav> continuen apilats */`,
      badLang: 'css',
      symptom: 'El logo i el menú queden de costat, però les opcions del menú continuen en columna.',
      why: "Un contenidor flex només mana sobre els seus fills directes. Les opcions del menú són filles del `<nav>`, no de la capçalera.",
      fix: `.capcalera {
  display: flex;
}

.menu {
  display: flex;
}`,
      fixLang: 'css',
    },
    {
      title: 'align-items: center en un contenidor que no té alçada de sobres',
      bad: `.buit {
  display: flex;
  align-items: center;
}`,
      badLang: 'css',
      symptom: 'El text no es mou: queda a dalt, igual que abans.',
      why: "El contenidor fa exactament l'alçada del text, així que no hi ha espai per centrar-lo. `align-items` només es nota quan el contenidor és més alt que els seus fills.",
      fix: `.buit {
  display: flex;
  align-items: center;
  height: 180px;
}`,
      fixLang: 'css',
    },
    {
      title: 'Confondre justify-content i align-items en una columna',
      bad: `.fitxa {
  display: flex;
  flex-direction: column;
  justify-content: center;
}`,
      badLang: 'css',
      symptom: 'Volies centrar els elements d\'esquerra a dreta i continuen enganxats a l\'esquerra.',
      why: "En una columna, l'eix principal és vertical: `justify-content` reparteix de dalt a baix. El que centra d'esquerra a dreta és l'altre eix, `align-items`.",
      fix: `.fitxa {
  display: flex;
  flex-direction: column;
  align-items: center;
}`,
      fixLang: 'css',
    },
    {
      title: 'Separar els fills amb marges i que en sobri un',
      bad: `.menu a {
  margin-right: 24px;
}`,
      badLang: 'css',
      symptom: 'El menú no arriba a tocar el marge dret de la capçalera: hi queda un buit de 24 píxels.',
      why: "L'últim enllaç també té marge a la dreta, tot i que no té cap germà a qui separar-se.",
      fix: `.menu {
  display: flex;
  gap: 24px;
}`,
      fixLang: 'css',
    },
  ],

  exercises: [
    {
      id: 'menu-en-fila',
      title: 'Un menú en fila',
      statement: "Els tres enllaços del menú estan apilats perquè els hem convertit en blocs. Fes que quedin en una fila, separats 24 píxels entre ells. No toquis l'HTML.",
      expected: 'Els tres enllaços, de costat, amb el mateix espai entre l\'un i l\'altre.',
      html: `<nav class="menu">
  <a href="index.html">Rutes</a>
  <a href="mapa.html">Mapa</a>
  <a href="consells.html">Consells</a>
</nav>`,
      css: `${CSS_BASE}

.menu a {
  display: block;
  padding: 8px 12px;
  color: #1f6f54;
  background: #e8f3ee;
  border-radius: 6px;
}

.menu {
  /* Escriu aquí */
}`,
      hint: "Són dues propietats, i totes dues van al pare dels enllaços: una per posar-los en fila i una altra per separar-los.",
      solution: {
        css: `${CSS_BASE}

.menu a {
  display: block;
  padding: 8px 12px;
  color: #1f6f54;
  background: #e8f3ee;
  border-radius: 6px;
}

.menu {
  display: flex;
  gap: 24px;
}`,
      },
      explanation: "`display: flex` al `<nav>` posa els seus tres fills en fila, i `gap` els separa sense afegir espai a les puntes. Als enllaços no els hem hagut de tocar res.",
      checks: [
        { label: 'Els tres enllaços estan en fila', selector: '.menu a', arrange: 'row' },
        { label: 'Hi ha 24 píxels entre enllaç i enllaç', selector: '.menu a', gap: 24 },
      ],
    },
    {
      id: 'una-cosa-a-cada-punta',
      title: 'Una cosa a cada punta',
      statement: "A la barra hi ha el nom de la ruta i un botó. Fes que el nom quedi a l'esquerra, el botó a la dreta i tots dos centrats verticalment.",
      expected: 'El títol toca el marge esquerre de la barra i el botó, el dret. El botó queda centrat a l\'alçada del títol.',
      html: `<div class="barra">
  <h2>Camí de Ronda</h2>
  <button type="button">Desa la ruta</button>
</div>`,
      css: `${CSS_BASE}

.barra {
  padding: 12px 16px;
  background: #e8f3ee;
  border-radius: 8px;
}

.barra h2 {
  margin: 0;
  font-size: 28px;
}`,
      hint: [
        'La barra té dos fills. Quin valor de `justify-content` envia el primer a una punta i l\'últim a l\'altra?',
        'El títol és més alt que el botó: per centrar-los entre ells cal `align-items`.',
      ],
      solution: {
        css: `${CSS_BASE}

.barra {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 16px;
  background: #e8f3ee;
  border-radius: 8px;
}

.barra h2 {
  margin: 0;
  font-size: 28px;
}`,
      },
      explanation: "`space-between` posa tot l'espai que sobra entre els dos fills, i cadascun queda a una punta. Sense `align-items: center`, el botó s'estiraria fins a fer l'alçada del títol.",
      checks: [
        { label: 'El títol i el botó estan a la mateixa fila', selector: '.barra > *', arrange: 'row' },
        { label: 'El títol toca el marge esquerre de la barra', selector: '.barra h2', offset: { left: 16 } },
        { label: 'El botó toca el marge dret de la barra', selector: '.barra button', offset: { right: 16 } },
        { label: 'El botó està centrat verticalment', selector: '.barra button', centered: 'y' },
      ],
    },
    {
      id: 'fitxa-centrada',
      title: 'Una fitxa en columna',
      statement: "La fitxa d'una ruta mostra tres dades. Fes que quedin en columna, centrades d'esquerra a dreta i separades 8 píxels. Fes servir Flexbox: no val `text-align`.",
      expected: 'Les tres dades, l\'una sota l\'altra, centrades dins de la fitxa.',
      html: `<div class="fitxa">
  <span class="dada">12 km</span>
  <span class="dada">3 h 30 min</span>
  <span class="dada">Dificultat mitjana</span>
</div>`,
      css: `${CSS_BASE}

.fitxa {
  padding: 16px;
  background: #e8f3ee;
  border-radius: 8px;
}

.dada {
  padding: 6px 12px;
  color: #ffffff;
  background: #1f6f54;
  border-radius: 6px;
}`,
      hint: [
        'Necessites quatre propietats a `.fitxa`. La direcció ja no és la de per defecte.',
        'En una columna, l\'eix transversal és l\'horitzontal: és `align-items` qui centra d\'esquerra a dreta.',
      ],
      solution: {
        css: `${CSS_BASE}

.fitxa {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  padding: 16px;
  background: #e8f3ee;
  border-radius: 8px;
}

.dada {
  padding: 6px 12px;
  color: #ffffff;
  background: #1f6f54;
  border-radius: 6px;
}`,
      },
      explanation: "Amb `flex-direction: column`, els eixos es giren: `gap` separa de dalt a baix i `align-items: center` centra d'esquerra a dreta. Fixa't que els `<span>`, que eren en línia, ara es comporten com a caixes: dins d'un contenidor flex, tots els fills ho fan.",
      checks: [
        { label: 'Les tres dades estan en columna', selector: '.dada', arrange: 'column' },
        { label: 'Hi ha 8 píxels entre dada i dada', selector: '.dada', gap: 8 },
        { label: 'Cada dada està centrada dins de la fitxa', selector: '.dada', all: true, centered: 'x' },
        { label: 'La fitxa és un contenidor flex', selector: '.fitxa', style: { display: 'flex' } },
      ],
    },
    {
      id: 'repartir-xifres',
      title: 'Tres xifres ben repartides',
      statement: "El resum d'una ruta té tres xifres. Reparteix-les per tota l'amplada de manera que l'espai entre elles i l'espai de les vores sigui **exactament el mateix**. A més, han de quedar centrades verticalment dins del resum, que fa 120 píxels d'alt.",
      expected: 'Tres xifres repartides per tota l\'amplada, amb quatre buits iguals: un a cada vora i dos entre les xifres.',
      html: `<div class="resum">
  <strong>12 km</strong>
  <strong>640 m</strong>
  <strong>3 h 30</strong>
</div>`,
      css: `${CSS_BASE}

.resum {
  height: 120px;
  font-size: 22px;
  color: #ffffff;
  background: #1f6f54;
  border-radius: 8px;
}`,
      hint: "Hi ha tres valors de `justify-content` que comencen per `space-`. Només un deixa a les vores el mateix espai que entre els fills. Torna al banc de proves si no recordes quin.",
      solution: {
        css: `${CSS_BASE}

.resum {
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  height: 120px;
  font-size: 22px;
  color: #ffffff;
  background: #1f6f54;
  border-radius: 8px;
}`,
      },
      explanation: "`space-evenly` reparteix l'espai que sobra en parts iguals: abans del primer fill, entre fill i fill i després de l'últim. Amb `space-around`, a les vores n'hi hauria la meitat; amb `space-between`, gens.",
      checks: [
        { label: 'Les tres xifres estan en fila', selector: '.resum strong', arrange: 'row' },
        { label: 'Estan centrades verticalment', selector: '.resum strong', all: true, centered: 'y' },
        { label: 'La del mig queda al centre del resum', selector: '.resum strong:nth-child(2)', centered: 'x', tol: 20 },
        { label: "Es reparteixen amb space-evenly", selector: '.resum', style: { 'justify-content': 'space-evenly' } },
      ],
    },
  ],

  finalExercise: {
    id: 'capcalera-de-rutes',
    title: 'La capçalera de la web de rutes',
    statement: [
      "Maqueta la capçalera completa. Té tres parts: el logo a l'esquerra, el menú i el botó «Entra» a la dreta de tot. Tot ha de quedar a la mateixa línia i centrat verticalment.",
      "Abans d'escriure, activa els quadrats a la pestanya «Objectiu» i compta'ls: quants fills té la capçalera? I quin d'ells té, a dins, una altra fila? Els enllaços del menú han d'estar separats 20 píxels.",
    ],
    expected: 'Una franja verda amb el logo a l\'esquerra, el botó a la dreta i el menú entre tots dos, a la mateixa distància de l\'un i de l\'altre.',
    width: 760,
    boxes: true,
    html: `<header class="capcalera">
  <a class="logo" href="index.html">▲ Camins</a>

  <nav class="menu">
    <a href="index.html">Rutes</a>
    <a href="mapa.html">Mapa</a>
    <a href="consells.html">Consells</a>
  </nav>

  <button class="boto" type="button">Entra</button>
</header>`,
    css: `body {
  margin: 0;
  font-family: Arial, sans-serif;
}

.capcalera {
  padding: 12px 24px;
  background: #1f6f54;
}

.capcalera a {
  color: #ffffff;
  text-decoration: none;
}

.logo {
  font-size: 22px;
  font-weight: bold;
}

.boto {
  padding: 8px 16px;
  font-size: 16px;
  color: #1f6f54;
  background: #ffffff;
  border: 0;
  border-radius: 20px;
}`,
    hint: [
      "La capçalera té tres fills i n'hi ha un a cada punta: és un cas de `space-between`.",
      "El menú és un quadrat amb tres enllaços a dins que també van en fila. Necessita el seu propi `display: flex`, i és allà on va el `gap`.",
    ],
    solution: {
      css: `body {
  margin: 0;
  font-family: Arial, sans-serif;
}

.capcalera {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 24px;
  background: #1f6f54;
}

.capcalera a {
  color: #ffffff;
  text-decoration: none;
}

.logo {
  font-size: 22px;
  font-weight: bold;
}

.menu {
  display: flex;
  gap: 20px;
}

.boto {
  padding: 8px 16px;
  font-size: 16px;
  color: #1f6f54;
  background: #ffffff;
  border: 0;
  border-radius: 20px;
}`,
    },
    explanation: [
      "Hi ha dos quadrats amb fills en fila, i per tant dos contenidors flex. La capçalera reparteix els seus tres fills amb `space-between` i els centra amb `align-items`. El menú col·loca els seus tres enllaços i els separa amb `gap`.",
      "Fixa't que no hem donat cap amplada ni cap marge a ningú. Hem dit a cada pare com volem els fills, i el navegador ha fet els càlculs.",
    ],
    checks: [
      { label: 'El logo, el menú i el botó estan a la mateixa fila', selector: '.capcalera > *', arrange: 'row' },
      { label: 'El logo toca el marge esquerre', selector: '.logo', offset: { left: 24 } },
      { label: 'El botó toca el marge dret', selector: '.boto', offset: { right: 24 } },
      { label: 'Tots tres estan centrats verticalment', selector: '.capcalera > *', all: true, centered: 'y' },
      { label: 'Els enllaços del menú estan en fila', selector: '.menu a', arrange: 'row' },
      { label: 'Hi ha 20 píxels entre els enllaços del menú', selector: '.menu a', gap: 20 },
    ],
  },

  summary: [
    "`display: flex` s'escriu al **pare**: el converteix en un contenidor flex que col·loca els seus fills directes.",
    "Els fills es posen en fila, ocupen només el que necessiten i s'estiren fins a l'alçada del més alt.",
    "`flex-direction` tria l'eix principal: `row` (fila) o `column` (columna).",
    "`justify-content` reparteix els fills al llarg de l'eix principal. `space-between` posa una cosa a cada punta.",
    "`align-items` els alinea a l'eix transversal. `center` els centra; `stretch`, el valor per defecte, els estira.",
    "`gap` separa els fills entre ells sense afegir espai a les vores.",
    "Flex només mana sobre els **fills directes**. Cada quadrat del dibuix que té fills en fila necessita el seu `display: flex`.",
  ],

  quiz: [
    {
      question: 'Vols que el logo i el menú d\'una capçalera quedin de costat. A quin element has d\'escriure `display: flex`?',
      options: [
        { text: 'A la capçalera, que és el pare de tots dos', correct: true },
        { text: 'Al logo', why: '`display: flex` col·loca els fills de l\'element on s\'escriu, i el logo no és el pare del menú.' },
        { text: 'Al menú', why: 'Això posaria en fila els enllaços de dins del menú, però el menú continuaria sota el logo.' },
        { text: 'Al logo i al menú', why: 'Cap dels dos és el pare de l\'altre. Cal anar al quadrat que els conté.' },
      ],
      explanation: 'Flex s\'escriu al pare. Per col·locar dos elements l\'un respecte de l\'altre, cal anar a l\'element que els conté a tots dos.',
    },
    {
      question: 'Un contenidor té `display: flex` i res més. Com queden els seus tres fills?',
      options: [
        { text: 'En fila, enganxats al principi i amb la mateixa alçada', correct: true },
        { text: 'En columna, ocupant tota l\'amplada', why: 'Això és el que fan els blocs sense flex. La direcció per defecte de flex és `row`.' },
        { text: 'En fila, repartits per tota l\'amplada', why: 'El valor per defecte de `justify-content` és `flex-start`: queden junts al principi.' },
        { text: 'En fila i centrats', why: 'Per centrar-los cal `justify-content: center`. Per defecte comencen per l\'esquerra.' },
      ],
      explanation: 'Per defecte: `flex-direction: row`, `justify-content: flex-start` i `align-items: stretch`. Fila, al principi, i estirats fins a l\'alçada del més alt.',
    },
    {
      question: 'Una barra té dos fills: un títol i un botó. Quina regla posa el títol a l\'esquerra i el botó a la dreta de tot?',
      options: [
        { text: '`justify-content: space-between`', correct: true },
        { text: '`justify-content: center`', why: 'Deixaria els dos fills junts al mig de la barra.' },
        { text: '`align-items: flex-end`', why: '`align-items` treballa a l\'altre eix: en una fila, mouria els fills cap avall.' },
        { text: '`gap: 100%`', why: '`gap` posa una separació fixa; no envia cada fill a una punta.' },
      ],
      explanation: '`space-between` posa tot l\'espai que sobra entre els fills: el primer toca una vora i l\'últim, l\'altra.',
    },
    {
      question: 'Un contenidor té `display: flex` i `flex-direction: column`. Quina propietat centra els fills d\'esquerra a dreta?',
      options: [
        { text: '`align-items: center`', correct: true },
        { text: '`justify-content: center`', why: 'En una columna, l\'eix principal és el vertical: `justify-content` centraria de dalt a baix.' },
        { text: '`flex-direction: center`', why: '`flex-direction` només tria la direcció (`row` o `column`); no alinea res.' },
        { text: '`gap: center`', why: '`gap` és una distància, no una alineació.' },
      ],
      explanation: 'En una columna, l\'eix principal és vertical i el transversal, horitzontal. `align-items` treballa sempre sobre l\'eix transversal.',
    },
    {
      question: 'Has posat `display: flex` a la capçalera. El logo i el `<nav>` queden de costat, però els enllaços de dins del `<nav>` continuen apilats. Per què?',
      options: [
        { text: 'Perquè flex només col·loca els fills directes, i els enllaços són fills del `<nav>`', correct: true },
        { text: 'Perquè els enllaços no poden ser elements flex', why: 'Qualsevol element pot ser fill d\'un contenidor flex.' },
        { text: 'Perquè falta `flex-direction: row`', why: '`row` ja és el valor per defecte, i en tot cas només afectaria els fills de la capçalera.' },
        { text: 'Perquè cal posar `gap` perquè es vegin separats', why: '`gap` separa fills que ja estan en fila; no els hi posa.' },
      ],
      explanation: 'Cada contenidor flex mana només sobre els seus fills. Per posar en fila els enllaços, el `<nav>` ha de tenir el seu propi `display: flex`.',
    },
    {
      question: 'Per què és millor `gap` que posar `margin-right` a cada fill?',
      options: [
        { text: 'Perquè `gap` només posa espai entre els fills, i no en sobra després de l\'últim', correct: true },
        { text: 'Perquè `margin` no funciona dins d\'un contenidor flex', why: 'Els marges funcionen igual. El problema és que l\'últim fill també en té.' },
        { text: 'Perquè `gap` centra els fills automàticament', why: '`gap` no alinea res: només separa.' },
        { text: 'Perquè `gap` s\'escriu als fills i és més fàcil de trobar', why: 'És a l\'inrevés: `gap` s\'escriu al pare.' },
      ],
      explanation: '`gap` és la separació entre germans, i la decideix el pare. No afegeix espai ni abans del primer fill ni després de l\'últim.',
    },
  ],
};
