import { useMemo } from 'react';
import { tokenize } from '../../lib/highlight.js';

// Pinta el codi amb colors. Els colors són una ajuda visual: el text del codi
// és exactament el mateix amb ressaltat o sense.
export default function Highlighted({ code, lang = 'js' }) {
  const tokens = useMemo(() => tokenize(code, lang), [code, lang]);

  return tokens.map((token, index) =>
    token.type === 'plain' ? (
      token.text
    ) : (
      <span key={index} className={`tok tok--${token.type}`}>
        {token.text}
      </span>
    )
  );
}
