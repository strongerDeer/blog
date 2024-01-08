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
  const { id, type, label, labelHidden, className, required, ...rest } = props;

  return (
    <div className={styles.wrap}>
      <label className={styles.label} htmlFor={id}>
        {label}
        {required && (
          <>
            {' '}
            *<span className="a11y-hidden">필수</span>
          </>
        )}
      </label>

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
