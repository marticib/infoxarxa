import { useEffect, useId, useRef, useState } from 'react';
import CodeEditor from './CodeEditor.jsx';
import CodeBlock from './CodeBlock.jsx';
import ConsoleOutput, { consoleLines } from './ConsoleOutput.jsx';
import Icon from '../ui/Icon.jsx';
import { Paragraphs } from '../ui/RichText.jsx';
import { buildSrcdoc, createRunId, SANDBOX_PERMISSIONS, SANDBOX_SOURCE } from '../../lib/sandbox.js';
import { useFullscreen } from '../../state/FullscreenContext.jsx';

// Editor + execució + resultat. És la peça que comparteixen els exemples, els
// reptes i els exercicis.
//
// El codi s'executa dins d'un <iframe sandbox> (vegeu lib/sandbox.js): no pot
// tocar aquesta aplicació i ens envia el que passa amb postMessage.
//
// Pantalla completa: el mateix element s'amplia fins a omplir la finestra,
// amb el codi a l'esquerra i el resultat a la dreta. No es mou de lloc dins
// del document, i així l'iframe no es recarrega ni es perd el que s'hi ha fet.
// Com que llavors la targeta queda tapada, l'enunciat arriba per `brief` i es
// repeteix dins del panell; `after` és el que va a sota de l'editor.

// `data` és un segon fitxer de JavaScript opcional (dades.js) que s'executa
// abans del principal. Els noms es poden canviar amb `fileNames`, per mostrar
// els fitxers d'un projecte de veritat: { js: 'inici.js', html: 'index.html' }.
const FILE_TABS = [
  { id: 'js', label: 'JavaScript', lang: 'js' },
  { id: 'data', label: 'dades.js', lang: 'js' },
  { id: 'html', label: 'HTML', lang: 'html' },
  { id: 'css', label: 'CSS', lang: 'css' },
];

const WATCHDOG_MS = 6000;
const MAX_ENTRIES = 400;
const MIN_FRAME_HEIGHT = 56;
const MAX_FRAME_HEIGHT = 560;

const sameLines = (a, b) => a.length === b.length && a.every((line, index) => line === b[index]);

