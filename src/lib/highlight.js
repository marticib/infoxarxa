// Ressaltat de sintaxi molt lleuger per a JavaScript, HTML i CSS.
// Retorna una llista de { type, text }. No pretén ser un analitzador complet:
// n'hi ha prou perquè el codi dels apunts es llegeixi bé.

const KEYWORDS = new Set([
  'const', 'let', 'var', 'if', 'else', 'for', 'while', 'do', 'function', 'return',
  'new', 'typeof', 'of', 'in', 'break', 'continue', 'switch', 'case', 'default',
  'class', 'extends', 'try', 'catch', 'finally', 'throw', 'async', 'await',
  'import', 'export', 'from', 'delete', 'instanceof', 'this', 'debugger',
]);

const LITERALS = new Set(['true', 'false', 'null', 'undefined', 'NaN', 'Infinity']);

const IDENT_START = /[A-Za-z_$À-ɏ]/;
const IDENT_PART = /[\w$À-ɏ]/;
const NUMBER = /[0-9][0-9_]*(?:\.[0-9]+)?(?:[eE][+-]?[0-9]+)?/y;

function pushToken(tokens, type, text) {
  if (text === '') return;
  const last = tokens[tokens.length - 1];
  if (last && last.type === type && type === 'plain') {
    last.text += text;
  } else {
    tokens.push({ type, text });
  }
}

function readTemplate(src, start, tokens) {
  let j = start + 1;
  let chunkStart = start;

  while (j < src.length) {
    if (src[j] === '\\') {
      j += 2;
      continue;
    }
    if (src[j] === '`') {
      j++;
      break;
    }
    if (src[j] === '$' && src[j + 1] === '{') {
      pushToken(tokens, 'string', src.slice(chunkStart, j));
      let depth = 1;
      let k = j + 2;
      while (k < src.length) {
        if (src[k] === '{') depth++;
        else if (src[k] === '}') depth--;
        if (depth === 0) break;
        k++;
      }
      tokens.push({ type: 'interp', text: '${' });
      tokens.push(...tokenizeJs(src.slice(j + 2, k)));
      if (k < src.length) {
        tokens.push({ type: 'interp', text: '}' });
        k++;
      }
      j = k;
      chunkStart = k;
      continue;
    }
    j++;
  }

  const end = Math.min(j, src.length);
  pushToken(tokens, 'string', src.slice(chunkStart, end));
  return end;
}

export function tokenizeJs(src) {
  const tokens = [];
  let i = 0;
  let previous = ''; // últim caràcter significatiu, per detectar `objecte.propietat`

  while (i < src.length) {
    const char = src[i];
    const next = src[i + 1];

    if (char === '/' && next === '/') {
      let end = src.indexOf('\n', i);
      if (end === -1) end = src.length;
      pushToken(tokens, 'comment', src.slice(i, end));
      i = end;
      continue;
    }

    if (char === '/' && next === '*') {
      let end = src.indexOf('*/', i + 2);
      end = end === -1 ? src.length : end + 2;
      pushToken(tokens, 'comment', src.slice(i, end));
      i = end;
      continue;
    }

    if (char === '"' || char === "'") {
      let j = i + 1;
      while (j < src.length && src[j] !== char && src[j] !== '\n') {
        if (src[j] === '\\') j++;
        j++;
      }
      if (src[j] === char) j++;
      j = Math.min(j, src.length);
      pushToken(tokens, 'string', src.slice(i, j));
      i = j;
      previous = '"';
      continue;
    }

    if (char === '`') {
      i = readTemplate(src, i, tokens);
      previous = '`';
      continue;
    }

    if (char >= '0' && char <= '9') {
      NUMBER.lastIndex = i;
      const match = NUMBER.exec(src);
      pushToken(tokens, 'number', match[0]);
      i += match[0].length;
      previous = '0';
      continue;
    }

    if (IDENT_START.test(char)) {
      let j = i + 1;
      while (j < src.length && IDENT_PART.test(src[j])) j++;
      const word = src.slice(i, j);
      let k = j;
      while (src[k] === ' ') k++;
      const isCall = src[k] === '(';

      let type = 'plain';
      if (previous === '.') type = isCall ? 'func' : 'prop';
      else if (KEYWORDS.has(word)) type = 'keyword';
      else if (LITERALS.has(word)) type = 'literal';
      else if (isCall) type = 'func';

      pushToken(tokens, type, word);
      i = j;
      previous = 'a';
      continue;
    }

    if (/\s/.test(char)) {
      let j = i + 1;
      while (j < src.length && /\s/.test(src[j])) j++;
      pushToken(tokens, 'plain', src.slice(i, j));
      i = j;
      continue;
    }

    pushToken(tokens, /[{}()[\];,.]/.test(char) ? 'punct' : 'operator', char);
    previous = char;
    i++;
  }

  return tokens;
}

