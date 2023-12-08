import SVG from './SVG';

export default function SVGTalk({ fill = '#28303F' }: { fill?: string }) {
  return (
    <SVG width={24} fill={fill}>
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M7 3.75C4.65279 3.75 2.75 5.65279 2.75 8V20.9194C2.75 21.129 2.99248 21.2455 3.15617 21.1146L5.98365 18.8526C6.47126 18.4625 7.07712 18.25 7.70156 18.25H17C19.3472 18.25 21.25 16.3472 21.25 14V8C21.25 5.65279 19.3472 3.75 17 3.75H7ZM1.25 8C1.25 4.82436 3.82436 2.25 7 2.25H17C20.1756 2.25 22.75 4.82436 22.75 8V14C22.75 17.1756 20.1756 19.75 17 19.75H7.70156C7.41772 19.75 7.14233 19.8466 6.92069 20.0239L4.09322 22.2859C2.94738 23.2026 1.25 22.3868 1.25 20.9194V8Z"
      />
      <path d="M8.30005 11.0498C8.30005 11.7402 7.7404 12.2998 7.05005 12.2998C6.35969 12.2998 5.80005 11.7402 5.80005 11.0498C5.80005 10.3594 6.35969 9.7998 7.05005 9.7998C7.7404 9.7998 8.30005 10.3594 8.30005 11.0498Z" />
      <path d="M13.3 11.0498C13.3 11.7402 12.7404 12.2998 12.05 12.2998C11.3597 12.2998 10.8 11.7402 10.8 11.0498C10.8 10.3594 11.3597 9.7998 12.05 9.7998C12.7404 9.7998 13.3 10.3594 13.3 11.0498Z" />
      <path d="M18.3 11.0498C18.3 11.7402 17.7404 12.2998 17.05 12.2998C16.3597 12.2998 15.8 11.7402 15.8 11.0498C15.8 10.3594 16.3597 9.7998 17.05 9.7998C17.7404 9.7998 18.3 10.3594 18.3 11.0498Z" />
    </SVG>
  );
}