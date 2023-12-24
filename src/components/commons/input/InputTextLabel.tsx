import classNames from 'classnames';
import styles from './Form.module.scss';

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
    <div
      className={classNames(
        id === 'postTitle' ? styles.post__title : '',
        styles.wrap,
      )}>
      <label
        className={classNames(labelHidden && 'a11y-hidden', styles.label)}
        htmlFor={id}>
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
