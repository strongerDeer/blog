import classNames from 'classnames';

import styles from './InputTextLabel.module.scss';

interface InputTextLabelProps {
  id?: string;
  type?: string;
  label?: string;
  value?: string;
  required?: boolean;
  disabled?: boolean;
  labelHidden?: boolean;
  placeholder?: string;
  className?: string;
  maxLength?: number;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onKeyUp?: (event: React.KeyboardEvent<HTMLInputElement>) => void;
}

export default function InputTextLabel(props: InputTextLabelProps) {
  const { id, type, label, labelHidden, className, ...rest } = props;

  return (
    <div>
      <label htmlFor={id}>{label}</label>

      <input
        className={classNames(styles.input, className)}
        type={type || 'text'}
        id={id}
        name={id}
        {...rest}
      />
    </div>
  );
}
