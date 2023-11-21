import { useNavigate } from 'react-router-dom';

import styles from './BtnBack.module.scss';
import SVGBack from './svg/SVGBack';

export default function BtnBack() {
  const navigate = useNavigate();
  const goback = () => {
    navigate(-1);
  };
  return (
    <button className={styles.btnBack} type="button" onClick={goback}>
      <SVGBack />
      <span className="a11y-hidden">BackBtn</span>
    </button>
  );
}
