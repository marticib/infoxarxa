// Icones SVG en línia (sense dependències). Són decoratives: el text que les
// acompanya és el que dona el significat, per això porten aria-hidden.

const ICONS = {
  menu: <path d="M4 6h16M4 12h16M4 18h16" />,
  expand: <path d="M4 9V4h5M15 4h5v5M20 15v5h-5M9 20H4v-5" />,
  compress: <path d="M9 4v5H4M20 9h-5V4M15 20v-5h5M4 15h5v5" />,
  close: <path d="M6 6l12 12M18 6L6 18" />,
  boxes: (
    <>
      <rect x="3.5" y="3.5" width="17" height="17" rx="2" strokeDasharray="3 2.4" />
      <rect x="7" y="7.5" width="4" height="9" rx="1" />
      <rect x="13" y="7.5" width="4" height="4" rx="1" />
    </>
  ),
  arrowDown: <path d="M12 5v14M6 13l6 6 6-6" />,
  sun: (
    <>
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" />
    </>
  ),
  moon: <path d="M20.5 13.5A8.5 8.5 0 1 1 10.5 3.5a7 7 0 0 0 10 10z" />,
  check: <path d="M5 12.5l4.5 4.5L19 7.5" />,
  play: <path d="M7.5 5v14l11-7z" fill="currentColor" stroke="none" />,
  reset: <path d="M4 12a8 8 0 1 0 2.6-5.9M4 4.5v4.5h4.5" />,
  bulb: (
    <path d="M9.5 18.5h5M10.5 21.5h3M12 3a6 6 0 0 0-3.7 10.7c.8.6 1.2 1.5 1.2 2.3h5c0-.8.4-1.7 1.2-2.3A6 6 0 0 0 12 3z" />
  ),
  eye: (
    <>
      <path d="M2.5 12S6 5.5 12 5.5 21.5 12 21.5 12 18 18.5 12 18.5 2.5 12 2.5 12z" />
      <circle cx="12" cy="12" r="3" />
    </>
  ),
  warning: <path d="M12 4L2.8 19.5h18.4L12 4zM12 10v4.5M12 17v.01" />,
  error: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M9 9l6 6M15 9l-6 6" />
    </>
  ),
  info: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 11v5.5M12 7.5v.01" />
    </>
  ),
  book: <path d="M4 5a2 2 0 0 1 2-2h14v15H6a2 2 0 0 0-2 2V5zM4 20a2 2 0 0 0 2 2h14M8.5 8h7" />,
  flag: <path d="M5 21V4h12l-2.5 4 2.5 4H5" />,
  layers: <path d="M12 3l9 5-9 5-9-5 9-5zM3 12.5l9 5 9-5M3 17l9 5 9-5" />,
  chevronLeft: <path d="M15 6l-6 6 6 6" />,
  chevronRight: <path d="M9 6l6 6-6 6" />,
  chevronDown: <path d="M6 9l6 6 6-6" />,
  code: <path d="M8 7l-5 5 5 5M16 7l5 5-5 5" />,
  copy: (
    <>
      <rect x="9" y="9" width="11" height="11" rx="2" />
      <path d="M5 15V6a2 2 0 0 1 2-2h9" />
    </>
  ),
  search: (
    <>
      <circle cx="11" cy="11" r="6.5" />
      <path d="M20 20l-4.2-4.2" />
    </>
  ),
  circle: <circle cx="12" cy="12" r="8" />,
  half: (
    <>
      <circle cx="12" cy="12" r="8" />
      <path d="M12 4a8 8 0 0 1 0 16z" fill="currentColor" stroke="none" />
    </>
  ),
  pencil: <path d="M4 20h4L19.5 8.5l-4-4L4 16v4zM13.5 6.5l4 4" />,
  quiz: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M9.5 9.5a2.5 2.5 0 1 1 3.6 2.2c-.7.4-1.1.9-1.1 1.8M12 17v.01" />
    </>
  ),
  home: <path d="M4 11l8-7 8 7v9h-5.5v-6h-5v6H4v-9z" />,
  list: <path d="M9 6h11M9 12h11M9 18h11M4.5 6v.01M4.5 12v.01M4.5 18v.01" />,
  arrowRight: <path d="M5 12h14M13 6l6 6-6 6" />,
  star: <path d="M12 3.5l2.6 5.4 5.9.8-4.3 4.1 1 5.9L12 16.9l-5.2 2.8 1-5.9-4.3-4.1 5.9-.8L12 3.5z" />,
  target: (
    <>
      <circle cx="12" cy="12" r="9" />
      <circle cx="12" cy="12" r="4.5" />
      <path d="M12 12v.01" />
    </>
  ),
  hash: <path d="M9.5 4L7.5 20M16.5 4l-2 16M4.5 9h16M3.5 15h16" />,
  arrowUp: <path d="M12 19V5M6 11l6-6 6 6" />,
  enter: <path d="M19 5v7a3 3 0 0 1-3 3H5M9 11l-4 4 4 4" />,
  terminal: (
    <>
      <rect x="3" y="4.5" width="18" height="15" rx="2.5" />
      <path d="M7.5 10l3 2.5-3 2.5M13 15h3.5" />
    </>
  ),
  cursor: <path d="M5 4l5.5 15 2.3-6.2L19 10.5 5 4z" />,
  trophy: (
    <path d="M8 4h8v5a4 4 0 0 1-8 0V4zM8 6H4.5v1a3 3 0 0 0 3.5 3M16 6h3.5v1a3 3 0 0 1-3.5 3M12 13v4M8.5 20h7M10 17h4" />
  ),
};

export default function Icon({ name, size = 20, className = '' }) {
  const shape = ICONS[name];
  if (!shape) return null;
  return (
    <svg
      className={`icon ${className}`.trim()}
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
    >
      {shape}
    </svg>
  );
}
