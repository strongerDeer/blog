interface SVGProps {
  children: any;
  width: number;
  height?: number;
  fill?: string;
}
export default function SVG({
  children,
  width,
  height = width,
  fill = 'text-primary',
}: SVGProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      viewBox={`0 0 ${width} ${height}`}
      fill={`var(--${fill})`}>
      {children}
    </svg>
  );
}