export function tokenizeCss(src) {
  const tokens = [];
  const pattern = /\/\*[\s\S]*?\*\/|"[^"]*"|'[^']*'|[{}:;]|[^{}:;"'/]+|\//g;
  let depth = 0;
  let inValue = false;

  for (const match of src.matchAll(pattern)) {
    const text = match[0];
    if (text.startsWith('/*')) {
      tokens.push({ type: 'comment', text });
    } else if (text === '{') {
      depth++;
      inValue = false;
      tokens.push({ type: 'punct', text });
    } else if (text === '}') {
      depth = Math.max(0, depth - 1);
      inValue = false;
      tokens.push({ type: 'punct', text });
    } else if (text === ':') {
      if (depth > 0) inValue = true;
      tokens.push({ type: depth > 0 ? 'punct' : 'tag', text });
    } else if (text === ';') {
      inValue = false;
      tokens.push({ type: 'punct', text });
    } else if (text[0] === '"' || text[0] === "'") {
      tokens.push({ type: 'string', text });
    } else if (depth === 0) {
      tokens.push({ type: 'tag', text });
    } else {
      tokens.push({ type: inValue ? 'literal' : 'prop', text });
    }
  }

  return tokens;
}

export function tokenizeHtml(src) {
  const tokens = [];
  const lower = src.toLowerCase();
  const TAG_OPEN = /<\/?[A-Za-z!][\w-]*/y;
  const ATTR_SPACE = /\s+/y;
  const ATTR_STRING = /"[^"]*"?|'[^']*'?/y;
  const ATTR_NAME = /[^\s=>"'/]+/y;
  let i = 0;

  const matchAt = (regex, index) => {
    regex.lastIndex = index;
    return regex.exec(src);
  };

  while (i < src.length) {
    if (src.startsWith('<!--', i)) {
      let end = src.indexOf('-->', i + 4);
      end = end === -1 ? src.length : end + 3;
      tokens.push({ type: 'comment', text: src.slice(i, end) });
      i = end;
      continue;
    }

    const tag = src[i] === '<' ? matchAt(TAG_OPEN, i) : null;
    if (tag) {
      tokens.push({ type: 'tag', text: tag[0] });
      i += tag[0].length;
      const isClosing = tag[0].startsWith('</');
      const tagName = tag[0].replace(/^<\/?/, '').toLowerCase();

      while (i < src.length && src[i] !== '>') {
        let part = matchAt(ATTR_SPACE, i);
        let type = 'plain';
        if (!part) {
          part = matchAt(ATTR_STRING, i);
          type = 'string';
        }
        if (!part) {
          part = matchAt(ATTR_NAME, i);
          type = 'attr';
        }
        if (!part) {
          part = [src[i]];
          type = 'punct';
        }
        pushToken(tokens, type, part[0]);
        i += part[0].length;
      }

      if (src[i] === '>') {
        tokens.push({ type: 'tag', text: '>' });
        i++;
      }

      if (!isClosing && (tagName === 'script' || tagName === 'style')) {
        const closeIndex = lower.indexOf(`</${tagName}`, i);
        const end = closeIndex === -1 ? src.length : closeIndex;
        const inner = src.slice(i, end);
        tokens.push(...(tagName === 'script' ? tokenizeJs(inner) : tokenizeCss(inner)));
        i = end;
      }
      continue;
    }

    let end = src.indexOf('<', i + 1);
    if (end === -1) end = src.length;
    pushToken(tokens, 'plain', src.slice(i, end));
    i = end;
  }

  return tokens;
}

export function tokenize(code, lang) {
  if (lang === 'html') return tokenizeHtml(code);
  if (lang === 'css') return tokenizeCss(code);
  if (lang === 'js') return tokenizeJs(code);
  return [{ type: 'plain', text: code }];
}

export const LANGUAGE_LABELS = {
  js: 'JavaScript',
  html: 'HTML',
  css: 'CSS',
  text: 'Text',
  console: 'Consola',
};
