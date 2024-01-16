import SVG from './SVG';

export default function SVGClose({ fill }: { fill?: string }) {
  return (
    <SVG width={16} fill={fill}>
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M12.5305 4.53036C12.8234 4.23747 12.8234 3.76259 12.5305 3.4697C12.2376 3.17681 11.7627 3.17681 11.4698 3.4697L8.00005 6.93946L4.53033 3.46974C4.23744 3.17685 3.76256 3.17685 3.46967 3.46974C3.17678 3.76263 3.17678 4.23751 3.46967 4.5304L6.93939 8.00012L3.4698 11.4697C3.17691 11.7626 3.17691 12.2375 3.4698 12.5304C3.7627 12.8233 4.23757 12.8233 4.53046 12.5304L8.00005 9.06078L11.4697 12.5304C11.7626 12.8233 12.2374 12.8233 12.5303 12.5304C12.8232 12.2375 12.8232 11.7626 12.5303 11.4697L9.06071 8.00012L12.5305 4.53036Z"
      />
    </SVG>
  );
}