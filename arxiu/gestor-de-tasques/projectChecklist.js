// Funcionalitats del projecte final. L'alumne les va marcant a la unitat 11;
// quan totes les obligatòries estan marcades, el projecte consta com a completat.

export const projectChecklist = {
  required: [
    { id: 'afegir', text: 'Puc afegir una tasca nova.' },
    { id: 'validar', text: 'Si el text és buit, es mostra un error i no s\'afegeix res.' },
    { id: 'mostrar', text: 'Les tasques es mostren a la pàgina.' },
    { id: 'completar', text: 'Puc marcar una tasca com a completada.' },
    { id: 'desmarcar', text: 'Puc desmarcar una tasca completada.' },
    { id: 'eliminar', text: 'Puc eliminar una tasca.' },
    { id: 'filtrar', text: 'Puc filtrar entre totes, pendents i completades.' },
    { id: 'comptador', text: 'Es mostra el nombre de tasques pendents.' },
    { id: 'buit', text: 'Quan no hi ha tasques per mostrar, apareix un estat buit.' },
  ],
  optional: [
    { id: 'editar', text: 'Puc editar el text d\'una tasca.' },
    { id: 'netejar', text: 'Puc eliminar totes les tasques completades de cop.' },
    { id: 'tema', text: 'Hi ha mode clar i mode fosc.' },
    { id: 'desar', text: 'Les tasques es guarden a localStorage.' },
    { id: 'recuperar', text: 'Les tasques es recuperen quan es recarrega la pàgina.' },
  ],
};
