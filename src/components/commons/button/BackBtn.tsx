import classNames from 'classnames';
import { useNavigate } from 'react-router-dom';

import styles from './BackBtn.module.scss';
import SVGBack from 'components/svg/SVGBack';

export default function BackBtn({ className }: { className?: string }) {
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
