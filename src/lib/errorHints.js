// Els navegadors mostren els errors en anglès. Aquí hi afegim una explicació
// en català perquè l'alumnat aprengui a interpretar-los.

export function explainError(name, message = '') {
  const text = message.toLowerCase();

  if (name === 'Bucle infinit') {
    return 'Un bucle no s\'acaba mai quan la seva condició sempre és certa. Revisa si el comptador canvia a cada volta i si ho fa en la direcció correcta.';
  }

  if (name === 'SyntaxError') {
    return 'Error de sintaxi: el codi està mal escrit i el navegador no l\'ha pogut ni començar a executar. Revisa parèntesis, claus, cometes i comes a prop de la línia indicada.';
  }

  if (name === 'ReferenceError') {
    if (text.includes('before initialization')) {
      return 'Estàs fent servir una variable abans de la línia on la declares. Mou la declaració més amunt.';
    }
    return 'Fas servir un nom que no existeix en aquest punt del programa. Comprova que l\'has declarat i que l\'has escrit exactament igual (les majúscules compten).';
  }

  if (name === 'TypeError') {
    if (text.includes('constant')) {
      return 'Has intentat canviar el valor d\'una variable declarada amb const. Si ha de canviar, declara-la amb let.';
    }
    if (text.includes('null')) {
      return 'Estàs fent servir un valor que és null. Sovint passa quan querySelector() no troba l\'element: revisa el selector i que l\'element ja existeixi quan s\'executa el codi.';
    }
    if (text.includes('undefined')) {
      return 'Estàs llegint una propietat d\'un valor undefined. Comprova que la variable té el valor que et penses: potser un índex fora de l\'array o una propietat mal escrita.';
    }
    if (text.includes('not a function')) {
      return 'Estàs cridant com a funció una cosa que no ho és. Revisa el nom del mètode i que no hi hagi cap lletra equivocada.';
    }
    return 'Estàs fent una operació amb un valor que no la permet. Comprova de quin tipus és el valor amb typeof.';
  }

  if (name === 'RangeError') {
    return 'Un valor està fora del rang permès. Si el missatge parla de «call stack», una funció s\'està cridant a si mateixa sense parar.';
  }

  return '';
}
