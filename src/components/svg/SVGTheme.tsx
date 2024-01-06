import SVG from './SVG';

export default function SVGTheme({ fill }: { fill?: string }) {
  return (
    <SVG width={16} fill={fill}>
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M8.33325 12.1535C10.4786 11.9837 12.1666 10.189 12.1666 8.00001C12.1666 5.81103 10.4786 4.01629 8.33325 3.84648L8.33325 12.1535ZM2.83325 8.00001C2.83325 5.14654 5.14645 2.83334 7.99992 2.83334C10.8534 2.83334 13.1666 5.14654 13.1666 8.00001C13.1666 10.8535 10.8534 13.1667 7.99992 13.1667C5.14645 13.1667 2.83325 10.8535 2.83325 8.00001Z"
      />
    </SVG>
  );
}
