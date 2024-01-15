import styles from './ProfileBtn.module.scss';

import { NO_IMG } from 'constants/index';
import AuthContext from 'contexts/AuthContext';
import { useContext } from 'react';

export default function ProfileBtn() {
  const { user } = useContext(AuthContext);

  return (
    <button type="button" className={styles.profile_btn}>
      <img src={user?.photoURL || NO_IMG} alt="프로필" />
    </button>
  );
}
