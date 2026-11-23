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
