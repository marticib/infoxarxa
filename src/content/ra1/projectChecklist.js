// Parts del projecte final del RA1 (la pàgina tipus YouTube, amb HTML i CSS).
// L'alumne les va marcant a la unitat 11; quan totes les obligatòries estan
// marcades, el projecte consta com a completat.
//
// Els ids porten el prefix «ra1-» perquè no coincideixin amb els del RA2: les
// marques dels dos projectes es desen juntes.

export const projectChecklist = [
  {
    id: 'ra1-inici',
    title: 'Pàgina inicial',
    required: true,
    items: [
      { id: 'ra1-dibuix', text: 'He dibuixat la pàgina en quadrats abans d\'escriure l\'HTML.' },
      { id: 'ra1-esquelet', text: 'L\'HTML té un contenidor per a cada quadrat: capçalera, menú, contingut, graella i targetes.' },
      { id: 'ra1-capcalera', text: 'La capçalera és una fila amb tres grups: logo, cercador i perfil.' },
      { id: 'ra1-capcalera-fixa', text: 'La capçalera es queda a dalt quan baixo per la pàgina.' },
      { id: 'ra1-menu', text: 'El menú lateral es queda a l\'esquerra i no tapa el contingut.' },
      { id: 'ra1-graella', text: 'Els vídeos formen una graella de diverses columnes, amb separació.' },
      { id: 'ra1-durada', text: 'La durada surt a sobre de cada miniatura, a la cantonada de baix a la dreta.' },
      { id: 'ra1-info', text: 'A cada targeta, l\'avatar queda al costat del títol i les dades.' },
    ],
  },
  {
    id: 'ra1-video',
    title: 'Pàgina del vídeo',
    required: true,
    items: [
      { id: 'ra1-columnes', text: 'La pàgina té dues columnes: el vídeo a l\'esquerra i els recomanats a la dreta.' },
      { id: 'ra1-controls', text: 'El reproductor té una barra de controls a sobre de la imatge.' },
      { id: 'ra1-canal', text: 'A la barra del canal, el canal queda a una punta i els botons a l\'altra.' },
      { id: 'ra1-comentaris', text: 'Cada comentari té l\'avatar a l\'esquerra i el text al costat.' },
      { id: 'ra1-recomanats', text: 'Cada vídeo recomanat té la miniatura a l\'esquerra i el text al costat.' },
      { id: 'ra1-enllacos', text: 'Des d\'un vídeo de la pàgina inicial arribo a la pàgina del vídeo, i el logo em torna a l\'inici.' },
    ],
  },
  {
    id: 'ra1-ampliacions',
    title: 'Ampliacions',
    required: false,
    items: [
      { id: 'ra1-quatre', text: 'He provat la graella amb un altre nombre de columnes.' },
      { id: 'ra1-insignia', text: 'Hi ha una insígnia «EN DIRECTE» sobre una miniatura.' },
      { id: 'ra1-peu', text: 'La pàgina té un peu amb enllaços.' },
      { id: 'ra1-flotant', text: 'Hi ha un botó flotant que no es mou quan baixo.' },
      { id: 'ra1-mini', text: 'El menú lateral té una versió estreta, amb la icona sobre el text.' },
    ],
  },
];
