import Icon from '../ui/Icon.jsx';
import { useCourse } from '../../state/CourseContext.jsx';
import { isProjectDone, useProgress } from '../../state/ProgressContext.jsx';

function CheckGroup({ title, items, checks, onChange }) {
  return (
    <fieldset className="checklist__group">
      <legend className="checklist__legend">{title}</legend>
      <ul className="checklist__list">
        {items.map((item) => (
          <li key={item.id}>
            <label className="checklist__item">
              <input
                type="checkbox"
                checked={Boolean(checks[item.id])}
                onChange={(event) => onChange(item.id, event.target.checked)}
              />
              <span>{item.text}</span>
            </label>
          </li>
        ))}
      </ul>
    </fieldset>
  );
}

// Llista de comprovació del projecte final. Es desa amb la resta del progrés.
export default function ProjectChecklist() {
  const { progress, setProjectCheck } = useProgress();
  const course = useCourse();
  const { checklist: projectChecklist, requiredItems } = course;
  const projectDone = isProjectDone(course, progress);
  const checks = progress.projectChecks;
  const total = requiredItems.length;
  const done = requiredItems.filter((item) => checks[item.id]).length;
  const missing = total - done;

  return (
    <div className="special checklist">
      <p className="special__title">Llista de comprovació del teu projecte</p>
      <p>
        Marca cada funcionalitat quan l'hagis provada <strong>al teu projecte</strong>, no només llegida. Les marques
        es desen en aquest navegador.
      </p>

      {projectChecklist.map((group) => {
        const groupDone = group.items.filter((item) => checks[item.id]).length;
        const title = group.required
          ? `${group.title} (${groupDone} de ${group.items.length})`
          : `${group.title} (opcionals)`;
        return <CheckGroup key={group.id} title={title} items={group.items} checks={checks} onChange={setProjectCheck} />;
      })}

      <p className={`checklist__status${projectDone ? ' checklist__status--done' : ''}`} role="status">
        <Icon name={projectDone ? 'star' : 'info'} size={18} />
        {projectDone
          ? course.projectDoneText
          : missing === 1
            ? 'Et falta 1 funcionalitat mínima per donar el projecte per completat.'
            : `Et falten ${missing} funcionalitats mínimes per donar el projecte per completat.`}
      </p>
    </div>
  );
}
