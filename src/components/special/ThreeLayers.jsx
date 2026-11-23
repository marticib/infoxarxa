import { useState } from 'react';

const INITIAL_TASKS = ['Estudiar JavaScript'];

// Demostració de les tres capes: la mateixa pàgina amb només HTML, amb CSS i
// amb JavaScript. Mostra per què un botó «no fa res» fins que hi ha codi.
export default function ThreeLayers() {
  const [css, setCss] = useState(false);
  const [js, setJs] = useState(false);
  const [tasks, setTasks] = useState(INITIAL_TASKS);
  const [clicked, setClicked] = useState(false);

  function handleClick() {
    setClicked(true);
    if (js) setTasks((previous) => [...previous, `Tasca nova ${previous.length}`]);
  }

  function toggleJs(checked) {
    setJs(checked);
    setClicked(false);
    setTasks(INITIAL_TASKS);
  }

  let message = 'Només HTML: el contingut hi és (un títol, una llista, un botó), però sense aspecte ni comportament.';
  if (css && !js) message = 'HTML + CSS: ara la pàgina té bon aspecte, però continua sent estàtica.';
  if (!css && js) message = 'HTML + JavaScript: la pàgina respon, encara que sense estils.';
  if (css && js) message = 'HTML + CSS + JavaScript: contingut, aspecte i comportament.';
  if (clicked && !js) {
    message = 'Has premut el botó i no ha passat res: l\'HTML diu que hi ha un botó, però ningú ha explicat què ha de fer.';
  }
  if (clicked && js) message = 'JavaScript ha reaccionat al clic i ha afegit una tasca a la llista.';

  return (
    <div className="special layers">
      <p className="special__title">Prova-ho: activa i desactiva cada capa</p>

      <div className="layers__controls" role="group" aria-label="Capes de la pàgina">
        <label className="layers__switch layers__switch--html">
          <input type="checkbox" checked disabled readOnly />
          <span>
            <strong>HTML</strong> · contingut (sempre hi és)
          </span>
        </label>
        <label className="layers__switch layers__switch--css">
          <input type="checkbox" checked={css} onChange={(event) => setCss(event.target.checked)} />
          <span>
            <strong>CSS</strong> · aspecte
          </span>
        </label>
        <label className="layers__switch layers__switch--js">
          <input type="checkbox" checked={js} onChange={(event) => toggleJs(event.target.checked)} />
          <span>
            <strong>JavaScript</strong> · comportament
          </span>
        </label>
      </div>

      <div className={`layers__page ${css ? 'layers__page--styled' : 'layers__page--raw'}`}>
        <p className="layers__heading">Les meves tasques</p>
        <ul className="layers__list">
          {tasks.map((task, index) => (
            <li key={index}>{task}</li>
          ))}
        </ul>
        <button type="button" className="layers__button" onClick={handleClick}>
          Afegeix una tasca
        </button>
      </div>

      <p className="special__status" aria-live="polite">
        {message}
      </p>
    </div>
  );
}
