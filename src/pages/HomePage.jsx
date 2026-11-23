import { useMemo } from 'react';
import Highlighted from '../components/code/Highlighted.jsx';
import ProjectDemo from '../components/special/ProjectDemo.jsx';
import Icon from '../components/ui/Icon.jsx';
import RichText from '../components/ui/RichText.jsx';
import { units } from '../content/index.js';
import { deNumber } from '../lib/catalan.js';
import { bankTotal, doneInTopic, topics } from '../lib/exerciseBank.js';
import { exercisesHref, unitHref } from '../lib/router.js';
import { dossierStats, plural, unitStats } from '../lib/unitStats.js';
import { STATUS_LABELS, unitStatus, useProgress } from '../state/ProgressContext.jsx';

const STATUS_ICONS = { completed: 'check', visited: 'half', pending: 'circle' };

// Programa de mostra de la portada: fa servir el mateix que s'aprèn al dossier.
const HERO_CODE = [
  'const tasques = [',
  '  "Aprendre JavaScript",',
  '  "Fer el projecte",',
  '];',
  '',
  'for (const tasca of tasques) {',
  '  console.log(`Pendent: ${tasca}`);',
  '}',
].join('\n');
const HERO_OUTPUT = ['Pendent: Aprendre JavaScript', 'Pendent: Fer el projecte'];

const FEATURES = [
  'Obrir i tancar el menú lateral',
  'Cercar vídeos i filtrar-los per categoria',
  "Fer «m'agrada» i subscriure's a un canal",
  'Escriure comentaris, amb validació',
];

const LEGEND = [
  { tone: 'theory', icon: 'book', name: 'Idea clau', text: 'El concepte que has de retenir de cada apartat.' },
  { tone: 'example', icon: 'play', name: 'Exemple executable', text: 'Codi que pots executar, canviar i tornar a provar.' },
  { tone: 'warning', icon: 'warning', name: 'Atenció', text: 'Detalls que acostumen a passar per alt.' },
  { tone: 'error', icon: 'error', name: 'Error habitual', text: 'Errors típics, amb el missatge de la consola i la correcció.' },
  { tone: 'challenge', icon: 'flag', name: 'Repte i exercici', text: 'Pràctica amb pista i solució amagades.' },
  { tone: 'project', icon: 'layers', name: 'Exemple guia', text: 'Com creix el gestor de tasques que ens acompanya a totes les unitats.' },
];

