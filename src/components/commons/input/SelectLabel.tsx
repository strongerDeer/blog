import styles from './Form.module.scss';

interface SelectLabelProps {
  id?: string;
  label?: string;
  value?: string;
  options?: any;
  text?: string;
  onChange?: any;
  required?: boolean;
}

// required 추가
export default function SelectLabel({
  id,
  label,
  options,
  onChange,
  text,
  value,
  required,
}: SelectLabelProps) {
  return (
    <div className={styles.wrap}>
      <label className={styles.label} htmlFor={id}>
        {label}
      </label>
      <select
        id={id}
        name={id}
        onChange={onChange}
        className={styles.select}
        value={value}
        required={required ? true : false}>
        {<option value="">{text}</option>}
        {options.map((option: string, index: number) => (
          <option key={index} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );
}
