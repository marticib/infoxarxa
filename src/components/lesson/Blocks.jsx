import CodeBlock from '../code/CodeBlock.jsx';
import RunnableExample from '../code/RunnableExample.jsx';
import ExerciseCard from './ExerciseCard.jsx';
import { CommonError, CompareBlock, ConceptCard, DataTable, ProjectStep, WarningBox } from './Callouts.jsx';
import RichText from '../ui/RichText.jsx';
import { specialComponents } from '../special/index.js';

// Tradueix cada bloc de contingut (vegeu content/blocks.js) al seu component.
function Block({ block }) {
  switch (block.type) {
    case 'p':
      return (
        <p>
          <RichText text={block.text} />
        </p>
      );

    case 'subtitle':
      return (
        <h3 className="lesson-subtitle">
          <RichText text={block.text} />
        </h3>
      );

    case 'list': {
      const Tag = block.ordered ? 'ol' : 'ul';
      return (
        <Tag className="lesson-list">
          {block.items.map((item, index) => (
            <li key={index}>
              <RichText text={item} />
            </li>
          ))}
        </Tag>
      );
    }

    case 'code':
      return <CodeBlock code={block.code} lang={block.lang} title={block.title} />;

    case 'example':
      return <RunnableExample {...block} />;

    case 'concept':
      return <ConceptCard title={block.title} text={block.text} />;

    case 'warning':
      return <WarningBox title={block.title} text={block.text} />;

    case 'error':
      return <CommonError {...block} />;

    case 'challenge':
      return <ExerciseCard exercise={block} variant="challenge" />;

    case 'project':
      return <ProjectStep title={block.title} text={block.text} code={block.code} lang={block.lang} />;

    case 'table':
      return <DataTable headers={block.headers} rows={block.rows} caption={block.caption} />;

    case 'compare':
      return <CompareBlock items={block.items} />;

    case 'custom': {
      const Component = specialComponents[block.component];
      return Component ? <Component {...block.props} /> : null;
    }

    default:
      return null;
  }
}

export default function Blocks({ blocks }) {
  return blocks.map((block, index) => <Block key={index} block={block} />);
}
