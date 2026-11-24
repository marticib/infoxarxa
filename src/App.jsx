import { useEffect, useRef } from 'react';
import Layout from './components/layout/Layout.jsx';
import LessonPage from './components/lesson/LessonPage.jsx';
import PortalPage from './pages/PortalPage.jsx';
import HomePage from './pages/HomePage.jsx';
import GlossaryPage from './pages/GlossaryPage.jsx';
import ExercisesPage from './pages/ExercisesPage.jsx';
import ExerciseTopicPage from './pages/ExerciseTopicPage.jsx';
import NotFoundPage from './pages/NotFoundPage.jsx';
import { courseById, topicById, unitById } from './lib/courses.js';
import { useHashRoute } from './lib/router.js';
import { CourseProvider } from './state/CourseContext.jsx';

const SITE_TITLE = 'Dossiers interactius';

export default function App() {
  const route = useHashRoute();
  const course = route.courseId ? courseById(route.courseId) : null;
  const unit = route.page === 'unit' && route.unitId ? unitById(route.unitId) : null;
  const topic = route.page === 'exercises' && route.unitId ? topicById(route.unitId) : null;
  const hasSubpage = route.page === 'unit' || route.page === 'exercises';
  const pageKey = `${route.courseId ?? ''}:${hasSubpage ? `${route.page}:${route.unitId ?? ''}` : route.page}`;
  const isFirstRender = useRef(true);

  let title = 'Inici';
  let eyebrow = null;
  let content = <PortalPage />;

  if (unit) {
    title = unit.title;
    eyebrow = `${course.code} · Unitat ${unit.number}`;
    content = <LessonPage key={unit.id} unit={unit} anchor={route.anchor} />;
  } else if (topic) {
    title = topic.title;
    eyebrow = `${course.code} · Exercicis · Tema ${topic.number}`;
    content = <ExerciseTopicPage key={topic.id} topic={topic} anchor={route.anchor} />;
  } else if (course && route.page === 'exercises' && !route.unitId) {
    title = 'Exercicis';
    eyebrow = course.code;
    content = <ExercisesPage />;
  } else if (course && route.page === 'glossary') {
    title = 'Glossari';
    eyebrow = course.code;
    content = <GlossaryPage key={course.id} initialQuery={route.anchor} />;
  } else if (course && route.page === 'home') {
    title = course.title;
    eyebrow = course.code;
    content = <HomePage key={course.id} />;
  } else if (route.page !== 'portal') {
    title = 'Pàgina no trobada';
    content = <NotFoundPage />;
  }

  // En canviar de pàgina: títol del document, scroll a dalt i focus al títol,
  // perquè qui navega amb teclat o lector de pantalla sàpiga on és.
  useEffect(() => {
    const site = course ? `${course.title} · Dossier interactiu ${course.code}` : SITE_TITLE;
    if (route.page === 'portal') document.title = `${SITE_TITLE} · HTML, CSS i JavaScript`;
    else if (course && route.page === 'home') document.title = site;
    else document.title = `${title} · ${course ? course.title : SITE_TITLE}`;

    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    // Els enllaços a un apartat (#/ra2/unitat/x/apartat) o a un exercici els situa la mateixa pàgina.
    if (!(hasSubpage && route.anchor)) window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
    document.querySelector('[data-page-title]')?.focus({ preventScroll: true });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pageKey]);

  return (
    <CourseProvider value={course}>
      <Layout route={route} title={title} eyebrow={eyebrow}>
        {content}
      </Layout>
    </CourseProvider>
  );
}
