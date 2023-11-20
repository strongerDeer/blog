import styles from './Form.module.scss';

interface InputTextLabelProps {
  id?: string;
  type?: string;
  label?: string;
  value?: string;
  onChange?: any;
  required?: boolean;
  disabled?: boolean;
}

export default function InputTextLabel({
  id,
  type,
  label,
  value,
  onChange,
  required,
  disabled,
}: InputTextLabelProps) {
  return (
    <div className={styles.wrap}>
      <label className={styles.label} htmlFor={id}>
        {label}
      </label>
      <input
        className={styles.input}
        type={type ?? 'text'}
        id={id}
        name={id}
        value={value}
        onChange={onChange}
        required={required}
        disabled={disabled}
      />
    </div>
  );
}
