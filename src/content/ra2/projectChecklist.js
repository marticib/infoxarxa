// Funcionalitats del projecte final (la pàgina tipus YouTube, amb JavaScript).
// L'alumne les va marcant a la unitat 11; quan totes les obligatòries estan
// marcades, el projecte consta com a completat.

export const projectChecklist = [
  {
    id: 'inici',
    title: 'Pàgina inicial',
    required: true,
    items: [
      { id: 'menu', text: 'El botó del menú obre i tanca el menú lateral.' },
      { id: 'graella', text: 'La graella de vídeos es pinta a partir de l\'array de dades.js.' },
      { id: 'cerca', text: 'El cercador mostra només els vídeos que contenen el text escrit.' },
      { id: 'majuscules', text: 'La cerca troba el mateix amb majúscules que amb minúscules.' },
      { id: 'categories', text: 'Els xips filtren per categoria i el xip actiu queda marcat.' },
      { id: 'sense-resultats', text: 'Quan no hi ha cap vídeo per mostrar, apareix un missatge.' },
    ],
  },
  {
    id: 'video',
    title: 'Pàgina del vídeo',
    required: true,
    items: [
      { id: 'agrada', text: 'Puc fer «m\'agrada» i desfer-lo, i el comptador puja i baixa.' },
      { id: 'no-agrada', text: '«M\'agrada» i «No m\'agrada» no poden estar actius alhora.' },
      { id: 'subscripcio', text: 'El botó de subscripció canvia de text i el comptador s\'actualitza.' },
      { id: 'descripcio', text: 'Puc desplegar i replegar la descripció.' },
      { id: 'comentar', text: 'Puc afegir un comentari i apareix a dalt de la llista.' },
      { id: 'validar', text: 'Un comentari buit no s\'afegeix i el botó «Comenta» està desactivat.' },
      { id: 'recomptar', text: 'El títol diu quants comentaris hi ha.' },
      { id: 'recomanats', text: 'La llista de recomanats surt de dades.js, sense el vídeo actual.' },
    ],
  },
  {
    id: 'ampliacions',
    title: 'Ampliacions',
    required: false,
    items: [
      { id: 'treure-filtres', text: 'Hi ha un botó per treure els filtres quan no hi ha resultats.' },
      { id: 'tema', text: 'Hi ha mode clar i mode fosc.' },
      { id: 'eliminar-comentari', text: 'Puc eliminar els meus comentaris.' },
      { id: 'enllac', text: 'En clicar un vídeo de la pàgina inicial s\'obre aquell vídeo.' },
      { id: 'desar', text: 'Els comentaris i les valoracions es guarden a localStorage.' },
      { id: 'recuperar', text: 'En recarregar la pàgina, tot continua com ho havia deixat.' },
    ],
  },
];

/** Totes les funcionalitats obligatòries, en una sola llista. */
export const requiredItems = projectChecklist.filter((group) => group.required).flatMap((group) => group.items);
