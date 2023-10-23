import styles from './Button.module.scss';

interface ButtonProps {
  type?: 'button' | 'submit' | 'reset';
  children?: string;
  disabled?: boolean;
}

export default function Button({
  type = 'button',
  children,
  disabled,
}: ButtonProps) {
  return (
    <button className={styles.button} type={type} disabled={disabled}>
      {children}
    </button>
  );
}
