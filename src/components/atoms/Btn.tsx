import { Link } from 'react-router-dom';

import styles from './Btn.module.scss';
import classNames from 'classnames';

export default function Btn({
  children,
  href,
  type = 'button',
  bgNone,
}: {
  children?: any;
  href?: string;
  type?: string;
  bgNone?: boolean;
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
      <button className={classList} type="button">
        {children}
      </button>
    );
  }
}
