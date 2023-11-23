import classNames from 'classnames';
import styles from './Form.module.scss';

interface InputTextLabelProps {
  id?: string;
  type?: string;
  label?: string;
  value?: string;
  onChange?: any;
  required?: boolean;
  disabled?: boolean;
  className?: string;
}

export default function InputTextLabel(props: InputTextLabelProps) {
  const { id, type, label, className, ...rest } = props;

  return (
    <div
      className={classNames(
        id === 'postTitle' ? styles.post__title : '',
        styles.wrap,
      )}>
      <label className={styles.label} htmlFor={id}>
        {label}
      </label>
      <input
        className={styles.input}
        type={type ?? 'text'}
        id={id}
        name={id}
        placeholder={id === 'postTitle' ? 'Title' : ''}
        {...rest}
      />
    </div>
  );
}
