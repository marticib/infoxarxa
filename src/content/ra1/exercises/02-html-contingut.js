// Exercicis extra del tema 2: contingut (text, enllaços, imatges i llistes).
// Només fan servir el que s'ha explicat fins a la unitat 2: encara no hi ha CSS.

export default [
  {
    id: 'destaca-l-avis',
    level: 1,
    title: 'Un avís que es faci notar',
    statement: 'Marca «Atenció:» com a text important. Al segon paràgraf, marca «molta més» amb èmfasi: és el que diries amb un altre to de veu.',
    expected: 'Dos paràgrafs. «Atenció:» surt en negreta i «molta més», en cursiva.',
    html: `<p>Atenció: el refugi està tancat fins al juny.</p>
<p>La ruta es pot fer igualment, però cal portar molta més aigua de l'habitual.</p>`,
    hint: 'La importància es marca amb `<strong>` i l\'èmfasi, amb `<em>`. Totes dues van dins del paràgraf, al voltant de les paraules que es destaquen.',
    solution: {
      html: `<p><strong>Atenció:</strong> el refugi està tancat fins al juny.</p>
<p>La ruta es pot fer igualment, però cal portar <em>molta més</em> aigua de l'habitual.</p>`,
    },
    explanation: "Les dues etiquetes envolten només les paraules que es volen destacar. Els paràgrafs no es parteixen: `<strong>` i `<em>` viuen dins de la línia.",
    checks: [
      { label: '«Atenció:» està marcada com a important', selector: 'p strong', text: 'Atenció' },
      { label: '«molta més» està marcada amb èmfasi', selector: 'p em', text: 'molta més' },
      { label: 'Continua havent-hi dos paràgrafs', selector: 'p', count: 2 },
    ],
  },
  {
    id: 'menu-de-la-web',
    level: 1,
    title: 'El menú de la web',
    statement: 'Aquestes tres paraules han de ser el menú de la web de rutes. Converteix el paràgraf en una llista sense ordre de tres elements, cadascun amb un enllaç: «Rutes» porta a `index.html`, «Mapa» a `mapa.html` i «Consells» a `consells.html`.',
    expected: 'Una llista de tres punts. A cada punt, una paraula que és un enllaç.',
    html: `<p>Rutes Mapa Consells</p>`,
    hint: 'Cada element de la llista té aquesta forma: `<li><a href="…">text</a></li>`. Tots tres van dins d\'un `<ul>`.',
    solution: {
      html: `<ul>
  <li><a href="index.html">Rutes</a></li>
  <li><a href="mapa.html">Mapa</a></li>
  <li><a href="consells.html">Consells</a></li>
</ul>`,
    },
    explanation: "Un menú és una llista d'enllaços: diverses coses de la mateixa mena, l'una rere l'altra. Ara es veu amb punts i cap avall; posar-lo en fila serà feina del CSS.",
    checks: [
      { label: 'Hi ha una llista sense ordre amb tres elements', selector: 'ul > li', count: 3 },
      { label: 'Cada element conté un enllaç', selector: 'ul > li > a', count: 3 },
      { label: '«Rutes» porta a `index.html`', selector: 'a[href="index.html"]', text: 'Rutes' },
      { label: '«Mapa» porta a `mapa.html`', selector: 'a[href="mapa.html"]', text: 'Mapa' },
      { label: '«Consells» porta a `consells.html`', selector: 'a[href="consells.html"]', text: 'Consells' },
    ],
  },
  {
    id: 'miniatura-clicable',
    level: 2,
    title: 'Una foto que es pot clicar',
    statement: [
      'A les llistes de rutes, tant la foto com el nom han de portar a la pàgina de la ruta.',
      'Fes que la foto sigui un enllaç a `ruta.html`. Com que serà l\'únic contingut de l\'enllaç, posa-li un `alt` que digui on porta: el nom de la ruta. Després, fes que el text «Puigmal» també enllaci a `ruta.html`: l\'enllaç ha d\'anar dins de l\'`<h2>`.',
    ],
    expected: 'El títol «Puigmal», ara com a enllaç, la foto i les dades. En clicar la foto o el títol apareix l\'avís de l\'enllaç.',
    html: `<h2>Puigmal</h2>
<img src="imatges/ruta-5.jpg" alt="" width="280">
<p>14 km · 6 h · Difícil</p>`,
    hint: [
      'Per convertir una imatge en enllaç, posa-la dins d\'un `<a>`: l\'etiqueta d\'obertura abans de l\'`<img>` i la de tancament després.',
      'Al títol és a l\'inrevés: l\'`<a>` va dins de l\'`<h2>`, al voltant del text.',
    ],
    solution: {
      html: `<h2><a href="ruta.html">Puigmal</a></h2>
<a href="ruta.html">
  <img src="imatges/ruta-5.jpg" alt="Puigmal" width="280">
</a>
<p>14 km · 6 h · Difícil</p>`,
    },
    explanation: "Un enllaç pot contenir una imatge, i un encapçalament pot contenir un enllaç. Quan l'enllaç només té una imatge a dins, l'`alt` fa de text de l'enllaç: un `alt` buit el deixaria sense nom.",
    checks: [
      { label: 'La foto és dins d\'un enllaç a `ruta.html`', selector: 'a[href="ruta.html"] img' },
      { label: 'La foto té un `alt` que diu on porta', selector: 'a img', attr: { alt: true } },
      { label: 'El títol «Puigmal» enllaça a `ruta.html`', selector: 'h2 a', attr: { href: 'ruta.html' }, text: 'Puigmal' },
      { label: 'La foto es continua veient', selector: 'img', count: 1, size: { width: 280, minHeight: 100 } },
    ],
  },
  {
    id: 'proposa-una-ruta',
    level: 2,
    title: 'Un formulari per proposar rutes',
    statement: [
      'Aquest formulari té dos camps i dos textos solts, sense cap relació entre ells. Completa\'l:',
      'Converteix cada text en una `<label>` connectada al seu camp. El primer camp ha de tenir l\'`id` `ruta` i ser de tipus `text`; el segon, l\'`id` `correu` i ser de tipus `email`. Posa a cada camp un `placeholder` amb un exemple. I afegeix, al final del formulari, un botó amb el text «Envia».',
    ],
    expected: 'El subtítol i, a sota, dues etiquetes amb el seu camp i un botó «Envia». En clicar una etiqueta, el cursor va al seu camp.',
    html: `<h2>Proposa una ruta</h2>
<form>
  Nom de la ruta
  <input>

  El teu correu
  <input>
</form>`,
    hint: [
      'Cada parella és una `<label for="…">` i un `<input id="…">` amb el mateix valor a `for` i a `id`.',
      'Un `<input>` pot portar diversos atributs, separats per espais: `type`, `id` i `placeholder`.',
    ],
    solution: {
      html: `<h2>Proposa una ruta</h2>
<form>
  <label for="ruta">Nom de la ruta</label>
  <input type="text" id="ruta" placeholder="Per exemple, Puigmal">

  <label for="correu">El teu correu</label>
  <input type="email" id="correu" placeholder="nom@exemple.cat">

  <button type="submit">Envia</button>
</form>`,
    },
    explanation: "Cada etiqueta apunta al seu camp amb `for`, i cada camp té un `id` diferent: en una pàgina no n'hi pot haver dos d'iguals. El `type` diu quina mena de dada s'espera; en un mòbil, per exemple, un camp de tipus `email` fa aparèixer un teclat amb l'arrova.",
    checks: [
      { label: 'La primera etiqueta està connectada al camp `ruta`', selector: 'label[for="ruta"]', text: 'Nom de la ruta' },
      { label: 'La segona està connectada al camp `correu`', selector: 'label[for="correu"]', text: 'correu' },
      { label: 'El camp `ruta` és de tipus `text` i té un exemple', selector: 'input#ruta', attr: { type: 'text', placeholder: true } },
      { label: 'El camp `correu` és de tipus `email` i té un exemple', selector: 'input#correu', attr: { type: 'email', placeholder: true } },
      { label: 'Hi ha un botó «Envia» dins del formulari', selector: 'form button', text: 'Envia' },
    ],
  },
  {
    id: 'portada-de-camins',
    level: 3,
    title: 'La portada, des de zero',
    statement: [
      'Escriu el contingut de la portada de la web de rutes. No hi ha res fet: només tens aquesta descripció, de dalt a baix.',
      'Primer, el logo: la imatge `imatges/logo.png`, de 48 píxels d\'ample i amb l\'`alt` «Camins», dins d\'un enllaç a `index.html`. Després, el títol de la pàgina: «Rutes de muntanya». A sota, el menú: una llista sense ordre amb tres enllaços, «Rutes» (`index.html`), «Mapa» (`mapa.html`) i «Consells» (`consells.html`).',
      'A continuació, un cercador: un formulari amb una etiqueta «Cerca una ruta», un camp de tipus `search` amb l\'`id` `cerca` i un botó «Cerca». I per acabar, un apartat «Rutes destacades» amb una altra llista sense ordre de tres rutes. Cada element té el nom de la ruta, que enllaça a `ruta.html`, i la seva dificultat marcada com a important: Camí de Ronda (Fàcil), Vall de Núria (Mitjana) i Pica d\'Estats (Difícil).',
    ],
    expected: 'El logo, el títol, un menú de tres enllaços, el cercador i, sota el subtítol «Rutes destacades», tres rutes amb la dificultat en negreta.',
    html: `<!-- Escriu aquí el contingut de la portada -->`,
    fileNames: { html: 'index.html' },
    hint: [
      'Ves per parts, en l\'ordre de la descripció, i mira el resultat després de cada una: logo, títol, menú, cercador i rutes.',
      'Hi ha dues llistes sense ordre: el menú i les rutes. A les rutes, cada `<li>` conté un `<a>` i un `<strong>`.',
    ],
    solution: {
      html: `<a href="index.html"><img src="imatges/logo.png" alt="Camins" width="48"></a>
<h1>Rutes de muntanya</h1>

<ul>
  <li><a href="index.html">Rutes</a></li>
  <li><a href="mapa.html">Mapa</a></li>
  <li><a href="consells.html">Consells</a></li>
</ul>

<form>
  <label for="cerca">Cerca una ruta</label>
  <input type="search" id="cerca" placeholder="Nom de la ruta">
  <button type="submit">Cerca</button>
</form>

<h2>Rutes destacades</h2>
<ul>
  <li><a href="ruta.html">Camí de Ronda</a> · <strong>Fàcil</strong></li>
  <li><a href="ruta.html">Vall de Núria</a> · <strong>Mitjana</strong></li>
  <li><a href="ruta.html">Pica d'Estats</a> · <strong>Difícil</strong></li>
</ul>`,
    },
    explanation: [
      "Hi ha totes les peces de la unitat: una imatge dins d'un enllaç, encapçalaments de dos nivells, dues llistes d'enllaços, un formulari i text destacat. Cap és nova; la feina ha estat triar, per a cada tros de la descripció, l'etiqueta que diu què és.",
      "Aquesta mateixa estructura (logo, menú, cercador i una llista de coses per clicar) és la de moltíssimes pàgines. Al projecte final la tornaràs a escriure, amb vídeos en lloc de rutes.",
    ],
    checks: [
      { label: "El logo és dins d'un enllaç a `index.html`, i el seu `alt` és «Camins»", selector: 'a[href="index.html"] > img', attr: { alt: 'Camins' } },
      { label: "El logo fa 48 píxels d'ample", selector: 'a > img', size: { width: 48, minHeight: 20 } },
      { label: 'El títol de la pàgina és «Rutes de muntanya»', selector: 'h1', count: 1, text: 'Rutes de muntanya' },
      { label: 'Hi ha dues llistes sense ordre: el menú i les rutes', selector: 'ul', count: 2 },
      {
        label: 'El menú enllaça a `index.html`, `mapa.html` i `consells.html`',
        selector: 'ul li a[href="index.html"], ul li a[href="mapa.html"], ul li a[href="consells.html"]',
        count: 3,
      },
      { label: 'El cercador té una etiqueta connectada al camp `cerca`', selector: 'form label[for="cerca"]', text: 'Cerca una ruta' },
      { label: 'El camp del cercador és de tipus `search`', selector: 'form input#cerca', attr: { type: 'search' } },
      { label: 'El cercador té un botó «Cerca»', selector: 'form button', text: 'Cerca' },
      { label: "Hi ha l'apartat «Rutes destacades»", selector: 'h2', text: 'Rutes destacades' },
      { label: 'Les tres rutes enllacen a `ruta.html`', selector: 'ul li a[href="ruta.html"]', count: 3 },
      { label: 'Cada ruta té la dificultat marcada com a important', selector: 'li strong', count: 3 },
    ],
  },
];
