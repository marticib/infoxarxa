import { useEffect, useRef } from 'react';
import Layout from './components/layout/Layout.jsx';
import LessonPage from './components/lesson/LessonPage.jsx';
import HomePage from './pages/HomePage.jsx';
import GlossaryPage from './pages/GlossaryPage.jsx';
import ExercisesPage from './pages/ExercisesPage.jsx';
import ExerciseTopicPage from './pages/ExerciseTopicPage.jsx';
import NotFoundPage from './pages/NotFoundPage.jsx';
import { units } from './content/index.js';
import { topicById } from './lib/exerciseBank.js';
import { useHashRoute } from './lib/router.js';

const SITE_TITLE = 'JavaScript des de zero';

export default function App() {
  const route = useHashRoute();
  const unit = route.page === 'unit' ? units.find((candidate) => candidate.id === route.unitId) : null;
  const topic = route.page === 'exercises' && route.unitId ? topicById(route.unitId) : null;
  const hasSubpage = route.page === 'unit' || route.page === 'exercises';
  const pageKey = hasSubpage ? `${route.page}:${route.unitId ?? ''}` : route.page;
  const isFirstRender = useRef(true);

  let title = 'Inici';
  let eyebrow = null;
  let content = <HomePage />;

  if (unit) {
    title = unit.title;
    eyebrow = `Unitat ${unit.number}`;
    content = <LessonPage key={unit.id} unit={unit} anchor={route.anchor} />;
  } else if (topic) {
    title = topic.title;
    eyebrow = `Exercicis · Tema ${topic.number}`;
    content = <ExerciseTopicPage key={topic.id} topic={topic} anchor={route.anchor} />;
  } else if (route.page === 'exercises' && !route.unitId) {
    title = 'Exercicis';
    content = <ExercisesPage />;
  } else if (route.page === 'glossary') {
    title = 'Glossari';
    content = <GlossaryPage initialQuery={route.anchor} />;
  } else if (route.page !== 'home') {
    title = 'Pàgina no trobada';
    content = <NotFoundPage />;
  }

  // En canviar de pàgina: títol del document, scroll a dalt i focus al títol,
  // perquè qui navega amb teclat o lector de pantalla sàpiga on és.
  useEffect(() => {
    document.title = title === 'Inici' ? `${SITE_TITLE} · Dossier interactiu RA2` : `${title} · ${SITE_TITLE}`;

    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    // Els enllaços a un apartat (#/unitat/x/apartat) o a un exercici els situa la mateixa pàgina.
    if (!(hasSubpage && route.anchor)) window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
    document.querySelector('[data-page-title]')?.focus({ preventScroll: true });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pageKey]);

  return (
    <Layout route={route} title={title} eyebrow={eyebrow}>
      {content}
    </Layout>
  );
}
