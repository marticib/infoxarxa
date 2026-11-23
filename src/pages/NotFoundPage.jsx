import Icon from '../components/ui/Icon.jsx';
import { homeHref } from '../lib/router.js';
import { openSearch } from '../lib/searchIndex.js';

export default function NotFoundPage() {
  return (
    <article className="page notfound">
      <p className="notfound__code" aria-hidden="true">
        404
      </p>
      <header className="lesson__header">
        <p className="lesson__eyebrow eyebrow">Error 404</p>
        <h1 className="lesson__title" tabIndex={-1} data-page-title>
          Aquesta pàgina no existeix
        </h1>
        <p className="lesson__lead">
          L'adreça no correspon a cap unitat del dossier. Potser l'enllaç és antic o hi ha alguna lletra equivocada.
        </p>
      </header>

      <p className="error-message notfound__message">
        <span className="error-message__label">
          <Icon name="terminal" size={15} />
          Si fos un error de JavaScript
        </span>
        <code>Uncaught ReferenceError: pagina is not defined</code>
      </p>

      <div className="notfound__actions">
        <a className="btn btn--primary" href={homeHref}>
          <Icon name="home" size={17} />
          Torna a l'inici
        </a>
        <button type="button" className="btn btn--secondary" onClick={openSearch}>
          <Icon name="search" size={17} />
          Cerca al dossier
        </button>
      </div>
    </article>
  );
}
