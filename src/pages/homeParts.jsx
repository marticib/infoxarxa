import Highlighted from '../components/code/Highlighted.jsx';
import PageDemo from '../components/special/PageDemo.jsx';
import ProjectDemo from '../components/special/ProjectDemo.jsx';

// Les dues peces de la portada d'un dossier que no són text: la il·lustració
// de la capçalera i la demostració del projecte final. La resta surt de
// `course.home` (vegeu content/ra1/index.js i content/ra2/index.js).

// Programa de mostra: fa servir el mateix que s'aprèn al dossier.
const JS_CODE = [
  'const tasques = [',
  '  "Aprendre JavaScript",',
  '  "Fer el projecte",',
  '];',
  '',
  'for (const tasca of tasques) {',
  '  console.log(`Pendent: ${tasca}`);',
  '}',
].join('\n');
const JS_OUTPUT = ['Pendent: Aprendre JavaScript', 'Pendent: Fer el projecte'];

function Ra2Figure() {
  return (
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
          <Highlighted code={JS_CODE} lang="js" />
        </code>
      </pre>
      <div className="hero__console">
        <p className="hero__console-title">Consola</p>
        {JS_OUTPUT.map((line) => (
          <p key={line} className="hero__console-line">
            <span className="hero__prompt">›</span>
            {line}
          </p>
        ))}
      </div>
    </figure>
  );
}

// Una pàgina dibuixada amb quadrats: és la idea central del dossier d'HTML i CSS.
function Ra1Figure() {
  return (
    <figure
      className="hero__window sketch"
      role="img"
      aria-label="El dibuix d'una pàgina web fet amb quadrats: una capçalera amb el logo, el cercador i el perfil en fila i, a sota, un menú lateral al costat d'una graella de sis vídeos."
    >
      <div className="hero__window-bar">
        <span className="preview__dots" />
        <span>index.html</span>
      </div>
      <div className="hero__sketch">
        <div className="sketch__box sketch__box--d0 sketch__box--open">
          <span className="sketch__name">pàgina</span>
          <div className="sketch__children sketch__children--column">
            <div className="sketch__box sketch__box--d1 sketch__box--open">
              <span className="sketch__name">capçalera</span>
              <div className="sketch__children">
                <div className="sketch__box sketch__box--d2" style={{ flex: '0 0 22%' }}>
                  <span className="sketch__name">logo</span>
                </div>
                <div className="sketch__box sketch__box--d2" style={{ flex: '1 1 0' }}>
                  <span className="sketch__name">cercador</span>
                </div>
                <div className="sketch__box sketch__box--d2" style={{ flex: '0 0 20%' }}>
                  <span className="sketch__name">perfil</span>
                </div>
              </div>
            </div>
            <div className="sketch__children">
              <div className="sketch__box sketch__box--d1" style={{ flex: '0 0 24%' }}>
                <span className="sketch__name">menú</span>
              </div>
              <div className="sketch__box sketch__box--d1 sketch__box--open" style={{ flex: '1 1 0' }}>
                <span className="sketch__name">graella</span>
                <div className="sketch__children sketch__children--grid hero__sketch-grid">
                  {[1, 2, 3, 4, 5, 6].map((number) => (
                    <div key={number} className="sketch__box sketch__box--d2">
                      <span className="sketch__name">vídeo</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </figure>
  );
}

export const HOME_PARTS = {
  ra1: {
    Figure: Ra1Figure,
    Demo: () => <PageDemo framed={false} />,
  },
  ra2: {
    Figure: Ra2Figure,
    Demo: () => <ProjectDemo framed={false} />,
  },
};
