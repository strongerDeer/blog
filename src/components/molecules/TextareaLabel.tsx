import styles from './InputTextLabel.module.scss';

interface TextareaLabelProps {
  id?: string;
  label?: string;
  value?: string;
  onChange?: any;
}

export default function TextareaLabel({
  id,
  label,
  value,
  onChange,
}: TextareaLabelProps) {
  return (
    <div className={styles.wrap}>
      <label className={styles.label} htmlFor={id}>
        {label}
      </label>
      <textarea
        className={styles.input}
        id={id}
        name={id}
        value={value}
        onChange={onChange}
      />
    </div>
  );
}