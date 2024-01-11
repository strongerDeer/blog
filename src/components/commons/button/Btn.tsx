import styles from './Btn.module.scss';

import { ReactNode } from 'react';
import { Link } from 'react-router-dom';
import classNames from 'classnames';

interface BtnProps {
  children?: ReactNode;
  href?: string;
  type?: 'button' | 'submit' | 'reset';
  className?: string;
  fillPrimary?: boolean;
  disabled?: boolean;
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

export default function Btn(props: BtnProps) {
  const { children, href, type, className, fillPrimary, ...rest } = props;

  const classList = classNames(
    className,
    styles.btn,
    fillPrimary ? styles.fillPrimary : null,
  );

  if (href) {
    return (
      <Link className={classList} to={href}>
        {children}
      </Link>
    );
  } else {
    return (
      <button className={classList} type={type || 'button'} {...rest}>
        {children}
      </button>
    );
  }
}
