/*
 * Runtime dels exemples executables.
 *
 * Aquest fitxer NO forma part de l'aplicació React: s'importa com a text
 * (`?raw`) i s'injecta dins de l'iframe aïllat (sandbox) on s'executa el codi
 * de l'alumne. Des d'aquí no es pot accedir al document principal; l'única
 * via de comunicació és `postMessage`.
 *
 * Responsabilitats:
 *  - capturar console.log/info/warn/error/table i enviar-los a l'aplicació
 *  - capturar errors de sintaxi i d'execució (amb número de línia)
 *  - aturar bucles infinits
 *  - oferir un localStorage de mentida (el real està bloquejat al sandbox)
 *  - avisar quan un formulari s'envia sense preventDefault()
 *  - explicar on portaria un enllaç, en lloc de sortir de la previsualització
 *
 * I, al dossier d'HTML i CSS (mode «pàgina»):
 *  - dibuixar el contorn de cada caixa («quadrats»)
 *  - avaluar les comprovacions dels exercicis (estils calculats i posicions)
 *  - avisar dels fitxers que no existeixen
 */
function __sandboxRuntime(config) {
  'use strict';

  var MAX_ENTRIES = 300;
  var LOOP_LIMIT_MS = 1000;
  var nativeConsole = window.console;
  var queue = [];
  var flushScheduled = false;
  var entryCount = 0;
  var truncated = false;
  var runningPrelude = false;

  // ---------- Comunicació amb l'aplicació ----------

  function send(message) {
    message.source = 'ra2js-sandbox';
    message.runId = config.runId;
    try {
      window.parent.postMessage(message, '*');
    } catch (error) {
      /* el missatge no es pot clonar: l'ignorem */
    }
  }

  function flush() {
    flushScheduled = false;
    if (queue.length > 0) {
      send({ type: 'entries', entries: queue });
      queue = [];
    }
  }

  function push(entry, always) {
    if (always) {
      queue.push(entry);
      scheduleFlush();
      return;
    }
    if (truncated) return;
    entryCount++;
    if (entryCount > MAX_ENTRIES) {
      truncated = true;
      queue.push({
        level: 'system',
        text: 'Només es mostren els primers ' + MAX_ENTRIES + ' missatges. La resta s\'han omès.',
      });
    } else {
      queue.push(entry);
    }
    scheduleFlush();
  }

  function scheduleFlush() {
    if (!flushScheduled) {
      flushScheduled = true;
      setTimeout(flush, 0);
    }
  }

  // ---------- Conversió de valors a text ----------

  function isPlainKey(key) {
    return /^[A-Za-z_$][\w$]*$/.test(key);
  }

  function describeNode(node) {
    if (node.nodeType === 1) {
      var html = (node.outerHTML || '').replace(/\s+/g, ' ');
      return html.length > 140 ? html.slice(0, 137) + '…' : html;
    }
    if (node.nodeType === 3) return '#text ' + JSON.stringify(node.textContent);
    if (node.nodeType === 9) return '#document';
    return node.nodeName;
  }

  function shortNode(node) {
    if (!node || node.nodeType !== 1) return String(node && node.nodeName);
    var text = node.tagName.toLowerCase();
    if (node.id) text += '#' + node.id;
    if (node.classList && node.classList.length) text += '.' + Array.prototype.join.call(node.classList, '.');
    return text;
  }

  function format(value, nested, seen, depth) {
    if (value === null) return 'null';
    var type = typeof value;
    if (type === 'undefined') return 'undefined';
    if (type === 'string') return nested ? JSON.stringify(value) : value;
    if (type === 'number' || type === 'boolean' || type === 'bigint') return String(value);
    if (type === 'symbol') return value.toString();
    if (type === 'function') return 'ƒ ' + (value.name || '(anònima)') + '()';

    if (seen.indexOf(value) !== -1) return '[referència circular]';

    try {
      if (value instanceof Error) return value.name + ': ' + value.message;
      if (typeof Node !== 'undefined' && value instanceof Node) return describeNode(value);
      if (
        (typeof NodeList !== 'undefined' && value instanceof NodeList) ||
        (typeof HTMLCollection !== 'undefined' && value instanceof HTMLCollection)
      ) {
        var names = Array.prototype.map.call(value, shortNode);
        return 'NodeList(' + value.length + ') [' + names.join(', ') + ']';
      }
      if (typeof DOMTokenList !== 'undefined' && value instanceof DOMTokenList) {
        return 'DOMTokenList [' + Array.prototype.map.call(value, function (item) {
          return JSON.stringify(item);
        }).join(', ') + ']';
      }
      if (typeof Event !== 'undefined' && value instanceof Event) {
        var details = 'type: ' + JSON.stringify(value.type);
        if (value.target && value.target.nodeType === 1) details += ', target: ' + shortNode(value.target);
        if (typeof value.key === 'string') details += ', key: ' + JSON.stringify(value.key);
        return value.constructor.name + ' { ' + details + ' }';
      }
      if (value instanceof Date) return value.toString();
    } catch (error) {
      /* continuem amb el format genèric */
    }

    if (depth >= 4) return Array.isArray(value) ? '[…]' : '{…}';
    var next = seen.concat([value]);

    if (Array.isArray(value)) {
      var items = [];
      for (var i = 0; i < value.length; i++) {
        items.push(i in value ? format(value[i], true, next, depth + 1) : 'buit');
      }
      return '[' + items.join(', ') + ']';
    }

    var keys = Object.keys(value);
    if (keys.length === 0) return '{}';
    return '{ ' + keys.map(function (key) {
      var label = isPlainKey(key) ? key : JSON.stringify(key);
      return label + ': ' + format(value[key], true, next, depth + 1);
    }).join(', ') + ' }';
  }

  function kindOf(value) {
    if (value === null || value === undefined) return 'nullish';
    var type = typeof value;
    if (type === 'string' || type === 'number' || type === 'boolean' || type === 'function') return type;
    return 'object';
  }

  function toParts(args) {
    return Array.prototype.map.call(args, function (arg) {
      return { kind: kindOf(arg), text: format(arg, false, [], 0) };
    });
  }

  // ---------- Consola ----------

  var sandboxConsole = Object.create(nativeConsole);

  ['log', 'info', 'debug', 'warn', 'error'].forEach(function (method) {
    sandboxConsole[method] = function () {
      if (truncated) return;
      push({ level: method === 'debug' ? 'log' : method, parts: toParts(arguments) });
      // També ho enviem a la consola real del navegador (F12).
      try {
        nativeConsole[method].apply(nativeConsole, arguments);
      } catch (error) {
        /* ignorat */
      }
    };
  });

  sandboxConsole.table = function (data) {
    if (data === null || typeof data !== 'object') {
      sandboxConsole.log(data);
      return;
    }
    var rowKeys = Object.keys(data);
    var columns = [];
    var hasValueColumn = false;

    rowKeys.forEach(function (rowKey) {
      var row = data[rowKey];
      if (row !== null && typeof row === 'object') {
        Object.keys(row).forEach(function (column) {
          if (columns.indexOf(column) === -1) columns.push(column);
        });
      } else {
        hasValueColumn = true;
      }
    });

    var rows = rowKeys.slice(0, 50).map(function (rowKey) {
      var row = data[rowKey];
      var isObject = row !== null && typeof row === 'object';
      var cells = [String(rowKey)];
      columns.forEach(function (column) {
        var has = isObject && Object.prototype.hasOwnProperty.call(row, column);
        cells.push(has ? format(row[column], true, [], 1) : '');
      });
      if (hasValueColumn) cells.push(isObject ? '' : format(row, true, [], 1));
      return cells;
    });

    var header = ['(índex)'].concat(columns);
    if (hasValueColumn) header.push('Valor');
    push({ level: 'table', columns: header, rows: rows });
    try {
      nativeConsole.table(data);
    } catch (error) {
      /* ignorat */
    }
  };

  sandboxConsole.clear = function () {
    queue = [];
    entryCount = 0;
    truncated = false;
    send({ type: 'clear' });
  };

  try {
    Object.defineProperty(window, 'console', { value: sandboxConsole, configurable: true, writable: true });
  } catch (error) {
    window.console = sandboxConsole;
  }

  // ---------- Errors ----------

  window.addEventListener('error', function (event) {
    var error = event.error;
    var name = error && error.name ? error.name : '';
    var message = error && typeof error.message === 'string' ? error.message : String(event.message || '');

    if (!name) {
      var match = /^(?:Uncaught\s+)?(\w*Error):\s*([\s\S]*)$/.exec(message);
      if (match) {
        name = match[1];
        message = match[2];
      } else {
        name = 'Error';
      }
    }

    // Chrome hi afegeix un prefix intern perquè el codi s'insereix amb appendChild.
    message = message.replace(/^Failed to execute 'appendChild' on 'Node':\s*/, '');

    var isLoopError = Boolean(error && error.__ra2Loop);
    push(
      {
        level: 'exception',
        name: name,
        message: message,
        line: isLoopError ? null : event.lineno || null,
        file: runningPrelude ? config.preludeName : null,
      },
      true
    );
    flush();
  });

  window.addEventListener('unhandledrejection', function (event) {
    var reason = event.reason;
    push(
      {
        level: 'exception',
        name: reason && reason.name ? reason.name : 'Error',
        message: reason && reason.message ? reason.message : String(reason),
        line: null,
      },
      true
    );
  });

  // ---------- Protecció contra bucles infinits ----------

  var loopStart = 0;
  var loopTicks = 0;

  window.__ra2g = function () {
    if (loopStart === 0) {
      loopStart = Date.now();
      loopTicks = 0;
      // Quan el navegador recupera el control, el comptador es reinicia.
      setTimeout(function () {
        loopStart = 0;
      }, 0);
    }
    loopTicks++;
    if ((loopTicks & 1023) === 0 && Date.now() - loopStart > LOOP_LIMIT_MS) {
      loopStart = 0;
      var error = new Error(
        'El bucle fa massa estona que es repeteix i l\'hem aturat. ' +
          'Comprova que la condició arribi a ser falsa en algun moment.'
      );
      error.name = 'Bucle infinit';
      error.__ra2Loop = true;
      throw error;
    }
    return true;
  };

  // ---------- localStorage simulat ----------
  // Al sandbox, el localStorage real llança un error de seguretat. En oferim
  // un de mentida que l'aplicació conserva entre execucions del mateix exemple.

  var store = {};
  Object.keys(config.storage || {}).forEach(function (key) {
    store[key] = String(config.storage[key]);
  });

  function syncStore() {
    send({ type: 'storage', data: store });
  }

  var fakeStorage = {
    getItem: function (key) {
      key = String(key);
      return Object.prototype.hasOwnProperty.call(store, key) ? store[key] : null;
    },
    setItem: function (key, value) {
      store[String(key)] = String(value);
      syncStore();
    },
    removeItem: function (key) {
      delete store[String(key)];
      syncStore();
    },
    clear: function () {
      store = {};
      syncStore();
    },
    key: function (index) {
      var keys = Object.keys(store);
      return index < keys.length ? keys[index] : null;
    },
  };
  Object.defineProperty(fakeStorage, 'length', {
    get: function () {
      return Object.keys(store).length;
    },
  });

  try {
    Object.defineProperty(window, 'localStorage', { value: fakeStorage, configurable: true });
  } catch (error) {
    /* el navegador no ho permet: els exemples amb localStorage mostraran l'error real */
  }

  // ---------- Diàlegs del navegador ----------
  // alert/confirm/prompt estan bloquejats al sandbox: els mostrem a la consola.

  window.alert = function (message) {
    push({ level: 'alert', parts: [{ kind: 'string', text: format(message, false, [], 0) }] });
  };
  window.confirm = function (message) {
    push({
      level: 'system',
      text: 'confirm("' + format(message, false, [], 0) + '") → aquí sempre respon «D\'acord» (true).',
    });
    return true;
  };
  window.prompt = function (message, defaultValue) {
    push({
      level: 'system',
      text: 'prompt() no està disponible en aquest entorn. Fes servir un <input> per demanar dades.',
    });
    return defaultValue === undefined ? null : String(defaultValue);
  };

  // ---------- Formularis enviats sense preventDefault() ----------

  window.addEventListener('submit', function (event) {
    if (event.defaultPrevented) return;
    event.preventDefault();
    if (config.mode === 'page') {
      push({
        level: 'system',
        text:
          'Formulari: en una pàgina de veritat, ara el navegador enviaria les dades i carregaria una altra pàgina. ' +
          'Aquí no passa res: fer que el formulari faci alguna cosa és feina de JavaScript.',
      });
      return;
    }
    push({
      level: 'system',
      text:
        'El formulari s\'ha enviat i el navegador ha recarregat la pàgina: tot el que havia fet ' +
        'JavaScript s\'ha perdut. Per evitar-ho, crida event.preventDefault() dins del listener de «submit».',
    });
    document.body.innerHTML =
      '<p style="margin:0;padding:12px 14px;border:2px dashed #b9c1d4;border-radius:8px;color:#525c74">' +
      '↻ <strong>Pàgina recarregada.</strong> El formulari s\'ha enviat al servidor i la pàgina ha tornat a començar.</p>';
  });

  // ---------- Enllaços ----------
  // La previsualització només té una pàgina. Si un enllaç porta a una altra
  // (video.html, per exemple), no hi anem: expliquem què passaria.

  window.addEventListener('click', function (event) {
    if (event.defaultPrevented || event.button !== 0) return;
    var link = event.target && event.target.closest ? event.target.closest('a[href]') : null;
    if (!link) return;

    var href = link.getAttribute('href') || '';
    if (href.charAt(0) === '#') {
      // Enllaç intern: només evitem el salt quan no porta enlloc.
      if (href === '#') event.preventDefault();
      return;
    }

    event.preventDefault();
    push({
      level: 'system',
      text:
        'Enllaç: en una pàgina de veritat, el navegador obriria «' + href + '». ' +
        'Aquesta previsualització només té una pàgina.',
    });
  });


  // =====================================================================
  // Mode «pàgina» (dossier d'HTML i CSS): quadrats, comprovacions i avisos
  // =====================================================================

  var isPage = config.mode === 'page';

  // Fitxers que la pàgina demana i no existeixen (imatges, fulls d'estil).
  (config.notes || []).forEach(function (text) {
    push({ level: 'system', text: text }, true);
  });

  // ---------- Elements propis (no són de la pàgina de l'alumne) ----------
  // Es creen amb noms d'etiqueta inventats i tots els estils en línia amb
  // !important, perquè cap regla de l'alumne (div { … }, * { … }) els canviï.

  function important(declarations) {
    return 'all: initial !important; ' + declarations.map(function (item) {
      return item + ' !important';
    }).join('; ');
  }

  function isOwn(element) {
    var name = element.tagName;
    return name === 'RA-QUADRATS' || name === 'RA-QUADRAT' || name === 'RA-NOM' || name === 'RA-SONDA';
  }

  // ---------- Quadrats: el contorn de cada caixa de la pàgina ----------

  var BOX_COLOURS = ['#c2255c', '#1864ab', '#2b8a3e', '#d9480f', '#5f3dc4', '#0b7285'];
  var SKIPPED = { SCRIPT: 1, STYLE: 1, LINK: 1, META: 1, TITLE: 1, TEMPLATE: 1, BR: 1, WBR: 1, NOSCRIPT: 1 };
  var boxesOn = false;
  var boxesLayer = null;
  var boxesFrame = 0;

  function boxName(element) {
    var text = element.tagName.toLowerCase();
    if (element.id) text += '#' + element.id;
    else if (element.classList && element.classList.length) text += '.' + element.classList[0];
    return text;
  }

  function drawBoxes() {
    boxesFrame = 0;
    if (!boxesOn || !document.body) return;

    if (!boxesLayer) {
      boxesLayer = document.createElement('ra-quadrats');
      boxesLayer.setAttribute('aria-hidden', 'true');
      boxesLayer.style.cssText = important([
        'position: absolute', 'top: 0', 'left: 0', 'width: 0', 'height: 0', 'z-index: 2147483647',
        'pointer-events: none', 'display: block',
      ]);
    }
    boxesLayer.textContent = '';
    // Fora del <body>: així no compta com a fill seu ni li canvia la maquetació.
    if (boxesLayer.parentNode !== document.documentElement) document.documentElement.appendChild(boxesLayer);

    var origin = boxesLayer.getBoundingClientRect();
    var placed = [];

    function isFree(spot) {
      if (spot.top < 0 || spot.left < 0) return false;
      for (var k = 0; k < placed.length; k++) {
        var other = placed[k];
        if (spot.left < other.right && spot.right > other.left && spot.top < other.bottom && spot.bottom > other.top) {
          return false;
        }
      }
      return true;
    }

    function addBox(rect, colour, inline) {
      if (rect.width < 1 || rect.height < 1) return;
      var box = document.createElement('ra-quadrat');
      box.style.cssText = important([
        'position: absolute', 'display: block', 'box-sizing: border-box',
        'left: ' + (rect.left - origin.left) + 'px', 'top: ' + (rect.top - origin.top) + 'px',
        'width: ' + rect.width + 'px', 'height: ' + rect.height + 'px',
        'border: 2px ' + (inline ? 'dotted ' : 'dashed ') + colour, 'pointer-events: none',
      ]);
      boxesLayer.appendChild(box);
    }

    // El nom d'una caixa. Es prova de posar-lo a sobre, on no tapa res; si no
    // hi ha lloc, els contenidors el porten a dins, en una cantonada lliure.
    // `roomAbove` és l'espai buit que la caixa té al damunt.
    function addName(rect, colour, name, isContainer, roomAbove) {
      var tag = document.createElement('ra-nom');
      tag.textContent = name;
      tag.style.cssText = important([
        'position: absolute', 'display: block', 'left: 0', 'top: 0', 'white-space: nowrap', 'padding: 0 3px',
        'font: 600 10px/12px ui-monospace, SFMono-Regular, Menlo, Consolas, monospace',
        'color: #ffffff', 'background: ' + colour, 'border-radius: 2px', 'pointer-events: none',
      ]);
      boxesLayer.appendChild(tag);
      var size = tag.getBoundingClientRect();
      var width = size.width;
      var height = size.height;
      var x = rect.left - origin.left;
      var y = rect.top - origin.top;
      var right = x + rect.width - width;

      var spots = [];
      if (roomAbove >= height) spots.push([x, y - height], [right, y - height]);
      if (isContainer) spots.push([x, y], [right, y], [x, y + rect.height - height], [x, y + height], [x, y + 2 * height]);

      for (var k = 0; k < spots.length; k++) {
        var spot = { left: spots[k][0], top: spots[k][1], right: spots[k][0] + width, bottom: spots[k][1] + height };
        if (!isFree(spot)) continue;
        placed.push(spot);
        tag.style.setProperty('left', spot.left + 'px', 'important');
        tag.style.setProperty('top', spot.top + 'px', 'important');
        return;
      }
      boxesLayer.removeChild(tag);
    }

    function walk(parent, depth) {
      var children = parent.children;
      var parentTop = parent === document.body ? 0 : parent.getBoundingClientRect().top;
      var previousBottom = null;
      for (var i = 0; i < children.length; i++) {
        var element = children[i];
        if (SKIPPED[element.tagName] || isOwn(element)) continue;
        var display = getComputedStyle(element).display;
        if (display === 'none') continue;
        if (display === 'contents') {
          walk(element, depth);
          continue;
        }
        var colour = BOX_COLOURS[depth % BOX_COLOURS.length];
        var isContainer = element.children.length > 0;
        var hasName = Boolean(element.id || (element.classList && element.classList.length));
        var rect = element.getBoundingClientRect();

        if (display === 'inline') {
          // Un element en línia pot ocupar trossos de diverses línies.
          var pieces = element.getClientRects();
          for (var j = 0; j < pieces.length; j++) addBox(pieces[j], colour, true);
        } else {
          addBox(rect, colour, false);
        }

        // Porten nom els contenidors i les caixes amb classe o id. Un paràgraf
        // o un enllaç sense classe només es dibuixen.
        if ((isContainer || hasName) && rect.width >= 24 && rect.height >= 1) {
          var above = previousBottom === null ? rect.top - parentTop : rect.top - previousBottom;
          addName(rect, colour, boxName(element), isContainer, above);
        }
        if (previousBottom === null || rect.bottom > previousBottom) previousBottom = rect.bottom;
        walk(element, depth + 1);
      }
    }

    walk(document.body, 0);
  }

  function scheduleBoxes() {
    if (!boxesOn || boxesFrame) return;
    boxesFrame = requestAnimationFrame(drawBoxes);
  }

  function setBoxes(value) {
    boxesOn = Boolean(value);
    if (boxesOn) {
      scheduleBoxes();
    } else if (boxesLayer && boxesLayer.parentNode) {
      boxesLayer.parentNode.removeChild(boxesLayer);
    }
  }

  // ---------- Comprovacions dels exercicis ----------
  // Cada comprovació és un objecte de dades (vegeu content/blocks.js). No
  // s'hi executa codi: només es miren elements, estils calculats i posicions.

  var probe = null;

  // El valor tal com el calcula el navegador: "#fff" → "rgb(255, 255, 255)",
  // "1rem" → "16px", "bold" → "700". Així es poden comparar amb els reals.
  function computedValue(property, value) {
    if (!probe) {
      probe = document.createElement('ra-sonda');
      probe.setAttribute('aria-hidden', 'true');
    }
    probe.style.cssText = important(['position: absolute', 'visibility: hidden', 'pointer-events: none', 'display: block']);
    if (probe.parentNode !== document.documentElement) document.documentElement.appendChild(probe);
    probe.style.setProperty(property, String(value), 'important');
    var result = getComputedStyle(probe).getPropertyValue(property);
    probe.parentNode.removeChild(probe);
    return result;
  }

  function normal(text) {
    return String(text).toLowerCase().replace(/\s+/g, ' ').trim();
  }

  function listOf(value) {
    return Array.isArray(value) ? value : [value];
  }

  function evaluateCheck(check) {
    var tol = typeof check.tol === 'number' ? check.tol : 1.5;
    var near = function (a, b) {
      return Math.abs(a - b) <= tol;
    };

    if (check.title !== undefined && normal(document.title).indexOf(normal(check.title)) === -1) return false;
    if (!check.selector) return check.title !== undefined;

    var elements = Array.prototype.slice.call(document.querySelectorAll(check.selector));
    if (check.exists === false) return elements.length === 0;

    if (check.count !== undefined) {
      var count = check.count;
      if (typeof count === 'number') {
        if (elements.length !== count) return false;
      } else {
        if (count.min !== undefined && elements.length < count.min) return false;
        if (count.max !== undefined && elements.length > count.max) return false;
      }
      if (elements.length === 0) return true;
    }
    if (elements.length === 0) return false;

    var first = elements[0];
    var targets = check.all ? elements : [first];
    var rects = elements.map(function (element) {
      return element.getBoundingClientRect();
    });
    var i;
    var t;

    for (t = 0; t < targets.length; t++) {
      var element = targets[t];
      var rect = element.getBoundingClientRect();
      var style = getComputedStyle(element);

      if (check.tag !== undefined && element.tagName.toLowerCase() !== String(check.tag).toLowerCase()) return false;

      if (check.text !== undefined) {
        var content = normal(element.textContent);
        var wanted = listOf(check.text);
        for (i = 0; i < wanted.length; i++) {
          if (content.indexOf(normal(wanted[i])) === -1) return false;
        }
      }

      if (check.attr) {
        for (var name in check.attr) {
          var expectedAttr = check.attr[name];
          var actualAttr = element.getAttribute(name);
          // El `src` d'una imatge de mostra s'ha substituït: el nom escrit és a data-fitxer.
          if (name === 'src' && element.hasAttribute('data-fitxer')) actualAttr = element.getAttribute('data-fitxer');
          if (expectedAttr === true) {
            if (actualAttr === null || actualAttr.trim() === '') return false;
          } else if (expectedAttr === false) {
            if (actualAttr !== null) return false;
          } else if (actualAttr === null || actualAttr.trim() !== String(expectedAttr)) {
            return false;
          }
        }
      }

      if (check.style) {
        for (var property in check.style) {
          var actual = normal(style.getPropertyValue(property));
          var accepted = listOf(check.style[property]).map(function (value) {
            return normal(computedValue(property, value));
          });
          if (accepted.indexOf(actual) === -1) return false;
        }
      }

      if (check.size) {
        var size = check.size;
        if (size.width !== undefined && !near(rect.width, size.width)) return false;
        if (size.height !== undefined && !near(rect.height, size.height)) return false;
        if (size.minWidth !== undefined && rect.width < size.minWidth - tol) return false;
        if (size.maxWidth !== undefined && rect.width > size.maxWidth + tol) return false;
        if (size.minHeight !== undefined && rect.height < size.minHeight - tol) return false;
        if (size.maxHeight !== undefined && rect.height > size.maxHeight + tol) return false;
      }

      // Distància a les vores de la finestra (per a position: fixed).
      if (check.at) {
        var view = document.documentElement;
        if (check.at.top !== undefined && !near(rect.top, check.at.top)) return false;
        if (check.at.left !== undefined && !near(rect.left, check.at.left)) return false;
        if (check.at.right !== undefined && !near(view.clientWidth - rect.right, check.at.right)) return false;
        if (check.at.bottom !== undefined && !near(view.clientHeight - rect.bottom, check.at.bottom)) return false;
      }

      // Respecte d'un contenidor: l'avantpassat que coincideix amb `inside`
      // (o el pare, si no es diu). Les distàncies es mesuren des de dins de
      // la vora del contenidor, com fan top, right, bottom i left.
      if (check.offset || check.centered || check.fills) {
        var container = check.inside
          ? (element.parentElement && element.parentElement.closest(check.inside)) || document.querySelector(check.inside)
          : element.parentElement;
        if (!container) return false;
        var outer = container.getBoundingClientRect();
        var borders = getComputedStyle(container);
        var inner = {
          top: outer.top + parseFloat(borders.borderTopWidth),
          left: outer.left + parseFloat(borders.borderLeftWidth),
          right: outer.right - parseFloat(borders.borderRightWidth),
          bottom: outer.bottom - parseFloat(borders.borderBottomWidth),
        };
        if (check.offset) {
          if (check.offset.top !== undefined && !near(rect.top - inner.top, check.offset.top)) return false;
          if (check.offset.left !== undefined && !near(rect.left - inner.left, check.offset.left)) return false;
          if (check.offset.right !== undefined && !near(inner.right - rect.right, check.offset.right)) return false;
          if (check.offset.bottom !== undefined && !near(inner.bottom - rect.bottom, check.offset.bottom)) return false;
        }
        if (check.centered) {
          var centreX = near((rect.left + rect.right) / 2, (inner.left + inner.right) / 2);
          var centreY = near((rect.top + rect.bottom) / 2, (inner.top + inner.bottom) / 2);
          if ((check.centered === 'x' || check.centered === 'both') && !centreX) return false;
          if ((check.centered === 'y' || check.centered === 'both') && !centreY) return false;
        }
        // Omple el contenidor d'una vora a l'altra (comptant-hi el padding).
        if (check.fills) {
          var fillsX = near(rect.left, inner.left + parseFloat(borders.paddingLeft)) && near(rect.right, inner.right - parseFloat(borders.paddingRight));
          var fillsY = near(rect.top, inner.top + parseFloat(borders.paddingTop)) && near(rect.bottom, inner.bottom - parseFloat(borders.paddingBottom));
          if ((check.fills === 'x' || check.fills === 'both') && !fillsX) return false;
          if ((check.fills === 'y' || check.fills === 'both') && !fillsY) return false;
        }
      }

      // Respecte d'un altre element.
      var relations = ['leftOf', 'rightOf', 'above', 'below', 'sameRow', 'sameColumn'];
      for (i = 0; i < relations.length; i++) {
        var relation = relations[i];
        if (check[relation] === undefined) continue;
        var other = document.querySelector(check[relation]);
        if (!other) return false;
        var o = other.getBoundingClientRect();
        if (relation === 'leftOf' && !(rect.right <= o.left + tol)) return false;
        if (relation === 'rightOf' && !(rect.left >= o.right - tol)) return false;
        if (relation === 'above' && !(rect.bottom <= o.top + tol)) return false;
        if (relation === 'below' && !(rect.top >= o.bottom - tol)) return false;
        if (relation === 'sameRow' && !(rect.top < o.bottom - tol && rect.bottom > o.top + tol)) return false;
        if (relation === 'sameColumn' && !(rect.left < o.right - tol && rect.right > o.left + tol)) return false;
      }
    }

    // ----- Comprovacions sobre tots els elements que coincideixen -----

    // En fila (d'esquerra a dreta) o en columna (de dalt a baix).
    if (check.arrange) {
      if (rects.length < 2) return false;
      for (i = 0; i < rects.length - 1; i++) {
        var a = rects[i];
        var b = rects[i + 1];
        if (check.arrange === 'row') {
          if (!(b.left >= a.right - tol && b.top < a.bottom - tol && b.bottom > a.top + tol)) return false;
        } else if (!(b.top >= a.bottom - tol && b.left < a.right - tol && b.right > a.left + tol)) {
          return false;
        }
      }
    }

    // Agrupa valors semblants: quantes columnes (o files) diferents hi ha.
    function distinct(values) {
      var sorted = values.slice().sort(function (x, y) {
        return x - y;
      });
      var groups = [];
      for (var k = 0; k < sorted.length; k++) {
        if (groups.length === 0 || sorted[k] - groups[groups.length - 1] > tol + 1) groups.push(sorted[k]);
      }
      return groups;
    }

    var lefts = rects.map(function (r) {
      return r.left;
    });
    var tops = rects.map(function (r) {
      return r.top;
    });
    if (check.columns !== undefined && distinct(lefts).length !== check.columns) return false;
    if (check.rows !== undefined && distinct(tops).length !== check.rows) return false;

    if (check.sameSize) {
      for (i = 1; i < rects.length; i++) {
        if ((check.sameSize === 'width' || check.sameSize === 'both') && !near(rects[i].width, rects[0].width)) return false;
        if ((check.sameSize === 'height' || check.sameSize === 'both') && !near(rects[i].height, rects[0].height)) return false;
      }
    }

    // Separació entre elements veïns: un número (el mateix en els dos
    // sentits) o { x, y }. Es mira entre veïns de la mateixa fila i entre files.
    if (check.gap !== undefined) {
      if (rects.length < 2) return false;
      var gapX = typeof check.gap === 'number' ? check.gap : check.gap.x;
      var gapY = typeof check.gap === 'number' ? check.gap : check.gap.y;
      // Una fila són les caixes que se solapen en vertical (encara que no
      // comencin a la mateixa alçada, com passa amb align-items: center).
      var byTop = rects.slice().sort(function (x, y) {
        return x.top - y.top;
      });
      var rowsOfBoxes = [];
      var rowBottom = 0;
      byTop.forEach(function (r) {
        var current = rowsOfBoxes[rowsOfBoxes.length - 1];
        if (current && r.top < rowBottom - tol) {
          current.push(r);
          rowBottom = Math.max(rowBottom, r.bottom);
        } else {
          rowsOfBoxes.push([r]);
          rowBottom = r.bottom;
        }
      });
      rowsOfBoxes.forEach(function (row) {
        row.sort(function (x, y) {
          return x.left - y.left;
        });
      });
      for (i = 0; i < rowsOfBoxes.length; i++) {
        var row = rowsOfBoxes[i];
        if (gapX !== undefined) {
          for (var c = 0; c < row.length - 1; c++) {
            if (!near(row[c + 1].left - row[c].right, gapX)) return false;
          }
        }
        if (gapY !== undefined && i < rowsOfBoxes.length - 1) {
          var bottom = Math.max.apply(null, row.map(function (r) {
            return r.bottom;
          }));
          var nextTop = Math.min.apply(null, rowsOfBoxes[i + 1].map(function (r) {
            return r.top;
          }));
          if (!near(nextTop - bottom, gapY)) return false;
        }
      }
    }

    return true;
  }

  function runChecks() {
    if (!config.checks) return;
    var results = config.checks.map(function (check) {
      try {
        return evaluateCheck(check);
      } catch (error) {
        return false;
      }
    });
    send({ type: 'checks', results: results });
  }

  if (isPage) {
    var settleTimer = 0;
    var settle = function () {
      scheduleBoxes();
      clearTimeout(settleTimer);
      settleTimer = setTimeout(runChecks, 60);
    };

    document.addEventListener('DOMContentLoaded', function () {
      send({ type: 'title', value: document.title || '' });
      setBoxes(config.boxes);
      settle();
      if (typeof ResizeObserver !== 'undefined') {
        var observer = new ResizeObserver(settle);
        observer.observe(document.documentElement);
        if (document.body) observer.observe(document.body);
      }
    });
    // Quan han arribat les imatges, les mides poden haver canviat.
    window.addEventListener('load', settle);
    window.addEventListener('resize', settle);
    window.addEventListener('scroll', scheduleBoxes, true);

    // L'aplicació demana mostrar o amagar els quadrats sense recarregar.
    window.addEventListener('message', function (event) {
      var data = event.data;
      if (event.source !== window.parent || !data || data.source !== 'ra2js-host') return;
      if (data.type === 'boxes') setBoxes(data.value);
    });
  }

  // ---------- Alçada de la previsualització ----------

  function reportHeight() {
    send({ type: 'height', value: Math.ceil(document.documentElement.getBoundingClientRect().height) });
  }

  if (config.reportHeight) {
    document.addEventListener('DOMContentLoaded', function () {
      reportHeight();
      if (typeof ResizeObserver !== 'undefined') {
        new ResizeObserver(reportHeight).observe(document.documentElement);
      }
    });
  }

  // ---------- Execució del codi de l'alumne ----------

  function runUserCode() {
    // Al mode «pàgina» no hi ha codi per executar, i no hem d'afegir res al
    // <body>: un element de més canviaria què és :last-child o :nth-child.
    if (config.mode === 'page') {
      flush();
      send({ type: 'done' });
      return;
    }

    var code = config.code;

    // Fem servir la versió amb guardes només si continua sent codi vàlid.
    if (config.guarded && config.guarded !== config.code) {
      try {
        new Function(config.guarded);
        code = config.guarded;
      } catch (error) {
        code = config.code;
      }
    }

    var parent = document.body || document.head || document.documentElement;

    // Un segon fitxer (dades.js) que es carrega abans, en el seu propi <script>.
    if (config.prelude) {
      runningPrelude = true;
      var preludeScript = document.createElement('script');
      preludeScript.textContent = config.prelude;
      parent.appendChild(preludeScript);
      runningPrelude = false;
    }

    // Un <script> real: mateixes regles que en una pàgina de veritat, i els
    // errors (també els de sintaxi) arriben a l'esdeveniment «error» amb línia.
    var script = document.createElement('script');
    script.textContent = code;
    parent.appendChild(script);

    flush();
    send({ type: 'done' });
  }

  if (config.runAt === 'head') {
    // Simula un <script> al <head> sense defer: el <body> encara no existeix.
    runUserCode();
  } else {
    // Simula un <script defer>: s'executa quan tot l'HTML ja s'ha llegit.
    document.addEventListener('DOMContentLoaded', runUserCode);
  }
}