// Portada: què és el dossier, què es construeix i per on continuar.
export default function HomePage() {
  const { progress, completedCount, totalUnits } = useProgress();
  const lastUnit = units.find((unit) => unit.id === progress.lastUnit);
  const nextPending = units.find((unit) => !progress.completed[unit.id]);
  const resumeUnit = lastUnit ?? units[0];
  const hasStarted = Boolean(lastUnit);
  const totals = useMemo(() => dossierStats(), []);

  const stats = [
    { value: totals.units, label: 'unitats, de zero al projecte' },
    { value: totals.examples, label: 'exemples que pots executar' },
    { value: totals.exercises, label: 'exercicis amb pista i solució' },
    { value: totals.questions, label: 'preguntes per comprovar-te' },
  ];

  return (
    <div className="home">
      <header className="hero">
        <div className="hero__text">
          <p className="hero__eyebrow eyebrow">RA2 · Introducció a JavaScript</p>
          <h1 className="hero__title" tabIndex={-1} data-page-title>
            JavaScript <span className="hero__mark">des de zero</span>
          </h1>
          <p className="hero__lead">
            Ja saps fer pàgines amb HTML i CSS. Ara aprendràs a fer que <strong>facin coses</strong>: que responguin
            als clics, recordin dades, prenguin decisions i canviïn davant dels teus ulls.
          </p>
          <p className="hero__lead">
            No és un llibre per llegir de dalt a baix: gairebé tot el codi que veuràs es pot executar i modificar
            aquí mateix. Equivoca't sense por, que és com s'aprèn a programar.
          </p>
          <div className="hero__actions">
            <a className="btn btn--primary btn--large" href={unitHref(resumeUnit.id)}>
              {hasStarted ? `Continua: unitat ${resumeUnit.number}` : 'Comença per la unitat 1'}
              <Icon name="arrowRight" size={18} />
            </a>
            {hasStarted && nextPending && nextPending.id !== resumeUnit.id ? (
              <a className="btn btn--secondary btn--large" href={unitHref(nextPending.id)}>
                Primera unitat pendent: {nextPending.number}
              </a>
            ) : null}
          </div>
          <p className="hero__progress">
            {completedCount === 0
              ? `${totalUnits} unitats, de la primera línia de codi fins a una aplicació completa.`
              : `Has completat ${completedCount} ${deNumber(totalUnits)} unitats.`}
            {progress.projectDone ? ' El projecte final ja és teu.' : ''}
          </p>
        </div>

        <figure
          className="hero__window"
          role="img"
          aria-label="Un programa JavaScript de vuit línies que recorre una llista de tasques i, a sota, el que escriu a la consola: «Pendent: Aprendre JavaScript» i «Pendent: Fer el projecte»."
        >
          <div className="hero__window-bar">
            <span className="preview__dots" />
            <span>tasques.js</span>
          </div>
          <pre className="hero__code">
            <code>
              <Highlighted code={HERO_CODE} lang="js" />
            </code>
          </pre>
          <div className="hero__console">
            <p className="hero__console-title">Consola</p>
            {HERO_OUTPUT.map((line) => (
              <p key={line} className="hero__console-line">
                <span className="hero__prompt">›</span>
                {line}
              </p>
            ))}
          </div>
        </figure>
      </header>

      <ul className="stats" aria-label="El dossier en xifres">
        {stats.map((item) => (
          <li key={item.label} className="stats__item">
            <span className="stats__value">{item.value}</span>
            <span className="stats__label">{item.label}</span>
          </li>
        ))}
      </ul>

      <section className="home__section home__project" aria-labelledby="home-projecte">
        <div className="home__project-text">
          <p className="home__kicker eyebrow">El projecte final</p>
          <h2 id="home-projecte">El que construiràs</h2>
          <p>
            Al RA1 vas maquetar amb HTML i CSS una <strong>pàgina tipus YouTube</strong>: la pàgina inicial i la d'un
            vídeo. Es veu bé, però cap botó fa res. En acabar aquest dossier hi afegiràs el JavaScript que la converteix
            en una aplicació. Prova la pàgina de mostra: són dues pàgines, i les canvies amb els botons de dalt.
          </p>
          <ul className="home__features">
            {FEATURES.map((feature) => (
              <li key={feature}>
                <span className="goals__check" aria-hidden="true">
                  <Icon name="check" size={13} />
                </span>
                {feature}
              </li>
            ))}
          </ul>
          <p className="home__note">
            Pel camí, les unitats treballen amb un exemple més petit que creix a poc a poc, un gestor de tasques. Al
            projecte final aplicaràs el mateix a la teva pàgina.
          </p>
          <p>
            <a className="btn btn--secondary" href={unitHref('projecte-final')}>
              Veure el projecte final
              <Icon name="arrowRight" size={17} />
            </a>
          </p>
        </div>
        <div className="home__project-demo">
          <ProjectDemo framed={false} />
        </div>
      </section>

      <section className="home__section" aria-labelledby="home-recorregut">
        <div className="home__intro">
          <p className="home__kicker eyebrow">Pas a pas</p>
          <h2 id="home-recorregut">El recorregut</h2>
          <p>
            Cada unitat comença amb un problema que encara no sabem resoldre i acaba amb una eina nova per al projecte.
            Convé seguir-les en ordre: cada una fa servir el que has après a les anteriors.
          </p>
        </div>
        <ol className="route">
          {units.map((unit) => {
            const status = unitStatus(progress, unit.id);
            const numbers = unitStats(unit);
            return (
              <li key={unit.id}>
                <a className={`route__card route__card--${status}`} href={unitHref(unit.id)}>
                  <span className="route__number" aria-hidden="true">
                    {String(unit.number).padStart(2, '0')}
                  </span>
                  <span className="route__body">
                    <span className="route__title">
                      <span className="sr-only">Unitat {unit.number}: </span>
                      {unit.title}
                    </span>
                    <span className="route__problem">
                      «<RichText text={unit.problem.title} />»
                    </span>
                    <span className="route__meta">
                      <span>{plural(numbers.examples, 'exemple', 'exemples')}</span>
                      <span>{plural(numbers.exercises, 'exercici', 'exercicis')}</span>
                      <span className={`route__status route__status--${status}`}>
                        <Icon name={STATUS_ICONS[status]} size={14} />
                        {STATUS_LABELS[status]}
                      </span>
                    </span>
                  </span>
                  <Icon name="arrowRight" size={18} className="route__arrow" />
                </a>
              </li>
            );
          })}
        </ol>
      </section>

      <section className="home__section" aria-labelledby="home-exercicis">
        <div className="home__intro">
          <p className="home__kicker eyebrow">Només pràctica</p>
          <h2 id="home-exercicis">Exercicis per temes</h2>
          <p>
            Si el que vols és practicar, a la secció d'exercicis hi ha {bankTotal} exercicis sense teoria, agrupats en{' '}
            {topics.length} temes i ordenats de menys a més dificultat. Hi són els de cada unitat i molts de nous.
          </p>
        </div>
        <ul className="practice">
          {topics.map((topic) => {
            const done = doneInTopic(topic, progress.exercises);
            return (
              <li key={topic.id}>
                <a className="practice__link" href={exercisesHref(topic.id)}>
                  <span className="practice__number" aria-hidden="true">
                    {String(topic.number).padStart(2, '0')}
                  </span>
                  <span className="practice__title">{topic.title}</span>
                  <span className="practice__count">
                    {done}/{topic.items.length}
                    <span className="sr-only"> exercicis fets</span>
                  </span>
                </a>
              </li>
            );
          })}
        </ul>
        <p>
          <a className="btn btn--primary" href={exercisesHref()}>
            Ves als exercicis
            <Icon name="arrowRight" size={17} />
          </a>
        </p>
      </section>

      <section className="home__section" aria-labelledby="home-funcionament">
        <div className="home__intro">
          <p className="home__kicker eyebrow">Abans de començar</p>
          <h2 id="home-funcionament">Com llegir aquest dossier</h2>
          <p>
            Cada tipus de caixa té un color, una icona i una etiqueta. Quan n'hagis vist un parell ja les reconeixeràs
            d'un cop d'ull:
          </p>
        </div>
        <ul className="legend">
          {LEGEND.map((item) => (
            <li key={item.name} className={`legend__item legend__item--${item.tone}`}>
              <span className="legend__icon">
                <Icon name={item.icon} size={17} />
              </span>
              <span className="legend__text">
                <strong>{item.name}.</strong> {item.text}
              </span>
            </li>
          ))}
        </ul>
        <p className="home__tip">
          <span className="home__tip-icon" aria-hidden="true">
            <Icon name="bulb" size={18} />
          </span>
          <span>
            Un consell: tingues obert l'editor de codi i el navegador al costat, i{' '}
            <strong>escriu els exemples a mà</strong> al teu propi projecte. Llegir codi i escriure'n són habilitats
            diferents, i la que t'avaluaran és la segona.
          </span>
        </p>
      </section>
    </div>
  );
}
