import { Link } from 'react-router-dom';

import styles from './Btn.module.scss';
import classNames from 'classnames';
import React from 'react';

interface BtnProps {
  children?: any;
  href?: string;
  type?: 'button' | 'submit' | 'reset' | undefined;
  bgNone?: boolean;
  disabled?: boolean;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  name?: string;
  className?: string;
}

export default function Btn(props: BtnProps) {
  const { children, href, type, bgNone, className, ...rest } = props;

  const classList = classNames(className, styles.btn, bgNone && styles.bgNone);

  if (href) {
    return (
      <Link className={classList} to={href}>
        {children}
      </Link>
    );
  } else {
    return (
      <button className={classList} type={type ? type : 'button'} {...rest}>
        {children}
      </button>
    );
  }
}