export default function CodeRunner({
  js = '',
  html = '',
  css = '',
  data = '',
  fileNames,
  runAt = 'ready',
  frameTitle = 'Resultat del codi',
  hint,
  solution,
  explanation,
  partialSolution = false,
  expectedOutput,
  autoRun = false,
  showEditor = true,
  onSolved,
  title,
  kicker,
  brief,
  after,
}) {
  const [files, setFiles] = useState({ js, html, css, data });
  const [tab, setTab] = useState('js');
  const [run, setRun] = useState(null);
  const [entries, setEntries] = useState([]);
  const [status, setStatus] = useState('idle'); // idle | running | done | timeout
  const [frameHeight, setFrameHeight] = useState(120);
  const [showHint, setShowHint] = useState(false);
  const [showSolution, setShowSolution] = useState(false);

  const frameRef = useRef(null);
  const currentRunRef = useRef(null);
  const finishedRunRef = useRef(null);
  const storageRef = useRef({});
  const watchdogRef = useRef(null);
  const rootRef = useRef(null);
  const fullscreenButtonRef = useRef(null);
  const exitButtonRef = useRef(null);
  const baseId = useId();

  const { panel, openPanel, closePanel } = useFullscreen();
  const fullscreen = panel === baseId;
  const fullscreenTitleId = `${baseId}-titol-ampliat`;

  // Si l'editor desapareix (canvi de pàgina) mentre està ampliat, es tanca.
  useEffect(() => () => closePanel(baseId, { keepPosition: false }), [closePanel, baseId]);

  // Mentre està ampliat fa de diàleg: el focus no ha d'anar a la pàgina que
  // queda tapada a sota. (El cercador s'obre per sobre i sí que el pot rebre.)
  useEffect(() => {
    if (!fullscreen) return undefined;
    function onFocusIn(event) {
      const target = event.target;
      if (!(target instanceof Element)) return;
      if (rootRef.current?.contains(target) || target.closest('dialog')) return;
      exitButtonRef.current?.focus();
    }
    document.addEventListener('focusin', onFocusIn);
    return () => document.removeEventListener('focusin', onFocusIn);
  }, [fullscreen]);

  // En sortir-ne, el focus torna al botó que l'havia ampliat.
  const wasFullscreen = useRef(false);
  useEffect(() => {
    if (wasFullscreen.current && !fullscreen) {
      const active = document.activeElement;
      if (!active || active === document.body || !rootRef.current?.contains(active)) {
        fullscreenButtonRef.current?.focus({ preventScroll: true });
      }
    }
    wasFullscreen.current = fullscreen;
  }, [fullscreen]);

  const originals = { js, html, css, data };
  const tabs = FILE_TABS.filter((item) => item.id === 'js' || originals[item.id].trim() !== '').map((item) => ({
    ...item,
    label: fileNames?.[item.id] ?? item.label,
  }));
  const activeTab = tabs.find((item) => item.id === tab) ?? tabs[0];
  const hasPage = files.html.trim() !== '';

  // Missatges que arriben de l'iframe aïllat.
  useEffect(() => {
    function onMessage(event) {
      const data = event.data;
      if (!data || data.source !== SANDBOX_SOURCE || data.runId !== currentRunRef.current) return;
      if (frameRef.current && event.source !== frameRef.current.contentWindow) return;

      if (data.type === 'entries' && Array.isArray(data.entries)) {
        setEntries((previous) => [...previous, ...data.entries].slice(0, MAX_ENTRIES));
      } else if (data.type === 'clear') {
        setEntries([]);
      } else if (data.type === 'done') {
        finishedRunRef.current = data.runId;
        clearTimeout(watchdogRef.current);
        setStatus('done');
      } else if (data.type === 'height' && typeof data.value === 'number') {
        setFrameHeight(Math.min(MAX_FRAME_HEIGHT, Math.max(MIN_FRAME_HEIGHT, data.value)));
      } else if (data.type === 'storage' && data.data && typeof data.data === 'object') {
        storageRef.current = data.data;
      }
    }

    window.addEventListener('message', onMessage);
    return () => {
      window.removeEventListener('message', onMessage);
      clearTimeout(watchdogRef.current);
    };
  }, []);

  function execute(source = files) {
    const runId = createRunId();
    currentRunRef.current = runId;
    clearTimeout(watchdogRef.current);
    setEntries([]);
    setStatus('running');
    setRun({
      id: runId,
      srcdoc: buildSrcdoc({ ...source, dataName: fileNames?.data, runId, runAt, storage: storageRef.current }),
    });

    // Si l'iframe no respon (per exemple, per un bucle que no hem pogut aturar), el retirem.
    watchdogRef.current = setTimeout(() => {
      if (currentRunRef.current === runId && finishedRunRef.current !== runId) {
        currentRunRef.current = null;
        setRun(null);
        setStatus('timeout');
      }
    }, WATCHDOG_MS);
  }

  function reset() {
    const original = { js, html, css, data };
    clearTimeout(watchdogRef.current);
    storageRef.current = {};
    setFiles(original);
    setTab('js');

    if (!showEditor) {
      execute(original);
      return;
    }
    currentRunRef.current = null;
    setRun(null);
    setEntries([]);
    setStatus('idle');
  }

  useEffect(() => {
    if (autoRun) execute();
    // Només en muntar el component.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const expectedLines = expectedOutput ? expectedOutput.map((line) => line.trim()).filter((line) => line !== '') : null;
  const hasException = entries.some((entry) => entry.level === 'exception');
  const outputMatches =
    expectedLines !== null && status === 'done' && !hasException && sameLines(consoleLines(entries), expectedLines);

  // Quan la sortida coincideix amb l'esperada, l'exercici es pot donar per fet.
  useEffect(() => {
    if (outputMatches) onSolved?.();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [outputMatches]);

  const showConsole = status !== 'idle' && (!hasPage || entries.length > 0);
  const emptyConsoleText =
    status === 'running'
      ? 'Executant…'
      : 'El codi s\'ha executat, però no ha escrit res a la consola. Fes servir console.log() per veure valors.';

  const hintId = `${baseId}-pista`;
  const solutionId = `${baseId}-solucio`;

  // Amb editor, el botó va a la barra de fitxers; a les demostracions sense
  // editor, a la barra d'eines. Sempre n'hi ha un, i només un.
  const fullscreenButton = (className) => (
    <button
      ref={fullscreenButtonRef}
      type="button"
      className={className}
      aria-pressed={fullscreen}
      onClick={() => (fullscreen ? closePanel(baseId) : openPanel(baseId))}
    >
      <Icon name={fullscreen ? 'compress' : 'expand'} size={16} />
      <span className="runner__fs-label">Pantalla completa</span>
    </button>
  );

  const toolbar = (
    <div className="runner__toolbar">
      {showEditor ? (
        <button type="button" className="btn btn--primary runner__run" onClick={() => execute()}>
          <Icon name="play" size={16} />
          Executar
        </button>
      ) : null}
      <button type="button" className="btn btn--secondary" onClick={reset}>
        <Icon name="reset" size={16} />
        Reiniciar
      </button>
      {hint || solution || !showEditor ? <span className="runner__spacer" aria-hidden="true" /> : null}
      {hint ? (
        <button
          type="button"
          className="btn btn--ghost"
          aria-expanded={showHint}
          aria-controls={hintId}
          onClick={() => setShowHint((value) => !value)}
        >
          <Icon name="bulb" size={17} />
          {showHint ? 'Amagar pista' : 'Mostrar pista'}
        </button>
      ) : null}
      {solution ? (
        <button
          type="button"
          className="btn btn--ghost"
          aria-expanded={showSolution}
          aria-controls={solutionId}
          onClick={() => setShowSolution((value) => !value)}
        >
          <Icon name="eye" size={17} />
          {showSolution ? 'Amagar solució' : 'Veure solució'}
        </button>
      ) : null}
      {showEditor ? null : fullscreenButton('btn btn--ghost runner__fs')}
    </div>
  );

  const resultState = status === 'timeout' || hasException ? 'error' : status === 'done' ? 'ok' : status;

  return (
    <div
      ref={rootRef}
      className={`runner${showEditor ? '' : ' runner--no-editor'}${fullscreen ? ' runner--fullscreen' : ''}`}
      role={fullscreen ? 'dialog' : undefined}
      aria-modal={fullscreen ? 'true' : undefined}
      aria-labelledby={fullscreen ? fullscreenTitleId : undefined}
    >
      {fullscreen ? (
        <div className="runner__fsbar">
          <p className="runner__fstitle" id={fullscreenTitleId}>
            {kicker ? (
              <>
                <span className="runner__fskicker">{kicker}</span>
                {/* Separa les dues parts del nom per als lectors de pantalla */}
                <span className="sr-only">: </span>
              </>
            ) : null}
            <span className="runner__fsname">{title ?? frameTitle}</span>
          </p>
          <button
            ref={exitButtonRef}
            type="button"
            className="btn btn--secondary btn--small runner__fsexit"
            onClick={() => closePanel(baseId)}
          >
            <Icon name="compress" size={16} />
            <span>
              Surt<span className="runner__fsexit-long"> de la pantalla completa</span>
            </span>
          </button>
        </div>
      ) : null}

      <div className="runner__work">
        {fullscreen && brief ? <div className="runner__brief">{brief}</div> : null}

        {showEditor ? (
          <div className="runner__editor">
            <div className="runner__bar">
              {tabs.length > 1 ? (
                <div className="runner__tabs" role="group" aria-label="Fitxers de l'exemple">
                  {tabs.map((item) => (
                    <button
                      key={item.id}
                      type="button"
                      className="runner__tab"
                      aria-pressed={item.id === activeTab.id}
                      onClick={() => setTab(item.id)}
                    >
                      {item.label}
                    </button>
                  ))}
                </div>
              ) : (
                <p className="runner__file">
                  <Icon name="code" size={15} />
                  {activeTab.label}
                </p>
              )}
              <div className="runner__bar-tools">
                <p className="runner__shortcut" aria-hidden="true">
                  <kbd>Ctrl</kbd>
                  <kbd>↵</kbd>
                </p>
                {fullscreenButton('runner__fs runner__fs--bar')}
              </div>
            </div>

            <CodeEditor
              value={files[activeTab.id]}
              onChange={(value) => setFiles((previous) => ({ ...previous, [activeTab.id]: value }))}
              lang={activeTab.lang}
              label={`Codi ${activeTab.label}. ${frameTitle}`}
              onRun={() => execute()}
            />

            {toolbar}
          </div>
        ) : (
          toolbar
        )}

        {hint ? (
          <div id={hintId} className="runner__panel runner__panel--hint" hidden={!showHint}>
            <p className="runner__panel-title">
              <Icon name="bulb" size={18} />
              Pista
            </p>
            <Paragraphs text={hint} />
          </div>
        ) : null}

        {solution ? (
          <div id={solutionId} className="runner__panel runner__panel--solution" hidden={!showSolution}>
            <p className="runner__panel-title">
              <Icon name="eye" size={18} />
              {partialSolution ? 'Solució (les parts que canvien)' : 'Una solució possible'}
            </p>
            {showSolution ? (
              <>
                <CodeBlock code={solution} lang="js" title="Solució" />
                {explanation ? (
                  <div className="runner__explanation">
                    <p className="runner__explanation-title">Per què funciona</p>
                    <Paragraphs text={explanation} />
                  </div>
                ) : null}
                {!partialSolution && showEditor ? (
                  <button
                    type="button"
                    className="btn btn--secondary btn--small"
                    onClick={() => {
                      setFiles((previous) => ({ ...previous, js: solution }));
                      setTab('js');
                    }}
                  >
                    Carrega la solució a l'editor
                  </button>
                ) : null}
              </>
            ) : null}
          </div>
        ) : null}

        {fullscreen && after ? <div className="runner__after">{after}</div> : null}
      </div>

      <div className={`runner__output runner__output--${resultState}`}>
        <p className="runner__output-title">
          <span className="runner__dot" aria-hidden="true" />
          Resultat
        </p>
        {/* Senyal breu que el codi s'ha tornat a executar, encara que el resultat sigui igual */}
        {run ? <span key={run.id} className="runner__pulse" aria-hidden="true" /> : null}

        {status === 'idle' ? (
          <p className="runner__placeholder">Prem «Executar» per veure què fa aquest codi.</p>
        ) : null}

        {status === 'timeout' ? (
          <p className="runner__timeout" role="alert">
            <Icon name="warning" size={18} />
            L'execució no ha respost a temps i s'ha aturat. Revisa si hi ha un bucle que no s'acaba mai.
          </p>
        ) : null}

        {run ? (
          <div className={hasPage ? 'preview' : 'preview preview--hidden'}>
            {hasPage ? (
              <p className="preview__bar">
                <span className="preview__dots" aria-hidden="true" />
                Pàgina
              </p>
            ) : null}
            <iframe
              key={run.id}
              ref={frameRef}
              className="preview__frame"
              title={frameTitle}
              sandbox={SANDBOX_PERMISSIONS}
              srcDoc={run.srcdoc}
              // Ampliat, l'alçada la decideix la maquetació: la pàgina omple el panell.
              style={hasPage && !fullscreen ? { height: frameHeight } : undefined}
              aria-hidden={hasPage ? undefined : true}
              tabIndex={hasPage ? undefined : -1}
            />
          </div>
        ) : null}

        {showConsole ? (
          <>
            {hasPage ? <p className="runner__console-label">Consola</p> : null}
            <ConsoleOutput entries={entries} emptyText={emptyConsoleText} />
          </>
        ) : null}

        {expectedLines !== null && status === 'done' ? (
          <p className={`runner__check ${outputMatches ? 'runner__check--ok' : 'runner__check--pending'}`} role="status">
            <Icon name={outputMatches ? 'check' : 'target'} size={18} />
            {outputMatches
              ? 'Correcte: la sortida coincideix amb el resultat esperat.'
              : 'La sortida encara no coincideix amb el resultat esperat. Compara-les línia a línia.'}
          </p>
        ) : null}
      </div>
    </div>
  );
}
