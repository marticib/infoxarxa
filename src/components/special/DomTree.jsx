import { useState } from 'react';
import CodeBlock from '../code/CodeBlock.jsx';
import RichText from '../ui/RichText.jsx';

const HTML = `<body>
  <h1 id="titol">Tasques</h1>
  <ul class="llista">
    <li class="tasca">Estudiar</li>
    <li class="tasca completada">Comprar</li>
  </ul>
  <button id="afegir">Afegeix</button>
</body>`;

// Cada node: on és a l'HTML, com el trobaríem i una nota.
const NODES = [
  {
    id: 'body',
    label: 'body',
    depth: 0,
    lines: [1, 8],
    selector: 'document.body',
    note: 'L\'arrel de tot el que es veu a la pàgina. Tots els altres elements en pengen.',
  },
  {
    id: 'h1',
    label: 'h1#titol',
    depth: 1,
    lines: [2],
    selector: 'document.querySelector("#titol")',
    note: 'El coixinet (`#`) busca per `id`, igual que a CSS.',
  },
  {
    id: 'ul',
    label: 'ul.llista',
    depth: 1,
    lines: [3, 4, 5, 6],
    selector: 'document.querySelector(".llista")',
    note: 'El punt (`.`) busca per classe. Aquest element és el **pare** dels dos `<li>`.',
  },
  {
    id: 'li1',
    label: 'li.tasca',
    depth: 2,
    lines: [4],
    selector: 'document.querySelector(".tasca")',
    note: '`querySelector` retorna **només el primer** element que coincideix, encara que n\'hi hagi més.',
  },
  {
    id: 'li2',
    label: 'li.tasca.completada',
    depth: 2,
    lines: [5],
    selector: 'document.querySelector(".completada")',
    note: 'Per obtenir els dos `<li>` alhora faríem `document.querySelectorAll(".tasca")`.',
  },
  {
    id: 'button',
    label: 'button#afegir',
    depth: 1,
    lines: [7],
    selector: 'document.querySelector("#afegir")',
    note: 'També el podríem trobar amb `document.querySelector("button")`, perquè és l\'únic botó.',
  },
];

// L'HTML a l'esquerra i l'arbre que en construeix el navegador a la dreta.
export default function DomTree() {
  const [activeId, setActiveId] = useState('h1');
  const active = NODES.find((node) => node.id === activeId);

  return (
    <div className="special domtree">
      <p className="special__title">De l'HTML a l'arbre: tria un node</p>

      <div className="domtree__grid">
        <CodeBlock code={HTML} lang="html" title="L'HTML que has escrit" highlightLines={active.lines} />

        <div className="domtree__tree">
          <p className="domtree__caption">L'arbre que construeix el navegador (DOM)</p>
          <p className="domtree__root">
            <code>document</code>
          </p>
          <ul className="domtree__nodes" aria-label="Nodes del DOM">
            {NODES.map((node) => (
              <li key={node.id} style={{ '--depth': node.depth }}>
                <button
                  type="button"
                  className="domtree__node"
                  aria-pressed={node.id === activeId}
                  onClick={() => setActiveId(node.id)}
                >
                  {node.label}
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="special__status" aria-live="polite">
        <p>
          Per obtenir-lo des de JavaScript: <code>{active.selector}</code>
        </p>
        <p>
          <RichText text={active.note} />
        </p>
      </div>
    </div>
  );
}
