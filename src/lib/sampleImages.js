// Imatges de mostra per als exemples d'HTML i CSS.
//
// Dins de la previsualització no hi ha cap carpeta de fitxers, però els
// exemples han de poder escriure <img src="imatges/foto.jpg"> com en un
// projecte de veritat. Aquestes imatges es generen aquí mateix (són SVG) i es
// posen al lloc del nom del fitxer just abans de mostrar la pàgina. No es
// descarrega res.

const toDataUri = (width, height, body) =>
  `data:image/svg+xml,${encodeURIComponent(
    `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}">${body}</svg>`
  )}`;

// Paisatge de muntanya: cel, sol i tres serralades.
const landscape = (width, height, [sky, sun, far, mid, near]) =>
  toDataUri(
    width,
    height,
    `<rect width="${width}" height="${height}" fill="${sky}"/>` +
      `<circle cx="${width * 0.76}" cy="${height * 0.26}" r="${height * 0.11}" fill="${sun}"/>` +
      `<path d="M0 ${height * 0.72} L${width * 0.22} ${height * 0.38} L${width * 0.4} ${height * 0.62} L${width * 0.58} ${height * 0.3} L${width * 0.82} ${height * 0.66} L${width} ${height * 0.5} V${height} H0Z" fill="${far}"/>` +
      `<path d="M0 ${height * 0.86} L${width * 0.3} ${height * 0.56} L${width * 0.52} ${height * 0.8} L${width * 0.74} ${height * 0.6} L${width} ${height * 0.82} V${height} H0Z" fill="${mid}"/>` +
      `<path d="M0 ${height * 0.94} Q${width * 0.5} ${height * 0.78} ${width} ${height * 0.92} V${height} H0Z" fill="${near}"/>`
  );

// Miniatura de vídeo: fons de color i el triangle de «reproduir».
const thumbnail = (colour, shade) =>
  toDataUri(
    640,
    360,
    `<rect width="640" height="360" fill="${colour}"/>` +
      `<path d="M0 360 L640 120 V360Z" fill="${shade}"/>` +
      '<circle cx="320" cy="180" r="46" fill="#ffffff" fill-opacity="0.9"/>' +
      `<path d="M306 156 L346 180 L306 204Z" fill="${colour}"/>`
  );

// Avatar: un cap i unes espatlles sobre un fons de color.
const avatar = (colour, shade) =>
  toDataUri(
    96,
    96,
    `<rect width="96" height="96" fill="${colour}"/>` +
      `<circle cx="48" cy="38" r="17" fill="${shade}"/>` +
      `<path d="M14 96 C14 68 30 60 48 60 C66 60 82 68 82 96Z" fill="${shade}"/>`
  );

const LANDSCAPES = [
  ['#bfe3f5', '#fff3b0', '#7d9cc0', '#4f7a5b', '#2f5d43'],
  ['#ffd9a8', '#fff1c9', '#c98a6b', '#8a5a44', '#5b3a2e'],
  ['#d7d3f5', '#fdf0d5', '#8f86c9', '#5b5594', '#3a3668'],
  ['#c9ecd6', '#fff7c2', '#6fae8a', '#3f7f5c', '#27543c'],
  ['#f6cdd8', '#fff2d6', '#c97f98', '#8f4f68', '#5c2f42'],
  ['#cfe0ea', '#f4f6f8', '#8ea3b3', '#5c7281', '#3c4c57'],
];

const THUMBNAILS = [
  ['#c2410c', '#9a3412'],
  ['#a16207', '#854d0e'],
  ['#7e22ce', '#6b21a8'],
  ['#15803d', '#166534'],
  ['#1d4ed8', '#1e40af'],
  ['#b91c1c', '#991b1b'],
  ['#be185d', '#9d174d'],
  ['#0f766e', '#115e59'],
];

const AVATARS = [
  ['#fde68a', '#b45309'],
  ['#bfdbfe', '#1d4ed8'],
  ['#bbf7d0', '#15803d'],
  ['#fbcfe8', '#be185d'],
];

const catalogue = {
  'imatges/foto.jpg': landscape(800, 600, LANDSCAPES[0]),
  'imatges/retrat.jpg': landscape(600, 800, LANDSCAPES[2]),
  'imatges/logo.png': toDataUri(
    120,
    120,
    '<rect width="120" height="120" rx="24" fill="#1f6f54"/>' +
      '<path d="M20 88 L50 40 L66 64 L78 48 L100 88Z" fill="#ffffff"/>'
  ),
};

LANDSCAPES.forEach((palette, index) => {
  catalogue[`imatges/ruta-${index + 1}.jpg`] = landscape(640, 360, palette);
});
THUMBNAILS.forEach(([colour, shade], index) => {
  catalogue[`imatges/miniatura-${index + 1}.jpg`] = thumbnail(colour, shade);
});
AVATARS.forEach(([colour, shade], index) => {
  catalogue[`imatges/avatar-${index + 1}.png`] = avatar(colour, shade);
});

/** Els noms de fitxer que es poden fer servir als exemples. */
export const SAMPLE_IMAGES = Object.keys(catalogue);

// Una adreça que el navegador mai podrà carregar: es veu el text alternatiu.
const BROKEN = 'data:,';

const isExternal = (url) => /^(?:[a-z][a-z0-9+.-]*:|\/\/|#)/i.test(url);

function resolve(url, missing) {
  const name = url.trim().replace(/^\.\//, '');
  if (name === '' || isExternal(name)) return url;
  if (catalogue[name]) return catalogue[name];
  if (!missing.includes(name)) missing.push(name);
  return BROKEN;
}

/**
 * Posa les imatges de mostra al lloc dels noms de fitxer, a l'HTML
 * (<img src="…">) i al CSS (url(…)). Retorna també els fitxers que no s'han
 * trobat, per avisar-ne.
 */
export function withSampleImages(html, css) {
  const missing = [];

  // El nom que ha escrit l'alumne es desa a `data-fitxer`: així una comprovació
  // pot saber quina imatge s'ha demanat encara que el `src` ja sigui una altra cosa.
  const newHtml = html.replace(/<img\b[^>]*>/gi, (tag) =>
    tag.replace(/(\ssrc\s*=\s*)(["'])([^"']*)\2/i, (_, start, quote, url) => {
      const resolved = resolve(url, missing);
      const original = resolved === url ? '' : ` data-fitxer=${quote}${url.trim().replace(/^\.\//, '')}${quote}`;
      return `${start}${quote}${resolved}${quote}${original}`;
    })
  );
  const newCss = css.replace(/url\(\s*(["']?)([^"')]+)\1\s*\)/gi, (_, quote, url) => `url("${resolve(url, missing)}")`);

  return { html: newHtml, css: newCss, missing };
}
