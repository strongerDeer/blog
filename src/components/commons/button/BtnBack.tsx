import { useNavigate } from 'react-router-dom';

import styles from './BtnBack.module.scss';
import SVGBack from './svg/SVGBack';
import classNames from 'classnames';

interface BtnBackProps {
  className?: string;
}

export default function BtnBack({ className }: BtnBackProps) {
  const navigate = useNavigate();
  const goback = () => {
    navigate(-1);
  };
  return (
    <button
      className={classNames(className, styles.btnBack)}
      type="button"
      onClick={goback}>
      <SVGBack />
      <span className="a11y-hidden">BackBtn</span>
    </button>
  );
}
