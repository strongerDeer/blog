import styles from './InputTextLabel.module.scss';

interface InputTextLabelProps {
  id?: string;
  type?: string;
  label?: string;
  value?: string;
  onChange?: any;
}
export default function InputTextLabel({
  id,
  type,
  label,
  value,
  onChange,
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
      />
    </div>
  );
}
