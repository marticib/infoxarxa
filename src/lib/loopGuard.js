// Protecció contra bucles infinits.
//
// Abans d'executar el codi de l'alumne hi afegim una crida a `__ra2g()` dins
// de la condició de cada `while` i de cada `for`. Aquesta funció (definida al
// runtime de l'iframe) atura l'execució si un bucle fa massa estona que gira.
//
//   while (x > 0) { ... }          ->  while (__ra2g() && (x > 0)) { ... }
//   for (let i = 0; i < 9; i++)    ->  for (let i = 0; __ra2g() && (i < 9); i++)
//   for (const t of tasques) {     ->  for (const t of tasques) { __ra2g();
//
// La transformació no afegeix ni treu cap salt de línia, de manera que els
// números de línia dels errors continuen coincidint amb el codi original.
// No és un analitzador complet de JavaScript: si el resultat no fos vàlid,
// el runtime ho detecta i executa el codi original sense protecció.

export const GUARD_CALL = '__ra2g()';

const isIdentStart = (char) => /[A-Za-z_$]/.test(char);
const isIdentPart = (char) => /[\w$]/.test(char);
const isSpace = (char) => char === ' ' || char === '\n' || char === '\t' || char === '\r';

// Si a la posició `i` comença un string, una plantilla o un comentari,
// retorna la posició on acaba. Si no, retorna -1.
function skipLiteral(src, i) {
  const char = src[i];

  if (char === '"' || char === "'") {
    let j = i + 1;
    while (j < src.length && src[j] !== char && src[j] !== '\n') {
      if (src[j] === '\\') j++;
      j++;
    }
    return Math.min(j + 1, src.length);
  }

  if (char === '`') {
    let j = i + 1;
    while (j < src.length && src[j] !== '`') {
      if (src[j] === '\\') {
        j += 2;
      } else if (src[j] === '$' && src[j + 1] === '{') {
        const end = findClose(src, j + 1);
        if (end === -1) return src.length;
        j = end + 1;
      } else {
        j++;
      }
    }
    return Math.min(j + 1, src.length);
  }

  if (char === '/' && src[i + 1] === '/') {
    const end = src.indexOf('\n', i);
    return end === -1 ? src.length : end;
  }

  if (char === '/' && src[i + 1] === '*') {
    const end = src.indexOf('*/', i + 2);
    return end === -1 ? src.length : end + 2;
  }

  return -1;
}

// `src[i]` és un parèntesi, claudàtor o clau d'obertura.
// Retorna la posició del tancament corresponent, o -1 si no n'hi ha.
function findClose(src, i) {
  let depth = 0;
  let j = i;
  while (j < src.length) {
    const literalEnd = skipLiteral(src, j);
    if (literalEnd !== -1) {
      j = literalEnd;
      continue;
    }
    const char = src[j];
    if (char === '(' || char === '[' || char === '{') {
      depth++;
    } else if (char === ')' || char === ']' || char === '}') {
      depth--;
      if (depth === 0) return j;
    }
    j++;
  }
  return -1;
}

// Separa la capçalera d'un `for` pels punts i coma de primer nivell.
function splitHeader(header) {
  const parts = [];
  let depth = 0;
  let start = 0;
  let j = 0;
  while (j < header.length) {
    const literalEnd = skipLiteral(header, j);
    if (literalEnd !== -1) {
      j = literalEnd;
      continue;
    }
    const char = header[j];
    if (char === '(' || char === '[' || char === '{') depth++;
    else if (char === ')' || char === ']' || char === '}') depth--;
    else if (char === ';' && depth === 0) {
      parts.push(header.slice(start, j));
      start = j + 1;
    }
    j++;
  }
  parts.push(header.slice(start));
  return parts;
}

export function addLoopGuards(src) {
  let out = '';
  let i = 0;

  while (i < src.length) {
    const literalEnd = skipLiteral(src, i);
    if (literalEnd !== -1) {
      out += src.slice(i, literalEnd);
      i = literalEnd;
      continue;
    }

    const char = src[i];
    if (!isIdentStart(char)) {
      out += char;
      i++;
      continue;
    }

    let wordEnd = i + 1;
    while (wordEnd < src.length && isIdentPart(src[wordEnd])) wordEnd++;
    const word = src.slice(i, wordEnd);
    const isLoopKeyword = (word === 'while' || word === 'for') && src[i - 1] !== '.';

    if (isLoopKeyword) {
      let open = wordEnd;
      while (open < src.length && isSpace(src[open])) open++;
      const close = src[open] === '(' ? findClose(src, open) : -1;

      if (close !== -1) {
        const header = src.slice(open + 1, close);
        const prefix = src.slice(i, open + 1);

        if (word === 'while') {
          out += `${prefix}${GUARD_CALL} && (${addLoopGuards(header)}))`;
          i = close + 1;
          continue;
        }

        const parts = splitHeader(header);
        if (parts.length === 3) {
          const condition = parts[1];
          const guarded = condition.trim() === '' ? ` ${GUARD_CALL}` : ` ${GUARD_CALL} && (${condition})`;
          out += `${prefix}${parts[0]};${guarded};${parts[2]})`;
          i = close + 1;
          continue;
        }

        // for...of / for...in: posem la guarda a l'inici del cos, si té claus.
        let body = close + 1;
        while (body < src.length && isSpace(src[body])) body++;
        if (src[body] === '{') {
          out += `${src.slice(i, body + 1)} ${GUARD_CALL};`;
          i = body + 1;
          continue;
        }
      }
    }

    out += word;
    i = wordEnd;
  }

  return out;
}
