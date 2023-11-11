import SVG from './SVG';

export default function SVGThemeDark({ fill = '#28303F' }: { fill?: string }) {
  return (
    <SVG width={16} fill={fill}>
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M7.38024 3.33971C5.33529 3.9029 3.83325 5.77604 3.83325 7.99999C3.83325 10.6694 5.99721 12.8333 8.66658 12.8333C9.77918 12.8333 10.8041 12.4576 11.6213 11.8254C11.5259 11.8307 11.4299 11.8333 11.3333 11.8333C8.47978 11.8333 6.16659 9.52013 6.16659 6.66666C6.16659 5.39904 6.62323 4.2383 7.38024 3.33971ZM2.83325 7.99999C2.83325 4.77833 5.44492 2.16666 8.66658 2.16666C8.75878 2.16666 8.85052 2.1688 8.94175 2.17304C9.16155 2.18326 9.34883 2.33598 9.40308 2.54922C9.45734 2.76247 9.3658 2.98612 9.17761 3.10014C7.97107 3.83114 7.16659 5.15518 7.16659 6.66666C7.16659 8.96784 9.03206 10.8333 11.3333 10.8333C11.8856 10.8333 12.4116 10.7261 12.8926 10.5319C13.0968 10.4494 13.3308 10.5102 13.4691 10.6816C13.6073 10.853 13.6171 11.0946 13.4933 11.2766C12.4446 12.8187 10.6742 13.8333 8.66658 13.8333C5.44492 13.8333 2.83325 11.2217 2.83325 7.99999Z"
      />
    </SVG>
  );
}
