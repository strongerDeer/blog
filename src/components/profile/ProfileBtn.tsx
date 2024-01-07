import { NO_IMG } from 'constants/index';
import styles from './ProfileBtn.module.scss';
export default function ProfileBtn() {
  return (
    <button type="button" className={styles.profile_btn}>
      <img src={NO_IMG} alt="프로필" />
    </button>
  );
}
