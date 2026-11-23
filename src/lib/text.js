// Utilitats de text compartides pel cercador, el glossari i el format en línia.

// Sintaxi mínima del text dels apunts (vegeu components/ui/RichText.jsx).
export const INLINE_PATTERN =
  /``\s?([\s\S]+?)\s?``|`([^`]+)`|\*\*([\s\S]+?)\*\*|\*([^*]+)\*|\[([^\]]+)\]\(([^)]+)\)/g;

// Treu les marques de format i deixa només el text: «**hola** `x`» → «hola x».
export function stripMarkup(text) {
  if (!text) return '';
  return text.replace(new RegExp(INLINE_PATTERN.source, 'g'), (match, code2, code1, bold, italic, link) =>
    code2 ?? code1 ?? stripMarkup(bold ?? italic ?? link)
  );
}

// Per comparar text sense que hi influeixin majúscules ni accents.
export function normalize(text) {
  return text
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '');
}
