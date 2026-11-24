import { useEffect, useId, useRef, useState } from 'react';
import CodeEditor from './CodeEditor.jsx';
import CodeBlock from './CodeBlock.jsx';
import ConsoleOutput, { consoleLines } from './ConsoleOutput.jsx';
import Icon from '../ui/Icon.jsx';
import RichText, { Paragraphs } from '../ui/RichText.jsx';
import { buildSrcdoc, createRunId, HOST_SOURCE, SANDBOX_PERMISSIONS, SANDBOX_SOURCE } from '../../lib/sandbox.js';
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

// Té dos modes:
//
//  - 'code' (dossier de JavaScript): s'escriu codi, es prem «Executar» i es
//    mira la consola i, si n'hi ha, la pàgina.
//  - 'page' (dossier d'HTML i CSS): només hi ha HTML i CSS, i la pàgina
//    s'actualitza sola mentre s'escriu. Es poden dibuixar els «quadrats» (el
//    contorn de cada caixa), comparar amb l'«objectiu» (com queda la solució)
//    i passar les comprovacions de l'exercici (`checks`).
//
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
// Temps sense escriure abans d'actualitzar la pàgina (mode 'page').
const LIVE_DELAY_MS = 350;
// Amplada mínima amb què es pinta una pàgina (mode 'page'). Les comprovacions
// dels exercicis estan pensades per a pàgines d'aquesta amplada o més.
const MIN_PAGE_WIDTH = 340;
const MAX_ENTRIES = 400;
const MIN_FRAME_HEIGHT = 56;
const MAX_FRAME_HEIGHT = 560;

const sameLines = (a, b) => a.length === b.length && a.every((line, index) => line === b[index]);

