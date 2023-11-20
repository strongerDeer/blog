import { Link } from 'react-router-dom';

import styles from './Btn.module.scss';
import classNames from 'classnames';
import React from 'react';

export default function Btn({
  children,
  href,
  type = 'button',
  bgNone,
  disabled,
  onClick,
}: {
  children?: any;
  href?: string;
  type?: 'button' | 'submit' | 'reset' | undefined;
  bgNone?: boolean;
  disabled?: boolean;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
}) {
  const classList = classNames(styles.btn, bgNone && styles.bgNone);

  if (href) {
    return (
      <Link className={classList} to={href}>
        {children}
      </Link>
    );
  } else {
    return (
      <button
        className={classList}
        type={type}
        onClick={onClick}
        disabled={disabled}>
        {children}
      </button>
    );
  }
}
