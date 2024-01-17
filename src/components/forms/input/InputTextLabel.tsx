import classNames from 'classnames';

import styles from './InputTextLabel.module.scss';

interface InputTextLabelProps {
  id?: string;
  type?: string;
  label?: string;
  value?: string;
  setValue?: React.Dispatch<React.SetStateAction<string>>;
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
  const {
    id,
    type,
    label,
    labelHidden,
    className,
    required,
    onChange,
    value,
    setValue,
    ...rest
  } = props;

  const onChangeInputText = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {
      target: { value },
    } = e;

    setValue!(value);
  };

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
        value={value}
        onChange={onChange ? onChange : onChangeInputText}
        {...rest}
      />
    </div>
  );
}
