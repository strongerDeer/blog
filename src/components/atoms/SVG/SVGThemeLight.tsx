import SVG from './SVG';

export default function SVGThemeLight({ fill = '#28303F' }: { fill?: string }) {
  return (
    <SVG width={16} fill={fill}>
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M8 3.83334C7.72386 3.83334 7.5 3.60949 7.5 3.33334V1.33334C7.5 1.0572 7.72386 0.833344 8 0.833344C8.27614 0.833344 8.5 1.0572 8.5 1.33334V3.33334C8.5 3.60949 8.27614 3.83334 8 3.83334ZM8 15.1667C7.72386 15.1667 7.5 14.9428 7.5 14.6667V12.6667C7.5 12.3905 7.72386 12.1667 8 12.1667C8.27614 12.1667 8.5 12.3905 8.5 12.6667V14.6667C8.5 14.9428 8.27614 15.1667 8 15.1667ZM12.6665 7.5C12.3904 7.5 12.1665 7.72386 12.1665 8C12.1665 8.27614 12.3904 8.5 12.6665 8.5L14.6665 8.5C14.9426 8.5 15.1665 8.27614 15.1665 8C15.1665 7.72386 14.9426 7.5 14.6665 7.5H12.6665ZM0.833252 8C0.833252 7.72386 1.05711 7.5 1.33325 7.5H3.33325C3.60939 7.5 3.83325 7.72386 3.83325 8C3.83325 8.27614 3.60939 8.5 3.33325 8.5L1.33325 8.5C1.05711 8.5 0.833252 8.27614 0.833252 8ZM10.9461 4.34661C10.7508 4.54187 10.7508 4.85846 10.9461 5.05372C11.1413 5.24898 11.4579 5.24898 11.6532 5.05372L13.0674 3.6395C13.2627 3.44424 13.2627 3.12766 13.0674 2.9324C12.8721 2.73714 12.5556 2.73714 12.3603 2.9324L10.9461 4.34661ZM2.93241 13.0678C2.73715 12.8725 2.73715 12.5559 2.93241 12.3606L4.34662 10.9464C4.54189 10.7512 4.85847 10.7512 5.05373 10.9464C5.24899 11.1417 5.24899 11.4583 5.05373 11.6535L3.63952 13.0678C3.44426 13.263 3.12767 13.263 2.93241 13.0678ZM4.34664 5.05373C4.5419 5.249 4.85849 5.249 5.05375 5.05373C5.24901 4.85847 5.24901 4.54189 5.05375 4.34663L3.63954 2.93241C3.44427 2.73715 3.12769 2.73715 2.93243 2.93241C2.73717 3.12768 2.73717 3.44426 2.93243 3.63952L4.34664 5.05373ZM13.0674 13.0677C12.8722 13.263 12.5556 13.263 12.3603 13.0677L10.9461 11.6535C10.7508 11.4583 10.7508 11.1417 10.9461 10.9464C11.1414 10.7512 11.4579 10.7512 11.6532 10.9464L13.0674 12.3606C13.2627 12.5559 13.2627 12.8725 13.0674 13.0677ZM9.1665 8.00001C9.1665 7.35568 8.64417 6.83334 7.99984 6.83334C7.3555 6.83334 6.83317 7.35568 6.83317 8.00001C6.83317 8.64434 7.3555 9.16668 7.99984 9.16668C8.64417 9.16668 9.1665 8.64434 9.1665 8.00001ZM7.99984 5.83334C9.19645 5.83334 10.1665 6.80339 10.1665 8.00001C10.1665 9.19663 9.19645 10.1667 7.99984 10.1667C6.80322 10.1667 5.83317 9.19663 5.83317 8.00001C5.83317 6.80339 6.80322 5.83334 7.99984 5.83334Z"
      />
    </SVG>
  );
}
