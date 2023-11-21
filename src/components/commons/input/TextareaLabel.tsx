import styles from './Form.module.scss';

interface TextareaLabelProps {
  id?: string;
  label?: string;
  value?: string;
  placeholder?: string;
  onChange?: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
}

export default function TextareaLabel(props: TextareaLabelProps) {
  const { label, id, ...rest } = props;
  return (
    <div className={styles.wrap}>
      <label className={styles.label} htmlFor={id}>
        {label}
      </label>
      <textarea className={styles.textarea} id={id} name={id} {...rest} />
    </div>
  );
}