export default function CodeRunner({
  mode = 'code',
  js = '',
  html = '',
  css,
  data = '',
  focus,
  checks,
  target,
  boxes: initialBoxes = false,
  viewport,
  pageWidth,
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
  const isPage = mode === 'page';
  const hasCss = css !== undefined && css !== null;
  const cssSource = css ?? '';
  const firstTab = isPage ? (focus ?? (hasCss ? 'css' : 'html')) : 'js';

  const [files, setFiles] = useState({ js, html, css: cssSource, data });
  const [tab, setTab] = useState(firstTab);
  const [run, setRun] = useState(null);
  const [entries, setEntries] = useState([]);
  const [status, setStatus] = useState('idle'); // idle | running | done | timeout
  const [frameHeight, setFrameHeight] = useState(120);
  const [showHint, setShowHint] = useState(false);
  const [showSolution, setShowSolution] = useState(false);
  // Mode 'page'
  const [boxes, setBoxes] = useState(initialBoxes);
  const [view, setView] = useState('mine'); // mine | target
  const [pageTitle, setPageTitle] = useState('');
  const [checkResults, setCheckResults] = useState(null);
  const [targetRun, setTargetRun] = useState(null);
  const [targetHeight, setTargetHeight] = useState(120);

  const frameRef = useRef(null);
  const targetFrameRef = useRef(null);
  const targetRunRef = useRef(null);
  const stageRef = useRef(null);
  const boxesRef = useRef(initialBoxes);
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

  const originals = { js, html, css: cssSource, data };
  // Mode 'page': sempre HTML, i CSS quan l'exemple en porta (encara que sigui buit).
  const hasTab = (id) =>
    isPage ? id === 'html' || (id === 'css' && hasCss) : id === 'js' || originals[id].trim() !== '';
  const tabs = FILE_TABS.filter((item) => hasTab(item.id)).map((item) => ({
    ...item,
    label: fileNames?.[item.id] ?? item.label,
  }));
  const activeTab = tabs.find((item) => item.id === tab) ?? tabs[0];
  const hasPage = files.html.trim() !== '';

  // Missatges que arriben de l'iframe aïllat.
  useEffect(() => {
    function onMessage(event) {
      const data = event.data;
      if (!data || data.source !== SANDBOX_SOURCE) return;

      // La pàgina «objectiu» només ens diu quant fa d'alt.
      if (data.runId === targetRunRef.current) {
        if (targetFrameRef.current && event.source !== targetFrameRef.current.contentWindow) return;
        if (data.type === 'height' && typeof data.value === 'number') {
          setTargetHeight(Math.min(MAX_FRAME_HEIGHT, Math.max(MIN_FRAME_HEIGHT, data.value)));
        }
        return;
      }

      if (data.runId !== currentRunRef.current) return;
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
      } else if (data.type === 'title' && typeof data.value === 'string') {
        setPageTitle(data.value);
      } else if (data.type === 'checks' && Array.isArray(data.results)) {
        setCheckResults(data.results);
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
      srcdoc: buildSrcdoc({
        ...source,
        dataName: fileNames?.data,
        runId,
        runAt,
        storage: storageRef.current,
        mode,
        cssName: fileNames?.css,
        boxes: boxesRef.current,
        checks: isPage && checks ? checks : null,
      }),
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
    const original = { js, html, css: cssSource, data };
    clearTimeout(watchdogRef.current);
    storageRef.current = {};
    setFiles(original);
    setTab(firstTab);

    if (isPage) {
      // La pàgina es torna a pintar sola quan canvien els fitxers; si ja
      // eren els originals, la tornem a carregar igualment.
      if (files.html === original.html && files.css === original.css) execute(original);
      return;
    }

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
    if (autoRun && !isPage) execute();
    // Només en muntar el component.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Mode 'page': la pàgina es pinta en muntar i cada cop que es deixa
  // d'escriure una estona. No hi ha botó «Executar».
  const firstPaint = useRef(true);
  useEffect(() => {
    if (!isPage) return undefined;
    if (firstPaint.current) {
      firstPaint.current = false;
      execute();
      return undefined;
    }
    const timer = setTimeout(() => execute(), LIVE_DELAY_MS);
    return () => clearTimeout(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isPage, files.html, files.css]);

  // L'objectiu: la mateixa pàgina amb la solució posada. Es pinta una vegada.
  const targetFiles = isPage && target ? { html: target.html ?? html, css: target.css ?? cssSource } : null;
  useEffect(() => {
    if (!targetFiles) return;
    const runId = createRunId();
    targetRunRef.current = runId;
    setTargetRun({
      id: runId,
      srcdoc: buildSrcdoc({ ...targetFiles, runId, mode, cssName: fileNames?.css, boxes: boxesRef.current }),
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [targetFiles?.html, targetFiles?.css]);

  // Finestra simulada: una pàgina mai es pinta més estreta que `pageWidth`
  // (o que el mínim, si no se'n diu cap). Si no hi cap, es mostra reduïda, com
  // una captura. Així una maqueta amb capçalera i menú lateral es veu igual
  // dins d'una targeta estreta, al mòbil o a pantalla completa, i les
  // comprovacions dels exercicis donen el mateix resultat a tot arreu.
  const scaled = isPage;
  const logicalWidth = pageWidth ?? MIN_PAGE_WIDTH;
  const [stageSize, setStageSize] = useState({ width: 0, height: 0 });
  const hasRun = run !== null;
  useEffect(() => {
    if (!scaled || !hasRun || !stageRef.current || typeof ResizeObserver === 'undefined') return undefined;
    const observer = new ResizeObserver(([entry]) => {
      const { width, height } = entry.contentRect;
      setStageSize((previous) => (previous.width === width && previous.height === height ? previous : { width, height }));
    });
    observer.observe(stageRef.current);
    return () => observer.disconnect();
  }, [scaled, hasRun]);
  const scale = scaled && stageSize.width > 0 ? Math.min(1, stageSize.width / logicalWidth) : 1;

  // L'estil d'una de les dues pàgines (la pròpia o l'objectiu), segons la
  // seva alçada natural i si es mostra reduïda.
  function frameStyle(naturalHeight) {
    if (!hasPage) return undefined;
    const height = viewport ?? naturalHeight;
    if (!scaled) return fullscreen ? undefined : { height };
    return {
      width: scale < 1 ? logicalWidth : '100%',
      // Ampliat, omple l'alçada disponible; si no, fa l'alçada de la finestra simulada.
      height: fullscreen ? (stageSize.height > 0 ? stageSize.height / scale : height) : height,
      transform: scale < 1 ? `scale(${scale})` : undefined,
    };
  }
  const stageStyle =
    scaled && !fullscreen
      ? { height: Math.max(viewport ?? frameHeight, targetRun ? (viewport ?? targetHeight) : 0) * scale }
      : undefined;

  // Mostrar o amagar els quadrats no recarrega les pàgines: se'ls avisa.
  function toggleBoxes() {
    const next = !boxes;
    boxesRef.current = next;
    setBoxes(next);
    for (const frame of [frameRef.current, targetFrameRef.current]) {
      frame?.contentWindow?.postMessage({ source: HOST_SOURCE, type: 'boxes', value: next }, '*');
    }
  }

  const expectedLines = expectedOutput ? expectedOutput.map((line) => line.trim()).filter((line) => line !== '') : null;
  const hasException = entries.some((entry) => entry.level === 'exception');
  const outputMatches =
    expectedLines !== null && status === 'done' && !hasException && sameLines(consoleLines(entries), expectedLines);

  // Mode 'page': l'exercici està resolt quan passen totes les comprovacions.
  const checkList = isPage && checks && checks.length > 0 ? checks : null;
  const checksReady = checkList !== null && checkResults !== null && checkResults.length === checkList.length;
  const passedCount = checksReady ? checkResults.filter(Boolean).length : 0;
  const allPassed = checksReady && passedCount === checkList.length;

  // Quan la sortida coincideix amb l'esperada, l'exercici es pot donar per fet.
  useEffect(() => {
    if (outputMatches || allPassed) onSolved?.();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [outputMatches, allPassed]);

  const showConsole = status !== 'idle' && (isPage ? entries.length > 0 : !hasPage || entries.length > 0);
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
      {showEditor && !isPage ? (
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
                {isPage ? (
                  <p className="runner__live" aria-hidden="true">
                    <span className="runner__live-dot" />
                    En viu
                  </p>
                ) : (
                  <p className="runner__shortcut" aria-hidden="true">
                    <kbd>Ctrl</kbd>
                    <kbd>↵</kbd>
                  </p>
                )}
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
                {typeof solution === 'string' ? (
                  <CodeBlock code={solution} lang="js" title="Solució" />
                ) : (
                  // Mode 'page': la solució són els fitxers que canvien.
                  ['html', 'css']
                    .filter((id) => solution[id] !== undefined)
                    .map((id) => (
                      <CodeBlock
                        key={id}
                        code={solution[id]}
                        lang={id}
                        title={`Solució · ${fileNames?.[id] ?? (id === 'html' ? 'HTML' : 'CSS')}`}
                      />
                    ))
                )}
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
                      if (typeof solution === 'string') {
                        setFiles((previous) => ({ ...previous, js: solution }));
                        setTab('js');
                      } else {
                        setFiles((previous) => ({ ...previous, ...solution }));
                        setTab(solution.css !== undefined && hasCss ? 'css' : 'html');
                      }
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
        {run && !isPage ? <span key={run.id} className="runner__pulse" aria-hidden="true" /> : null}

        {status === 'idle' && !isPage ? (
          <p className="runner__placeholder">Prem «Executar» per veure què fa aquest codi.</p>
        ) : null}

        {status === 'timeout' ? (
          <p className="runner__timeout" role="alert">
            <Icon name="warning" size={18} />
            L'execució no ha respost a temps i s'ha aturat. Revisa si hi ha un bucle que no s'acaba mai.
          </p>
        ) : null}

        {run ? (
          <div className={hasPage ? `preview${isPage ? ' preview--page' : ''}` : 'preview preview--hidden'}>
            {hasPage ? (
              <div className="preview__bar">
                <span className="preview__dots" aria-hidden="true" />
                <span className="preview__title">{isPage && pageTitle ? pageTitle : 'Pàgina'}</span>
                {isPage ? (
                  <span className="preview__tools">
                    {targetRun ? (
                      <span className="preview__views" role="group" aria-label="Què es mostra">
                        <button
                          type="button"
                          className="preview__view"
                          aria-pressed={view === 'mine'}
                          onClick={() => setView('mine')}
                        >
                          El teu resultat
                        </button>
                        <button
                          type="button"
                          className="preview__view"
                          aria-pressed={view === 'target'}
                          onClick={() => setView('target')}
                        >
                          Objectiu
                        </button>
                      </span>
                    ) : null}
                    <button type="button" className="preview__boxes" aria-pressed={boxes} onClick={toggleBoxes}>
                      <Icon name="boxes" size={15} />
                      Quadrats
                    </button>
                  </span>
                ) : null}
              </div>
            ) : null}
            <div
              ref={stageRef}
              className={`preview__stage${scaled ? ' preview__stage--scaled' : ''}`}
              style={stageStyle}
            >
              <iframe
                key={run.id}
                ref={frameRef}
                className={`preview__frame${view === 'target' && targetRun ? ' preview__frame--behind' : ''}`}
                title={frameTitle}
                sandbox={SANDBOX_PERMISSIONS}
                srcDoc={run.srcdoc}
                // Ampliat, l'alçada la decideix la maquetació: la pàgina omple el panell.
                style={frameStyle(frameHeight)}
                aria-hidden={!hasPage || (view === 'target' && targetRun) ? true : undefined}
                tabIndex={!hasPage || (view === 'target' && targetRun) ? -1 : undefined}
              />
              {targetRun ? (
                <iframe
                  key={targetRun.id}
                  ref={targetFrameRef}
                  className={`preview__frame${view === 'target' ? '' : ' preview__frame--behind'}`}
                  title={`Objectiu: ${frameTitle}`}
                  sandbox={SANDBOX_PERMISSIONS}
                  srcDoc={targetRun.srcdoc}
                  style={frameStyle(targetHeight)}
                  aria-hidden={view === 'target' ? undefined : true}
                  tabIndex={view === 'target' ? undefined : -1}
                />
              ) : null}
            </div>
          </div>
        ) : null}

        {showConsole ? (
          <>
            {hasPage ? <p className="runner__console-label">{isPage ? 'Avisos' : 'Consola'}</p> : null}
            <ConsoleOutput entries={entries} emptyText={emptyConsoleText} />
          </>
        ) : null}

        {checkList ? (
          <div className={`checks${allPassed ? ' checks--ok' : ''}`}>
            <p className="checks__title" role="status">
              <Icon name={allPassed ? 'check' : 'target'} size={18} />
              {allPassed
                ? 'Correcte: el teu resultat supera totes les comprovacions.'
                : checksReady
                  ? `Comprovacions: ${passedCount} de ${checkList.length}`
                  : 'Comprovacions'}
            </p>
            <ul className="checks__list">
              {checkList.map((check, index) => {
                const passed = checksReady && checkResults[index];
                return (
                  <li key={index} className={`checks__item${passed ? ' checks__item--ok' : ''}`}>
                    <Icon name={passed ? 'check' : 'circle'} size={15} />
                    <span>
                      <span className="sr-only">{passed ? 'Fet: ' : 'Pendent: '}</span>
                      <RichText text={check.label} />
                    </span>
                  </li>
                );
              })}
            </ul>
          </div>
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
