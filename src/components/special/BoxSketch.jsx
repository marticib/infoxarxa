import { useId, useState } from 'react';
import CodeBlock from '../code/CodeBlock.jsx';
import Icon from '../ui/Icon.jsx';
import RichText from '../ui/RichText.jsx';

// El dibuix de quadrats d'una pàgina, que es va detallant pas a pas: primer
// els blocs grans, després el que hi ha dins de cada un. És el que es faria
// amb paper i llapis abans d'escriure cap línia d'HTML.
//
// `tree` és un arbre de caixes:
//   { name, tag, dir, cols, grow, basis, h, children }
//     name      el nom que es veu al dibuix («capçalera»)
//     tag       l'etiqueta i la classe en què es converteix («header.capcalera»);
//               si no es diu, és un div amb el nom com a classe
//     dir       com es col·loquen els fills: 'column' (per defecte), 'row' o 'grid'
//     cols      columnes de la graella (amb dir: 'grid')
//     grow      quina part de l'espai que sobra es queda (per defecte 1 dins d'una fila)
//     basis     amplada fixa dins d'una fila, o alçada fixa dins d'una columna («180px»)
//     h         alçada mínima en píxels de les caixes sense fills
//     virtual   true: és un quadrat que ajuda a pensar però no arriba a ser
//               cap element; a l'HTML, els seus fills pengen directament del pare
// `steps` són les explicacions de cada nivell de detall.

const DIRECTIONS = {
  row: { label: 'fila', icon: 'arrowRight' },
  column: { label: 'columna', icon: 'arrowDown' },
  grid: { label: 'graella', icon: 'boxes' },
};

// Elements que no tenen contingut ni etiqueta de tancament.
const VOID_TAGS = new Set(['img', 'input', 'br', 'hr']);

const depthOf = (node) => (node.children?.length ? 1 + Math.max(...node.children.map(depthOf)) : 0);

function parseTag(node) {
  const fallback = `div.${node.name
    .toLowerCase()
    .normalize('NFD')
    .replace(/\p{M}/gu, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '')}`;
  const [tag, className] = (node.tag ?? fallback).split('.');
  return { tag, className };
}

// L'HTML que correspon al dibuix, fins al nivell que s'està mostrant.
function toHtml(node, depth, level, indent = '') {
  if (node.virtual) {
    if (!node.children?.length || depth >= level) return `${indent}<!-- ${node.name} -->`;
    return node.children.map((child) => toHtml(child, depth + 1, level, indent)).join('\n');
  }
  const { tag, className } = parseTag(node);
  const open = `<${tag}${className ? ` class="${className}"` : ''}>`;
  if (VOID_TAGS.has(tag)) return `${indent}${open}`;
  const close = `</${tag}>`;
  if (!node.children?.length || depth >= level) return `${indent}${open}…${close}`;
  const inner = node.children.map((child) => toHtml(child, depth + 1, level, `${indent}  `)).join('\n');
  return `${indent}${open}\n${inner}\n${indent}${close}`;
}

function Box({ node, depth, level, parentDir }) {
  const open = Boolean(node.children?.length) && depth < level;
  const dir = node.dir ?? 'column';
  const style = {};

  if (parentDir === 'row') {
    if (node.basis) style.flex = `0 0 ${node.basis}`;
    else style.flex = `${node.grow ?? 1} 1 0`;
  } else if (parentDir === 'column' && node.basis) {
    style.height = node.basis;
  }
  if (!open) style.minHeight = node.h ?? 34;

  return (
    <div
      className={`sketch__box sketch__box--d${depth % 6}${open ? ' sketch__box--open' : ''}${node.virtual ? ' sketch__box--virtual' : ''}`}
      style={style}
    >
      <span className="sketch__name">
        {node.name}
        {open ? (
          <span className="sketch__dir">
            <Icon name={DIRECTIONS[dir].icon} size={11} />
            {DIRECTIONS[dir].label}
          </span>
        ) : null}
      </span>
      {open ? (
        <div
          className={`sketch__children sketch__children--${dir}`}
          style={dir === 'grid' ? { gridTemplateColumns: `repeat(${node.cols ?? 2}, minmax(0, 1fr))` } : undefined}
        >
          {node.children.map((child, index) => (
            <Box key={index} node={child} depth={depth + 1} level={level} parentDir={dir} />
          ))}
        </div>
      ) : null}
    </div>
  );
}

export default function BoxSketch({ title = 'Del disseny als quadrats', intro, tree, steps = [], showCode = true, startLevel = 1 }) {
  const maxLevel = Math.max(1, depthOf(tree));
  const [level, setLevel] = useState(Math.min(startLevel, maxLevel));
  const statusId = useId();
  const caption = steps[level - 1];

  return (
    <div className="special sketch">
      <p className="special__title">{title}</p>
      {intro ? (
        <p>
          <RichText text={intro} />
        </p>
      ) : null}

      <div className={`sketch__layout${showCode ? '' : ' sketch__layout--solo'}`}>
        {/* El dibuix és decoratiu: el mateix contingut es pot llegir a l'HTML del costat. */}
        <div className="sketch__canvas" aria-hidden="true">
          <Box node={tree} depth={0} level={level} parentDir={null} />
        </div>

        {showCode ? <CodeBlock code={toHtml(tree, 0, level)} lang="html" title="El mateix dibuix, en HTML" /> : null}
      </div>

      <div className="special__status" id={statusId} role="status">
        <span className="special__step">
          Nivell de detall {level} de {maxLevel}
        </span>
        {caption ? (
          <span>
            <RichText text={caption} />
          </span>
        ) : null}
      </div>

      <div className="special__actions">
        <button
          type="button"
          className="btn btn--secondary"
          disabled={level <= 1}
          aria-describedby={statusId}
          onClick={() => setLevel((value) => Math.max(1, value - 1))}
        >
          Menys detall
        </button>
        <button
          type="button"
          className="btn btn--primary"
          disabled={level >= maxLevel}
          aria-describedby={statusId}
          onClick={() => setLevel((value) => Math.min(maxLevel, value + 1))}
        >
          Obre els quadrats
          <Icon name="arrowRight" size={16} />
        </button>
      </div>
    </div>
  );
}
