import type { CSSProperties } from 'react';

/* Conjunto de ícones do mockup de origem: traço 1.5, viewBox 24, pontas e
   junções arredondadas, sem preenchimento. Extraídos verbatim do handoff. */
const ERK_ICONS: Record<string, string[]> = {
  busca: ['circle:11,11,7', 'M20 20l-4.3-4.3'],
  conta: ['circle:12,8,3.6', 'M4.5 20a7.5 7.5 0 0 1 15 0'],
  favorito: ['M12 20.5S3.5 15 3.5 9.2A4.7 4.7 0 0 1 12 6.6a4.7 4.7 0 0 1 8.5 2.6C20.5 15 12 20.5 12 20.5Z'],
  sacola: ['M5.5 8h13l-1 12h-11z', 'M9 8V6.5a3 3 0 0 1 6 0V8'],
  inicio: ['M4 10.5L12 4l8 6.5V20H4z', 'M9.5 20v-5.5h5V20'],
  seta: ['M9 6l6 6-6 6'],
  mais: ['M12 5v14M5 12h14'],
  menos: ['M5 12h14'],
  filtro: ['M4 6h16M7 12h10M10 18h4'],
  grade: ['rect:4,4,6.5,6.5,1.4', 'rect:13.5,4,6.5,6.5,1.4', 'rect:4,13.5,6.5,6.5,1.4', 'rect:13.5,13.5,6.5,6.5,1.4'],
  correntes: ['circle:7.5,7.5,3.1', 'circle:12,12,3.1', 'circle:16.5,16.5,3.1'],
  pulseiras: ['ellipse:12,12.5,7.2,5.2', 'rect:10.2,5.6,3.6,2.6,0.8'],
  aneis: ['circle:12,14,5.6', 'M9.3 7.6L12 4.2l2.7 3.4'],
  pingentes: ['M3.5 7.5h17', 'M12 7.5v3.2', 'circle:12,14.6,3.7'],
  brincos: ['M8.8 6.2a3.2 3.2 0 0 1 6.4 0', 'circle:12,14.6,4.6'],
  conjuntos: ['circle:9,9.8,4.4', 'circle:15.3,14.6,4.4'],
  puncao: ['circle:12,9.5,5.5', 'M9 14.5L8 21l4-2 4 2-1-6.5'],
  garantia: ['M12 3l7 3v5.5c0 4.3-2.9 7.6-7 8.5-4.1-.9-7-4.2-7-8.5V6z', 'M9 12l2 2 4-4'],
  entrega: ['circle:6,17,3', 'circle:18,17,3', 'M9 17h6l-2-8h3M6 9h4'],
  oficina: ['M14 4l6 6-3 3-6-6z', 'M11 7L4 14l3 3 7-7'],
  check: ['circle:12,12,9', 'M8.5 12.3l2.4 2.4 4.6-4.9'],
  fechar: ['M6 6l12 12M18 6L6 18'],
  hamburguer: ['M4 7.5h16M4 12h16M4 16.5h11'],
  voltar: ['M15 5l-7 7 7 7'],
  sair: ['M14 5H6v14h8', 'M13 12h7M17 9l3 3-3 3'],
  perfil: ['circle:12,8.5,3.5', 'M5.5 20c.6-3.4 3.3-5.2 6.5-5.2s5.9 1.8 6.5 5.2'],
};

function shape(d: string, i: number) {
  if (d.startsWith('circle:')) {
    const [cx, cy, r] = d.slice(7).split(',');
    return <circle key={i} cx={cx} cy={cy} r={r} />;
  }
  if (d.startsWith('ellipse:')) {
    const [cx, cy, rx, ry] = d.slice(8).split(',');
    return <ellipse key={i} cx={cx} cy={cy} rx={rx} ry={ry} />;
  }
  if (d.startsWith('rect:')) {
    const [x, y, w, h, r] = d.slice(5).split(',');
    return <rect key={i} x={x} y={y} width={w} height={h} rx={r} />;
  }
  return <path key={i} d={d} />;
}

export function Icon({
  name,
  size,
  style,
  className,
  title,
}: {
  name: string;
  size?: number | string;
  style?: CSSProperties;
  className?: string;
  title?: string;
}) {
  const parts = ERK_ICONS[name] || [];
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden={title ? undefined : true}
      role={title ? 'img' : undefined}
      className={className}
      style={size ? { width: size, height: size, ...style } : style}
    >
      {title ? <title>{title}</title> : null}
      {parts.map(shape)}
    </svg>
  );
}
